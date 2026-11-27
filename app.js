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
    secEscalas: 'Escala Contínua 24x72 e Permutas',
    secCartao: 'Cartão Programa Completo e Mapa dos Setores',
    secBancoHoras: 'Banco de Horas e Horas Extras',
    secEventos: 'Eventos e Operações Extras',
    secEquipeDetalhe: 'Detalhamento da Equipe',
    secAutenticacao: 'Validar Autenticidade (SHA-256)',
    secEfetivo: 'Efetivo da Guarda (64)',
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
        obs: 'Informar ao CCO o início e o término de cada PB. Registrar saída/retorno de almoço e saída final na Folha de Ponto com KM final anotado.'
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
      versao: 6,
      config: {
        dataBaseAlfa: hojeISO(),
        horarioTroca: '07:00 às 07:00',
        baseNome: 'Base Operacional — GCM Valparaíso de Goiás',
        baseLat: -16.0658, baseLon: -47.9756, baseRaioMetros: 500,
        nuvemAtiva: false,
        bancoHoras: { carga24: 24, cargaAdm: 8, valorHora: 0, mult50: 1.5, mult100: 2.0 },
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
      justificativas: {}
    };
  }

  // =========================================================================
  // CONTROLE DE ACESSO (RBAC RIGIDO) E AUXILIARES
  // =========================================================================
  function isAdmin() { return !!(SESSAO && SESSAO.perfil === 'ADMIN'); }
  function podeEditarEscala() { return !!(SESSAO && (SESSAO.perfil === 'ADMIN' || SESSAO.perfil === 'ESCALANTE')); }

  function aplicarPermissoesVisuais() {
    const perfil = SESSAO?.perfil || 'AGENTE';
    document.body.setAttribute('data-perfil', perfil);
    // Trava inputs do Cartao Programa e Eventos para perfil AGENTE (somente leitura)
    const somenteLeitura = !podeEditarEscala();
    ['#secCartao input:not(#inpCartaoData):not(#chkMostrarTodosSetores)', '#secCartao textarea', '#secEventos input', '#secEventos select', '#secEventos textarea'].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => { el.disabled = somenteLeitura; });
    });
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
    atualizarBadgeSync('Salvo Local', 'badge-ok');
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      atualizarBadgeSync('Sincronizando...', 'badge-warn');
      const r = await window.EscalaCloud.sincronizarEnviarNuvem(ESTADO);
      atualizarBadgeSync(r.ok ? 'Nuvem OK' : 'Local', r.ok ? 'badge-ok' : 'badge-warn');
    }
    if (!silencioso) toast('Alterações salvas.');
    return true;
  }

  function agentePorId(id) { return (ESTADO.efetivo || []).find(x => x.id === id); }
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

    // 5. Qualquer guarda que bateu ponto na data
    (ESTADO.pontos || []).filter(p => p.dataLocal === dataISO).forEach(p => {
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
    localStorage.setItem('escala_gcm_tema_v6', t);
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
    if (window.innerWidth <= 1024) {
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
      hashAnterior || 'GENESIS_GCM_V6',
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
    const hashSha256 = window.EscalaCloud.sha256Hex(`GCM_VALP_DOC_V6|${tipoDoc}|${titulo}|${emitidoEm}|${emissor}|${qtdRegistros || 0}|${textoLimpo}`);
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
  function resumirDiaAgente(dataISO, agenteId, permutaSaida) {
    const pts = (ESTADO.pontos || []).filter(p => p.dataLocal === dataISO && p.agenteId === agenteId).slice().reverse();
    const pegar = (tipo) => pts.find(x => x.tipo === tipo);
    const ent = pegar('ENTRADA'), sAlm = pegar('SAIDA_ALMOCO'), rAlm = pegar('RETORNO_ALMOCO'), sai = pegar('SAIDA');
    const just = (ESTADO.justificativas || {})[`${dataISO}|${agenteId}`] || null;
    let status = 'PENDENTE';
    let motivoAuto = null;
    if (just) {
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
    return { ent, sAlm, rAlm, sai, just, motivoAuto, status, pts };
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
    let emServico = 0, pendentes = 0, faltas = 0, justif = 0;
    info.escalados.forEach(item => {
      const r = resumirDiaAgente(hoje, item.agente.id, item.permutaSaida);
      if (r.status === 'EM_SERVICO' || r.status === 'PRESENTE') emServico++;
      else if (r.status === 'FALTOU') faltas++;
      else if (r.status === 'JUSTIFICADO') justif++;
      else pendentes++;
    });
    const corEq = EQUIPE_CORES[info.ciclo.equipeServico]?.cor || '#18181B';
    $('faixaPlantaoHoje').style.borderLeftColor = corEq;
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
    $('inpIdentificaGuarda').value = `${ag.matricula} — ${ag.nome}`;
    const hoje = hojeISO();
    const { escalados } = obterEscaladosDaData(hoje);
    const escHoje = escalados.find(x => x.agente.id === ag.id);
    const resumo = resumirDiaAgente(hoje, ag.id, escHoje?.permutaSaida);

    if (!resumo.ent) $('selPontoTipo').value = 'ENTRADA';
    else if (!resumo.sAlm) $('selPontoTipo').value = 'SAIDA_ALMOCO';
    else if (!resumo.rAlm) $('selPontoTipo').value = 'RETORNO_ALMOCO';
    else $('selPontoTipo').value = 'SAIDA';

    const infSetor = descobrirSetorDoAgente(ag);
    $('inpPontoPosto').value = escHoje ? escHoje.posto : infSetor.nome;

    const card = $('cardGuardaIdentificado');
    card.classList.remove('oculto');
    card.innerHTML = `
      <div class="card-cab">
        <strong>Nº ${esc(ag.matricula)} — ${esc(ag.nome)}</strong>
        <span class="insig eq-${esc(ag.equipe)}">${esc(ag.equipe)}</span>
      </div>
      <div>${escHoje ? `<span class="badge badge-ok">ESCALADO HOJE</span> · ${esc(escHoje.posto)} (${esc(escHoje.funcao)})` : `<span class="badge badge-warn">FORA DA ESCALA DE HOJE</span> · Registro de permuta/extra`}</div>
      <div class="subtexto">Batidas hoje: Ent. <strong>${resumo.ent ? resumo.ent.horaLocal.slice(0,5) : '—'}</strong> · Almoço <strong>${resumo.sAlm ? resumo.sAlm.horaLocal.slice(0,5) : '—'}/${resumo.rAlm ? resumo.rAlm.horaLocal.slice(0,5) : '—'}</strong> · Saída <strong>${resumo.sai ? resumo.sai.horaLocal.slice(0,5) : '—'}</strong></div>
    `;
  }

  function buscarGuardaDigitado() {
    const raw = ($('inpIdentificaGuarda').value || '').trim();
    const box = $('listaSugestoesGuarda');
    if (!raw) { guardaSelecionadoPonto = null; $('cardGuardaIdentificado').classList.add('oculto'); box.classList.add('oculto'); return; }
    const q = raw.toLowerCase(), numLimpo = raw.replace(/\D/g, '').replace(/^0+/, '');
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    const exatoNum = numLimpo ? ativos.find(a => a.matricula.replace(/\D/g,'').replace(/^0+/, '') === numLimpo && /^\d+$/.test(raw.replace(/^gcm-?/i, ''))) : null;
    if (exatoNum) { selecionarGuardaParaPonto(exatoNum); return; }

    const matches = ativos.filter(a => a.nome.toLowerCase().includes(q) || (a.nomeGuerra||'').toLowerCase().includes(q) || a.matricula.toLowerCase().includes(q) || (numLimpo && a.matricula.replace(/\D/g,'').replace(/^0+/,'') === numLimpo)).slice(0, 6);
    if (!matches.length) {
      guardaSelecionadoPonto = null; $('cardGuardaIdentificado').classList.add('oculto');
      box.innerHTML = '<div class="sug-item"><span class="subtexto">Nenhum guarda encontrado.</span></div>'; box.classList.remove('oculto'); return;
    }
    if (matches.length === 1 && matches[0].nome.toLowerCase() === q) { selecionarGuardaParaPonto(matches[0]); return; }
    box.innerHTML = matches.map(a => `<div class="sug-item" data-pick-ag="${esc(a.id)}"><span><strong>Nº ${esc(a.matricula)}</strong> — ${esc(a.nome)}</span><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span></div>`).join('');
    box.classList.remove('oculto');
    box.querySelectorAll('[data-pick-ag]').forEach(el => el.addEventListener('click', () => selecionarGuardaParaPonto(agentePorId(el.getAttribute('data-pick-ag')))));
  }

  function renderResumoEscaladosHoje() {
    const hoje = hojeISO(), { ciclo, escalados } = obterEscaladosDaData(hoje);
    $('lblResumoEscaladosHoje').textContent = `${formatarDataBR(hoje)} · Equipe ${ciclo.equipeServico} (${escalados.length} escalados)`;
    $('tbodyResumoHoje').innerHTML = escalados.map(item => {
      const a = item.agente, r = resumirDiaAgente(hoje, a.id, item.permutaSaida), st = estiloStatusPonto(r, true);
      return `<tr><td><strong>${esc(a.matricula)}</strong></td><td><strong>${esc(a.nomeGuerra || a.nome)}</strong></td><td>${esc(item.posto)}</td><td>${r.ent ? r.ent.horaLocal.slice(0,5) : '—'}</td><td>${r.sAlm ? r.sAlm.horaLocal.slice(0,5) : '—'}${r.rAlm ? '–' + r.rAlm.horaLocal.slice(0,5) : ''}</td><td>${r.sai ? r.sai.horaLocal.slice(0,5) : '—'}</td><td><span class="badge ${st.cls}">${esc(st.txt)}</span></td></tr>`;
    }).join('') || '<tr><td colspan="7" class="subtexto" style="text-align:center;">Nenhum escalado hoje.</td></tr>';
  }

  function renderFrequenciaDia() {
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
      const celH = (pt) => pt ? `<strong>${pt.horaLocal.slice(0,5)}</strong>${pt.foto ? ` <img src="${pt.foto}" class="foto-thumb" style="width:24px;height:24px;vertical-align:middle;" data-ver-ponto="${esc(pt.id)}">` : ''}` : '<span class="subtexto">—</span>';
      return `
        <tr>
          <td><strong>${esc(a.matricula)}</strong></td>
          <td><strong>${esc(a.nome)}</strong></td>
          <td><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span> <span class="subtexto">${esc(item.posto)}</span></td>
          <td>${celH(r.ent)}</td><td>${celH(r.sAlm)}</td><td>${celH(r.rAlm)}</td><td>${celH(r.sai)}</td>
          <td><span class="badge ${st.cls}">${esc(st.txt)}</span></td>
          <td class="so-gestao">${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-just-ag="${esc(a.id)}">${r.just ? 'Alterar' : 'Falta / Justificar'}</button>` : '—'}</td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="9" class="subtexto" style="text-align:center;padding:16px;">Nenhum registro para este filtro.</td></tr>';

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

  function capturarFotoComCarimbo() {
    const v = $('videoCamera'), c = $('canvasFoto'); if (!v || !v.videoWidth) return toast('Aguarde a câmera.');
    const w = 420, h = Math.round((v.videoHeight / v.videoWidth) * w) || 315;
    c.width = w; c.height = h; const ctx = c.getContext('2d'); ctx.drawImage(v, 0, 0, w, h);
    const ag = guardaSelecionadoPonto, tipo = TIPO_PONTO_LABEL[$('selPontoTipo').value] || $('selPontoTipo').value, agora = formatarDataHoraBR(new Date().toISOString());
    ctx.fillStyle = 'rgba(0,0,0,0.82)'; ctx.fillRect(0, h - 50, w, 50); ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px monospace'; ctx.fillText(`GCM VALPARAÍSO-GO · ${tipo.toUpperCase()} · ${agora}`, 8, h - 32);
    ctx.font = '10px monospace'; ctx.fillText(`Nº ${ag ? ag.matricula + ' — ' + ag.nome : 'Não identificado'}`, 8, h - 16);
    if (locAtualPonto?.lat) ctx.fillText(`GPS: ${locAtualPonto.lat.toFixed(5)}, ${locAtualPonto.lon.toFixed(5)}`, 8, h - 4);
    fotoCapturadaDataUrl = c.toDataURL('image/jpeg', 0.60);
    pararCamera(); v.classList.add('oculto');
    const img = $('imgPreviewFoto'); img.src = fotoCapturadaDataUrl; img.classList.remove('oculto');
    $('btnCapturarFoto').disabled = true; $('btnRefazerFoto').disabled = false;
    $('statusFoto').textContent = 'Foto OK'; $('statusFoto').className = 'badge badge-ok';
  }

  function distanciaMetros(la1, lo1, la2, lo2) {
    const R = 6371000, rad = v => v * Math.PI / 180;
    const a = Math.sin(rad(la2-la1)/2)**2 + Math.cos(rad(la1))*Math.cos(rad(la2))*Math.sin(rad(lo2-lo1)/2)**2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  async function consultarEnderecoReal(lat, lon) {
    const fj = async (u) => { const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 4500); try { const r = await fetch(u, { signal: ctrl.signal }); clearTimeout(t); return r.ok ? await r.json() : null; } catch (_) { clearTimeout(t); return null; } };
    const nom = await fj(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=pt-BR`);
    if (nom?.address) {
      const a = nom.address, txt = [(a.road||a.suburb||'') + (a.house_number ? ', '+a.house_number : ''), a.suburb||a.neighbourhood||'', a.city||a.town||a.municipality||'', a.state_code||a.state||''].filter(Boolean).join(', ');
      if (txt.trim()) return txt;
    }
    const ph = await fj(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`);
    if (ph?.features?.[0]?.properties) {
      const p = ph.features[0].properties, txt = [p.street||p.name, p.district||p.locality, p.city, p.state].filter(Boolean).join(', ');
      if (txt.trim()) return txt;
    }
    const bdc = await fj(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`);
    if (bdc && (bdc.city || bdc.locality)) return [bdc.locality, bdc.city, bdc.principalSubdivision].filter(Boolean).join(', ');
    return `Coordenadas: ${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  }

  async function coletarLocalizacaoAutomatica(forcar) {
    if (!navigator.geolocation) {
      if ($('statusGpsBadge')) { $('statusGpsBadge').textContent = 'GPS Indisponível'; $('statusGpsBadge').className = 'badge badge-erro'; }
      return null;
    }
    if (!forcar && locAtualPonto && (Date.now() - locAtualTs) < 120000) return locAtualPonto;
    if (promessaGpsAtiva) return promessaGpsAtiva;

    promessaGpsAtiva = (async () => {
      if ($('statusGpsBadge')) { $('statusGpsBadge').textContent = 'Capturando automaticamente...'; $('statusGpsBadge').className = 'badge badge-pendente'; }
      const amostras = []; let errG = null;
      await new Promise(resolve => {
        let fim = false; const done = () => { if (fim) return; fim = true; try { navigator.geolocation.clearWatch(wid); } catch (_) {} resolve(); };
        const wid = navigator.geolocation.watchPosition(pos => {
          const c = pos.coords;
          amostras.push({ lat: c.latitude, lon: c.longitude, accuracy: c.accuracy, altitude: c.altitude, ts: pos.timestamp || Date.now(), mocked: !!(pos.mocked || c.mocked) });
          if (amostras.length >= 3) done();
        }, e => { errG = e; done(); }, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 });
        setTimeout(done, 3500);
      });
      if (!amostras.length) {
        if ($('statusGpsBadge')) { $('statusGpsBadge').textContent = 'Permita o GPS'; $('statusGpsBadge').className = 'badge badge-erro'; }
        if ($('painelResultadoGps')) { $('painelResultadoGps').innerHTML = `<div class="alerta-inline erro">Ative a permissão de localização no aparelho (${esc(errG ? errG.message : 'GPS desligado')}).</div>`; }
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
      const raio = Number(ESTADO.config.baseRaioMetros || 500);
      const resumoDist = distBase < 1000 ? `${distBase}m da Base` : `${(distBase/1000).toFixed(2)} km da Base`;
      const endereco = await consultarEnderecoReal(ult.lat, ult.lon);
      const status = irregular ? 'IRREGULAR' : (distBase <= raio ? 'OK' : 'FORA_BASE');
      locAtualPonto = { lat: ult.lat, lon: ult.lon, accuracy: Math.round(ult.accuracy), distBase, resumoDist, endereco, status };
      locAtualTs = Date.now();

      const stLabel = status === 'OK' ? 'Local Automático OK' : (status === 'FORA_BASE' ? 'Fora da Base' : 'Sinal Irregular');
      const stCls = status === 'OK' ? 'badge-ok' : (status === 'FORA_BASE' ? 'badge-pendente' : 'badge-erro');
      if ($('statusGpsBadge')) { $('statusGpsBadge').textContent = stLabel; $('statusGpsBadge').className = 'badge ' + stCls; }
      if ($('painelResultadoGps')) {
        $('painelResultadoGps').innerHTML = `<div><strong>Endereço:</strong> ${esc(endereco)}</div><div class="subtexto">GPS automático: ${ult.lat.toFixed(6)}, ${ult.lon.toFixed(6)} (±${Math.round(ult.accuracy)}m) · <strong>${esc(resumoDist)}</strong></div>`;
      }
      return locAtualPonto;
    })();
    try { return await promessaGpsAtiva; } finally { promessaGpsAtiva = null; }
  }

  async function confirmarRegistroPonto() {
    const err = $('msgPontoErro'); err.classList.add('oculto');
    if (!guardaSelecionadoPonto) { err.textContent = 'Digite seu nº provisório (ex.: 03) ou nome completo e selecione sua identificação.'; err.classList.remove('oculto'); return; }
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

    btnConf.textContent = 'Gravando e autenticando ponto...';
    const ag = guardaSelecionadoPonto;
    const agoraIso = new Date().toISOString();
    const dt = new Date(agoraIso), p2 = n => String(n).padStart(2,'0');
    const dataLocal = `${dt.getFullYear()}-${p2(dt.getMonth()+1)}-${p2(dt.getDate())}`;
    const horaLocal = `${p2(dt.getHours())}:${p2(dt.getMinutes())}:${p2(dt.getSeconds())}`;
    const tipo = $('selPontoTipo').value;
    const hashAnterior = ESTADO.pontos[0]?.hashIntegridade || 'GENESIS_GCM_V6';
    const randHex = window.EscalaCloud.sha256Hex(agoraIso + ag.matricula + Math.random()).slice(0, 6).toUpperCase();
    const protocolo = `PT-${dataLocal.replace(/-/g,'')}-${ag.matricula}-${randHex}`;

    const reg = {
      id: 'pt_' + Date.now().toString(36),
      protocolo,
      agenteId: ag.id, agenteNome: ag.nome, agenteMatricula: ag.matricula, equipe: ag.equipe,
      tipo, posto: $('inpPontoPosto').value.trim() || 'Base GCM', obs: $('inpPontoObs').value.trim(),
      timestampIso: agoraIso, dataLocal, horaLocal,
      foto: fotoCapturadaDataUrl, localizacao: locAtualPonto,
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

    selecionarGuardaParaPonto(ag);
    renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos();
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
          <div><strong>Localização:</strong> ${esc(loc.endereco || '—')} (${esc(loc.resumoDist || '')})</div>
          <div><strong>Assinatura Digital SHA-256:</strong><div class="hash-mono mt-4">${esc(pt.hashIntegridade)}</div></div>
        </div>
        <div style="text-align:center;"><img src="${pt.foto}" style="max-height:170px;border-radius:6px;border:1px solid var(--border);"></div>
      `,
      [
        { texto: 'Copiar Recibo (WhatsApp)', classe: 'btn-sec', onClick: () => {
          const txt = `*COMPROVANTE DE PONTO — GCM VALPARAÍSO*\nProtocolo: *${pt.protocolo}*\nGuarda: Nº ${pt.agenteMatricula} — ${pt.agenteNome}\nBatida: *${tipoTxt}*\nData/Hora: *${formatarDataBR(pt.dataLocal)} às ${pt.horaLocal}*\nLocal: ${loc.endereco || '—'}\nSHA-256: ${pt.hashIntegridade.slice(0,24)}...`;
          if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(() => toast('Recibo copiado!'));
        }},
        { texto: 'Baixar Comprovante em PDF', classe: 'btn-primario', onClick: () => gerarPdfComprovantePonto(pt) },
        { texto: 'Fechar', classe: 'btn-sec', onClick: fecharModal }
      ]
    );
  }

  function filtrarPontosHistorico() {
    const m = $('fltPontoMes').value||'', b = ($('fltPontoBusca').value||'').trim().toLowerCase(), tp = $('fltPontoTipo').value||'', st = $('fltPontoStatus').value||'';
    return (ESTADO.pontos||[]).filter(p =>
      (!m || (p.dataLocal||'').startsWith(m)) &&
      (!tp || p.tipo === tp) &&
      (!st || (p.localizacao?.status||'') === st) &&
      (!b || (p.agenteNome||'').toLowerCase().includes(b) || (p.agenteMatricula||'').toLowerCase().includes(b) || (p.protocolo||'').toLowerCase().includes(b))
    );
  }

  function abrirDetalhePonto(id) {
    const pt = (ESTADO.pontos||[]).find(x => x.id === id); if (!pt) return;
    const loc = pt.localizacao || {};
    const stTxt = loc.status === 'OK' ? 'Local Regular' : (loc.status === 'FORA_BASE' ? 'Fora da Base' : 'Sinal Irregular');
    abrirModal(
      `Registro — Nº ${pt.agenteMatricula} ${pt.agenteNome}`,
      `<div style="text-align:center;"><img src="${pt.foto}" style="max-width:100%;max-height:220px;border-radius:6px;border:1px solid var(--border);"></div>
       <div class="box-borda" style="font-size:12px;">
         <div><strong>Protocolo:</strong> <code>${esc(pt.protocolo || pt.id)}</code></div>
         <div><strong>Batida:</strong> ${esc(TIPO_PONTO_LABEL[pt.tipo] || pt.tipo)} · ${formatarDataBR(pt.dataLocal)} às ${esc(pt.horaLocal)}</div>
         <div><strong>Equipe / Posto:</strong> ${esc(pt.equipe)} · ${esc(pt.posto)}</div>
         <div><strong>Endereço:</strong> ${esc(loc.endereco || '—')} (${esc(loc.resumoDist || '')})</div>
         <div><strong>Verificação:</strong> ${esc(stTxt)}</div>
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
      const txt = st === 'OK' ? 'Regular' : (st === 'FORA_BASE' ? 'Fora da Base' : 'Irregular');
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
            <button type="button" class="btn btn-sec btn-sm" data-ir-freq="${iso}">Ponto</button>
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
      modoMarcarPbMapa = false; $('avisoCliqueMapa').classList.add('oculto'); $('btnModoMarcarPb').textContent = '+ Marcar PB clicando no Mapa';
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
    const pts = (ESTADO.pontos || []).filter(p => p.agenteId === agenteId && (!mesFiltro || (p.dataLocal||'').startsWith(mesFiltro)));
    const porDia = {};
    pts.forEach(p => { porDia[p.dataLocal] = porDia[p.dataLocal] || []; porDia[p.dataLocal].push(p); });
    let totalMin = 0;
    Object.values(porDia).forEach(arr => {
      const ord = arr.slice().reverse();
      const ent = ord.find(x => x.tipo === 'ENTRADA'), sai = ord.find(x => x.tipo === 'SAIDA');
      if (ent && sai) {
        let diff = (new Date(sai.timestampIso) - new Date(ent.timestampIso)) / 60000;
        if (diff < 0) diff += 1440; // virou meia-noite
        const sA = ord.find(x => x.tipo === 'SAIDA_ALMOCO'), rA = ord.find(x => x.tipo === 'RETORNO_ALMOCO');
        if (sA && rA) {
          const alm = (new Date(rA.timestampIso) - new Date(sA.timestampIso)) / 60000;
          if (alm > 0 && alm < 240) diff -= alm;
        }
        if (diff > 0 && diff < 2880) totalMin += diff;
      }
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
    const regras = ESTADO.config.bancoHoras || { carga24: 24, cargaAdm: 8, mult50: 1.5, mult100: 2.0 };
    const chavesExistentes = new Set((ESTADO.bancoHorasMovs || []).filter(m => m.chaveAuto).map(m => m.chaveAuto));
    const porAgenteDia = {};
    (ESTADO.pontos || []).forEach(p => {
      const k = `${p.agenteId}|${p.dataLocal}`;
      porAgenteDia[k] = porAgenteDia[k] || [];
      porAgenteDia[k].push(p);
    });
    let novos = 0;
    Object.entries(porAgenteDia).forEach(([k, arr]) => {
      if (chavesExistentes.has(k)) return;
      const ord = arr.slice().reverse();
      const ent = ord.find(x => x.tipo === 'ENTRADA'), sai = ord.find(x => x.tipo === 'SAIDA');
      if (!ent || !sai) return;
      const ag = agentePorId(ent.agenteId); if (!ag) return;
      let diffMin = (new Date(sai.timestampIso) - new Date(ent.timestampIso)) / 60000;
      if (diffMin < 0) diffMin += 1440;
      const sA = ord.find(x => x.tipo === 'SAIDA_ALMOCO'), rA = ord.find(x => x.tipo === 'RETORNO_ALMOCO');
      if (sA && rA) { const alm = (new Date(rA.timestampIso) - new Date(sA.timestampIso)) / 60000; if (alm > 0 && alm < 240) diffMin -= alm; }
      const cargaEsperadaMin = (ag.equipe === 'ADM' ? Number(regras.cargaAdm || 8) : (ag.equipe === '12X36' ? 12 : Number(regras.carga24 || 24))) * 60;
      const excedenteMin = Math.round(diffMin - cargaEsperadaMin);
      if (excedenteMin >= 15) {
        const dow = diaSemanaISO(ent.dataLocal);
        const fator = dow === 0 ? Number(regras.mult100 || 2.0) : Number(regras.mult50 || 1.5);
        const compMin = Math.round(excedenteMin * fator);
        ESTADO.bancoHorasMovs.unshift({
          id: 'bh_' + Date.now().toString(36) + '_' + novos,
          chaveAuto: k,
          agenteId: ag.id, data: ent.dataLocal,
          tipo: 'PONTO_AUTO', duracaoMin: excedenteMin, fator, computadoMin: compMin,
          motivo: `Excedente apurado automaticamente na Folha de Ponto (${ent.horaLocal.slice(0,5)} às ${sai.horaLocal.slice(0,5)})`,
          por: SESSAO?.nome || 'Sistema', em: new Date().toISOString()
        });
        novos++;
      }
    });
    if (novos > 0) { salvarTudo(true); renderBancoHoras(); toast(`${novos} registro(s) de hora extra apurado(s) pela Folha de Ponto!`); }
    else toast('Nenhum novo excedente acima da carga padrão encontrado nos pontos fechados (Entrada + Saída).');
  }

  function renderBancoHoras() {
    const regras = ESTADO.config.bancoHoras || { carga24: 24, cargaAdm: 8, valorHora: 0, mult50: 1.5, mult100: 2.0 };
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

    // Se perfil AGENTE, filtra automaticamente se tiver matricula vinculada (mas pode consultar a lista ou seu proprio)
    const filtrados = ativos.filter(a => (!fltEq || a.equipe === fltEq) && (!busca || a.nome.toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca)));

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

    const movs = (ESTADO.bancoHorasMovs || []).filter(m => !mes || (m.data||'').startsWith(mes));
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
          <td class="${clsSaldo}">${formatarMinutosHM(bh.saldoMin, true)}</td>
          <td><span class="badge ${a.situacao==='ATIVO'?'badge-ok':'badge-warn'}">${esc(a.situacao)}</span></td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="7" class="subtexto" style="text-align:center;">Nenhum integrante nesta equipe.</td></tr>';
  }

  // =========================================================================
  // 6. VALIDAR AUTENTICIDADE E AUDITORIA DA CADEIA SHA-256
  // =========================================================================
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
    let prev = 'GENESIS_GCM_V6';
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
    $('tbodyEfetivo').innerHTML = lista.map(a => `<tr><td><strong>${esc(a.matricula)}</strong></td><td><strong>${esc(a.nome)}</strong></td><td>${esc(a.nomeGuerra||'—')}</td><td><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span></td><td>${esc(AREAS_LABEL[a.area]||a.area)}</td><td>${esc(FUNCOES_LABEL[a.funcao]||a.funcao)}</td><td><span class="badge ${a.situacao==='ATIVO'?'badge-ok':'badge-warn'}">${esc(a.situacao)}</span></td><td class="so-gestao">${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-ed-ag="${esc(a.id)}">Editar</button> <button type="button" class="btn btn-sec btn-sm" data-del-ag="${esc(a.id)}">X</button>`:'—'}</td></tr>`).join('');
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

  function renderContas() {
    if (!isAdmin()) return;
    const users = window.EscalaCloud.lerUsuariosLocal();
    $('tbodyContas').innerHTML = users.map(u => `<tr><td><strong>${esc(u.login)}</strong> ${u.mestre?'<span class="badge badge-invertido">Mestre</span>':''}</td><td>${esc(u.nome)}</td><td>${esc(u.matricula||'—')}</td><td>${!u.mestre ? `<select data-perfil-u="${esc(u.login)}"><option value="ADMIN" ${u.perfil==='ADMIN'?'selected':''}>Administrador</option><option value="ESCALANTE" ${u.perfil==='ESCALANTE'?'selected':''}>Escalante</option><option value="AGENTE" ${u.perfil==='AGENTE'?'selected':''}>Agente (Consulta e Ponto)</option></select>` : `<span class="badge badge-neutro">ADMIN</span>`}</td><td><span class="badge ${u.aprovado?'badge-ok':'badge-warn'}">${u.aprovado?'Aprovado':'Pendente'}</span></td><td>${!u.mestre ? `<button type="button" class="btn btn-sec btn-sm" data-aprovar-u="${esc(u.login)}">${u.aprovado?'Bloquear':'Aprovar'}</button> <button type="button" class="btn btn-sec btn-sm" data-del-u="${esc(u.login)}">X</button>` : '—'}</td></tr>`).join('');
    $('tbodyContas').querySelectorAll('[data-perfil-u]').forEach(s => s.addEventListener('change', () => { window.EscalaCloud.atualizarUsuario(s.getAttribute('data-perfil-u'), { perfil: s.value }); salvarTudo(true); toast('Nível de acesso atualizado.'); }));
    $('tbodyContas').querySelectorAll('[data-aprovar-u]').forEach(b => b.addEventListener('click', () => { const l = b.getAttribute('data-aprovar-u'), u = window.EscalaCloud.lerUsuariosLocal().find(x => x.login === l); if (u) { window.EscalaCloud.atualizarUsuario(l, { aprovado: !u.aprovado }); renderContas(); salvarTudo(true); } }));
    $('tbodyContas').querySelectorAll('[data-del-u]').forEach(b => b.addEventListener('click', () => { if (!confirm('Excluir conta?')) return; window.EscalaCloud.removerUsuario(b.getAttribute('data-del-u')); renderContas(); salvarTudo(true); }));
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
    return `<div class="pdf-assinaturas"><div class="ass-col"><div class="ass-linha"></div><strong>${esc(r.escalanteNome || 'Responsável pela Escala')}</strong><div>${esc(r.escalanteCargo || 'Escalante GCM')} · Mat.: ${esc(r.escalanteMat || '—')}</div></div><div class="ass-col"><div class="ass-linha"></div><strong>${esc(r.comandoNome || 'Comandante da GCM')}</strong><div>${esc(r.comandoCargo || 'Comandante GCM')} · ${esc(r.comandoMat || '—')}</div></div></div>`;
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
      .pdf-assinaturas { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 18px; break-inside: avoid; page-break-inside: avoid; }
      .ass-col { text-align: center; font-size: 9px; }
      .ass-linha { border-top: 1px solid #141414; margin-bottom: 4px; }
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
    const data = $('inpFreqData').value || hojeISO(), { ciclo, escalados } = obterEscaladosDaData(data);
    const rows = escalados.map(item => {
      const a = item.agente, r = resumirDiaAgente(data, a.id, item.permutaSaida), st = estiloStatusPonto(r, false);
      const corPdf = r.status==='EM_SERVICO'||r.status==='PRESENTE' ? 'background:#E7F4EC;color:#166534;border:1px solid #166534;' : (r.status==='PENDENTE' ? 'background:#FFEDD5;color:#C2410C;border:1px solid #EA580C;' : (r.status==='FALTOU' ? 'background:#F9E6E6;color:#991B1B;border:1px solid #991B1B;' : 'background:#F6EFE0;color:#854D0E;border:1px solid #854D0E;'));
      return `<tr><td style="width:5%;"><strong>${esc(a.matricula)}</strong></td><td style="width:23%;"><strong>${esc(a.nome)}</strong></td><td style="width:18%;">${esc(a.equipe)} · ${esc(item.posto)}</td><td style="width:8%;">${r.ent?r.ent.horaLocal.slice(0,5):'—'}</td><td style="width:8%;">${r.sAlm?r.sAlm.horaLocal.slice(0,5):'—'}</td><td style="width:8%;">${r.rAlm?r.rAlm.horaLocal.slice(0,5):'—'}</td><td style="width:8%;">${r.sai?r.sai.horaLocal.slice(0,5):'—'}</td><td style="width:22%;"><span style="display:inline-block;padding:1.5px 5px;border-radius:3px;font-weight:700;font-size:8px;${corPdf}">${esc(st.txt)}</span></td></tr>`;
    }).join('');
    const corpo = `<table><thead><tr><th style="width:5%;">Nº</th><th style="width:23%;">Guarda GCM</th><th style="width:18%;">Equipe / Setor</th><th style="width:8%;">Entr.</th><th style="width:8%;">S.Alm.</th><th style="width:8%;">R.Alm.</th><th style="width:8%;">Saída</th><th style="width:22%;">Situação / Justificativa</th></tr></thead><tbody>${rows}</tbody></table>`;
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
        <div class="pdf-assinaturas" style="margin-top:26px;">
          <div class="ass-col"><div class="ass-linha"></div><strong>${sol ? esc(sol.nome) : 'Solicitante'}</strong><div>Guarda Solicitante (Nº ${sol ? esc(sol.matricula) : '—'})</div></div>
          <div class="ass-col"><div class="ass-linha"></div><strong>${sub ? esc(sub.nome) : 'Substituto'}</strong><div>Guarda Substituto (Nº ${sub ? esc(sub.matricula) : '—'})</div></div>
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
  function ativarSubtab(idSecao, idSub) {
    const sec = $(idSecao); if (!sec) return;
    sec.querySelectorAll('.subtab').forEach(x => x.classList.toggle('ativo', x.getAttribute('data-sub') === idSub));
    sec.querySelectorAll('.subpainel').forEach(p => p.classList.toggle('ativo', p.id === idSub));
  }

  function abrirAba(idSecao) {
    // Trava rigida de acesso (RBAC): nao-Admin nunca abre secSistema; Agente nunca abre secEfetivo
    if (idSecao === 'secSistema' && !isAdmin()) { toast('Acesso restrito exclusivamente ao Administrador.'); return; }
    if (idSecao === 'secEfetivo' && !podeEditarEscala()) { toast('Acesso restrito à Gestão de Escalas.'); return; }

    document.querySelectorAll('.secao-aba').forEach(s => s.classList.toggle('ativa', s.id === idSecao));
    document.querySelectorAll('.side-btn').forEach(b => b.classList.toggle('ativo', b.getAttribute('data-aba') === idSecao));
    if (idSecao !== 'secEquipeDetalhe') document.querySelectorAll('.insig-btn').forEach(b => b.classList.remove('ativa'));
    if ($('lblTituloPaginaAtual')) $('lblTituloPaginaAtual').textContent = TITULOS_ABAS[idSecao] || 'GCM Valparaíso';
    fecharSidebarMobile();
    if (idSecao !== 'secPonto') pararCamera();
    if (idSecao === 'secPonto') { renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos(); coletarLocalizacaoAutomatica(false); }
    if (idSecao === 'secEscalas') { renderCalendario24(); renderPermutas(); renderQuadroPessoas(); renderMontagemEquipe(); renderSetoresResponsaveis(); renderAdmE12x36(); renderResponsaveis(); }
    if (idSecao === 'secCartao') { popularSelectsCartao(); carregarEditorCartao(); }
    if (idSecao === 'secBancoHoras') renderBancoHoras();
    if (idSecao === 'secEventos') renderListaEventos();
    if (idSecao === 'secEquipeDetalhe') renderTelaEquipeDetalhe();
    if (idSecao === 'secAutenticacao') renderTelaAutenticacao();
    if (idSecao === 'secEfetivo') renderEfetivo();
    if (idSecao === 'secSistema') { renderContas(); renderConfigBase(); }
  }

  function atualizarTodasVistas() {
    renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos();
    renderCalendario24(); renderPermutas(); renderQuadroPessoas(); renderMontagemEquipe(); renderSetoresResponsaveis();
    renderAdmE12x36(); renderResponsaveis(); popularSelectsCartao(); carregarEditorCartao();
    renderBancoHoras(); renderListaEventos(); renderTelaEquipeDetalhe(); renderTelaAutenticacao();
    renderEfetivo(); renderContas(); renderConfigBase(); aplicarPermissoesVisuais();
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
    abrirAba('secPonto');

    if (sessao.matricula) {
      const numL = sessao.matricula.replace(/\D/g,'').replace(/^0+/,'');
      const meu = ESTADO.efetivo.find(a => a.matricula.replace(/\D/g,'').replace(/^0+/,'') === numL);
      if (meu) selecionarGuardaParaPonto(meu);
    }

    if (timerRelogio) clearInterval(timerRelogio);
    timerRelogio = setInterval(() => { if ($('lblRelogioPonto')) $('lblRelogioPonto').textContent = new Date().toLocaleTimeString('pt-BR'); }, 1000);
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      window.EscalaCloud.assinarNuvem(true, (rem) => { if (!rem?.efetivo) return; ESTADO = rem; window.EscalaCloud.salvarEstadoLocal(ESTADO); atualizarBadgeSync('Nuvem OK', 'badge-ok'); atualizarTodasVistas(); });
    }
  }

  function abrirModalAlterarMeuCodigo() {
    abrirModal('Alterar Meu Código de Acesso', `<div class="campo"><label>Novo Código / Senha (mínimo 4 dígitos)</label><input type="password" id="mNovaSenha" minlength="4" placeholder="Mínimo 4 dígitos"></div>`, [{ texto:'Cancelar', classe:'btn-sec', onClick:fecharModal }, { texto:'Salvar', classe:'btn-primario', onClick: () => { const s = $('mNovaSenha').value; if (!s || s.length < 4) return toast('Mínimo 4 dígitos.'); window.EscalaCloud.atualizarUsuario(SESSAO.login, { novaSenha:s }); fecharModal(); salvarTudo(true); toast('Código alterado!'); }}]);
  }

  function registrarEventos() {
    $('btnTema').addEventListener('click', alternarTema);
    $('btnTemaAuth').addEventListener('click', alternarTema);
    $('btnToggleMenu').addEventListener('click', alternarSidebar);
    $('btnFecharSidebar').addEventListener('click', fecharSidebarMobile);
    $('sidebarBackdrop').addEventListener('click', fecharSidebarMobile);
    $('btnAlterarMeuCodigoTopo').addEventListener('click', abrirModalAlterarMeuCodigo);

    $('btnTopoRegistrarPonto').addEventListener('click', () => { abrirAba('secPonto'); ativarSubtab('secPonto', 'subPtRegistrar'); $('inpIdentificaGuarda').focus(); });

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
      const r = window.EscalaCloud.cadastrarUsuario({ nome:$('inpCadNome').value, login:$('inpCadUser').value, matricula:$('inpCadMat').value, senha:$('inpCadPass').value, perfil:'AGENTE', aprovado:false });
      b.classList.add(r.ok ? 'ok' : 'erro'); b.textContent = r.ok ? 'Solicitação enviada! Aguarde aprovação do Administrador.' : r.erro;
      if (r.ok) $('formCadastro').reset();
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
      $('btnModoMarcarPb').textContent = modoMarcarPbMapa ? 'Cancelar Marcação' : '+ Marcar PB clicando no Mapa';
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
      ESTADO.config.bancoHoras = { carga24:Number($('inpBhCarga24').value)||24, cargaAdm:Number($('inpBhCargaAdm').value)||8, valorHora:Number($('inpBhValorHora').value)||0, mult50:Number($('inpBhMult50').value)||1.5, mult100:Number($('inpBhMult100').value)||2.0 };
      await salvarTudo(); renderBancoHoras();
    });

    // Eventos
    $('btnNovoEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const novo = { id:'ev_'+Date.now().toString(36), nome:'Novo Evento Extra', local:'Valparaíso de Goiás', data:hojeISO(), inicio:'16:00', fim:'23:00', regime:'HORA_EXTRA', coordenador:'', missao:'', obs:'', viaturas:[{ id:'evv_1', prefixo:'VTR-EVENTO 01', setor:'Principal', g01:'', g02:'', g03:'', g04:'' }, { id:'evv_2', prefixo:'VTR-EVENTO 02', setor:'Apoio', g01:'', g02:'', g03:'', g04:'' }] }; ESTADO.eventos.unshift(novo); eventoSelecionadoId = novo.id; await salvarTudo(true); renderListaEventos(); });
    $('inpEvData').addEventListener('change', () => { const cur = lerEventoDoEditor(); atualizarDicaFolgaEvento(cur.data); renderViaturasEvento(cur.viaturas, cur.data); });
    $('btnAddVtrEvento').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const cur = lerEventoDoEditor(); cur.viaturas.push({ id:'evv_'+Date.now(), prefixo:`VTR-EVENTO 0${cur.viaturas.length+1}`, setor:'', g01:'', g02:'', g03:'', g04:'' }); renderViaturasEvento(cur.viaturas, cur.data); });
    $('btnSalvarEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const cur = lerEventoDoEditor(), i = ESTADO.eventos.findIndex(e => e.id === cur.id); if (i >= 0) ESTADO.eventos[i] = cur; await salvarTudo(); renderListaEventos(); renderFrequenciaDia(); });
    $('btnExcluirEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); if (!confirm('Excluir evento?')) return; ESTADO.eventos = ESTADO.eventos.filter(e => e.id !== eventoSelecionadoId); eventoSelecionadoId = null; await salvarTudo(); renderListaEventos(); });
    $('btnWhatsAppEvento').addEventListener('click', copiarWhatsAppEvento);
    $('btnPdfEvento').addEventListener('click', gerarPdfEvento);

    // Validacao de Autenticidade
    $('btnExecutarValidacao').addEventListener('click', validarCodigoDocumentoOuPonto);
    $('inpCodigoValidar').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); validarCodigoDocumentoOuPonto(); } });
    $('btnAuditarCadeiaPontos').addEventListener('click', auditarCadeiaCompletaPontos);

    // Efetivo (Gestao) e Sistema (EXCLUSIVO ADMIN)
    $('fltEfBusca').addEventListener('input', renderEfetivo);
    $('fltEfEquipe').addEventListener('change', renderEfetivo);
    $('fltEfArea').addEventListener('change', renderEfetivo);
    $('btnNovoAgente').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); abrirModalAgente(null); });
    $('btnAbrirImportar64').addEventListener('click', abrirModalImportar64);
    $('btnDistribuir64').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); if (!confirm('Rebalancear operacionais nas 4 equipes?')) return; const alvos = ESTADO.efetivo.filter(a => a.situacao==='ATIVO' && a.equipe!=='ADM' && a.equipe!=='12X36'); alvos.forEach((a,i) => { a.equipe = EQUIPES[i%4]; a.regime = '24X72'; }); await salvarTudo(); atualizarTodasVistas(); toast(`${alvos.length} guardas rebalanceados!`); });

    $('btnCriarContaAdmin').addEventListener('click', () => {
      if (!isAdmin()) return toast('Acesso exclusivo do Administrador.');
      abrirModal('Criar Conta (Código 4+ dígitos)', `<div class="campo"><label>Nome</label><input type="text" id="mUsNome"></div><div class="grid-2"><div class="campo"><label>Login</label><input type="text" id="mUsLogin"></div><div class="campo"><label>Nº Provisório / Matrícula</label><input type="text" id="mUsMat" placeholder="Ex.: 03"></div></div><div class="grid-2"><div class="campo"><label>Código de Acesso (mín. 4 dígitos)</label><input type="password" id="mUsPass" minlength="4"></div><div class="campo"><label>Perfil</label><select id="mUsPerfil"><option value="AGENTE">Agente (Consulta e Ponto)</option><option value="ESCALANTE">Escalante (Escala/Cartão/Banco)</option><option value="ADMIN">Administrador (Acesso Total)</option></select></div></div>`, [
        { texto:'Cancelar', classe:'btn-sec', onClick:fecharModal },
        { texto:'Criar', classe:'btn-primario', onClick: () => { const r = window.EscalaCloud.cadastrarUsuario({ nome:$('mUsNome').value, login:$('mUsLogin').value, matricula:$('mUsMat').value, senha:$('mUsPass').value, perfil:$('mUsPerfil').value, aprovado:true }); if (!r.ok) return toast(r.erro); fecharModal(); renderContas(); salvarTudo(true); toast('Conta criada!'); }}
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
    $('btnAlterarMinhaSenha').addEventListener('click', abrirModalAlterarMeuCodigo);
    $('btnExportarBackup').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Exclusivo Administrador.');
      const pac = { sistema:'GCM_VALP_ESCALA_V6', exportadoEm:new Date().toISOString(), estado:ESTADO, usuarios:window.EscalaCloud.lerUsuariosLocal() };
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

  async function init() {
    aplicarTema(localStorage.getItem('escala_gcm_tema_v6') || 'claro');
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(() => {});
    const carregado = await window.EscalaCloud.carregarEstadoLocal();
    ESTADO = (carregado && carregado.efetivo && carregado.postos && carregado.versao >= 6) ? carregado : criarEstadoInicial();
    if (!ESTADO.justificativas) ESTADO.justificativas = {};
    if (!Array.isArray(ESTADO.eventos)) ESTADO.eventos = [];
    if (!Array.isArray(ESTADO.permutas)) ESTADO.permutas = [];
    if (!Array.isArray(ESTADO.bancoHorasMovs)) ESTADO.bancoHorasMovs = [];
    if (!Array.isArray(ESTADO.documentosAutenticados)) ESTADO.documentosAutenticados = [];
    if (!ESTADO.config.bancoHoras) ESTADO.config.bancoHoras = { carga24: 24, cargaAdm: 8, valorHora: 0, mult50: 1.5, mult100: 2.0 };
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    registrarEventos();
    const s = window.EscalaCloud.lerSessao();
    if (s && s.login) iniciarAppLogado(s);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
