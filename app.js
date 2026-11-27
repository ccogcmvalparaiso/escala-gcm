(function () {
  'use strict';

  const EQUIPES = ['ALFA', 'BRAVO', 'CHARLIE', 'DELTA'];
  const EQUIPE_CORES = {
    ALFA:    { rotulo: 'Grafite', cor: '#18181B' },
    BRAVO:   { rotulo: 'Oliva',   cor: '#365314' },
    CHARLIE: { rotulo: 'Caqui',   cor: '#854D0E' },
    DELTA:   { rotulo: 'Bordô',   cor: '#7F1D1D' },
    ADM:     { rotulo: 'Chumbo',  cor: '#3F3F46' },
    '12X36': { rotulo: 'Cinza',   cor: '#52525B' }
  };
  const AREAS_LABEL = {
    PATRULHAMENTO: 'Patrulhamento',
    COMANDO: 'Administrativo'
  };
  const FUNCOES_LABEL = {
    COMANDANTE_01: '01 — Comandante',
    MOTORISTA_02: '02 — Motorista',
    PATRULHEIRO_03: '03 — Patrulheiro',
    ADMINISTRATIVO: 'Administrativo'
  };
  const TIPO_PONTO_LABEL = {
    ENTRADA: 'Entrada',
    SAIDA_ALMOCO: 'Saída Almoço',
    RETORNO_ALMOCO: 'Retorno Almoço',
    SAIDA: 'Saída Final'
  };
  const TIPO_PERMUTA_LABEL = {
    TROCA_PLANTAO_24H: 'Troca de Plantão Completo (24h × 24h)',
    PERMUTA_PARCIAL_12H_DIA: 'Permuta Parcial 12h (Diurno)',
    PERMUTA_PARCIAL_12H_NOITE: 'Permuta Parcial 12h (Noturno)',
    COBERTURA_POSTO: 'Cobertura de Posto / Viatura',
    SUBSTITUICAO_BANCO_HORAS: 'Substituição com Banco de Horas'
  };
  const TIPO_BH_LABEL = {
    EXTRA_50: 'Hora Extra 50% (Dia Útil)',
    EXTRA_100: 'Hora Extra 100% (Dom / Feriado)',
    CREDITO_SIMPLES: 'Crédito Banco de Horas (1:1)',
    EVENTO_EXTRA: 'Evento / Operação Extra',
    PRORROGACAO: 'Prorrogação de Ocorrência',
    PONTO_AUTO: 'Excedente Apurado na Folha de Ponto',
    COMPENSACAO: 'Folga Compensatória Gozada (-)',
    DEBITO_ATRASO: 'Débito / Saída Antecipada (-)'
  };
  const TIPO_AFASTAMENTO_LABEL = {
    ATESTADO_MEDICO: 'Atestado Médico',
    FERIAS: 'Férias Regulamentares',
    LICENCA_MEDICA: 'Licença Médica / INSS',
    LICENCA_FAMILIA: 'Licença Paternidade / Maternidade',
    LICENCA_PREMIO: 'Licença Prêmio / Especial',
    LUTO_GALA: 'Luto / Casamento',
    DISPENSA: 'Dispensa / Folga Autorizada',
    CURSO_MISSAO: 'Curso / Instrução / Missão',
    FALTA: 'Não Compareceu (Falta)'
  };
  const JUSTIFICATIVAS_OPCOES = [
    'Atestado Médico',
    'Férias',
    'Licença',
    'Permuta de Serviço',
    'Dispensa / Folga Autorizada',
    'Curso / Instrução',
    'Falta Injustificada'
  ];
  const MODALIDADE_EVENTO = {
    HORA_EXTRA: 'Hora Extra',
    BANCO_HORAS: 'Banco de Horas',
    REMANEJAMENTO: 'Remanejamento'
  };
  const TITULOS_ABAS = {
    secPonto: 'Folha de Ponto (Hoje)',
    secMinhaFolha: 'Minha Folha de Ponto (PDF)',
    secEscalas: 'Escala Contínua 24x72 e Permutas',
    secAfastamentos: 'Atestados Médicos, Férias e Baixas',
    secCartao: 'Cartão Programa Completo e Mapa dos Setores',
    secBancoHoras: 'Banco de Horas e Horas Extras',
    secEventos: 'Eventos e Operações Extras',
    secEquipeDetalhe: 'Detalhamento da Equipe',
    secAutenticacao: 'Validar Autenticidade (SHA-256)',
    secUsuario: 'Configurações do Usuário',
    secEfetivo: 'Efetivo da Guarda (64)',
    secAuditoria30: 'Auditoria Operacional de 30 Dias (Admin)',
    secSistema: 'Contas, Base e Banco de Dados (Exclusivo Admin)'
  };
  const CHECKLIST_PADRAO = [
    'Vistoria de Viatura (Combustível, Pneus, Óleo)',
    'Giroflex, Sirene e Faróis testados',
    'Rádio HT / Móvel em escuta com CCO 153',
    'Coletes Balísticos e EPI completos',
    'Cones, Lanterna e Fita de Isolamento',
    'Registro de Entrada na Folha de Ponto'
  ];
  const PROCEDIMENTOS_PADRAO = '1) Em flagrante ou ocorrência de risco, solicitar apoio imediato via CCO (153) informando localização exata e características. 2) Preservar local de crime e acionar Polícia Civil/Perícia quando aplicável. 3) Registrar boletim e histórico do turno. Contatos: CCO GCM 153 | PMGO 190 | SAMU 192 | Bombeiros 193.';
  const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const MESES_EXT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const ROL_EFETIVO_64 = [["01", "Vinicios Mateus Pires da Silva", "M"], ["02", "Yago Rocha da Silva Dias", "M"], ["03", "Anderson Pereira Costa", "M"], ["04", "Gabrielle da Cruz Nunes", "F"], ["05", "Tiago Ferreira Lopes", "M"], ["06", "Luthero Pinheiro Martins Filho", "M"], ["07", "Tiago Batista Ferreira", "M"], ["08", "Luís Otávio de Andrade Torres", "M"], ["09", "Michael Larangeira Linhares", "M"], ["10", "Valterson da Silva Junior", "M"], ["11", "Vinicius Lemes Lopes", "M"], ["12", "Cleber Brilhante de Albuquerque Neto", "M"], ["13", "Anderson Lucas Brito Gomes", "M"], ["14", "Alex Sandro Souza Gomes", "M"], ["15", "Michele Bezerra de Araujo Aniceto", "F"], ["16", "Mayara Valeria Damasceno Pastana", "F"], ["17", "Amanda Rodrigues Cavalcante", "F"], ["18", "Jemima Costa de Jesus", "F"], ["19", "Geyssom Chaves Duarte Mazinho", "M"], ["20", "Diego Stanley Cantallops Santos", "M"], ["21", "Rafael Miranda Dias", "M"], ["22", "Daniel Kimberley de Oliveira Franco", "M"], ["23", "Renan Rodrigues de Aquino", "M"], ["24", "Gilmar Figueiredo dos Santos", "M"], ["25", "Juliana Iza de Oliveira Nunes", "F"], ["26", "Douglas Araujo dos Santos", "M"], ["27", "Victor dos Santos Nunes", "M"], ["28", "Bruno Guerreiro Galdino", "M"], ["29", "Glauber Terena Guerra da Silva", "M"], ["30", "Gean Martins Godinho da Silva", "M"], ["31", "Davy Guedes de Oliveira", "M"], ["32", "Rayan Thalles Bonfim da Silva", "M"], ["33", "Joao Pedro Martins Pinheiro", "M"], ["34", "Gustavo Amorim Lima", "M"], ["35", "Laryssa Santos Souza", "F"], ["36", "Regivânia Rodrigues de Macedo", "F"], ["37", "Bruna Albéfaro Pereira", "F"], ["38", "Vanessa Vasconcelos Sampaio", "F"], ["39", "Victor Lauriano de Paula Souza", "M"], ["40", "Valeria Januario Monteiro", "F"], ["41", "Lucas Lacerda de Melo", "M"], ["42", "Mayara Albuquerque Oliveira", "F"], ["43", "Alexandre Monteiro Januario", "M"], ["44", "Maísa Vitória Barbosa Vieira", "F"], ["45", "Hugo Sales Targino", "M"], ["46", "Davi Jonas Santos Duarte", "M"], ["47", "Julia Silveira Carvalho Ferreira", "F"], ["48", "Isabella Alves de Carvalho Basto", "F"], ["49", "Alessandro de Souza Silva", "M"], ["50", "Graziele Medeiros de Lima", "F"], ["51", "Luiz Felipe Oliveira Barros Dias", "M"], ["52", "Aline Rayane Vieira Maia", "F"], ["53", "Camila dos Santos Alves", "F"], ["54", "Carolina dos Santos Pereira", "F"], ["55", "Lucas Nunes da Silva", "M"], ["56", "Hugo Wildson de Lucena", "M"], ["57", "Vitor de Farias Lemes", "M"], ["58", "Esdras Roberto da Silva Braga", "M"], ["59", "Samuel Alessandro da Silva", "M"], ["60", "Valdir Borges da Silva Filho", "M"], ["61", "Felipe Augusto Ribeiro", "M"], ["62", "Allan Carvalho Gonçalves", "M"], ["63", "Arthur dos Reis Siqueira Bastos", "M"], ["64", "Rodrigo de Oliveira Correa", "M"]];
  const POLIGONOS_PADRAO = {"VTR-01": [[-16.0688, -47.9892], [-16.0672, -47.981], [-16.0718, -47.9752], [-16.0805, -47.9746], [-16.0852, -47.9825], [-16.0824, -47.9912], [-16.0745, -47.9935]], "VTR-02": [[-16.0548, -47.9922], [-16.0532, -47.9825], [-16.0578, -47.9748], [-16.0672, -47.9758], [-16.0688, -47.9892], [-16.0635, -47.9952]], "VTR-03": [[-16.0485, -48.0055], [-16.051, -47.9942], [-16.0635, -47.9952], [-16.0692, -48.0015], [-16.0645, -48.0115], [-16.0555, -48.0128]], "VTR-04": [[-16.0492, -47.9788], [-16.048, -47.9655], [-16.0568, -47.9592], [-16.0682, -47.9612], [-16.0708, -47.9748], [-16.0578, -47.9748]], "MUNICIPIO": [[-16.048, -48.0128], [-16.048, -47.9585], [-16.0998, -47.9585], [-16.0998, -48.0128]]};

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  let ESTADO = null;
  let SESSAO = null;
  let guardaSelecionadoPonto = null;
  let equipeDetalheAtual = 'ALFA';
  let eventoSelecionadoId = null;
  let streamCamera = null;
  let streamScanAf = null;
  let anexoScanAfAtual = null;
  let fotoCapturadaDataUrl = null;
  let locAtualPonto = null;
  let locAtualTs = 0;
  let promessaGpsAtiva = null;
  let timerRelogio = null;

  let mapaSetor = null;
  let camadaPoligonos = null;
  let camadaPbs = null;
  let modoMarcarPbMapa = false;

  // =========================================================================
  // DATAS, HORAS E CICLO CONTINUO 24x72
  // =========================================================================
  function hojeISO() { const d = new Date(), p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`; }
  function mesAtualISO() { return hojeISO().slice(0, 7); }
  function somarDiasISO(iso, delta) {
    const [y,m,d] = iso.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + delta));
    const p = n => String(n).padStart(2,'0');
    return `${dt.getUTCFullYear()}-${p(dt.getUTCMonth()+1)}-${p(dt.getUTCDate())}`;
  }
  function diaSemanaISO(iso) { const [y,m,d] = iso.split('-').map(Number); return new Date(y, m - 1, d).getDay(); }
  function formatarDataBR(iso) { if (!iso || iso.length < 10) return '—'; const [y,m,d] = iso.slice(0,10).split('-'); return `${d}/${m}/${y}`; }
  function formatarDataHoraBR(iso) {
    if (!iso) return '—'; const d = new Date(iso); if (isNaN(d.getTime())) return iso;
    const p = n => String(n).padStart(2,'0');
    return `${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }
  function formatarMinutosHM(minTotal, comSinal) {
    const neg = minTotal < 0;
    const abs = Math.round(Math.abs(minTotal || 0));
    const h = Math.floor(abs / 60), m = abs % 60;
    const base = `${String(h).padStart(2,'0')}h${String(m).padStart(2,'0')}`;
    if (neg) return '-' + base;
    if (comSinal && abs > 0) return '+' + base;
    return base;
  }
  function diffDiasISO(a, b) {
    const [ya,ma,da] = a.split('-').map(Number), [yb,mb,db] = b.split('-').map(Number);
    return Math.round((Date.UTC(ya,ma-1,da) - Date.UTC(yb,mb-1,db)) / 86400000);
  }
  function calcularCiclo24x72(dataISO) {
    const base = ESTADO?.config?.dataBaseAlfa || hojeISO();
    const idx = ((diffDiasISO(dataISO, base) % 4) + 4) % 4;
    const equipeServico = EQUIPES[idx];
    const mapa = {};
    EQUIPES.forEach((eq, i) => {
      const dist = ((idx - i) + 4) % 4;
      if (dist === 0) mapa[eq] = { codigo: 'SERVICO', rotulo: 'SERVIÇO 24h' };
      else if (dist === 1) mapa[eq] = { codigo: 'FOLGA_1', rotulo: '1ª Folga (24h)' };
      else if (dist === 2) mapa[eq] = { codigo: 'FOLGA_2', rotulo: '2ª Folga (48h)' };
      else mapa[eq] = { codigo: 'FOLGA_3', rotulo: '3ª Folga (72h)' };
    });
    return { dataISO, equipeServico, mapa };
  }
  function proximosDiasServico(equipe, qtdDias) {
    if (equipe === 'ADM') return 'Segunda a Sexta (08h às 17h)';
    if (equipe === '12X36') return 'Escala 12x36 (Alternado)';
    if (!EQUIPES.includes(equipe)) return '—';
    const hoje = hojeISO(), arr = [];
    for (let i = 0; i < (qtdDias || 30); i++) {
      const iso = somarDiasISO(hoje, i);
      if (calcularCiclo24x72(iso).equipeServico === equipe) arr.push(iso.slice(8,10) + '/' + iso.slice(5,7));
    }
    return arr.join(', ');
  }
  function gerarListaDatasEscala() {
    const modo = $('selModoEscala')?.value || 'CONTINUO_30', hoje = hojeISO();
    if (modo.startsWith('CONTINUO_')) {
      const n = Number(modo.split('_')[1]) || 30, arr = [];
      for (let i = 0; i < n; i++) arr.push(somarDiasISO(hoje, i));
      return { titulo: `Próximos ${n} dias corridos (${formatarDataBR(arr[0])} a ${formatarDataBR(arr[arr.length-1])})`, datas: arr };
    }
    const mesVal = $('selMesEscala')?.value || mesAtualISO();
    const [ano, mes] = mesVal.split('-').map(Number), ult = new Date(ano, mes, 0).getDate(), arr = [];
    for (let d = 1; d <= ult; d++) arr.push(`${ano}-${String(mes).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
    return { titulo: `${MESES_EXT[mes-1]} / ${ano}`, datas: arr };
  }

  // =========================================================================
  // ESTADO INICIAL: 4 VIATURAS EM 4 SETORES + CARTAO PROGRAMA ULTRA-DETALHADO
  // =========================================================================
  function criarPostosPadrao() {
    return [
      { id: 'VTR-01', nome: 'VTR-01 — Setor 01 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 01', bairros: 'Valparaíso I (Etapas A, B, C, D e E), Jardim Anhanguera', prefixo: 'VTR-01', cor: '#18181B', responsavel: 'A definir (Resp. Setor 01)', poligono: POLIGONOS_PADRAO['VTR-01'] },
      { id: 'VTR-02', nome: 'VTR-02 — Setor 02 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 02', bairros: 'Parque Esplanada I a V, Cruzeiro do Sul, Valparaízo II', prefixo: 'VTR-02', cor: '#365314', responsavel: 'A definir (Resp. Setor 02)', poligono: POLIGONOS_PADRAO['VTR-02'] },
      { id: 'VTR-03', nome: 'VTR-03 — Setor 03 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 03', bairros: 'Jardim Céu Azul, Jardim Oriente, Ipanema', prefixo: 'VTR-03', cor: '#854D0E', responsavel: 'A definir (Resp. Setor 03)', poligono: POLIGONOS_PADRAO['VTR-03'] },
      { id: 'VTR-04', nome: 'VTR-04 — Setor 04 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 04', bairros: 'Cidade Jardins, Parque Rio Branco, Marajó, Santa Rita', prefixo: 'VTR-04', cor: '#7F1D1D', responsavel: 'A definir (Resp. Setor 04)', poligono: POLIGONOS_PADRAO['VTR-04'] }
    ];
  }

  function criarModeloCartaoPadrao(posto) {
    if (posto.id === 'VTR-01') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        placa: 'A definir (VTR-01)', radio: 'Canal 01 — CCO 153', kmIni: '', kmFim: '',
        checklist: [...CHECKLIST_PADRAO],
        missao: 'Garantir presença ostensiva contínua nas Etapas A a E e Jardim Anhanguera, com prioridade absoluta para proteção escolar nos horários de entrada e saída, unidades de saúde (UBSs), praças públicas, eixo comercial e pronta resposta a chamados do CCO.',
        areasSensiveis: 'Escolas Municipais das Etapas A/B/C, UBS Etapa A e Anhanguera, agências bancárias e comércio da Etapa C, paradas de ônibus da marginal BR-040 e praças com fluxo noturno.',
        procedimentos: PROCEDIMENTOS_PADRAO,
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso (Assunção)', atividade: 'Realizar checklist da viatura (níveis, pneus, giroflex, rádio HT), registrar KM inicial e bater Entrada na Folha de Ponto. Alinhar demandas pendentes com o CCO.', lat: -16.0715, lon: -47.9815 },
          { hora: '07:30 - 11:30', local: 'PB 1 — Escolas e UBSs (Etapas A e B)', atividade: 'Posicionar viatura em ponto visível com giroflex ligado na entrada dos alunos (07:30–08:15). Em seguida, desembarcar para contato preventivo com direções escolares e UBSs, realizando ronda lenta nas praças.', lat: -16.0748, lon: -47.9852 },
          { hora: '11:30 - 14:30', local: 'PB 2 — Comércio Central e Bancos (Etapas C e D)', atividade: 'Estacionamento tático no eixo comercial no horário de almoço. Alternar entre PB estático (20 min) e patrulhamento motorizado preventivo para inibir furtos a transeuntes e veículos.', lat: -16.0785, lon: -47.9795 },
          { hora: '14:30 - 18:00', local: 'PB 3 — Jardim Anhanguera e Prédios Públicos', atividade: 'Vistoriar CRAS, postos de saúde, ginásios e quadras. Às 17:00 retornar às escolas do setor para acompanhar a saída vespertina dos estudantes.', lat: -16.0812, lon: -47.9878 },
          { hora: '18:00 - 22:00', local: 'PB 4 — Paradas de Ônibus / Operação Saturação', atividade: 'Manter viatura visível com luzes de alerta nas paradas de maior desembarque de trabalhadores na margem da BR-040 e acessos das Etapas.', lat: -16.0725, lon: -47.9775 },
          { hora: '22:00 - 06:30', local: 'PB 5 — Ronda Patrimonial Noturna (Setor 01)', atividade: 'Circular em baixa velocidade verificando cadeados, portões, muros e iluminação de escolas, UBSs e próprios municipais. Reportar ao CCO qualquer vulnerabilidade encontrada.', lat: -16.0772, lon: -47.9835 }
        ],
        obs: 'Informar ao CCO o início e o término de cada PB. Registrar Entrada e Saída na Folha de Ponto com KM final anotado.'
      };
    }
    if (posto.id === 'VTR-02') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        placa: 'A definir (VTR-02)', radio: 'Canal 01 — CCO 153', kmIni: '', kmFim: '',
        checklist: [...CHECKLIST_PADRAO],
        missao: 'Patrulhamento ostensivo preventivo no Parque Esplanada I a V, Cruzeiro do Sul e Valparaízo II, reforçando corredores comerciais, escolas municipais e próprios públicos.',
        areasSensiveis: 'Avenida principal do Parque Esplanada III, entorno das escolas do Esplanada I/II e Cruzeiro do Sul, UBSs, áreas comerciais do Valparaízo II e paradas de ônibus.',
        procedimentos: PROCEDIMENTOS_PADRAO,
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso (Assunção)', atividade: 'Checklist completo da VTR-02, teste de rádio com o CCO, anotação de KM inicial e registro de Entrada na Folha de Ponto.', lat: -16.0655, lon: -47.9805 },
          { hora: '07:30 - 11:30', local: 'PB 1 — Parque Esplanada I e II (Escolas / UBS)', atividade: 'Ponto base com giroflex na entrada matutina escolar; contato com direção escolar e ronda nas unidades de saúde e praças vizinhas.', lat: -16.0595, lon: -47.9845 },
          { hora: '11:30 - 15:00', local: 'PB 2 — Eixo Comercial Esplanada III / Valparaízo II', atividade: 'Presença ostensiva em área comercial de alta circulação; patrulhamento preventivo nas ruas transversais e contato comunitário.', lat: -16.0562, lon: -47.9788 },
          { hora: '15:00 - 19:00', local: 'PB 3 — Cruzeiro do Sul e Esplanada IV / V', atividade: 'Acompanhar saída escolar às 17:00 e iniciar operação saturação nos principais cruzamentos e acessos residenciais.', lat: -16.0638, lon: -47.9912 },
          { hora: '19:00 - 06:30', local: 'PB 4 — Paradas de Ônibus e Ronda Patrimonial Noturna', atividade: 'PB fixo até 22h nas paradas de maior fluxo; após 22h, ronda patrimonial em escolas, creches e prédios públicos até a passagem do plantão às 06:30.', lat: -16.0615, lon: -47.9810 }
        ],
        obs: 'Manter rádio em escuta permanente e reportar imediatamente ao CCO qualquer alteração ou apoio em setor vizinho.'
      };
    }
    if (posto.id === 'VTR-03') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        placa: 'A definir (VTR-03)', radio: 'Canal 01 — CCO 153', kmIni: '', kmFim: '',
        checklist: [...CHECKLIST_PADRAO],
        missao: 'Cobertura preventiva integral no Jardim Céu Azul, Jardim Oriente e Ipanema, com proteção escolar, policiamento comunitário e atenção às divisas municipais.',
        areasSensiveis: 'Avenida principal e comércio do Jardim Céu Azul, escolas e CMEIs da região, UBS Jardim Oriente, praças comunitárias e acessos do Ipanema.',
        procedimentos: PROCEDIMENTOS_PADRAO,
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM / Deslocamento Setor 03', atividade: 'Vistoria completa da VTR-03, registro de Entrada no ponto e deslocamento imediato para a região do Céu Azul.', lat: -16.0612, lon: -47.9965 },
          { hora: '07:30 - 12:00', local: 'PB 1 — Avenida Principal do Jardim Céu Azul', atividade: 'Presença visível na entrada escolar, paradas de ônibus e eixo comercial com rondas preventivas de baixa velocidade.', lat: -16.0568, lon: -48.0038 },
          { hora: '12:00 - 16:00', local: 'PB 2 — Jardim Oriente (UBS, CRAS e Praças)', atividade: 'Ronda preventiva em unidades de saúde, praças e equipamentos comunitários; contato preventivo com servidores e moradores.', lat: -16.0525, lon: -47.9992 },
          { hora: '16:00 - 21:00', local: 'PB 3 — Ipanema e Acessos do Céu Azul', atividade: 'Acompanhar saída escolar às 17:00 e executar PB com giroflex no horário de retorno de trabalhadores.', lat: -16.0632, lon: -48.0072 },
          { hora: '21:00 - 06:30', local: 'PB 4 — Ronda Patrimonial Noturna (Setor 03)', atividade: 'Vistoria perimetral em escolas, creches e prédios públicos do Céu Azul, Oriente e Ipanema até 06:30.', lat: -16.0590, lon: -48.0015 }
        ],
        obs: 'Atenção redobrada aos limites do município (divisa com Novo Gama); avisar o CCO antes de qualquer deslocamento fora do perímetro.'
      };
    }
    if (posto.id === 'VTR-04') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        placa: 'A definir (VTR-04)', radio: 'Canal 01 — CCO 153', kmIni: '', kmFim: '',
        checklist: [...CHECKLIST_PADRAO],
        missao: 'Patrulhamento ostensivo preventivo no Cidade Jardins, Parque Rio Branco, Marajó e Santa Rita, protegendo escolas, UBSs, comércio local e vias de acesso.',
        areasSensiveis: 'Escolas e UBSs do Parque Rio Branco e Cidade Jardins, eixo comercial do Marajó, acessos do Santa Rita e marginais de ligação com a BR-040.',
        procedimentos: PROCEDIMENTOS_PADRAO,
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM / Deslocamento Setor 04', atividade: 'Checklist de saída da VTR-04, registro de Entrada no ponto e deslocamento para a zona leste.', lat: -16.0642, lon: -47.9725 },
          { hora: '07:30 - 12:00', local: 'PB 1 — Parque Rio Branco (Escolas e UBS)', atividade: 'PB na entrada escolar matutina, contato com direções e patrulhamento nas ruas comerciais e unidades de saúde.', lat: -16.0535, lon: -47.9688 },
          { hora: '12:00 - 16:00', local: 'PB 2 — Cidade Jardins (Comércio e Prédios Públicos)', atividade: 'Estacionamento tático visível no comércio local e vistoria preventiva em praças e órgãos municipais.', lat: -16.0585, lon: -47.9642 },
          { hora: '16:00 - 21:00', local: 'PB 3 — Marajó e Santa Rita (Saída Escolar / Fluxo)', atividade: 'Acompanhar saída das escolas às 17:00 e manter PB iluminado nos acessos e paradas de ônibus.', lat: -16.0648, lon: -47.9655 },
          { hora: '21:00 - 06:30', local: 'PB 4 — Ronda Patrimonial Noturna (Setor 04)', atividade: 'Vistoria periódica em escolas, creches e praças dos 4 bairros até o retorno à Base às 06:30.', lat: -16.0598, lon: -47.9702 }
        ],
        obs: 'Reportar ao CCO qualquer necessidade de apoio viário na BR-040 ou ocorrência de maior vulto.'
      };
    }
    return {
      setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
      placa: 'A definir', radio: 'Canal 01 — CCO 153', kmIni: '', kmFim: '',
      checklist: [...CHECKLIST_PADRAO],
      missao: 'Patrulhamento ostensivo preventivo no setor, proteção de bens e instalações municipais e pronta resposta ao CCO.',
      areasSensiveis: 'Escolas municipais, UBSs, praças públicas e principais corredores comerciais do setor.',
      procedimentos: PROCEDIMENTOS_PADRAO,
      pontosBase: [
        { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso (Saída)', atividade: 'Vistoria da viatura, conferência de equipamentos e saída para o setor.', lat: -16.0658, lon: -47.9756 },
        { hora: '07:30 - 12:00', local: 'PB 1 — Área Principal do Setor', atividade: 'Patrulhamento preventivo em escolas, UBSs, praças e comércio.', lat: -16.0680, lon: -47.9780 },
        { hora: '12:00 - 18:00', local: 'PB 2 — Corredores e Prédios Públicos', atividade: 'Presença ostensiva e ronda contínua nos próprios municipais.', lat: -16.0640, lon: -47.9800 },
        { hora: '18:00 - 06:30', local: 'PB 3 — Saturação e Ronda Noturna', atividade: 'Ponto base com giroflex nas paradas de ônibus e ronda patrimonial noturna.', lat: -16.0665, lon: -47.9765 }
      ],
      obs: 'Manter contato constante com o CCO e registrar todas as batidas na Folha de Ponto.'
    };
  }

  function gerarNomeGuerra(nome) {
    const p = String(nome || '').trim().split(/\s+/);
    return p.length <= 1 ? nome : `${p[0]} ${p[p.length - 1]}`;
  }

  function criarEstadoInicial() {
    const postos = criarPostosPadrao();
    const administrativo = [
      { id: 'adm_1', cargo: 'Comandante da GCM', titular: 'Fulano de Tal (Provisório — Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Comando' },
      { id: 'adm_2', cargo: 'Subcomandante da GCM', titular: 'Sicrano de Tal (Provisório — Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Subcomando' },
      { id: 'adm_3', cargo: 'Corregedor(a) da GCM', titular: 'Beltrano de Tal (Provisório — Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Corregedoria' },
      { id: 'adm_4', cargo: 'Ouvidor(a) da GCM', titular: 'Terciano de Tal (Provisório — Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Ouvidoria' },
      { id: 'adm_5', cargo: 'Chefia de Operações / Escalas', titular: 'A definir (Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Escalas' }
    ];

    const mulheres = ROL_EFETIVO_64.filter(x => x[2] === 'F');
    const homens = ROL_EFETIVO_64.filter(x => x[2] !== 'F');
    const intercalado = [];
    let mi = 0, hi = 0;
    while (intercalado.length < ROL_EFETIVO_64.length) {
      if (mi < mulheres.length) intercalado.push(mulheres[mi++]);
      if (hi < homens.length) intercalado.push(homens[hi++]);
      if (hi < homens.length) intercalado.push(homens[hi++]);
    }

    const efetivo = [];
    const porEq = { ALFA: [], BRAVO: [], CHARLIE: [], DELTA: [] };
    const contEq = { ALFA: 0, BRAVO: 0, CHARLIE: 0, DELTA: 0 };

    intercalado.forEach((item, idx) => {
      const [num, nome, sexo] = item;
      const eq = EQUIPES[idx % 4];
      const pos = contEq[eq]++;
      const reg = {
        id: 'ag_' + num,
        matricula: num,
        nome,
        nomeGuerra: gerarNomeGuerra(nome),
        sexo,
        telefone: '',
        equipe: eq,
        area: 'PATRULHAMENTO',
        funcao: pos % 3 === 0 ? 'COMANDANTE_01' : (pos % 3 === 1 ? 'MOTORISTA_02' : 'PATRULHEIRO_03'),
        regime: '24X72',
        situacao: 'ATIVO'
      };
      efetivo.push(reg);
      porEq[eq].push(reg);
    });
    efetivo.sort((a, b) => Number(a.matricula) - Number(b.matricula));

    const equipesMontagem = {};
    EQUIPES.forEach((eq) => {
      const daEq = porEq[eq];
      let k = 0;
      const prox = () => (daEq[k] ? daEq[k++].id : '');
      equipesMontagem[eq] = {
        'VTR-01': { g01: prox(), g02: prox(), g03: prox() },
        'VTR-02': { g01: prox(), g02: prox(), g03: prox() },
        'VTR-03': { g01: prox(), g02: prox(), g03: prox() },
        'VTR-04': { g01: prox(), g02: prox(), g03: prox() }
      };
    });

    const cartoesModelo = {};
    postos.forEach(p => { cartoesModelo[p.id] = criarModeloCartaoPadrao(p); });

    return {
      versao: 18,
      config: {
        dataBaseAlfa: hojeISO(),
        horarioTroca: '07:00 às 07:00',
        baseNome: 'Base Operacional — GCM Valparaíso de Goiás',
        baseLat: -16.0658, baseLon: -47.9756, baseRaioMetros: 500,
        nuvemAtiva: false,
        bancoHoras: { horaInicio24: '07:00', horaInicioAdm: '08:00', antecedenciaMin: 30, toleranciaAtrasoMin: 10, carga24: 24, cargaAdm: 8, valorHora: 0, mult50: 1.5, mult100: 2.0 },
        responsaveis: {
          escalanteNome: 'Fulano de Tal (Escalante — Editar)', escalanteCargo: 'Encarregado de Escala GCM', escalanteMat: '—',
          comandoNome: 'Sicrano de Tal (Comando — Editar)', comandoCargo: 'Comandante da GCM Valparaíso', comandoMat: '—'
        }
      },
      postos,
      efetivo,
      equipesMontagem,
      administrativo,
      escala12x36: [
        { id: 'e12_1', posto: 'Paço Municipal / Sede Prefeitura', turno: 'Diurno (07h às 19h)', equipeA: 'A definir (Ímpar)', equipeB: 'A definir (Par)' }
      ],
      eventos: [
        {
          id: 'ev_modelo_1', nome: 'Operação Evento Municipal (Modelo)', local: 'Praça Central — Valparaíso de Goiás',
          data: hojeISO(), inicio: '16:00', fim: '23:00', regime: 'HORA_EXTRA',
          coordenador: 'Fulano de Tal', missao: 'Reforço preventivo, controle de público e fluidez viária.',
          obs: 'Apresentação 30 min antes na Base GCM.',
          viaturas: [
            { id: 'evv_1', prefixo: 'VTR-EVENTO 01', setor: 'Palco / Acesso Principal', g01: '', g02: '', g03: '', g04: '' },
            { id: 'evv_2', prefixo: 'VTR-EVENTO 02', setor: 'Perímetro / Apoio', g01: '', g02: '', g03: '', g04: '' }
          ]
        }
      ],
      permutas: [],
      bancoHorasMovs: [],
      documentosAutenticados: [],
      cartoesModelo,
      cartoesDia: {},
      pontos: [],
      justificativas: {},
      auditoriasIdentidade: {},
      afastamentos: [],
      auditorias30Dias: []
    };
  }

  // =========================================================================
  // CONTROLE DE ACESSO (RBAC RIGIDO) E AUXILIARES
  // =========================================================================
  function isAdmin() { return !!(SESSAO && SESSAO.perfil === 'ADMIN'); }
  function podeEditarEscala() { return !!(SESSAO && (SESSAO.perfil === 'ADMIN' || SESSAO.perfil === 'ESCALANTE')); }

  function avaliarObrigacaoPontoUsuario() {
    if (!SESSAO || !ESTADO) return { precisaBater: false, tipo: 'NENHUM' };
    const hoje = hojeISO();
    const ontem = somarDiasISO(hoje, -1);
    const dow = diaSemanaISO(hoje);
    const diaUtil = dow >= 1 && dow <= 5;
    const meu = agenteLogadoAtual();

    if (!meu) {
      if (SESSAO.perfil === 'AGENTE') {
        return {
          precisaBater: true, urgente: true, tipo: 'SEM_VINCULO', batidaSugerida: 'ENTRADA',
          titulo: 'AVISO PRIORITÁRIO: Registre sua Folha de Ponto',
          subtexto: 'Seu nome de cadastro não foi localizado automaticamente no efetivo oficial da GCM — verifique com o Administrador.'
        };
      }
      return { precisaBater: false, tipo: 'GESTAO_SEM_NUM' };
    }

    // 1. Verifica se esta de Atestado / Ferias / Afastamento hoje
    const afHoje = obterAfastamentoNaData(meu.id, hoje);
    if (afHoje && afHoje.tipo !== 'FALTA') {
      const rot = TIPO_AFASTAMENTO_LABEL[afHoje.tipo] || afHoje.tipo;
      return {
        precisaBater: false, tipo: 'AFASTADO', classe: 'folga',
        titulo: `${rot} em andamento (${afHoje.dias} dia(s))`,
        subtexto: `Você está afastado até ${formatarDataBR(afHoje.dataFim)}. Retorno previsto em ${formatarDataBR(afHoje.dataRetorno)} — não é necessário bater ponto hoje.`
      };
    }

    const rHoje = resumirDiaAgente(hoje, meu.id, null);

    // 2. Caso Administrativo (Segunda a Sexta — bate ponto todo dia util)
    if (meu.equipe === 'ADM') {
      if (!diaUtil) {
        return {
          precisaBater: false, tipo: 'FOLGA_ADM', classe: 'folga',
          titulo: `Expediente Administrativo — Folga de Fim de Semana (${DIAS_SEMANA[dow]})`,
          subtexto: 'Serviço administrativo funciona de Segunda a Sexta. Você não precisa bater ponto hoje.'
        };
      }
      if (!rHoje.ent && rHoje.status !== 'JUSTIFICADO') {
        return {
          precisaBater: true, urgente: true, tipo: 'ADM_ENTRADA', batidaSugerida: 'ENTRADA',
          titulo: `PONTO OBRIGATÓRIO HOJE (ADMINISTRATIVO) — Nº ${meu.matricula} ${meu.nomeGuerra}`,
          subtexto: 'Expediente administrativo (Seg–Sex): registre sua ENTRADA na Folha de Ponto para iniciar o serviço de hoje.'
        };
      }
      if (rHoje.ent && !rHoje.sai) {
        return {
          precisaBater: false, tipo: 'EM_SERVICO', classe: 'folga',
          titulo: `Expediente Administrativo em andamento (Entrada às ${rHoje.ent.horaLocal.slice(0,5)})`,
          subtexto: 'Lembre-se de registrar sua Saída ao finalizar o expediente.'
        };
      }
      return {
        precisaBater: false, tipo: 'CONCLUIDO', classe: 'folga',
        titulo: 'Folha de Ponto de hoje concluída (Entrada e Saída registradas)',
        subtexto: `Entrada: ${rHoje.ent ? rHoje.ent.horaLocal.slice(0,5) : '—'} · Saída: ${rHoje.sai ? rHoje.sai.horaLocal.slice(0,5) : '—'}.`
      };
    }

    // 3. Caso Escala 24x72 (ALFA, BRAVO, CHARLIE, DELTA) ou 12x36
    // 3a. Verifica se existe plantao iniciado ontem ainda ABERTO nas ultimas 32h (virada de meia-noite!)
    const plantaoAberto = encontrarPlantaoAberto(meu.id, new Date().toISOString());
    if (plantaoAberto && plantaoAberto.dataLocal !== hoje) {
      return {
        precisaBater: true, urgente: true, tipo: 'ENCERRAR_ONTEM', batidaSugerida: 'SAIDA',
        titulo: `ENCERRAMENTO DE PLANTÃO 24h — ${meu.nomeGuerra}`,
        subtexto: `Plantão aberto desde ${formatarDataBR(plantaoAberto.dataLocal)} às ${plantaoAberto.horaLocal.slice(0,5)}. Registre sua SAÍDA para fechar as 24h corretamente.`
      };
    }

    // 3b. Verifica se esta escalado HOJE (24x72, Permuta Aprovada ou Evento)
    const { ciclo, escalados } = obterEscaladosDaData(hoje);
    const escHoje = escalados.find(x => x.agente.id === meu.id);
    const estaEscaladoHoje = !!(escHoje && !escHoje.permutaSaida);

    if (estaEscaladoHoje) {
      const rEscalado = resumirDiaAgente(hoje, meu.id, escHoje.permutaSaida);
      if (!rEscalado.ent && rEscalado.status !== 'JUSTIFICADO') {
        return {
          precisaBater: true, urgente: true, tipo: 'ESCALADO_24_ENTRADA', batidaSugerida: 'ENTRADA',
          titulo: `VOCÊ ESTÁ ESCALADO HOJE (${escHoje.origem}) — Nº ${meu.matricula} ${meu.nomeGuerra}`,
          subtexto: `Posto: ${escHoje.posto}. Registre sua ENTRADA na Folha de Ponto agora.`
        };
      }
      if (rEscalado.ent && !rEscalado.sai) {
        return {
          precisaBater: false, tipo: 'EM_SERVICO', classe: 'folga',
          titulo: `Plantão 24h em andamento (${escHoje.posto} · Entrada às ${rEscalado.ent.horaLocal.slice(0,5)})`,
          subtexto: 'Ao encerrar o turno amanhã às 07h, registre sua SAÍDA na Folha de Ponto.'
        };
      }
      return {
        precisaBater: false, tipo: 'CONCLUIDO', classe: 'folga',
        titulo: 'Plantão registrado com sucesso (Entrada e Saída confirmadas)',
        subtexto: 'Você pode baixar sua folha autenticada em Minha Folha de Ponto (PDF).'
      };
    }

    // 3c. Nao esta escalado hoje -> FOLGA (24x72) ou Permuta saindo! NAO pisca nem cobra ponto!
    const stCiclo = ciclo.mapa[meu.equipe];
    const rotFolga = escHoje?.permutaSaida ? 'Folga por Permuta Aprovada' : (stCiclo ? stCiclo.rotulo : 'Folga');
    const proxDias = proximosDiasServico(meu.equipe, 12).split(',')[0] || 'consultar escala';
    return {
      precisaBater: false, tipo: 'FOLGA_24X72', classe: 'folga',
      titulo: `Você está de FOLGA hoje (${rotFolga}) — Equipe ${meu.equipe}`,
      subtexto: `Na escala 24x72 você não bate ponto nos dias de descanso. Próximo serviço previsto: ${proxDias}.`
    };
  }

  function renderBannerCadastrosAdmin() {
    const banner = $('bannerCadastrosAdmin');
    if (!banner || !SESSAO || !ESTADO) return;
    if (!isAdmin()) { banner.classList.add('oculto'); return; }
    const todosUsers = window.EscalaCloud.lerUsuariosLocal();
    const pendentes = todosUsers.filter(u => !u.mestre && !u.aprovado);
    const pediuReset = todosUsers.filter(u => !u.mestre && u.solicitouResetEm);

    if (!pendentes.length && !pediuReset.length) { banner.classList.add('oculto'); return; }

    const foraDoRol = pendentes.filter(u => !verificarNomeNoRolOficial(u.nome).constaNoRol);
    banner.classList.remove('oculto', 'urgente', 'auditoria');

    if (foraDoRol.length) {
      banner.classList.add('urgente');
      const nomesFora = foraDoRol.map(u => `${u.nome} (${u.login})`).join(', ');
      banner.innerHTML = `
        <div class="banner-prioritario-texto">
          <strong>ALERTA DE CADASTRO — NOME FORA DA LISTA OFICIAL DOS GUARDAS (PDF)</strong>
          <span><strong>${foraDoRol.length}</strong> solicitação(ões) com nome fora dos 64 guardas: <strong>${esc(nomesFora)}</strong>.${pediuReset.length ? ` · ${pediuReset.length} pedido(s) de redefinição de senha.` : ''}</span>
        </div>
        <button type="button" class="btn btn-perigo btn-sm" id="btnAbrirContasAlerta">Verificar Contas Agora</button>
      `;
    } else if (pediuReset.length) {
      banner.classList.add('auditoria');
      const nomesReset = pediuReset.map(u => `${u.nome} (${u.login})`).join(', ');
      banner.innerHTML = `
        <div class="banner-prioritario-texto">
          <strong>PEDIDO DE REDEFINIÇÃO DE SENHA (${pediuReset.length})</strong>
          <span>Usuário(s) que esqueceram a senha e aguardam senha temporária: <strong>${esc(nomesReset)}</strong>.${pendentes.length ? ` · +${pendentes.length} cadastro(s) pendente(s).` : ''}</span>
        </div>
        <button type="button" class="btn btn-primario btn-sm" id="btnAbrirContasAlerta">Redefinir em Contas</button>
      `;
    } else {
      banner.classList.add('auditoria');
      banner.innerHTML = `
        <div class="banner-prioritario-texto">
          <strong>CADASTROS PENDENTES DE APROVAÇÃO (${pendentes.length})</strong>
          <span>Todos os nomes pendentes constam na lista oficial dos 64 guardas (PDF). Clique para aprovar.</span>
        </div>
        <button type="button" class="btn btn-primario btn-sm" id="btnAbrirContasAlerta">Abrir Contas</button>
      `;
    }
    const b = $('btnAbrirContasAlerta');
    if (b) b.addEventListener('click', () => { abrirAba('secSistema'); ativarSubtab('secSistema', 'subSisContas'); });
  }

  function renderBannerAuditoria30Admin() {
    renderBannerCadastrosAdmin();
    const banner = $('bannerAuditoria30Admin');
    if (!banner || !SESSAO || !ESTADO) return;
    if (!isAdmin()) { banner.classList.add('oculto'); return; }
    const ult = ESTADO.config?.ultimaAuditoria30Iso || '';
    const diasPassados = ult ? diffDiasISO(hojeISO(), ult) : 30;
    if (diasPassados >= 30) {
      const msgCiclo = ult
        ? `Já se passaram ${diasPassados} dias desde a última auditoria concluída (${formatarDataBR(ult)}).`
        : 'Auditoria periódica de 30 dias disponível para primeira conferência da base de dados.';
      banner.classList.remove('oculto');
      banner.innerHTML = `
        <div class="banner-prioritario-texto">
          <strong>AUDITORIA PERIÓDICA DE 30 DIAS PRONTA (ADMINISTRADOR)</strong>
          <span>${esc(msgCiclo)} Revise faltas, atrasos, pontos fora de Valparaíso e causas de Banco de Horas.</span>
        </div>
        <button type="button" class="btn btn-primario btn-sm" id="btnAbrirAud30Banner">Abrir Auditoria 30 Dias</button>
      `;
      const b = $('btnAbrirAud30Banner');
      if (b) b.addEventListener('click', () => abrirAba('secAuditoria30'));
    } else {
      banner.classList.add('oculto');
    }
  }

  function atualizarAlertaBotaoPonto() {
    const btn = $('btnTopoRegistrarPonto');
    const banner = $('bannerAvisoPontoInicial');
    if (!btn || !SESSAO || !ESTADO) return;

    const av = avaliarObrigacaoPontoUsuario();
    const devePiscar = !!av.precisaBater;

    btn.classList.toggle('piscando-alerta', devePiscar);
    btn.title = devePiscar ? (av.titulo || 'ATENÇÃO: Registre sua Folha de Ponto!') : 'Abrir Folha de Ponto';
    if (av.batidaSugerida === 'SAIDA') {
      btn.textContent = 'Registrar SAÍDA de Ponto';
    } else {
      btn.textContent = 'Registrar Folha de Ponto';
    }

    if (banner) {
      if (av.tipo === 'NENHUM' || av.tipo === 'GESTAO_SEM_NUM') {
        banner.classList.add('oculto');
      } else {
        banner.classList.remove('oculto', 'urgente', 'folga');
        banner.classList.add(av.urgente ? 'urgente' : (av.classe || 'folga'));
        banner.innerHTML = `
          <div class="banner-prioritario-texto">
            <strong>${esc(av.titulo)}</strong>
            <span>${esc(av.subtexto)}</span>
          </div>
          ${av.precisaBater ? `<button type="button" class="btn btn-perigo btn-sm" id="btnIrBaterPontoBanner">${av.batidaSugerida === 'SAIDA' ? 'Registrar Saída Agora' : 'Registrar Ponto Agora'}</button>` : ''}
        `;
        const bIr = $('btnIrBaterPontoBanner');
        if (bIr) bIr.addEventListener('click', () => {
          abrirAba('secPonto');
          ativarSubtab('secPonto', 'subPtRegistrar');
          if (av.batidaSugerida && $('selPontoTipo')) $('selPontoTipo').value = av.batidaSugerida;
          $('btnAbrirCamera')?.focus();
        });
      }
    }
    renderBannerAuditoria30Admin();
  }

  function aplicarPermissoesVisuais() {
    const perfil = SESSAO?.perfil || 'AGENTE';
    document.body.setAttribute('data-perfil', perfil);
    const somenteLeitura = !podeEditarEscala();
    ['#secCartao input:not(#inpCartaoData):not(#chkMostrarTodosSetores)', '#secCartao textarea', '#secEventos input', '#secEventos select', '#secEventos textarea'].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => { el.disabled = somenteLeitura; });
    });
    // Anti-impostor: perfil AGENTE com matricula vinculada fica travado no proprio numero/nome na Folha de Ponto
    const inpId = $('inpIdentificaGuarda');
    if (inpId) {
      if (perfil === 'AGENTE') {
        const meu = agenteLogadoAtual();
        if (meu) {
          inpId.readOnly = true;
          inpId.title = 'Vinculado automaticamente à sua conta para segurança da Folha de Ponto';
        } else {
          inpId.readOnly = false;
        }
      } else {
        inpId.readOnly = false;
      }
    }
    atualizarAlertaBotaoPonto();
  }

  function toast(msg) {
    const area = $('toastArea'); if (!area) return;
    const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
    area.appendChild(el); setTimeout(() => el.remove(), 3400);
  }
  function atualizarBadgeSync(txt, cls) { const b = $('badgeSync'); if (b) { b.textContent = txt; b.className = 'badge ' + (cls || 'badge-neutro'); } }

  async function salvarTudo(silencioso) {
    const res = await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    if (!res.ok) {
      atualizarBadgeSync('Erro ao Salvar', 'badge-erro');
      toast('ATENÇÃO: Falha ao salvar localmente (' + (res.erro || 'verifique espaço') + ')');
      return false;
    }
    const motorLbl = window.EscalaCloud.obterMotorStorage ? window.EscalaCloud.obterMotorStorage() : 'Local';
    atualizarBadgeSync(motorLbl.includes('Disco') ? 'Salvo no PC' : 'Salvo no Aparelho', 'badge-ok');
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      atualizarBadgeSync('Sincronizando...', 'badge-warn');
      const r = await window.EscalaCloud.sincronizarEnviarNuvem(ESTADO);
      atualizarBadgeSync(r.ok ? 'Nuvem OK' : 'Local', r.ok ? 'badge-ok' : 'badge-warn');
    }
    if (!silencioso) toast('Alterações salvas.');
    return true;
  }

  function normalizarNomeChave(txt) {
    return String(txt || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function buscarAgentePorNome(nomeInformado) {
    const alvo = normalizarNomeChave(nomeInformado);
    if (!alvo || alvo.length < 3) return null;
    // Busca EXCLUSIVA pelo Nome Completo no efetivo (NUNCA por matricula ou numero!)
    return (ESTADO?.efetivo || []).find(a => normalizarNomeChave(a.nome) === alvo) || null;
  }

  function verificarNomeNoRolOficial(nomeInformado) {
    const alvo = normalizarNomeChave(nomeInformado);
    if (!alvo || alvo.length < 3) return { constaNoRol: false, agente: null, nomeOficial: '' };
    const noPdf = ROL_EFETIVO_64.find(item => normalizarNomeChave(item[1]) === alvo);
    const noEfetivo = buscarAgentePorNome(nomeInformado);
    if (noPdf || noEfetivo) {
      return {
        constaNoRol: true,
        agente: noEfetivo || null,
        nomeOficial: noEfetivo ? noEfetivo.nome : noPdf[1]
      };
    }
    return { constaNoRol: false, agente: null, nomeOficial: '' };
  }

  function agentePorId(id) { return (ESTADO.efetivo || []).find(x => x.id === id); }

  function agenteLogadoAtual() {
    if (!SESSAO) return null;
    // 1. Vinculo prioritario EXCLUSIVO pelo Nome Completo (ignora acentos/maiusculas)
    if (SESSAO.nome) {
      const porNome = buscarAgentePorNome(SESSAO.nome);
      if (porNome) return porNome;
    }
    // 2. Fallback apenas se o Admin vinculou explicitamente um agenteVinculadoId
    if (SESSAO.agenteVinculadoId) {
      return agentePorId(SESSAO.agenteVinculadoId) || null;
    }
    // NUNCA vincula por matricula ou numero provisorio!
    return null;
  }
  function nomeAgentePorId(id) { const a = agentePorId(id); return a ? `[${a.matricula}] ${a.nomeGuerra || a.nome}` : ''; }

  function descobrirSetorDoAgente(ag) {
    if (!ag) return { id: '', nome: '—', funcao: '—' };
    if (ag.equipe === 'ADM') return { id: 'ADM', nome: 'Administrativo', funcao: 'Administrativo' };
    const mont = ESTADO.equipesMontagem[ag.equipe] || {};
    for (const p of ESTADO.postos) {
      const g = mont[p.id] || {};
      if (g.g01 === ag.id) return { id: p.id, nome: `${p.prefixo} — ${p.setor}`, funcao: '01 — Comandante' };
      if (g.g02 === ag.id) return { id: p.id, nome: `${p.prefixo} — ${p.setor}`, funcao: '02 — Motorista' };
      if (g.g03 === ag.id) return { id: p.id, nome: `${p.prefixo} — ${p.setor}`, funcao: '03 — Patrulheiro' };
    }
    return { id: '', nome: 'Apoio da Equipe', funcao: FUNCOES_LABEL[ag.funcao] || 'Guarda' };
  }

  // Descobre o posto/setor (ex: VTR-01 / Setor 01) e equipe de um guarda numa data (para baixar Cartao Programa direto!)
  function obterSetorDoGuardaNaData(ag, dataISO, postoTextoOpcional) {
    if (!ag) return null;
    const dt = dataISO || hojeISO();
    const ciclo = calcularCiclo24x72(dt);
    const equipeTurno = EQUIPES.includes(ag.equipe) ? ag.equipe : ciclo.equipeServico;

    // 1. Tenta localizar pelo posto atribuido na equipe do guarda
    const inf = descobrirSetorDoAgente(ag);
    if (inf && inf.id) {
      const postoObj = ESTADO.postos.find(p => p.id === inf.id);
      if (postoObj) return { posto: postoObj, equipe: equipeTurno, data: dt };
    }

    // 2. Tenta localizar pelo texto do campo posto (ex: permuta em outra VTR/Setor)
    if (postoTextoOpcional) {
      const txtN = normalizarNomeChave(postoTextoOpcional);
      const porTxt = ESTADO.postos.find(p =>
        txtN.includes(normalizarNomeChave(p.id)) ||
        txtN.includes(normalizarNomeChave(p.prefixo)) ||
        txtN.includes(normalizarNomeChave(p.setor))
      );
      if (porTxt) return { posto: porTxt, equipe: ciclo.equipeServico, data: dt };
    }

    // 3. Verifica se o guarda esta na escala do dia via permuta aprovada
    const { escalados } = obterEscaladosDaData(dt);
    const esc = escalados.find(x => x.agente.id === ag.id);
    if (esc && esc.posto) {
      const txtN = normalizarNomeChave(esc.posto);
      const porEsc = ESTADO.postos.find(p =>
        txtN.includes(normalizarNomeChave(p.id)) ||
        txtN.includes(normalizarNomeChave(p.prefixo)) ||
        txtN.includes(normalizarNomeChave(p.setor))
      );
      if (porEsc) return { posto: porEsc, equipe: ciclo.equipeServico, data: dt };
    }
    return null;
  }

  function gerarPdfCartaoProgramaDoGuarda(agenteId, dataISO, postoTextoOpcional) {
    const ag = agentePorId(agenteId);
    if (!ag) return toast('Guarda não encontrado.');
    const alvo = obterSetorDoGuardaNaData(ag, dataISO, postoTextoOpcional);
    if (!alvo || !alvo.posto) {
      return toast('Nenhum setor/viatura vinculado a este guarda no momento. Consulte a aba Cartão Programa e Mapa.');
    }
    const { posto, equipe, data } = alvo;
    const bloco = blocoHtmlCartaoPrograma(data, equipe, posto);
    const tit = `CARTÃO PROGRAMA — ${posto.prefixo} (${posto.setor})`;
    emitirPdfAutenticado({
      tipoDoc: 'CARTAO_PROGRAMA',
      titulo: tit,
      subtitulo: `Guarda: ${ag.nome} · Data: ${formatarDataBR(data)} · Turno: ${ESTADO.config.horarioTroca} · Equipe ${equipe}`,
      corpoHtml: bloco,
      nomeArquivo: `cartao-${posto.id}-${data}.pdf`,
      paisagem: false,
      qtdRegistros: 1
    });
  }

  // Retorna escalados de uma data integrando 24x72 + ADM + Eventos + PERMUTAS APROVADAS!
  function obterEscaladosDaData(dataISO) {
    const ciclo = calcularCiclo24x72(dataISO);
    const dow = diaSemanaISO(dataISO);
    const diaUtil = dow >= 1 && dow <= 5;
    const lista = [];
    const ids = new Set();

    const permsAprov = (ESTADO.permutas || []).filter(pm => pm.status === 'APROVADA' && (pm.dataOriginal === dataISO || pm.dataCompensacao === dataISO));
    const mapaSubstituido = {};
    permsAprov.forEach(pm => {
      if (pm.dataOriginal === dataISO) mapaSubstituido[pm.solicitanteId] = pm;
      if (pm.dataCompensacao === dataISO) mapaSubstituido[pm.substitutoId] = pm;
    });

    // 1. Equipe 24x72 do dia
    ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === ciclo.equipeServico).forEach(a => {
      ids.add(a.id);
      const inf = descobrirSetorDoAgente(a);
      lista.push({ agente: a, origem: `EQUIPE ${ciclo.equipeServico}`, posto: inf.nome, funcao: inf.funcao, permutaSaida: mapaSubstituido[a.id] || null });
    });

    // 2. Administrativo em dias uteis
    if (diaUtil) {
      ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === 'ADM' && !ids.has(a.id)).forEach(a => {
        ids.add(a.id);
        lista.push({ agente: a, origem: 'ADM (Seg–Sex)', posto: 'Administrativo', funcao: 'Expediente', permutaSaida: mapaSubstituido[a.id] || null });
      });
    }

    // 3. Substitutos entrantes por PERMUTA APROVADA
    permsAprov.forEach(pm => {
      const idEntra = pm.dataOriginal === dataISO ? pm.substitutoId : pm.solicitanteId;
      const idSai = pm.dataOriginal === dataISO ? pm.solicitanteId : pm.substitutoId;
      if (idEntra && !ids.has(idEntra)) {
        const agEntra = agentePorId(idEntra);
        const agSai = agentePorId(idSai);
        if (agEntra) {
          ids.add(agEntra.id);
          const infSai = descobrirSetorDoAgente(agSai);
          lista.push({ agente: agEntra, origem: `PERMUTA (c/ Nº ${agSai ? agSai.matricula : '—'})`, posto: infSai.nome || 'Permuta', funcao: 'Permuta', permutaSaida: null });
        }
      }
    });

    // 4. Eventos extras nesta data
    (ESTADO.eventos || []).filter(ev => ev.data === dataISO).forEach(ev => {
      (ev.viaturas || []).forEach(v => {
        [v.g01, v.g02, v.g03, v.g04].filter(Boolean).forEach(gid => {
          if (ids.has(gid)) return;
          const ag = agentePorId(gid);
          if (ag) { ids.add(ag.id); lista.push({ agente: ag, origem: `EVENTO: ${ev.nome}`, posto: v.prefixo, funcao: 'Extra', permutaSaida: null }); }
        });
      });
    });

    // 5. Qualquer guarda que iniciou/registrou turno efetivo nesta data (nao conta Saida de plantao de ontem!)
    (ESTADO.pontos || []).filter(p => dataTurnoEfetivaPonto(p) === dataISO).forEach(p => {
      if (!ids.has(p.agenteId)) {
        const ag = agentePorId(p.agenteId);
        if (ag) { ids.add(ag.id); lista.push({ agente: ag, origem: 'EXTRA / APOIO', posto: p.posto || '—', funcao: 'Extra', permutaSaida: null }); }
      }
    });

    return { ciclo, diaUtil, escalados: lista };
  }

  function aplicarTema(tema) {
    const t = tema === 'noturno' ? 'noturno' : 'claro';
    document.documentElement.setAttribute('data-tema', t);
    localStorage.setItem('gcm_valp_escala_tema', t);
    $('metaThemeColor')?.setAttribute('content', t === 'noturno' ? '#080808' : '#FFFFFF');
    if ($('btnTema')) $('btnTema').textContent = t === 'noturno' ? 'Modo Claro' : 'Modo Noturno';
    if ($('btnTemaAuth')) $('btnTemaAuth').textContent = t === 'noturno' ? 'Modo Claro (Branco)' : 'Modo Noturno (Preto)';
  }
  function alternarTema() { aplicarTema((document.documentElement.getAttribute('data-tema') || 'claro') === 'noturno' ? 'claro' : 'noturno'); }

  function abrirModal(titulo, corpoHtml, botoes) {
    $('modalTitulo').textContent = titulo; $('modalCorpo').innerHTML = corpoHtml;
    const rod = $('modalRodape'); rod.innerHTML = '';
    (botoes || []).forEach(b => {
      const btn = document.createElement('button'); btn.type = 'button';
      btn.className = 'btn ' + (b.classe || 'btn-sec'); btn.textContent = b.texto;
      btn.addEventListener('click', () => b.onClick && b.onClick());
      rod.appendChild(btn);
    });
    $('modalOverlay').classList.remove('oculto');
  }
  function fecharModal() { $('modalOverlay').classList.add('oculto'); }

  function fecharSidebarMobile() { $('appShell').classList.remove('menu-aberto-mobile'); $('sidebarBackdrop').classList.add('oculto'); }
  function alternarSidebar() {
    if (window.innerWidth <= 1180) {
      const aberto = $('appShell').classList.toggle('menu-aberto-mobile');
      $('sidebarBackdrop').classList.toggle('oculto', !aberto);
    } else $('appShell').classList.toggle('menu-recolhido');
  }

  // =========================================================================
  // MOTOR DE AUTENTICACAO CRIPTOGRAFICA (SHA-256) PARA TODOS OS PDFs E PONTOS
  // =========================================================================
  function calcularHashPonto(ponto, hashAnterior) {
    const fotoDigest = window.EscalaCloud.sha256Hex(String(ponto.foto || '')).slice(0, 16);
    const latStr = ponto.localizacao && typeof ponto.localizacao.lat === 'number' ? ponto.localizacao.lat.toFixed(6) : '0';
    const lonStr = ponto.localizacao && typeof ponto.localizacao.lon === 'number' ? ponto.localizacao.lon.toFixed(6) : '0';
    const payload = [
      hashAnterior || 'GENESIS_GCM_OFICIAL',
      ponto.protocolo || '',
      ponto.agenteMatricula || '',
      ponto.tipo || '',
      ponto.timestampIso || '',
      latStr,
      lonStr,
      fotoDigest
    ].join('|');
    return window.EscalaCloud.sha256Hex(payload);
  }

  function registrarDocumentoAutenticado(tipoDoc, titulo, corpoHtml, qtdRegistros) {
    const emitidoEm = new Date().toISOString();
    const dt = new Date(emitidoEm), p2 = n => String(n).padStart(2,'0');
    const dataCompacta = `${dt.getFullYear()}${p2(dt.getMonth()+1)}${p2(dt.getDate())}`;
    const emissor = SESSAO ? `${SESSAO.nome} (${SESSAO.login} · ${SESSAO.perfil})` : 'Sistema GCM';
    const textoLimpo = String(corpoHtml || '').replace(/\s+/g, ' ').trim();
    const hashSha256 = window.EscalaCloud.sha256Hex(`GCM_VALP_DOC_OFICIAL|${tipoDoc}|${titulo}|${emitidoEm}|${emissor}|${qtdRegistros || 0}|${textoLimpo}`);
    const codigo = `GCM-VALP-${dataCompacta}-${hashSha256.slice(0, 8).toUpperCase()}`;

    const cert = {
      codigo,
      tipoDoc,
      titulo,
      emitidoEm,
      emitidoBR: formatarDataHoraBR(emitidoEm),
      emissor,
      qtdRegistros: qtdRegistros || 0,
      hashSha256
    };
    ESTADO.documentosAutenticados = ESTADO.documentosAutenticados || [];
    ESTADO.documentosAutenticados.unshift(cert);
    if (ESTADO.documentosAutenticados.length > 300) ESTADO.documentosAutenticados = ESTADO.documentosAutenticados.slice(0, 300);
    salvarTudo(true);
    return cert;
  }

  function seloAutenticacaoPdfHtml(cert) {
    return `
      <div class="selo-autenticacao">
        <div class="selo-topo">
          <strong>DOCUMENTO AUTENTICADO CRIPTOGRAFICAMENTE — GCM VALPARAÍSO DE GOIÁS</strong>
          <span>CÓDIGO: <strong>${esc(cert.codigo)}</strong></span>
        </div>
        <div class="selo-grid">
          <div><strong>Emissão Oficial:</strong> ${esc(cert.emitidoBR)} (BRT -03:00)</div>
          <div><strong>Emitido por:</strong> ${esc(cert.emissor)}</div>
          <div><strong>Tipo / Registros:</strong> ${esc(cert.tipoDoc)} (${cert.qtdRegistros})</div>
        </div>
        <div class="selo-hash"><strong>Assinatura Digital SHA-256:</strong> ${esc(cert.hashSha256)}</div>
        <div class="selo-nota">Qualquer alteração posterior no conteúdo invalida esta assinatura. Conferência disponível no menu "Validar Autenticidade" do Sistema GCM.</div>
      </div>
    `;
  }

  // =========================================================================
  // 1. FOLHA DE PONTO (AUTOMATICA + 4 BATIDAS + RECIBO + STATUS POR COR)
  // =========================================================================
  function obterAfastamentoNaData(agenteId, dataISO) {
    return (ESTADO.afastamentos || []).find(af => af.agenteId === agenteId && dataISO >= af.dataInicio && dataISO <= af.dataFim) || null;
  }

  // =========================================================================
  // MOTOR DE VIRADA DE MEIA-NOITE DO PLANTAO 24x72 (EXATIDAO DE 24h REAIS)
  // =========================================================================
  const JANELA_PLANTAO_MS = 32 * 3600000; // ate 32h para fechar um plantao 24h com eventual prorrogacao

  function encontrarPlantaoAberto(agenteId, refIso) {
    if (!agenteId) return null;
    const refMs = refIso ? new Date(refIso).getTime() : Date.now();
    if (isNaN(refMs)) return null;
    const ptsAg = (ESTADO.pontos || [])
      .filter(p => p.agenteId === agenteId && p.timestampIso)
      .slice()
      .sort((a, b) => new Date(a.timestampIso) - new Date(b.timestampIso));

    let entAberta = null;
    for (const p of ptsAg) {
      const tMs = new Date(p.timestampIso).getTime();
      if (isNaN(tMs) || tMs > refMs + 60000) continue;
      if (p.tipo === 'ENTRADA') {
        entAberta = p;
      } else if (p.tipo === 'SAIDA' && entAberta) {
        const entMs = new Date(entAberta.timestampIso).getTime();
        if (tMs >= entMs && (tMs - entMs) <= JANELA_PLANTAO_MS) {
          entAberta = null; // plantao fechado!
        }
      }
    }
    if (!entAberta) return null;
    const decorridoMs = refMs - new Date(entAberta.timestampIso).getTime();
    if (decorridoMs >= 0 && decorridoMs <= JANELA_PLANTAO_MS) {
      return entAberta;
    }
    return null;
  }

  function dataTurnoEfetivaPonto(ponto) {
    if (!ponto) return '';
    if (ponto.dataTurno) return ponto.dataTurno;
    if (ponto.tipo === 'ENTRADA') return ponto.dataLocal;
    // Para batidas antigas sem dataTurno (ex.: SAIDA as 07:00 de D+1), verifica se pertence a uma ENTRADA de D-1 dentro de 32h
    const tMs = new Date(ponto.timestampIso).getTime();
    if (!isNaN(tMs)) {
      const dAnt = somarDiasISO(ponto.dataLocal, -1);
      const ptsAg = (ESTADO.pontos || []).filter(x => x.agenteId === ponto.agenteId && x.timestampIso);
      const entHojeAntes = ptsAg.find(x => x.tipo === 'ENTRADA' && x.dataLocal === ponto.dataLocal && new Date(x.timestampIso).getTime() <= tMs);
      if (entHojeAntes) return ponto.dataLocal;
      const entOntem = ptsAg.find(x => x.tipo === 'ENTRADA' && x.dataLocal === dAnt && (tMs - new Date(x.timestampIso).getTime()) > 0 && (tMs - new Date(x.timestampIso).getTime()) <= JANELA_PLANTAO_MS);
      if (entOntem) return dAnt;
    }
    return ponto.dataLocal;
  }

  function duracaoRealTurnoMin(ent, sai, sAlm, rAlm) {
    if (!ent || !sai) return 0;
    let diff = (new Date(sai.timestampIso) - new Date(ent.timestampIso)) / 60000;
    if (isNaN(diff) || diff <= 0 || diff > 2160) return 0; // max 36h
    if (sAlm && rAlm) {
      const alm = (new Date(rAlm.timestampIso) - new Date(sAlm.timestampIso)) / 60000;
      if (!isNaN(alm) && alm > 0 && alm < 240) diff -= alm;
    }
    return Math.max(0, Math.round(diff));
  }

  function obterBatidasDoTurno(dataISO, agenteId) {
    const dSeg = somarDiasISO(dataISO, 1);
    const ptsAg = (ESTADO.pontos || [])
      .filter(p => p.agenteId === agenteId)
      .slice()
      .sort((a, b) => new Date(a.timestampIso) - new Date(b.timestampIso));

    const ptsTurno = ptsAg.filter(p => dataTurnoEfetivaPonto(p) === dataISO);
    let ent = ptsTurno.find(x => x.tipo === 'ENTRADA') || null;
    let sAlm = ptsTurno.find(x => x.tipo === 'SAIDA_ALMOCO') || null;
    let rAlm = ptsTurno.find(x => x.tipo === 'RETORNO_ALMOCO') || null;
    let sai = [...ptsTurno].reverse().find(x => x.tipo === 'SAIDA') || null;

    // Garante pareamento de SAIDA em D+1 mesmo se gravada em formato legado sem dataTurno
    if (ent && !sai) {
      const entMs = new Date(ent.timestampIso).getTime();
      const proxEnt = ptsAg.find(x => x.tipo === 'ENTRADA' && new Date(x.timestampIso).getTime() > entMs);
      const limiteMs = proxEnt ? new Date(proxEnt.timestampIso).getTime() : (entMs + JANELA_PLANTAO_MS);
      const saiSeg = ptsAg.find(x =>
        x.tipo === 'SAIDA' &&
        (x.dataLocal === dataISO || x.dataLocal === dSeg) &&
        (!x.dataTurno || x.dataTurno === dataISO) &&
        new Date(x.timestampIso).getTime() > entMs &&
        new Date(x.timestampIso).getTime() < limiteMs &&
        (new Date(x.timestampIso).getTime() - entMs) <= JANELA_PLANTAO_MS
      );
      if (saiSeg) {
        sai = saiSeg;
        if (!ptsTurno.some(x => x.id === saiSeg.id)) ptsTurno.push(saiSeg);
      }
    }

    const virouDia = !!(ent && sai && sai.dataLocal !== ent.dataLocal);
    const duracaoMin = duracaoRealTurnoMin(ent, sai, sAlm, rAlm);
    return { ent, sAlm, rAlm, sai, pts: ptsTurno, virouDia, duracaoMin };
  }

  function formatarHoraSaidaTurno(r) {
    if (!r || !r.sai) return '—';
    const h = r.sai.horaLocal.slice(0, 5);
    return r.virouDia ? `${h} (+1d)` : h;
  }

  function resumirDiaAgente(dataISO, agenteId, permutaSaida) {
    const turno = obterBatidasDoTurno(dataISO, agenteId);
    const { ent, sAlm, rAlm, sai, pts, virouDia, duracaoMin } = turno;
    const just = (ESTADO.justificativas || {})[`${dataISO}|${agenteId}`] || null;
    const afast = obterAfastamentoNaData(agenteId, dataISO);
    let status = 'PENDENTE';
    let motivoAuto = null;
    if (afast) {
      const diaAtual = diffDiasISO(dataISO, afast.dataInicio) + 1;
      const rotTipo = TIPO_AFASTAMENTO_LABEL[afast.tipo] || afast.tipo;
      if (afast.tipo === 'FALTA') {
        status = 'FALTOU';
        motivoAuto = `Não Compareceu (${afast.dias}d)`;
      } else {
        status = 'JUSTIFICADO';
        motivoAuto = `${rotTipo} (Dia ${diaAtual}/${afast.dias} · Ret. ${formatarDataBR(afast.dataRetorno).slice(0,5)})`;
      }
    } else if (just) {
      status = just.motivo === 'Falta Injustificada' ? 'FALTOU' : 'JUSTIFICADO';
    } else if (permutaSaida) {
      status = 'JUSTIFICADO';
      const outroId = permutaSaida.solicitanteId === agenteId ? permutaSaida.substitutoId : permutaSaida.solicitanteId;
      const outro = agentePorId(outroId);
      motivoAuto = `Permuta Aprovada (c/ Nº ${outro ? outro.matricula : '—'})`;
    } else if (ent && sai) {
      status = 'PRESENTE';
    } else if (ent || sAlm || rAlm || sai) {
      status = 'EM_SERVICO';
    } else if (dataISO < hojeISO()) {
      status = 'FALTOU';
    }
    return { ent, sAlm, rAlm, sai, just, afast, motivoAuto, status, pts, virouDia, duracaoMin };
  }

  function estiloStatusPonto(r, compacto) {
    if (r.status === 'EM_SERVICO') return { cls: 'badge-ok', txt: compacto ? 'Em Serviço' : 'Em Serviço (Ativo)' };
    if (r.status === 'PRESENTE') return { cls: 'badge-ok', txt: compacto ? 'Turno Completo' : 'Em Serviço (Completo)' };
    if (r.status === 'PENDENTE') return { cls: 'badge-pendente', txt: 'Pendente' };
    if (r.status === 'FALTOU') {
      const det = r.just?.obs ? ` · ${r.just.obs}` : '';
      return { cls: 'badge-erro', txt: compacto ? 'Faltou' : `Faltou${det}` };
    }
    const mot = r.just ? r.just.motivo : (r.motivoAuto || 'Justificado');
    const obs = !compacto && r.just?.obs ? ` · ${r.just.obs}` : '';
    return { cls: 'badge-warn', txt: `${mot}${obs}` };
  }

  function renderFaixaPlantaoHoje() {
    const hoje = hojeISO(), d = new Date();
    const dataExt = `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES_EXT[d.getMonth()]} de ${d.getFullYear()}`;
    $('lblSubtopo').textContent = `${dataExt} · Turno ${ESTADO.config.horarioTroca}`;
    const info = obterEscaladosDaData(hoje);
    const corEq = EQUIPE_CORES[info.ciclo.equipeServico]?.cor || '#18181B';
    $('faixaPlantaoHoje').style.borderLeftColor = corEq;

    // Perfil AGENTE (nem Admin nem Escalante): ve SOMENTE o proprio status — nunca o ponto dos colegas!
    if (!podeEditarEscala()) {
      const meu = agenteLogadoAtual();
      let meuStatusTxt = 'Sem vínculo', meuStatusCls = '', meuSetorTxt = '—';
      if (meu) {
        const plantaoAb = encontrarPlantaoAberto(meu.id, new Date().toISOString());
        const dtRef = (plantaoAb && plantaoAb.dataLocal !== hoje) ? plantaoAb.dataLocal : hoje;
        const meuEsc = info.escalados.find(x => x.agente.id === meu.id);
        const rMeu = resumirDiaAgente(dtRef, meu.id, dtRef === hoje ? meuEsc?.permutaSaida : null);
        const infMeu = descobrirSetorDoAgente(meu);
        meuSetorTxt = infMeu.nome || '—';
        if (meuEsc && !meuEsc.permutaSaida || (plantaoAb && plantaoAb.dataLocal !== hoje)) {
          const stM = estiloStatusPonto(rMeu, true);
          meuStatusTxt = stM.txt;
          meuStatusCls = rMeu.status === 'EM_SERVICO' || rMeu.status === 'PRESENTE' ? 'kpi-ok' : (rMeu.status === 'FALTOU' ? 'kpi-falta' : 'kpi-pend');
        } else if (rMeu.status === 'JUSTIFICADO') {
          meuStatusTxt = estiloStatusPonto(rMeu, true).txt;
        } else {
          meuStatusTxt = 'Folga Hoje';
          meuStatusCls = 'kpi-ok';
        }
      }
      $('faixaPlantaoHoje').innerHTML = `
        <div>
          <div class="subtexto">PLANTÃO EM ANDAMENTO · ${esc(dataExt)}</div>
          <div style="font-size:18px;font-weight:800;margin-top:3px;">
            Serviço 24x72: <span class="insig eq-${info.ciclo.equipeServico}" style="font-size:13px;">EQUIPE ${info.ciclo.equipeServico}</span>
          </div>
          <div class="subtexto mt-4">Amanhã entra: <strong>EQUIPE ${EQUIPES[(EQUIPES.indexOf(info.ciclo.equipeServico)+1)%4]}</strong> · Turno ${esc(ESTADO.config.horarioTroca)}</div>
        </div>
        <div class="faixa-kpis">
          <div class="faixa-kpi ${meuStatusCls}"><strong>${esc(meuStatusTxt)}</strong><span>Meu Ponto</span></div>
          <div class="faixa-kpi"><strong>${esc(meuSetorTxt.split('—')[0].trim())}</strong><span>Meu Setor</span></div>
        </div>
      `;
      return;
    }

    let emServico = 0, pendentes = 0, faltas = 0, justif = 0;
    info.escalados.forEach(item => {
      const r = resumirDiaAgente(hoje, item.agente.id, item.permutaSaida);
      if (r.status === 'EM_SERVICO' || r.status === 'PRESENTE') emServico++;
      else if (r.status === 'FALTOU') faltas++;
      else if (r.status === 'JUSTIFICADO') justif++;
      else pendentes++;
    });
    $('faixaPlantaoHoje').innerHTML = `
      <div>
        <div class="subtexto">PLANTÃO EM ANDAMENTO · ${esc(dataExt)}</div>
        <div style="font-size:18px;font-weight:800;margin-top:3px;">
          Serviço 24x72: <span class="insig eq-${info.ciclo.equipeServico}" style="font-size:13px;">EQUIPE ${info.ciclo.equipeServico}</span>
        </div>
        <div class="subtexto mt-4">Amanhã entra: <strong>EQUIPE ${EQUIPES[(EQUIPES.indexOf(info.ciclo.equipeServico)+1)%4]}</strong> · Turno ${esc(ESTADO.config.horarioTroca)}</div>
      </div>
      <div class="faixa-kpis">
        <div class="faixa-kpi"><strong>${info.escalados.length}</strong><span>Escalados</span></div>
        <div class="faixa-kpi kpi-ok"><strong>${emServico}</strong><span>Em Serviço</span></div>
        <div class="faixa-kpi kpi-pend"><strong>${pendentes}</strong><span>Pendentes</span></div>
        <div class="faixa-kpi kpi-falta"><strong>${faltas}</strong><span>Faltas</span></div>
        <div class="faixa-kpi"><strong>${justif}</strong><span>Justificados</span></div>
      </div>
    `;
  }

  function selecionarGuardaParaPonto(ag) {
    guardaSelecionadoPonto = ag;
    $('listaSugestoesGuarda').classList.add('oculto');
    if (!ag) { $('cardGuardaIdentificado').classList.add('oculto'); return; }
    $('inpIdentificaGuarda').value = ag.nome;
    const hoje = hojeISO();
    const plantaoAberto = encontrarPlantaoAberto(ag.id, new Date().toISOString());
    const dataRefTurno = (plantaoAberto && plantaoAberto.dataLocal !== hoje) ? plantaoAberto.dataLocal : hoje;
    const viradaAberta = !!(plantaoAberto && plantaoAberto.dataLocal !== hoje);

    const { escalados } = obterEscaladosDaData(hoje);
    const escHoje = escalados.find(x => x.agente.id === ag.id);
    const resumo = resumirDiaAgente(dataRefTurno, ag.id, dataRefTurno === hoje ? escHoje?.permutaSaida : null);

    if (viradaAberta) {
      $('selPontoTipo').value = 'SAIDA';
    } else if (!resumo.ent) {
      $('selPontoTipo').value = 'ENTRADA';
    } else {
      $('selPontoTipo').value = 'SAIDA';
    }

    const infSetor = descobrirSetorDoAgente(ag);
    $('inpPontoPosto').value = viradaAberta ? (plantaoAberto.posto || infSetor.nome) : (escHoje ? escHoje.posto : infSetor.nome);

    const card = $('cardGuardaIdentificado');
    card.classList.remove('oculto');
    const linhaStatusEsc = viradaAberta
      ? `<span class="badge badge-pendente">PLANTÃO 24h ABERTO DESDE ${formatarDataBR(plantaoAberto.dataLocal)} às ${esc(plantaoAberto.horaLocal.slice(0,5))}</span> · Saída fecha o turno automaticamente`
      : (escHoje ? `<span class="badge badge-ok">ESCALADO HOJE</span> · ${esc(escHoje.posto)} (${esc(escHoje.funcao)})` : `<span class="badge badge-warn">FORA DA ESCALA DE HOJE</span> · Registro de permuta/extra`);
    const setorCp = obterSetorDoGuardaNaData(ag, dataRefTurno, $('inpPontoPosto').value);
    card.innerHTML = `
      <div class="card-cab">
        <strong>${esc(ag.nome)}</strong>
        <span class="insig eq-${esc(ag.equipe)}">${esc(ag.equipe)}</span>
      </div>
      <div>${linhaStatusEsc}</div>
      <div class="subtexto">Turno ${formatarDataBR(dataRefTurno)}: Entrada <strong>${resumo.ent ? resumo.ent.horaLocal.slice(0,5) : '—'}</strong> · Saída <strong>${formatarHoraSaidaTurno(resumo)}</strong></div>
      ${setorCp ? `<div class="acoes-linha mt-4"><button type="button" class="btn btn-acao-destaque btn-sm" id="btnBaixarCpDoCardGuarda">Baixar Cartão Programa (${esc(setorCp.posto.setor)})</button></div>` : ''}
    `;
    const btnCpCard = $('btnBaixarCpDoCardGuarda');
    if (btnCpCard) {
      btnCpCard.addEventListener('click', () => gerarPdfCartaoProgramaDoGuarda(ag.id, dataRefTurno, $('inpPontoPosto').value));
    }
    atualizarBoxJanelaHorario();
  }

  function buscarGuardaDigitado() {
    const raw = ($('inpIdentificaGuarda').value || '').trim();
    const box = $('listaSugestoesGuarda');
    if (!raw) { guardaSelecionadoPonto = null; $('cardGuardaIdentificado').classList.add('oculto'); box.classList.add('oculto'); return; }
    // Se digitar apenas numeros (ex: 050), avisa para digitar o NOME (nunca vincula por numero!)
    if (/^[0-9\s.-]+$/.test(raw)) {
      guardaSelecionadoPonto = null; $('cardGuardaIdentificado').classList.add('oculto');
      box.innerHTML = '<div class="sug-item"><span class="subtexto">O vínculo é feito exclusivamente pelo <strong>Nome Completo</strong> (não digite número/matrícula).</span></div>';
      box.classList.remove('oculto');
      return;
    }
    const qNorm = normalizarNomeChave(raw);
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    const exatoNome = ativos.find(a => normalizarNomeChave(a.nome) === qNorm);
    if (exatoNome) { selecionarGuardaParaPonto(exatoNome); return; }

    const matches = ativos.filter(a =>
      normalizarNomeChave(a.nome).includes(qNorm) ||
      normalizarNomeChave(a.nomeGuerra || '').includes(qNorm)
    ).slice(0, 6);

    if (!matches.length) {
      guardaSelecionadoPonto = null; $('cardGuardaIdentificado').classList.add('oculto');
      box.innerHTML = '<div class="sug-item"><span class="subtexto">Nenhum guarda encontrado com este nome na base oficial.</span></div>'; box.classList.remove('oculto'); return;
    }
    box.innerHTML = matches.map(a => `<div class="sug-item" data-pick-ag="${esc(a.id)}"><span><strong>${esc(a.nome)}</strong></span><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span></div>`).join('');
    box.classList.remove('oculto');
    box.querySelectorAll('[data-pick-ag]').forEach(el => el.addEventListener('click', () => selecionarGuardaParaPonto(agentePorId(el.getAttribute('data-pick-ag')))));
  }

  function renderResumoEscaladosHoje() {
    const hoje = hojeISO(), { ciclo, escalados } = obterEscaladosDaData(hoje);
    const titEl = $('tituloResumoHoje');

    // PRIVACIDADE: perfil AGENTE ve EXCLUSIVAMENTE o proprio ponto (nunca o dos colegas!)
    if (!podeEditarEscala()) {
      if (titEl) titEl.textContent = 'Meu Ponto Hoje (Privado)';
      const meu = agenteLogadoAtual();
      if (!meu) {
        $('lblResumoEscaladosHoje').textContent = `${formatarDataBR(hoje)} · Conta sem vínculo nominal no efetivo`;
        $('tbodyResumoHoje').innerHTML = '<tr><td colspan="6" class="subtexto" style="text-align:center;padding:14px;">Seu nome ainda não está vinculado à base oficial. Solicite ao Administrador.</td></tr>';
        return;
      }
      const plantaoAb = encontrarPlantaoAberto(meu.id, new Date().toISOString());
      const dtRef = (plantaoAb && plantaoAb.dataLocal !== hoje) ? plantaoAb.dataLocal : hoje;
      const itemMeu = escalados.find(x => x.agente.id === meu.id);
      const r = resumirDiaAgente(dtRef, meu.id, dtRef === hoje ? itemMeu?.permutaSaida : null);
      const infSetor = descobrirSetorDoAgente(meu);
      const postoLabel = itemMeu ? itemMeu.posto : (infSetor.nome || '—');
      const estaEsc = !!(itemMeu && !itemMeu.permutaSaida) || !!(plantaoAb && plantaoAb.dataLocal !== hoje);
      const st = estaEsc || r.ent || r.sai || r.status === 'JUSTIFICADO'
        ? estiloStatusPonto(r, true)
        : { cls: 'badge-ok', txt: 'Folga Hoje' };
      const setorCp = obterSetorDoGuardaNaData(meu, dtRef, postoLabel);
      $('lblResumoEscaladosHoje').textContent = `${formatarDataBR(dtRef)} · Visualização individual (somente o seu ponto)`;
      $('tbodyResumoHoje').innerHTML = `
        <tr>
          <td><strong>${esc(meu.matricula)}</strong></td>
          <td><strong>${esc(meu.nomeGuerra || meu.nome)}</strong></td>
          <td>${esc(postoLabel)}</td>
          <td>${r.ent ? r.ent.horaLocal.slice(0,5) : '—'}</td>
          <td>${formatarHoraSaidaTurno(r)}</td>
          <td><span class="badge ${st.cls}">${esc(st.txt)}</span></td>
        </tr>
        ${setorCp ? `<tr><td colspan="6" style="padding:10px;"><button type="button" class="btn btn-acao-destaque btn-sm btn-bloco" id="btnCpResumoMeuPonto">Baixar Cartão Programa do Meu Setor (${esc(setorCp.posto.prefixo)} — ${esc(setorCp.posto.setor)})</button></td></tr>` : ''}
      `;
      const bCp = $('btnCpResumoMeuPonto');
      if (bCp) bCp.addEventListener('click', () => gerarPdfCartaoProgramaDoGuarda(meu.id, dtRef, postoLabel));
      return;
    }

    if (titEl) titEl.textContent = 'Escalados Hoje — Resumo em Tempo Real';
    $('lblResumoEscaladosHoje').textContent = `${formatarDataBR(hoje)} · Equipe ${ciclo.equipeServico} (${escalados.length} escalados)`;
    $('tbodyResumoHoje').innerHTML = escalados.map(item => {
      const a = item.agente, r = resumirDiaAgente(hoje, a.id, item.permutaSaida), st = estiloStatusPonto(r, true);
      return `<tr><td><strong>${esc(a.matricula)}</strong></td><td><strong>${esc(a.nomeGuerra || a.nome)}</strong></td><td>${esc(item.posto)}</td><td>${r.ent ? r.ent.horaLocal.slice(0,5) : '—'}</td><td>${formatarHoraSaidaTurno(r)}</td><td><span class="badge ${st.cls}">${esc(st.txt)}</span></td></tr>`;
    }).join('') || '<tr><td colspan="6" class="subtexto" style="text-align:center;">Nenhum escalado hoje.</td></tr>';
  }

  function renderFrequenciaDia() {
    if (!podeEditarEscala()) {
      if ($('tbodyFrequenciaDia')) $('tbodyFrequenciaDia').innerHTML = '<tr><td colspan="7" class="subtexto" style="text-align:center;padding:16px;">Acesso restrito ao Escalante e Administrador.</td></tr>';
      return;
    }
    const data = $('inpFreqData').value || hojeISO(); $('inpFreqData').value = data;
    const busca = ($('fltFreqBusca').value || '').trim().toLowerCase(), fltSit = $('fltFreqSituacao').value || '';
    const { ciclo, diaUtil, escalados } = obterEscaladosDaData(data);
    $('boxInfoEscalaDiaFreq').innerHTML = `<strong>${formatarDataBR(data)} (${DIAS_SEMANA[diaSemanaISO(data)]}):</strong> Escala 24x72: <span class="insig eq-${ciclo.equipeServico}">EQUIPE ${ciclo.equipeServico}</span> · ${diaUtil ? 'Expediente Administrativo ativo' : 'Fim de semana'} · Escalados: <strong>${escalados.length}</strong>`;

    const filtrados = escalados.filter(item => {
      const a = item.agente, r = resumirDiaAgente(data, a.id, item.permutaSaida);
      if (fltSit && r.status !== fltSit) return false;
      if (busca && !(a.nome.toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca))) return false;
      return true;
    });

    $('tbodyFrequenciaDia').innerHTML = filtrados.map(item => {
      const a = item.agente, r = resumirDiaAgente(data, a.id, item.permutaSaida), st = estiloStatusPonto(r, false);
      const celH = (pt, extraTag) => pt ? `<strong>${pt.horaLocal.slice(0,5)}${extraTag ? ' <small>'+extraTag+'</small>' : ''}</strong>${pt.foto ? ` <img src="${pt.foto}" class="foto-thumb" style="width:24px;height:24px;vertical-align:middle;" data-ver-ponto="${esc(pt.id)}">` : ''}` : '<span class="subtexto">—</span>';
      return `
        <tr>
          <td><strong>${esc(a.matricula)}</strong></td>
          <td><strong>${esc(a.nome)}</strong></td>
          <td><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span> <span class="subtexto">${esc(item.posto)}</span></td>
          <td>${celH(r.ent)}</td><td>${celH(r.sai, r.virouDia ? '(+1d)' : '')}</td>
          <td><span class="badge ${st.cls}">${esc(st.txt)}</span></td>
          <td class="so-gestao">${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-just-ag="${esc(a.id)}">${r.just ? 'Alterar' : 'Falta / Justificar'}</button>` : '—'}</td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="7" class="subtexto" style="text-align:center;padding:16px;">Nenhum registro para este filtro.</td></tr>';

    $('tbodyFrequenciaDia').querySelectorAll('[data-ver-ponto]').forEach(img => img.addEventListener('click', () => abrirDetalhePonto(img.getAttribute('data-ver-ponto'))));
    $('tbodyFrequenciaDia').querySelectorAll('[data-just-ag]').forEach(btn => btn.addEventListener('click', () => abrirModalJustificativa(data, btn.getAttribute('data-just-ag'))));
  }

  function abrirModalJustificativa(dataISO, agenteId) {
    if (!podeEditarEscala()) return toast('Apenas Administrador ou Escalante.');
    const ag = agentePorId(agenteId); if (!ag) return;
    const chave = `${dataISO}|${agenteId}`, atual = (ESTADO.justificativas || {})[chave] || { motivo: 'Atestado Médico', obs: '' };
    abrirModal(`Falta / Justificativa — Nº ${ag.matricula} ${ag.nome}`,
      `<div class="subtexto">Data: <strong>${formatarDataBR(dataISO)}</strong></div>
       <div class="campo"><label>Motivo</label><select id="mJustMotivo">${JUSTIFICATIVAS_OPCOES.map(m => `<option value="${esc(m)}" ${atual.motivo === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select></div>
       <div class="campo"><label>Observação</label><textarea id="mJustObs" rows="3">${esc(atual.obs || '')}</textarea></div>`,
      [
        ...(ESTADO.justificativas?.[chave] ? [{ texto: 'Remover', classe: 'btn-perigo', onClick: async () => { delete ESTADO.justificativas[chave]; await salvarTudo(); fecharModal(); renderFrequenciaDia(); renderResumoEscaladosHoje(); renderFaixaPlantaoHoje(); }}] : []),
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Salvar', classe: 'btn-primario', onClick: async () => { ESTADO.justificativas = ESTADO.justificativas || {}; ESTADO.justificativas[chave] = { motivo: $('mJustMotivo').value, obs: $('mJustObs').value.trim(), por: SESSAO?.nome || 'Gestão', em: new Date().toISOString() }; await salvarTudo(); fecharModal(); renderFrequenciaDia(); renderResumoEscaladosHoje(); renderFaixaPlantaoHoje(); }}
      ]
    );
  }

  // Camera + Localizacao Automatica
  async function abrirCameraAoVivo() {
    pararCamera();
    coletarLocalizacaoAutomatica(false);
    try {
      streamCamera = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      const v = $('videoCamera'); v.srcObject = streamCamera; v.classList.remove('oculto');
      $('placeholderCamera').classList.add('oculto'); $('imgPreviewFoto').classList.add('oculto');
      $('btnCapturarFoto').disabled = false; $('btnRefazerFoto').disabled = true;
      $('statusFoto').textContent = 'Câmera ativa'; $('statusFoto').className = 'badge badge-warn';
    } catch (e) { toast('Permita acesso à câmera (HTTPS obrigatório no celular).'); }
  }
  function pararCamera() { if (streamCamera) { streamCamera.getTracks().forEach(t => t.stop()); streamCamera = null; } }

  let qualidadeFotoAtual = null;

  function analisarQualidadeFrame(ctx, w, h) {
    try {
      const imgData = ctx.getImageData(0, 0, w, Math.max(1, h - 54)).data;
      let soma = 0, somaSq = 0, n = 0;
      for (let i = 0; i < imgData.length; i += 16) {
        const lum = 0.299 * imgData[i] + 0.587 * imgData[i+1] + 0.114 * imgData[i+2];
        soma += lum; somaSq += lum * lum; n++;
      }
      const media = n ? soma / n : 120;
      const variancia = n ? Math.max(0, (somaSq / n) - (media * media)) : 1000;
      const desvio = Math.sqrt(variancia);
      if (media < 24 || desvio < 10) return { ok: false, motivo: 'Foto escura ou câmera obstruída', brilho: Math.round(media), contraste: Math.round(desvio) };
      if (media > 240 && desvio < 14) return { ok: false, motivo: 'Foto estourada / excesso de claridade', brilho: Math.round(media), contraste: Math.round(desvio) };
      return { ok: true, motivo: 'Imagem nítida', brilho: Math.round(media), contraste: Math.round(desvio) };
    } catch (_) {
      return { ok: true, motivo: 'Imagem capturada', brilho: 120, contraste: 40 };
    }
  }

  function calcularSimilaridadeVisualBase(dataUrlA, dataUrlB) {
    return new Promise((resolve) => {
      if (!dataUrlA || !dataUrlB) return resolve(null);
      const imgA = new Image(), imgB = new Image();
      let carregadas = 0;
      const processar = () => {
        if (++carregadas < 2) return;
        try {
          const sz = 24, ca = document.createElement('canvas'), cb = document.createElement('canvas');
          ca.width = cb.width = sz; ca.height = cb.height = sz;
          const xa = ca.getContext('2d'), xb = cb.getContext('2d');
          // Foca na area central superior (rosto), ignorando o carimbo de rodape
          xa.drawImage(imgA, imgA.width * 0.15, imgA.height * 0.05, imgA.width * 0.70, imgA.height * 0.72, 0, 0, sz, sz);
          xb.drawImage(imgB, imgB.width * 0.15, imgB.height * 0.05, imgB.width * 0.70, imgB.height * 0.72, 0, 0, sz, sz);
          const da = xa.getImageData(0, 0, sz, sz).data, db = xb.getImageData(0, 0, sz, sz).data;
          const va = [], vb = [];
          for (let i = 0; i < da.length; i += 4) {
            va.push(0.299 * da[i] + 0.587 * da[i+1] + 0.114 * da[i+2]);
            vb.push(0.299 * db[i] + 0.587 * db[i+1] + 0.114 * db[i+2]);
          }
          const ma = va.reduce((s, x) => s + x, 0) / va.length;
          const mb = vb.reduce((s, x) => s + x, 0) / vb.length;
          let num = 0, denA = 0, denB = 0;
          for (let i = 0; i < va.length; i++) {
            const x = va[i] - ma, y = vb[i] - mb;
            num += x * y; denA += x * x; denB += y * y;
          }
          const corr = (denA > 0 && denB > 0) ? (num / Math.sqrt(denA * denB)) : 0;
          const pct = Math.max(0, Math.min(100, Math.round(((corr + 1) / 2) * 100)));
          resolve(pct);
        } catch (_) { resolve(null); }
      };
      imgA.onload = processar; imgB.onload = processar;
      imgA.onerror = () => resolve(null); imgB.onerror = () => resolve(null);
      imgA.src = dataUrlA; imgB.src = dataUrlB;
    });
  }

  function capturarFotoComCarimbo() {
    const v = $('videoCamera'), c = $('canvasFoto'); if (!v || !v.videoWidth) return toast('Aguarde a câmera.');
    const w = 420, h = Math.round((v.videoHeight / v.videoWidth) * w) || 315;
    c.width = w; c.height = h; const ctx = c.getContext('2d'); ctx.drawImage(v, 0, 0, w, h);
    qualidadeFotoAtual = analisarQualidadeFrame(ctx, w, h);
    const ag = guardaSelecionadoPonto, tipo = TIPO_PONTO_LABEL[$('selPontoTipo').value] || $('selPontoTipo').value, agora = formatarDataHoraBR(new Date().toISOString());
    ctx.fillStyle = 'rgba(0,0,0,0.82)'; ctx.fillRect(0, h - 50, w, 50); ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px monospace'; ctx.fillText(`GCM VALPARAÍSO-GO · ${tipo.toUpperCase()} · ${agora}`, 8, h - 32);
    ctx.font = '10px monospace'; ctx.fillText(`Nº ${ag ? ag.matricula + ' — ' + ag.nome : 'Não identificado'}`, 8, h - 16);
    if (locAtualPonto?.lat) ctx.fillText(`GPS: ${locAtualPonto.lat.toFixed(5)}, ${locAtualPonto.lon.toFixed(5)}`, 8, h - 4);
    fotoCapturadaDataUrl = c.toDataURL('image/jpeg', 0.60);
    pararCamera(); v.classList.add('oculto');
    const img = $('imgPreviewFoto'); img.src = fotoCapturadaDataUrl; img.classList.remove('oculto');
    $('btnCapturarFoto').disabled = true; $('btnRefazerFoto').disabled = false;
    if (qualidadeFotoAtual && !qualidadeFotoAtual.ok) {
      $('statusFoto').textContent = 'Foto Escura / Conferir'; $('statusFoto').className = 'badge badge-pendente';
      toast('Aviso: ' + qualidadeFotoAtual.motivo + '. Se puder, refaça em local mais iluminado.');
    } else {
      $('statusFoto').textContent = 'Foto OK'; $('statusFoto').className = 'badge badge-ok';
    }
  }

  function distanciaMetros(la1, lo1, la2, lo2) {
    const R = 6371000, rad = v => v * Math.PI / 180;
    const a = Math.sin(rad(la2-la1)/2)**2 + Math.cos(rad(la1))*Math.cos(rad(la2))*Math.sin(rad(lo2-lo1)/2)**2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  function normGeoTxt(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function pontoNoPoligono(lat, lon, pts) {
    let dentro = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const xi = pts[i][0], yi = pts[i][1], xj = pts[j][0], yj = pts[j][1];
      const interc = ((yi > lon) !== (yj > lon)) && (lat < (xj - xi) * (lon - yi) / ((yj - yi) || 1e-12) + xi);
      if (interc) dentro = !dentro;
    }
    return dentro;
  }

  function verificarCidadeValparaiso(cidade, bairro, uf, textoCompleto) {
    const ufN = normGeoTxt(uf);
    if (ufN && !['go', 'goias'].includes(ufN)) return false;
    const cidN = normGeoTxt(cidade);
    const baiN = normGeoTxt(bairro);
    const txtN = normGeoTxt(textoCompleto);
    if (cidN.includes('valparaiso de goias') || cidN === 'valparaiso') return true;
    if (cidN && !cidN.includes('valparaiso')) return false;
    if (baiN.includes('valparaiso de goias') || txtN.includes('valparaiso de goias')) return true;
    return null;
  }

  function setorValparaisoPorCoord(lat, lon) {
    const la = Number(lat), lo = Number(lon);
    if (!isFinite(la) || !isFinite(lo)) return '';
    for (const p of (ESTADO?.postos || [])) {
      const poly = p.poligono;
      if (Array.isArray(poly) && poly.length >= 3 && pontoNoPoligono(la, lo, poly)) {
        return p.setor || p.prefixo || '';
      }
    }
    return '';
  }

  function hhmmParaMin(hhmm, fallbackMin) {
    const m = String(hhmm || '').match(/^(\d{1,2}):(\d{2})/);
    if (!m) return fallbackMin;
    return Number(m[1]) * 60 + Number(m[2]);
  }

  function minParaHHMM(min) {
    const norm = ((Math.round(min) % 1440) + 1440) % 1440;
    return `${String(Math.floor(norm / 60)).padStart(2, '0')}:${String(norm % 60).padStart(2, '0')}`;
  }

  function avaliarHorarioEntrada(ag, horaHHMM) {
    const regras = ESTADO?.config?.bancoHoras || {};
    const ehAdm = ag && ag.equipe === 'ADM';
    const previstoStr = ehAdm ? (regras.horaInicioAdm || '08:00') : (regras.horaInicio24 || '07:00');
    const prevMin = hhmmParaMin(previstoStr, ehAdm ? 480 : 420);
    const antMin = Math.max(0, Number(regras.antecedenciaMin ?? 30));
    const tolMin = Math.max(0, Number(regras.toleranciaAtrasoMin ?? 10));
    const janIni = prevMin - antMin;
    const janFim = prevMin + tolMin;

    const agora = new Date();
    const realMin = horaHHMM ? hhmmParaMin(horaHHMM, agora.getHours() * 60 + agora.getMinutes()) : (agora.getHours() * 60 + agora.getMinutes());
    const diff = realMin - prevMin;

    let status = 'NO_HORARIO', badgeCls = 'badge-ok', resumo = 'Dentro do horário estipulado';
    let atrasoMin = 0, antecipadoMin = 0;

    if (realMin >= janIni && realMin <= janFim) {
      status = 'NO_HORARIO';
      badgeCls = 'badge-ok';
      resumo = diff < 0 ? `No horário (${Math.abs(diff)} min antes · liberado desde ${minParaHHMM(janIni)})` : (diff === 0 ? 'Pontual (no horário exato)' : `No horário (dentro da tolerância até ${minParaHHMM(janFim)})`);
    } else if (realMin < janIni) {
      antecipadoMin = prevMin - realMin;
      status = 'ANTECIPADO';
      badgeCls = 'badge-pendente';
      resumo = `Antecipado (${antecipadoMin} min antes do previsto ${previstoStr} · janela inicia às ${minParaHHMM(janIni)})`;
    } else {
      atrasoMin = realMin - prevMin;
      status = 'ATRASADO';
      badgeCls = 'badge-erro';
      resumo = `Atraso de +${atrasoMin} min (previsto ${previstoStr}, tolerância até ${minParaHHMM(janFim)} · reflete no Banco de Horas)`;
    }

    return {
      status, badgeCls, resumo, previsto: previstoStr,
      janelaIni: minParaHHMM(janIni), janelaFim: minParaHHMM(janFim),
      antMin, tolMin, diferencaMin: diff, atrasoMin, antecipadoMin
    };
  }

  function atualizarBoxJanelaHorario() {
    const box = $('boxJanelaHorarioPonto');
    if (!box) return;
    const tipo = $('selPontoTipo')?.value || 'ENTRADA';
    const ag = guardaSelecionadoPonto;
    if (!ag || tipo !== 'ENTRADA') {
      box.classList.add('oculto');
      return;
    }
    const av = avaliarHorarioEntrada(ag, null);
    box.classList.remove('oculto');
    box.innerHTML = `
      <div>
        <strong>Horário previsto (${ag.equipe === 'ADM' ? 'Administrativo' : '24x72'}): ${esc(av.previsto)}</strong>
        <div class="subtexto">Janela regular: <strong>${esc(av.janelaIni)} às ${esc(av.janelaFim)}</strong> (até ${av.antMin} min antes / ${av.tolMin} min de tolerância)</div>
      </div>
      <span class="badge ${av.badgeCls}">${av.status === 'NO_HORARIO' ? 'No Horário' : (av.status === 'ATRASADO' ? `Atraso +${av.atrasoMin}m` : 'Antecipado')}</span>
    `;
  }

  function pontoDentroDeValparaiso(lat, lon, geoObj) {
    const la = Number(lat), lo = Number(lon);
    if (!isFinite(la) || !isFinite(lo)) return true;
    // 1. Prioridade absoluta: municipio confirmado na consulta real
    if (geoObj && geoObj.confirmado && typeof geoObj.ehValparaisoReal === 'boolean') {
      return geoObj.ehValparaisoReal;
    }
    // 2. Poligonos dos setores oficiais de Valparaiso de Goias
    for (const p of (ESTADO?.postos || [])) {
      const poly = p.poligono;
      if (Array.isArray(poly) && poly.length >= 3 && pontoNoPoligono(la, lo, poly)) return true;
    }
    // 3. Limite municipal estrito de Valparaiso de Goias - GO (mesmo criterio do CCO Viaturas)
    return la >= -16.1080 && la <= -16.0380 && lo >= -48.0220 && lo <= -47.9480;
  }

  async function consultarEnderecoReal(lat, lon) {
    const fj = async (u) => { const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 4500); try { const r = await fetch(u, { signal: ctrl.signal }); clearTimeout(t); return r.ok ? await r.json() : null; } catch (_) { clearTimeout(t); return null; } };
    const nom = await fj(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=pt-BR`);
    if (nom?.address) {
      const a = nom.address;
      const cid = a.city || a.town || a.municipality || a.village || '';
      const bai = a.suburb || a.neighbourhood || a.quarter || '';
      const uf = a.state_code || a.state || '';
      const txt = [(a.road||bai||'') + (a.house_number ? ', '+a.house_number : ''), bai, cid, uf].filter(Boolean).join(', ');
      if (txt.trim()) {
        return { texto: txt, cidade: cid, bairro: bai, uf, confirmado: true, ehValparaisoReal: verificarCidadeValparaiso(cid, bai, uf, txt), regiaoResumo: [bai, cid, uf].filter(Boolean).join(', ') };
      }
    }
    const ph = await fj(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`);
    if (ph?.features?.[0]?.properties) {
      const p = ph.features[0].properties;
      const cid = p.city || p.locality || '', bai = p.district || '', uf = p.state || '';
      const txt = [p.street||p.name, bai, cid, uf].filter(Boolean).join(', ');
      if (txt.trim()) {
        return { texto: txt, cidade: cid, bairro: bai, uf, confirmado: true, ehValparaisoReal: verificarCidadeValparaiso(cid, bai, uf, txt), regiaoResumo: [bai, cid, uf].filter(Boolean).join(', ') };
      }
    }
    const bdc = await fj(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`);
    if (bdc && (bdc.city || bdc.locality)) {
      const cid = bdc.city || '', bai = bdc.locality || '', uf = bdc.principalSubdivision || '';
      const txt = [bai, cid, uf].filter(Boolean).join(', ');
      return { texto: txt, cidade: cid, bairro: bai, uf, confirmado: true, ehValparaisoReal: verificarCidadeValparaiso(cid, bai, uf, txt), regiaoResumo: txt };
    }
    return { texto: `Localidade não confirmada (offline) · Lat ${lat.toFixed(6)}, Lon ${lon.toFixed(6)}`, cidade: '', bairro: '', uf: '', confirmado: false, ehValparaisoReal: null, regiaoResumo: `Lat ${lat.toFixed(5)}, Lon ${lon.toFixed(5)}` };
  }

  async function coletarLocalizacaoAutomatica(forcar) {
    if (!navigator.geolocation) {
      if ($('statusGpsBadge')) { $('statusGpsBadge').textContent = 'GPS Indisponível'; $('statusGpsBadge').className = 'badge badge-erro'; }
      return null;
    }
    if (!forcar && locAtualPonto && (Date.now() - locAtualTs) < 120000) return locAtualPonto;
    if (promessaGpsAtiva) return promessaGpsAtiva;

    promessaGpsAtiva = (async () => {
      if ($('statusGpsBadge')) { $('statusGpsBadge').textContent = 'Localizando automaticamente...'; $('statusGpsBadge').className = 'badge badge-pendente'; }
      const amostras = []; let errG = null;

      // Etapa 1: Alta precisao (ate 8s; encerra cedo assim que pegar 2 leituras ou 2.5s apos a 1a)
      await new Promise(resolve => {
        let fim = false, timerPos1 = null;
        const done = () => { if (fim) return; fim = true; if (timerPos1) clearTimeout(timerPos1); try { navigator.geolocation.clearWatch(wid); } catch (_) {} resolve(); };
        const wid = navigator.geolocation.watchPosition(pos => {
          const c = pos.coords;
          amostras.push({ lat: c.latitude, lon: c.longitude, accuracy: c.accuracy, altitude: c.altitude, ts: pos.timestamp || Date.now(), mocked: !!(pos.mocked || c.mocked), modo: 'GPS' });
          if (amostras.length >= 2) done();
          else if (!timerPos1) timerPos1 = setTimeout(done, 2200);
        }, e => { errG = e; done(); }, { enableHighAccuracy: true, maximumAge: 15000, timeout: 10000 });
        setTimeout(done, 8000);
      });

      // Etapa 2: Fallback automatico por Rede/Wi-Fi (resolve ambiente fechado e notebooks sem chip GPS!)
      if (!amostras.length && (!errG || errG.code !== 1)) {
        await new Promise(resolve => {
          navigator.geolocation.getCurrentPosition(pos => {
            const c = pos.coords;
            amostras.push({ lat: c.latitude, lon: c.longitude, accuracy: c.accuracy, altitude: c.altitude, ts: pos.timestamp || Date.now(), mocked: !!(pos.mocked || c.mocked), modo: 'REDE' });
            resolve();
          }, e => { errG = e; resolve(); }, { enableHighAccuracy: false, maximumAge: 60000, timeout: 10000 });
        });
      }

      if (!amostras.length) {
        const ehArquivoLocal = location.protocol === 'file:' && !window.escalaAPI;
        let motivoDet = '';
        if (ehArquivoLocal) {
          motivoDet = 'Você abriu o arquivo index.html direto da pasta (file://). O Chrome/Edge bloqueia o GPS em arquivo solto — abra pelo link HTTPS do GitHub Pages ou pelo aplicativo .exe.';
        } else if (errG && errG.code === 1) {
          motivoDet = 'Permissão de localização negada pelo navegador ou pelo Windows. Clique no cadeado ao lado do endereço do site → Localização → Permitir (no Windows: Configurações → Privacidade → Localização).';
        } else if (errG && errG.code === 2) {
          motivoDet = 'Sinal de localização indisponível neste local fechado/computador. Verifique se o Wi-Fi ou GPS está ativo e tente perto de uma janela.';
        } else {
          motivoDet = 'O GPS demorou para responder neste ambiente. Aguarde um instante e tente novamente.';
        }
        if ($('statusGpsBadge')) { $('statusGpsBadge').textContent = 'Ajuste a Localização'; $('statusGpsBadge').className = 'badge badge-erro'; }
        if ($('painelResultadoGps')) {
          $('painelResultadoGps').innerHTML = `<div class="alerta-inline erro">${esc(motivoDet)}</div><div class="mt-8"><button type="button" class="btn btn-sec btn-sm" id="btnRetryGpsAuto">Tentar Novamente</button></div>`;
          const bRetry = $('btnRetryGpsAuto');
          if (bRetry) bRetry.addEventListener('click', () => coletarLocalizacaoAutomatica(true));
        }
        return null;
      }

      const ult = amostras[amostras.length - 1];
      let irregular = amostras.some(a => a.mocked);
      if (amostras.length >= 2 && amostras.every(a => a.lat === amostras[0].lat && a.lon === amostras[0].lon) && [0,1,3,5,10].includes(ult.accuracy) && ult.altitude === null) irregular = true;
      for (let i = 1; i < amostras.length; i++) {
        const dist = distanciaMetros(amostras[i-1].lat, amostras[i-1].lon, amostras[i].lat, amostras[i].lon);
        const dtS = Math.max(0.5, (amostras[i].ts - amostras[i-1].ts) / 1000);
        if (dist > 120 && (dist / dtS) * 3.6 > 160) irregular = true;
      }
      const distBase = Math.round(distanciaMetros(ult.lat, ult.lon, Number(ESTADO.config.baseLat||-16.0658), Number(ESTADO.config.baseLon||-47.9756)));
      const resumoDist = distBase < 1000 ? `${distBase}m da Base` : `${(distBase/1000).toFixed(2)} km da Base`;
      const geoObj = await consultarEnderecoReal(ult.lat, ult.lon);
      const endereco = geoObj.texto;
      const dentroValparaiso = pontoDentroDeValparaiso(ult.lat, ult.lon, geoObj);
      const setorDetectado = dentroValparaiso ? setorValparaisoPorCoord(ult.lat, ult.lon) : '';
      const status = irregular ? 'IRREGULAR' : (dentroValparaiso ? 'OK' : 'FORA_VALPARAISO');
      locAtualPonto = {
        lat: ult.lat, lon: ult.lon, accuracy: Math.round(ult.accuracy),
        distBase, resumoDist, endereco, regiaoResumo: geoObj.regiaoResumo || endereco,
        setorDetectado, dentroValparaiso, status, modo: ult.modo || 'GPS'
      };
      locAtualTs = Date.now();

      const stLabel = status === 'OK' ? (setorDetectado ? `Valparaíso · ${setorDetectado}` : 'Valparaíso-GO OK') : (status === 'FORA_VALPARAISO' ? 'Fora de Valparaíso' : 'Sinal Irregular');
      const stCls = status === 'OK' ? 'badge-ok' : (status === 'FORA_VALPARAISO' ? 'badge-pendente' : 'badge-erro');
      if ($('statusGpsBadge')) { $('statusGpsBadge').textContent = stLabel; $('statusGpsBadge').className = 'badge ' + stCls; }
      if ($('painelResultadoGps')) {
        const perTxt = dentroValparaiso
          ? `Dentro de Valparaíso de Goiás${setorDetectado ? ' (' + setorDetectado + ')' : ''}`
          : 'FORA do perímetro de Valparaíso de Goiás (aviso será registrado para o Comando)';
        $('painelResultadoGps').innerHTML = `<div><strong>Endereço:</strong> ${esc(endereco)}</div><div class="subtexto">Perímetro: <strong>${esc(perTxt)}</strong> · ±${Math.round(ult.accuracy)}m</div>`;
      }
      const boxFora = $('boxJustificativaForaValparaiso');
      if (boxFora) {
        if (!dentroValparaiso) {
          boxFora.classList.remove('oculto');
          if ($('lblLocalForaValp')) $('lblLocalForaValp').innerHTML = `Localização fora de Valparaíso de Goiás: <strong>${esc(geoObj.regiaoResumo || endereco)}</strong>. Você pode registrar o ponto normalmente — o aviso de perímetro vai para o Comando (explicação abaixo é opcional).`;
        } else {
          boxFora.classList.add('oculto');
        }
      }
      return locAtualPonto;
    })();
    try { return await promessaGpsAtiva; } finally { promessaGpsAtiva = null; }
  }

  async function confirmarRegistroPonto() {
    const err = $('msgPontoErro'); err.classList.add('oculto');
    if (!guardaSelecionadoPonto) { err.textContent = 'Digite seu Nome Completo e selecione seu nome na lista antes de confirmar.'; err.classList.remove('oculto'); return; }
    if (!fotoCapturadaDataUrl) { err.textContent = 'Foto ao vivo pela câmera é obrigatória.'; err.classList.remove('oculto'); return; }

    const btnConf = $('btnConfirmarPonto');
    btnConf.disabled = true;
    if (!locAtualPonto) {
      btnConf.textContent = 'Capturando localização automática...';
      await coletarLocalizacaoAutomatica(true);
    }
    if (!locAtualPonto) {
      btnConf.disabled = false; btnConf.textContent = 'Confirmar e Emitir Comprovante de Ponto';
      err.textContent = 'Não foi possível capturar o GPS automaticamente. Permita a localização e tente novamente.';
      err.classList.remove('oculto'); return;
    }

    // Fora de Valparaiso NAO bloqueia nem exige explicacao na hora — apenas registra aviso + motivo opcional!
    let justificativaForaValp = null;
    if (locAtualPonto.dentroValparaiso === false) {
      const catFora = ($('selMotivoForaValp')?.value || '').trim();
      const detFora = ($('inpDetalheForaValp')?.value || '').trim();
      if (catFora || detFora) {
        justificativaForaValp = {
          categoria: catFora || 'Informado pelo guarda',
          detalhe: detFora || '—',
          regiao: locAtualPonto.regiaoResumo || locAtualPonto.endereco
        };
      }
    }

    btnConf.textContent = 'Gravando e autenticando ponto...';
    const ag = guardaSelecionadoPonto;
    const agoraIso = new Date().toISOString();
    const dt = new Date(agoraIso), p2 = n => String(n).padStart(2,'0');
    const dataLocal = `${dt.getFullYear()}-${p2(dt.getMonth()+1)}-${p2(dt.getDate())}`;
    const horaLocal = `${p2(dt.getHours())}:${p2(dt.getMinutes())}:${p2(dt.getSeconds())}`;
    const tipo = $('selPontoTipo').value;
    const plantaoAbertoAgora = tipo !== 'ENTRADA' ? encontrarPlantaoAberto(ag.id, agoraIso) : null;
    const dataTurno = plantaoAbertoAgora ? plantaoAbertoAgora.dataLocal : dataLocal;
    const hashAnterior = ESTADO.pontos[0]?.hashIntegridade || 'GENESIS_GCM_OFICIAL';
    const randHex = window.EscalaCloud.sha256Hex(agoraIso + ag.matricula + Math.random()).slice(0, 6).toUpperCase();
    const protocolo = `PT-${dataLocal.replace(/-/g,'')}-${ag.matricula}-${randHex}`;

    // Analise visual leve em segundo plano (nao atrasa a batida: <50ms)
    const fotoRefOficial = ag.fotoPerfil || '';
    const simVisual = fotoRefOficial ? await calcularSimilaridadeVisualBase(fotoRefOficial, fotoCapturadaDataUrl) : null;
    const conferenciaVisual = {
      qualidadeOk: qualidadeFotoAtual ? !!qualidadeFotoAtual.ok : true,
      qualidadeMsg: qualidadeFotoAtual ? qualidadeFotoAtual.motivo : 'Imagem capturada',
      temFotoOficial: !!fotoRefOficial,
      indiceVisual: simVisual
    };

    const avaliacaoHorario = tipo === 'ENTRADA' ? avaliarHorarioEntrada(ag, horaLocal.slice(0, 5)) : null;

    const reg = {
      id: 'pt_' + Date.now().toString(36),
      protocolo,
      agenteId: ag.id, agenteNome: ag.nome, agenteMatricula: ag.matricula, equipe: ag.equipe,
      tipo, posto: $('inpPontoPosto').value.trim() || 'Base GCM', obs: $('inpPontoObs').value.trim(),
      timestampIso: agoraIso, dataLocal, dataTurno, horaLocal,
      foto: fotoCapturadaDataUrl, localizacao: locAtualPonto,
      foraValparaiso: locAtualPonto.dentroValparaiso === false,
      justificativaForaValp,
      avaliacaoHorario,
      conferenciaVisual,
      hashAnterior, hashIntegridade: ''
    };
    reg.hashIntegridade = calcularHashPonto(reg, hashAnterior);

    ESTADO.pontos.unshift(reg);
    const salvou = await salvarTudo(true);
    if (!salvou) {
      // Reverte para nunca mentir que salvou!
      ESTADO.pontos.shift();
      btnConf.disabled = false; btnConf.textContent = 'Confirmar e Emitir Comprovante de Ponto';
      err.textContent = 'ERRO CRÍTICO: O navegador não conseguiu salvar o registro (armazenamento cheio). Exporte um backup ou libere espaço e tente novamente.';
      err.classList.remove('oculto');
      return;
    }
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      await window.EscalaCloud.enviarPontoIndividualNuvem(reg);
    }

    btnConf.disabled = false; btnConf.textContent = 'Confirmar e Emitir Comprovante de Ponto';
    fotoCapturadaDataUrl = null;
    $('imgPreviewFoto').classList.add('oculto'); $('placeholderCamera').classList.remove('oculto');
    $('statusFoto').textContent = 'Pendente'; $('statusFoto').className = 'badge badge-neutro'; $('btnRefazerFoto').disabled = true;
    $('inpPontoObs').value = '';
    if ($('selMotivoForaValp')) $('selMotivoForaValp').value = '';
    if ($('inpDetalheForaValp')) $('inpDetalheForaValp').value = '';
    $('boxJustificativaForaValparaiso')?.classList.add('oculto');

    selecionarGuardaParaPonto(ag);
    atualizarAlertaBotaoPonto();
    renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos(); renderMinhaFolha(); renderAuditoriaIdentidade();
    coletarLocalizacaoAutomatica(true);

    // Exibe Comprovante Oficial Imediato (acaba com "eu bati e nao deu")
    abrirReciboPonto(reg);
  }

  function abrirReciboPonto(pt) {
    const loc = pt.localizacao || {};
    const tipoTxt = TIPO_PONTO_LABEL[pt.tipo] || pt.tipo;
    abrirModal(
      `COMPROVANTE OFICIAL DE PONTO — ${pt.protocolo}`,
      `
        <div class="selo-card">
          <div><span class="badge badge-ok">GRAVAÇÃO CONFIRMADA E AUTENTICADA</span></div>
          <div><strong>Protocolo:</strong> <code>${esc(pt.protocolo)}</code></div>
          <div><strong>Guarda:</strong> Nº ${esc(pt.agenteMatricula)} — ${esc(pt.agenteNome)} (${esc(pt.equipe)})</div>
          <div><strong>Batida:</strong> ${esc(tipoTxt)} · <strong>${formatarDataBR(pt.dataLocal)} às ${esc(pt.horaLocal)}</strong></div>
          <div><strong>Posto / Viatura:</strong> ${esc(pt.posto)}</div>
          <div><strong>Localização:</strong> ${esc(loc.endereco || '—')} (${loc.dentroValparaiso === false ? '<strong style="color:var(--pend);">AVISO: Fora de Valparaíso-GO</strong>' : (loc.setorDetectado ? 'Valparaíso-GO · ' + esc(loc.setorDetectado) : 'Valparaíso-GO')})</div>
          ${pt.avaliacaoHorario ? `<div><strong>Horário Estipulado:</strong> <span class="badge ${pt.avaliacaoHorario.badgeCls}">${esc(pt.avaliacaoHorario.resumo)}</span></div>` : ''}
          <div><strong>Assinatura Digital SHA-256:</strong><div class="hash-mono mt-4">${esc(pt.hashIntegridade)}</div></div>
        </div>
        <div style="text-align:center;"><img src="${pt.foto}" style="max-height:170px;border-radius:6px;border:1px solid var(--border);"></div>
      `,
      (() => {
        const agPt = agentePorId(pt.agenteId);
        const dtRefCp = pt.dataTurno || pt.dataLocal;
        const setorCp = obterSetorDoGuardaNaData(agPt, dtRefCp, pt.posto);
        const btns = [];
        if (setorCp) {
          btns.push({
            texto: `Baixar Cartão Programa (${setorCp.posto.setor})`,
            classe: 'btn-primario',
            onClick: () => gerarPdfCartaoProgramaDoGuarda(pt.agenteId, dtRefCp, pt.posto)
          });
        }
        btns.push({
          texto: 'PDF do Turno (Entrada e Saída)',
          classe: setorCp ? 'btn-acao-destaque' : 'btn-primario',
          onClick: () => gerarPdfMinhaFolhaPeriodoDireto(pt.agenteId, dtRefCp, dtRefCp, `Turno ${formatarDataBR(dtRefCp)} (Entrada e Saída)`)
        });
        btns.push({
          texto: 'Copiar Recibo',
          classe: 'btn-sec',
          onClick: () => {
            const txt = `*COMPROVANTE DE PONTO — GCM VALPARAÍSO*\nProtocolo: *${pt.protocolo}*\nGuarda: Nº ${pt.agenteMatricula} — ${pt.agenteNome}\nBatida: *${tipoTxt}*\nData/Hora: *${formatarDataBR(pt.dataLocal)} às ${pt.horaLocal}*\nLocal: ${loc.endereco || '—'}\nSHA-256: ${pt.hashIntegridade.slice(0,24)}...`;
            if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(() => toast('Recibo copiado!'));
          }
        });
        btns.push({ texto: 'Fechar', classe: 'btn-sec', onClick: fecharModal });
        return btns;
      })()
    );
  }

  function filtrarPontosHistorico() {
    const m = $('fltPontoMes').value||'', b = ($('fltPontoBusca').value||'').trim().toLowerCase(), tp = $('fltPontoTipo').value||'', st = $('fltPontoStatus').value||'';
    const meuAg = !podeEditarEscala() ? agenteLogadoAtual() : null;
    return (ESTADO.pontos||[]).filter(p =>
      (!podeEditarEscala() ? (meuAg ? p.agenteId === meuAg.id : false) : true) &&
      (!m || (p.dataLocal||'').startsWith(m)) &&
      (!tp || p.tipo === tp) &&
      (!st || (p.localizacao?.status||'') === st) &&
      (!b || (p.agenteNome||'').toLowerCase().includes(b) || (p.agenteMatricula||'').toLowerCase().includes(b) || (p.protocolo||'').toLowerCase().includes(b))
    );
  }

  function abrirDetalhePonto(id) {
    const pt = (ESTADO.pontos||[]).find(x => x.id === id); if (!pt) return;
    const loc = pt.localizacao || {};
    const stTxt = loc.status === 'OK' ? 'Dentro de Valparaíso-GO' : (loc.status === 'FORA_VALPARAISO' ? 'FORA de Valparaíso-GO' : (loc.status === 'FORA_BASE' ? 'Fora da Base' : 'Sinal Irregular'));
    abrirModal(
      `Registro — Nº ${pt.agenteMatricula} ${pt.agenteNome}`,
      `<div style="text-align:center;"><img src="${pt.foto}" style="max-width:100%;max-height:220px;border-radius:6px;border:1px solid var(--border);"></div>
       <div class="box-borda" style="font-size:12px;">
         <div><strong>Protocolo:</strong> <code>${esc(pt.protocolo || pt.id)}</code></div>
         <div><strong>Batida:</strong> ${esc(TIPO_PONTO_LABEL[pt.tipo] || pt.tipo)} · ${formatarDataBR(pt.dataLocal)} às ${esc(pt.horaLocal)}</div>
         <div><strong>Equipe / Posto:</strong> ${esc(pt.equipe)} · ${esc(pt.posto)}</div>
         <div><strong>Endereço:</strong> ${esc(loc.endereco || '—')} (${esc(loc.resumoDist || '')})</div>
         <div><strong>Verificação:</strong> ${esc(stTxt)}</div>
         ${pt.justificativaForaValp ? `<div class="alerta-inline erro mt-4"><strong>Motivo (Fora de Valparaíso → Comando):</strong> ${esc(pt.justificativaForaValp.categoria)} — ${esc(pt.justificativaForaValp.detalhe)}</div>` : ''}
         ${pt.obs ? `<div><strong>Obs.:</strong> ${esc(pt.obs)}</div>` : ''}
         <div><strong>Hash SHA-256:</strong><div class="hash-mono mt-4">${esc(pt.hashIntegridade)}</div></div>
       </div>`,
      [
        { texto: 'Comprovante PDF', classe: 'btn-primario', onClick: () => gerarPdfComprovantePonto(pt) },
        ...(isAdmin() ? [{ texto: 'Excluir (Admin)', classe: 'btn-perigo', onClick: async () => {
          if (!confirm('Excluir registro? Atenção: excluir um ponto altera a cadeia de integridade.')) return;
          ESTADO.pontos = ESTADO.pontos.filter(x => x.id !== pt.id);
          await salvarTudo(); fecharModal(); renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos();
        }}] : []),
        { texto: 'Fechar', classe: 'btn-sec', onClick: fecharModal }
      ]
    );
  }

  function renderTabelaPontos() {
    const lista = filtrarPontosHistorico();
    if (!lista.length) { $('tbodyPontos').innerHTML = '<tr><td colspan="6" class="subtexto" style="text-align:center;padding:16px;">Nenhuma batida encontrada.</td></tr>'; return; }
    $('tbodyPontos').innerHTML = lista.map(p => {
      const st = p.localizacao?.status || 'OK';
      const cls = st === 'OK' ? 'badge-ok' : (st === 'FORA_BASE' ? 'badge-pendente' : 'badge-erro');
      const txt = st === 'OK' ? 'Valparaíso OK' : (st === 'FORA_VALPARAISO' ? 'Fora Valparaíso' : (st === 'FORA_BASE' ? 'Fora da Base' : 'Irregular'));
      return `
        <tr>
          <td><img src="${p.foto}" class="foto-thumb" data-ver-ponto="${esc(p.id)}"></td>
          <td><strong>${formatarDataBR(p.dataLocal)}</strong><div class="subtexto">${esc(p.horaLocal)}</div></td>
          <td><strong>Nº ${esc(p.agenteMatricula)} — ${esc(p.agenteNome)}</strong><div class="subtexto">${esc(p.equipe)} · ${esc(p.posto)}</div></td>
          <td><span class="badge badge-neutro">${esc(TIPO_PONTO_LABEL[p.tipo] || p.tipo)}</span></td>
          <td><div style="max-width:210px;font-size:12px;">${esc(p.localizacao?.endereco || '—')}</div><div class="subtexto">${esc(p.localizacao?.resumoDist || '')}</div></td>
          <td><span class="badge ${cls}">${esc(txt)}</span><div class="subtexto" style="font-size:10.5px;margin-top:2px;"><code>${esc(p.protocolo || '—')}</code></div></td>
        </tr>
      `;
    }).join('');
    $('tbodyPontos').querySelectorAll('[data-ver-ponto]').forEach(img => img.addEventListener('click', () => abrirDetalhePonto(img.getAttribute('data-ver-ponto'))));
  }


  // =========================================================================
  // 1B. MINHA FOLHA DE PONTO INDIVIDUAL (AUTOATENDIMENTO EM PDF COM FOTOS)
  // =========================================================================
  function obterIntervaloMinhaFolha() {
    const modo = $('selMfPeriodo')?.value || '30D';
    const hoje = hojeISO();
    if (modo === 'HOJE') return { ini: hoje, fim: hoje, rotulo: `Turno de Hoje (${formatarDataBR(hoje)} — Entrada e Saída)` };
    if (modo === '7D') {
      const ini = somarDiasISO(hoje, -6);
      return { ini, fim: hoje, rotulo: `Últimos 7 dias (${formatarDataBR(ini)} a ${formatarDataBR(hoje)})` };
    }
    if (modo === '30D') {
      const ini = somarDiasISO(hoje, -29);
      return { ini, fim: hoje, rotulo: `Últimos 30 dias (${formatarDataBR(ini)} a ${formatarDataBR(hoje)})` };
    }
    if (modo === 'CUSTOM') {
      const ini = $('inpMfDataIni')?.value || somarDiasISO(hoje, -30);
      const fim = $('inpMfDataFim')?.value || hoje;
      return { ini, fim, rotulo: `${formatarDataBR(ini)} a ${formatarDataBR(fim)}` };
    }
    const mesVal = $('inpMfMes')?.value || mesAtualISO();
    const [ano, mes] = mesVal.split('-').map(Number);
    const ult = String(new Date(ano, mes, 0).getDate()).padStart(2, '0');
    const ini = `${mesVal}-01`, fim = `${mesVal}-${ult}`;
    return { ini, fim, rotulo: `${MESES_EXT[mes - 1]} / ${ano} (${formatarDataBR(ini)} a ${formatarDataBR(fim)})` };
  }

  function calcularMinutosNoIntervalo(agenteId, ini, fim) {
    const datasTurnos = new Set();
    (ESTADO.pontos || []).forEach(p => {
      if (p.agenteId !== agenteId) return;
      const dtT = dataTurnoEfetivaPonto(p);
      if (dtT >= ini && dtT <= fim) datasTurnos.add(dtT);
    });
    let totalMin = 0;
    datasTurnos.forEach(dtT => {
      totalMin += obterBatidasDoTurno(dtT, agenteId).duracaoMin;
    });
    return Math.round(totalMin);
  }

  function obterFotoIdentificacaoAgente(ag) {
    if (!ag) return '';
    if (ag.fotoPerfil) return ag.fotoPerfil;
    const ultPt = (ESTADO.pontos || []).find(p => p.agenteId === ag.id && p.foto);
    return ultPt ? ultPt.foto : '';
  }

  function obterDadosMinhaFolha() {
    const sel = $('selMfAgente');
    const agId = podeEditarEscala() ? (sel?.value || '') : (agenteLogadoAtual()?.id || '');
    const ag = agentePorId(agId);
    const interv = obterIntervaloMinhaFolha();
    if (!ag) return { ag: null, interv, batidas: [], ocorrencias: [], totalMin: 0, fotoPerfil: '' };

    const batidas = (ESTADO.pontos || [])
      .filter(p => {
        if (p.agenteId !== ag.id) return false;
        const dtT = dataTurnoEfetivaPonto(p);
        return (dtT >= interv.ini && dtT <= interv.fim) || (p.dataLocal >= interv.ini && p.dataLocal <= interv.fim);
      })
      .slice()
      .sort((a, b) => (a.timestampIso || '').localeCompare(b.timestampIso || ''));

    const ocorrencias = [];
    // Afastamentos / Atestados / Ferias no periodo
    (ESTADO.afastamentos || []).filter(af => af.agenteId === ag.id && af.dataInicio <= interv.fim && af.dataFim >= interv.ini).forEach(af => {
      ocorrencias.push({
        data: af.dataInicio,
        tipo: af.tipo === 'FALTA' ? 'FALTA' : 'AFASTAMENTO',
        titulo: `${TIPO_AFASTAMENTO_LABEL[af.tipo] || af.tipo} — ${af.dias} dia(s) fora`,
        detalhe: `Período: ${formatarDataBR(af.dataInicio)} a ${formatarDataBR(af.dataFim)} · Retorno: ${formatarDataBR(af.dataRetorno)}${af.cid ? ' · ' + af.cid : ''}${af.anexo ? ' · [Atestado Digitalizado Anexado]' : ''}`
      });
    });
    // Justificativas no periodo
    Object.entries(ESTADO.justificativas || {}).forEach(([chave, val]) => {
      const [dt, aid] = chave.split('|');
      if (aid === ag.id && dt >= interv.ini && dt <= interv.fim) {
        ocorrencias.push({ data: dt, tipo: 'JUSTIFICATIVA', titulo: val.motivo, detalhe: val.obs || 'Registrado pela Gestão' });
      }
    });
    // Permutas aprovadas no periodo
    (ESTADO.permutas || []).filter(pm => pm.status === 'APROVADA' && (pm.solicitanteId === ag.id || pm.substitutoId === ag.id)).forEach(pm => {
      if ((pm.dataOriginal >= interv.ini && pm.dataOriginal <= interv.fim) || (pm.dataCompensacao && pm.dataCompensacao >= interv.ini && pm.dataCompensacao <= interv.fim)) {
        const outro = agentePorId(pm.solicitanteId === ag.id ? pm.substitutoId : pm.solicitanteId);
        const papel = pm.solicitanteId === ag.id ? 'Saiu (Solicitante)' : 'Assumiu (Substituto)';
        ocorrencias.push({ data: pm.dataOriginal, tipo: 'PERMUTA', titulo: `${TIPO_PERMUTA_LABEL[pm.tipo] || pm.tipo} — ${papel}`, detalhe: `Com Nº ${outro ? outro.matricula + ' ' + outro.nomeGuerra : '—'}${pm.dataCompensacao ? ' · Devolução: ' + formatarDataBR(pm.dataCompensacao) : ''}` });
      }
    });
    ocorrencias.sort((a, b) => a.data.localeCompare(b.data));

    const totalMin = calcularMinutosNoIntervalo(ag.id, interv.ini, interv.fim);
    const fotoPerfil = obterFotoIdentificacaoAgente(ag);
    return { ag, interv, batidas, ocorrencias, totalMin, fotoPerfil };
  }

  function renderMinhaFolha() {
    const modo = $('selMfPeriodo')?.value || 'MES';
    $('wrapMfMes').classList.toggle('oculto', modo !== 'MES');
    $('wrapMfIni').classList.toggle('oculto', modo !== 'CUSTOM');
    $('wrapMfFim').classList.toggle('oculto', modo !== 'CUSTOM');
    if (!$('inpMfMes').value) $('inpMfMes').value = mesAtualISO();
    if (!$('inpMfDataIni').value) $('inpMfDataIni').value = somarDiasISO(hojeISO(), -14);
    if (!$('inpMfDataFim').value) $('inpMfDataFim').value = hojeISO();

    const sel = $('selMfAgente');
    const aviso = $('avisoVinculoAgente');
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');

    if (podeEditarEscala()) {
      const atual = sel.value;
      sel.innerHTML = ativos.map(a => `<option value="${esc(a.id)}">Nº ${esc(a.matricula)} — ${esc(a.nome)} (${esc(a.equipe)})</option>`).join('');
      const meu = agenteLogadoAtual();
      if (atual && ativos.some(a => a.id === atual)) sel.value = atual;
      else if (meu) sel.value = meu.id;
      sel.disabled = false;
      aviso.classList.add('oculto');
    } else {
      const meu = agenteLogadoAtual();
      if (meu) {
        sel.innerHTML = `<option value="${esc(meu.id)}">Nº ${esc(meu.matricula)} — ${esc(meu.nome)} (${esc(meu.equipe)})</option>`;
        sel.value = meu.id;
        sel.disabled = true;
        aviso.classList.add('oculto');
      } else {
        sel.innerHTML = '<option value="">Conta sem Nº / Matrícula vinculada</option>';
        sel.disabled = true;
        aviso.textContent = 'O Nome Completo da sua conta não coincide com a base oficial dos guardas. Solicite ao Administrador em Contas, Base e Banco para conferir seu nome.';
        aviso.classList.remove('oculto');
      }
    }

    const { ag, interv, batidas, ocorrencias, totalMin, fotoPerfil } = obterDadosMinhaFolha();
    const card = $('cardPerfilMinhaFolha');
    if (!ag) {
      card.innerHTML = '<div class="subtexto">Nenhum guarda selecionado ou vinculado.</div>';
      $('tbodyMinhaFolha').innerHTML = '';
      $('listaMfOcorrencias').innerHTML = '';
      $('badgeQtdMfBatidas').textContent = '0 batidas';
      $('badgeQtdMfOcorr').textContent = '0';
      return;
    }

    const infSetor = descobrirSetorDoAgente(ag);
    const bh = calcularResumoBancoAgente(ag.id, '');
    const clsSaldo = bh.saldoMin > 0 ? 'saldo-pos' : (bh.saldoMin < 0 ? 'saldo-neg' : 'saldo-zero');

    card.innerHTML = `
      <div class="perfil-foto-box">${fotoPerfil ? `<img src="${fotoPerfil}" alt="Foto do Guarda">` : '<span>Sem foto cadastrada</span>'}</div>
      <div class="perfil-ponto-info">
        <div class="card-cab">
          <strong style="font-size:15px;">Nº ${esc(ag.matricula)} — ${esc(ag.nome)}</strong>
          <span class="insig eq-${esc(ag.equipe)}">EQUIPE ${esc(ag.equipe)}</span>
        </div>
        <div class="subtexto">${esc(infSetor.nome)} · ${esc(infSetor.funcao)} · Período: <strong>${esc(interv.rotulo)}</strong></div>
        <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:4px;font-size:12.5px;">
          <span>Batidas no período: <strong>${batidas.length}</strong></span>
          <span>Horas trabalhadas: <strong>${formatarMinutosHM(totalMin, false)}</strong></span>
          <span>Banco de Horas: <span class="${clsSaldo}">${formatarMinutosHM(bh.saldoMin, true)}</span></span>
        </div>
      </div>
    `;

    $('badgeQtdMfBatidas').textContent = `${batidas.length} batida(s)`;
    $('tbodyMinhaFolha').innerHTML = batidas.map(p => {
      const loc = p.localizacao || {};
      const st = loc.status || 'OK';
      const cls = st === 'OK' ? 'badge-ok' : (st === 'FORA_BASE' ? 'badge-pendente' : 'badge-erro');
      const txt = st === 'OK' ? 'Regular' : (st === 'FORA_BASE' ? 'Fora da Base' : 'Irregular');
      return `
        <tr>
          <td><img src="${p.foto}" class="foto-thumb-md" data-ver-ponto-mf="${esc(p.id)}" alt="Foto da batida"></td>
          <td><strong>${formatarDataBR(p.dataLocal)}</strong><div class="subtexto">${esc(p.horaLocal)}</div></td>
          <td><span class="badge badge-invertido">${esc(TIPO_PONTO_LABEL[p.tipo] || p.tipo)}</span><div class="subtexto mt-4">${esc(p.posto || 'Base GCM')}</div></td>
          <td>
            <div style="font-size:12px;">${esc(loc.endereco || '—')}</div>
            <div class="subtexto">${loc.lat ? `${loc.lat.toFixed(5)}, ${loc.lon.toFixed(5)}` : '—'} · ${esc(loc.resumoDist || '')}</div>
          </td>
          <td>
            <div><code>${esc(p.protocolo || '—')}</code> <span class="badge ${cls}">${esc(txt)}</span></div>
            <div class="subtexto" style="font-size:10.5px;margin-top:2px;">SHA: ${esc((p.hashIntegridade || '').slice(0, 16))}...</div>
          </td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="5" class="subtexto" style="text-align:center;padding:18px;">Nenhuma batida registrada neste período.</td></tr>';

    $('tbodyMinhaFolha').querySelectorAll('[data-ver-ponto-mf]').forEach(img => img.addEventListener('click', () => abrirDetalhePonto(img.getAttribute('data-ver-ponto-mf'))));

    $('badgeQtdMfOcorr').textContent = String(ocorrencias.length);
    $('listaMfOcorrencias').innerHTML = ocorrencias.length ? ocorrencias.map(oc => `
      <div class="item-compacto">
        <div><strong>${formatarDataBR(oc.data)} — ${esc(oc.titulo)}</strong><div class="subtexto">${esc(oc.detalhe)}</div></div>
        <span class="badge badge-warn">${esc(oc.tipo)}</span>
      </div>
    `).join('') : '<div class="subtexto">Nenhuma justificativa ou permuta registrada neste período.</div>';
  }

  function abrirModalAtualizarFotoPerfil() {
    const { ag } = obterDadosMinhaFolha();
    if (!ag) return toast('Selecione ou vincule seu Nº primeiro.');
    let streamPerfil = null;
    let fotoNova = null;

    abrirModal(
      `Foto de Identificação — Nº ${ag.matricula} ${ag.nomeGuerra}`,
      `
        <p class="subtexto">Esta foto aparece no cabeçalho da sua Folha de Ponto Individual em PDF.</p>
        <div class="camera-box">
          <video id="vidFotoPerfil" autoplay playsinline muted class="oculto"></video>
          <canvas id="cvsFotoPerfil" class="oculto"></canvas>
          <img id="imgFotoPerfilPrev" class="${ag.fotoPerfil ? '' : 'oculto'}" src="${ag.fotoPerfil || ''}" alt="Foto perfil">
          <div id="phFotoPerfil" class="camera-placeholder ${ag.fotoPerfil ? 'oculto' : ''}">Clique em "Ligar Câmera" para tirar sua foto de identificação.</div>
        </div>
        <div class="acoes-linha">
          <button type="button" class="btn btn-sec btn-sm" id="btnLigarCamPerfil">Ligar Câmera</button>
          <button type="button" class="btn btn-primario btn-sm" id="btnBaterFotoPerfil" disabled>Capturar Foto</button>
        </div>
      `,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: () => { if (streamPerfil) streamPerfil.getTracks().forEach(t => t.stop()); fecharModal(); } },
        { texto: 'Salvar Foto no Perfil', classe: 'btn-primario', onClick: async () => {
          if (streamPerfil) streamPerfil.getTracks().forEach(t => t.stop());
          if (!fotoNova) return toast('Capture uma foto primeiro.');
          ag.fotoPerfil = fotoNova;
          await salvarTudo();
          fecharModal();
          renderMinhaFolha();
          toast('Foto de identificação atualizada!');
        }}
      ]
    );

    $('btnLigarCamPerfil').addEventListener('click', async () => {
      try {
        streamPerfil = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 480 } }, audio: false });
        const v = $('vidFotoPerfil'); v.srcObject = streamPerfil; v.classList.remove('oculto');
        $('phFotoPerfil').classList.add('oculto'); $('imgFotoPerfilPrev').classList.add('oculto');
        $('btnBaterFotoPerfil').disabled = false;
      } catch (e) { toast('Permita acesso à câmera.'); }
    });

    $('btnBaterFotoPerfil').addEventListener('click', () => {
      const v = $('vidFotoPerfil'), c = $('cvsFotoPerfil');
      if (!v || !v.videoWidth) return;
      const w = 320, h = Math.round((v.videoHeight / v.videoWidth) * w) || 320;
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(v, 0, 0, w, h);
      fotoNova = c.toDataURL('image/jpeg', 0.72);
      if (streamPerfil) { streamPerfil.getTracks().forEach(t => t.stop()); streamPerfil = null; }
      v.classList.add('oculto');
      const img = $('imgFotoPerfilPrev'); img.src = fotoNova; img.classList.remove('oculto');
      $('btnBaterFotoPerfil').disabled = true;
      toast('Foto capturada! Clique em "Salvar Foto no Perfil".');
    });
  }

  function gerarPdfMinhaFolhaPeriodoDireto(agenteId, ini, fim, rotuloPeriodo) {
    const ag = agentePorId(agenteId);
    if (!ag) return toast('Guarda não encontrado.');
    const batidas = (ESTADO.pontos || [])
      .filter(p => {
        if (p.agenteId !== ag.id) return false;
        const dtT = dataTurnoEfetivaPonto(p);
        return (dtT >= ini && dtT <= fim) || (p.dataLocal >= ini && p.dataLocal <= fim);
      })
      .slice()
      .sort((a, b) => (a.timestampIso || '').localeCompare(b.timestampIso || ''));
    const ocorrencias = [];
    Object.entries(ESTADO.justificativas || {}).forEach(([chave, val]) => {
      const [dt, aid] = chave.split('|');
      if (aid === ag.id && dt >= ini && dt <= fim) ocorrencias.push({ data: dt, tipo: 'JUSTIFICATIVA', titulo: val.motivo, detalhe: val.obs || 'Registrado pela Gestão' });
    });
    const totalMin = calcularMinutosNoIntervalo(ag.id, ini, fim);
    const fotoPerfil = obterFotoIdentificacaoAgente(ag);
    montarEEmitirPdfFolhaIndividual(ag, { ini, fim, rotulo: rotuloPeriodo }, batidas, ocorrencias, totalMin, fotoPerfil);
  }

  function gerarPdfMinhaFolhaIndividual() {
    const { ag, interv, batidas, ocorrencias, totalMin, fotoPerfil } = obterDadosMinhaFolha();
    if (!ag) return toast('Nenhum guarda selecionado ou vinculado.');
    montarEEmitirPdfFolhaIndividual(ag, interv, batidas, ocorrencias, totalMin, fotoPerfil);
  }

  function montarEEmitirPdfFolhaIndividual(ag, interv, batidas, ocorrencias, totalMin, fotoPerfil) {
    const infSetor = descobrirSetorDoAgente(ag);
    const bh = calcularResumoBancoAgente(ag.id, '');

    const cardServidor = `
      <div class="box" style="border-left:5px solid ${EQUIPE_CORES[ag.equipe]?.cor || '#18181B'};">
        <div style="display:flex;gap:12px;align-items:center;">
          <div style="width:74px;height:88px;border:1px solid #333;background:#F5F5F5;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;font-size:8px;color:#555;text-align:center;">
            ${fotoPerfil ? `<img src="${fotoPerfil}" style="width:100%;height:100%;object-fit:cover;">` : 'SEM FOTO'}
          </div>
          <div style="flex:1;">
            <div style="font-size:12px;font-weight:700;">Nº ${esc(ag.matricula)} — ${esc(ag.nome)}</div>
            <div style="margin-top:3px;"><strong>Equipe:</strong> ${esc(ag.equipe)} | <strong>Setor / Viatura:</strong> ${esc(infSetor.nome)} | <strong>Função:</strong> ${esc(infSetor.funcao)}</div>
            <div style="margin-top:3px;"><strong>Período Consultado:</strong> ${esc(interv.rotulo)}</div>
            <div style="margin-top:4px;display:flex;gap:16px;flex-wrap:wrap;">
              <span><strong>Total de Batidas:</strong> ${batidas.length}</span>
              <span><strong>Horas Trabalhadas no Período:</strong> ${formatarMinutosHM(totalMin, false)}</span>
              <span><strong>Saldo Banco de Horas:</strong> ${formatarMinutosHM(bh.saldoMin, true)}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const rowsBatidas = batidas.map(p => {
      const loc = p.localizacao || {};
      const stTxt = loc.status === 'OK' ? 'Regular' : (loc.status === 'FORA_BASE' ? 'Fora da Base' : 'Irregular');
      return `
        <tr>
          <td style="width:13%;"><img src="${p.foto}" style="width:62px;height:46px;object-fit:cover;border:1px solid #333;display:block;"></td>
          <td style="width:13%;"><strong>${formatarDataBR(p.dataLocal)}</strong><br>${esc(p.horaLocal)}</td>
          <td style="width:15%;"><strong>${esc(TIPO_PONTO_LABEL[p.tipo] || p.tipo)}</strong><br><small>${esc(p.posto || 'Base GCM')}</small></td>
          <td style="width:36%;">${esc(loc.endereco || '—')}<br><small>GPS: ${loc.lat ? loc.lat.toFixed(6) + ', ' + loc.lon.toFixed(6) : '—'} (${esc(loc.resumoDist || '')})</small>${p.obs ? `<br><small>Obs.: ${esc(p.obs)}</small>` : ''}</td>
          <td style="width:23%;"><code><strong>${esc(p.protocolo || '—')}</strong></code><br><small>Status: ${esc(stTxt)}</small><br><small style="font-family:monospace;font-size:7px;">SHA: ${esc((p.hashIntegridade || '').slice(0, 20))}...</small></td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="5" style="text-align:center;padding:10px;">Nenhuma batida registrada neste período.</td></tr>';

    const blocoOcorr = ocorrencias.length ? `
      <h2>3. JUSTIFICATIVAS E PERMUTAS NO PERÍODO</h2>
      <table>
        <thead><tr><th style="width:14%;">Data</th><th style="width:16%;">Tipo</th><th style="width:32%;">Descrição</th><th style="width:38%;">Detalhes</th></tr></thead>
        <tbody>${ocorrencias.map(oc => `<tr><td><strong>${formatarDataBR(oc.data)}</strong></td><td>${esc(oc.tipo)}</td><td>${esc(oc.titulo)}</td><td>${esc(oc.detalhe)}</td></tr>`).join('')}</tbody>
      </table>
    ` : '';

    const blocoAssinaturaServidor = `
      <div class="pdf-assinaturas">
        <div class="ass-col"><div class="ass-espaco"></div><div class="ass-linha"></div><strong>${esc(ag.nome)}</strong><div>Servidor GCM · Nº ${esc(ag.matricula)}</div></div>
        <div class="ass-col"><div class="ass-espaco"></div><div class="ass-linha"></div><strong>${esc(ESTADO.config?.responsaveis?.comandoNome || 'Chefia / Comando GCM')}</strong><div>${esc(ESTADO.config?.responsaveis?.comandoCargo || 'Comandante GCM')}</div></div>
      </div>
    `;

    // Agrupamento consolidado por Turno real (somente Entrada e Saida, com virada de meia-noite 24x72)
    const datasTurnos = Array.from(new Set(batidas.map(b => dataTurnoEfetivaPonto(b)))).sort();
    const rowsTurnos = datasTurnos.map(dt => {
      const t = obterBatidasDoTurno(dt, ag.id);
      const situ = t.ent && t.sai
        ? (t.virouDia ? 'Plantão 24h Completo (Virou Dia)' : 'Turno Completo (Entrada e Saída)')
        : (t.ent ? 'Entrada Registrada (Aguardando Saída)' : 'Registro Parcial');
      return `<tr><td style="width:15%;"><strong>${formatarDataBR(dt)}</strong></td><td style="width:15%;">${t.ent ? '<strong>'+t.ent.horaLocal.slice(0,5)+'</strong>' : '—'}</td><td style="width:16%;">${t.sai ? '<strong>'+formatarHoraSaidaTurno(t)+'</strong>' : '—'}</td><td style="width:14%;"><strong>${formatarMinutosHM(t.duracaoMin, false)}</strong></td><td style="width:40%;">${esc(situ)}</td></tr>`;
    }).join('') || '<tr><td colspan="5" style="text-align:center;">Nenhum turno registrado neste período.</td></tr>';

    const corpo = `
      ${cardServidor}
      <h2>1. RESUMO CONSOLIDADO POR TURNO (ENTRADA E SAÍDA)</h2>
      <table>
        <thead><tr><th style="width:15%;">Data</th><th style="width:15%;">Entrada</th><th style="width:16%;">Saída</th><th style="width:14%;">Total</th><th style="width:40%;">Situação do Turno</th></tr></thead>
        <tbody>${rowsTurnos}</tbody>
      </table>
      <h2>2. PROVA FOTOGRÁFICA, DATA, HORÁRIO, LOCALIZAÇÃO E PROTOCOLOS (ENTRADA E SAÍDA)</h2>
      <table>
        <thead><tr><th style="width:13%;">Foto Batida</th><th style="width:13%;">Data / Hora</th><th style="width:15%;">Batida / Posto</th><th style="width:36%;">Localização Completa (Endereço e GPS)</th><th style="width:23%;">Protocolo e Hash</th></tr></thead>
        <tbody>${rowsBatidas}</tbody>
      </table>
      ${blocoOcorr}
      ${blocoAssinaturaServidor}
    `;

    emitirPdfAutenticado({
      tipoDoc: 'FOLHA_PONTO_INDIVIDUAL',
      titulo: `FOLHA DE PONTO INDIVIDUAL — Nº ${ag.matricula} ${ag.nome}`,
      subtitulo: `Período: ${interv.rotulo} · Equipe ${ag.equipe} · ${batidas.length} registro(s)`,
      corpoHtml: corpo,
      nomeArquivo: `minha-folha-ponto-${ag.matricula}-${hojeISO()}.pdf`,
      paisagem: false,
      qtdRegistros: batidas.length,
      incluirAssinaturas: false
    });
  }

  // =========================================================================
  // 2. ESCALA CONTINUA 24x72 E PERMUTAS
  // =========================================================================
  function renderCalendario24() {
    const modo = $('selModoEscala').value || 'CONTINUO_30';
    $('wrapMesEscala').classList.toggle('oculto', modo !== 'MES');
    $('selMesEscala').value = $('selMesEscala').value || mesAtualISO();
    $('inpDataBaseAlfa').value = ESTADO.config.dataBaseAlfa || hojeISO();
    $('inpHorarioTroca').value = ESTADO.config.horarioTroca || '07:00 às 07:00';

    const { titulo, datas } = gerarListaDatasEscala(), hoje = hojeISO();
    $('boxResumoEscalaContinua').innerHTML = `<strong>Escala Ativa:</strong> ${esc(titulo)} · Ciclo contínuo 24h de serviço × 72h de descanso (autoalimentado diariamente).`;

    $('tbodyCalendario24').innerHTML = datas.map(iso => {
      const c = calcularCiclo24x72(iso), dow = diaSemanaISO(iso), ehHoje = iso === hoje;
      const cel = (eq) => c.mapa[eq].codigo === 'SERVICO' ? `<span class="insig eq-${eq}">SERVIÇO 24h</span>` : `<span class="subtexto">${c.mapa[eq].rotulo}</span>`;
      return `
        <tr class="${ehHoje ? 'linha-hoje' : ''}">
          <td><strong>${formatarDataBR(iso)}</strong> ${ehHoje ? '<span class="badge badge-invertido">HOJE</span>' : ''}</td>
          <td>${DIAS_SEMANA[dow]}</td>
          <td><span class="insig eq-${c.equipeServico}">EQUIPE ${c.equipeServico}</span></td>
          <td>${cel('ALFA')}</td><td>${cel('BRAVO')}</td><td>${cel('CHARLIE')}</td><td>${cel('DELTA')}</td>
          <td>
            <button type="button" class="btn btn-sec btn-sm so-gestao" data-ir-freq="${iso}">Ponto</button>
            <button type="button" class="btn btn-sec btn-sm" data-abrir-cp="${iso}">Cartão</button>
          </td>
        </tr>
      `;
    }).join('');
    $('tbodyCalendario24').querySelectorAll('[data-abrir-cp]').forEach(b => b.addEventListener('click', () => { abrirAba('secCartao'); $('inpCartaoData').value = b.getAttribute('data-abrir-cp'); sincronizarDataCartao(); }));
    $('tbodyCalendario24').querySelectorAll('[data-ir-freq]').forEach(b => b.addEventListener('click', () => { abrirAba('secPonto'); ativarSubtab('secPonto', 'subPtFrequencia'); $('inpFreqData').value = b.getAttribute('data-ir-freq'); renderFrequenciaDia(); }));
  }

  function popularSelectsPermutas() {
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    const htmlOpts = ativos.map(a => `<option value="${esc(a.id)}">Nº ${esc(a.matricula)} — ${esc(a.nome)} (${esc(a.equipe)})</option>`).join('');
    $('selPermSolicitante').innerHTML = htmlOpts;
    $('selPermSubstituto').innerHTML = htmlOpts;
    if (ativos.length > 1) $('selPermSubstituto').selectedIndex = 1;
    if (!$('inpPermDataOrig').value) $('inpPermDataOrig').value = hojeISO();
  }

  function renderPermutas() {
    popularSelectsPermutas();
    const flt = $('fltPermStatus').value || '';
    const lista = (ESTADO.permutas || []).filter(pm => !flt || pm.status === flt);
    if (!lista.length) {
      $('tbodyPermutas').innerHTML = '<tr><td colspan="5" class="subtexto" style="text-align:center;padding:16px;">Nenhuma permuta registrada.</td></tr>';
      return;
    }
    $('tbodyPermutas').innerHTML = lista.map(pm => {
      const sol = agentePorId(pm.solicitanteId), sub = agentePorId(pm.substitutoId);
      const stCls = pm.status === 'APROVADA' ? 'badge-ok' : (pm.status === 'RECUSADA' ? 'badge-erro' : 'badge-pendente');
      return `
        <tr>
          <td><strong>${formatarDataBR(pm.dataOriginal)}</strong><div class="subtexto">${esc(TIPO_PERMUTA_LABEL[pm.tipo] || pm.tipo)}</div></td>
          <td><strong>${sol ? `Nº ${sol.matricula} ${sol.nomeGuerra}` : '—'}</strong> → <strong>${sub ? `Nº ${sub.matricula} ${sub.nomeGuerra}` : '—'}</strong><div class="subtexto">${esc(pm.motivo || 'Sem motivo informado')}</div></td>
          <td>${pm.dataCompensacao ? formatarDataBR(pm.dataCompensacao) : '—'}</td>
          <td><span class="badge ${stCls}">${esc(pm.status)}</span>${pm.homologadoPor ? `<div class="subtexto" style="font-size:10.5px;">Por: ${esc(pm.homologadoPor)}</div>` : ''}</td>
          <td>
            <div class="acoes-linha">
              <button type="button" class="btn btn-sec btn-sm" data-pdf-perm="${esc(pm.id)}">PDF</button>
              ${podeEditarEscala() && pm.status === 'PENDENTE' ? `<button type="button" class="btn btn-primario btn-sm" data-apr-perm="${esc(pm.id)}">Aprovar</button><button type="button" class="btn btn-sec btn-sm" data-rec-perm="${esc(pm.id)}">Recusar</button>` : ''}
              ${isAdmin() ? `<button type="button" class="btn btn-sec btn-sm" data-del-perm="${esc(pm.id)}">X</button>` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    $('tbodyPermutas').querySelectorAll('[data-pdf-perm]').forEach(b => b.addEventListener('click', () => {
      const pm = ESTADO.permutas.find(x => x.id === b.getAttribute('data-pdf-perm')); if (pm) gerarPdfTermoPermuta(pm);
    }));
    $('tbodyPermutas').querySelectorAll('[data-apr-perm]').forEach(b => b.addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const pm = ESTADO.permutas.find(x => x.id === b.getAttribute('data-apr-perm')); if (!pm) return;
      pm.status = 'APROVADA'; pm.homologadoPor = SESSAO?.nome || 'Gestão'; pm.homologadoEm = new Date().toISOString();
      await salvarTudo(); renderPermutas(); renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia();
      toast('Permuta aprovada e refletida na Folha de Ponto!');
    }));
    $('tbodyPermutas').querySelectorAll('[data-rec-perm]').forEach(b => b.addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const pm = ESTADO.permutas.find(x => x.id === b.getAttribute('data-rec-perm')); if (!pm) return;
      pm.status = 'RECUSADA'; pm.homologadoPor = SESSAO?.nome || 'Gestão'; pm.homologadoEm = new Date().toISOString();
      await salvarTudo(); renderPermutas();
    }));
    $('tbodyPermutas').querySelectorAll('[data-del-perm]').forEach(b => b.addEventListener('click', async () => {
      if (!isAdmin() || !confirm('Excluir permuta?')) return;
      ESTADO.permutas = ESTADO.permutas.filter(x => x.id !== b.getAttribute('data-del-perm'));
      await salvarTudo(); renderPermutas(); renderFrequenciaDia();
    }));
  }

  function renderQuadroPessoas() {
    const fltEq = $('fltQpEquipe').value || '', busca = ($('fltQpBusca').value || '').trim().toLowerCase();
    const ordem = { ALFA: 1, BRAVO: 2, CHARLIE: 3, DELTA: 4, ADM: 5, '12X36': 6 };
    const lista = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && (!fltEq || a.equipe === fltEq) && (!busca || a.nome.toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca)))
      .sort((a,b) => (ordem[a.equipe]||9) - (ordem[b.equipe]||9) || Number(a.matricula) - Number(b.matricula));
    $('tbodyQuadroPessoas').innerHTML = lista.map(a => {
      const inf = descobrirSetorDoAgente(a);
      return `<tr><td><strong>${esc(a.matricula)}</strong></td><td><strong>${esc(a.nome)}</strong></td><td><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span></td><td>${esc(inf.nome)}</td><td>${esc(inf.funcao)}</td><td><strong>${esc(proximosDiasServico(a.equipe, 30))}</strong></td></tr>`;
    }).join('');
  }

  function renderMontagemEquipe() {
    const eq = $('selEquipeMontagem').value || 'ALFA', mont = ESTADO.equipesMontagem[eq] || {};
    const daEq = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === eq), outros = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe !== eq);
    const opts = (sel) => '<option value="">— Vago —</option><optgroup label="Equipe ' + eq + '">' + daEq.map(a => `<option value="${esc(a.id)}" ${a.id===sel?'selected':''}>[${esc(a.matricula)}] ${esc(a.nomeGuerra)}</option>`).join('') + '</optgroup><optgroup label="Outros">' + outros.map(a => `<option value="${esc(a.id)}" ${a.id===sel?'selected':''}>[${esc(a.equipe)} · ${esc(a.matricula)}] ${esc(a.nomeGuerra)}</option>`).join('') + '</optgroup>';
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('gridPostosEquipe').innerHTML = ESTADO.postos.map(p => {
      const g = mont[p.id] || { g01:'', g02:'', g03:'' };
      return `<div class="posto-card" data-posto-id="${esc(p.id)}" style="border-left-color:${esc(p.cor || '#18181B')};"><div class="card-cab"><div><strong>${esc(p.nome)}</strong><div class="subtexto">Resp.: ${esc(p.responsavel || 'A definir')} · ${esc(p.bairros)}</div></div>${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-rem-posto="${esc(p.id)}">Remover</button>`:''}</div><div class="campo"><label>01 — Comandante</label><select class="sel-g01" ${desab}>${opts(g.g01)}</select></div><div class="campo"><label>02 — Motorista</label><select class="sel-g02" ${desab}>${opts(g.g02)}</select></div><div class="campo"><label>03 — Patrulheiro</label><select class="sel-g03" ${desab}>${opts(g.g03)}</select></div></div>`;
    }).join('');
    $('gridPostosEquipe').querySelectorAll('[data-rem-posto]').forEach(btn => btn.addEventListener('click', async () => {
      const pid = btn.getAttribute('data-rem-posto'); if (!confirm(`Remover setor ${pid}?`)) return;
      ESTADO.postos = ESTADO.postos.filter(x => x.id !== pid);
      EQUIPES.forEach(e => { if (ESTADO.equipesMontagem[e]) delete ESTADO.equipesMontagem[e][pid]; });
      await salvarTudo(); atualizarTodasVistas();
    }));
    $('gridPostosEquipe').querySelectorAll('select').forEach(s => s.addEventListener('change', verificarConflitosEquipeUI));
    verificarConflitosEquipeUI();
  }

  function verificarConflitosEquipeUI() {
    const vistos = new Map(), dups = [];
    $('gridPostosEquipe').querySelectorAll('.posto-card').forEach(card => {
      const pid = card.getAttribute('data-posto-id');
      ['.sel-g01','.sel-g02','.sel-g03'].forEach(cls => { const val = card.querySelector(cls)?.value; if (!val) return; if (vistos.has(val)) dups.push(`${nomeAgentePorId(val)} (${vistos.get(val)} e ${pid})`); else vistos.set(val, pid); });
    });
    const box = $('alertaConflitoEquipe');
    if (dups.length) { box.textContent = 'Conflito (mesmo guarda em 2 postos): ' + dups.join(' | '); box.classList.remove('oculto'); } else box.classList.add('oculto');
    return dups.length === 0;
  }

  async function salvarMontagemEquipeAtual() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    if (!verificarConflitosEquipeUI() && !confirm('Há conflito. Salvar mesmo assim?')) return;
    const eq = $('selEquipeMontagem').value; ESTADO.equipesMontagem[eq] = ESTADO.equipesMontagem[eq] || {};
    $('gridPostosEquipe').querySelectorAll('.posto-card').forEach(card => { ESTADO.equipesMontagem[eq][card.getAttribute('data-posto-id')] = { g01: card.querySelector('.sel-g01').value, g02: card.querySelector('.sel-g02').value, g03: card.querySelector('.sel-g03').value }; });
    await salvarTudo(); renderQuadroPessoas(); renderResumoEscaladosHoje();
  }

  function autoDistribuirEquipeAtual() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    const eq = $('selEquipeMontagem').value, livres = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === eq);
    let k = 0; const prox = () => (livres[k] ? livres[k++].id : '');
    ESTADO.equipesMontagem[eq] = {};
    ESTADO.postos.forEach(p => { ESTADO.equipesMontagem[eq][p.id] = { g01: prox(), g02: prox(), g03: '' }; });
    ESTADO.postos.forEach(p => { const s = prox(); if (s) ESTADO.equipesMontagem[eq][p.id].g03 = s; });
    renderMontagemEquipe(); toast(`Equipe ${eq} preenchida! Clique em Salvar Composição.`);
  }

  function renderSetoresResponsaveis() {
    const desab = podeEditarEscala() ? '' : 'disabled';
    const dl = `<datalist id="dlEfetivoResp">${ESTADO.efetivo.map(a => `<option value="[${esc(a.matricula)}] ${esc(a.nome)}">`).join('')}</datalist>`;
    $('listaSetoresResp').innerHTML = dl + ESTADO.postos.map((p, idx) => `
      <div class="posto-card" data-setor-idx="${idx}" style="border-left-color:${esc(p.cor || '#18181B')};">
        <div class="grid-3">
          <div class="campo"><label>Prefixo</label><input type="text" class="st-prefixo" value="${esc(p.prefixo || p.id)}" ${desab}></div>
          <div class="campo"><label>Nome do Setor</label><input type="text" class="st-nome" value="${esc(p.nome)}" ${desab}></div>
          <div class="campo"><label>Responsável pelo Setor</label><input type="text" list="dlEfetivoResp" class="st-resp" value="${esc(p.responsavel || '')}" ${desab}></div>
        </div>
        <div class="grid-3">
          <div class="campo"><label>Rótulo Curto</label><input type="text" class="st-setor" value="${esc(p.setor || '')}" ${desab}></div>
          <div class="campo"><label>Área</label><select class="st-area" ${desab}>${Object.entries(AREAS_LABEL).map(([k,v]) => `<option value="${k}" ${p.area===k?'selected':''}>${v}</option>`).join('')}</select></div>
          <div class="campo"><label>Bairros / Cobertura</label><input type="text" class="st-bairros" value="${esc(p.bairros || '')}" ${desab}></div>
        </div>
      </div>
    `).join('');
  }

  async function salvarSetoresResponsaveis() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    $('listaSetoresResp').querySelectorAll('.posto-card').forEach(card => {
      const p = ESTADO.postos[Number(card.getAttribute('data-setor-idx'))]; if (!p) return;
      p.prefixo = card.querySelector('.st-prefixo').value.trim() || p.id; p.nome = card.querySelector('.st-nome').value.trim() || p.nome;
      p.responsavel = card.querySelector('.st-resp').value.trim(); p.setor = card.querySelector('.st-setor').value.trim() || p.setor;
      p.area = card.querySelector('.st-area').value; p.bairros = card.querySelector('.st-bairros').value.trim();
      if (ESTADO.cartoesModelo[p.id]) Object.assign(ESTADO.cartoesModelo[p.id], { setor:p.setor, prefixo:p.prefixo, bairros:p.bairros, responsavel:p.responsavel });
    });
    await salvarTudo(); atualizarTodasVistas();
  }

  function abrirModalNovoPosto() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    abrirModal('Novo Setor / Viatura',
      `<div class="grid-2"><div class="campo"><label>Prefixo</label><input type="text" id="mPosId" placeholder="VTR-05"></div><div class="campo"><label>Área</label><select id="mPosArea">${Object.entries(AREAS_LABEL).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}</select></div></div>
       <div class="campo"><label>Nome do Setor</label><input type="text" id="mPosNome" placeholder="VTR-05 — Setor 05"></div>
       <div class="campo"><label>Responsável pelo Setor</label><input type="text" id="mPosResp" placeholder="A definir"></div>
       <div class="campo"><label>Bairros / Cobertura</label><input type="text" id="mPosBairros" placeholder="Valparaíso de Goiás"></div>`,
      [{ texto:'Cancelar', classe:'btn-sec', onClick:fecharModal }, { texto:'Adicionar', classe:'btn-primario', onClick: async () => {
        const id = ($('mPosId').value||'').trim().toUpperCase().replace(/\s+/g,'-'), nome = ($('mPosNome').value||'').trim();
        if (!id || !nome) return toast('Informe prefixo e nome.');
        if (ESTADO.postos.some(x => x.id === id)) return toast('Já existe.');
        const novo = { id, nome, area:$('mPosArea').value, setor:nome, bairros:$('mPosBairros').value.trim()||'Valparaíso de Goiás', prefixo:id, cor:'#3F3F46', responsavel:$('mPosResp').value.trim()||'A definir', poligono:POLIGONOS_PADRAO['MUNICIPIO'] };
        ESTADO.postos.push(novo); ESTADO.cartoesModelo[id] = criarModeloCartaoPadrao(novo);
        await salvarTudo(); fecharModal(); atualizarTodasVistas();
      }}]
    );
  }

  function renderAdmE12x36() {
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('listaCargosAdm').innerHTML = (ESTADO.administrativo||[]).map((c, idx) => `<div class="linha-editavel" data-adm-idx="${idx}"><div class="campo"><label>Cargo</label><input type="text" class="adm-cargo" value="${esc(c.cargo)}" ${desab}></div><div class="campo"><label>Titular</label><input type="text" class="adm-titular" value="${esc(c.titular)}" ${desab}></div>${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-del-adm="${idx}">X</button>`:''}<div class="campo"><label>Horário</label><input type="text" class="adm-horario" value="${esc(c.horario||'Seg–Sex · 08h às 17h')}" ${desab}></div><div class="campo"><label>Obs.</label><input type="text" class="adm-obs" value="${esc(c.obs||'')}" ${desab}></div></div>`).join('');
    $('listaCargosAdm').querySelectorAll('[data-del-adm]').forEach(b => b.addEventListener('click', () => { ESTADO.administrativo.splice(Number(b.getAttribute('data-del-adm')), 1); renderAdmE12x36(); }));
    $('listaPostos12x36').innerHTML = (ESTADO.escala12x36||[]).map((e, idx) => `<div class="linha-editavel" data-e12-idx="${idx}"><div class="campo"><label>Posto 12x36</label><input type="text" class="e12-posto" value="${esc(e.posto)}" ${desab}></div><div class="campo"><label>Turno</label><input type="text" class="e12-turno" value="${esc(e.turno)}" ${desab}></div>${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-del-e12="${idx}">X</button>`:''}<div class="campo"><label>Turma A</label><input type="text" class="e12-a" value="${esc(e.equipeA||'')}" ${desab}></div><div class="campo"><label>Turma B</label><input type="text" class="e12-b" value="${esc(e.equipeB||'')}" ${desab}></div></div>`).join('');
    $('listaPostos12x36').querySelectorAll('[data-del-e12]').forEach(b => b.addEventListener('click', () => { ESTADO.escala12x36.splice(Number(b.getAttribute('data-del-e12')), 1); renderAdmE12x36(); }));
  }
  function renderResponsaveis() {
    const r = ESTADO.config.responsaveis || {};
    $('inpRespEscalanteNome').value = r.escalanteNome||''; $('inpRespEscalanteCargo').value = r.escalanteCargo||''; $('inpRespEscalanteMat').value = r.escalanteMat||'';
    $('inpRespComandoNome').value = r.comandoNome||''; $('inpRespComandoCargo').value = r.comandoCargo||''; $('inpRespComandoMat').value = r.comandoMat||'';
  }


  // =========================================================================
  // 2B. ATESTADOS MEDICOS (DIGITALIZACAO), FERIAS, AFASTAMENTOS E REL. COMANDO
  // =========================================================================
  function pararCameraScanAf() {
    if (streamScanAf) { streamScanAf.getTracks().forEach(t => t.stop()); streamScanAf = null; }
  }

  function atualizarPreviaDiasAf() {
    const ini = $('inpAfDataIni')?.value || hojeISO();
    const dias = Math.max(1, Math.min(365, Number($('inpAfDias')?.value || 1)));
    const fim = somarDiasISO(ini, dias - 1);
    const retorno = somarDiasISO(ini, dias);
    if ($('boxPreviaDiasAf')) {
      $('boxPreviaDiasAf').innerHTML = `<strong>Cálculo Automático:</strong> Fica fora por <strong>${dias} dia(s)</strong> (${formatarDataBR(ini)} até ${formatarDataBR(fim)}) · <strong>Retorno ao serviço em ${formatarDataBR(retorno)}</strong>.`;
    }
  }

  function limparAnexoScanAf() {
    pararCameraScanAf();
    anexoScanAfAtual = null;
    if ($('vidScanAf')) $('vidScanAf').classList.add('oculto');
    if ($('imgScanAfPrev')) $('imgScanAfPrev').classList.add('oculto');
    if ($('infoPdfScanAf')) $('infoPdfScanAf').classList.add('oculto');
    if ($('phScanAf')) $('phScanAf').classList.remove('oculto');
    if ($('btnCapturarScanAf')) $('btnCapturarScanAf').disabled = true;
    if ($('btnLimparScanAf')) $('btnLimparScanAf').classList.add('oculto');
    if ($('statusScanAf')) { $('statusScanAf').textContent = 'Sem anexo'; $('statusScanAf').className = 'badge badge-neutro'; }
  }

  function mostrarPreviaAnexoAf(anexo) {
    anexoScanAfAtual = anexo;
    pararCameraScanAf();
    $('vidScanAf').classList.add('oculto');
    $('phScanAf').classList.add('oculto');
    $('btnCapturarScanAf').disabled = true;
    $('btnLimparScanAf').classList.remove('oculto');
    $('statusScanAf').textContent = anexo.tipo === 'pdf' ? 'PDF Anexado' : 'Atestado Digitalizado';
    $('statusScanAf').className = 'badge badge-ok';
    if (anexo.tipo === 'pdf') {
      $('imgScanAfPrev').classList.add('oculto');
      $('infoPdfScanAf').innerHTML = `<strong>Documento PDF anexado:</strong><br>${esc(anexo.nome || 'atestado.pdf')}`;
      $('infoPdfScanAf').classList.remove('oculto');
    } else {
      $('infoPdfScanAf').classList.add('oculto');
      $('imgScanAfPrev').src = anexo.dataUrl;
      $('imgScanAfPrev').classList.remove('oculto');
    }
  }

  async function abrirCameraScanAf() {
    pararCameraScanAf();
    try {
      // Prefere camera traseira no celular (para fotografar o papel do atestado) com fallback para webcam no PC
      streamScanAf = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1024 }, height: { ideal: 1280 } },
        audio: false
      });
      const v = $('vidScanAf');
      v.srcObject = streamScanAf;
      v.classList.remove('oculto');
      $('phScanAf').classList.add('oculto');
      $('imgScanAfPrev').classList.add('oculto');
      $('infoPdfScanAf').classList.add('oculto');
      $('btnCapturarScanAf').disabled = false;
      $('statusScanAf').textContent = 'Câmera pronta — enquadre o atestado';
      $('statusScanAf').className = 'badge badge-pendente';
    } catch (e) {
      toast('Permita o uso da câmera para digitalizar o atestado (ou clique em Anexar Foto / PDF).');
    }
  }

  function capturarDocumentoScanAf() {
    const v = $('vidScanAf'), c = $('cvsScanAf');
    if (!v || !v.videoWidth) return toast('Aguarde a câmera carregar.');
    const maxW = 720;
    const w = Math.min(maxW, v.videoWidth);
    const h = Math.round((v.videoHeight / v.videoWidth) * w) || 900;
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0, w, h);
    const dataUrl = c.toDataURL('image/jpeg', 0.68);
    mostrarPreviaAnexoAf({ tipo: 'imagem', nome: `atestado-${hojeISO()}.jpg`, dataUrl });
    toast('Atestado digitalizado com sucesso!');
  }

  function processarArquivoAnexoAf(file) {
    if (!file) return;
    if (file.size > 2500000) return toast('Arquivo muito grande (máx. 2,5 MB). Tire uma foto mais leve ou comprima o PDF.');
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      const reader = new FileReader();
      reader.onload = () => mostrarPreviaAnexoAf({ tipo: 'pdf', nome: file.name, dataUrl: reader.result });
      reader.readAsDataURL(file);
      return;
    }
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxW = 780, w = Math.min(maxW, img.width), h = Math.round((img.height / img.width) * w);
          const c = $('cvsScanAf'); c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          mostrarPreviaAnexoAf({ tipo: 'imagem', nome: file.name, dataUrl: c.toDataURL('image/jpeg', 0.68) });
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
      return;
    }
    toast('Envie uma imagem (JPG/PNG) ou PDF do atestado.');
  }

  function abrirVisualizadorAtestado(af) {
    if (!af) return;
    const ag = agentePorId(af.agenteId);
    const rot = TIPO_AFASTAMENTO_LABEL[af.tipo] || af.tipo;
    const previewHtml = !af.anexo
      ? '<div class="regra-box">Nenhum documento/atestado digitalizado anexado neste registro.</div>'
      : (af.anexo.tipo === 'pdf'
          ? `<div class="box-borda" style="text-align:center;"><strong>PDF Anexado:</strong> ${esc(af.anexo.nome || 'atestado.pdf')}<div class="mt-8"><a class="btn btn-primario btn-sm" href="${af.anexo.dataUrl}" download="${esc(af.anexo.nome || 'atestado.pdf')}">Baixar PDF do Atestado</a></div></div>`
          : `<div style="text-align:center;"><img src="${af.anexo.dataUrl}" style="max-width:100%;max-height:420px;border:1px solid var(--border-strong);border-radius:6px;"></div>`);
    abrirModal(
      `${rot} — ${ag ? 'Nº ' + ag.matricula + ' ' + ag.nome : 'Guarda'}`,
      `
        <div class="box-borda" style="font-size:12.5px;">
          <div><strong>Período:</strong> ${formatarDataBR(af.dataInicio)} até ${formatarDataBR(af.dataFim)} (<strong>${af.dias} dia(s) fora</strong>)</div>
          <div><strong>Data de Retorno:</strong> <strong>${formatarDataBR(af.dataRetorno)}</strong></div>
          ${af.cid ? `<div><strong>CID / Médico:</strong> ${esc(af.cid)}</div>` : ''}
          ${af.protocoloExt ? `<div><strong>Protocolo / RH:</strong> ${esc(af.protocoloExt)}</div>` : ''}
          ${af.obs ? `<div><strong>Observação:</strong> ${esc(af.obs)}</div>` : ''}
          <div class="subtexto mt-4">Registrado por ${esc(af.por || 'Gestão')} em ${formatarDataHoraBR(af.criadoEm)}</div>
        </div>
        ${previewHtml}
      `,
      [
        ...(af.anexo && af.anexo.tipo === 'imagem' ? [{ texto: 'Baixar Imagem', classe: 'btn-sec', onClick: () => { const a = document.createElement('a'); a.href = af.anexo.dataUrl; a.download = af.anexo.nome || 'atestado.jpg'; a.click(); } }] : []),
        { texto: 'Fechar', classe: 'btn-primario', onClick: fecharModal }
      ]
    );
  }

  function renderAfastamentos() {
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    const sel = $('selAfGuarda');
    if (sel) {
      const cur = sel.value;
      sel.innerHTML = ativos.map(a => `<option value="${esc(a.id)}">Nº ${esc(a.matricula)} — ${esc(a.nome)} (${esc(a.equipe)})</option>`).join('');
      if (cur && ativos.some(a => a.id === cur)) sel.value = cur;
    }
    if ($('inpAfDataIni') && !$('inpAfDataIni').value) $('inpAfDataIni').value = hojeISO();
    atualizarPreviaDiasAf();

    const busca = ($('fltAfBusca')?.value || '').trim().toLowerCase();
    const fltTp = $('fltAfTipo')?.value || '';
    const vig = $('fltAfVigencia')?.value || 'ATIVOS';
    const hoje = hojeISO();

    const meuAf = !podeEditarEscala() ? agenteLogadoAtual() : null;
    const lista = (ESTADO.afastamentos || []).filter(af => {
      if (!podeEditarEscala() && (!meuAf || af.agenteId !== meuAf.id)) return false;
      const ag = agentePorId(af.agenteId);
      if (fltTp && af.tipo !== fltTp) return false;
      if (vig === 'ATIVOS' && af.dataFim < hoje) return false;
      if (busca && !(ag && (ag.nome.toLowerCase().includes(busca) || ag.matricula.toLowerCase().includes(busca)))) return false;
      return true;
    }).sort((a, b) => b.dataInicio.localeCompare(a.dataInicio));

    if ($('badgeQtdAfastamentos')) $('badgeQtdAfastamentos').textContent = `${lista.length} registro(s)`;
    const tbody = $('tbodyAfastamentos');
    if (!tbody) return;
    tbody.innerHTML = lista.map(af => {
      const ag = agentePorId(af.agenteId);
      const rot = TIPO_AFASTAMENTO_LABEL[af.tipo] || af.tipo;
      const cls = af.tipo === 'FALTA' ? 'badge-erro' : (af.tipo === 'ATESTADO_MEDICO' || af.tipo === 'LICENCA_MEDICA' ? 'badge-pendente' : 'badge-warn');
      const anexoHtml = af.anexo
        ? (af.anexo.tipo === 'imagem' ? `<img src="${af.anexo.dataUrl}" class="doc-thumb-atestado" data-ver-af="${esc(af.id)}" title="Clique para ampliar atestado">` : `<button type="button" class="btn btn-sec btn-sm" data-ver-af="${esc(af.id)}">PDF</button>`)
        : '<span class="subtexto">Sem anexo</span>';
      return `
        <tr>
          <td>${anexoHtml}</td>
          <td><strong>${ag ? `Nº ${esc(ag.matricula)} — ${esc(ag.nome)}` : '—'}</strong><div class="subtexto">${ag ? `Equipe ${esc(ag.equipe)}` : ''}</div></td>
          <td><span class="badge ${cls}">${esc(rot)}</span>${af.cid ? `<div class="subtexto" style="font-size:11px;">${esc(af.cid)}</div>` : ''}</td>
          <td><strong>${af.dias} dia(s) fora</strong><div class="subtexto">${formatarDataBR(af.dataInicio)} a ${formatarDataBR(af.dataFim)}</div></td>
          <td><strong>${formatarDataBR(af.dataRetorno)}</strong></td>
          <td>
            <div class="acoes-linha">
              <button type="button" class="btn btn-sec btn-sm" data-ver-af="${esc(af.id)}">Ver</button>
              ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-af="${esc(af.id)}">X</button>` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="6" class="subtexto" style="text-align:center;padding:16px;">Nenhum atestado, férias ou afastamento neste filtro.</td></tr>';

    tbody.querySelectorAll('[data-ver-af]').forEach(el => el.addEventListener('click', () => {
      const af = (ESTADO.afastamentos || []).find(x => x.id === el.getAttribute('data-ver-af'));
      if (af) abrirVisualizadorAtestado(af);
    }));
    tbody.querySelectorAll('[data-del-af]').forEach(el => el.addEventListener('click', async () => {
      if (!podeEditarEscala() || !confirm('Remover este registro de afastamento?')) return;
      ESTADO.afastamentos = ESTADO.afastamentos.filter(x => x.id !== el.getAttribute('data-del-af'));
      await salvarTudo(); atualizarTodasVistas();
    }));
  }

  // Modal e Gerador do RELATORIO OFICIAL DA ESCALA PARA O COMANDO / SUPERIOR
  function abrirModalRelatorioComando(dataRef) {
    const dt = dataRef || hojeISO();
    abrirModal(
      'Emitir Relatório Oficial para o Comando / Superior (PDF)',
      `
        <div class="campo">
          <label for="mCmdDest">Autoridade / Destinatário Superior</label>
          <input type="text" id="mCmdDest" value="${esc(ESTADO.config?.responsaveis?.comandoCargo || 'Comandante da Guarda Civil Municipal de Valparaíso de Goiás')}">
        </div>
        <div class="grid-2">
          <div class="campo">
            <label for="mCmdPeriodo">Período do Relatório</label>
            <select id="mCmdPeriodo">
              <option value="DIA">Somente do Dia Selecionado</option>
              <option value="7D">Últimos 7 dias</option>
              <option value="30D">Últimos 30 dias</option>
            </select>
          </div>
          <div class="campo">
            <label for="mCmdData">Data de Referência</label>
            <input type="date" id="mCmdData" value="${esc(dt)}">
          </div>
        </div>
        <div class="campo">
          <label for="mCmdObs">Observações / Encaminhamento ao Comando (Opcional)</label>
          <textarea id="mCmdObs" rows="2" placeholder="Ex.: Encaminhamos para ciência e providências quanto às faltas e atestados médicos..."></textarea>
        </div>
        <label class="check-linha">
          <input type="checkbox" id="mCmdIncluirAnexos" checked>
          <span>Incluir cópias dos atestados médicos digitalizados ao final do PDF</span>
        </label>
      `,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Gerar PDF Oficial para o Comando', classe: 'btn-primario', onClick: () => {
          const dest = $('mCmdDest').value.trim() || 'Comando da GCM Valparaíso de Goiás';
          const modo = $('mCmdPeriodo').value;
          const dtBase = $('mCmdData').value || hojeISO();
          const obs = $('mCmdObs').value.trim();
          const incAnexos = $('mCmdIncluirAnexos').checked;
          fecharModal();
          gerarPdfRelatorioComando({ dest, modo, dtBase, obs, incAnexos });
        }}
      ]
    );
  }

  function gerarPdfRelatorioComando({ dest, modo, dtBase, obs, incAnexos }) {
    const ini = modo === '7D' ? somarDiasISO(dtBase, -6) : (modo === '30D' ? somarDiasISO(dtBase, -29) : dtBase);
    const fim = dtBase;
    const rotPeriodo = ini === fim ? formatarDataBR(ini) : `${formatarDataBR(ini)} a ${formatarDataBR(fim)}`;

    // Coleta faltas (nao comparecimentos) e presentes no periodo
    const faltasLista = [];
    let totEscalados = 0, totEmServico = 0;
    const qtdDiasLoop = Math.min(31, diffDiasISO(fim, ini) + 1);
    for (let i = 0; i < qtdDiasLoop; i++) {
      const d = somarDiasISO(ini, i);
      const { escalados } = obterEscaladosDaData(d);
      totEscalados += escalados.length;
      escalados.forEach(item => {
        const r = resumirDiaAgente(d, item.agente.id, item.permutaSaida);
        if (r.status === 'EM_SERVICO' || r.status === 'PRESENTE') totEmServico++;
        else if (r.status === 'FALTOU') {
          faltasLista.push({
            data: d, ag: item.agente, posto: item.posto,
            detalhe: r.just?.obs || r.afast?.obs || 'Não compareceu ao serviço sem justificativa registrada'
          });
        }
      });
    }

    // Coleta atestados medicos, ferias e afastamentos vigentes no periodo
    const afastPeriodo = (ESTADO.afastamentos || [])
      .filter(af => af.tipo !== 'FALTA' && af.dataInicio <= fim && af.dataFim >= ini)
      .sort((a, b) => a.dataInicio.localeCompare(b.dataInicio));

    // Tambem inclui justificativas avulsas (ex: atestado lancado direto na frequencia sem passar pelo cadastro de dias)
    const justAvulsas = [];
    Object.entries(ESTADO.justificativas || {}).forEach(([chave, val]) => {
      const [dt, aid] = chave.split('|');
      if (dt >= ini && dt <= fim && val.motivo !== 'Falta Injustificada') {
        const ag = agentePorId(aid);
        if (ag && !afastPeriodo.some(af => af.agenteId === aid && dt >= af.dataInicio && dt <= af.dataFim)) {
          justAvulsas.push({ data: dt, ag, motivo: val.motivo, obs: val.obs || '' });
        }
      }
    });

    const permsPeriodo = (ESTADO.permutas || []).filter(pm => pm.status === 'APROVADA' && pm.dataOriginal >= ini && pm.dataOriginal <= fim);

    const rowsFaltas = faltasLista.map(f => `
      <tr>
        <td style="width:12%;"><strong>${formatarDataBR(f.data)}</strong></td>
        <td style="width:7%;"><strong>${esc(f.ag.matricula)}</strong></td>
        <td style="width:27%;"><strong>${esc(f.ag.nome)}</strong></td>
        <td style="width:16%;">${esc(f.ag.equipe)} · ${esc(f.posto)}</td>
        <td style="width:38%;">${esc(f.detalhe)}</td>
      </tr>
    `).join('') || '<tr><td colspan="5" style="text-align:center;">Nenhum não comparecimento (falta) registrado neste período.</td></tr>';

    const rowsAfast = [
      ...afastPeriodo.map(af => {
        const ag = agentePorId(af.agenteId);
        return `
          <tr>
            <td style="width:24%;"><strong>${ag ? `Nº ${esc(ag.matricula)} — ${esc(ag.nome)}` : '—'}</strong><br><small>Equipe ${ag ? esc(ag.equipe) : '—'}</small></td>
            <td style="width:17%;"><strong>${esc(TIPO_AFASTAMENTO_LABEL[af.tipo] || af.tipo)}</strong>${af.cid ? `<br><small>${esc(af.cid)}</small>` : ''}</td>
            <td style="width:10%;"><strong>${af.dias} dia(s)</strong></td>
            <td style="width:17%;">${formatarDataBR(af.dataInicio)} a ${formatarDataBR(af.dataFim)}</td>
            <td style="width:10%;"><strong>${formatarDataBR(af.dataRetorno)}</strong></td>
            <td style="width:22%;">${af.anexo ? '<strong>[Anexado]</strong> ' : '[Sem anexo] '}${esc(af.obs || '—')}</td>
          </tr>
        `;
      }),
      ...justAvulsas.map(j => `
        <tr>
          <td style="width:24%;"><strong>Nº ${esc(j.ag.matricula)} — ${esc(j.ag.nome)}</strong><br><small>Equipe ${esc(j.ag.equipe)}</small></td>
          <td style="width:17%;"><strong>${esc(j.motivo)}</strong></td>
          <td style="width:10%;"><strong>1 dia</strong></td>
          <td style="width:17%;">${formatarDataBR(j.data)}</td>
          <td style="width:10%;">—</td>
          <td style="width:22%;">${esc(j.obs || 'Justificativa diária')}</td>
        </tr>
      `)
    ].join('') || '<tr><td colspan="6" style="text-align:center;">Nenhum atestado médico, férias ou afastamento no período.</td></tr>';

    const rowsPerms = permsPeriodo.map(pm => {
      const sol = agentePorId(pm.solicitanteId), sub = agentePorId(pm.substitutoId);
      return `<tr><td style="width:14%;">${formatarDataBR(pm.dataOriginal)}</td><td style="width:26%;">${esc(TIPO_PERMUTA_LABEL[pm.tipo]||pm.tipo)}</td><td style="width:30%;">${sol?`Nº ${sol.matricula} ${sol.nome}`:'—'}</td><td style="width:30%;">${sub?`Nº ${sub.matricula} ${sub.nome}`:'—'}</td></tr>`;
    }).join('');

    const anexosImg = incAnexos ? afastPeriodo.filter(af => af.anexo && af.anexo.tipo === 'imagem') : [];
    const blocoAnexos = anexosImg.length ? `
      <div class="quebra"></div>
      <h2>ANEXO — ATESTADOS MÉDICOS E DOCUMENTOS DIGITALIZADOS (${anexosImg.length})</h2>
      ${anexosImg.map((af, idx) => {
        const ag = agentePorId(af.agenteId);
        return `
          <div class="box" style="text-align:center;">
            <div style="text-align:left;margin-bottom:6px;border-bottom:1px solid #CCC;padding-bottom:4px;">
              <strong>Anexo ${idx + 1}:</strong> ${esc(TIPO_AFASTAMENTO_LABEL[af.tipo] || af.tipo)} — <strong>${ag ? `Nº ${esc(ag.matricula)} ${esc(ag.nome)}` : '—'}</strong> · ${af.dias} dia(s) fora (${formatarDataBR(af.dataInicio)} a ${formatarDataBR(af.dataFim)} · Retorno ${formatarDataBR(af.dataRetorno)})${af.cid ? ' · ' + esc(af.cid) : ''}
            </div>
            <img src="${af.anexo.dataUrl}" style="max-width:100%;max-height:360px;object-fit:contain;border:1px solid #333;">
          </div>
        `;
      }).join('')}
    ` : '';

    const corpo = `
      <div class="box">
        <div><strong>AO / DESTINATÁRIO SUPERIOR:</strong> ${esc(dest)}</div>
        <div style="margin-top:3px;"><strong>ASSUNTO:</strong> Relatório Oficial da Escala — Não Comparecimentos (Faltas), Atestados Médicos, Férias e Afastamentos</div>
        <div style="margin-top:3px;"><strong>PERÍODO APURADO:</strong> ${esc(rotPeriodo)} · <strong>Escalados no período:</strong> ${totEscalados} | <strong>Em Serviço:</strong> ${totEmServico} | <strong>Não Compareceram (Faltas):</strong> ${faltasLista.length} | <strong>Atestados / Afastamentos:</strong> ${afastPeriodo.length + justAvulsas.length} | <strong>Permutas:</strong> ${permsPeriodo.length}</div>
        ${obs ? `<div style="margin-top:5px;border-top:1px solid #CCC;padding-top:4px;"><strong>Encaminhamento / Observação:</strong> ${esc(obs)}</div>` : ''}
      </div>

      <h2>1. RELAÇÃO DE NÃO COMPARECIMENTOS (FALTAS SEM JUSTIFICATIVA)</h2>
      <table>
        <thead><tr><th style="width:12%;">Data</th><th style="width:7%;">Nº</th><th style="width:27%;">Guarda GCM</th><th style="width:16%;">Equipe / Setor</th><th style="width:38%;">Ocorrência / Situação</th></tr></thead>
        <tbody>${rowsFaltas}</tbody>
      </table>

      <h2>2. ATESTADOS MÉDICOS, FÉRIAS E AFASTAMENTOS (DIAS FORA E DATA DE RETORNO)</h2>
      <table>
        <thead><tr><th style="width:24%;">Guarda GCM</th><th style="width:17%;">Motivo / CID</th><th style="width:10%;">Dias Fora</th><th style="width:17%;">Período</th><th style="width:10%;">Retorno</th><th style="width:22%;">Documento / Obs.</th></tr></thead>
        <tbody>${rowsAfast}</tbody>
      </table>

      ${permsPeriodo.length ? `<h2>3. PERMUTAS HOMOLOGADAS NO PERÍODO</h2><table><thead><tr><th style="width:14%;">Data</th><th style="width:26%;">Tipo</th><th style="width:30%;">Solicitante (Saiu)</th><th style="width:30%;">Substituto (Assumiu)</th></tr></thead><tbody>${rowsPerms}</tbody></table>` : ''}
      ${(() => {
        const foraValpPts = (ESTADO.pontos || []).filter(p => (p.foraValparaiso || p.localizacao?.status === 'FORA_VALPARAISO') && p.dataLocal >= ini && p.dataLocal <= fim);
        if (!foraValpPts.length) return '';
        const rowsFv = foraValpPts.map(p => `<tr><td style="width:14%;"><strong>${formatarDataBR(p.dataLocal)}</strong><br>${esc(p.horaLocal)}</td><td style="width:22%;"><strong>Nº ${esc(p.agenteMatricula)} ${esc(p.agenteNome)}</strong><br><small>${esc(TIPO_PONTO_LABEL[p.tipo]||p.tipo)}</small></td><td style="width:28%;">${esc(p.localizacao?.endereco || '—')}</td><td style="width:36%;"><strong>${esc(p.justificativaForaValp?.categoria || 'Não informado')}</strong><br>${esc(p.justificativaForaValp?.detalhe || p.obs || '—')}</td></tr>`).join('');
        return `<h2>4. REGISTROS DE PONTO FORA DE VALPARAÍSO DE GOIÁS (JUSTIFICATIVAS AO COMANDO)</h2><table><thead><tr><th style="width:14%;">Data / Hora</th><th style="width:22%;">Guarda / Batida</th><th style="width:28%;">Localidade Detectada</th><th style="width:36%;">Motivo Informado ao Comando</th></tr></thead><tbody>${rowsFv}</tbody></table>`;
      })()}
      ${blocoAnexos}
    `;

    emitirPdfAutenticado({
      tipoDoc: 'RELATORIO_COMANDO',
      titulo: 'RELATÓRIO OFICIAL DE ESCALA, FALTAS E ATESTADOS PARA O COMANDO',
      subtitulo: `Destinatário: ${dest} · Período: ${rotPeriodo}`,
      corpoHtml: corpo,
      nomeArquivo: `relatorio-comando-escala-${dtBase}.pdf`,
      paisagem: false,
      qtdRegistros: faltasLista.length + afastPeriodo.length + justAvulsas.length
    });
  }

  // =========================================================================
  // 3. CARTAO PROGRAMA COMPLETO + MAPA DOS SETORES
  // =========================================================================
  function iniciarMapaSetorSePreciso() {
    if (mapaSetor || typeof L === 'undefined') return;
    const container = $('mapaSetorCanvas'); if (!container) return;
    mapaSetor = L.map(container, { zoomControl: true }).setView([-16.0650, -47.9790], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: 'OpenStreetMap' }).addTo(mapaSetor);
    camadaPoligonos = L.layerGroup().addTo(mapaSetor);
    camadaPbs = L.layerGroup().addTo(mapaSetor);

    mapaSetor.on('click', (e) => {
      if (!modoMarcarPbMapa || !podeEditarEscala()) return;
      const lat = Number(e.latlng.lat.toFixed(5)), lon = Number(e.latlng.lng.toFixed(5));
      const cur = lerCartaoDoEditor(), proxNum = cur.pontosBase.length + 1;
      cur.pontosBase.push({ hora: '00:00 - 00:00', local: `PB ${proxNum} — Ponto marcado no mapa`, atividade: 'Descreva passo a passo o que a guarnição deve executar neste ponto...', lat, lon });
      renderLinhasPb(cur.pontosBase);
      modoMarcarPbMapa = false; $('avisoCliqueMapa').classList.add('oculto'); $('btnModoMarcarPb').textContent = '+ Marcar Ponto Base (PB) no Mapa';
      atualizarDesenhoMapaSetor(); toast(`PB ${proxNum} marcado (${lat}, ${lon}).`);
    });
  }

  function atualizarDesenhoMapaSetor() {
    if (!mapaSetor || !camadaPoligonos || !camadaPbs) return;
    camadaPoligonos.clearLayers(); camadaPbs.clearLayers();
    const pid = $('selCartaoPosto').value || ESTADO.postos[0]?.id, postoAtual = ESTADO.postos.find(p => p.id === pid);
    const mostrarTodos = $('chkMostrarTodosSetores')?.checked;
    const listaDesenho = mostrarTodos ? ESTADO.postos : (postoAtual ? [postoAtual] : []);
    let boundsAlvo = null;

    listaDesenho.forEach(p => {
      const poly = p.poligono || POLIGONOS_PADRAO[p.id] || POLIGONOS_PADRAO['MUNICIPIO'];
      if (!poly || !poly.length) return;
      const ehAtual = p.id === pid;
      const layer = L.polygon(poly, { color: p.cor || '#18181B', weight: ehAtual ? 3 : 1.5, fillColor: p.cor || '#18181B', fillOpacity: ehAtual ? 0.16 : 0.05, dashArray: ehAtual ? null : '5,5' }).addTo(camadaPoligonos);
      layer.bindTooltip(`${p.prefixo} — ${p.setor} (${p.bairros})`, { sticky: true });
      if (ehAtual) boundsAlvo = layer.getBounds();
    });

    const cpAtual = lerCartaoDoEditor();
    (cpAtual.pontosBase || []).forEach((pb, i) => {
      if (typeof pb.lat !== 'number' || typeof pb.lon !== 'number' || isNaN(pb.lat) || isNaN(pb.lon)) return;
      const icon = L.divIcon({ className: 'pb-pin-icon', html: String(i + 1), iconSize: [26, 26], iconAnchor: [13, 13] });
      const mk = L.marker([pb.lat, pb.lon], { icon, draggable: podeEditarEscala() }).addTo(camadaPbs);
      mk.bindPopup(`<strong>PB ${i + 1} (${esc(pb.hora)})</strong><br>${esc(pb.local)}<br><small>${esc(pb.atividade)}</small>`);
      mk.on('dragend', () => {
        const pos = mk.getLatLng(), trs = $('tbodyPontosBase').querySelectorAll('tr');
        if (trs[i]?.querySelector('.pb-gps')) trs[i].querySelector('.pb-gps').value = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`;
        toast(`PB ${i + 1} movido! Clique em Salvar para gravar.`);
      });
    });

    if (postoAtual) {
      $('tituloMapaSetor').textContent = `Mapa do ${postoAtual.setor} (${postoAtual.prefixo}) — Valparaíso de Goiás`;
      $('subMapaSetor').textContent = `Bairros: ${postoAtual.bairros} · Pinos numerados correspondem à tabela de Pontos Base abaixo.`;
    }
    if (boundsAlvo && boundsAlvo.isValid()) mapaSetor.fitBounds(boundsAlvo, { padding: [24, 24], maxZoom: 15 });
  }

  function popularSelectsCartao() {
    const sel = $('selCartaoPosto'), cur = sel.value;
    sel.innerHTML = ESTADO.postos.map(p => `<option value="${esc(p.id)}">${esc(p.nome)}</option>`).join('');
    if (cur && ESTADO.postos.some(p => p.id === cur)) sel.value = cur;
  }
  function chaveCartao(d, eq, pid) { return `${d}|${eq}|${pid}`; }
  function obterDadosCartao(d, eq, pid) {
    const salvo = ESTADO.cartoesDia[chaveCartao(d, eq, pid)];
    const posto = ESTADO.postos.find(p => p.id === pid) || ESTADO.postos[0];
    const mod = ESTADO.cartoesModelo[pid] || criarModeloCartaoPadrao(posto);
    const mont = (ESTADO.equipesMontagem[eq] || {})[pid] || {};
    if (salvo) return JSON.parse(JSON.stringify(salvo));
    return {
      setor: mod.setor || posto.setor, bairros: mod.bairros || posto.bairros, prefixo: mod.prefixo || posto.prefixo,
      placa: mod.placa || 'A definir', radio: mod.radio || 'Canal 01 — CCO 153', kmIni: mod.kmIni || '', kmFim: mod.kmFim || '',
      responsavel: posto.responsavel || mod.responsavel || '',
      g01: nomeAgentePorId(mont.g01) || '', g02: nomeAgentePorId(mont.g02) || '', g03: nomeAgentePorId(mont.g03) || '',
      checklist: Array.isArray(mod.checklist) ? [...mod.checklist] : [...CHECKLIST_PADRAO],
      missao: mod.missao || '', areasSensiveis: mod.areasSensiveis || '',
      procedimentos: mod.procedimentos || PROCEDIMENTOS_PADRAO,
      pontosBase: JSON.parse(JSON.stringify(mod.pontosBase || [])), obs: mod.obs || ''
    };
  }
  function sincronizarDataCartao() {
    const d = $('inpCartaoData').value || hojeISO(); $('inpCartaoData').value = d;
    $('selCartaoEquipe').value = calcularCiclo24x72(d).equipeServico;
    carregarEditorCartao();
  }
  function carregarEditorCartao() {
    const d = $('inpCartaoData').value || hojeISO(), eq = $('selCartaoEquipe').value || 'ALFA';
    const pid = $('selCartaoPosto').value || ESTADO.postos[0]?.id, posto = ESTADO.postos.find(p => p.id === pid); if (!posto) return;
    const cp = obterDadosCartao(d, eq, pid);
    $('tituloEditorCartao').textContent = `Ordem Operacional — ${posto.prefixo} (${posto.setor})`;
    $('badgeAreaCartao').textContent = `EQUIPE ${eq} · ${formatarDataBR(d)}`;
    $('inpCpSetor').value = cp.setor||''; $('inpCpPrefixo').value = cp.prefixo||'';
    $('inpCpPlaca').value = cp.placa||''; $('inpCpRadio').value = cp.radio||'';
    $('inpCpRespSetor').value = cp.responsavel||''; $('inpCpBairros').value = cp.bairros||'';
    $('inpCpKmIni').value = cp.kmIni||''; $('inpCpKmFim').value = cp.kmFim||'';
    $('inpCpG01').value = cp.g01||''; $('inpCpG02').value = cp.g02||''; $('inpCpG03').value = cp.g03||'';
    $('inpCpMissao').value = cp.missao||''; $('inpCpAreasSensiveis').value = cp.areasSensiveis||'';
    $('inpCpProcedimentos').value = cp.procedimentos||''; $('inpCpObs').value = cp.obs||'';
    const chks = Array.isArray(cp.checklist) ? cp.checklist : CHECKLIST_PADRAO;
    $('wrapChecklistCp').querySelectorAll('.cp-chk').forEach(cb => { cb.checked = chks.includes(cb.value); });
    renderLinhasPb(cp.pontosBase || []);
    aplicarPermissoesVisuais();
    setTimeout(() => { iniciarMapaSetorSePreciso(); if (mapaSetor) { mapaSetor.invalidateSize(); atualizarDesenhoMapaSetor(); } }, 80);
  }
  function renderLinhasPb(lista) {
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('tbodyPontosBase').innerHTML = (lista || []).map((it, i) => {
      const gpsStr = (typeof it.lat === 'number' && typeof it.lon === 'number') ? `${it.lat.toFixed(5)}, ${it.lon.toFixed(5)}` : '';
      return `<tr><td><strong>PB ${i+1}</strong></td><td><input type="text" class="pb-hora" value="${esc(it.hora||'')}" ${desab}></td><td><input type="text" class="pb-local" value="${esc(it.local||'')}" ${desab}></td><td><input type="text" class="pb-ativ" value="${esc(it.atividade||'')}" ${desab}></td><td><input type="text" class="pb-gps" value="${esc(gpsStr)}" placeholder="-16.07, -47.98" ${desab}></td><td class="so-gestao">${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-del-pb="${i}">X</button>`:''}</td></tr>`;
    }).join('');
    $('tbodyPontosBase').querySelectorAll('[data-del-pb]').forEach(b => b.addEventListener('click', () => { b.closest('tr').remove(); atualizarDesenhoMapaSetor(); }));
  }
  function lerCartaoDoEditor() {
    const pontosBase = [];
    $('tbodyPontosBase').querySelectorAll('tr').forEach(tr => {
      const hora = tr.querySelector('.pb-hora')?.value.trim()||'', local = tr.querySelector('.pb-local')?.value.trim()||'', atividade = tr.querySelector('.pb-ativ')?.value.trim()||'';
      const gpsRaw = (tr.querySelector('.pb-gps')?.value||'').split(',').map(x => Number(x.trim()));
      const lat = (gpsRaw.length===2 && !isNaN(gpsRaw[0])) ? gpsRaw[0] : null, lon = (gpsRaw.length===2 && !isNaN(gpsRaw[1])) ? gpsRaw[1] : null;
      if (hora || local || atividade) pontosBase.push({ hora, local, atividade, lat, lon });
    });
    const checklist = [];
    $('wrapChecklistCp').querySelectorAll('.cp-chk:checked').forEach(cb => checklist.push(cb.value));
    return {
      setor: $('inpCpSetor').value.trim(), prefixo: $('inpCpPrefixo').value.trim(),
      placa: $('inpCpPlaca').value.trim(), radio: $('inpCpRadio').value.trim(),
      responsavel: $('inpCpRespSetor').value.trim(), bairros: $('inpCpBairros').value.trim(),
      kmIni: $('inpCpKmIni').value.trim(), kmFim: $('inpCpKmFim').value.trim(),
      g01: $('inpCpG01').value.trim(), g02: $('inpCpG02').value.trim(), g03: $('inpCpG03').value.trim(),
      checklist, missao: $('inpCpMissao').value.trim(), areasSensiveis: $('inpCpAreasSensiveis').value.trim(),
      procedimentos: $('inpCpProcedimentos').value.trim(), pontosBase, obs: $('inpCpObs').value.trim()
    };
  }

  function gerarCroquiSvgSetor(posto, pontosBase) {
    const poly = posto.poligono || POLIGONOS_PADRAO[posto.id] || POLIGONOS_PADRAO['MUNICIPIO'];
    const todosPts = [...poly];
    (pontosBase||[]).forEach(pb => { if (typeof pb.lat==='number' && typeof pb.lon==='number') todosPts.push([pb.lat, pb.lon]); });
    const lats = todosPts.map(p => p[0]), lons = todosPts.map(p => p[1]);
    const minLat = Math.min(...lats) - 0.0022, maxLat = Math.max(...lats) + 0.0022;
    const minLon = Math.min(...lons) - 0.0025, maxLon = Math.max(...lons) + 0.0025;
    const W = 230, H = 145, pad = 16;
    const x = (lon) => pad + ((lon - minLon) / Math.max(0.0001, maxLon - minLon)) * (W - pad * 2);
    const y = (lat) => pad + ((maxLat - lat) / Math.max(0.0001, maxLat - minLat)) * (H - pad * 2);
    const ptsStr = poly.map(p => `${x(p[1]).toFixed(1)},${y(p[0]).toFixed(1)}`).join(' ');
    const pinos = (pontosBase||[]).map((pb, i) => {
      if (typeof pb.lat !== 'number' || typeof pb.lon !== 'number') return '';
      const cx = x(pb.lon).toFixed(1), cy = y(pb.lat).toFixed(1);
      return `<circle cx="${cx}" cy="${cy}" r="8" fill="#141414" stroke="#FFFFFF" stroke-width="1.5"/><text x="${cx}" y="${(Number(cy)+3).toFixed(1)}" text-anchor="middle" fill="#FFFFFF" font-size="8" font-weight="bold" font-family="Arial">${i+1}</text>`;
    }).join('');
    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;border:1px solid #333;background:#F7F7F5;display:block;"><line x1="0" y1="${H/2}" x2="${W}" y2="${H/2}" stroke="#E0E0DC" stroke-dasharray="3,3"/><line x1="${W/2}" y1="0" x2="${W/2}" y2="${H}" stroke="#E0E0DC" stroke-dasharray="3,3"/><polygon points="${ptsStr}" fill="${esc(posto.cor||'#18181B')}" fill-opacity="0.14" stroke="${esc(posto.cor||'#18181B')}" stroke-width="2"/>${pinos}<text x="6" y="11" font-size="7.5" font-weight="bold" fill="#141414" font-family="Arial">CROQUI ${esc(posto.setor.toUpperCase())}</text><text x="${W-15}" y="12" font-size="7.5" font-weight="bold" fill="#333" font-family="Arial">N↑</text></svg>`;
  }

  function copiarResumoWhatsApp() {
    const d = $('inpCartaoData').value || hojeISO(), eq = $('selCartaoEquipe').value;
    const ls = [`*GCM VALPARAÍSO DE GOIÁS — CARTÃO PROGRAMA*`, `Data: *${formatarDataBR(d)}* | Turno: *${ESTADO.config.horarioTroca}*`, `Equipe 24x72: *EQUIPE ${eq}*`, `--------------------------------`];
    ESTADO.postos.forEach(p => {
      const cp = obterDadosCartao(d, eq, p.id);
      ls.push(`*${cp.prefixo || p.id} — ${cp.setor}* (${cp.radio || 'CCO 153'})`);
      ls.push(`Resp.: ${cp.responsavel || 'A definir'} | Cobertura: ${cp.bairros}`);
      ls.push(`Guarnição: ${[cp.g01 && `01: ${cp.g01}`, cp.g02 && `02: ${cp.g02}`, cp.g03 && `03: ${cp.g03}`].filter(Boolean).join(' | ') || 'A definir'}`);
      ls.push(`Objetivo: ${cp.missao}`);
      (cp.pontosBase||[]).forEach((pb, i) => ls.push(`  PB ${i+1} [${pb.hora}] ${pb.local}: ${pb.atividade}`));
      ls.push('');
    });
    const txt = ls.join('\n');
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(() => toast('Resumo copiado para o WhatsApp!'));
    else abrirModal('Copiar WhatsApp', `<textarea rows="13" style="width:100%;font-family:monospace;">${esc(txt)}</textarea>`, [{ texto: 'Fechar', onClick: fecharModal }]);
  }

  // =========================================================================
  // 4. BANCO DE HORAS E HORAS EXTRAS (CALCULO AUTOMATICO + LANCAMENTOS)
  // =========================================================================
  function calcularMinutosTrabalhadosPonto(agenteId, mesFiltro) {
    const datasTurnos = new Set();
    (ESTADO.pontos || []).forEach(p => {
      if (p.agenteId !== agenteId) return;
      const dtT = dataTurnoEfetivaPonto(p);
      if (!mesFiltro || dtT.startsWith(mesFiltro)) datasTurnos.add(dtT);
    });
    let totalMin = 0;
    datasTurnos.forEach(dtT => {
      totalMin += obterBatidasDoTurno(dtT, agenteId).duracaoMin;
    });
    return Math.round(totalMin);
  }

  function calcularResumoBancoAgente(agenteId, mesFiltro) {
    const movs = (ESTADO.bancoHorasMovs || []).filter(m => m.agenteId === agenteId && (!mesFiltro || (m.data||'').startsWith(mesFiltro)));
    let creditosMin = 0, debitosMin = 0;
    movs.forEach(m => {
      if (m.computadoMin >= 0) creditosMin += m.computadoMin;
      else debitosMin += Math.abs(m.computadoMin);
    });
    const saldoMin = creditosMin - debitosMin;
    const valHora = Number(ESTADO.config?.bancoHoras?.valorHora || 0);
    const valorEstimado = saldoMin > 0 && valHora > 0 ? (saldoMin / 60) * valHora : 0;
    const pontoMin = calcularMinutosTrabalhadosPonto(agenteId, mesFiltro);
    return { pontoMin, creditosMin, debitosMin, saldoMin, valorEstimado, movs };
  }

  function apurarHorasExtrasPeloPonto() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    const regras = ESTADO.config.bancoHoras || { horaInicio24: '07:00', horaInicioAdm: '08:00', antecedenciaMin: 30, toleranciaAtrasoMin: 10, carga24: 24, cargaAdm: 8, mult50: 1.5, mult100: 2.0 };
    const chavesExistentes = new Set((ESTADO.bancoHorasMovs || []).filter(m => m.chaveAuto).map(m => m.chaveAuto));
    const chavesTurnos = new Set();
    (ESTADO.pontos || []).forEach(p => {
      chavesTurnos.add(`${p.agenteId}|${dataTurnoEfetivaPonto(p)}`);
    });
    let novosExtras = 0, novosAtrasos = 0;
    chavesTurnos.forEach((k) => {
      const [agId, dtTurno] = k.split('|');
      const ag = agentePorId(agId); if (!ag) return;
      const turno = obterBatidasDoTurno(dtTurno, agId);
      const { ent, sai, duracaoMin, virouDia } = turno;
      if (!ent) return;

      // 1. Apuracao de Atraso acima da tolerancia estipulada -> Debito no Banco de Horas
      const chaveAtr = k + '|ATRASO';
      if (!chavesExistentes.has(chaveAtr)) {
        const av = ent.avaliacaoHorario || avaliarHorarioEntrada(ag, ent.horaLocal.slice(0, 5));
        if (av.status === 'ATRASADO' && av.atrasoMin > 0 && av.atrasoMin < 360) {
          ESTADO.bancoHorasMovs.unshift({
            id: 'bh_atr_' + Date.now().toString(36) + '_' + novosAtrasos,
            chaveAuto: chaveAtr,
            agenteId: ag.id, data: dtTurno,
            tipo: 'DEBITO_ATRASO', duracaoMin: av.atrasoMin, fator: 1, computadoMin: -av.atrasoMin,
            motivo: `Atraso na Entrada (${ent.horaLocal.slice(0,5)} · previsto ${av.previsto}, tolerância até ${av.janelaFim})`,
            por: SESSAO?.nome || 'Sistema', em: new Date().toISOString()
          });
          novosAtrasos++;
        }
      }

      // 2. Apuracao de Excedente de Jornada (Entrada + Saida fechados, inclusive virando meia-noite!)
      if (!sai || duracaoMin <= 0 || chavesExistentes.has(k)) return;
      const cargaEsperadaMin = (ag.equipe === 'ADM' ? Number(regras.cargaAdm || 8) : (ag.equipe === '12X36' ? 12 : Number(regras.carga24 || 24))) * 60;
      const excedenteMin = Math.round(duracaoMin - cargaEsperadaMin);
      if (excedenteMin >= 15) {
        const dow = diaSemanaISO(dtTurno);
        const fator = dow === 0 ? Number(regras.mult100 || 2.0) : Number(regras.mult50 || 1.5);
        const compMin = Math.round(excedenteMin * fator);
        ESTADO.bancoHorasMovs.unshift({
          id: 'bh_' + Date.now().toString(36) + '_' + novosExtras,
          chaveAuto: k,
          agenteId: ag.id, data: dtTurno,
          tipo: 'PONTO_AUTO', duracaoMin: excedenteMin, fator, computadoMin: compMin,
          motivo: `Excedente apurado automaticamente na Folha de Ponto (${ent.horaLocal.slice(0,5)} às ${sai.horaLocal.slice(0,5)}${virouDia ? ' +1d' : ''} = ${formatarMinutosHM(duracaoMin, false)})`,
          por: SESSAO?.nome || 'Sistema', em: new Date().toISOString()
        });
        novosExtras++;
      }
    });
    if (novosExtras > 0 || novosAtrasos > 0) {
      salvarTudo(true); renderBancoHoras();
      toast(`Apurado: ${novosExtras} hora(s) extra(s) e ${novosAtrasos} débito(s) de atraso pela Folha de Ponto.`);
    } else {
      toast('Nenhum novo excedente ou atraso acima da tolerância encontrado nos pontos.');
    }
  }

  function renderBancoHoras() {
    const regras = ESTADO.config.bancoHoras || { horaInicio24: '07:00', horaInicioAdm: '08:00', antecedenciaMin: 30, toleranciaAtrasoMin: 10, carga24: 24, cargaAdm: 8, valorHora: 0, mult50: 1.5, mult100: 2.0 };
    if ($('inpBhHoraIni24')) $('inpBhHoraIni24').value = regras.horaInicio24 || '07:00';
    if ($('inpBhHoraIniAdm')) $('inpBhHoraIniAdm').value = regras.horaInicioAdm || '08:00';
    if ($('inpBhAntecedencia')) $('inpBhAntecedencia').value = regras.antecedenciaMin ?? 30;
    if ($('inpBhTolerancia')) $('inpBhTolerancia').value = regras.toleranciaAtrasoMin ?? 10;
    $('inpBhCarga24').value = regras.carga24 ?? 24;
    $('inpBhCargaAdm').value = regras.cargaAdm ?? 8;
    $('inpBhValorHora').value = regras.valorHora ?? 0;
    $('inpBhMult50').value = regras.mult50 ?? 1.5;
    $('inpBhMult100').value = regras.mult100 ?? 2.0;

    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    $('selBhAgente').innerHTML = ativos.map(a => `<option value="${esc(a.id)}">Nº ${esc(a.matricula)} — ${esc(a.nome)} (${esc(a.equipe)})</option>`).join('');
    if (!$('inpBhData').value) $('inpBhData').value = hojeISO();

    const mes = $('fltBhMes').value || '';
    const busca = ($('fltBhBusca').value || '').trim().toLowerCase();
    const fltEq = $('fltBhEquipe').value || '';

    const meuBh = !podeEditarEscala() ? agenteLogadoAtual() : null;
    const filtrados = ativos.filter(a =>
      (!podeEditarEscala() ? (meuBh ? a.id === meuBh.id : false) : true) &&
      (!fltEq || a.equipe === fltEq) &&
      (!busca || a.nome.toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca))
    );

    $('tbodyBhSaldo').innerHTML = filtrados.map(a => {
      const r = calcularResumoBancoAgente(a.id, mes);
      const clsSaldo = r.saldoMin > 0 ? 'saldo-pos' : (r.saldoMin < 0 ? 'saldo-neg' : 'saldo-zero');
      return `
        <tr>
          <td><strong>${esc(a.matricula)}</strong></td>
          <td><strong>${esc(a.nome)}</strong></td>
          <td><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span></td>
          <td>${formatarMinutosHM(r.pontoMin, false)}</td>
          <td class="saldo-pos">${formatarMinutosHM(r.creditosMin, true)}</td>
          <td class="saldo-neg">${r.debitosMin ? '-' + formatarMinutosHM(r.debitosMin, false) : '00h00'}</td>
          <td class="${clsSaldo}">${formatarMinutosHM(r.saldoMin, true)}</td>
          <td>${r.valorEstimado > 0 ? 'R$ ' + r.valorEstimado.toFixed(2).replace('.', ',') : '—'}</td>
          <td><button type="button" class="btn btn-sec btn-sm" data-pdf-bh-ag="${esc(a.id)}">PDF</button></td>
        </tr>
      `;
    }).join('');

    $('tbodyBhSaldo').querySelectorAll('[data-pdf-bh-ag]').forEach(b => b.addEventListener('click', () => gerarPdfBancoHoras(b.getAttribute('data-pdf-bh-ag'))));

    const movs = (ESTADO.bancoHorasMovs || []).filter(m => (!podeEditarEscala() ? (meuBh ? m.agenteId === meuBh.id : false) : true) && (!mes || (m.data||'').startsWith(mes)));
    $('badgeQtdMovBh').textContent = `${movs.length} lançamento(s)`;
    $('tbodyBhMovs').innerHTML = movs.map(m => {
      const ag = agentePorId(m.agenteId);
      const cls = m.computadoMin >= 0 ? 'saldo-pos' : 'saldo-neg';
      return `
        <tr>
          <td><strong>${formatarDataBR(m.data)}</strong></td>
          <td>${ag ? `Nº ${esc(ag.matricula)} ${esc(ag.nomeGuerra)}` : '—'}</td>
          <td>${esc(TIPO_BH_LABEL[m.tipo] || m.tipo)}</td>
          <td>${formatarMinutosHM(m.duracaoMin, false)} (×${m.fator || 1})</td>
          <td class="${cls}">${formatarMinutosHM(m.computadoMin, true)}</td>
          <td>${esc(m.motivo || '—')}</td>
          <td class="so-admin">${isAdmin() ? `<button type="button" class="btn btn-sec btn-sm" data-del-bh="${esc(m.id)}">X</button>` : '—'}</td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="7" class="subtexto" style="text-align:center;padding:14px;">Nenhum lançamento no Banco de Horas.</td></tr>';

    $('tbodyBhMovs').querySelectorAll('[data-del-bh]').forEach(b => b.addEventListener('click', async () => {
      if (!isAdmin() || !confirm('Excluir lançamento do Banco de Horas?')) return;
      ESTADO.bancoHorasMovs = ESTADO.bancoHorasMovs.filter(x => x.id !== b.getAttribute('data-del-bh'));
      await salvarTudo(); renderBancoHoras();
    }));
  }

  // =========================================================================
  // 5. TELA DEDICADA DA EQUIPE (CLIQUE EM ALFA / BRAVO / CHARLIE / DELTA)
  // =========================================================================
  function abrirTelaEquipe(eq) {
    if (!EQUIPES.includes(eq)) return;
    equipeDetalheAtual = eq;
    abrirAba('secEquipeDetalhe');
  }

  function renderTelaEquipeDetalhe() {
    const eq = equipeDetalheAtual || 'ALFA';
    const cor = EQUIPE_CORES[eq]?.cor || '#18181B';
    const cicloHoje = calcularCiclo24x72(hojeISO());
    const stHoje = cicloHoje.mapa[eq];
    const membros = ESTADO.efetivo.filter(a => a.equipe === eq).sort((a,b) => Number(a.matricula) - Number(b.matricula));
    const mont = ESTADO.equipesMontagem[eq] || {};

    // Destaca o botao ativo na barra esquerda
    document.querySelectorAll('.insig-btn').forEach(b => b.classList.toggle('ativa', b.getAttribute('data-ver-equipe') === eq && $('secEquipeDetalhe').classList.contains('ativa')));

    $('lblTituloPaginaAtual').textContent = `Equipe ${eq} — Integrantes e Guarnições`;
    $('tituloTelaEquipe').textContent = `Equipe ${eq} — Quadro Nominal e Viaturas`;
    $('subTelaEquipe').textContent = `Status hoje (${formatarDataBR(hojeISO())}): ${stHoje.rotulo} · Próximos serviços (30 dias): ${proximosDiasServico(eq, 30)}`;

    $('faixaInfoEquipe').style.borderLeftColor = cor;
    $('faixaInfoEquipe').innerHTML = `
      <div>
        <div class="subtexto">ESCALA 24x72 · ${esc(ESTADO.config.horarioTroca)}</div>
        <div style="font-size:18px;font-weight:800;margin-top:3px;"><span class="insig eq-${eq}" style="font-size:13px;">EQUIPE ${eq}</span> · ${esc(stHoje.rotulo)}</div>
        <div class="subtexto mt-4">Próximos dias de serviço: <strong>${esc(proximosDiasServico(eq, 30))}</strong></div>
      </div>
      <div class="faixa-kpis">
        <div class="faixa-kpi"><strong>${membros.length}</strong><span>Integrantes</span></div>
        <div class="faixa-kpi"><strong>${ESTADO.postos.length}</strong><span>Viaturas</span></div>
      </div>
    `;

    $('gridVtrsEquipeDetalhe').innerHTML = ESTADO.postos.map(p => {
      const g = mont[p.id] || {};
      return `
        <div class="posto-card" style="border-left-color:${esc(p.cor || '#18181B')};">
          <div class="card-cab"><strong>${esc(p.nome)}</strong><span class="badge badge-neutro">${esc(p.setor)}</span></div>
          <div class="subtexto">Resp.: ${esc(p.responsavel || 'A definir')} · ${esc(p.bairros)}</div>
          <div style="font-size:12.5px;">
            <div><strong>01 Comandante:</strong> ${esc(nomeAgentePorId(g.g01) || '— Vago —')}</div>
            <div><strong>02 Motorista:</strong> ${esc(nomeAgentePorId(g.g02) || '— Vago —')}</div>
            <div><strong>03 Patrulheiro:</strong> ${esc(nomeAgentePorId(g.g03) || '— Vago —')}</div>
          </div>
        </div>
      `;
    }).join('');

    $('tituloListaIntegrantesEq').textContent = `Todos os Guardas da Equipe ${eq}`;
    $('badgeQtdIntegrantesEq').textContent = `${membros.length} guardas`;
    $('tbodyIntegrantesEquipe').innerHTML = membros.map(a => {
      const inf = descobrirSetorDoAgente(a);
      const bh = calcularResumoBancoAgente(a.id, '');
      const clsSaldo = bh.saldoMin > 0 ? 'saldo-pos' : (bh.saldoMin < 0 ? 'saldo-neg' : 'saldo-zero');
      return `
        <tr>
          <td><strong>${esc(a.matricula)}</strong></td>
          <td><strong>${esc(a.nome)}</strong></td>
          <td>${esc(a.nomeGuerra || '—')}</td>
          <td>${esc(inf.nome)}</td>
          <td>${esc(inf.funcao)}</td>
          <td class="${clsSaldo} so-gestao">${formatarMinutosHM(bh.saldoMin, true)}</td>
          <td>${(() => {
            const meuEq = agenteLogadoAtual();
            const podeVerDet = podeEditarEscala() || (meuEq && meuEq.id === a.id);
            const afH = obterAfastamentoNaData(a.id, hojeISO());
            if (afH) {
              if (!podeVerDet) return '<span class="badge badge-warn">Afastado</span>';
              return `<span class="badge ${afH.tipo==='FALTA'?'badge-erro':'badge-warn'}">${esc(TIPO_AFASTAMENTO_LABEL[afH.tipo]||afH.tipo)} (${afH.dias}d · Ret. ${formatarDataBR(afH.dataRetorno).slice(0,5)})</span>`;
            }
            return `<span class="badge ${a.situacao==='ATIVO'?'badge-ok':'badge-warn'}">${esc(a.situacao)}</span>`;
          })()}</td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="7" class="subtexto" style="text-align:center;">Nenhum integrante nesta equipe.</td></tr>';
  }

  // =========================================================================
  // 6. VALIDAR AUTENTICIDADE E AUDITORIA DA CADEIA SHA-256
  // =========================================================================
  function obterTurnosParaAuditoriaIdentidade() {
    const mes = $('fltIdMes')?.value || '';
    const busca = ($('fltIdBusca')?.value || '').trim().toLowerCase();
    const fltSt = $('fltIdStatus')?.value || '';
    const grupos = new Map();

    (ESTADO.pontos || []).forEach(p => {
      const dtT = dataTurnoEfetivaPonto(p);
      if (mes && !dtT.startsWith(mes)) return;
      const ag = agentePorId(p.agenteId);
      if (busca && !(p.agenteNome.toLowerCase().includes(busca) || String(p.agenteMatricula).toLowerCase().includes(busca))) return;
      const chave = `${dtT}|${p.agenteId}`;
      if (!grupos.has(chave)) {
        grupos.set(chave, { chave, dataLocal: dtT, agenteId: p.agenteId, ag, nome: p.agenteNome, matricula: p.agenteMatricula, equipe: p.equipe, ent: null, sai: null, outros: [] });
      }
      const g = grupos.get(chave);
      if (p.tipo === 'ENTRADA' && !g.ent) g.ent = p;
      else if (p.tipo === 'SAIDA' && !g.sai) g.sai = p;
      else g.outros.push(p);
    });

    const lista = Array.from(grupos.values()).sort((a, b) => b.dataLocal.localeCompare(a.dataLocal) || Number(a.matricula) - Number(b.matricula));
    return lista.filter(g => {
      const par = (ESTADO.auditoriasIdentidade || {})[g.chave];
      const st = par ? par.status : 'AGUARDANDO';
      return !fltSt || st === fltSt;
    });
  }

  function resumoAnaliseAutomaticaTurno(g) {
    const fotoOf = g.ag?.fotoPerfil || '';
    const pts = [g.ent, g.sai, ...g.outros].filter(Boolean);
    const avisos = [];
    if (!fotoOf) avisos.push('Sem Foto Oficial cadastrada');
    pts.forEach(p => {
      if (p.conferenciaVisual && !p.conferenciaVisual.qualidadeOk) {
        avisos.push(`${TIPO_PONTO_LABEL[p.tipo] || p.tipo}: ${p.conferenciaVisual.qualidadeMsg}`);
      }
      if (p.conferenciaVisual && typeof p.conferenciaVisual.indiceVisual === 'number' && p.conferenciaVisual.indiceVisual < 45) {
        avisos.push(`${TIPO_PONTO_LABEL[p.tipo] || p.tipo}: baixa similaridade visual (${p.conferenciaVisual.indiceVisual}%)`);
      }
    });
    if (!avisos.length) return { cls: 'badge-ok', txt: 'Fotos nítidas — Conferir visualmente' };
    return { cls: 'badge-pendente', txt: avisos.join(' · ') };
  }

  function renderAuditoriaIdentidade() {
    if (!podeEditarEscala()) return;
    if ($('fltIdMes') && !$('fltIdMes').value) $('fltIdMes').value = mesAtualISO();
    const turnos = obterTurnosParaAuditoriaIdentidade();
    const tbody = $('tbodyAuditoriaIdentidade');
    if (!tbody) return;
    if (!turnos.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="subtexto" style="text-align:center;padding:16px;">Nenhum turno com foto encontrado neste filtro.</td></tr>';
      return;
    }
    tbody.innerHTML = turnos.map(g => {
      const fotoOf = g.ag?.fotoPerfil || '';
      const ana = resumoAnaliseAutomaticaTurno(g);
      const par = (ESTADO.auditoriasIdentidade || {})[g.chave];
      const stPar = par ? par.status : 'AGUARDANDO';
      const parCls = stPar === 'CONFIRMADA' ? 'badge-ok' : (stPar === 'SUSPEITA' ? 'badge-erro' : 'badge-pendente');
      const parTxt = stPar === 'CONFIRMADA' ? 'Identidade Confirmada' : (stPar === 'SUSPEITA' ? `Suspeita${par.obs ? ': ' + par.obs : ''}` : 'Aguardando Conferência');
      const boxFoto = (src, rotulo, ptId) => src
        ? `<div class="foto-comp-item"><img src="${src}" ${ptId ? `data-ver-ponto-id="${esc(ptId)}"` : ''} alt="${esc(rotulo)}"><span>${esc(rotulo)}</span></div>`
        : `<div class="foto-comp-item"><div class="foto-vazia-mini">Sem foto</div><span>${esc(rotulo)}</span></div>`;

      return `
        <tr>
          <td><strong>${formatarDataBR(g.dataLocal)}</strong><div class="subtexto">Nº ${esc(g.matricula)} — ${esc(g.nome)}</div><span class="insig eq-${esc(g.equipe)}">${esc(g.equipe)}</span></td>
          <td>
            <div class="foto-comp-par">
              ${boxFoto(fotoOf, 'Foto Oficial', '')}
              ${boxFoto(g.ent?.foto || '', g.ent ? 'Ent. ' + g.ent.horaLocal.slice(0,5) : 'Entrada', g.ent?.id || '')}
              ${boxFoto(g.sai?.foto || '', g.sai ? 'Saí. ' + g.sai.horaLocal.slice(0,5) : 'Saída', g.sai?.id || '')}
            </div>
          </td>
          <td><span class="badge ${ana.cls}">${esc(ana.txt)}</span></td>
          <td><span class="badge ${parCls}">${esc(parTxt)}</span>${par?.por ? `<div class="subtexto" style="font-size:10.5px;">Por: ${esc(par.por)}</div>` : ''}</td>
          <td>
            <div class="acoes-linha">
              <button type="button" class="btn btn-primario btn-sm" data-id-ok="${esc(g.chave)}">Confirmar</button>
              <button type="button" class="btn btn-sec btn-sm" data-id-susp="${esc(g.chave)}">Suspeita</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('[data-ver-ponto-id]').forEach(img => img.addEventListener('click', () => abrirDetalhePonto(img.getAttribute('data-ver-ponto-id'))));
    tbody.querySelectorAll('[data-id-ok]').forEach(b => b.addEventListener('click', async () => {
      const k = b.getAttribute('data-id-ok');
      ESTADO.auditoriasIdentidade[k] = { status: 'CONFIRMADA', obs: '', por: SESSAO?.nome || 'Gestão', em: new Date().toISOString() };
      await salvarTudo(true); renderAuditoriaIdentidade(); toast('Identidade confirmada.');
    }));
    tbody.querySelectorAll('[data-id-susp]').forEach(b => b.addEventListener('click', () => {
      const k = b.getAttribute('data-id-susp');
      abrirModal('Sinalizar Suspeita / Divergência de Identidade',
        `<div class="campo"><label>Observação da Gestão (ex.: rosto divergente da foto oficial, câmera tampada)</label><textarea id="mIdSuspObs" rows="3" placeholder="Descreva a divergência encontrada..."></textarea></div>`,
        [
          { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
          { texto: 'Registrar Suspeita', classe: 'btn-perigo', onClick: async () => {
            ESTADO.auditoriasIdentidade[k] = { status: 'SUSPEITA', obs: $('mIdSuspObs').value.trim() || 'Divergência visual', por: SESSAO?.nome || 'Gestão', em: new Date().toISOString() };
            await salvarTudo(); fecharModal(); renderAuditoriaIdentidade();
          }}
        ]
      );
    }));
  }

  function gerarPdfAuditoriaIdentidade() {
    if (!podeEditarEscala()) return toast('Exclusivo Administrador ou Escalante.');
    const turnos = obterTurnosParaAuditoriaIdentidade();
    const mes = $('fltIdMes')?.value || 'Todos';
    const imgTd = (src) => src ? `<img src="${src}" style="width:52px;height:52px;object-fit:cover;border:1px solid #333;display:block;">` : '<span style="font-size:8px;color:#666;">Sem foto</span>';
    const rows = turnos.map(g => {
      const fotoOf = g.ag?.fotoPerfil || '';
      const ana = resumoAnaliseAutomaticaTurno(g);
      const par = (ESTADO.auditoriasIdentidade || {})[g.chave];
      const stPar = par ? (par.status === 'CONFIRMADA' ? 'IDENTIDADE CONFIRMADA' : 'SUSPEITA: ' + (par.obs || 'Divergência')) : 'AGUARDANDO CONFERÊNCIA';
      const corSt = par?.status === 'CONFIRMADA' ? 'background:#E7F4EC;color:#166534;border:1px solid #166534;' : (par?.status === 'SUSPEITA' ? 'background:#F9E6E6;color:#991B1B;border:1px solid #991B1B;' : 'background:#FFEDD5;color:#C2410C;border:1px solid #EA580C;');
      return `
        <tr>
          <td style="width:18%;"><strong>${formatarDataBR(g.dataLocal)}</strong><br>Nº ${esc(g.matricula)} — ${esc(g.nome)}<br><small>Equipe ${esc(g.equipe)}</small></td>
          <td style="width:11%;">${imgTd(fotoOf)}</td>
          <td style="width:14%;">${imgTd(g.ent?.foto || '')}<small>${g.ent ? g.ent.horaLocal.slice(0,5) : '—'}</small></td>
          <td style="width:14%;">${imgTd(g.sai?.foto || '')}<small>${g.sai ? g.sai.horaLocal.slice(0,5) : '—'}</small></td>
          <td style="width:21%;">${esc(ana.txt)}<br><small>${g.ent?.localizacao?.endereco ? 'Local: ' + esc(g.ent.localizacao.endereco) : ''}</small></td>
          <td style="width:22%;"><span style="display:inline-block;padding:2px 5px;font-weight:700;font-size:8px;border-radius:3px;${corSt}">${esc(stPar)}</span>${par?.por ? `<br><small>Conferido por: ${esc(par.por)}</small>` : ''}</td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="6" style="text-align:center;">Nenhum turno encontrado para conferência.</td></tr>';

    const corpo = `
      <table>
        <thead><tr><th style="width:18%;">Data / Guarda</th><th style="width:11%;">Foto Oficial</th><th style="width:14%;">Foto Entrada</th><th style="width:14%;">Foto Saída</th><th style="width:21%;">Análise e Local</th><th style="width:22%;">Parecer Oficial</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    emitirPdfAutenticado({
      tipoDoc: 'AUDITORIA_IDENTIDADE',
      titulo: 'RELATÓRIO DE CONFERÊNCIA DE IDENTIDADE PÓS-TURNO',
      subtitulo: `Competência: ${mes} · Comparação Foto Oficial × Entrada × Saída · Total: ${turnos.length} turno(s)`,
      corpoHtml: corpo,
      nomeArquivo: `auditoria-identidade-gcm-${mes}.pdf`,
      paisagem: true,
      qtdRegistros: turnos.length
    });
  }

  function renderTelaAutenticacao() {
    const docs = ESTADO.documentosAutenticados || [];
    $('badgeQtdDocsAut').textContent = `${docs.length} documento(s)`;
    $('tbodyDocsAutenticados').innerHTML = docs.slice(0, 60).map(d => `
      <tr>
        <td><code><strong>${esc(d.codigo)}</strong></code></td>
        <td><strong>${esc(d.titulo)}</strong><div class="subtexto">${esc(d.tipoDoc)} (${d.qtdRegistros} reg.)</div></td>
        <td>${esc(d.emitidoBR)}</td>
        <td>${esc(d.emissor)}</td>
        <td><code style="font-size:10.5px;">${esc(d.hashSha256.slice(0, 22))}...</code></td>
      </tr>
    `).join('') || '<tr><td colspan="5" class="subtexto" style="text-align:center;padding:16px;">Nenhum PDF autenticado emitido ainda.</td></tr>';
    renderAuditoriaIdentidade();
  }

  function validarCodigoDocumentoOuPonto() {
    const raw = ($('inpCodigoValidar').value || '').trim().toUpperCase();
    const box = $('resultadoValidacao');
    box.classList.remove('oculto');
    if (!raw) { box.innerHTML = '<div class="selo-card invalido"><strong>Informe um código de autenticação ou protocolo.</strong></div>'; return; }

    // 1. Busca em Documentos PDF Autenticados
    const doc = (ESTADO.documentosAutenticados || []).find(d => d.codigo.toUpperCase() === raw || d.hashSha256.toUpperCase().startsWith(raw));
    if (doc) {
      box.innerHTML = `
        <div class="selo-card">
          <div><span class="badge badge-ok">DOCUMENTO PDF AUTÊNTICO</span></div>
          <div><strong>Código:</strong> <code>${esc(doc.codigo)}</code></div>
          <div><strong>Documento:</strong> ${esc(doc.titulo)} (${esc(doc.tipoDoc)})</div>
          <div><strong>Emitido em:</strong> ${esc(doc.emitidoBR)} · <strong>Por:</strong> ${esc(doc.emissor)}</div>
          <div><strong>Hash SHA-256:</strong><div class="hash-mono mt-4">${esc(doc.hashSha256)}</div></div>
        </div>
      `;
      return;
    }

    // 2. Busca em Protocolos de Folha de Ponto + recalcula o SHA-256 real para provar integridade!
    const pt = (ESTADO.pontos || []).find(p => (p.protocolo || '').toUpperCase() === raw || (p.hashIntegridade || '').toUpperCase().startsWith(raw));
    if (pt) {
      const hashRecalculado = calcularHashPonto(pt, pt.hashAnterior);
      const integro = hashRecalculado === pt.hashIntegridade;
      box.innerHTML = `
        <div class="selo-card ${integro ? '' : 'invalido'}">
          <div><span class="badge ${integro ? 'badge-ok' : 'badge-erro'}">${integro ? 'PONTO AUTÊNTICO E ÍNTEGRO (NÃO ADULTERADO)' : 'ALERTA: ADULTERAÇÃO DETECTADA NO REGISTRO!'}</span></div>
          <div><strong>Protocolo:</strong> <code>${esc(pt.protocolo)}</code></div>
          <div><strong>Guarda:</strong> Nº ${esc(pt.agenteMatricula)} — ${esc(pt.agenteNome)}</div>
          <div><strong>Batida:</strong> ${esc(TIPO_PONTO_LABEL[pt.tipo] || pt.tipo)} · ${formatarDataBR(pt.dataLocal)} às ${esc(pt.horaLocal)}</div>
          <div><strong>Localização:</strong> ${esc(pt.localizacao?.endereco || '—')}</div>
          <div><strong>Hash Gravado:</strong><div class="hash-mono mt-4">${esc(pt.hashIntegridade)}</div></div>
        </div>
      `;
      return;
    }

    box.innerHTML = `<div class="selo-card invalido"><div><span class="badge badge-erro">NÃO ENCONTRADO</span></div><div>O código <code>${esc(raw)}</code> não consta no Livro de Documentos Autenticados nem nos protocolos de ponto deste banco de dados.</div></div>`;
  }

  function auditarCadeiaCompletaPontos() {
    const pts = (ESTADO.pontos || []).slice().reverse(); // do mais antigo para o mais novo
    const box = $('resultadoAuditoriaCadeia');
    if (!pts.length) {
      box.innerHTML = '<div class="selo-card"><div><span class="badge badge-ok">CADEIA LIMPA</span></div><div>Nenhuma batida de ponto registrada ainda.</div></div>';
      return;
    }
    let prev = 'GENESIS_GCM_OFICIAL';
    const violacoes = [];
    pts.forEach((pt, idx) => {
      const esperado = calcularHashPonto(pt, prev);
      if (pt.hashIntegridade !== esperado || pt.hashAnterior !== prev) {
        violacoes.push(`#${idx + 1} (${pt.protocolo || pt.id} — Nº ${pt.agenteMatricula} em ${formatarDataBR(pt.dataLocal)})`);
      }
      prev = pt.hashIntegridade;
    });
    if (!violacoes.length) {
      box.innerHTML = `
        <div class="selo-card">
          <div><span class="badge badge-ok">100% ÍNTEGRO — ZERO ADULTERAÇÃO</span></div>
          <div>Todos os <strong>${pts.length} registro(s)</strong> da Folha de Ponto passaram na verificação matemática SHA-256 em cadeia.</div>
          <div class="subtexto">Auditado em ${formatarDataHoraBR(new Date().toISOString())}</div>
        </div>
      `;
      toast('Auditoria concluída: Folha de Ponto 100% íntegra!');
    } else {
      box.innerHTML = `
        <div class="selo-card invalido">
          <div><span class="badge badge-erro">QUEBRA DE INTEGRIDADE DETECTADA (${violacoes.length})</span></div>
          <div>Registros alterados ou excluídos manualmente fora da sequência: ${esc(violacoes.join(' | '))}</div>
        </div>
      `;
    }
  }

  // =========================================================================
  // 7. EVENTOS, EFETIVO E SISTEMA (ADMIN ONLY)
  // =========================================================================
  function statusAgenteNaData(ag, dataISO) {
    if (!ag) return ''; if (ag.equipe==='ADM') return 'ADM'; if (ag.equipe==='12X36') return '12x36';
    const st = calcularCiclo24x72(dataISO).mapa[ag.equipe];
    return !st ? ag.equipe : (st.codigo==='SERVICO'?'EM SERVIÇO 24h':(st.codigo==='FOLGA_1'?'1ª Folga — Evitar':(st.codigo==='FOLGA_2'?'2ª Folga — IDEAL':'3ª Folga')));
  }
  function renderListaEventos() {
    const lista = ESTADO.eventos || []; $('badgeQtdEventos').textContent = lista.length;
    if (!lista.length) { $('listaEventosSidebar').innerHTML = '<div class="subtexto">Nenhum evento.</div>'; $('vazioEvento').classList.remove('oculto'); $('conteudoEditorEvento').classList.add('oculto'); return; }
    if (!eventoSelecionadoId || !lista.some(e => e.id === eventoSelecionadoId)) eventoSelecionadoId = lista[0].id;
    $('listaEventosSidebar').innerHTML = lista.map(ev => `<div class="item-compacto clicavel ${ev.id===eventoSelecionadoId?'selecionado':''}" data-sel-ev="${esc(ev.id)}"><div><strong>${esc(ev.nome)}</strong><div class="subtexto">${formatarDataBR(ev.data)} · ${esc(ev.inicio)}–${esc(ev.fim)}</div></div><span class="badge badge-neutro">${(ev.viaturas||[]).length} VTR</span></div>`).join('');
    $('listaEventosSidebar').querySelectorAll('[data-sel-ev]').forEach(el => el.addEventListener('click', () => { eventoSelecionadoId = el.getAttribute('data-sel-ev'); renderListaEventos(); }));
    carregarEditorEvento();
  }
  function atualizarDicaFolgaEvento(dataISO) {
    if (!dataISO) return;
    const c = calcularCiclo24x72(dataISO), ideal = EQUIPES.find(eq => c.mapa[eq].codigo === 'FOLGA_2') || '—';
    $('boxDicaFolgaEvento').innerHTML = `<strong>Folgas em ${formatarDataBR(dataISO)}:</strong> Serviço 24h: <span class="insig eq-${c.equipeServico}">${c.equipeServico}</span> · Ideal p/ convocação extra (2ª Folga 48h): <span class="insig eq-${ideal}">${ideal}</span>.`;
  }
  function carregarEditorEvento() {
    const ev = (ESTADO.eventos||[]).find(x => x.id === eventoSelecionadoId);
    if (!ev) { $('vazioEvento').classList.remove('oculto'); $('conteudoEditorEvento').classList.add('oculto'); return; }
    $('vazioEvento').classList.add('oculto'); $('conteudoEditorEvento').classList.remove('oculto');
    $('tituloEditorEvento').textContent = `Evento: ${ev.nome}`;
    $('inpEvNome').value = ev.nome||''; $('inpEvLocal').value = ev.local||''; $('inpEvData').value = ev.data||hojeISO();
    $('inpEvInicio').value = ev.inicio||'16:00'; $('inpEvFim').value = ev.fim||'23:00'; $('selEvRegime').value = ev.regime||'HORA_EXTRA';
    $('inpEvCoord').value = ev.coordenador||''; $('inpEvMissao').value = ev.missao||''; $('inpEvObs').value = ev.obs||'';
    atualizarDicaFolgaEvento($('inpEvData').value); renderViaturasEvento(ev.viaturas||[], $('inpEvData').value);
    aplicarPermissoesVisuais();
  }
  function renderViaturasEvento(viaturas, dataISO) {
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO'), desab = podeEditarEscala() ? '' : 'disabled';
    const peso = (a) => a.equipe==='ADM' ? 2 : ({ FOLGA_2:1, FOLGA_3:4, FOLGA_1:5, SERVICO:6 }[calcularCiclo24x72(dataISO).mapa[a.equipe]?.codigo] || 3);
    const ord = [...ativos].sort((a,b) => peso(a) - peso(b) || Number(a.matricula) - Number(b.matricula));
    const opts = (sel) => '<option value="">— Vago —</option>' + ord.map(a => `<option value="${esc(a.id)}" ${a.id===sel?'selected':''}>[${esc(a.matricula)}] ${esc(a.nomeGuerra)} · ${esc(a.equipe)} (${esc(statusAgenteNaData(a, dataISO))})</option>`).join('');
    $('gridViaturasEvento').innerHTML = (viaturas||[]).map((v, idx) => `<div class="posto-card" data-evv-idx="${idx}"><div class="card-cab"><strong>Viatura Extra #${idx+1}</strong>${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-del-evv="${idx}">Remover</button>`:''}</div><div class="grid-2"><div class="campo"><label>Prefixo</label><input type="text" class="evv-pref" value="${esc(v.prefixo||'')}" ${desab}></div><div class="campo"><label>Setor no Evento</label><input type="text" class="evv-setor" value="${esc(v.setor||'')}" ${desab}></div></div><div class="grid-2"><div class="campo"><label>01 — Comandante</label><select class="evv-g01" ${desab}>${opts(v.g01)}</select></div><div class="campo"><label>02 — Motorista</label><select class="evv-g02" ${desab}>${opts(v.g02)}</select></div></div><div class="grid-2"><div class="campo"><label>03 — Patrulheiro</label><select class="evv-g03" ${desab}>${opts(v.g03)}</select></div><div class="campo"><label>04 — Apoio</label><select class="evv-g04" ${desab}>${opts(v.g04)}</select></div></div></div>`).join('');
    $('gridViaturasEvento').querySelectorAll('[data-del-evv]').forEach(btn => btn.addEventListener('click', () => { const cur = lerEventoDoEditor(); cur.viaturas.splice(Number(btn.getAttribute('data-del-evv')), 1); renderViaturasEvento(cur.viaturas, cur.data); }));
  }
  function lerEventoDoEditor() {
    const viaturas = [];
    $('gridViaturasEvento').querySelectorAll('.posto-card').forEach((card, i) => viaturas.push({ id:'evv_'+i, prefixo:card.querySelector('.evv-pref').value.trim()||`VTR-EVENTO 0${i+1}`, setor:card.querySelector('.evv-setor').value.trim(), g01:card.querySelector('.evv-g01').value, g02:card.querySelector('.evv-g02').value, g03:card.querySelector('.evv-g03').value, g04:card.querySelector('.evv-g04').value }));
    return { id:eventoSelecionadoId, nome:$('inpEvNome').value.trim()||'Evento', local:$('inpEvLocal').value.trim(), data:$('inpEvData').value||hojeISO(), inicio:$('inpEvInicio').value||'16:00', fim:$('inpEvFim').value||'23:00', regime:$('selEvRegime').value, coordenador:$('inpEvCoord').value.trim(), missao:$('inpEvMissao').value.trim(), obs:$('inpEvObs').value.trim(), viaturas };
  }
  function copiarWhatsAppEvento() {
    const ev = lerEventoDoEditor();
    const ls = [`*GCM VALPARAÍSO — ESCALA DE EVENTO*`, `Evento: *${ev.nome}*`, `Data: *${formatarDataBR(ev.data)}* (${ev.inicio}–${ev.fim})`, `Local: ${ev.local}`, `Coordenador: ${ev.coordenador||'A definir'}`, `--------------------------------`];
    (ev.viaturas||[]).forEach(v => { ls.push(`*${v.prefixo}* — ${v.setor}`); ls.push([v.g01&&`01: ${nomeAgentePorId(v.g01)}`, v.g02&&`02: ${nomeAgentePorId(v.g02)}`, v.g03&&`03: ${nomeAgentePorId(v.g03)}`, v.g04&&`04: ${nomeAgentePorId(v.g04)}`].filter(Boolean).join(' | ')||'A definir'); ls.push(''); });
    const txt = ls.join('\n');
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(() => toast('Evento copiado!'));
    else abrirModal('WhatsApp', `<textarea rows="11" style="width:100%;font-family:monospace;">${esc(txt)}</textarea>`, [{ texto:'Fechar', onClick:fecharModal }]);
  }

  function renderEfetivo() {
    const busca = ($('fltEfBusca').value||'').trim().toLowerCase(), eq = $('fltEfEquipe').value||'', area = $('fltEfArea').value||'';
    const lista = ESTADO.efetivo.filter(a => (!eq||a.equipe===eq) && (!area||a.area===area) && (!busca || a.nome.toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca) || (a.nomeGuerra||'').toLowerCase().includes(busca)));
    $('tbodyEfetivo').innerHTML = lista.map(a => `<tr><td><strong>${esc(a.matricula)}</strong></td><td><strong>${esc(a.nome)}</strong></td><td>${esc(a.nomeGuerra||'—')}</td><td><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span></td><td>${esc(AREAS_LABEL[a.area]||a.area)}</td><td>${esc(FUNCOES_LABEL[a.funcao]||a.funcao)}</td><td>${(() => { const afH = obterAfastamentoNaData(a.id, hojeISO()); if (afH) return `<span class="badge ${afH.tipo==='FALTA'?'badge-erro':'badge-warn'}">${esc(TIPO_AFASTAMENTO_LABEL[afH.tipo]||afH.tipo)} (${afH.dias}d · Ret. ${formatarDataBR(afH.dataRetorno).slice(0,5)})</span>`; return `<span class="badge ${a.situacao==='ATIVO'?'badge-ok':'badge-warn'}">${esc(a.situacao)}</span>`; })()}</td><td class="so-gestao">${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-ed-ag="${esc(a.id)}">Editar</button> <button type="button" class="btn btn-sec btn-sm" data-del-ag="${esc(a.id)}">X</button>`:'—'}</td></tr>`).join('');
    $('tbodyEfetivo').querySelectorAll('[data-ed-ag]').forEach(b => b.addEventListener('click', () => abrirModalAgente(agentePorId(b.getAttribute('data-ed-ag')))));
    $('tbodyEfetivo').querySelectorAll('[data-del-ag]').forEach(b => b.addEventListener('click', async () => { if (!confirm('Remover guarda?')) return; ESTADO.efetivo = ESTADO.efetivo.filter(x => x.id !== b.getAttribute('data-del-ag')); await salvarTudo(); atualizarTodasVistas(); }));
  }

  function abrirModalAgente(agente) {
    const a = agente || { id:'', matricula:'', nome:'', nomeGuerra:'', sexo:'M', telefone:'', equipe:'ALFA', area:'PATRULHAMENTO', funcao:'PATRULHEIRO_03', regime:'24X72', situacao:'ATIVO' };
    abrirModal(agente ? 'Editar Guarda GCM' : 'Novo Guarda GCM',
      `<div class="grid-2"><div class="campo"><label>Nome Completo</label><input type="text" id="mAgNome" value="${esc(a.nome)}"></div><div class="campo"><label>Nome de Guerra</label><input type="text" id="mAgGuerra" value="${esc(a.nomeGuerra||'')}"></div></div>
       <div class="grid-2"><div class="campo"><label>Nº Provisório / Matrícula</label><input type="text" id="mAgMat" value="${esc(a.matricula)}" placeholder="Ex.: 03"></div><div class="campo"><label>Telefone</label><input type="text" id="mAgTel" value="${esc(a.telefone||'')}"></div></div>
       <div class="grid-2"><div class="campo"><label>Equipe</label><select id="mAgEquipe">${['ALFA','BRAVO','CHARLIE','DELTA','ADM','12X36'].map(e => `<option value="${e}" ${a.equipe===e?'selected':''}>${e}</option>`).join('')}</select></div>
       <div class="campo"><label>Especialidade</label><select id="mAgArea">${Object.entries(AREAS_LABEL).map(([k,v]) => `<option value="${k}" ${a.area===k?'selected':''}>${v}</option>`).join('')}</select></div></div>
       <div class="grid-2"><div class="campo"><label>Função</label><select id="mAgFuncao">${Object.entries(FUNCOES_LABEL).map(([k,v]) => `<option value="${k}" ${a.funcao===k?'selected':''}>${v}</option>`).join('')}</select></div>
       <div class="campo"><label>Situação</label><select id="mAgSit">${['ATIVO','FERIAS','LICENCA','AFASTADO'].map(s => `<option value="${s}" ${a.situacao===s?'selected':''}>${s}</option>`).join('')}</select></div></div>`,
      [{ texto:'Cancelar', classe:'btn-sec', onClick:fecharModal }, { texto:'Salvar', classe:'btn-primario', onClick: async () => {
        const nome = $('mAgNome').value.trim(); if (!nome) return toast('Informe o nome.');
        const eqSel = $('mAgEquipe').value;
        const obj = { id: a.id || 'ag_' + Date.now().toString(36), matricula: $('mAgMat').value.trim().toUpperCase() || String(ESTADO.efetivo.length+1).padStart(2,'0'), nome, nomeGuerra: $('mAgGuerra').value.trim() || gerarNomeGuerra(nome), sexo: a.sexo||'M', telefone: $('mAgTel').value.trim(), equipe: eqSel, area: $('mAgArea').value, funcao: $('mAgFuncao').value, regime: eqSel==='ADM'?'ADM_SEG_SEX':(eqSel==='12X36'?'12X36':'24X72'), situacao: $('mAgSit').value };
        if (agente) { const i = ESTADO.efetivo.findIndex(x => x.id === a.id); if (i >= 0) ESTADO.efetivo[i] = obj; } else ESTADO.efetivo.push(obj);
        await salvarTudo(); fecharModal(); atualizarTodasVistas();
      }}]
    );
  }

  function abrirModalImportar64() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    abrirModal('Importar Nomes', `<p class="subtexto">Cole 1 nome por linha (ou <code>Nome ; Nº ; Equipe</code>).</p><textarea id="txtImportarNomes" rows="9"></textarea><label class="check-linha"><input type="checkbox" id="chkSubstituirModelo"><span>Substituir lista atual</span></label>`, [
      { texto:'Cancelar', classe:'btn-sec', onClick:fecharModal },
      { texto:'Importar', classe:'btn-primario', onClick: async () => {
        const ls = ($('txtImportarNomes').value||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean); if (!ls.length) return toast('Cole nomes.');
        const novos = ls.map((l,i) => { const p = l.split(/[;|\t]/).map(x=>x.trim()); return { id:'ag_i_'+Date.now().toString(36)+'_'+i, matricula:(p[1]||String(ESTADO.efetivo.length+i+1).padStart(2,'0')).toUpperCase(), nome:p[0], nomeGuerra:gerarNomeGuerra(p[0]), sexo:'M', telefone:'', equipe:p[2]||EQUIPES[i%4], area:'PATRULHAMENTO', funcao:'PATRULHEIRO_03', regime:'24X72', situacao:'ATIVO' }; });
        ESTADO.efetivo = $('chkSubstituirModelo').checked ? novos : ESTADO.efetivo.concat(novos);
        await salvarTudo(); fecharModal(); atualizarTodasVistas(); toast(`${novos.length} importado(s)!`);
      }}
    ]);
  }

  function gerarSenhaTemporariaAmigavel() {
    const num = String(Math.floor(1000 + Math.random() * 9000));
    return `Gcm@${num}`;
  }

  function abrirModalRedefinirSenhaAdmin(u) {
    if (!isAdmin() || !u) return;
    const sugestao = gerarSenhaTemporariaAmigavel();
    abrirModal(
      `Redefinir Senha — ${u.nome} (${u.login})`,
      `
        <div class="regra-box">
          <strong>Segurança:</strong> A senha atual deste usuário é criptografada (SHA-256) e <strong>não pode ser visualizada</strong>. Ao confirmar abaixo, o sistema define uma nova senha temporária sem excluir nem alterar nenhum dado do cadastro.
        </div>
        <div class="campo mt-8">
          <label for="mAdminTempPass">Nova Senha Temporária (mín. 6 caracteres — letras, números ou frase)</label>
          <div class="senha-input-wrap">
            <input type="text" id="mAdminTempPass" value="${esc(sugestao)}" minlength="6" placeholder="Digite ou gere uma senha temporária">
            <button type="button" class="btn btn-sec btn-sm" id="btnGerarTempAdmin">Gerar</button>
            <button type="button" class="btn btn-sec btn-sm" id="btnCopiarTempAdmin">Copiar</button>
          </div>
        </div>
        <label class="check-linha mt-8">
          <input type="checkbox" id="chkExigirTrocaTemp" checked>
          <span>Exigir que o usuário crie uma nova senha pessoal assim que entrar</span>
        </label>
        <div id="msgResetAdminErro" class="alerta-inline erro oculto mt-8"></div>
      `,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Confirmar Redefinição de Senha', classe: 'btn-primario', onClick: () => {
          const temp = ($('mAdminTempPass').value || '').trim();
          const exigir = $('chkExigirTrocaTemp').checked;
          const r = window.EscalaCloud.redefinirSenhaPorAdmin(u.login, temp, exigir);
          if (!r.ok) {
            $('msgResetAdminErro').textContent = r.erro;
            $('msgResetAdminErro').classList.remove('oculto');
            return;
          }
          salvarTudo(true);
          fecharModal();
          renderContas();
          renderBannerCadastrosAdmin();
          toast(`Senha temporária definida para ${u.nome}. Repasse ao guarda com segurança.`);
        }}
      ]
    );
    $('btnGerarTempAdmin').addEventListener('click', () => { $('mAdminTempPass').value = gerarSenhaTemporariaAmigavel(); });
    $('btnCopiarTempAdmin').addEventListener('click', () => {
      const val = $('mAdminTempPass').value;
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(`Login: ${u.login} | Senha temporária: ${val}`).then(() => toast('Dados copiados!'));
    });
  }

  function renderContas() {
    if (!isAdmin()) return;
    const users = window.EscalaCloud.lerUsuariosLocal();
    $('tbodyContas').innerHTML = users.map(u => {
      const conf = u.mestre ? { constaNoRol: true, agente: null } : verificarNomeNoRolOficial(u.nome);
      const badgeConf = u.mestre
        ? '<span class="badge badge-neutro">Conta Sistema</span>'
        : (conf.constaNoRol
            ? `<span class="badge badge-ok">Consta no Rol (PDF)</span>${conf.agente ? `<div class="subtexto" style="font-size:11px;">Vinculado pelo nome · Equipe ${esc(conf.agente.equipe)}</div>` : ''}`
            : `<span class="badge badge-erro">NÃO CONSTA NA LISTA (PDF)</span><div style="font-size:11px;color:var(--danger);font-weight:700;margin-top:2px;">ALERTA: Nome não encontrado nos 64 guardas!</div>`);
      const emailTxt = u.email ? `${esc(u.email)} (${u.tipoEmail === 'INSTITUCIONAL' ? 'Institucional' : 'Pessoal'})` : 'E-mail não informado';
      const badgeReset = u.solicitouResetEm ? '<div class="mt-4"><span class="badge badge-erro">Pediu Nova Senha</span></div>' : (u.trocarSenhaObrigatoria ? '<div class="mt-4"><span class="badge badge-pendente">Senha Temporária Ativa</span></div>' : '');
      const rowCls = (!u.mestre && !conf.constaNoRol) ? 'row-alerta-nome' : '';
      return `
        <tr class="${rowCls}">
          <td><strong>${esc(u.login)}</strong> ${u.mestre?'<span class="badge badge-invertido">Mestre</span>':''}</td>
          <td><strong>${esc(u.nome)}</strong><div class="subtexto" style="font-size:11px;">${emailTxt}</div></td>
          <td>${badgeConf}</td>
          <td>${esc(u.matricula || (conf.agente ? conf.agente.matricula : '—'))}</td>
          <td>${!u.mestre ? `<select data-perfil-u="${esc(u.login)}"><option value="ADMIN" ${u.perfil==='ADMIN'?'selected':''}>Administrador</option><option value="ESCALANTE" ${u.perfil==='ESCALANTE'?'selected':''}>Escalante</option><option value="AGENTE" ${u.perfil==='AGENTE'?'selected':''}>Agente (Consulta e Ponto)</option></select>` : `<span class="badge badge-neutro">ADMIN</span>`}</td>
          <td><span class="badge ${u.aprovado?'badge-ok':'badge-pendente'}">${u.aprovado?'Ativo':'Bloqueado/Pend.'}</span>${badgeReset}</td>
          <td>
            ${!u.mestre ? `<div class="acoes-linha"><button type="button" class="btn btn-sec btn-sm" data-aprovar-u="${esc(u.login)}">${u.aprovado?'Bloquear':'Aprovar'}</button><button type="button" class="btn btn-acao-destaque btn-sm" data-reset-u="${esc(u.login)}">Redefinir Senha</button><button type="button" class="btn btn-perigo btn-sm" data-excluir-u="${esc(u.login)}">Excluir</button></div>` : '<span class="subtexto">Gerencie em Configurações do Usuário</span>'}
          </td>
        </tr>
      `;
    }).join('');
    $('tbodyContas').querySelectorAll('[data-perfil-u]').forEach(s => s.addEventListener('change', () => { window.EscalaCloud.atualizarUsuario(s.getAttribute('data-perfil-u'), { perfil: s.value }); salvarTudo(true); toast('Nível de acesso atualizado.'); }));
    $('tbodyContas').querySelectorAll('[data-aprovar-u]').forEach(b => b.addEventListener('click', () => {
      const l = b.getAttribute('data-aprovar-u'), u = window.EscalaCloud.lerUsuariosLocal().find(x => x.login === l);
      if (!u) return;
      const conf = verificarNomeNoRolOficial(u.nome);
      if (!u.aprovado && !conf.constaNoRol) {
        if (!confirm(`ATENÇÃO ADMINISTRADOR:\n\nO nome "${u.nome}" NÃO consta na lista oficial dos 64 guardas (PDF).\n\nTem certeza que deseja APROVAR esta conta mesmo assim?`)) return;
      }
      window.EscalaCloud.atualizarUsuario(l, { aprovado: !u.aprovado, constaNoRolOficial: conf.constaNoRol, agenteVinculadoId: conf.agente ? conf.agente.id : '' });
      renderContas(); renderBannerCadastrosAdmin(); salvarTudo(true);
    }));
    $('tbodyContas').querySelectorAll('[data-reset-u]').forEach(b => b.addEventListener('click', () => {
      const u = window.EscalaCloud.obterUsuarioPorLogin(b.getAttribute('data-reset-u'));
      if (u) abrirModalRedefinirSenhaAdmin(u);
    }));
    $('tbodyContas').querySelectorAll('[data-excluir-u]').forEach(b => b.addEventListener('click', () => {
      if (!isAdmin()) return;
      const loginAlvo = b.getAttribute('data-excluir-u');
      const u = window.EscalaCloud.obterUsuarioPorLogin(loginAlvo);
      if (!u) return;
      if (!confirm(`CONFIRMAR EXCLUSÃO DE USUÁRIO\n\nDeseja realmente EXCLUIR a conta de acesso de:\n${u.nome} (login: ${u.login})?\n\n• Use esta opção quando o integrante sair da Guarda.\n• Os registros históricos de Folha de Ponto já assinados permanecem intactos na auditoria SHA-256.`)) return;
      const r = window.EscalaCloud.removerUsuario(loginAlvo);
      if (!r.ok) return toast(r.erro);
      renderContas(); renderBannerCadastrosAdmin(); salvarTudo(true);
      toast(`Conta de ${u.nome} excluída com sucesso.`);
    }));
  }

  function renderConfigBase() {
    if (!isAdmin()) return;
    $('inpBaseNome').value = ESTADO.config.baseNome||''; $('inpBaseLat').value = ESTADO.config.baseLat ?? -16.0658;
    $('inpBaseLon').value = ESTADO.config.baseLon ?? -47.9756; $('inpBaseRaio').value = ESTADO.config.baseRaioMetros ?? 500;
    $('chkNuvemAtiva').checked = !!ESTADO.config.nuvemAtiva;
    const fb = window.EscalaCloud.lerConfigFirebase();
    $('txtFirebaseConfigJson').value = fb ? JSON.stringify(fb, null, 2) : '';
    $('statusDbProprio').textContent = fb ? `Conectado ao projeto "${fb.projectId}" · Sincronização: ${ESTADO.config.nuvemAtiva ? 'ATIVA' : 'Pausada'}` : 'Modo Local (sem Firebase configurado).';
  }

  // =========================================================================
  // MOTOR DE PDFs SEM CORTE + AUTENTICACAO VERIDICA (SHA-256 EM TODOS!)
  // =========================================================================
  function cabecalhoPdfHtml(titulo, subtitulo) {
    return `<div class="pdf-cab"><img src="__LOGO__" class="pdf-logo" onerror="this.style.display='none'"><div><div class="pdf-org">PREFEITURA MUNICIPAL DE VALPARAÍSO DE GOIÁS — GUARDA CIVIL MUNICIPAL</div><h1>${esc(titulo)}</h1><div class="pdf-sub">${esc(subtitulo)}</div></div></div>`;
  }
  function rodapeAssinaturasPdfHtml() {
    const r = ESTADO.config.responsaveis || {};
    return `<div class="pdf-assinaturas"><div class="ass-col"><div class="ass-espaco"></div><div class="ass-linha"></div><strong>${esc(r.escalanteNome || 'Responsável pela Escala')}</strong><div>${esc(r.escalanteCargo || 'Escalante GCM')} · Mat.: ${esc(r.escalanteMat || '—')}</div></div><div class="ass-col"><div class="ass-espaco"></div><div class="ass-linha"></div><strong>${esc(r.comandoNome || 'Comandante da GCM')}</strong><div>${esc(r.comandoCargo || 'Comandante GCM')} · ${esc(r.comandoMat || '—')}</div></div></div>`;
  }

  async function emitirPdfAutenticado({ tipoDoc, titulo, subtitulo, corpoHtml, nomeArquivo, paisagem, qtdRegistros, incluirAssinaturas }) {
    const cert = registrarDocumentoAutenticado(tipoDoc, titulo, corpoHtml, qtdRegistros);
    const blocoAssinaturas = incluirAssinaturas !== false ? rodapeAssinaturasPdfHtml() : '';
    const htmlCompleto = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>${esc(titulo)}</title><style>
      @page { size: A4 ${paisagem ? 'landscape' : 'portrait'}; margin: 10mm; }
      *, *::before, *::after { box-sizing: border-box; }
      html, body { width: 100%; max-width: 100%; margin: 0; padding: 0; background: #FFFFFF; color: #141414; font-family: Arial, Helvetica, sans-serif; font-size: 9.5px; line-height: 1.32; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .doc-wrap { width: 100%; padding: 0; }
      .pdf-cab { display: flex; align-items: center; gap: 10px; border-bottom: 2px solid #141414; padding-bottom: 6px; margin-bottom: 8px; }
      .pdf-logo { width: 44px; height: 44px; object-fit: contain; flex-shrink: 0; }
      .pdf-org { font-size: 8.5px; font-weight: 700; letter-spacing: 0.04em; color: #333; }
      h1 { font-size: 13.5px; margin: 2px 0; }
      h2 { font-size: 10.5px; margin: 9px 0 4px; padding: 3px 7px; background: #141414; color: #FFFFFF; letter-spacing: 0.03em; break-after: avoid; page-break-after: avoid; }
      h3 { font-size: 10px; margin: 7px 0 3px; padding: 3px 7px; border-left: 4px solid #141414; background: #EFEFED; break-after: avoid; page-break-after: avoid; }
      .pdf-sub { font-size: 9px; color: #444; }
      table { width: 100%; max-width: 100%; border-collapse: collapse; margin-top: 4px; font-size: 8.8px; table-layout: fixed; word-wrap: break-word; overflow-wrap: anywhere; }
      thead { display: table-header-group; }
      tr { break-inside: avoid; page-break-inside: avoid; }
      th, td { border: 1px solid #444; padding: 3.5px 4.5px; text-align: left; vertical-align: top; }
      th { background: #EBEBE8; font-weight: 700; text-transform: uppercase; font-size: 8px; }
      .box { border: 1px solid #333; padding: 7px; margin-bottom: 7px; break-inside: avoid; page-break-inside: avoid; }
      .grid-info { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-bottom: 5px; }
      .grid-2-pdf { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin-top: 5px; }
      .cp-topo-mapa { display: grid; grid-template-columns: 1fr 225px; gap: 8px; align-items: start; margin-bottom: 6px; }
      .insig-pdf { display: inline-block; padding: 1px 5px; font-weight: 700; font-size: 8px; background: #EFEFED; border: 1px solid #666; border-left-width: 4px; }
      .quebra { page-break-before: always; break-before: page; }
      .foto-pdf { width: 42px; height: 32px; object-fit: cover; border: 1px solid #333; display: block; }
      .pdf-assinaturas { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; margin-top: 28px; margin-bottom: 14px; break-inside: avoid; page-break-inside: avoid; }
      .ass-col { text-align: center; font-size: 9px; padding: 0 10px; }
      .ass-espaco { height: 54px; }
      .ass-linha { border-top: 1px solid #141414; margin-bottom: 5px; }
      .selo-autenticacao { margin-top: 12px; border: 1.5px solid #141414; border-left: 5px solid #166534; background: #F7F7F5; padding: 7px 9px; font-size: 8px; break-inside: avoid; page-break-inside: avoid; }
      .selo-topo { display: flex; justify-content: space-between; align-items: center; gap: 8px; border-bottom: 1px solid #CCC; padding-bottom: 3px; margin-bottom: 4px; font-size: 8.5px; }
      .selo-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-bottom: 4px; }
      .selo-hash { font-family: "Courier New", monospace; font-size: 7.5px; word-break: break-all; background: #FFFFFF; border: 1px solid #CCC; padding: 3px 5px; }
      .selo-nota { margin-top: 3px; color: #555; font-size: 7.5px; }
      .chk-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px 8px; font-size: 8.5px; margin-top: 3px; }
    </style></head><body><div class="doc-wrap">${cabecalhoPdfHtml(titulo, subtitulo)}${corpoHtml}${blocoAssinaturas}${seloAutenticacaoPdfHtml(cert)}</div></body></html>`;

    if (window.escalaAPI?.salvarRelatorioPdf) {
      const r = await window.escalaAPI.salvarRelatorioPdf(htmlCompleto, nomeArquivo, !!paisagem);
      if (r?.ok) toast(`PDF Autenticado (${cert.codigo}) salvo em: ${r.caminho}`);
      else if (r && !r.cancelado) toast('Erro PDF: ' + (r.erro || ''));
      renderTelaAutenticacao();
      return;
    }
    const win = window.open('', '_blank', 'width=980,height=760');
    if (!win) return toast('Permita pop-ups para gerar o PDF.');
    win.document.open();
    win.document.write(htmlCompleto.replace(/__LOGO__/g, 'logo.png') + '<script>window.onload=function(){setTimeout(function(){window.print();},350);};<\/script>');
    win.document.close();
    renderTelaAutenticacao();
  }

  function gerarPdfComprovantePonto(pt) {
    const loc = pt.localizacao || {}, tipoTxt = TIPO_PONTO_LABEL[pt.tipo] || pt.tipo;
    const corpo = `
      <div class="box">
        <div class="cp-topo-mapa" style="grid-template-columns:1fr 180px;">
          <div>
            <div><strong>Protocolo Único:</strong> ${esc(pt.protocolo)}</div>
            <div style="margin-top:4px;"><strong>Guarda GCM:</strong> Nº ${esc(pt.agenteMatricula)} — ${esc(pt.agenteNome)}</div>
            <div style="margin-top:4px;"><strong>Equipe / Posto:</strong> ${esc(pt.equipe)} · ${esc(pt.posto)}</div>
            <div style="margin-top:4px;"><strong>Tipo de Batida:</strong> <strong>${esc(tipoTxt)}</strong></div>
            <div style="margin-top:4px;"><strong>Data e Hora Oficial:</strong> <strong>${formatarDataBR(pt.dataLocal)} às ${esc(pt.horaLocal)}</strong></div>
            <div style="margin-top:4px;"><strong>Localização Registrada:</strong> ${esc(loc.endereco || '—')} (${esc(loc.resumoDist || '')})</div>
            <div style="margin-top:4px;"><strong>Coordenadas GPS:</strong> ${loc.lat ? loc.lat.toFixed(6) + ', ' + loc.lon.toFixed(6) : '—'}</div>
            ${pt.obs ? `<div style="margin-top:4px;"><strong>Observação:</strong> ${esc(pt.obs)}</div>` : ''}
          </div>
          <div style="text-align:center;"><img src="${pt.foto}" style="width:100%;max-width:170px;border:1px solid #333;"></div>
        </div>
        <div style="margin-top:6px;font-family:monospace;font-size:8px;word-break:break-all;border-top:1px solid #CCC;padding-top:4px;"><strong>Hash Encadeado do Registro (SHA-256):</strong> ${esc(pt.hashIntegridade)}</div>
      </div>
    `;
    emitirPdfAutenticado({ tipoDoc:'COMPROVANTE_PONTO', titulo:`COMPROVANTE INDIVIDUAL DE PONTO — ${pt.protocolo}`, subtitulo:`Nº ${pt.agenteMatricula} ${pt.agenteNome} · ${formatarDataBR(pt.dataLocal)} às ${pt.horaLocal}`, corpoHtml:corpo, nomeArquivo:`comprovante-ponto-${pt.protocolo}.pdf`, paisagem:false, qtdRegistros:1, incluirAssinaturas:false });
  }

  function gerarPdfFolhaDia() {
    if (!podeEditarEscala()) return toast('Acesso restrito ao Escalante e Administrador.');
    const data = $('inpFreqData').value || hojeISO(), { ciclo, escalados } = obterEscaladosDaData(data);
    const rows = escalados.map(item => {
      const a = item.agente, r = resumirDiaAgente(data, a.id, item.permutaSaida), st = estiloStatusPonto(r, false);
      const corPdf = r.status==='EM_SERVICO'||r.status==='PRESENTE' ? 'background:#E7F4EC;color:#166534;border:1px solid #166534;' : (r.status==='PENDENTE' ? 'background:#FFEDD5;color:#C2410C;border:1px solid #EA580C;' : (r.status==='FALTOU' ? 'background:#F9E6E6;color:#991B1B;border:1px solid #991B1B;' : 'background:#F6EFE0;color:#854D0E;border:1px solid #854D0E;'));
      return `<tr><td style="width:6%;"><strong>${esc(a.matricula)}</strong></td><td style="width:26%;"><strong>${esc(a.nome)}</strong></td><td style="width:20%;">${esc(a.equipe)} · ${esc(item.posto)}</td><td style="width:11%;">${r.ent?r.ent.horaLocal.slice(0,5):'—'}</td><td style="width:12%;">${formatarHoraSaidaTurno(r)}</td><td style="width:25%;"><span style="display:inline-block;padding:1.5px 5px;border-radius:3px;font-weight:700;font-size:8px;${corPdf}">${esc(st.txt)}</span></td></tr>`;
    }).join('');
    const corpo = `<table><thead><tr><th style="width:6%;">Nº</th><th style="width:26%;">Guarda GCM</th><th style="width:20%;">Equipe / Setor</th><th style="width:11%;">Entrada</th><th style="width:12%;">Saída</th><th style="width:25%;">Situação / Justificativa</th></tr></thead><tbody>${rows}</tbody></table>`;
    emitirPdfAutenticado({ tipoDoc:'FOLHA_PONTO_DIARIA', titulo:`FOLHA DE PONTO DIÁRIA — ${formatarDataBR(data)}`, subtitulo:`Equipe 24x72: ${ciclo.equipeServico} · Total de Escalados: ${escalados.length}`, corpoHtml:corpo, nomeArquivo:`folha-ponto-diaria-${data}.pdf`, paisagem:true, qtdRegistros:escalados.length });
  }

  function gerarPdfFolhaMensal() {
    const lista = filtrarPontosHistorico(), m = $('fltPontoMes').value || mesAtualISO();
    const rows = lista.map(p => { const loc = p.localizacao||{}; return `<tr><td style="width:9%;"><img src="${p.foto}" class="foto-pdf"></td><td style="width:13%;"><strong>${formatarDataBR(p.dataLocal)}</strong><br>${esc(p.horaLocal)}</td><td style="width:22%;"><strong>Nº ${esc(p.agenteMatricula)} — ${esc(p.agenteNome)}</strong><br>${esc(p.equipe)} · ${esc(p.posto)}</td><td style="width:12%;">${esc(TIPO_PONTO_LABEL[p.tipo]||p.tipo)}</td><td style="width:28%;">${esc(loc.endereco||'—')}<br><small>${esc(loc.resumoDist||'')}</small></td><td style="width:16%;"><code>${esc(p.protocolo||'—')}</code><br>${esc(loc.status||'OK')}</td></tr>`; }).join('') || '<tr><td colspan="6" style="text-align:center;">Sem batidas no período.</td></tr>';
    emitirPdfAutenticado({ tipoDoc:'ESPELHO_PONTO_MENSAL', titulo:`ESPELHO MENSAL DE FOLHA DE PONTO`, subtitulo:`Competência: ${m} · Total: ${lista.length} batida(s)`, corpoHtml:`<table><thead><tr><th style="width:9%;">Foto</th><th style="width:13%;">Data/Hora</th><th style="width:22%;">Guarda</th><th style="width:12%;">Batida</th><th style="width:28%;">Localização</th><th style="width:16%;">Protocolo</th></tr></thead><tbody>${rows}</tbody></table>`, nomeArquivo:`espelho-ponto-${m}.pdf`, paisagem:false, qtdRegistros:lista.length });
  }

  function gerarPdfEscalaMensal(somenteQuadro) {
    const { titulo, datas } = gerarListaDatasEscala();
    const insig = (eq) => `<span class="insig-pdf" style="border-left-color:${EQUIPE_CORES[eq]?.cor||'#18181B'};">${esc(eq)}</span>`;
    const ordem = { ALFA:1, BRAVO:2, CHARLIE:3, DELTA:4, ADM:5, '12X36':6 };
    const listaPessoas = ESTADO.efetivo.filter(a => a.situacao==='ATIVO').sort((a,b) => (ordem[a.equipe]||9)-(ordem[b.equipe]||9) || Number(a.matricula)-Number(b.matricula));
    const rowsPessoas = listaPessoas.map(a => { const inf = descobrirSetorDoAgente(a); return `<tr><td style="width:5%;"><strong>${esc(a.matricula)}</strong></td><td style="width:24%;"><strong>${esc(a.nome)}</strong></td><td style="width:10%;">${insig(a.equipe)}</td><td style="width:18%;">${esc(inf.nome)}</td><td style="width:13%;">${esc(inf.funcao)}</td><td style="width:30%;"><strong>${esc(proximosDiasServico(a.equipe, 30))}</strong></td></tr>`; }).join('');

    if (somenteQuadro) {
      emitirPdfAutenticado({ tipoDoc:'QUADRO_NOMINAL_ESCALA', titulo:'QUADRO NOMINAL DA ESCALA 24x72', subtitulo:titulo, corpoHtml:`<table><thead><tr><th style="width:5%;">Nº</th><th style="width:24%;">Guarda GCM</th><th style="width:10%;">Equipe</th><th style="width:18%;">Setor/VTR</th><th style="width:13%;">Função</th><th style="width:30%;">Próximos Dias de Serviço</th></tr></thead><tbody>${rowsPessoas}</tbody></table>`, nomeArquivo:`quadro-nominal-escala-${hojeISO()}.pdf`, paisagem:true, qtdRegistros:listaPessoas.length });
      return;
    }

    const linhasCal = datas.map(iso => {
      const c = calcularCiclo24x72(iso);
      const cel = (eq) => c.mapa[eq].codigo==='SERVICO' ? insig('SERVIÇO 24h') : c.mapa[eq].rotulo;
      return `<tr><td style="width:12%;"><strong>${formatarDataBR(iso)}</strong></td><td style="width:7%;">${DIAS_SEMANA[diaSemanaISO(iso)]}</td><td style="width:17%;">${insig('EQUIPE ' + c.equipeServico)}</td><td style="width:16%;">${cel('ALFA')}</td><td style="width:16%;">${cel('BRAVO')}</td><td style="width:16%;">${cel('CHARLIE')}</td><td style="width:16%;">${cel('DELTA')}</td></tr>`;
    }).join('');

    const blocosEquipes = EQUIPES.map(eq => {
      const m = ESTADO.equipesMontagem[eq] || {};
      const rows = ESTADO.postos.map(p => { const g = m[p.id]||{}; return `<tr><td style="width:28%;"><strong>${esc(p.prefixo)} — ${esc(p.setor)}</strong><br><small>Resp.: ${esc(p.responsavel||'—')}</small></td><td style="width:24%;">${esc(nomeAgentePorId(g.g01)||'—')}</td><td style="width:24%;">${esc(nomeAgentePorId(g.g02)||'—')}</td><td style="width:24%;">${esc(nomeAgentePorId(g.g03)||'—')}</td></tr>`; }).join('');
      return `<div class="box"><h3 style="margin-top:0;border-left-color:${EQUIPE_CORES[eq].cor};">EQUIPE ${eq} — Próximos Serviços: ${proximosDiasServico(eq, 30)}</h3><table><thead><tr><th style="width:28%;">Setor / Viatura</th><th style="width:24%;">01 — Comandante</th><th style="width:24%;">02 — Motorista</th><th style="width:24%;">03 — Patrulheiro</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    }).join('');
    const rowsAdm = (ESTADO.administrativo||[]).map(c => `<tr><td style="width:25%;"><strong>${esc(c.cargo)}</strong></td><td style="width:35%;">${esc(c.titular)}</td><td style="width:20%;">${esc(c.horario)}</td><td style="width:20%;">${esc(c.obs||'')}</td></tr>`).join('');

    const corpo = `
      <h2>1. CALENDÁRIO CONTÍNUO 24x72</h2>
      <table><thead><tr><th style="width:12%;">Data</th><th style="width:7%;">Dia</th><th style="width:17%;">Serviço 24h</th><th style="width:16%;">ALFA</th><th style="width:16%;">BRAVO</th><th style="width:16%;">CHARLIE</th><th style="width:16%;">DELTA</th></tr></thead><tbody>${linhasCal}</tbody></table>
      <div class="quebra"></div>
      <h2>2. COMPOSIÇÃO DAS 4 EQUIPES POR SETOR</h2>${blocosEquipes}
      <div class="quebra"></div>
      <h2>3. RELAÇÃO NOMINAL DO EFETIVO (DIAS DE SERVIÇO)</h2>
      <table><thead><tr><th style="width:5%;">Nº</th><th style="width:24%;">Guarda GCM</th><th style="width:10%;">Equipe</th><th style="width:18%;">Setor/VTR</th><th style="width:13%;">Função</th><th style="width:30%;">Próximos Dias de Serviço</th></tr></thead><tbody>${rowsPessoas}</tbody></table>
      <h2>4. EXPEDIENTE ADMINISTRATIVO (SEGUNDA A SEXTA)</h2>
      <table><thead><tr><th style="width:25%;">Cargo</th><th style="width:35%;">Titular</th><th style="width:20%;">Horário</th><th style="width:20%;">Obs.</th></tr></thead><tbody>${rowsAdm}</tbody></table>
      <h2>5. QUADRO DE ATESTADOS MÉDICOS, FÉRIAS, AFASTAMENTOS E FALTAS (CIÊNCIA DO COMANDO)</h2>
      <table><thead><tr><th style="width:25%;">Guarda GCM</th><th style="width:18%;">Motivo / CID</th><th style="width:11%;">Dias Fora</th><th style="width:18%;">Período</th><th style="width:11%;">Retorno</th><th style="width:17%;">Documento</th></tr></thead><tbody>${
        (ESTADO.afastamentos || []).filter(af => af.dataFim >= hojeISO()).map(af => {
          const ag = agentePorId(af.agenteId);
          return `<tr><td><strong>${ag ? `Nº ${esc(ag.matricula)} ${esc(ag.nome)}` : '—'}</strong></td><td>${esc(TIPO_AFASTAMENTO_LABEL[af.tipo]||af.tipo)}${af.cid ? ' · '+esc(af.cid) : ''}</td><td><strong>${af.dias} dia(s)</strong></td><td>${formatarDataBR(af.dataInicio)} a ${formatarDataBR(af.dataFim)}</td><td><strong>${formatarDataBR(af.dataRetorno)}</strong></td><td>${af.anexo ? 'Digitalizado' : 'Pendente'}</td></tr>`;
        }).join('') || '<tr><td colspan="6" style="text-align:center;">Nenhum afastamento, férias ou atestado médico ativo no momento.</td></tr>'
      }</tbody></table>
    `;
    emitirPdfAutenticado({ tipoDoc:'ESCALA_24X72', titulo:'ESCALA CONTÍNUA 24x72 — GCM VALPARAÍSO DE GOIÁS', subtitulo:`${titulo} · Turno ${ESTADO.config.horarioTroca}`, corpoHtml:corpo, nomeArquivo:`escala-24x72-gcm-${hojeISO()}.pdf`, paisagem:true, qtdRegistros:listaPessoas.length });
  }

  function blocoHtmlCartaoPrograma(data, eq, posto) {
    const cp = obterDadosCartao(data, eq, posto.id), croqui = gerarCroquiSvgSetor(posto, cp.pontosBase);
    const linhasPb = (cp.pontosBase||[]).map((pb, i) => `<tr><td style="width:7%;"><strong>PB ${i+1}</strong></td><td style="width:15%;"><strong>${esc(pb.hora)}</strong></td><td style="width:28%;">${esc(pb.local)}</td><td style="width:50%;">${esc(pb.atividade)}</td></tr>`).join('');
    const chksHtml = (cp.checklist||[]).map(c => `<div>[ X ] ${esc(c)}</div>`).join('');
    return `
      <div class="box" style="border-left:5px solid ${esc(posto.cor||'#18181B')};">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #141414;padding-bottom:4px;margin-bottom:6px;">
          <strong style="font-size:12px;">${esc(cp.prefixo || posto.id)} — ${esc(cp.setor)}</strong>
          <span class="insig-pdf" style="border-left-color:${EQUIPE_CORES[eq]?.cor||'#18181B'};">EQUIPE ${esc(eq)} · ${formatarDataBR(data)}</span>
        </div>
        <div class="cp-topo-mapa">
          <div>
            <div><strong>Turno:</strong> ${esc(ESTADO.config.horarioTroca)} | <strong>Rádio:</strong> ${esc(cp.radio || 'Canal 01')} | <strong>Placa:</strong> ${esc(cp.placa || '—')}</div>
            <div style="margin-top:2px;"><strong>Resp. Setor:</strong> ${esc(cp.responsavel || 'A definir')} | <strong>KM Ini/Fim:</strong> ${esc(cp.kmIni||'_____')} / ${esc(cp.kmFim||'_____')}</div>
            <div style="margin-top:2px;"><strong>Bairros e Vias:</strong> ${esc(cp.bairros)}</div>
            <table style="margin-top:5px;"><thead><tr><th style="width:34%;">01 — Comandante</th><th style="width:33%;">02 — Motorista</th><th style="width:33%;">03 — Patrulheiro</th></tr></thead><tbody><tr><td>${esc(cp.g01||'—')}</td><td>${esc(cp.g02||'—')}</td><td>${esc(cp.g03||'—')}</td></tr></tbody></table>
            <div style="margin-top:5px;"><strong>Objetivo do Turno:</strong> ${esc(cp.missao)}</div>
            <div style="margin-top:4px;"><strong>Áreas Sensíveis / Pontos Críticos:</strong> ${esc(cp.areasSensiveis || '—')}</div>
          </div>
          <div>${croqui}</div>
        </div>
        <div style="border-top:1px solid #CCC;padding-top:4px;margin-bottom:5px;">
          <strong>Checklist de Saída:</strong>
          <div class="chk-list">${chksHtml || '<div>Vistoria padrão obrigatória</div>'}</div>
        </div>
        <table><thead><tr><th style="width:7%;">PB</th><th style="width:15%;">Horário</th><th style="width:28%;">Onde Ficar (Local e Referência)</th><th style="width:50%;">Como Executar na Prática (Passo a Passo)</th></tr></thead><tbody>${linhasPb || '<tr><td colspan="4">—</td></tr>'}</tbody></table>
        <div class="grid-2-pdf">
          <div style="border:1px solid #CCC;padding:4px;"><strong>Procedimentos e Contatos:</strong><br>${esc(cp.procedimentos || PROCEDIMENTOS_PADRAO)}</div>
          <div style="border:1px solid #CCC;padding:4px;"><strong>Recomendações do Comando:</strong><br>${esc(cp.obs || '—')}</div>
        </div>
      </div>
    `;
  }

  function gerarPdfCartaoPrograma(apenasAtual) {
    const d = $('inpCartaoData').value || hojeISO(), eq = $('selCartaoEquipe').value || 'ALFA', pid = $('selCartaoPosto').value;
    const lista = apenasAtual ? ESTADO.postos.filter(p => p.id === pid) : ESTADO.postos;
    const blocos = lista.map((p, i) => (i > 0 ? '<div class="quebra"></div>' : '') + blocoHtmlCartaoPrograma(d, eq, p)).join('');
    const tit = apenasAtual ? `CARTÃO PROGRAMA DETALHADO — ${lista[0]?.prefixo||''} (${lista[0]?.setor||''})` : `CARTÃO PROGRAMA COMPLETO DO TURNO — EQUIPE ${eq}`;
    emitirPdfAutenticado({ tipoDoc:'CARTAO_PROGRAMA', titulo:tit, subtitulo:`Data: ${formatarDataBR(d)} · Turno: ${ESTADO.config.horarioTroca} · Equipe ${eq}`, corpoHtml:blocos, nomeArquivo:apenasAtual ? `cartao-${pid}-${d}.pdf` : `cartao-completo-${eq}-${d}.pdf`, paisagem:false, qtdRegistros:lista.length });
  }

  function gerarPdfTermoPermuta(pm) {
    const sol = agentePorId(pm.solicitanteId), sub = agentePorId(pm.substitutoId);
    const corpo = `
      <div class="box">
        <div><strong>Tipo de Permuta:</strong> ${esc(TIPO_PERMUTA_LABEL[pm.tipo] || pm.tipo)}</div>
        <div style="margin-top:4px;"><strong>Situação:</strong> <strong>${esc(pm.status)}</strong> ${pm.homologadoPor ? `(Homologado por ${esc(pm.homologadoPor)} em ${formatarDataHoraBR(pm.homologadoEm)})` : ''}</div>
        <table style="margin-top:8px;">
          <thead><tr><th style="width:50%;">Guarda Solicitante (Sai do Plantão)</th><th style="width:50%;">Guarda Substituto (Assume o Plantão)</th></tr></thead>
          <tbody><tr>
            <td><strong>Nº ${sol ? esc(sol.matricula) : '—'} — ${sol ? esc(sol.nome) : '—'}</strong><br>Equipe: ${sol ? esc(sol.equipe) : '—'}<br>Data do Plantão Original: <strong>${formatarDataBR(pm.dataOriginal)}</strong></td>
            <td><strong>Nº ${sub ? esc(sub.matricula) : '—'} — ${sub ? esc(sub.nome) : '—'}</strong><br>Equipe: ${sub ? esc(sub.equipe) : '—'}<br>Data de Compensação/Troca: <strong>${pm.dataCompensacao ? formatarDataBR(pm.dataCompensacao) : 'A compensar / Banco de Horas'}</strong></td>
          </tr></tbody>
        </table>
        <div style="margin-top:8px;"><strong>Motivo / Justificativa:</strong> ${esc(pm.motivo || '—')}</div>
        <div class="pdf-assinaturas">
          <div class="ass-col"><div class="ass-espaco"></div><div class="ass-linha"></div><strong>${sol ? esc(sol.nome) : 'Solicitante'}</strong><div>Guarda Solicitante (Nº ${sol ? esc(sol.matricula) : '—'})</div></div>
          <div class="ass-col"><div class="ass-espaco"></div><div class="ass-linha"></div><strong>${sub ? esc(sub.nome) : 'Substituto'}</strong><div>Guarda Substituto (Nº ${sub ? esc(sub.matricula) : '—'})</div></div>
        </div>
      </div>
    `;
    emitirPdfAutenticado({ tipoDoc:'TERMO_PERMUTA', titulo:'TERMO OFICIAL DE PERMUTA DE SERVIÇO', subtitulo:`Data Original: ${formatarDataBR(pm.dataOriginal)} · Status: ${pm.status}`, corpoHtml:corpo, nomeArquivo:`termo-permuta-${pm.dataOriginal}.pdf`, paisagem:false, qtdRegistros:1 });
  }

  function gerarPdfListaPermutas() {
    const lista = ESTADO.permutas || [];
    const rows = lista.map(pm => {
      const sol = agentePorId(pm.solicitanteId), sub = agentePorId(pm.substitutoId);
      return `<tr><td style="width:12%;">${formatarDataBR(pm.dataOriginal)}</td><td style="width:22%;">${esc(TIPO_PERMUTA_LABEL[pm.tipo]||pm.tipo)}</td><td style="width:22%;">${sol?`Nº ${sol.matricula} ${sol.nome}`:'—'}</td><td style="width:22%;">${sub?`Nº ${sub.matricula} ${sub.nome}`:'—'}</td><td style="width:11%;">${pm.dataCompensacao?formatarDataBR(pm.dataCompensacao):'—'}</td><td style="width:11%;"><strong>${esc(pm.status)}</strong></td></tr>`;
    }).join('') || '<tr><td colspan="6" style="text-align:center;">Sem permutas registradas.</td></tr>';
    emitirPdfAutenticado({ tipoDoc:'RELATORIO_PERMUTAS', titulo:'RELATÓRIO OFICIAL DE PERMUTAS DE SERVIÇO', subtitulo:`Total: ${lista.length} registro(s)`, corpoHtml:`<table><thead><tr><th style="width:12%;">Data Orig.</th><th style="width:22%;">Tipo</th><th style="width:22%;">Solicitante</th><th style="width:22%;">Substituto</th><th style="width:11%;">Devolução</th><th style="width:11%;">Status</th></tr></thead><tbody>${rows}</tbody></table>`, nomeArquivo:`relatorio-permutas-${hojeISO()}.pdf`, paisagem:true, qtdRegistros:lista.length });
  }

  function gerarPdfBancoHoras(agenteIdOpcional) {
    const mes = $('fltBhMes')?.value || '';
    if (!podeEditarEscala()) {
      const meu = agenteLogadoAtual();
      if (!meu) return toast('Seu nome ainda não está vinculado à base oficial.');
      agenteIdOpcional = meu.id;
    }
    if (agenteIdOpcional) {
      const ag = agentePorId(agenteIdOpcional); if (!ag) return;
      const r = calcularResumoBancoAgente(ag.id, mes);
      const rows = r.movs.map(m => `<tr><td style="width:12%;">${formatarDataBR(m.data)}</td><td style="width:26%;">${esc(TIPO_BH_LABEL[m.tipo]||m.tipo)}</td><td style="width:14%;">${formatarMinutosHM(m.duracaoMin, false)} (×${m.fator||1})</td><td style="width:14%;"><strong>${formatarMinutosHM(m.computadoMin, true)}</strong></td><td style="width:34%;">${esc(m.motivo||'—')}</td></tr>`).join('') || '<tr><td colspan="5" style="text-align:center;">Sem movimentações lançadas.</td></tr>';
      const corpo = `<div class="box"><div class="grid-info"><div><strong>Horas Ponto:</strong> ${formatarMinutosHM(r.pontoMin, false)}</div><div><strong>Créditos / Débitos:</strong> ${formatarMinutosHM(r.creditosMin, true)} / -${formatarMinutosHM(r.debitosMin, false)}</div><div><strong>Saldo Atual:</strong> <strong>${formatarMinutosHM(r.saldoMin, true)}</strong> ${r.valorEstimado>0?`(R$ ${r.valorEstimado.toFixed(2).replace('.',',')})`:''}</div></div></div><table><thead><tr><th style="width:12%;">Data</th><th style="width:26%;">Natureza</th><th style="width:14%;">Duração</th><th style="width:14%;">Computado</th><th style="width:34%;">Motivo / Justificativa</th></tr></thead><tbody>${rows}</tbody></table>`;
      emitirPdfAutenticado({ tipoDoc:'EXTRATO_BANCO_HORAS', titulo:`EXTRATO INDIVIDUAL DE BANCO DE HORAS — Nº ${ag.matricula} ${ag.nome}`, subtitulo:`Equipe ${ag.equipe} · Competência: ${mes || 'Acumulado Geral'}`, corpoHtml:corpo, nomeArquivo:`banco-horas-${ag.matricula}.pdf`, paisagem:false, qtdRegistros:r.movs.length });
      return;
    }
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    const rows = ativos.map(a => {
      const r = calcularResumoBancoAgente(a.id, mes);
      return `<tr><td style="width:6%;"><strong>${esc(a.matricula)}</strong></td><td style="width:28%;"><strong>${esc(a.nome)}</strong></td><td style="width:10%;">${esc(a.equipe)}</td><td style="width:14%;">${formatarMinutosHM(r.pontoMin, false)}</td><td style="width:14%;">${formatarMinutosHM(r.creditosMin, true)}</td><td style="width:14%;">-${formatarMinutosHM(r.debitosMin, false)}</td><td style="width:14%;"><strong>${formatarMinutosHM(r.saldoMin, true)}</strong></td></tr>`;
    }).join('');
    emitirPdfAutenticado({ tipoDoc:'RELATORIO_BANCO_HORAS', titulo:'RELATÓRIO GERAL DE BANCO DE HORAS E HORAS EXTRAS', subtitulo:`Competência: ${mes || 'Acumulado Geral'} · Efetivo Ativo: ${ativos.length}`, corpoHtml:`<table><thead><tr><th style="width:6%;">Nº</th><th style="width:28%;">Guarda GCM</th><th style="width:10%;">Equipe</th><th style="width:14%;">Horas Ponto</th><th style="width:14%;">Créditos (+)</th><th style="width:14%;">Débitos (-)</th><th style="width:14%;">Saldo Final</th></tr></thead><tbody>${rows}</tbody></table>`, nomeArquivo:`relatorio-banco-horas-${mes || hojeISO()}.pdf`, paisagem:false, qtdRegistros:ativos.length });
  }

  function gerarPdfEquipeEspecifica(eq) {
    const membros = ESTADO.efetivo.filter(a => a.equipe === eq).sort((a,b) => Number(a.matricula) - Number(b.matricula));
    const mont = ESTADO.equipesMontagem[eq] || {};
    const vtrRows = ESTADO.postos.map(p => { const g = mont[p.id]||{}; return `<tr><td style="width:28%;"><strong>${esc(p.prefixo)} — ${esc(p.setor)}</strong><br><small>${esc(p.bairros)}</small></td><td style="width:24%;">${esc(nomeAgentePorId(g.g01)||'—')}</td><td style="width:24%;">${esc(nomeAgentePorId(g.g02)||'—')}</td><td style="width:24%;">${esc(nomeAgentePorId(g.g03)||'—')}</td></tr>`; }).join('');
    const memRows = membros.map(a => { const inf = descobrirSetorDoAgente(a); return `<tr><td style="width:7%;"><strong>${esc(a.matricula)}</strong></td><td style="width:35%;"><strong>${esc(a.nome)}</strong></td><td style="width:18%;">${esc(a.nomeGuerra||'—')}</td><td style="width:22%;">${esc(inf.nome)}</td><td style="width:18%;">${esc(inf.funcao)}</td></tr>`; }).join('');
    const corpo = `<h2>1. GUARNIÇÕES NAS VIATURAS — EQUIPE ${eq}</h2><table><thead><tr><th style="width:28%;">Viatura / Setor</th><th style="width:24%;">01 — Comandante</th><th style="width:24%;">02 — Motorista</th><th style="width:24%;">03 — Patrulheiro</th></tr></thead><tbody>${vtrRows}</tbody></table><h2>2. RELAÇÃO NOMINAL COMPLETA (${membros.length} INTEGRANTES)</h2><table><thead><tr><th style="width:7%;">Nº</th><th style="width:35%;">Nome Completo</th><th style="width:18%;">Nome de Guerra</th><th style="width:22%;">Viatura / Setor</th><th style="width:18%;">Função</th></tr></thead><tbody>${memRows}</tbody></table>`;
    emitirPdfAutenticado({ tipoDoc:'QUADRO_EQUIPE', titulo:`QUADRO OFICIAL DA EQUIPE ${eq} — GCM VALPARAÍSO`, subtitulo:`Próximos Serviços (30 dias): ${proximosDiasServico(eq, 30)} · Turno ${ESTADO.config.horarioTroca}`, corpoHtml:corpo, nomeArquivo:`equipe-${eq.toLowerCase()}-${hojeISO()}.pdf`, paisagem:false, qtdRegistros:membros.length });
  }

  function gerarPdfEvento() {
    const ev = lerEventoDoEditor();
    const rows = (ev.viaturas||[]).map(v => `<tr><td style="width:24%;"><strong>${esc(v.prefixo)}</strong><br><small>${esc(v.setor)}</small></td><td style="width:19%;">${esc(nomeAgentePorId(v.g01)||'—')}</td><td style="width:19%;">${esc(nomeAgentePorId(v.g02)||'—')}</td><td style="width:19%;">${esc(nomeAgentePorId(v.g03)||'—')}</td><td style="width:19%;">${esc(nomeAgentePorId(v.g04)||'—')}</td></tr>`).join('');
    const corpo = `<div class="box"><div class="grid-info"><div><strong>Evento:</strong><br>${esc(ev.nome)}</div><div><strong>Local:</strong><br>${esc(ev.local)}</div><div><strong>Modalidade:</strong><br>${esc(MODALIDADE_EVENTO[ev.regime]||ev.regime)}</div></div><div><strong>Coordenador:</strong> ${esc(ev.coordenador||'—')} | <strong>Missão:</strong> ${esc(ev.missao||'—')}</div></div><h2>VIATURAS E GUARNIÇÕES</h2><table><thead><tr><th style="width:24%;">Viatura / Setor</th><th style="width:19%;">01</th><th style="width:19%;">02</th><th style="width:19%;">03</th><th style="width:19%;">04</th></tr></thead><tbody>${rows}</tbody></table><div class="box" style="margin-top:6px;"><strong>Observações:</strong> ${esc(ev.obs||'—')}</div>`;
    emitirPdfAutenticado({ tipoDoc:'ORDEM_SERVICO_EVENTO', titulo:'ORDEM DE SERVIÇO — ESCALA DE EVENTO', subtitulo:`${ev.nome} · ${formatarDataBR(ev.data)} (${ev.inicio}–${ev.fim})`, corpoHtml:corpo, nomeArquivo:`escala-evento-${ev.data}.pdf`, paisagem:false, qtdRegistros:(ev.viaturas||[]).length });
  }

  // =========================================================================
  // NAVEGACAO E INICIALIZACAO
  // =========================================================================

  // =========================================================================
  // 8B. AUDITORIA OPERACIONAL DE 30 DIAS (EXCLUSIVO ADMINISTRADOR)
  // =========================================================================
  function gerarDadosAuditoria30() {
    const fim = $('inpAud30Fim')?.value || hojeISO();
    const ini = $('inpAud30Ini')?.value || somarDiasISO(fim, -29);
    const tolMin = Math.max(0, Number($('inpAud30Tol')?.value ?? 15));

    let totalEscalados = 0, totalFaltas = 0, totalAtrasos = 0, totalAtestados = 0, totalErrosBatida = 0;
    const ocorrenciasFA = [];
    const errosPorAgente = {};
    const addErroAg = (agId, msg) => { errosPorAgente[agId] = errosPorAgente[agId] || []; errosPorAgente[agId].push(msg); totalErrosBatida++; };

    // 1. Varre todos os dias do periodo (max 62 dias para performance)
    const qtdDias = Math.min(62, Math.max(1, diffDiasISO(fim, ini) + 1));
    const hoje = hojeISO();
    for (let i = 0; i < qtdDias; i++) {
      const d = somarDiasISO(ini, i);
      if (d > hoje) break;
      const { escalados } = obterEscaladosDaData(d);
      totalEscalados += escalados.length;
      escalados.forEach(item => {
        const ag = item.agente;
        const r = resumirDiaAgente(d, ag.id, item.permutaSaida);
        if (r.status === 'FALTOU') {
          totalFaltas++;
          ocorrenciasFA.push({
            data: d, ag, tipo: 'FALTA', badge: 'badge-erro',
            detalhe: r.just?.obs || r.afast?.obs || 'Escalado sem registro de ponto nem justificativa'
          });
        } else if (r.afast && r.afast.tipo !== 'FALTA') {
          if (r.afast.dataInicio === d) {
            totalAtestados++;
            ocorrenciasFA.push({
              data: d, ag, tipo: TIPO_AFASTAMENTO_LABEL[r.afast.tipo] || r.afast.tipo, badge: 'badge-warn',
              detalhe: `${r.afast.dias} dia(s) fora (${formatarDataBR(r.afast.dataInicio)} a ${formatarDataBR(r.afast.dataFim)} · Ret. ${formatarDataBR(r.afast.dataRetorno)})${r.afast.anexo ? ' · Com anexo' : ' · Sem anexo'}`
            });
          }
        }
        // Checa atraso na Entrada (previsto 08:00 no ADM, 07:00 na 24x72)
        if (r.ent) {
          const regrasBh = ESTADO.config?.bancoHoras || {};
          const prevStr = ag.equipe === 'ADM' ? (regrasBh.horaInicioAdm || '08:00') : (regrasBh.horaInicio24 || '07:00');
          const [hh, mm] = r.ent.horaLocal.split(':').map(Number);
          const minReal = hh * 60 + mm;
          const minPrev = hhmmParaMin(prevStr, ag.equipe === 'ADM' ? 480 : 420);
          const atraso = minReal - minPrev;
          if (atraso > tolMin && atraso < 360) {
            totalAtrasos++;
            ocorrenciasFA.push({
              data: d, ag, tipo: 'ATRASO', badge: 'badge-pendente',
              detalhe: `Previsto ${prevStr} (tolerância ${tolMin} min) · Bateu às ${r.ent.horaLocal.slice(0,5)} (+${atraso} min)`
            });
          }
        }
        // Checa erro / esquecimento de batida respeitando plantoes 24x72 (so acusa apos 32h da Entrada sem Saida!)
        if (d < hoje) {
          if (r.ent && !r.sai) {
            const horasDesdeEnt = (Date.now() - new Date(r.ent.timestampIso).getTime()) / 3600000;
            const limiteHoras = ag.equipe === 'ADM' ? 14 : 32;
            if (horasDesdeEnt >= limiteHoras) {
              addErroAg(ag.id, `${formatarDataBR(d)}: bateu Entrada (${r.ent.horaLocal.slice(0,5)}) e não registrou Saída`);
            }
          } else if (!r.ent && r.sai) {
            addErroAg(ag.id, `${formatarDataBR(d)}: bateu Saída (${r.sai.horaLocal.slice(0,5)}) sem Entrada registrada`);
          }
        }
      });
    }

    // 2. Analisa Banco de Horas (+ horas e - horas: Acordo/Gestao vs Erro/Esquecimento)
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    const analiseBanco = [];
    let somaSaldoPosMin = 0, somaSaldoNegMin = 0;

    ativos.forEach(ag => {
      const movs = (ESTADO.bancoHorasMovs || []).filter(m => m.agenteId === ag.id && m.data >= ini && m.data <= fim);
      let credAcordoMin = 0, credPontoAutoMin = 0, debMin = 0;
      movs.forEach(m => {
        if (m.computadoMin >= 0) {
          if (m.tipo === 'PONTO_AUTO') credPontoAutoMin += m.computadoMin;
          else credAcordoMin += m.computadoMin;
        } else {
          debMin += Math.abs(m.computadoMin);
        }
      });
      const saldoMin = (credAcordoMin + credPontoAutoMin) - debMin;
      if (saldoMin > 0) somaSaldoPosMin += saldoMin;
      if (saldoMin < 0) somaSaldoNegMin += Math.abs(saldoMin);

      const errs = errosPorAgente[ag.id] || [];
      if (movs.length || errs.length) {
        let diag = 'Regular', diagCls = 'badge-ok';
        if (errs.length && (credPontoAutoMin > 0 || saldoMin !== 0)) {
          diag = 'VERIFICAR: Possível distorção por esquecimento de batida';
          diagCls = 'badge-erro';
        } else if (errs.length) {
          diag = 'ERRO DE BATIDA: Esqueceu Saída/Entrada (regularizar)';
          diagCls = 'badge-pendente';
        } else if (saldoMin > 24 * 60) {
          diag = 'ACORDO / EXTRAS ELEVADO (>24h — programar folga compensatória)';
          diagCls = 'badge-warn';
        } else if (saldoMin < 0) {
          diag = 'SALDO NEGATIVO (débito/atraso a compensar)';
          diagCls = 'badge-erro';
        } else if (credAcordoMin > 0) {
          diag = 'COERENTE: Acúmulo por Acordo / Autorização da Gestão';
          diagCls = 'badge-ok';
        }
        analiseBanco.push({ ag, credAcordoMin: credAcordoMin + credPontoAutoMin, debMin, saldoMin, errs, diag, diagCls });
      }
    });

    // 3. Pontos batidos fora de Valparaiso de Goias no periodo
    const foraValp = (ESTADO.pontos || [])
      .filter(p => (p.foraValparaiso || p.localizacao?.status === 'FORA_VALPARAISO') && p.dataLocal >= ini && p.dataLocal <= fim);

    // 4. Sugestoes automaticas para o Administrador / Comando
    const sugestoes = [];
    if (totalErrosBatida > 0) {
      sugestoes.push({ cls: 'alerta', texto: `Esquecimentos de Batida (${totalErrosBatida} caso(s)): guardas registraram Entrada e esqueceram a Saída (ou vice-versa). Recomenda-se orientar a tropa e regularizar os registros antes de fechar o Banco de Horas.` });
    }
    if (totalFaltas > 0) {
      sugestoes.push({ cls: 'alerta', texto: `Faltas sem Justificativa (${totalFaltas} ocorrência(s)): confira com os chefes de equipe se houve atestado não entregue ou se deve constar no Relatório Oficial para o Comando.` });
    }
    if (totalAtrasos > 0) {
      sugestoes.push({ cls: 'atencao', texto: `Atrasos acima de ${tolMin} min (${totalAtrasos} registro(s)): avalie os casos recorrentes e se há necessidade de ajuste de escala ou orientação.` });
    }
    if (foraValp.length > 0) {
      sugestoes.push({ cls: 'atencao', texto: `Pontos Fora de Valparaíso de Goiás (${foraValp.length} registro(s)): revise os motivos informados abaixo e encaminhe ao Comando no PDF oficial.` });
    }
    const altosBh = analiseBanco.filter(x => x.saldoMin > 24 * 60);
    if (altosBh.length > 0) {
      sugestoes.push({ cls: 'atencao', texto: `Banco de Horas elevado (${altosBh.length} guarda(s) com mais de 24h acumuladas): planeje folgas compensatórias para equilibrar o efetivo.` });
    }
    if (!sugestoes.length) {
      sugestoes.push({ cls: 'ok', texto: 'Nenhuma irregularidade crítica encontrada neste período. A base de dados da Folha de Ponto, Escala e Banco de Horas está consistente.' });
    }

    return {
      ini, fim, tolMin, totalEscalados, totalFaltas, totalAtrasos, totalAtestados, totalErrosBatida,
      somaSaldoPosMin, somaSaldoNegMin, analiseBanco, ocorrenciasFA, foraValp, sugestoes
    };
  }

  function renderAuditoria30() {
    if (!isAdmin()) return;
    if ($('inpAud30Fim') && !$('inpAud30Fim').value) $('inpAud30Fim').value = hojeISO();
    if ($('inpAud30Ini') && !$('inpAud30Ini').value) $('inpAud30Ini').value = somarDiasISO($('inpAud30Fim').value, -29);

    const aud = gerarDadosAuditoria30();
    const ult = ESTADO.config?.ultimaAuditoria30Iso || '';
    const diasProx = ult ? Math.max(0, 30 - diffDiasISO(hojeISO(), ult)) : 0;

    $('badgeStatusCicloAud30').textContent = diasProx === 0 ? 'Auditoria Pronta p/ Conclusão' : `Próximo ciclo em ${diasProx} dia(s)`;

    $('kpisAuditoria30').innerHTML = `
      <div class="faixa-kpi"><strong>${aud.totalEscalados}</strong><span>Escalados</span></div>
      <div class="faixa-kpi kpi-falta"><strong>${aud.totalFaltas}</strong><span>Faltas</span></div>
      <div class="faixa-kpi kpi-pend"><strong>${aud.totalAtrasos}</strong><span>Atrasos</span></div>
      <div class="faixa-kpi kpi-falta"><strong>${aud.totalErrosBatida}</strong><span>Erros Batida</span></div>
      <div class="faixa-kpi kpi-pend"><strong>${aud.foraValp.length}</strong><span>Fora Valp.</span></div>
      <div class="faixa-kpi kpi-ok"><strong>${formatarMinutosHM(aud.somaSaldoPosMin, true)}</strong><span>Banco (+)</span></div>
    `;

    $('listaSugestoesAud30').innerHTML = aud.sugestoes.map(s => `<div class="sugestao-aud-item ${s.cls}">${esc(s.texto)}</div>`).join('');

    $('badgeQtdAudBh').textContent = `${aud.analiseBanco.length} guarda(s)`;
    $('tbodyAud30Banco').innerHTML = aud.analiseBanco.map(x => `
      <tr>
        <td><strong>Nº ${esc(x.ag.matricula)} — ${esc(x.ag.nome)}</strong></td>
        <td><span class="insig eq-${esc(x.ag.equipe)}">${esc(x.ag.equipe)}</span></td>
        <td class="saldo-pos">${formatarMinutosHM(x.credAcordoMin, true)}</td>
        <td class="saldo-neg">${x.debMin ? '-' + formatarMinutosHM(x.debMin, false) : '00h00'}</td>
        <td class="${x.saldoMin >= 0 ? 'saldo-pos' : 'saldo-neg'}">${formatarMinutosHM(x.saldoMin, true)}</td>
        <td>${x.errs.length ? x.errs.map(e => `<div style="font-size:11.5px;color:var(--danger);">• ${esc(e)}</div>`).join('') : '<span class="subtexto">Nenhum erro</span>'}</td>
        <td><span class="badge ${x.diagCls}">${esc(x.diag)}</span></td>
      </tr>
    `).join('') || '<tr><td colspan="7" class="subtexto" style="text-align:center;padding:14px;">Nenhum movimento de Banco de Horas ou erro de batida neste período.</td></tr>';

    $('badgeQtdAudOcorr').textContent = `${aud.ocorrenciasFA.length} registro(s)`;
    $('tbodyAud30FaltasAtrasos').innerHTML = aud.ocorrenciasFA.map(o => `
      <tr>
        <td><strong>${formatarDataBR(o.data)}</strong></td>
        <td><strong>Nº ${esc(o.ag.matricula)} — ${esc(o.ag.nome)}</strong></td>
        <td><span class="insig eq-${esc(o.ag.equipe)}">${esc(o.ag.equipe)}</span></td>
        <td><span class="badge ${o.badge}">${esc(o.tipo)}</span></td>
        <td>${esc(o.detalhe)}</td>
      </tr>
    `).join('') || '<tr><td colspan="5" class="subtexto" style="text-align:center;padding:14px;">Nenhuma falta, atraso ou afastamento no período.</td></tr>';

    $('badgeQtdAudFora').textContent = `${aud.foraValp.length} registro(s)`;
    $('tbodyAud30ForaValp').innerHTML = aud.foraValp.map(p => `
      <tr>
        <td><strong>${formatarDataBR(p.dataLocal)}</strong><div class="subtexto">${esc(p.horaLocal)} · ${esc(TIPO_PONTO_LABEL[p.tipo]||p.tipo)}</div></td>
        <td><strong>Nº ${esc(p.agenteMatricula)} — ${esc(p.agenteNome)}</strong></td>
        <td>${esc(p.localizacao?.endereco || '—')}</td>
        <td><strong>${esc(p.justificativaForaValp?.categoria || 'Não especificado')}</strong><div class="subtexto">${esc(p.justificativaForaValp?.detalhe || p.obs || '—')}</div></td>
      </tr>
    `).join('') || '<tr><td colspan="4" class="subtexto" style="text-align:center;padding:14px;">Nenhum ponto registrado fora de Valparaíso de Goiás neste período.</td></tr>';

    const hist = ESTADO.auditorias30Dias || [];
    $('badgeQtdAudHist').textContent = `${hist.length} arquivada(s)`;
    $('tbodyAud30Historico').innerHTML = hist.map(h => `
      <tr>
        <td><strong>${formatarDataHoraBR(h.concluidaEm)}</strong></td>
        <td>${formatarDataBR(h.ini)} a ${formatarDataBR(h.fim)}</td>
        <td>${esc(h.responsavel)}</td>
        <td>Faltas: ${h.faltas} · Atrasos: ${h.atrasos} · Erros: ${h.erros} · Fora Valp.: ${h.foraValp}</td>
        <td>${esc(h.parecer || 'Aprovada sem ressalvas')}</td>
      </tr>
    `).join('') || '<tr><td colspan="5" class="subtexto" style="text-align:center;padding:14px;">Nenhuma auditoria de 30 dias arquivada ainda.</td></tr>';
  }

  function gerarPdfAuditoria30() {
    if (!isAdmin()) return toast('Exclusivo Administrador.');
    const aud = gerarDadosAuditoria30();
    const rowsBh = aud.analiseBanco.map(x => `<tr><td style="width:22%;"><strong>Nº ${esc(x.ag.matricula)} ${esc(x.ag.nome)}</strong></td><td style="width:9%;">${esc(x.ag.equipe)}</td><td style="width:11%;">${formatarMinutosHM(x.credAcordoMin, true)}</td><td style="width:11%;">-${formatarMinutosHM(x.debMin, false)}</td><td style="width:11%;"><strong>${formatarMinutosHM(x.saldoMin, true)}</strong></td><td style="width:18%;">${x.errs.length ? esc(x.errs.join('; ')) : 'Sem erros'}</td><td style="width:18%;"><strong>${esc(x.diag)}</strong></td></tr>`).join('') || '<tr><td colspan="7" style="text-align:center;">Sem anomalias ou lançamentos de banco de horas.</td></tr>';
    const rowsFa = aud.ocorrenciasFA.map(o => `<tr><td style="width:12%;">${formatarDataBR(o.data)}</td><td style="width:26%;"><strong>Nº ${esc(o.ag.matricula)} ${esc(o.ag.nome)}</strong></td><td style="width:10%;">${esc(o.ag.equipe)}</td><td style="width:14%;"><strong>${esc(o.tipo)}</strong></td><td style="width:38%;">${esc(o.detalhe)}</td></tr>`).join('') || '<tr><td colspan="5" style="text-align:center;">Sem faltas, atrasos ou atestados no período.</td></tr>';
    const rowsFv = aud.foraValp.map(p => `<tr><td style="width:15%;">${formatarDataBR(p.dataLocal)} ${esc(p.horaLocal)}</td><td style="width:23%;"><strong>Nº ${esc(p.agenteMatricula)} ${esc(p.agenteNome)}</strong></td><td style="width:28%;">${esc(p.localizacao?.endereco||'—')}</td><td style="width:34%;"><strong>${esc(p.justificativaForaValp?.categoria||'—')}</strong><br>${esc(p.justificativaForaValp?.detalhe||'—')}</td></tr>`).join('') || '<tr><td colspan="4" style="text-align:center;">Todos os registros dentro de Valparaíso de Goiás.</td></tr>';
    const corpo = `
      <div class="box">
        <div><strong>PERÍODO AUDITADO:</strong> ${formatarDataBR(aud.ini)} a ${formatarDataBR(aud.fim)} · <strong>Tolerância de Atraso:</strong> ${aud.tolMin} min</div>
        <div style="margin-top:4px;"><strong>Escalados:</strong> ${aud.totalEscalados} | <strong>Faltas:</strong> ${aud.totalFaltas} | <strong>Atrasos:</strong> ${aud.totalAtrasos} | <strong>Erros/Esquecimentos Batida:</strong> ${aud.totalErrosBatida} | <strong>Fora de Valparaíso:</strong> ${aud.foraValp.length} | <strong>Banco (+):</strong> ${formatarMinutosHM(aud.somaSaldoPosMin, true)} | <strong>Banco (-):</strong> -${formatarMinutosHM(aud.somaSaldoNegMin, false)}</div>
      </div>
      <h2>SUGESTÕES E DIAGNÓSTICO AUTOMÁTICO</h2>
      <div class="box">${aud.sugestoes.map(s => `<div style="margin-bottom:3px;">• ${esc(s.texto)}</div>`).join('')}</div>
      <h2>1. BANCO DE HORAS (+ HORAS E - HORAS: ACORDO × ERRO / ESQUECIMENTO)</h2>
      <table><thead><tr><th style="width:22%;">Guarda</th><th style="width:9%;">Eq.</th><th style="width:11%;">Horas (+)</th><th style="width:11%;">Horas (-)</th><th style="width:11%;">Saldo</th><th style="width:18%;">Erros Batida</th><th style="width:18%;">Diagnóstico</th></tr></thead><tbody>${rowsBh}</tbody></table>
      <h2>2. FALTAS, ATRASOS E ATESTADOS NO PERÍODO</h2>
      <table><thead><tr><th style="width:12%;">Data</th><th style="width:26%;">Guarda</th><th style="width:10%;">Eq.</th><th style="width:14%;">Tipo</th><th style="width:38%;">Detalhe</th></tr></thead><tbody>${rowsFa}</tbody></table>
      <h2>3. REGISTROS FORA DE VALPARAÍSO DE GOIÁS (CIÊNCIA DO COMANDO)</h2>
      <table><thead><tr><th style="width:15%;">Data / Hora</th><th style="width:23%;">Guarda</th><th style="width:28%;">Local Detectado</th><th style="width:34%;">Motivo ao Comando</th></tr></thead><tbody>${rowsFv}</tbody></table>
    `;
    emitirPdfAutenticado({
      tipoDoc: 'AUDITORIA_30_DIAS',
      titulo: 'AUDITORIA OPERACIONAL DE 30 DIAS — GCM VALPARAÍSO DE GOIÁS',
      subtitulo: `Período: ${formatarDataBR(aud.ini)} a ${formatarDataBR(aud.fim)} · Controle de Escala, Ponto e Banco de Horas`,
      corpoHtml: corpo,
      nomeArquivo: `auditoria-30-dias-gcm-${aud.fim}.pdf`,
      paisagem: true,
      qtdRegistros: aud.analiseBanco.length + aud.ocorrenciasFA.length + aud.foraValp.length
    });
  }

  function exportarCsvAuditoria30() {
    if (!isAdmin()) return toast('Exclusivo Administrador.');
    const aud = gerarDadosAuditoria30();
    const linhas = ['Categoria;Data;Matricula;Nome;Equipe;Detalhe;Diagnostico'];
    aud.analiseBanco.forEach(x => linhas.push(`BANCO_HORAS;${aud.ini}_a_${aud.fim};${x.ag.matricula};"${x.ag.nome}";${x.ag.equipe};"Saldo ${formatarMinutosHM(x.saldoMin,true)} | Erros: ${x.errs.join(' / ')}";"${x.diag}"`));
    aud.ocorrenciasFA.forEach(o => linhas.push(`${o.tipo};${o.data};${o.ag.matricula};"${o.ag.nome}";${o.ag.equipe};"${o.detalhe}";"Auditoria 30 dias"`));
    aud.foraValp.forEach(p => linhas.push(`FORA_VALPARAISO;${p.dataLocal};${p.agenteMatricula};"${p.agenteNome}";${p.equipe};"${p.localizacao?.endereco||''}";"${(p.justificativaForaValp?.categoria||'')+' - '+(p.justificativaForaValp?.detalhe||'')}"`));
    const blob = new Blob(['\uFEFF' + linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const u = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = u; a.download = `base-auditoria-30d-gcm-${aud.fim}.csv`; a.click(); URL.revokeObjectURL(u);
    toast('Base CSV da Auditoria 30 dias exportada!');
  }


  // =========================================================================
  // 7B. CONFIGURACOES DO USUARIO (FOTO, DADOS FIXOS, EMAIL E ALTERAR SENHA)
  // =========================================================================
  function avaliarForcaSenha(senha) {
    const s = String(senha || '');
    if (!s) return { pct: 0, cls: '', rotulo: '—' };
    let pts = 0;
    if (s.length >= 6) pts++;
    if (s.length >= 10) pts++;
    if (/[a-z]/.test(s) && /[A-Z]/.test(s)) pts++;
    if (/[0-9]/.test(s)) pts++;
    if (/[^a-zA-Z0-9]/.test(s)) pts++;
    if (s.length < 6) return { pct: 25, cls: 'forca-fraca', rotulo: 'Muito curta (mín. 6 caracteres)' };
    if (pts <= 2) return { pct: 45, cls: 'forca-fraca', rotulo: 'Simples — pode adicionar letras ou números' };
    if (pts === 3) return { pct: 72, cls: 'forca-media', rotulo: 'Boa' };
    return { pct: 100, cls: 'forca-forte', rotulo: 'Forte' };
  }

  function atualizarMedidorForcaSenha() {
    const s = $('inpUsrNovaSenha')?.value || '';
    const f = avaliarForcaSenha(s);
    const bar = $('barraForcaSenha'), lbl = $('lblForcaSenha');
    if (bar) {
      bar.style.width = f.pct + '%';
      bar.className = 'forca-senha-fill ' + f.cls;
    }
    if (lbl) lbl.textContent = f.rotulo;
  }

  function renderConfigUsuario() {
    if (!SESSAO) return;
    const u = window.EscalaCloud.obterUsuarioPorLogin(SESSAO.login) || SESSAO;
    const ag = agenteLogadoAtual();
    const foto = (ag && ag.fotoPerfil) || u.fotoUsuario || obterFotoIdentificacaoAgente(ag) || '';
    const infSetor = ag ? descobrirSetorDoAgente(ag) : null;

    $('avisoTrocaSenhaObrigatoria')?.classList.toggle('oculto', !u.trocarSenhaObrigatoria);
    if ($('badgeUsrPerfil')) $('badgeUsrPerfil').textContent = u.perfil || 'AGENTE';
    if ($('lblUsrNomeDestaque')) $('lblUsrNomeDestaque').textContent = u.nome || '—';
    if ($('lblUsrEquipeSetor')) $('lblUsrEquipeSetor').textContent = ag ? `Equipe ${ag.equipe} · ${infSetor.nome} (${infSetor.funcao})` : `Perfil ${u.perfil} · Conta do Sistema`;
    if ($('lblUsrLoginInfo')) $('lblUsrLoginInfo').textContent = `Login: ${u.login} · Matrícula fixa: ${u.matricula || (ag ? ag.matricula : 'Ainda não atribuída')}`;

    const boxFoto = $('boxFotoUsuarioPerfil');
    if (boxFoto) {
      boxFoto.innerHTML = foto ? `<img src="${foto}" alt="Foto do Usuário">` : '<span>Sem foto cadastrada</span>';
    }

    if ($('inpUsrNomeFixo')) $('inpUsrNomeFixo').value = u.nome || '';
    if ($('inpUsrMatriculaFixa')) $('inpUsrMatriculaFixa').value = u.matricula || (ag ? ag.matricula : 'Não atribuída');
    if ($('inpUsrLoginFixo')) $('inpUsrLoginFixo').value = u.login || '';
    if ($('inpUsrEquipeFixa')) $('inpUsrEquipeFixa').value = ag ? `Equipe ${ag.equipe} — ${infSetor.nome}` : 'Sem vínculo operacional';
    if ($('selUsrTipoEmail')) $('selUsrTipoEmail').value = u.tipoEmail || 'PESSOAL';
    if ($('inpUsrEmail')) $('inpUsrEmail').value = u.email || '';
  }

  function abrirModalAtualizarFotoUsuario() {
    if (!SESSAO) return;
    const u = window.EscalaCloud.obterUsuarioPorLogin(SESSAO.login) || SESSAO;
    const ag = agenteLogadoAtual();
    const fotoAtual = (ag && ag.fotoPerfil) || u.fotoUsuario || '';
    let streamUsr = null;
    let fotoNova = null;

    abrirModal(
      `Foto do Usuário — ${u.nome}`,
      `
        <p class="subtexto">Esta foto aparece nas suas Configurações do Usuário, no cabeçalho da sua Folha de Ponto em PDF e na Conferência de Identidade.</p>
        <div class="camera-box">
          <video id="vidFotoUsr" autoplay playsinline muted class="oculto"></video>
          <canvas id="cvsFotoUsr" class="oculto"></canvas>
          <img id="imgFotoUsrPrev" class="${fotoAtual ? '' : 'oculto'}" src="${fotoAtual}" alt="Foto do usuário">
          <div id="phFotoUsr" class="camera-placeholder ${fotoAtual ? 'oculto' : ''}">Clique em "Ligar Câmera" para tirar sua foto de perfil.</div>
        </div>
        <div class="acoes-linha">
          <button type="button" class="btn btn-acao-destaque btn-sm" id="btnLigarCamUsr">Ligar Câmera</button>
          <button type="button" class="btn btn-primario btn-sm" id="btnBaterFotoUsr" disabled>Capturar Foto</button>
        </div>
      `,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: () => { if (streamUsr) streamUsr.getTracks().forEach(t => t.stop()); fecharModal(); } },
        { texto: 'Salvar Minha Foto', classe: 'btn-primario', onClick: async () => {
          if (streamUsr) streamUsr.getTracks().forEach(t => t.stop());
          if (!fotoNova) return toast('Capture uma foto primeiro.');
          window.EscalaCloud.atualizarUsuario(SESSAO.login, { fotoUsuario: fotoNova });
          SESSAO.fotoUsuario = fotoNova;
          if (ag) ag.fotoPerfil = fotoNova;
          await salvarTudo(true);
          fecharModal();
          renderConfigUsuario();
          renderMinhaFolha();
          toast('Foto do usuário salva com sucesso!');
        }}
      ]
    );

    $('btnLigarCamUsr').addEventListener('click', async () => {
      try {
        streamUsr = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 480 } }, audio: false });
        const v = $('vidFotoUsr'); v.srcObject = streamUsr; v.classList.remove('oculto');
        $('phFotoUsr').classList.add('oculto'); $('imgFotoUsrPrev').classList.add('oculto');
        $('btnBaterFotoUsr').disabled = false;
      } catch (_) { toast('Permita acesso à câmera.'); }
    });

    $('btnBaterFotoUsr').addEventListener('click', () => {
      const v = $('vidFotoUsr'), c = $('cvsFotoUsr');
      if (!v || !v.videoWidth) return;
      const w = 320, h = Math.round((v.videoHeight / v.videoWidth) * w) || 320;
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(v, 0, 0, w, h);
      fotoNova = c.toDataURL('image/jpeg', 0.72);
      if (streamUsr) { streamUsr.getTracks().forEach(t => t.stop()); streamUsr = null; }
      v.classList.add('oculto');
      const img = $('imgFotoUsrPrev'); img.src = fotoNova; img.classList.remove('oculto');
      $('btnBaterFotoUsr').disabled = true;
      toast('Foto capturada! Clique em "Salvar Minha Foto".');
    });
  }

  function abrirModalEsqueciSenha() {
    abrirModal(
      'Esqueci Minha Senha',
      `
        <p class="subtexto">Por segurança, ninguém visualiza sua senha. Informe seu <strong>Login</strong> ou <strong>Nome Completo</strong> abaixo para enviar uma solicitação ao Administrador, que gerará uma senha temporária para você voltar a acessar.</p>
        <div class="campo mt-8">
          <label for="inpResetIdent">Seu Login ou Nome Completo</label>
          <input type="text" id="inpResetIdent" placeholder="Ex.: anderson ou Anderson Pereira Costa">
        </div>
        <div id="msgResetSolic" class="alerta-inline oculto mt-8"></div>
      `,
      [
        { texto: 'Fechar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Solicitar Nova Senha ao Admin', classe: 'btn-primario', onClick: () => {
          const box = $('msgResetSolic'); box.classList.remove('oculto', 'erro', 'ok');
          const r = window.EscalaCloud.solicitarResetSenha($('inpResetIdent').value);
          if (!r.ok) {
            box.classList.add('erro'); box.textContent = r.erro; return;
          }
          box.classList.add('ok');
          box.textContent = `Solicitação registrada para ${r.nome} (${r.login}). Avise o Administrador para gerar sua senha temporária em Contas e Senhas.`;
          salvarTudo(true);
        }}
      ]
    );
  }

  function ativarSubtab(idSecao, idSub) {
    const sec = $(idSecao); if (!sec) return;
    sec.querySelectorAll('.subtab').forEach(x => x.classList.toggle('ativo', x.getAttribute('data-sub') === idSub));
    sec.querySelectorAll('.subpainel').forEach(p => p.classList.toggle('ativo', p.id === idSub));
  }

  function abrirAba(idSecao) {
    // Trava rigida de acesso (RBAC): nao-Admin nunca abre secSistema; Agente nunca abre secEfetivo
    if ((idSecao === 'secSistema' || idSecao === 'secAuditoria30') && !isAdmin()) { toast('Acesso restrito exclusivamente ao Administrador.'); return; }
    if (idSecao === 'secEfetivo' && !podeEditarEscala()) { toast('Acesso restrito à Gestão de Escalas.'); return; }

    document.querySelectorAll('.secao-aba').forEach(s => s.classList.toggle('ativa', s.id === idSecao));
    document.querySelectorAll('.side-btn').forEach(b => b.classList.toggle('ativo', b.getAttribute('data-aba') === idSecao));
    document.querySelectorAll('[data-mob-aba]').forEach(b => b.classList.toggle('ativo', b.getAttribute('data-mob-aba') === idSecao));
    if (idSecao !== 'secEquipeDetalhe') document.querySelectorAll('.insig-btn').forEach(b => b.classList.remove('ativa'));
    if ($('lblTituloPaginaAtual')) $('lblTituloPaginaAtual').textContent = TITULOS_ABAS[idSecao] || 'GCM Valparaíso';
    fecharSidebarMobile();
    if (idSecao !== 'secPonto') pararCamera();
    if (idSecao !== 'secAfastamentos') pararCameraScanAf();
    if (idSecao === 'secPonto') { renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos(); coletarLocalizacaoAutomatica(false); }
    if (idSecao === 'secMinhaFolha') renderMinhaFolha();
    if (idSecao === 'secEscalas') { renderCalendario24(); renderPermutas(); renderQuadroPessoas(); renderMontagemEquipe(); renderSetoresResponsaveis(); renderAdmE12x36(); renderResponsaveis(); }
    if (idSecao === 'secAfastamentos') renderAfastamentos();
    if (idSecao === 'secCartao') { popularSelectsCartao(); carregarEditorCartao(); }
    if (idSecao === 'secBancoHoras') renderBancoHoras();
    if (idSecao === 'secEventos') renderListaEventos();
    if (idSecao === 'secEquipeDetalhe') renderTelaEquipeDetalhe();
    if (idSecao === 'secAutenticacao') renderTelaAutenticacao();
    if (idSecao === 'secUsuario') renderConfigUsuario();
    if (idSecao === 'secEfetivo') renderEfetivo();
    if (idSecao === 'secAuditoria30') renderAuditoria30();
    if (idSecao === 'secSistema') { renderContas(); renderConfigBase(); }
  }

  function atualizarTodasVistas() {
    renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos(); renderMinhaFolha();
    renderCalendario24(); renderPermutas(); renderAfastamentos(); renderQuadroPessoas(); renderMontagemEquipe(); renderSetoresResponsaveis();
    renderAdmE12x36(); renderResponsaveis(); popularSelectsCartao(); carregarEditorCartao();
    renderBancoHoras(); renderListaEventos(); renderTelaEquipeDetalhe(); renderTelaAutenticacao(); renderConfigUsuario();
    renderEfetivo(); renderAuditoria30(); renderContas(); renderConfigBase(); aplicarPermissoesVisuais();
  }

  function iniciarAppLogado(sessao) {
    SESSAO = sessao;
    $('telaAuth').classList.add('oculto'); $('appShell').classList.remove('oculto');
    $('lblUsuarioTopo').textContent = sessao.nome; $('lblPerfilTopo').textContent = sessao.perfil;
    $('inpFreqData').value = hojeISO(); $('fltPontoMes').value = mesAtualISO();
    $('selMesEscala').value = mesAtualISO(); $('inpCartaoData').value = hojeISO();
    $('fltBhMes').value = mesAtualISO();
    aplicarPermissoesVisuais();
    sincronizarDataCartao(); atualizarTodasVistas();
    if (sessao.trocarSenhaObrigatoria) {
      abrirAba('secUsuario');
      toast('Sua senha foi redefinida pelo Administrador. Cadastre sua nova senha pessoal agora.');
      setTimeout(() => $('inpUsrSenhaAtual')?.focus(), 180);
    } else {
      abrirAba('secPonto');
    }

    const meuLogado = agenteLogadoAtual();
    if (meuLogado) selecionarGuardaParaPonto(meuLogado);
    atualizarAlertaBotaoPonto();

    if (timerRelogio) clearInterval(timerRelogio);
    timerRelogio = setInterval(() => { if ($('lblRelogioPonto')) $('lblRelogioPonto').textContent = new Date().toLocaleTimeString('pt-BR'); }, 1000);
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      window.EscalaCloud.assinarNuvem(true, (rem) => { if (!rem?.efetivo) return; ESTADO = rem; window.EscalaCloud.salvarEstadoLocal(ESTADO); atualizarBadgeSync('Nuvem OK', 'badge-ok'); atualizarTodasVistas(); });
    }
  }

  function irParaAlterarMinhaSenha() {
    abrirAba('secUsuario');
    setTimeout(() => {
      $('cardAlterarMinhaSenha')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('inpUsrSenhaAtual')?.focus();
    }, 120);
  }

  function registrarEventos() {
    $('btnTema').addEventListener('click', alternarTema);
    $('btnTemaAuth').addEventListener('click', alternarTema);
    $('btnInstalarAppAuth').addEventListener('click', acionarInstalacaoDiretaNoCelular);
    $('btnInstallDiretoLogin').addEventListener('click', acionarInstalacaoDiretaNoCelular);
    $('btnInstallDiretoApp').addEventListener('click', acionarInstalacaoDiretaNoCelular);
    $('btnFecharBannerInstall').addEventListener('click', () => {
      sessionStorage.setItem('gcm_install_dispensado', '1');
      atualizarBotoesInstalacaoDireta();
    });
    $('btnInstalarAppSide').addEventListener('click', () => { fecharSidebarMobile(); acionarInstalacaoDiretaNoCelular(); });
    $('btnToggleMenu').addEventListener('click', alternarSidebar);
    $('btnFecharSidebar').addEventListener('click', fecharSidebarMobile);
    $('sidebarBackdrop').addEventListener('click', fecharSidebarMobile);
    $('btnAlterarMeuCodigoTopo').addEventListener('click', irParaAlterarMinhaSenha);
    $('btnEsqueciSenha').addEventListener('click', abrirModalEsqueciSenha);

    // Eventos da aba Configurações do Usuário
    $('btnUsrTirarFoto').addEventListener('click', abrirModalAtualizarFotoUsuario);
    $('btnUsrFotoCard').addEventListener('click', abrirModalAtualizarFotoUsuario);
    $('btnUsrAbrirMinhaFolha').addEventListener('click', () => abrirAba('secMinhaFolha'));
    $('inpUsrNovaSenha').addEventListener('input', atualizarMedidorForcaSenha);
    document.querySelectorAll('[data-toggle-pass]').forEach(btn => btn.addEventListener('click', () => {
      const inp = $(btn.getAttribute('data-toggle-pass'));
      if (!inp) return;
      const mostrar = inp.type === 'password';
      inp.type = mostrar ? 'text' : 'password';
      btn.textContent = mostrar ? 'Ocultar' : 'Ver';
    }));
    $('btnSalvarEmailUsuario').addEventListener('click', async () => {
      if (!SESSAO) return;
      const email = ($('inpUsrEmail').value || '').trim().toLowerCase();
      const tipoEmail = $('selUsrTipoEmail').value || 'PESSOAL';
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return toast('Informe um endereço de e-mail válido.');
      }
      const r = window.EscalaCloud.atualizarUsuario(SESSAO.login, { email, tipoEmail });
      if (!r.ok) return toast(r.erro);
      SESSAO.email = email; SESSAO.tipoEmail = tipoEmail;
      await salvarTudo(true);
      renderConfigUsuario();
      if (isAdmin()) renderContas();
      toast('E-mail atualizado com sucesso!');
    });
    $('btnSalvarNovaSenhaUsuario').addEventListener('click', async () => {
      if (!SESSAO) return;
      const box = $('msgUsrSenha'); box.classList.remove('oculto', 'erro', 'ok');
      const atual = $('inpUsrSenhaAtual').value;
      const nova = $('inpUsrNovaSenha').value;
      const conf = $('inpUsrConfirmaSenha').value;
      if (!atual) { box.classList.add('erro'); box.textContent = 'Informe sua senha atual.'; return; }
      if (nova !== conf) { box.classList.add('erro'); box.textContent = 'A nova senha e a confirmação não conferem.'; return; }
      const r = window.EscalaCloud.alterarPropriaSenha(SESSAO.login, atual, nova);
      if (!r.ok) { box.classList.add('erro'); box.textContent = r.erro; return; }
      SESSAO.trocarSenhaObrigatoria = false;
      $('inpUsrSenhaAtual').value = ''; $('inpUsrNovaSenha').value = ''; $('inpUsrConfirmaSenha').value = '';
      atualizarMedidorForcaSenha();
      $('avisoTrocaSenhaObrigatoria')?.classList.add('oculto');
      box.classList.add('ok'); box.textContent = 'Sua senha foi alterada com sucesso e salva com criptografia SHA-256.';
      await salvarTudo(true);
      toast('Senha alterada com sucesso!');
    });

    // Barra Inferior Mobile (estilo CCO Viaturas)
    document.querySelectorAll('[data-mob-aba]').forEach(b => b.addEventListener('click', () => abrirAba(b.getAttribute('data-mob-aba'))));
    const btnMobMenu = $('btnMobAbrirMenu');
    if (btnMobMenu) btnMobMenu.addEventListener('click', alternarSidebar);

    // Auditoria 30 Dias (Exclusivo Admin)
    $('btnRodarAuditoria30').addEventListener('click', renderAuditoria30);
    $('btnPdfAuditoria30').addEventListener('click', gerarPdfAuditoria30);
    $('btnExportarCsvAud30').addEventListener('click', exportarCsvAuditoria30);
    $('btnConcluirCicloAud30').addEventListener('click', () => {
      if (!isAdmin()) return toast('Exclusivo Administrador.');
      const aud = gerarDadosAuditoria30();
      abrirModal('Concluir e Arquivar Auditoria de 30 Dias',
        `<div class="subtexto">Período: <strong>${formatarDataBR(aud.ini)} a ${formatarDataBR(aud.fim)}</strong> · Faltas: ${aud.totalFaltas} · Atrasos: ${aud.totalAtrasos} · Erros de Batida: ${aud.totalErrosBatida} · Fora de Valparaíso: ${aud.foraValp.length}</div>
         <div class="campo mt-8"><label for="mAud30Parecer">Parecer do Administrador (Opcional)</label><textarea id="mAud30Parecer" rows="3" placeholder="Ex.: Revisado e regularizado com os chefes de equipe..."></textarea></div>`,
        [
          { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
          { texto: 'Arquivar e Iniciar Novo Ciclo (30 dias)', classe: 'btn-primario', onClick: async () => {
            ESTADO.auditorias30Dias = ESTADO.auditorias30Dias || [];
            ESTADO.auditorias30Dias.unshift({
              id: 'aud30_' + Date.now().toString(36),
              concluidaEm: new Date().toISOString(),
              ini: aud.ini, fim: aud.fim,
              responsavel: SESSAO?.nome || 'Administrador',
              faltas: aud.totalFaltas, atrasos: aud.totalAtrasos, erros: aud.totalErrosBatida, foraValp: aud.foraValp.length,
              parecer: $('mAud30Parecer').value.trim()
            });
            ESTADO.config.ultimaAuditoria30Iso = hojeISO();
            await salvarTudo();
            fecharModal();
            renderAuditoria30();
            renderBannerAuditoria30Admin();
            toast('Auditoria arquivada! Próximo aviso automático daqui a 30 dias.');
          }}
        ]
      );
    });

    $('btnTopoRegistrarPonto').addEventListener('click', () => { abrirAba('secPonto'); ativarSubtab('secPonto', 'subPtRegistrar'); $('inpIdentificaGuarda').focus(); });

    // Botao Atualizar App (atualiza SOMENTE este app, sem afetar o CCO Viaturas)
    $('btnAtualizarApp').addEventListener('click', async () => {
      toast('Atualizando para a versão mais recente...');
      try {
        if ('caches' in window) {
          const keys = await caches.keys();
          for (const k of keys) {
            if (k.startsWith('gcm-valparaiso-escala-') || k.startsWith('escala-gcm-')) await caches.delete(k);
          }
        }
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.getRegistration('./');
          if (reg) await reg.update();
        }
      } catch (_) {}
      setTimeout(() => location.reload(), 350);
    });

    // Atestados, Ferias, Afastamentos e Relatorio Oficial p/ Comando
    $('inpAfDataIni').addEventListener('change', atualizarPreviaDiasAf);
    $('inpAfDias').addEventListener('input', atualizarPreviaDiasAf);
    $('btnAbrirCamScanAf').addEventListener('click', abrirCameraScanAf);
    $('btnCapturarScanAf').addEventListener('click', capturarDocumentoScanAf);
    $('btnAnexarArquivoAf').addEventListener('click', () => $('inpFileScanAf').click());
    $('inpFileScanAf').addEventListener('change', (e) => { processarArquivoAnexoAf(e.target.files[0]); e.target.value = ''; });
    $('btnLimparScanAf').addEventListener('click', limparAnexoScanAf);
    $('btnSalvarAfastamento').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Apenas Administrador ou Escalante.');
      const agenteId = $('selAfGuarda').value;
      const tipo = $('selAfTipo').value;
      const dataInicio = $('inpAfDataIni').value || hojeISO();
      const dias = Math.max(1, Math.min(365, Number($('inpAfDias').value || 1)));
      if (!agenteId) return toast('Selecione o guarda.');
      const dataFim = somarDiasISO(dataInicio, dias - 1);
      const dataRetorno = somarDiasISO(dataInicio, dias);
      const reg = {
        id: 'af_' + Date.now().toString(36),
        agenteId, tipo, dataInicio, dias, dataFim, dataRetorno,
        cid: $('inpAfCid').value.trim(),
        protocoloExt: $('inpAfProtocoloExt').value.trim(),
        obs: $('inpAfObs').value.trim(),
        anexo: anexoScanAfAtual || null,
        por: SESSAO?.nome || 'Gestão',
        criadoEm: new Date().toISOString()
      };
      ESTADO.afastamentos = ESTADO.afastamentos || [];
      ESTADO.afastamentos.unshift(reg);
      const ok = await salvarTudo();
      if (!ok) { ESTADO.afastamentos.shift(); return; }
      $('inpAfCid').value = ''; $('inpAfProtocoloExt').value = ''; $('inpAfObs').value = ''; $('inpAfDias').value = '1';
      limparAnexoScanAf();
      atualizarTodasVistas();
      toast(`${TIPO_AFASTAMENTO_LABEL[tipo] || tipo} (${dias} dia(s)) registrado!`);
    });
    $('fltAfBusca').addEventListener('input', renderAfastamentos);
    $('fltAfTipo').addEventListener('change', renderAfastamentos);
    $('fltAfVigencia').addEventListener('change', renderAfastamentos);
    $('btnAbrirRelComandoAf').addEventListener('click', () => abrirModalRelatorioComando(hojeISO()));
    $('btnAbrirRelComandoEsc').addEventListener('click', () => abrirModalRelatorioComando(hojeISO()));
    $('btnAbrirRelComandoFreq').addEventListener('click', () => abrirModalRelatorioComando($('inpFreqData')?.value || hojeISO()));

    // Botoes clicaveis ALFA / BRAVO / CHARLIE / DELTA (sidebar esquerda e barra da tela de equipe)
    document.querySelectorAll('[data-ver-equipe]').forEach(btn => btn.addEventListener('click', () => abrirTelaEquipe(btn.getAttribute('data-ver-equipe'))));
    $('btnEqPdfAutenticado').addEventListener('click', () => gerarPdfEquipeEspecifica(equipeDetalheAtual));
    $('btnEqVerCartao').addEventListener('click', () => { abrirAba('secCartao'); $('selCartaoEquipe').value = equipeDetalheAtual; carregarEditorCartao(); });

    $('btnTabEntrar').addEventListener('click', () => { $('btnTabEntrar').classList.add('ativo'); $('btnTabCadastrar').classList.remove('ativo'); $('formLogin').classList.remove('oculto'); $('formCadastro').classList.add('oculto'); });
    $('btnTabCadastrar').addEventListener('click', () => { $('btnTabCadastrar').classList.add('ativo'); $('btnTabEntrar').classList.remove('ativo'); $('formCadastro').classList.remove('oculto'); $('formLogin').classList.add('oculto'); });

    $('formLogin').addEventListener('submit', async (e) => {
      e.preventDefault(); $('msgAuthErro').classList.add('oculto');
      const r = await window.EscalaCloud.tentarLogin($('inpLoginUser').value, $('inpLoginPass').value);
      if (!r.ok) { $('msgAuthErro').textContent = r.erro; $('msgAuthErro').classList.remove('oculto'); return; }
      iniciarAppLogado(r.sessao);
    });
    $('formCadastro').addEventListener('submit', (e) => {
      e.preventDefault(); const b = $('msgCadInfo'); b.classList.remove('oculto','erro','ok');
      const nomeInf = $('inpCadNome').value.trim();
      const conf = verificarNomeNoRolOficial(nomeInf);
      const r = window.EscalaCloud.cadastrarUsuario({
        nome: nomeInf,
        login: $('inpCadUser').value,
        matricula: $('inpCadMat').value,
        email: $('inpCadEmail')?.value || '',
        tipoEmail: $('selCadTipoEmail')?.value || 'PESSOAL',
        senha: $('inpCadPass').value,
        perfil: 'AGENTE',
        aprovado: false,
        constaNoRolOficial: conf.constaNoRol,
        agenteVinculadoId: conf.agente ? conf.agente.id : '',
        alertaCadastro: conf.constaNoRol ? '' : 'ALERTA: Nome não consta na relação oficial dos 64 guardas (PDF).'
      });
      if (!r.ok) {
        b.classList.add('erro'); b.textContent = r.erro; return;
      }
      b.classList.add('ok');
      b.textContent = conf.constaNoRol
        ? 'Solicitação enviada! Seu nome foi localizado no efetivo oficial da GCM — aguarde aprovação do Administrador.'
        : 'Solicitação enviada ao Administrador. Aviso: este nome não foi encontrado automaticamente na lista oficial dos 64 guardas (o Administrador será alertado na análise).';
      $('formCadastro').reset();
      salvarTudo(true);
    });
    $('btnSair').addEventListener('click', () => { pararCamera(); window.EscalaCloud.salvarSessao(null); SESSAO = null; $('appShell').classList.add('oculto'); $('telaAuth').classList.remove('oculto'); });
    $('btnFecharModal').addEventListener('click', fecharModal);
    $('modalOverlay').addEventListener('click', (e) => { if (e.target === $('modalOverlay')) fecharModal(); });

    document.querySelectorAll('.side-btn').forEach(b => b.addEventListener('click', () => abrirAba(b.getAttribute('data-aba'))));
    document.querySelectorAll('.subtabs').forEach(gr => gr.querySelectorAll('.subtab').forEach(btn => btn.addEventListener('click', () => {
      const alvo = btn.getAttribute('data-sub'), sec = btn.closest('.secao-aba');
      gr.querySelectorAll('.subtab').forEach(x => x.classList.toggle('ativo', x === btn));
      sec.querySelectorAll('.subpainel').forEach(p => p.classList.toggle('ativo', p.id === alvo));
    })));

    // Folha de Ponto
    $('inpIdentificaGuarda').addEventListener('input', buscarGuardaDigitado);
    $('selPontoTipo').addEventListener('change', atualizarBoxJanelaHorario);
    $('btnAbrirCamera').addEventListener('click', abrirCameraAoVivo);
    $('btnCapturarFoto').addEventListener('click', capturarFotoComCarimbo);
    $('btnRefazerFoto').addEventListener('click', () => { fotoCapturadaDataUrl = null; abrirCameraAoVivo(); });
    $('btnConfirmarPonto').addEventListener('click', confirmarRegistroPonto);
    $('btnVerFrequenciaCompleta').addEventListener('click', () => { ativarSubtab('secPonto', 'subPtFrequencia'); renderFrequenciaDia(); });
    $('inpFreqData').addEventListener('change', renderFrequenciaDia);
    $('fltFreqBusca').addEventListener('input', renderFrequenciaDia);
    $('fltFreqSituacao').addEventListener('change', renderFrequenciaDia);
    $('btnPdfFolhaDia').addEventListener('click', gerarPdfFolhaDia);
    $('fltPontoMes').addEventListener('change', renderTabelaPontos);
    $('fltPontoBusca').addEventListener('input', renderTabelaPontos);
    $('fltPontoTipo').addEventListener('change', renderTabelaPontos);
    $('fltPontoStatus').addEventListener('change', renderTabelaPontos);
    $('btnPdfFolhaMensal').addEventListener('click', gerarPdfFolhaMensal);

    // Minha Folha de Ponto Individual (PDF)
    $('selMfAgente').addEventListener('change', renderMinhaFolha);
    $('selMfPeriodo').addEventListener('change', renderMinhaFolha);
    $('inpMfMes').addEventListener('change', renderMinhaFolha);
    $('inpMfDataIni').addEventListener('change', renderMinhaFolha);
    $('inpMfDataFim').addEventListener('change', renderMinhaFolha);
    $('btnAtualizarFotoPerfil').addEventListener('click', abrirModalAtualizarFotoPerfil);
    $('btnBaixarMinhaFolhaPdf').addEventListener('click', gerarPdfMinhaFolhaIndividual);

    // Escala e Permutas
    $('selModoEscala').addEventListener('change', renderCalendario24);
    $('selMesEscala').addEventListener('change', renderCalendario24);
    $('btnSalvarCiclo24').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.config.dataBaseAlfa = $('inpDataBaseAlfa').value||hojeISO(); ESTADO.config.horarioTroca = $('inpHorarioTroca').value.trim()||'07:00 às 07:00'; await salvarTudo(); renderCalendario24(); renderQuadroPessoas(); renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); });
    $('btnExportarPdfEscala').addEventListener('click', () => gerarPdfEscalaMensal(false));
    $('btnSalvarPermuta').addEventListener('click', async () => {
      const solId = $('selPermSolicitante').value, subId = $('selPermSubstituto').value, dtOrig = $('inpPermDataOrig').value;
      if (!solId || !subId || !dtOrig) return toast('Preencha os guardas e a data original.');
      if (solId === subId) return toast('Solicitante e substituto devem ser guardas diferentes.');
      const novo = {
        id: 'pm_' + Date.now().toString(36),
        tipo: $('selPermTipo').value,
        solicitanteId: solId, substitutoId: subId,
        dataOriginal: dtOrig, dataCompensacao: $('inpPermDataComp').value || '',
        motivo: $('inpPermMotivo').value.trim(),
        status: podeEditarEscala() ? 'APROVADA' : 'PENDENTE',
        solicitadoPor: SESSAO?.nome || 'Guarda',
        homologadoPor: podeEditarEscala() ? (SESSAO?.nome || 'Gestão') : '',
        homologadoEm: podeEditarEscala() ? new Date().toISOString() : '',
        criadoEm: new Date().toISOString()
      };
      ESTADO.permutas = ESTADO.permutas || [];
      ESTADO.permutas.unshift(novo);
      $('inpPermMotivo').value = '';
      await salvarTudo(); renderPermutas(); renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia();
      toast(novo.status === 'APROVADA' ? 'Permuta registrada e aprovada!' : 'Solicitação de permuta enviada para aprovação.');
    });
    $('fltPermStatus').addEventListener('change', renderPermutas);
    $('btnPdfListaPermutas').addEventListener('click', gerarPdfListaPermutas);
    $('fltQpEquipe').addEventListener('change', renderQuadroPessoas);
    $('fltQpBusca').addEventListener('input', renderQuadroPessoas);
    $('btnPdfQuadroPessoas').addEventListener('click', () => gerarPdfEscalaMensal(true));
    $('selEquipeMontagem').addEventListener('change', renderMontagemEquipe);
    $('btnSalvarMontagemEquipe').addEventListener('click', salvarMontagemEquipeAtual);
    $('btnAutoDistribuirEquipe').addEventListener('click', autoDistribuirEquipeAtual);
    $('btnAdicionarPosto').addEventListener('click', abrirModalNovoPosto);
    $('btnAddSetorDireto').addEventListener('click', abrirModalNovoPosto);
    $('btnSalvarSetoresResp').addEventListener('click', salvarSetoresResponsaveis);
    $('btnAddCargoAdm').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.administrativo.push({ id:'adm_'+Date.now(), cargo:'Novo Cargo', titular:'A definir', horario:'Seg–Sex · 08h às 17h', obs:'' }); renderAdmE12x36(); });
    $('btnSalvarAdm').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const l = []; $('listaCargosAdm').querySelectorAll('.linha-editavel').forEach((el,i) => l.push({ id:'adm_'+i, cargo:el.querySelector('.adm-cargo').value.trim(), titular:el.querySelector('.adm-titular').value.trim(), horario:el.querySelector('.adm-horario').value.trim(), obs:el.querySelector('.adm-obs').value.trim() })); ESTADO.administrativo = l; await salvarTudo(); });
    $('btnAddPosto12x36').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.escala12x36.push({ id:'e12_'+Date.now(), posto:'Novo Posto 12x36', turno:'Diurno', equipeA:'A definir', equipeB:'A definir' }); renderAdmE12x36(); });
    $('btnSalvar12x36').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const l = []; $('listaPostos12x36').querySelectorAll('.linha-editavel').forEach((el,i) => l.push({ id:'e12_'+i, posto:el.querySelector('.e12-posto').value.trim(), turno:el.querySelector('.e12-turno').value.trim(), equipeA:el.querySelector('.e12-a').value.trim(), equipeB:el.querySelector('.e12-b').value.trim() })); ESTADO.escala12x36 = l; await salvarTudo(); });
    $('btnSalvarResponsaveis').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.config.responsaveis = { escalanteNome:$('inpRespEscalanteNome').value.trim(), escalanteCargo:$('inpRespEscalanteCargo').value.trim(), escalanteMat:$('inpRespEscalanteMat').value.trim(), comandoNome:$('inpRespComandoNome').value.trim(), comandoCargo:$('inpRespComandoCargo').value.trim(), comandoMat:$('inpRespComandoMat').value.trim() }; await salvarTudo(); });

    // Cartao Programa e Mapa
    $('inpCartaoData').addEventListener('change', sincronizarDataCartao);
    $('selCartaoEquipe').addEventListener('change', carregarEditorCartao);
    $('selCartaoPosto').addEventListener('change', carregarEditorCartao);
    $('chkMostrarTodosSetores').addEventListener('change', atualizarDesenhoMapaSetor);
    $('btnCentralizarSetor').addEventListener('click', atualizarDesenhoMapaSetor);
    $('btnModoMarcarPb').addEventListener('click', () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      modoMarcarPbMapa = !modoMarcarPbMapa;
      $('avisoCliqueMapa').classList.toggle('oculto', !modoMarcarPbMapa);
      $('btnModoMarcarPb').textContent = modoMarcarPbMapa ? 'Cancelar Marcação' : '+ Marcar Ponto Base (PB) no Mapa';
    });
    $('btnAddLinhaPb').addEventListener('click', () => { if (!podeEditarEscala()) return; const a = lerCartaoDoEditor().pontosBase; a.push({ hora:'', local:'', atividade:'', lat:null, lon:null }); renderLinhasPb(a); });
    $('btnPuxarGuarnicaoEscala').addEventListener('click', () => { const m = (ESTADO.equipesMontagem[$('selCartaoEquipe').value]||{})[$('selCartaoPosto').value]||{}, p = ESTADO.postos.find(x => x.id === $('selCartaoPosto').value); $('inpCpG01').value = nomeAgentePorId(m.g01)||''; $('inpCpG02').value = nomeAgentePorId(m.g02)||''; $('inpCpG03').value = nomeAgentePorId(m.g03)||''; if (p) $('inpCpRespSetor').value = p.responsavel||''; toast('Sincronizado.'); });
    $('btnSalvarCartaoDia').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.cartoesDia[chaveCartao($('inpCartaoData').value, $('selCartaoEquipe').value, $('selCartaoPosto').value)] = lerCartaoDoEditor(); await salvarTudo(); atualizarDesenhoMapaSetor(); });
    $('btnSalvarModeloSetor').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const pid = $('selCartaoPosto').value, d = lerCartaoDoEditor(); ESTADO.cartoesModelo[pid] = { setor:d.setor, bairros:d.bairros, prefixo:d.prefixo, placa:d.placa, radio:d.radio, responsavel:d.responsavel, checklist:d.checklist, missao:d.missao, areasSensiveis:d.areasSensiveis, procedimentos:d.procedimentos, pontosBase:d.pontosBase, obs:d.obs }; const p = ESTADO.postos.find(x => x.id === pid); if (p) Object.assign(p, { setor:d.setor, bairros:d.bairros, prefixo:d.prefixo, responsavel:d.responsavel }); await salvarTudo(); atualizarDesenhoMapaSetor(); toast('Padrão do setor atualizado!'); });
    $('btnPdfCartaoIndividual').addEventListener('click', () => gerarPdfCartaoPrograma(true));
    $('btnPdfCartaoCompleto').addEventListener('click', () => gerarPdfCartaoPrograma(false));
    $('btnCopiarWhatsApp').addEventListener('click', copiarResumoWhatsApp);

    // Banco de Horas e Horas Extras
    $('fltBhMes').addEventListener('change', renderBancoHoras);
    $('fltBhBusca').addEventListener('input', renderBancoHoras);
    $('fltBhEquipe').addEventListener('change', renderBancoHoras);
    $('btnBhLimparMes').addEventListener('click', () => { $('fltBhMes').value = ''; renderBancoHoras(); });
    $('btnApurarBancoPeloPonto').addEventListener('click', apurarHorasExtrasPeloPonto);
    $('btnPdfBancoHoras').addEventListener('click', () => gerarPdfBancoHoras(null));
    const recalcHorasBh = () => {
      const ini = $('inpBhInicio').value, fim = $('inpBhFim').value;
      if (!ini || !fim) return;
      const [h1,m1] = ini.split(':').map(Number), [h2,m2] = fim.split(':').map(Number);
      let d = (h2*60+m2) - (h1*60+m1); if (d <= 0) d += 1440;
      $('inpBhHoras').value = (d / 60).toFixed(2);
    };
    $('inpBhInicio').addEventListener('change', recalcHorasBh);
    $('inpBhFim').addEventListener('change', recalcHorasBh);
    $('btnSalvarMovBh').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const agId = $('selBhAgente').value, data = $('inpBhData').value || hojeISO(), tipo = $('selBhTipo').value;
      const horas = Number($('inpBhHoras').value || 0);
      if (!agId || horas <= 0) return toast('Informe o guarda e a quantidade de horas (ou horário início/fim).');
      const regras = ESTADO.config.bancoHoras || { mult50: 1.5, mult100: 2.0 };
      const durMin = Math.round(horas * 60);
      let fator = 1, sinal = 1;
      if (tipo === 'EXTRA_50') fator = Number(regras.mult50 || 1.5);
      else if (tipo === 'EXTRA_100') fator = Number(regras.mult100 || 2.0);
      else if (tipo === 'COMPENSACAO' || tipo === 'DEBITO_ATRASO') sinal = -1;
      const computadoMin = Math.round(durMin * fator) * sinal;
      ESTADO.bancoHorasMovs = ESTADO.bancoHorasMovs || [];
      ESTADO.bancoHorasMovs.unshift({ id:'bh_'+Date.now().toString(36), agenteId:agId, data, tipo, duracaoMin:durMin, fator, computadoMin, motivo:$('inpBhMotivo').value.trim(), por:SESSAO?.nome||'Gestão', em:new Date().toISOString() });
      $('inpBhHoras').value = ''; $('inpBhMotivo').value = '';
      await salvarTudo(); renderBancoHoras();
    });
    $('btnSalvarRegrasBh').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      ESTADO.config.bancoHoras = {
        horaInicio24: $('inpBhHoraIni24')?.value || '07:00',
        horaInicioAdm: $('inpBhHoraIniAdm')?.value || '08:00',
        antecedenciaMin: Math.max(0, Number($('inpBhAntecedencia')?.value ?? 30)),
        toleranciaAtrasoMin: Math.max(0, Number($('inpBhTolerancia')?.value ?? 10)),
        carga24: Number($('inpBhCarga24').value) || 24,
        cargaAdm: Number($('inpBhCargaAdm').value) || 8,
        valorHora: Number($('inpBhValorHora').value) || 0,
        mult50: Number($('inpBhMult50').value) || 1.5,
        mult100: Number($('inpBhMult100').value) || 2.0
      };
      if ($('inpAud30Tol')) $('inpAud30Tol').value = ESTADO.config.bancoHoras.toleranciaAtrasoMin;
      await salvarTudo(); renderBancoHoras(); atualizarBoxJanelaHorario();
    });

    // Eventos
    $('btnNovoEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const novo = { id:'ev_'+Date.now().toString(36), nome:'Novo Evento Extra', local:'Valparaíso de Goiás', data:hojeISO(), inicio:'16:00', fim:'23:00', regime:'HORA_EXTRA', coordenador:'', missao:'', obs:'', viaturas:[{ id:'evv_1', prefixo:'VTR-EVENTO 01', setor:'Principal', g01:'', g02:'', g03:'', g04:'' }, { id:'evv_2', prefixo:'VTR-EVENTO 02', setor:'Apoio', g01:'', g02:'', g03:'', g04:'' }] }; ESTADO.eventos.unshift(novo); eventoSelecionadoId = novo.id; await salvarTudo(true); renderListaEventos(); });
    $('inpEvData').addEventListener('change', () => { const cur = lerEventoDoEditor(); atualizarDicaFolgaEvento(cur.data); renderViaturasEvento(cur.viaturas, cur.data); });
    $('btnAddVtrEvento').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const cur = lerEventoDoEditor(); cur.viaturas.push({ id:'evv_'+Date.now(), prefixo:`VTR-EVENTO 0${cur.viaturas.length+1}`, setor:'', g01:'', g02:'', g03:'', g04:'' }); renderViaturasEvento(cur.viaturas, cur.data); });
    $('btnSalvarEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const cur = lerEventoDoEditor(), i = ESTADO.eventos.findIndex(e => e.id === cur.id); if (i >= 0) ESTADO.eventos[i] = cur; await salvarTudo(); renderListaEventos(); renderFrequenciaDia(); });
    $('btnExcluirEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); if (!confirm('Excluir evento?')) return; ESTADO.eventos = ESTADO.eventos.filter(e => e.id !== eventoSelecionadoId); eventoSelecionadoId = null; await salvarTudo(); renderListaEventos(); });
    $('btnWhatsAppEvento').addEventListener('click', copiarWhatsAppEvento);
    $('btnPdfEvento').addEventListener('click', gerarPdfEvento);

    // Validacao de Autenticidade e Conferencia de Identidade Pos-Turno
    $('btnExecutarValidacao').addEventListener('click', validarCodigoDocumentoOuPonto);
    $('inpCodigoValidar').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); validarCodigoDocumentoOuPonto(); } });
    $('btnAuditarCadeiaPontos').addEventListener('click', auditarCadeiaCompletaPontos);
    $('fltIdMes').addEventListener('change', renderAuditoriaIdentidade);
    $('fltIdBusca').addEventListener('input', renderAuditoriaIdentidade);
    $('fltIdStatus').addEventListener('change', renderAuditoriaIdentidade);
    $('btnPdfAuditoriaIdentidade').addEventListener('click', gerarPdfAuditoriaIdentidade);
    $('btnPdfAuditoriaIdentidade2').addEventListener('click', gerarPdfAuditoriaIdentidade);

    // Efetivo (Gestao) e Sistema (EXCLUSIVO ADMIN)
    $('fltEfBusca').addEventListener('input', renderEfetivo);
    $('fltEfEquipe').addEventListener('change', renderEfetivo);
    $('fltEfArea').addEventListener('change', renderEfetivo);
    $('btnNovoAgente').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); abrirModalAgente(null); });
    $('btnAbrirImportar64').addEventListener('click', abrirModalImportar64);
    $('btnDistribuir64').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); if (!confirm('Rebalancear operacionais nas 4 equipes?')) return; const alvos = ESTADO.efetivo.filter(a => a.situacao==='ATIVO' && a.equipe!=='ADM' && a.equipe!=='12X36'); alvos.forEach((a,i) => { a.equipe = EQUIPES[i%4]; a.regime = '24X72'; }); await salvarTudo(); atualizarTodasVistas(); toast(`${alvos.length} guardas rebalanceados!`); });

    $('btnCriarContaAdmin').addEventListener('click', () => {
      if (!isAdmin()) return toast('Acesso exclusivo do Administrador.');
      const dlNomes = `<datalist id="dlNomesOficiaisConta">${ESTADO.efetivo.map(a => `<option value="${esc(a.nome)}">`).join('')}</datalist>`;
      abrirModal('Criar Conta de Usuário', `${dlNomes}<div class="campo"><label>Nome Completo (conferido no rol oficial)</label><input type="text" id="mUsNome" list="dlNomesOficiaisConta" placeholder="Ex.: Anderson Pereira Costa"></div><div class="grid-2"><div class="campo"><label>Login</label><input type="text" id="mUsLogin" placeholder="Ex.: anderson"></div><div class="campo"><label>Matrícula (Fixa após criada)</label><input type="text" id="mUsMat" placeholder="Opcional"></div></div><div class="grid-2"><div class="campo"><label>Tipo de E-mail</label><select id="mUsTipoEmail"><option value="INSTITUCIONAL">Institucional</option><option value="PESSOAL" selected>Pessoal (Gmail/Outro)</option></select></div><div class="campo"><label>E-mail</label><input type="email" id="mUsEmail" placeholder="Opcional"></div></div><div class="grid-2"><div class="campo"><label>Senha Inicial (mín. 6 caracteres)</label><input type="password" id="mUsPass" minlength="6" placeholder="Letras, números ou frase"></div><div class="campo"><label>Perfil</label><select id="mUsPerfil"><option value="AGENTE">Agente (Consulta e Ponto)</option><option value="ESCALANTE">Escalante (Escala/Cartão/Banco)</option><option value="ADMIN">Administrador (Acesso Total)</option></select></div></div>`, [
        { texto:'Cancelar', classe:'btn-sec', onClick:fecharModal },
        { texto:'Criar Conta', classe:'btn-primario', onClick: () => {
          const nomeInf = $('mUsNome').value.trim();
          const conf = verificarNomeNoRolOficial(nomeInf);
          if (!conf.constaNoRol && $('mUsPerfil').value === 'AGENTE') {
            if (!confirm(`AVISO: O nome "${nomeInf}" não consta na lista oficial dos 64 guardas (PDF). Deseja criar mesmo assim?`)) return;
          }
          const r = window.EscalaCloud.cadastrarUsuario({
            nome: nomeInf, login: $('mUsLogin').value, matricula: $('mUsMat').value,
            email: $('mUsEmail')?.value || '', tipoEmail: $('mUsTipoEmail')?.value || 'PESSOAL',
            senha: $('mUsPass').value,
            perfil: $('mUsPerfil').value, aprovado: true,
            constaNoRolOficial: conf.constaNoRol, agenteVinculadoId: conf.agente ? conf.agente.id : '',
            alertaCadastro: conf.constaNoRol ? '' : 'Criado fora do rol oficial (PDF).'
          });
          if (!r.ok) return toast(r.erro);
          fecharModal(); renderContas(); renderBannerCadastrosAdmin(); salvarTudo(true); toast('Conta criada!');
        }}
      ]);
    });
    $('btnCapturarBaseGps').addEventListener('click', () => {
      if (!isAdmin()) return toast('Acesso exclusivo do Administrador.');
      if (!navigator.geolocation) return toast('Sem GPS.');
      navigator.geolocation.getCurrentPosition(pos => { $('inpBaseLat').value = pos.coords.latitude.toFixed(6); $('inpBaseLon').value = pos.coords.longitude.toFixed(6); toast('GPS capturado!'); }, () => toast('Falha no GPS.'), { enableHighAccuracy:true, maximumAge:0, timeout:10000 });
    });
    $('btnSalvarConfigBase').addEventListener('click', async () => { if (!isAdmin()) return toast('Exclusivo Administrador.'); Object.assign(ESTADO.config, { baseNome:$('inpBaseNome').value.trim(), baseLat:Number($('inpBaseLat').value), baseLon:Number($('inpBaseLon').value), baseRaioMetros:Math.max(30, Number($('inpBaseRaio').value)||500) }); await salvarTudo(); });
    $('btnSalvarFirebaseProprio').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Exclusivo Administrador.');
      const obj = window.EscalaCloud.extrairObjetoFirebase($('txtFirebaseConfigJson').value);
      if (!obj) return toast('Cole um firebaseConfig válido.');
      if (obj.projectId === 'cco-viaturas') return toast('BLOQUEADO: Esse é o banco do CCO Viaturas! Crie um novo projeto separado.');
      $('statusDbProprio').textContent = 'Testando...';
      const t = await window.EscalaCloud.testarConexaoFirebase(obj);
      if (!t.ok) { $('statusDbProprio').textContent = 'Erro: ' + (t.erro||''); return toast('Falha na conexão.'); }
      window.EscalaCloud.salvarConfigFirebase(obj); ESTADO.config.nuvemAtiva = true; $('chkNuvemAtiva').checked = true;
      await salvarTudo(true); renderConfigBase(); toast(`Firebase "${obj.projectId}" conectado!`);
    });
    $('btnDesconectarFirebase').addEventListener('click', async () => { if (!isAdmin()) return toast('Exclusivo Administrador.'); window.EscalaCloud.salvarConfigFirebase(null); ESTADO.config.nuvemAtiva = false; $('chkNuvemAtiva').checked = false; await salvarTudo(true); renderConfigBase(); atualizarBadgeSync('Local', 'badge-neutro'); toast('Modo local ativo.'); });
    $('chkNuvemAtiva').addEventListener('change', async () => { if (!isAdmin()) { $('chkNuvemAtiva').checked = !!ESTADO.config.nuvemAtiva; return; } if ($('chkNuvemAtiva').checked && !window.EscalaCloud.lerConfigFirebase()) { $('chkNuvemAtiva').checked = false; return toast('Configure o firebaseConfig primeiro.'); } ESTADO.config.nuvemAtiva = $('chkNuvemAtiva').checked; await salvarTudo(); renderConfigBase(); });
    $('btnSyncAgora').addEventListener('click', async () => { if (!isAdmin()) return; if (!window.EscalaCloud.lerConfigFirebase()) return toast('Modo local ativo.'); const r = await window.EscalaCloud.sincronizarBaixarNuvem(); if (r.ok && r.dados) { ESTADO = r.dados; await window.EscalaCloud.salvarEstadoLocal(ESTADO); atualizarTodasVistas(); toast('Sincronizado!'); } else await salvarTudo(); });
    $('btnAlterarMinhaSenha').addEventListener('click', irParaAlterarMinhaSenha);
    $('btnExportarBackup').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Exclusivo Administrador.');
      const pac = { sistema:'GCM_VALP_ESCALA_OFICIAL', exportadoEm:new Date().toISOString(), estado:ESTADO, usuarios:window.EscalaCloud.lerUsuariosLocal() };
      if (window.escalaAPI?.exportarBackup) { const r = await window.escalaAPI.exportarBackup(pac); if (r?.ok) toast('Backup salvo em: '+r.caminho); return; }
      const b = new Blob([JSON.stringify(pac,null,2)], { type:'application/json' }), u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = `backup-gcm-escala-${hojeISO()}.json`; a.click(); URL.revokeObjectURL(u); toast('Backup baixado!');
    });
    $('btnImportarBackup').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Exclusivo Administrador.');
      if (window.escalaAPI?.importarBackup) { const r = await window.escalaAPI.importarBackup(); if (r?.ok && r.dados?.estado) { ESTADO = r.dados.estado; if (Array.isArray(r.dados.usuarios)) window.EscalaCloud.salvarUsuariosLocal(r.dados.usuarios); await salvarTudo(); atualizarTodasVistas(); toast('Backup restaurado!'); } return; }
      $('inpFileBackup').click();
    });
    $('inpFileBackup').addEventListener('change', async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try { const p = JSON.parse(await f.text()); if (!p.estado?.efetivo) throw new Error('Inválido.'); ESTADO = p.estado; if (Array.isArray(p.usuarios)) window.EscalaCloud.salvarUsuariosLocal(p.usuarios); await salvarTudo(); atualizarTodasVistas(); toast('Backup restaurado!'); } catch (er) { toast('Erro: '+er.message); }
      e.target.value = '';
    });
  }


  // =========================================================================
  // INSTALACAO DIRETA NO CELULAR EM 1 TOQUE (ZERO LINKS EXTERNOS)
  // =========================================================================
  function estaEmModoAppInstalado() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
      || window.navigator.standalone === true
      || !!window.escalaAPI
      || !!window.__pwaInstalado;
  }

  function detectarNavegadorInterno() {
    const ua = navigator.userAgent || '';
    if (/WhatsApp/i.test(ua)) return 'WhatsApp';
    if (/Instagram|FBAN|FBAV/i.test(ua)) return 'Instagram/Facebook';
    if (/wv\)/i.test(ua) && /Android/i.test(ua)) return 'navegador interno do aplicativo';
    return '';
  }

  function ehIphoneOuIpad() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
  }

  function atualizarBotoesInstalacaoDireta() {
    const instalado = estaEmModoAppInstalado();
    const temPrompt = !!window.__pwaInstallEvent;
    const dispensado = sessionStorage.getItem('gcm_install_dispensado') === '1';

    const barLogin = $('bannerInstallDiretoLogin');
    const barApp = $('bannerInstallDiretoApp');
    if (barLogin) barLogin.classList.toggle('oculto', instalado || !temPrompt);
    if (barApp) barApp.classList.toggle('oculto', instalado || !temPrompt || dispensado);

    const bAuth = $('btnInstalarAppAuth');
    const bSide = $('btnInstalarAppSide');
    if (bAuth) {
      bAuth.classList.toggle('oculto', instalado);
      bAuth.textContent = temPrompt ? 'Instalar App Agora (1 Toque)' : 'Instalar App no Celular';
    }
    if (bSide) {
      bSide.classList.toggle('oculto', instalado);
      bSide.textContent = temPrompt ? 'Instalar App Agora (1 Toque)' : 'Instalar App no Celular';
    }
  }

  async function acionarInstalacaoDiretaNoCelular() {
    if (estaEmModoAppInstalado()) {
      toast('O aplicativo Escala GCM já está instalado neste aparelho!');
      return;
    }

    // 1. Disparo DIRETO do instalador nativo do Android / Chrome / Edge (ZERO modal, ZERO outro site!)
    const evPrompt = window.__pwaInstallEvent;
    if (evPrompt && typeof evPrompt.prompt === 'function') {
      try {
        evPrompt.prompt();
        const escolha = await evPrompt.userChoice;
        if (escolha && escolha.outcome === 'accepted') {
          window.__pwaInstallEvent = null;
          window.__pwaInstalado = true;
          atualizarBotoesInstalacaoDireta();
          toast('Instalando o aplicativo Escala GCM diretamente no seu celular...');
          return;
        }
        toast('Instalação cancelada. Você pode tocar em Instalar novamente quando quiser.');
        return;
      } catch (_) {}
    }

    // 2. Se o prompt nativo ainda nao estiver disponivel, explica o motivo exato SEM nenhum link externo
    const ehLocalFile = location.protocol === 'file:';
    const navInterno = detectarNavegadorInterno();
    let corpo = '';

    if (ehLocalFile) {
      corpo = '<div class="alerta-inline erro">Você abriu o arquivo solto do disco (file://). Para instalar no celular, abra o link publicado no GitHub Pages pelo Chrome.</div>';
    } else if (navInterno) {
      corpo = `
        <div class="alerta-inline erro">Você abriu o link por dentro do <strong>${esc(navInterno)}</strong>, que bloqueia o botão de instalação do celular.</div>
        <div class="install-secao mt-8">
          <h4>Como instalar em 2 toques (sem sair do seu site):</h4>
          <div class="install-passo"><strong>1.</strong> Toque nos <strong>3 pontinhos (⋮)</strong> no canto superior direito desta tela e escolha <strong>Abrir no Chrome</strong>.</div>
          <div class="install-passo"><strong>2.</strong> Assim que abrir no Chrome, toque em <strong>Instalar Agora</strong> (ou nos 3 pontinhos do Chrome → <strong>Instalar aplicativo</strong>).</div>
        </div>
      `;
    } else if (ehIphoneOuIpad()) {
      corpo = `
        <div class="install-secao">
          <h4>Instalar no iPhone / iPad (Safari):</h4>
          <div class="install-passo"><strong>1.</strong> Toque no botão <strong>Compartilhar</strong> (quadrado com seta para cima na parte inferior do Safari).</div>
          <div class="install-passo"><strong>2.</strong> Role para baixo e toque em <strong>Adicionar à Tela de Início</strong> → <strong>Adicionar</strong>.</div>
        </div>
      `;
    } else {
      corpo = `
        <div class="install-secao">
          <h4>Instalar Direto pelo Navegador (Android / PC):</h4>
          <p class="subtexto">O botão automático de instalação aparece assim que o Chrome termina de atualizar os arquivos. Se não abriu sozinho agora, faça direto aqui no Chrome em 2 toques:</p>
          <div class="install-passo"><strong>1.</strong> Toque nos <strong>3 pontinhos (⋮)</strong> no canto superior direito do Chrome.</div>
          <div class="install-passo"><strong>2.</strong> Toque em <strong>Instalar aplicativo</strong> (ou <strong>Adicionar à tela inicial</strong> → <strong>Instalar</strong>).</div>
          <div class="install-passo"><strong>Obs.:</strong> Se aparecer "Abrir aplicativo" em vez de "Instalar", o app já está salvo na sua gaveta de aplicativos com o nome <strong>Escala GCM</strong>.</div>
        </div>
      `;
    }

    abrirModal('Instalar Aplicativo no Celular', corpo, [{ texto: 'Entendi', classe: 'btn-primario', onClick: fecharModal }]);
  }

  window.addEventListener('gcm:pwa-pronto', atualizarBotoesInstalacaoDireta);
  window.addEventListener('gcm:pwa-instalado', () => {
    atualizarBotoesInstalacaoDireta();
    toast('Aplicativo Escala GCM instalado na tela inicial do celular!');
  });

  function normalizarEMigrarEstado(carregado) {
    const padrao = criarEstadoInicial();
    if (!carregado || !Array.isArray(carregado.efetivo) || !Array.isArray(carregado.postos)) {
      return padrao;
    }
    // Preserva 100% dos dados existentes de qualquer versao anterior (v2..v12+) sem nunca resetar!
    const st = Object.assign({}, padrao, carregado);
    st.config = Object.assign({}, padrao.config, carregado.config || {});
    st.config.responsaveis = Object.assign({}, padrao.config.responsaveis, (carregado.config && carregado.config.responsaveis) || {});
    st.config.bancoHoras = Object.assign({}, padrao.config.bancoHoras, (carregado.config && carregado.config.bancoHoras) || {});
    if (!st.justificativas) st.justificativas = {};
    if (!st.auditoriasIdentidade) st.auditoriasIdentidade = {};
    if (!Array.isArray(st.afastamentos)) st.afastamentos = [];
    if (!Array.isArray(st.auditorias30Dias)) st.auditorias30Dias = [];
    if (!Array.isArray(st.eventos)) st.eventos = [];
    if (!Array.isArray(st.permutas)) st.permutas = [];
    if (!Array.isArray(st.bancoHorasMovs)) st.bancoHorasMovs = [];
    if (!Array.isArray(st.documentosAutenticados)) st.documentosAutenticados = [];
    if (!Array.isArray(st.pontos)) st.pontos = [];
    if (!st.cartoesDia) st.cartoesDia = {};
    if (!st.cartoesModelo) st.cartoesModelo = padrao.cartoesModelo;
    if (!st.equipesMontagem) st.equipesMontagem = padrao.equipesMontagem;
    // Garante poligono nos postos antigos que ainda nao tinham poligono salvo
    st.postos.forEach(p => {
      if (!p.poligono) p.poligono = POLIGONOS_PADRAO[p.id] || POLIGONOS_PADRAO['MUNICIPIO'];
    });
    st.versao = 18;
    return st;
  }

  async function init() {
    const temaSalvo = localStorage.getItem('gcm_valp_escala_tema') || localStorage.getItem('escala_gcm_tema_v12') || localStorage.getItem('escala_gcm_tema_v11') || 'claro';
    aplicarTema(temaSalvo);
    atualizarBotoesInstalacaoDireta();
    const carregado = await window.EscalaCloud.carregarEstadoLocal();
    ESTADO = normalizarEMigrarEstado(carregado);
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    registrarEventos();
    const s = window.EscalaCloud.lerSessao();
    if (s && s.login) iniciarAppLogado(s);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
