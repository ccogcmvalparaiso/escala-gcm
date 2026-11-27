(function () {
  'use strict';

  const COLECAO_BASE = 'escala_gcm_valparaiso_v3';
  const COLECAO_PONTOS = 'escala_gcm_pontos_v3';
  const CHAVE_LOCAL_DADOS = 'escala_gcm_valp_dados_v3';
  const CHAVE_LOCAL_USERS = 'escala_gcm_valp_users_v3';
  const CHAVE_LOCAL_SESSAO = 'escala_gcm_valp_sessao_v3';
  const CHAVE_LOCAL_FB = 'escala_gcm_valp_firebase_cfg_v3';

  let fbApp = null, db = null, unsubNuvem = null;

  function normalizarLogin(txt) { return String(txt || '').trim().toLowerCase().replace(/\s+/g, ''); }

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
    const hi = Math.floor(bitLen / 0x100000000), lo = bitLen >>> 0;
    for (let i = 3; i >= 0; i--) bytes.push((hi >>> (i * 8)) & 0xff);
    for (let i = 3; i >= 0; i--) bytes.push((lo >>> (i * 8)) & 0xff);
    const W = new Array(64), rrot = (x, n) => (x >>> n) | (x << (32 - n));
    for (let i = 0; i < bytes.length; i += 64) {
      for (let t = 0; t < 16; t++) W[t] = ((bytes[i+t*4]<<24)|(bytes[i+t*4+1]<<16)|(bytes[i+t*4+2]<<8)|bytes[i+t*4+3])>>>0;
      for (let t = 16; t < 64; t++) {
        const s0 = rrot(W[t-15],7)^rrot(W[t-15],18)^(W[t-15]>>>3);
        const s1 = rrot(W[t-2],17)^rrot(W[t-2],19)^(W[t-2]>>>10);
        W[t] = (W[t-16]+s0+W[t-7]+s1)>>>0;
      }
      let [a,b,c,d,e,f,g,h] = H;
      for (let t = 0; t < 64; t++) {
        const S1 = rrot(e,6)^rrot(e,11)^rrot(e,25), ch = (e&f)^(~e&g), t1 = (h+S1+ch+K[t]+W[t])>>>0;
        const S0 = rrot(a,2)^rrot(a,13)^rrot(a,22), maj = (a&b)^(a&c)^(b&c), t2 = (S0+maj)>>>0;
        h=g; g=f; f=e; e=(d+t1)>>>0; d=c; c=b; b=a; a=(t1+t2)>>>0;
      }
      H = [(H[0]+a)>>>0,(H[1]+b)>>>0,(H[2]+c)>>>0,(H[3]+d)>>>0,(H[4]+e)>>>0,(H[5]+f)>>>0,(H[6]+g)>>>0,(H[7]+h)>>>0];
    }
    return H.map(v => v.toString(16).padStart(8, '0')).join('');
  }
  function hashSenha(login, senha) { return sha256Hex('GCM_VALP_V3::' + normalizarLogin(login) + '::' + String(senha)); }

  function lerConfigFirebase() { try { const r = localStorage.getItem(CHAVE_LOCAL_FB); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function desconectarFirebase() {
    if (unsubNuvem) { try { unsubNuvem(); } catch (e) {} unsubNuvem = null; }
    if (fbApp) { try { fbApp.delete(); } catch (e) {} fbApp = null; }
    db = null;
  }
  function salvarConfigFirebase(cfg) {
    if (!cfg) { localStorage.removeItem(CHAVE_LOCAL_FB); desconectarFirebase(); return; }
    localStorage.setItem(CHAVE_LOCAL_FB, JSON.stringify(cfg));
    desconectarFirebase(); inicializarFirebase(cfg);
  }
  function extrairObjetoFirebase(texto) {
    const t = String(texto || '').trim();
    if (!t) return null;
    try { const j = JSON.parse(t); if (j && j.apiKey && j.projectId) return j; } catch (e) {}
    const get = (k) => { const m = t.match(new RegExp(k + '\\s*:\\s*["\']([^"\']+)["\']')); return m ? m[1].trim() : ''; };
    const obj = { apiKey: get('apiKey'), authDomain: get('authDomain'), projectId: get('projectId'), storageBucket: get('storageBucket'), messagingSenderId: get('messagingSenderId'), appId: get('appId') };
    return (obj.apiKey && obj.projectId) ? obj : null;
  }
  function inicializarFirebase(cfgOp) {
    const cfg = cfgOp || lerConfigFirebase();
    if (!cfg || !cfg.apiKey || !cfg.projectId) return false;
    if (db) return true;
    try {
      if (typeof firebase !== 'undefined' && firebase.initializeApp) {
        const nm = 'escala_gcm_v3_' + cfg.projectId;
        fbApp = firebase.apps.find(a => a.name === nm) || firebase.initializeApp(cfg, nm);
        db = fbApp.firestore();
        return true;
      }
    } catch (e) {}
    return false;
  }
  async function testarConexaoFirebase(cfg) {
    desconectarFirebase();
    if (!inicializarFirebase(cfg) || !db) return { ok: false, erro: 'Configuração inválida ou sem internet.' };
    try {
      await db.collection(COLECAO_BASE).doc('ping').set({ v: 3, em: new Date().toISOString() });
      return { ok: true, projectId: cfg.projectId };
    } catch (e) { return { ok: false, erro: String(e && e.message ? e.message : e) }; }
  }

  // Salva ponto individualmente em documento proprio (evita estourar limite de 1MB com fotos)
  async function enviarPontoIndividualNuvem(ponto) {
    if (!inicializarFirebase() || !db || !ponto || !ponto.id) return { ok: false };
    try {
      await db.collection(COLECAO_PONTOS).doc(ponto.id).set({ json: JSON.stringify(ponto), dataLocal: ponto.dataLocal || '', criadoEm: ponto.timestampIso || new Date().toISOString() });
      return { ok: true };
    } catch (e) { return { ok: false }; }
  }

  async function sincronizarEnviarNuvem(estado) {
    if (!estado || !estado.config || !estado.config.nuvemAtiva) return { ok: false, motivo: 'desativada' };
    if (!inicializarFirebase() || !db) return { ok: false, motivo: 'sem_config' };
    try {
      const semPontos = Object.assign({}, estado, { pontos: [], atualizadoEm: new Date().toISOString() });
      await db.collection(COLECAO_BASE).doc('estado_principal').set({ json: JSON.stringify(semPontos), atualizadoEm: new Date().toISOString() });
      await db.collection(COLECAO_BASE).doc('usuarios_sistema').set({ json: JSON.stringify(lerUsuariosLocal()), atualizadoEm: new Date().toISOString() });
      // Envia pontos mais recentes como documentos individuais
      const pontos = Array.isArray(estado.pontos) ? estado.pontos.slice(0, 30) : [];
      for (const pt of pontos) { await enviarPontoIndividualNuvem(pt); }
      return { ok: true };
    } catch (e) { return { ok: false, erro: String(e && e.message ? e.message : e) }; }
  }

  async function sincronizarBaixarNuvem() {
    if (!inicializarFirebase() || !db) return { ok: false, motivo: 'sem_config' };
    try {
      const snap = await db.collection(COLECAO_BASE).doc('estado_principal').get();
      const snapU = await db.collection(COLECAO_BASE).doc('usuarios_sistema').get();
      if (snapU.exists && snapU.data()?.json) {
        const us = JSON.parse(snapU.data().json);
        if (Array.isArray(us) && us.length) salvarUsuariosLocal(us);
      }
      if (!snap.exists || !snap.data()?.json) return { ok: false, motivo: 'vazio' };
      const dados = JSON.parse(snap.data().json);
      const snapPts = await db.collection(COLECAO_PONTOS).orderBy('criadoEm', 'desc').limit(150).get().catch(() => null);
      if (snapPts) {
        const pts = [];
        snapPts.forEach(d => { try { if (d.data()?.json) pts.push(JSON.parse(d.data().json)); } catch (_) {} });
        dados.pontos = pts;
      }
      return { ok: true, dados };
    } catch (e) { return { ok: false, erro: String(e && e.message ? e.message : e) }; }
  }

  function assinarNuvem(ativo, onReceber) {
    if (unsubNuvem) { try { unsubNuvem(); } catch (e) {} unsubNuvem = null; }
    if (!ativo || !inicializarFirebase() || !db) return;
    try {
      unsubNuvem = db.collection(COLECAO_BASE).doc('estado_principal').onSnapshot(async (doc) => {
        if (!doc.exists || !doc.data()?.json) return;
        const r = await sincronizarBaixarNuvem();
        if (r.ok && r.dados) onReceber(r.dados);
      });
    } catch (e) {}
  }

  function criarAdminPadrao() {
    return { login: 'admin', nome: 'Administrador GCM', matricula: 'ADM-001', perfil: 'ADMIN', mestre: true, aprovado: true, senhaHash: hashSenha('admin', 'gcm153'), criadoEm: new Date().toISOString() };
  }
  function lerUsuariosLocal() {
    try {
      const arr = JSON.parse(localStorage.getItem(CHAVE_LOCAL_USERS) || '[]');
      if (Array.isArray(arr) && arr.length) { if (!arr.some(u => normalizarLogin(u.login) === 'admin')) arr.unshift(criarAdminPadrao()); return arr; }
    } catch (e) {}
    const init = [criarAdminPadrao()]; salvarUsuariosLocal(init); return init;
  }
  function salvarUsuariosLocal(l) { try { localStorage.setItem(CHAVE_LOCAL_USERS, JSON.stringify(l)); } catch (e) {} }

  async function carregarEstadoLocal() {
    if (window.escalaAPI?.carregarDados) { try { const d = await window.escalaAPI.carregarDados(); if (d) return d; } catch (e) {} }
    try { const r = localStorage.getItem(CHAVE_LOCAL_DADOS); return r ? JSON.parse(r) : null; } catch (e) { return null; }
  }
  async function salvarEstadoLocal(estado) {
    try { localStorage.setItem(CHAVE_LOCAL_DADOS, JSON.stringify(estado)); } catch (e) {}
    if (window.escalaAPI?.salvarDados) { try { await window.escalaAPI.salvarDados(estado); } catch (e) {} }
  }

  function lerSessao() { try { const r = localStorage.getItem(CHAVE_LOCAL_SESSAO); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function salvarSessao(s) { if (!s) localStorage.removeItem(CHAVE_LOCAL_SESSAO); else localStorage.setItem(CHAVE_LOCAL_SESSAO, JSON.stringify(s)); }

  async function tentarLogin(id, senha) {
    const n = normalizarLogin(id);
    if (!n || !senha) return { ok: false, erro: 'Informe usuário/matrícula e senha.' };
    let users = lerUsuariosLocal();
    let u = users.find(x => normalizarLogin(x.login) === n || normalizarLogin(x.matricula) === n);
    if (!u && lerConfigFirebase()) { await sincronizarBaixarNuvem(); users = lerUsuariosLocal(); u = users.find(x => normalizarLogin(x.login) === n || normalizarLogin(x.matricula) === n); }
    if (!u) return { ok: false, erro: 'Usuário ou matrícula não encontrados.' };
    if (!u.aprovado) return { ok: false, erro: 'Conta aguardando aprovação do Administrador.' };
    if (hashSenha(u.login, senha) !== u.senhaHash) return { ok: false, erro: 'Senha incorreta.' };
    const sessao = { login: u.login, nome: u.nome, matricula: u.matricula || '', perfil: u.perfil || 'AGENTE', mestre: !!u.mestre };
    salvarSessao(sessao);
    return { ok: true, sessao };
  }
  function cadastrarUsuario({ nome, login, matricula, senha, perfil, aprovado }) {
    const l = normalizarLogin(login);
    if (!nome || !l || !senha || senha.length < 6) return { ok: false, erro: 'Preencha todos os campos (senha mín. 6).' };
    const users = lerUsuariosLocal();
    if (users.some(x => normalizarLogin(x.login) === l)) return { ok: false, erro: 'Login já cadastrado.' };
    const novo = { login: l, nome: String(nome).trim(), matricula: String(matricula || '').trim().toUpperCase(), perfil: perfil || 'AGENTE', mestre: false, aprovado: !!aprovado, senhaHash: hashSenha(l, senha), criadoEm: new Date().toISOString() };
    users.push(novo); salvarUsuariosLocal(users);
    return { ok: true, usuario: novo };
  }
  function atualizarUsuario(loginAlvo, alt) {
    const users = lerUsuariosLocal();
    const u = users.find(x => normalizarLogin(x.login) === normalizarLogin(loginAlvo));
    if (!u) return { ok: false, erro: 'Não encontrado.' };
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
    const u = users.find(x => normalizarLogin(x.login) === normalizarLogin(loginAlvo));
    if (!u) return { ok: false, erro: 'Não encontrado.' };
    if (u.mestre) return { ok: false, erro: 'Admin Mestre não pode ser excluído.' };
    salvarUsuariosLocal(users.filter(x => normalizarLogin(x.login) !== normalizarLogin(loginAlvo)));
    return { ok: true };
  }

  window.EscalaCloud = {
    sha256Hex, lerConfigFirebase, salvarConfigFirebase, extrairObjetoFirebase, testarConexaoFirebase, desconectarFirebase,
    carregarEstadoLocal, salvarEstadoLocal, enviarPontoIndividualNuvem, sincronizarEnviarNuvem, sincronizarBaixarNuvem, assinarNuvem,
    lerSessao, salvarSessao, lerUsuariosLocal, salvarUsuariosLocal, tentarLogin, cadastrarUsuario, atualizarUsuario, removerUsuario
  };
})();
