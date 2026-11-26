(function () {
  'use strict';

  // =========================================================================
  // BANCO DE DADOS 100% SEPARADO DO CCO VIATURAS
  // Nenhuma chave ou projeto do CCO Viaturas esta vinculado aqui.
  // Funciona 100% local/offline e permite plugar um NOVO projeto Firebase
  // exclusivo da Escala pela propria tela "Efetivo & Banco".
  // =========================================================================
  const COLECAO_NUVEM = 'escala_gcm_valparaiso_oficial';
  const CHAVE_LOCAL_DADOS = 'escala_gcm_valp_dados_v2';
  const CHAVE_LOCAL_USERS = 'escala_gcm_valp_users_v2';
  const CHAVE_LOCAL_SESSAO = 'escala_gcm_valp_sessao_v2';
  const CHAVE_LOCAL_FB = 'escala_gcm_valp_firebase_cfg_v2';

  let fbApp = null;
  let db = null;
  let unsubNuvem = null;

  function normalizarLogin(txt) {
    return String(txt || '').trim().toLowerCase().replace(/\s+/g, '');
  }

  function sha256Hex(texto) {
    const bytes = Array.from(new TextEncoder().encode(String(texto)));
    const K = [
      0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
    ];
    let H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    const bitLen = bytes.length * 8;
    bytes.push(0x80);
    while ((bytes.length % 64) !== 56) bytes.push(0);
    const hi = Math.floor(bitLen / 0x100000000);
    const lo = bitLen >>> 0;
    for (let i = 3; i >= 0; i--) bytes.push((hi >>> (i * 8)) & 0xff);
    for (let i = 3; i >= 0; i--) bytes.push((lo >>> (i * 8)) & 0xff);
    const W = new Array(64);
    const rrot = (x, n) => (x >>> n) | (x << (32 - n));
    for (let i = 0; i < bytes.length; i += 64) {
      for (let t = 0; t < 16; t++) {
        W[t] = ((bytes[i + t*4] << 24) | (bytes[i + t*4 + 1] << 16) | (bytes[i + t*4 + 2] << 8) | bytes[i + t*4 + 3]) >>> 0;
      }
      for (let t = 16; t < 64; t++) {
        const s0 = rrot(W[t-15], 7) ^ rrot(W[t-15], 18) ^ (W[t-15] >>> 3);
        const s1 = rrot(W[t-2], 17) ^ rrot(W[t-2], 19) ^ (W[t-2] >>> 10);
        W[t] = (W[t-16] + s0 + W[t-7] + s1) >>> 0;
      }
      let [a,b,c,d,e,f,g,h] = H;
      for (let t = 0; t < 64; t++) {
        const S1 = rrot(e, 6) ^ rrot(e, 11) ^ rrot(e, 25);
        const ch = (e & f) ^ (~e & g);
        const temp1 = (h + S1 + ch + K[t] + W[t]) >>> 0;
        const S0 = rrot(a, 2) ^ rrot(a, 13) ^ rrot(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const temp2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + temp1) >>> 0;
        d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
      }
      H = [
        (H[0]+a)>>>0, (H[1]+b)>>>0, (H[2]+c)>>>0, (H[3]+d)>>>0,
        (H[4]+e)>>>0, (H[5]+f)>>>0, (H[6]+g)>>>0, (H[7]+h)>>>0
      ];
    }
    return H.map(v => v.toString(16).padStart(8, '0')).join('');
  }

  function hashSenha(login, senha) {
    return sha256Hex('GCM_VALP_ESCALA_V2::' + normalizarLogin(login) + '::' + String(senha));
  }

  // ---------- CONFIGURACAO DINAMICA DO FIREBASE PROPRIO ----------
  function lerConfigFirebase() {
    try {
      const raw = localStorage.getItem(CHAVE_LOCAL_FB);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function salvarConfigFirebase(cfg) {
    if (!cfg) {
      localStorage.removeItem(CHAVE_LOCAL_FB);
      desconectarFirebase();
      return;
    }
    localStorage.setItem(CHAVE_LOCAL_FB, JSON.stringify(cfg));
    desconectarFirebase();
    inicializarFirebase(cfg);
  }

  function extrairObjetoFirebase(texto) {
    const t = String(texto || '').trim();
    if (!t) return null;
    try {
      const j = JSON.parse(t);
      if (j && j.apiKey && j.projectId) return j;
    } catch (e) {}
    // Aceita colar direto o snippet JS do console do Firebase (const firebaseConfig = { apiKey: "...", ... };)
    const extrairCampo = (chave) => {
      const re = new RegExp(chave + '\\s*:\\s*["\']([^"\']+)["\']');
      const m = t.match(re);
      return m ? m[1].trim() : '';
    };
    const obj = {
      apiKey: extrairCampo('apiKey'),
      authDomain: extrairCampo('authDomain'),
      projectId: extrairCampo('projectId'),
      storageBucket: extrairCampo('storageBucket'),
      messagingSenderId: extrairCampo('messagingSenderId'),
      appId: extrairCampo('appId')
    };
    if (obj.apiKey && obj.projectId) return obj;
    return null;
  }

  function desconectarFirebase() {
    if (unsubNuvem) { try { unsubNuvem(); } catch (e) {} unsubNuvem = null; }
    if (fbApp) { try { fbApp.delete(); } catch (e) {} fbApp = null; }
    db = null;
  }

  function inicializarFirebase(cfgOpcional) {
    const cfg = cfgOpcional || lerConfigFirebase();
    if (!cfg || !cfg.apiKey || !cfg.projectId) return false;
    if (db) return true;
    try {
      if (typeof firebase !== 'undefined' && firebase.initializeApp) {
        const nomeApp = 'escala_gcm_isolado_' + cfg.projectId;
        const existente = firebase.apps.find(a => a.name === nomeApp);
        fbApp = existente || firebase.initializeApp(cfg, nomeApp);
        db = fbApp.firestore();
        return true;
      }
    } catch (e) {
      console.warn('Falha ao inicializar Firebase próprio:', e);
    }
    return false;
  }

  async function testarConexaoFirebase(cfg) {
    desconectarFirebase();
    if (!inicializarFirebase(cfg) || !db) {
      return { ok: false, erro: 'SDK do Firebase indisponível ou configuração inválida.' };
    }
    try {
      await db.collection(COLECAO_NUVEM).doc('ping_conexao').set({
        sistema: 'ESCALA_GCM_VALPARAISO_V2',
        verificadoEm: new Date().toISOString()
      });
      return { ok: true, projectId: cfg.projectId };
    } catch (e) {
      return { ok: false, erro: String(e && e.message ? e.message : e) };
    }
  }

  // ---------- USUARIOS ----------
  function criarAdminPadrao() {
    return {
      login: 'admin',
      nome: 'Administrador GCM',
      matricula: 'ADM-001',
      perfil: 'ADMIN',
      mestre: true,
      aprovado: true,
      senhaHash: hashSenha('admin', 'gcm153'),
      criadoEm: new Date().toISOString()
    };
  }

  function lerUsuariosLocal() {
    try {
      const raw = localStorage.getItem(CHAVE_LOCAL_USERS);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr) && arr.length > 0) {
        if (!arr.some(u => normalizarLogin(u.login) === 'admin')) arr.unshift(criarAdminPadrao());
        return arr;
      }
    } catch (e) {}
    const init = [criarAdminPadrao()];
    salvarUsuariosLocal(init);
    return init;
  }

  function salvarUsuariosLocal(lista) {
    try { localStorage.setItem(CHAVE_LOCAL_USERS, JSON.stringify(lista)); } catch (e) {}
  }

  async function carregarEstadoLocal() {
    if (window.escalaAPI && window.escalaAPI.carregarDados) {
      try {
        const d = await window.escalaAPI.carregarDados();
        if (d) return d;
      } catch (e) {}
    }
    try {
      const raw = localStorage.getItem(CHAVE_LOCAL_DADOS);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  async function salvarEstadoLocal(estado) {
    try { localStorage.setItem(CHAVE_LOCAL_DADOS, JSON.stringify(estado)); } catch (e) {}
    if (window.escalaAPI && window.escalaAPI.salvarDados) {
      try { await window.escalaAPI.salvarDados(estado); } catch (e) {}
    }
  }

  async function sincronizarEnviarNuvem(estado) {
    if (!estado || !estado.config || !estado.config.nuvemAtiva) return { ok: false, motivo: 'desativada' };
    if (!inicializarFirebase() || !db) return { ok: false, motivo: 'sem_config' };
    try {
      const copia = Object.assign({}, estado, { atualizadoEm: new Date().toISOString() });
      const payload = JSON.stringify(copia);
      if (payload.length > 900000 && Array.isArray(copia.pontos)) {
        copia.pontos = copia.pontos.slice(0, 60);
      }
      await db.collection(COLECAO_NUVEM).doc('estado_principal').set({
        json: JSON.stringify(copia),
        atualizadoEm: new Date().toISOString()
      });
      await db.collection(COLECAO_NUVEM).doc('usuarios_sistema').set({
        json: JSON.stringify(lerUsuariosLocal()),
        atualizadoEm: new Date().toISOString()
      });
      return { ok: true };
    } catch (e) {
      return { ok: false, erro: String(e && e.message ? e.message : e) };
    }
  }

  async function sincronizarBaixarNuvem() {
    if (!inicializarFirebase() || !db) return { ok: false, motivo: 'sem_config' };
    try {
      const snap = await db.collection(COLECAO_NUVEM).doc('estado_principal').get();
      const snapU = await db.collection(COLECAO_NUVEM).doc('usuarios_sistema').get();
      if (snapU.exists && snapU.data() && snapU.data().json) {
        const uNuvem = JSON.parse(snapU.data().json);
        if (Array.isArray(uNuvem) && uNuvem.length) salvarUsuariosLocal(uNuvem);
      }
      if (snap.exists && snap.data() && snap.data().json) {
        return { ok: true, dados: JSON.parse(snap.data().json) };
      }
      return { ok: false, motivo: 'vazio' };
    } catch (e) {
      return { ok: false, erro: String(e && e.message ? e.message : e) };
    }
  }

  function assinarNuvem(ativo, onReceber) {
    if (unsubNuvem) { try { unsubNuvem(); } catch (e) {} unsubNuvem = null; }
    if (!ativo || !inicializarFirebase() || !db) return;
    try {
      unsubNuvem = db.collection(COLECAO_NUVEM).doc('estado_principal').onSnapshot((doc) => {
        if (!doc.exists) return;
        const raw = doc.data() && doc.data().json;
        if (!raw) return;
        try { onReceber(JSON.parse(raw)); } catch (e) {}
      });
    } catch (e) {}
  }

  function lerSessao() {
    try { const r = localStorage.getItem(CHAVE_LOCAL_SESSAO); return r ? JSON.parse(r) : null; }
    catch (e) { return null; }
  }

  function salvarSessao(s) {
    if (!s) localStorage.removeItem(CHAVE_LOCAL_SESSAO);
    else localStorage.setItem(CHAVE_LOCAL_SESSAO, JSON.stringify(s));
  }

  async function tentarLogin(identificador, senha) {
    const idNorm = normalizarLogin(identificador);
    if (!idNorm || !senha) return { ok: false, erro: 'Informe usuário/matrícula e senha.' };
    let users = lerUsuariosLocal();
    let user = users.find(u => normalizarLogin(u.login) === idNorm || normalizarLogin(u.matricula) === idNorm);
    if (!user && lerConfigFirebase()) {
      await sincronizarBaixarNuvem();
      users = lerUsuariosLocal();
      user = users.find(u => normalizarLogin(u.login) === idNorm || normalizarLogin(u.matricula) === idNorm);
    }
    if (!user) return { ok: false, erro: 'Usuário ou matrícula não encontrados.' };
    if (!user.aprovado) return { ok: false, erro: 'Sua conta aguarda aprovação de um Administrador.' };
    if (hashSenha(user.login, senha) !== user.senhaHash) return { ok: false, erro: 'Senha incorreta.' };
    const sessao = { login: user.login, nome: user.nome, matricula: user.matricula || '', perfil: user.perfil || 'AGENTE', mestre: !!user.mestre };
    salvarSessao(sessao);
    return { ok: true, sessao };
  }

  function cadastrarUsuario({ nome, login, matricula, senha, perfil, aprovado }) {
    const l = normalizarLogin(login);
    if (!nome || !l || !senha || senha.length < 6) {
      return { ok: false, erro: 'Preencha nome, usuário e senha com no mínimo 6 caracteres.' };
    }
    const users = lerUsuariosLocal();
    if (users.some(u => normalizarLogin(u.login) === l)) {
      return { ok: false, erro: 'Este nome de usuário já está cadastrado.' };
    }
    const novo = {
      login: l, nome: String(nome).trim(),
      matricula: String(matricula || '').trim().toUpperCase(),
      perfil: perfil || 'AGENTE', mestre: false,
      aprovado: aprovado !== undefined ? !!aprovado : false,
      senhaHash: hashSenha(l, senha), criadoEm: new Date().toISOString()
    };
    users.push(novo);
    salvarUsuariosLocal(users);
    return { ok: true, usuario: novo };
  }

  function atualizarUsuario(loginAlvo, alt) {
    const users = lerUsuariosLocal();
    const idx = users.findIndex(u => normalizarLogin(u.login) === normalizarLogin(loginAlvo));
    if (idx < 0) return { ok: false, erro: 'Usuário não encontrado.' };
    const u = users[idx];
    if (alt.nome !== undefined) u.nome = String(alt.nome).trim();
    if (alt.matricula !== undefined) u.matricula = String(alt.matricula).trim().toUpperCase();
    if (alt.perfil !== undefined && !u.mestre) u.perfil = alt.perfil;
    if (alt.aprovado !== undefined && !u.mestre) u.aprovado = !!alt.aprovado;
    if (alt.novaSenha && alt.novaSenha.length >= 6) u.senhaHash = hashSenha(u.login, alt.novaSenha);
    salvarUsuariosLocal(users);
    return { ok: true, usuario: u };
  }

  function removerUsuario(loginAlvo) {
    const users = lerUsuariosLocal();
    const alvo = users.find(u => normalizarLogin(u.login) === normalizarLogin(loginAlvo));
    if (!alvo) return { ok: false, erro: 'Usuário não encontrado.' };
    if (alvo.mestre) return { ok: false, erro: 'O Administrador Mestre não pode ser excluído.' };
    salvarUsuariosLocal(users.filter(u => normalizarLogin(u.login) !== normalizarLogin(loginAlvo)));
    return { ok: true };
  }

  window.EscalaCloud = {
    sha256Hex,
    lerConfigFirebase,
    salvarConfigFirebase,
    extrairObjetoFirebase,
    testarConexaoFirebase,
    desconectarFirebase,
    carregarEstadoLocal,
    salvarEstadoLocal,
    sincronizarEnviarNuvem,
    sincronizarBaixarNuvem,
    assinarNuvem,
    lerSessao,
    salvarSessao,
    lerUsuariosLocal,
    salvarUsuariosLocal,
    tentarLogin,
    cadastrarUsuario,
    atualizarUsuario,
    removerUsuario
  };
})();
