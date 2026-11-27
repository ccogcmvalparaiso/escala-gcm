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
    MARIA_DA_PENHA: 'Maria da Penha',
    ESCOLAR: 'Patrulha Escolar',
    TRANSITO: 'Trânsito',
    CCO: 'Operador CCO',
    COMANDO: 'Administrativo'
  };
  const FUNCOES_LABEL = {
    COMANDANTE_01: '01 — Comandante',
    MOTORISTA_02: '02 — Motorista',
    PATRULHEIRO_03: '03 — Patrulheiro',
    OPERADOR_CCO: 'Operador CCO',
    ADMINISTRATIVO: 'Administrativo'
  };
  const TIPO_PONTO_LABEL = {
    ENTRADA: 'Entrada',
    SAIDA_ALMOCO: 'Saída Almoço',
    RETORNO_ALMOCO: 'Retorno Almoço',
    SAIDA: 'Saída Final'
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
    secEscalas: 'Escala Contínua 24x72',
    secCartao: 'Cartão Programa & Mapa dos Setores',
    secEventos: 'Eventos & Operações Extras',
    secEfetivo: 'Efetivo da Guarda (64)',
    secSistema: 'Contas, Base & Banco de Dados'
  };
  const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const MESES_EXT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const ROL_EFETIVO_64 = [["01", "Vinicios Mateus Pires da Silva", "M"], ["02", "Yago Rocha da Silva Dias", "M"], ["03", "Anderson Pereira Costa", "M"], ["04", "Gabrielle da Cruz Nunes", "F"], ["05", "Tiago Ferreira Lopes", "M"], ["06", "Luthero Pinheiro Martins Filho", "M"], ["07", "Tiago Batista Ferreira", "M"], ["08", "Luís Otávio de Andrade Torres", "M"], ["09", "Michael Larangeira Linhares", "M"], ["10", "Valterson da Silva Junior", "M"], ["11", "Vinicius Lemes Lopes", "M"], ["12", "Cleber Brilhante de Albuquerque Neto", "M"], ["13", "Anderson Lucas Brito Gomes", "M"], ["14", "Alex Sandro Souza Gomes", "M"], ["15", "Michele Bezerra de Araujo Aniceto", "F"], ["16", "Mayara Valeria Damasceno Pastana", "F"], ["17", "Amanda Rodrigues Cavalcante", "F"], ["18", "Jemima Costa de Jesus", "F"], ["19", "Geyssom Chaves Duarte Mazinho", "M"], ["20", "Diego Stanley Cantallops Santos", "M"], ["21", "Rafael Miranda Dias", "M"], ["22", "Daniel Kimberley de Oliveira Franco", "M"], ["23", "Renan Rodrigues de Aquino", "M"], ["24", "Gilmar Figueiredo dos Santos", "M"], ["25", "Juliana Iza de Oliveira Nunes", "F"], ["26", "Douglas Araujo dos Santos", "M"], ["27", "Victor dos Santos Nunes", "M"], ["28", "Bruno Guerreiro Galdino", "M"], ["29", "Glauber Terena Guerra da Silva", "M"], ["30", "Gean Martins Godinho da Silva", "M"], ["31", "Davy Guedes de Oliveira", "M"], ["32", "Rayan Thalles Bonfim da Silva", "M"], ["33", "Joao Pedro Martins Pinheiro", "M"], ["34", "Gustavo Amorim Lima", "M"], ["35", "Laryssa Santos Souza", "F"], ["36", "Regivânia Rodrigues de Macedo", "F"], ["37", "Bruna Albéfaro Pereira", "F"], ["38", "Vanessa Vasconcelos Sampaio", "F"], ["39", "Victor Lauriano de Paula Souza", "M"], ["40", "Valeria Januario Monteiro", "F"], ["41", "Lucas Lacerda de Melo", "M"], ["42", "Mayara Albuquerque Oliveira", "F"], ["43", "Alexandre Monteiro Januario", "M"], ["44", "Maísa Vitória Barbosa Vieira", "F"], ["45", "Hugo Sales Targino", "M"], ["46", "Davi Jonas Santos Duarte", "M"], ["47", "Julia Silveira Carvalho Ferreira", "F"], ["48", "Isabella Alves de Carvalho Basto", "F"], ["49", "Alessandro de Souza Silva", "M"], ["50", "Graziele Medeiros de Lima", "F"], ["51", "Luiz Felipe Oliveira Barros Dias", "M"], ["52", "Aline Rayane Vieira Maia", "F"], ["53", "Camila dos Santos Alves", "F"], ["54", "Carolina dos Santos Pereira", "F"], ["55", "Lucas Nunes da Silva", "M"], ["56", "Hugo Wildson de Lucena", "M"], ["57", "Vitor de Farias Lemes", "M"], ["58", "Esdras Roberto da Silva Braga", "M"], ["59", "Samuel Alessandro da Silva", "M"], ["60", "Valdir Borges da Silva Filho", "M"], ["61", "Felipe Augusto Ribeiro", "M"], ["62", "Allan Carvalho Gonçalves", "M"], ["63", "Arthur dos Reis Siqueira Bastos", "M"], ["64", "Rodrigo de Oliveira Correa", "M"]];
  const POLIGONOS_PADRAO = {"VTR-01": [[-16.0688, -47.9892], [-16.0672, -47.981], [-16.0718, -47.9752], [-16.0805, -47.9746], [-16.0852, -47.9825], [-16.0824, -47.9912], [-16.0745, -47.9935]], "VTR-02": [[-16.0548, -47.9922], [-16.0532, -47.9825], [-16.0578, -47.9748], [-16.0672, -47.9758], [-16.0688, -47.9892], [-16.0635, -47.9952]], "VTR-03": [[-16.0485, -48.0055], [-16.051, -47.9942], [-16.0635, -47.9952], [-16.0692, -48.0015], [-16.0645, -48.0115], [-16.0555, -48.0128]], "VTR-04": [[-16.0492, -47.9788], [-16.048, -47.9655], [-16.0568, -47.9592], [-16.0682, -47.9612], [-16.0708, -47.9748], [-16.0578, -47.9748]], "MUNICIPIO": [[-16.048, -48.0128], [-16.048, -47.9585], [-16.0998, -47.9585], [-16.0998, -48.0128]]};

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  let ESTADO = null;
  let SESSAO = null;
  let guardaSelecionadoPonto = null;
  let eventoSelecionadoId = null;
  let streamCamera = null;
  let fotoCapturadaDataUrl = null;
  let locAtualPonto = null;
  let timerRelogio = null;

  // Mapa Leaflet do Cartao Programa
  let mapaSetor = null;
  let camadaPoligonos = null;
  let camadaPbs = null;
  let modoMarcarPbMapa = false;

  // =========================================================================
  // DATAS E CICLO CONTINUO 24x72 (AUTOALIMENTADO TODO DIA)
  // =========================================================================
  function hojeISO() { const d = new Date(), p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`; }
  function mesAtualISO() { return hojeISO().slice(0, 7); }
  function somarDiasISO(iso, delta) {
    const [y,m,d] = iso.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + delta));
    const p = n => String(n).padStart(2,'0');
    return `${dt.getUTCFullYear()}-${p(dt.getUTCMonth()+1)}-${p(dt.getUTCDate())}`;
  }
  function diaSemanaISO(iso) {
    const [y,m,d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).getDay(); // 0=Dom .. 6=Sab
  }
  function formatarDataBR(iso) { if (!iso || iso.length < 10) return '—'; const [y,m,d] = iso.slice(0,10).split('-'); return `${d}/${m}/${y}`; }
  function formatarDataHoraBR(iso) {
    if (!iso) return '—'; const d = new Date(iso); if (isNaN(d.getTime())) return iso;
    const p = n => String(n).padStart(2,'0');
    return `${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
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
    const modo = $('selModoEscala')?.value || 'CONTINUO_30';
    const hoje = hojeISO();
    if (modo.startsWith('CONTINUO_')) {
      const n = Number(modo.split('_')[1]) || 30;
      const arr = [];
      for (let i = 0; i < n; i++) arr.push(somarDiasISO(hoje, i));
      return { titulo: `Próximos ${n} dias corridos (${formatarDataBR(arr[0])} a ${formatarDataBR(arr[arr.length-1])})`, datas: arr };
    }
    const mesVal = $('selMesEscala')?.value || mesAtualISO();
    const [ano, mes] = mesVal.split('-').map(Number);
    const ult = new Date(ano, mes, 0).getDate();
    const arr = [];
    for (let d = 1; d <= ult; d++) arr.push(`${ano}-${String(mes).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
    return { titulo: `${MESES_EXT[mes-1]} / ${ano}`, datas: arr };
  }

  // =========================================================================
  // ESTADO INICIAL: SETORES COM POLIGONOS REAIS + PONTOS IDEAIS DIDATICOS
  // =========================================================================
  function criarPostosPadrao() {
    return [
      { id: 'VTR-01', nome: 'VTR-01 — Setor 01 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 01', bairros: 'Valparaíso I (Etapas A a E), Jardim Anhanguera', prefixo: 'VTR-01', cor: '#18181B', responsavel: 'A definir (Resp. Setor 01)', poligono: POLIGONOS_PADRAO['VTR-01'] },
      { id: 'VTR-02', nome: 'VTR-02 — Setor 02 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 02', bairros: 'Parque Esplanada I a V, Cruzeiro do Sul, Valparaízo II', prefixo: 'VTR-02', cor: '#365314', responsavel: 'A definir (Resp. Setor 02)', poligono: POLIGONOS_PADRAO['VTR-02'] },
      { id: 'VTR-03', nome: 'VTR-03 — Setor 03 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 03', bairros: 'Jardim Céu Azul, Jardim Oriente, Ipanema', prefixo: 'VTR-03', cor: '#854D0E', responsavel: 'A definir (Resp. Setor 03)', poligono: POLIGONOS_PADRAO['VTR-03'] },
      { id: 'VTR-04', nome: 'VTR-04 — Setor 04 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 04', bairros: 'Cidade Jardins, Parque Rio Branco, Marajó, Santa Rita', prefixo: 'VTR-04', cor: '#7F1D1D', responsavel: 'A definir (Resp. Setor 04)', poligono: POLIGONOS_PADRAO['VTR-04'] },
      { id: 'PMP-01', nome: 'Patrulha Maria da Penha', area: 'MARIA_DA_PENHA', setor: 'Maria da Penha', bairros: 'Todo o Município de Valparaíso de Goiás', prefixo: 'VTR-PMP', cor: '#3F3F46', responsavel: 'A definir (Resp. Maria da Penha)', poligono: POLIGONOS_PADRAO['MUNICIPIO'] },
      { id: 'ESC-01', nome: 'Patrulha Escolar', area: 'ESCOLAR', setor: 'Patrulha Escolar', bairros: 'Escolas Municipais e CMEIs de Valparaíso', prefixo: 'VTR-ESC', cor: '#52525B', responsavel: 'A definir (Resp. Escolar)', poligono: POLIGONOS_PADRAO['MUNICIPIO'] },
      { id: 'TRN-01', nome: 'Apoio de Trânsito', area: 'TRANSITO', setor: 'Trânsito', bairros: 'Marginais BR-040, Av. Central e Rotatórias', prefixo: 'VTR-TRN', cor: '#44403C', responsavel: 'A definir (Resp. Trânsito)', poligono: POLIGONOS_PADRAO['MUNICIPIO'] },
      { id: 'CCO-01', nome: 'Operador CCO / Rádio 153', area: 'CCO', setor: 'Base CCO', bairros: 'Central de Controle Operacional — Valparaíso-GO', prefixo: 'BASE-CCO', cor: '#18181B', responsavel: 'A definir (Coord. CCO)', poligono: POLIGONOS_PADRAO['VTR-01'] }
    ];
  }

  function criarModeloCartaoPadrao(posto) {
    if (posto.id === 'VTR-01') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        missao: 'Garantir presença visível nas Etapas A a E e Jardim Anhanguera, protegendo escolas, UBSs, praças e áreas comerciais com pronta resposta ao CCO.',
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso (Saída)', atividade: 'Conferir viatura (combustível, giroflex, rádio), registrar entrada na Folha de Ponto e alinhar demandas com o CCO.', lat: -16.0715, lon: -47.9815 },
          { hora: '07:30 - 11:30', local: 'PB 1 — Praças e Escolas (Etapas A / B)', atividade: 'Estacionar em ponto visível com giroflex ligado na entrada escolar; depois fazer ronda lenta nas UBSs e praças.', lat: -16.0748, lon: -47.9852 },
          { hora: '11:30 - 14:30', local: 'PB 2 — Comércio Central (Etapas C / D)', atividade: 'Presença preventiva na área comercial e bancos no horário de almoço; manter contato comunitário com lojistas.', lat: -16.0785, lon: -47.9795 },
          { hora: '14:30 - 18:00', local: 'PB 3 — Jardim Anhanguera / Prédios Públicos', atividade: 'Vistoriar CRAS, postos de saúde e ginásios; acompanhar saída das escolas no fim da tarde.', lat: -16.0812, lon: -47.9878 },
          { hora: '18:00 - 22:00', local: 'PB 4 — Paradas de Ônibus / Saturação Noturna', atividade: 'Ficar em ponto fixo nas paradas de maior fluxo de trabalhadores voltando para casa com iluminação de alerta ligada.', lat: -16.0725, lon: -47.9775 },
          { hora: '22:00 - 06:30', local: 'Ronda Patrimonial Noturna — Setor 01', atividade: 'Circular em baixa velocidade verificando cadeados, portões e iluminação de escolas e prédios públicos até a passagem de turno.', lat: -16.0772, lon: -47.9835 }
        ],
        obs: 'Informar ao CCO início e término de cada PB. Registrar saída/retorno de almoço e saída final na Folha de Ponto.'
      };
    }
    if (posto.id === 'VTR-02') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        missao: 'Patrulhamento ostensivo no Parque Esplanada I a V, Cruzeiro do Sul e Valparaízo II, com foco em corredores comerciais e próprios municipais.',
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso (Saída)', atividade: 'Vistoria da viatura, registro de entrada no ponto e deslocamento imediato ao Setor 02.', lat: -16.0655, lon: -47.9805 },
          { hora: '07:30 - 11:30', local: 'PB 1 — Parque Esplanada I / II (Escolas e UBS)', atividade: 'Acompanhar entrada escolar e patrulhar entorno das unidades de saúde.', lat: -16.0595, lon: -47.9845 },
          { hora: '11:30 - 15:00', local: 'PB 2 — Eixo Comercial Esplanada III / Valparaízo II', atividade: 'Estacionamento tático em via de grande circulação e rondas curtas em comércios e praças.', lat: -16.0562, lon: -47.9788 },
          { hora: '15:00 - 19:00', local: 'PB 3 — Cruzeiro do Sul / Esplanada IV e V', atividade: 'Acompanhar saída escolar e realizar saturação preventiva nos acessos dos bairros.', lat: -16.0638, lon: -47.9912 },
          { hora: '19:00 - 06:30', local: 'PB 4 — Paradas de Ônibus e Ronda Noturna', atividade: 'Ponto base até 22h nas paradas principais; após 22h, ronda patrimonial nos prédios públicos do setor.', lat: -16.0615, lon: -47.9810 }
        ],
        obs: 'Manter rádio ligado na frequência operacional e reportar ocorrências imediatamente ao CCO.'
      };
    }
    if (posto.id === 'VTR-03') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        missao: 'Cobertura preventiva no Jardim Céu Azul, Jardim Oriente e Ipanema, garantindo segurança em escolas, unidades de saúde e acessos.',
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM / Deslocamento Setor 03', atividade: 'Checklist da viatura, ponto de entrada e saída para a região do Céu Azul.', lat: -16.0612, lon: -47.9965 },
          { hora: '07:30 - 12:00', local: 'PB 1 — Avenida Principal do Jardim Céu Azul', atividade: 'Presença visível em escolas, comércio e paradas de ônibus no horário matutino.', lat: -16.0568, lon: -48.0038 },
          { hora: '12:00 - 16:00', local: 'PB 2 — Jardim Oriente (UBS e Praças)', atividade: 'Ronda em unidades de saúde, CRAS e praças comunitárias do bairro.', lat: -16.0525, lon: -47.9992 },
          { hora: '16:00 - 21:00', local: 'PB 3 — Ipanema e Acessos Céu Azul', atividade: 'Acompanhar saída escolar e ponto base com giroflex no retorno dos trabalhadores.', lat: -16.0632, lon: -48.0072 },
          { hora: '21:00 - 06:30', local: 'PB 4 — Ronda Patrimonial Noturna — Setor 03', atividade: 'Verificação perimetral de escolas, creches e próprios municipais até 06:30.', lat: -16.0590, lon: -48.0015 }
        ],
        obs: 'Atenção redobrada nas divisas do município; informar ao CCO se precisar apoiar setor vizinho.'
      };
    }
    if (posto.id === 'VTR-04') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        missao: 'Patrulhamento ostensivo no Cidade Jardins, Parque Rio Branco, Marajó e Santa Rita com foco em prevenção e ronda patrimonial.',
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM / Deslocamento Setor 04', atividade: 'Vistoria, registro de entrada no ponto e deslocamento para a região leste.', lat: -16.0642, lon: -47.9725 },
          { hora: '07:30 - 12:00', local: 'PB 1 — Parque Rio Branco (Escolas e UBS)', atividade: 'Ponto base na entrada escolar e patrulhamento preventivo nas ruas comerciais.', lat: -16.0535, lon: -47.9688 },
          { hora: '12:00 - 16:00', local: 'PB 2 — Cidade Jardins / Comércio Local', atividade: 'Presença ostensiva no eixo comercial e visita preventiva a prédios públicos.', lat: -16.0585, lon: -47.9642 },
          { hora: '16:00 - 21:00', local: 'PB 3 — Marajó e Santa Rita (Saída Escolar / Fluxo)', atividade: 'Acompanhar saída das escolas e fazer ponto base visível nos principais acessos.', lat: -16.0648, lon: -47.9655 },
          { hora: '21:00 - 06:30', local: 'PB 4 — Ronda Patrimonial Noturna — Setor 04', atividade: 'Vistoria contínua em escolas, creches e praças até a passagem de turno.', lat: -16.0598, lon: -47.9702 }
        ],
        obs: 'Reportar ao CCO qualquer ocorrência ou necessidade de reforço viário na BR-040.'
      };
    }
    if (posto.area === 'MARIA_DA_PENHA') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        missao: 'Visitas tranquilizadoras a mulheres sob medida protetiva, acolhimento e pronta resposta em ocorrências de violência doméstica.',
        pontosBase: [
          { hora: '07:00 - 08:00', local: 'Base GCM — Organização de Roteiro Sigiloso', atividade: 'Conferir lista de medidas protetivas do dia e vistoriar a viatura.', lat: -16.0658, lon: -47.9756 },
          { hora: '08:00 - 12:00', local: 'PB 1 — Visitas Preventivas (Região Central / Etapas)', atividade: 'Realizar visitas programadas, preencher ficha de acompanhamento e orientar assistidas.', lat: -16.0740, lon: -47.9830 },
          { hora: '14:00 - 18:00', local: 'PB 2 — CRAM / Visitas (Céu Azul / Esplanada)', atividade: 'Alinhar casos urgentes com a rede de proteção e cumprir visitas da tarde.', lat: -16.0585, lon: -47.9920 },
          { hora: '18:00 - 07:00', local: 'Prontidão Operacional / Apoio CCO 153', atividade: 'Prioridade absoluta em chamados de violência doméstica e patrulhamento preventivo.', lat: -16.0658, lon: -47.9756 }
        ],
        obs: 'Sigilo absoluto sobre endereços e nomes de assistidas.'
      };
    }
    if (posto.area === 'ESCOLAR') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        missao: 'Garantir segurança nos horários de entrada e saída das escolas municipais e vistoria patrimonial noturna.',
        pontosBase: [
          { hora: '07:00 - 08:15', local: 'PB 1 — Escolas Municipais (Entrada Matutina)', atividade: 'Posicionar viatura na frente da escola, auxiliar travessia e conversar com a direção.', lat: -16.0735, lon: -47.9840 },
          { hora: '11:15 - 13:15', local: 'PB 2 — Troca de Turno Escolar', atividade: 'Acompanhar saída da manhã e entrada da tarde nos corredores escolares.', lat: -16.0595, lon: -47.9835 },
          { hora: '16:45 - 18:15', local: 'PB 3 — Saída Vespertina', atividade: 'Garantir dispersão segura dos alunos e prevenir aglomerações no entorno.', lat: -16.0570, lon: -48.0010 },
          { hora: '19:00 - 07:00', local: 'PB 4 — Ronda Patrimonial Escolar Noturna', atividade: 'Conferir portões, iluminação e perímetro das escolas e CMEIs.', lat: -16.0650, lon: -47.9740 }
        ],
        obs: 'Registrar no relatório qualquer escola com iluminação quebrada ou vulnerabilidade no muro.'
      };
    }
    if (posto.area === 'TRANSITO') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
        missao: 'Dar fluidez nos horários de pico na BR-040 e avenidas centrais, sinalizar sinistros e orientar condutores.',
        pontosBase: [
          { hora: '07:00 - 09:00', local: 'PB 1 — Acessos Marginais BR-040 (Pico Manhã)', atividade: 'Operação fluidez com sinalização visível e apoio à travessia de pedestres.', lat: -16.0665, lon: -47.9775 },
          { hora: '11:30 - 13:30', local: 'PB 2 — Corredor Comercial Central', atividade: 'Orientação sobre fila dupla, vagas preferenciais e estacionamento irregular.', lat: -16.0745, lon: -47.9810 },
          { hora: '17:00 - 19:30', local: 'PB 3 — Rotatórias e Retornos (Pico Tarde)', atividade: 'Apoio viário no retorno do trabalho e prevenção de engarrafamentos.', lat: -16.0575, lon: -47.9765 },
          { hora: '20:00 - 07:00', local: 'PB 4 — Prontidão Viária / Apoio CCO', atividade: 'Sinalização de acidentes e patrulhamento nas avenidas principais.', lat: -16.0658, lon: -47.9756 }
        ],
        obs: 'Uso obrigatório de colete refletivo, cones e giroflex em qualquer intervenção na via.'
      };
    }
    return {
      setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel,
      missao: 'Atender chamados 153, despachar viaturas, acompanhar a posição das equipes e fechar o relatório do plantão.',
      pontosBase: [
        { hora: '07:00 - 07:30', local: 'PB 1 — Sala CCO (Passagem de Plantão)', atividade: 'Receber ocorrências pendentes, testar rádios e conferir a Folha de Ponto das guarnições.', lat: -16.0658, lon: -47.9756 },
        { hora: '07:30 - 19:00', local: 'PB 2 — Operação CCO Diurna', atividade: 'Despachar ocorrências, acompanhar PBs das viaturas e registrar no livro de turno.', lat: -16.0658, lon: -47.9756 },
        { hora: '19:00 - 07:00', local: 'PB 3 — Operação CCO Noturna e Fechamento', atividade: 'Monitoramento contínuo e fechamento do relatório de turno às 06:45.', lat: -16.0658, lon: -47.9756 }
      ],
      obs: 'Manter registro exato de horários de despacho e encerramento de todas as ocorrências.'
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
      let area = 'PATRULHAMENTO';
      let funcao = pos % 3 === 0 ? 'COMANDANTE_01' : (pos % 3 === 1 ? 'MOTORISTA_02' : 'PATRULHEIRO_03');
      if (pos === 9 || pos === 10) { area = 'MARIA_DA_PENHA'; funcao = pos === 9 ? 'COMANDANTE_01' : 'MOTORISTA_02'; }
      else if (pos === 11 || pos === 12) { area = 'ESCOLAR'; funcao = pos === 11 ? 'COMANDANTE_01' : 'MOTORISTA_02'; }
      else if (pos === 13 || pos === 14) { area = 'TRANSITO'; funcao = pos === 13 ? 'COMANDANTE_01' : 'MOTORISTA_02'; }
      else if (pos === 15) { area = 'CCO'; funcao = 'OPERADOR_CCO'; }

      const reg = {
        id: 'ag_' + num,
        matricula: num, // Numero provisorio simples: 01, 02, 03... (editavel depois para matricula oficial)
        nome,
        nomeGuerra: gerarNomeGuerra(nome),
        sexo,
        telefone: '',
        equipe: eq,
        area,
        funcao,
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
      const fems = daEq.filter(a => a.sexo === 'F');
      const usados = new Set();
      const pegar = (prefFem) => {
        let p = prefFem ? fems.find(a => !usados.has(a.id)) : null;
        if (!p) p = daEq.find(a => !usados.has(a.id));
        if (p) usados.add(p.id);
        return p ? p.id : '';
      };
      const pmp01 = pegar(true), pmp02 = pegar(true);
      const v1 = [pegar(false), pegar(false), pegar(false)];
      const v2 = [pegar(false), pegar(false), ''];
      const v3 = [pegar(false), pegar(false), ''];
      const v4 = [pegar(false), pegar(false), ''];
      const escG = [pegar(false), pegar(false), ''];
      const trnG = [pegar(false), pegar(false), ''];
      const ccoG = [pegar(false), '', ''];
      equipesMontagem[eq] = {
        'VTR-01': { g01: v1[0], g02: v1[1], g03: v1[2] },
        'VTR-02': { g01: v2[0], g02: v2[1], g03: v2[2] },
        'VTR-03': { g01: v3[0], g02: v3[1], g03: v3[2] },
        'VTR-04': { g01: v4[0], g02: v4[1], g03: v4[2] },
        'PMP-01': { g01: pmp01, g02: pmp02, g03: '' },
        'ESC-01': { g01: escG[0], g02: escG[1], g03: '' },
        'TRN-01': { g01: trnG[0], g02: trnG[1], g03: '' },
        'CCO-01': { g01: ccoG[0], g02: '', g03: '' }
      };
    });

    const cartoesModelo = {};
    postos.forEach(p => { cartoesModelo[p.id] = criarModeloCartaoPadrao(p); });

    return {
      versao: 4,
      config: {
        dataBaseAlfa: hojeISO(),
        horarioTroca: '07:00 às 07:00',
        baseNome: 'Base Operacional — GCM Valparaíso de Goiás',
        baseLat: -16.0658, baseLon: -47.9756, baseRaioMetros: 500,
        nuvemAtiva: false,
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
            { id: 'evv_2', prefixo: 'VTR-EVENTO 02', setor: 'Perímetro / Trânsito', g01: '', g02: '', g03: '', g04: '' }
          ]
        }
      ],
      cartoesModelo,
      cartoesDia: {},
      pontos: [],
      justificativas: {} // chave: "YYYY-MM-DD|agenteId" -> { motivo, obs, por, em }
    };
  }

  // =========================================================================
  // AUXILIARES
  // =========================================================================
  function toast(msg) {
    const area = $('toastArea'); if (!area) return;
    const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
    area.appendChild(el); setTimeout(() => el.remove(), 3400);
  }
  function atualizarBadgeSync(txt, cls) { const b = $('badgeSync'); if (b) { b.textContent = txt; b.className = 'badge ' + (cls || 'badge-neutro'); } }
  async function salvarTudo(silencioso) {
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    atualizarBadgeSync('Salvo Local', 'badge-ok');
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      atualizarBadgeSync('Sincronizando...', 'badge-warn');
      const r = await window.EscalaCloud.sincronizarEnviarNuvem(ESTADO);
      atualizarBadgeSync(r.ok ? 'Nuvem OK' : 'Local', r.ok ? 'badge-ok' : 'badge-warn');
    }
    if (!silencioso) toast('Alterações salvas.');
  }
  function isAdmin() { return SESSAO && SESSAO.perfil === 'ADMIN'; }
  function podeEditarEscala() { return SESSAO && (SESSAO.perfil === 'ADMIN' || SESSAO.perfil === 'ESCALANTE'); }
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
    return { id: '', nome: AREAS_LABEL[ag.area] || 'Apoio', funcao: FUNCOES_LABEL[ag.funcao] || 'Guarda' };
  }

  // Retorna todos os guardas ESCALADOS para trabalhar numa data especifica (24x72 + ADM seg-sex + Eventos)
  function obterEscaladosDaData(dataISO) {
    const ciclo = calcularCiclo24x72(dataISO);
    const dow = diaSemanaISO(dataISO);
    const diaUtil = dow >= 1 && dow <= 5;
    const lista = [];
    const ids = new Set();

    // 1. Equipe 24x72 do dia
    ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === ciclo.equipeServico).forEach(a => {
      ids.add(a.id);
      const inf = descobrirSetorDoAgente(a);
      lista.push({ agente: a, origem: `EQUIPE ${ciclo.equipeServico} (24x72)`, posto: inf.nome, funcao: inf.funcao });
    });

    // 2. Administrativo em dias uteis
    if (diaUtil) {
      ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === 'ADM' && !ids.has(a.id)).forEach(a => {
        ids.add(a.id);
        lista.push({ agente: a, origem: 'ADM (Seg–Sex)', posto: 'Administrativo', funcao: 'Expediente' });
      });
    }

    // 3. Guardas escalados em Eventos extras nesta data
    (ESTADO.eventos || []).filter(ev => ev.data === dataISO).forEach(ev => {
      (ev.viaturas || []).forEach(v => {
        [v.g01, v.g02, v.g03, v.g04].filter(Boolean).forEach(gid => {
          if (ids.has(gid)) return;
          const ag = agentePorId(gid);
          if (ag) {
            ids.add(ag.id);
            lista.push({ agente: ag, origem: `EVENTO: ${ev.nome}`, posto: v.prefixo, funcao: 'Extra' });
          }
        });
      });
    });

    // 4. Qualquer outro guarda que bateu ponto nesta data (ex.: permuta/extra)
    (ESTADO.pontos || []).filter(p => p.dataLocal === dataISO).forEach(p => {
      if (!ids.has(p.agenteId)) {
        const ag = agentePorId(p.agenteId);
        if (ag) {
          ids.add(ag.id);
          lista.push({ agente: ag, origem: 'PERMUTA / EXTRA', posto: p.posto || '—', funcao: 'Extra' });
        }
      }
    });

    return { ciclo, diaUtil, escalados: lista };
  }

  function aplicarTema(tema) {
    const t = tema === 'noturno' ? 'noturno' : 'claro';
    document.documentElement.setAttribute('data-tema', t);
    localStorage.setItem('escala_gcm_tema_v4', t);
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
  // 1. FOLHA DE PONTO (IDENTIFICACAO POR Nº/NOME + 4 BATIDAS + FREQUENCIA)
  // =========================================================================
  function resumirDiaAgente(dataISO, agenteId) {
    const pts = (ESTADO.pontos || []).filter(p => p.dataLocal === dataISO && p.agenteId === agenteId).slice().reverse();
    const pegar = (tipo) => pts.find(x => x.tipo === tipo);
    const ent = pegar('ENTRADA'), sAlm = pegar('SAIDA_ALMOCO'), rAlm = pegar('RETORNO_ALMOCO'), sai = pegar('SAIDA');
    const just = (ESTADO.justificativas || {})[`${dataISO}|${agenteId}`] || null;
    let status = 'PENDENTE';
    if (just) status = 'JUSTIFICADO';
    else if (ent && sai) status = 'PRESENTE';
    else if (ent || sAlm || rAlm || sai) status = 'PARCIAL';
    return { ent, sAlm, rAlm, sai, just, status, pts };
  }

  function renderFaixaPlantaoHoje() {
    const hoje = hojeISO(), d = new Date();
    const dataExt = `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES_EXT[d.getMonth()]} de ${d.getFullYear()}`;
    $('lblSubtopo').textContent = `${dataExt} · Turno ${ESTADO.config.horarioTroca}`;
    const info = obterEscaladosDaData(hoje);
    let presentes = 0, parciais = 0, pendentes = 0, justif = 0;
    info.escalados.forEach(item => {
      const r = resumirDiaAgente(hoje, item.agente.id);
      if (r.status === 'PRESENTE') presentes++;
      else if (r.status === 'PARCIAL') parciais++;
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
        <div class="faixa-kpi"><strong>${presentes + parciais}</strong><span>Em Ponto</span></div>
        <div class="faixa-kpi"><strong>${pendentes}</strong><span>Pendentes</span></div>
        <div class="faixa-kpi"><strong>${justif}</strong><span>Justificados</span></div>
      </div>
    `;
  }

  function selecionarGuardaParaPonto(ag) {
    guardaSelecionadoPonto = ag;
    $('listaSugestoesGuarda').classList.add('oculto');
    if (!ag) {
      $('cardGuardaIdentificado').classList.add('oculto');
      return;
    }
    $('inpIdentificaGuarda').value = `${ag.matricula} — ${ag.nome}`;
    const hoje = hojeISO();
    const { escalados } = obterEscaladosDaData(hoje);
    const escHoje = escalados.find(x => x.agente.id === ag.id);
    const resumo = resumirDiaAgente(hoje, ag.id);

    // Sugere automaticamente a proxima batida logica
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
    if (!raw) {
      guardaSelecionadoPonto = null;
      $('cardGuardaIdentificado').classList.add('oculto');
      box.classList.add('oculto');
      return;
    }
    const q = raw.toLowerCase();
    const numLimpo = raw.replace(/\D/g, '').replace(/^0+/, '');
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');

    // Match exato por numero (ex: "03" ou "3")
    const exatoNum = numLimpo ? ativos.find(a => a.matricula.replace(/\D/g,'').replace(/^0+/, '') === numLimpo && /^\d+$/.test(raw.replace(/^gcm-?/i, ''))) : null;
    if (exatoNum) {
      selecionarGuardaParaPonto(exatoNum);
      return;
    }

    const matches = ativos.filter(a =>
      a.nome.toLowerCase().includes(q) ||
      (a.nomeGuerra || '').toLowerCase().includes(q) ||
      a.matricula.toLowerCase().includes(q) ||
      (numLimpo && a.matricula.replace(/\D/g,'').replace(/^0+/, '') === numLimpo)
    ).slice(0, 6);

    if (!matches.length) {
      guardaSelecionadoPonto = null;
      $('cardGuardaIdentificado').classList.add('oculto');
      box.innerHTML = '<div class="sug-item"><span class="subtexto">Nenhum guarda encontrado com este nº ou nome.</span></div>';
      box.classList.remove('oculto');
      return;
    }
    if (matches.length === 1 && matches[0].nome.toLowerCase() === q) {
      selecionarGuardaParaPonto(matches[0]);
      return;
    }
    box.innerHTML = matches.map(a => `
      <div class="sug-item" data-pick-ag="${esc(a.id)}">
        <span><strong>Nº ${esc(a.matricula)}</strong> — ${esc(a.nome)}</span>
        <span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span>
      </div>
    `).join('');
    box.classList.remove('oculto');
    box.querySelectorAll('[data-pick-ag]').forEach(el => el.addEventListener('click', () => {
      selecionarGuardaParaPonto(agentePorId(el.getAttribute('data-pick-ag')));
    }));
  }

  function renderResumoEscaladosHoje() {
    const hoje = hojeISO();
    const { ciclo, escalados } = obterEscaladosDaData(hoje);
    $('lblResumoEscaladosHoje').textContent = `${formatarDataBR(hoje)} · Equipe ${ciclo.equipeServico} (${escalados.length} escalados)`;
    $('tbodyResumoHoje').innerHTML = escalados.map(item => {
      const a = item.agente, r = resumirDiaAgente(hoje, a.id);
      const stCls = r.status === 'PRESENTE' ? 'badge-ok' : (r.status === 'PARCIAL' ? 'badge-invertido' : (r.status === 'JUSTIFICADO' ? 'badge-warn' : 'badge-neutro'));
      const stTxt = r.status === 'JUSTIFICADO' ? r.just.motivo : (r.status === 'PRESENTE' ? 'Completo' : (r.status === 'PARCIAL' ? 'Em Serviço' : 'Pendente'));
      return `
        <tr>
          <td><strong>${esc(a.matricula)}</strong></td>
          <td><strong>${esc(a.nomeGuerra || a.nome)}</strong></td>
          <td>${esc(item.posto)}</td>
          <td>${r.ent ? r.ent.horaLocal.slice(0,5) : '—'}</td>
          <td>${r.sAlm ? r.sAlm.horaLocal.slice(0,5) : '—'}${r.rAlm ? '–' + r.rAlm.horaLocal.slice(0,5) : ''}</td>
          <td>${r.sai ? r.sai.horaLocal.slice(0,5) : '—'}</td>
          <td><span class="badge ${stCls}">${esc(stTxt)}</span></td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="7" class="subtexto" style="text-align:center;">Nenhum escalado hoje.</td></tr>';
  }

  function renderFrequenciaDia() {
    const data = $('inpFreqData').value || hojeISO();
    $('inpFreqData').value = data;
    const busca = ($('fltFreqBusca').value || '').trim().toLowerCase();
    const fltSit = $('fltFreqSituacao').value || '';
    const { ciclo, diaUtil, escalados } = obterEscaladosDaData(data);

    $('boxInfoEscalaDiaFreq').innerHTML = `<strong>${formatarDataBR(data)} (${DIAS_SEMANA[diaSemanaISO(data)]}):</strong> Escala 24x72: <span class="insig eq-${ciclo.equipeServico}">EQUIPE ${ciclo.equipeServico}</span> · ${diaUtil ? 'Expediente Administrativo ativo' : 'Fim de semana (sem Adm)'} · Total de escalados: <strong>${escalados.length}</strong>`;

    const filtrados = escalados.filter(item => {
      const a = item.agente, r = resumirDiaAgente(data, a.id);
      if (fltSit && r.status !== fltSit) return false;
      if (busca && !(a.nome.toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca))) return false;
      return true;
    });

    $('tbodyFrequenciaDia').innerHTML = filtrados.map(item => {
      const a = item.agente, r = resumirDiaAgente(data, a.id);
      const celHora = (pt) => pt ? `<strong>${pt.horaLocal.slice(0,5)}</strong>${pt.foto ? ` <img src="${pt.foto}" class="foto-thumb" style="width:26px;height:26px;vertical-align:middle;" data-ver-ponto="${esc(pt.id)}">` : ''}` : '<span class="subtexto">—</span>';
      const stCls = r.status === 'PRESENTE' ? 'badge-ok' : (r.status === 'PARCIAL' ? 'badge-invertido' : (r.status === 'JUSTIFICADO' ? 'badge-warn' : 'badge-erro'));
      const stLabel = r.status === 'JUSTIFICADO' ? `${r.just.motivo}${r.just.obs ? ' · ' + r.just.obs : ''}` : (r.status === 'PRESENTE' ? 'Presente (Completo)' : (r.status === 'PARCIAL' ? 'Em Serviço (Parcial)' : 'Sem Batida / Pendente'));
      return `
        <tr>
          <td><strong>${esc(a.matricula)}</strong></td>
          <td><strong>${esc(a.nome)}</strong></td>
          <td><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span> <span class="subtexto">${esc(item.posto)}</span></td>
          <td>${celHora(r.ent)}</td>
          <td>${celHora(r.sAlm)}</td>
          <td>${celHora(r.rAlm)}</td>
          <td>${celHora(r.sai)}</td>
          <td><span class="badge ${stCls}">${esc(stLabel)}</span></td>
          <td>${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-just-ag="${esc(a.id)}">${r.just ? 'Editar Just.' : 'Justificar'}</button>` : '—'}</td>
        </tr>
      `;
    }).join('') || '<tr><td colspan="9" class="subtexto" style="text-align:center;padding:16px;">Nenhum registro para este filtro.</td></tr>';

    $('tbodyFrequenciaDia').querySelectorAll('[data-ver-ponto]').forEach(img => img.addEventListener('click', () => abrirDetalhePonto(img.getAttribute('data-ver-ponto'))));
    $('tbodyFrequenciaDia').querySelectorAll('[data-just-ag]').forEach(btn => btn.addEventListener('click', () => abrirModalJustificativa(data, btn.getAttribute('data-just-ag'))));
  }

  function abrirModalJustificativa(dataISO, agenteId) {
    const ag = agentePorId(agenteId); if (!ag) return;
    const chave = `${dataISO}|${agenteId}`;
    const atual = (ESTADO.justificativas || {})[chave] || { motivo: 'Atestado Médico', obs: '' };
    abrirModal(
      `Justificativa / Ocorrência — Nº ${ag.matricula} ${ag.nome}`,
      `
        <div class="subtexto">Data da Escala: <strong>${formatarDataBR(dataISO)}</strong></div>
        <div class="campo"><label>Motivo</label>
          <select id="mJustMotivo">${JUSTIFICATIVAS_OPCOES.map(m => `<option value="${esc(m)}" ${atual.motivo === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select>
        </div>
        <div class="campo"><label>Observação / Detalhes (ex.: nº dias atestado, permutou com qual guarda)</label>
          <textarea id="mJustObs" rows="3" placeholder="Detalhes da justificativa...">${esc(atual.obs || '')}</textarea>
        </div>
      `,
      [
        ...(ESTADO.justificativas?.[chave] ? [{ texto: 'Remover Justificativa', classe: 'btn-perigo', onClick: async () => {
          delete ESTADO.justificativas[chave]; await salvarTudo(); fecharModal(); renderFrequenciaDia(); renderResumoEscaladosHoje(); renderFaixaPlantaoHoje();
        }}] : []),
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Salvar Justificativa', classe: 'btn-primario', onClick: async () => {
          ESTADO.justificativas = ESTADO.justificativas || {};
          ESTADO.justificativas[chave] = { motivo: $('mJustMotivo').value, obs: $('mJustObs').value.trim(), por: SESSAO?.nome || 'Admin', em: new Date().toISOString() };
          await salvarTudo(); fecharModal(); renderFrequenciaDia(); renderResumoEscaladosHoje(); renderFaixaPlantaoHoje();
        }}
      ]
    );
  }

  // Camera + Localizacao discreta (validacao interna silenciosa)
  async function abrirCameraAoVivo() {
    pararCamera();
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
    const w = 440, h = Math.round((v.videoHeight / v.videoWidth) * w) || 330;
    c.width = w; c.height = h; const ctx = c.getContext('2d'); ctx.drawImage(v, 0, 0, w, h);
    const ag = guardaSelecionadoPonto;
    const tipo = TIPO_PONTO_LABEL[$('selPontoTipo').value] || $('selPontoTipo').value;
    const agora = formatarDataHoraBR(new Date().toISOString());
    ctx.fillStyle = 'rgba(0,0,0,0.82)'; ctx.fillRect(0, h - 50, w, 50); ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px monospace'; ctx.fillText(`GCM VALPARAÍSO-GO · ${tipo.toUpperCase()} · ${agora}`, 8, h - 32);
    ctx.font = '10px monospace'; ctx.fillText(`Nº ${ag ? ag.matricula + ' — ' + ag.nome : 'Não identificado'}`, 8, h - 16);
    if (locAtualPonto?.lat) ctx.fillText(`GPS: ${locAtualPonto.lat.toFixed(5)}, ${locAtualPonto.lon.toFixed(5)}`, 8, h - 4);
    fotoCapturadaDataUrl = c.toDataURL('image/jpeg', 0.62);
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

  async function coletarLocalizacaoPonto() {
    if (!navigator.geolocation) return toast('Dispositivo sem GPS.');
    const btn = $('btnColetarGps'); btn.disabled = true; btn.textContent = 'Obtendo localização...';
    $('statusGpsBadge').textContent = 'Localizando...'; $('statusGpsBadge').className = 'badge badge-warn';

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

    btn.disabled = false; btn.textContent = 'Atualizar Localização';
    if (!amostras.length) {
      $('statusGpsBadge').textContent = 'Sem GPS'; $('statusGpsBadge').className = 'badge badge-erro';
      $('painelResultadoGps').classList.remove('oculto');
      $('painelResultadoGps').innerHTML = `<div class="alerta-inline erro">Não foi possível obter o GPS (${esc(errG ? errG.message : 'ative a localização')}).</div>`;
      return;
    }

    const ult = amostras[amostras.length - 1];
    // Validacao silenciosa interna (sem poluir tela)
    let irregular = false;
    if (amostras.some(a => a.mocked)) irregular = true;
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

    const stLabel = status === 'OK' ? 'Local OK' : (status === 'FORA_BASE' ? 'Fora da Base' : 'Sinal Irregular');
    const stCls = status === 'OK' ? 'badge-ok' : (status === 'FORA_BASE' ? 'badge-warn' : 'badge-erro');
    $('statusGpsBadge').textContent = stLabel; $('statusGpsBadge').className = 'badge ' + stCls;
    $('painelResultadoGps').classList.remove('oculto');
    $('painelResultadoGps').innerHTML = `
      <div><strong>Endereço:</strong> ${esc(endereco)}</div>
      <div class="subtexto">GPS: ${ult.lat.toFixed(6)}, ${ult.lon.toFixed(6)} (±${Math.round(ult.accuracy)}m) · <strong>${esc(resumoDist)}</strong></div>
    `;
  }

  async function confirmarRegistroPonto() {
    const err = $('msgPontoErro'); err.classList.add('oculto');
    if (!guardaSelecionadoPonto) { err.textContent = 'Digite seu nº provisório (ex.: 03) ou nome completo e selecione sua identificação.'; err.classList.remove('oculto'); return; }
    if (!fotoCapturadaDataUrl) { err.textContent = 'Foto ao vivo pela câmera é obrigatória.'; err.classList.remove('oculto'); return; }
    if (!locAtualPonto) { err.textContent = 'Clique em "Obter Localização Atual" antes de confirmar.'; err.classList.remove('oculto'); return; }

    const ag = guardaSelecionadoPonto;
    const agoraIso = new Date().toISOString();
    const dt = new Date(agoraIso), p2 = n => String(n).padStart(2,'0');
    const dataLocal = `${dt.getFullYear()}-${p2(dt.getMonth()+1)}-${p2(dt.getDate())}`;
    const horaLocal = `${p2(dt.getHours())}:${p2(dt.getMinutes())}:${p2(dt.getSeconds())}`;
    const tipo = $('selPontoTipo').value;
    const prevHash = ESTADO.pontos[0]?.hashIntegridade || 'GENESIS_GCM_V4';
    const hashIntegridade = window.EscalaCloud.sha256Hex(`${prevHash}|${ag.matricula}|${tipo}|${agoraIso}|${locAtualPonto.lat.toFixed(6)}|${locAtualPonto.lon.toFixed(6)}`);

    const reg = {
      id: 'pt_' + Date.now().toString(36),
      agenteId: ag.id, agenteNome: ag.nome, agenteMatricula: ag.matricula, equipe: ag.equipe,
      tipo, posto: $('inpPontoPosto').value.trim() || 'Base GCM', obs: $('inpPontoObs').value.trim(),
      timestampIso: agoraIso, dataLocal, horaLocal,
      foto: fotoCapturadaDataUrl, localizacao: locAtualPonto, hashIntegridade
    };
    ESTADO.pontos.unshift(reg);
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) await window.EscalaCloud.enviarPontoIndividualNuvem(reg);

    fotoCapturadaDataUrl = null; locAtualPonto = null;
    $('imgPreviewFoto').classList.add('oculto'); $('placeholderCamera').classList.remove('oculto');
    $('statusFoto').textContent = 'Pendente'; $('statusFoto').className = 'badge badge-neutro'; $('btnRefazerFoto').disabled = true;
    $('statusGpsBadge').textContent = 'Não obtida'; $('statusGpsBadge').className = 'badge badge-neutro'; $('painelResultadoGps').classList.add('oculto');
    $('inpPontoObs').value = '';

    selecionarGuardaParaPonto(ag);
    renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos();
    toast(`${TIPO_PONTO_LABEL[tipo] || tipo} registrada para Nº ${ag.matricula} (${ag.nomeGuerra})!`);
  }

  function filtrarPontosHistorico() {
    const m = $('fltPontoMes').value||'', b = ($('fltPontoBusca').value||'').trim().toLowerCase(), tp = $('fltPontoTipo').value||'', st = $('fltPontoStatus').value||'';
    return (ESTADO.pontos||[]).filter(p =>
      (!m || (p.dataLocal||'').startsWith(m)) &&
      (!tp || p.tipo === tp) &&
      (!st || (p.localizacao?.status||'') === st) &&
      (!b || (p.agenteNome||'').toLowerCase().includes(b) || (p.agenteMatricula||'').toLowerCase().includes(b))
    );
  }

  function abrirDetalhePonto(id) {
    const pt = (ESTADO.pontos||[]).find(x => x.id === id); if (!pt) return;
    const loc = pt.localizacao || {};
    const stTxt = loc.status === 'OK' ? 'Local Regular' : (loc.status === 'FORA_BASE' ? 'Fora da Base' : 'Sinal Irregular');
    abrirModal(
      `Registro — Nº ${pt.agenteMatricula} ${pt.agenteNome}`,
      `<div style="text-align:center;"><img src="${pt.foto}" style="max-width:100%;border-radius:6px;border:1px solid var(--border);"></div>
       <div class="box-borda" style="font-size:12px;">
         <div><strong>Batida:</strong> ${esc(TIPO_PONTO_LABEL[pt.tipo] || pt.tipo)} · ${formatarDataBR(pt.dataLocal)} às ${esc(pt.horaLocal)}</div>
         <div><strong>Equipe / Posto:</strong> ${esc(pt.equipe)} · ${esc(pt.posto)}</div>
         <div><strong>Endereço:</strong> ${esc(loc.endereco || '—')}</div>
         <div><strong>Coordenadas:</strong> ${loc.lat ? loc.lat.toFixed(6) + ', ' + loc.lon.toFixed(6) : '—'} (${esc(loc.resumoDist || '')})</div>
         <div><strong>Verificação:</strong> ${esc(stTxt)}</div>
         ${pt.obs ? `<div><strong>Obs.:</strong> ${esc(pt.obs)}</div>` : ''}
         <div><strong>Protocolo:</strong> <code>${esc((pt.hashIntegridade||'').slice(0,18))}</code></div>
       </div>`,
      [
        ...(isAdmin() ? [{ texto: 'Excluir (Admin)', classe: 'btn-perigo', onClick: async () => {
          if (!confirm('Excluir registro?')) return;
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
      const cls = st === 'OK' ? 'badge-ok' : (st === 'FORA_BASE' ? 'badge-warn' : 'badge-erro');
      const txt = st === 'OK' ? 'Regular' : (st === 'FORA_BASE' ? 'Fora da Base' : 'Irregular');
      return `
        <tr>
          <td><img src="${p.foto}" class="foto-thumb" data-ver-ponto="${esc(p.id)}"></td>
          <td><strong>${formatarDataBR(p.dataLocal)}</strong><div class="subtexto">${esc(p.horaLocal)}</div></td>
          <td><strong>Nº ${esc(p.agenteMatricula)} — ${esc(p.agenteNome)}</strong><div class="subtexto">${esc(p.equipe)} · ${esc(p.posto)}</div></td>
          <td><span class="badge badge-neutro">${esc(TIPO_PONTO_LABEL[p.tipo] || p.tipo)}</span></td>
          <td><div style="max-width:220px;font-size:12px;">${esc(p.localizacao?.endereco || '—')}</div><div class="subtexto">${esc(p.localizacao?.resumoDist || '')}</div></td>
          <td><span class="badge ${cls}">${esc(txt)}</span></td>
        </tr>
      `;
    }).join('');
    $('tbodyPontos').querySelectorAll('[data-ver-ponto]').forEach(img => img.addEventListener('click', () => abrirDetalhePonto(img.getAttribute('data-ver-ponto'))));
  }

  // =========================================================================
  // 2. ESCALA CONTINUA 24x72 (AUTOALIMENTADA TODO DIA)
  // =========================================================================
  function renderCalendario24() {
    const modo = $('selModoEscala').value || 'CONTINUO_30';
    $('wrapMesEscala').classList.toggle('oculto', modo !== 'MES');
    $('selMesEscala').value = $('selMesEscala').value || mesAtualISO();
    $('inpDataBaseAlfa').value = ESTADO.config.dataBaseAlfa || hojeISO();
    $('inpHorarioTroca').value = ESTADO.config.horarioTroca || '07:00 às 07:00';

    const { titulo, datas } = gerarListaDatasEscala();
    const hoje = hojeISO();
    $('boxResumoEscalaContinua').innerHTML = `<strong>Escala Ativa:</strong> ${esc(titulo)} · Ciclo contínuo 24h de serviço × 72h de descanso (todo dia que passa acrescenta automaticamente um novo dia na frente).`;

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
    $('tbodyCalendario24').querySelectorAll('[data-ir-freq]').forEach(b => b.addEventListener('click', () => {
      const dt = b.getAttribute('data-ir-freq');
      abrirAba('secPonto');
      ativarSubtab('secPonto', 'subPtFrequencia');
      $('inpFreqData').value = dt;
      renderFrequenciaDia();
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
    const eq = $('selEquipeMontagem').value || 'ALFA';
    const mont = ESTADO.equipesMontagem[eq] || {};
    const daEq = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === eq);
    const outros = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe !== eq);
    const opts = (sel) => '<option value="">— Vago —</option><optgroup label="Equipe ' + eq + '">' + daEq.map(a => `<option value="${esc(a.id)}" ${a.id===sel?'selected':''}>[${esc(a.matricula)}] ${esc(a.nomeGuerra)}</option>`).join('') + '</optgroup><optgroup label="Outros">' + outros.map(a => `<option value="${esc(a.id)}" ${a.id===sel?'selected':''}>[${esc(a.equipe)} · ${esc(a.matricula)}] ${esc(a.nomeGuerra)}</option>`).join('') + '</optgroup>';
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('gridPostosEquipe').innerHTML = ESTADO.postos.map(p => {
      const g = mont[p.id] || { g01:'', g02:'', g03:'' };
      return `
        <div class="posto-card" data-posto-id="${esc(p.id)}" style="border-left-color:${esc(p.cor || '#18181B')};">
          <div class="card-cab">
            <div><strong>${esc(p.nome)}</strong><div class="subtexto">Resp.: ${esc(p.responsavel || 'A definir')} · ${esc(p.bairros)}</div></div>
            ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-rem-posto="${esc(p.id)}">Remover</button>` : ''}
          </div>
          <div class="campo"><label>01 — Comandante</label><select class="sel-g01" ${desab}>${opts(g.g01)}</select></div>
          <div class="campo"><label>02 — Motorista</label><select class="sel-g02" ${desab}>${opts(g.g02)}</select></div>
          <div class="campo"><label>03 — Patrulheiro (Opcional)</label><select class="sel-g03" ${desab}>${opts(g.g03)}</select></div>
        </div>
      `;
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
      ['.sel-g01','.sel-g02','.sel-g03'].forEach(cls => {
        const val = card.querySelector(cls)?.value; if (!val) return;
        if (vistos.has(val)) dups.push(`${nomeAgentePorId(val)} (${vistos.get(val)} e ${pid})`); else vistos.set(val, pid);
      });
    });
    const box = $('alertaConflitoEquipe');
    if (dups.length) { box.textContent = 'Conflito (mesmo guarda em 2 postos): ' + dups.join(' | '); box.classList.remove('oculto'); }
    else box.classList.add('oculto');
    return dups.length === 0;
  }

  async function salvarMontagemEquipeAtual() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    if (!verificarConflitosEquipeUI() && !confirm('Há conflito na mesma equipe. Salvar mesmo assim?')) return;
    const eq = $('selEquipeMontagem').value; ESTADO.equipesMontagem[eq] = ESTADO.equipesMontagem[eq] || {};
    $('gridPostosEquipe').querySelectorAll('.posto-card').forEach(card => {
      ESTADO.equipesMontagem[eq][card.getAttribute('data-posto-id')] = { g01: card.querySelector('.sel-g01').value, g02: card.querySelector('.sel-g02').value, g03: card.querySelector('.sel-g03').value };
    });
    await salvarTudo(); renderQuadroPessoas(); renderResumoEscaladosHoje();
  }

  function autoDistribuirEquipeAtual() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    const eq = $('selEquipeMontagem').value, livres = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === eq), usados = new Set();
    const pegar = (area, pf) => { let f = pf ? livres.find(a => a.sexo==='F' && !usados.has(a.id)) : null; if (!f) f = livres.find(a => a.area===area && !usados.has(a.id)) || livres.find(a => !usados.has(a.id)); if (f) usados.add(f.id); return f ? f.id : ''; };
    ESTADO.equipesMontagem[eq] = {};
    [...ESTADO.postos].sort((a,b) => a.area==='MARIA_DA_PENHA' ? -1 : 1).forEach(p => { const pf = p.area==='MARIA_DA_PENHA'; ESTADO.equipesMontagem[eq][p.id] = { g01: pegar(p.area, pf), g02: p.area==='CCO'?'':pegar(p.area, pf), g03: '' }; });
    ESTADO.postos.filter(p => p.area==='PATRULHAMENTO').forEach(p => { const s = livres.find(a => !usados.has(a.id)); if (s) { usados.add(s.id); ESTADO.equipesMontagem[eq][p.id].g03 = s.id; } });
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
      p.prefixo = card.querySelector('.st-prefixo').value.trim() || p.id;
      p.nome = card.querySelector('.st-nome').value.trim() || p.nome;
      p.responsavel = card.querySelector('.st-resp').value.trim();
      p.setor = card.querySelector('.st-setor').value.trim() || p.setor;
      p.area = card.querySelector('.st-area').value;
      p.bairros = card.querySelector('.st-bairros').value.trim();
      if (ESTADO.cartoesModelo[p.id]) Object.assign(ESTADO.cartoesModelo[p.id], { setor: p.setor, prefixo: p.prefixo, bairros: p.bairros, responsavel: p.responsavel });
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
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Adicionar', classe: 'btn-primario', onClick: async () => {
          const id = ($('mPosId').value||'').trim().toUpperCase().replace(/\s+/g,'-'), nome = ($('mPosNome').value||'').trim();
          if (!id || !nome) return toast('Informe prefixo e nome.');
          if (ESTADO.postos.some(x => x.id === id)) return toast('Já existe.');
          const novo = { id, nome, area: $('mPosArea').value, setor: nome, bairros: $('mPosBairros').value.trim() || 'Valparaíso de Goiás', prefixo: id, cor: '#3F3F46', responsavel: $('mPosResp').value.trim() || 'A definir', poligono: POLIGONOS_PADRAO['MUNICIPIO'] };
          ESTADO.postos.push(novo); ESTADO.cartoesModelo[id] = criarModeloCartaoPadrao(novo);
          await salvarTudo(); fecharModal(); atualizarTodasVistas();
        }}
      ]
    );
  }

  function renderAdmE12x36() {
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('listaCargosAdm').innerHTML = (ESTADO.administrativo || []).map((c, idx) => `
      <div class="linha-editavel" data-adm-idx="${idx}">
        <div class="campo"><label>Cargo</label><input type="text" class="adm-cargo" value="${esc(c.cargo)}" ${desab}></div>
        <div class="campo"><label>Titular</label><input type="text" class="adm-titular" value="${esc(c.titular)}" ${desab}></div>
        ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-adm="${idx}">X</button>` : ''}
        <div class="campo"><label>Horário</label><input type="text" class="adm-horario" value="${esc(c.horario||'Seg–Sex · 08h às 17h')}" ${desab}></div>
        <div class="campo"><label>Obs.</label><input type="text" class="adm-obs" value="${esc(c.obs||'')}" ${desab}></div>
      </div>
    `).join('');
    $('listaCargosAdm').querySelectorAll('[data-del-adm]').forEach(b => b.addEventListener('click', () => { ESTADO.administrativo.splice(Number(b.getAttribute('data-del-adm')), 1); renderAdmE12x36(); }));

    $('listaPostos12x36').innerHTML = (ESTADO.escala12x36 || []).map((e, idx) => `
      <div class="linha-editavel" data-e12-idx="${idx}">
        <div class="campo"><label>Posto 12x36</label><input type="text" class="e12-posto" value="${esc(e.posto)}" ${desab}></div>
        <div class="campo"><label>Turno</label><input type="text" class="e12-turno" value="${esc(e.turno)}" ${desab}></div>
        ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-e12="${idx}">X</button>` : ''}
        <div class="campo"><label>Turma A</label><input type="text" class="e12-a" value="${esc(e.equipeA||'')}" ${desab}></div>
        <div class="campo"><label>Turma B</label><input type="text" class="e12-b" value="${esc(e.equipeB||'')}" ${desab}></div>
      </div>
    `).join('');
    $('listaPostos12x36').querySelectorAll('[data-del-e12]').forEach(b => b.addEventListener('click', () => { ESTADO.escala12x36.splice(Number(b.getAttribute('data-del-e12')), 1); renderAdmE12x36(); }));
  }

  function renderResponsaveis() {
    const r = ESTADO.config.responsaveis || {};
    $('inpRespEscalanteNome').value = r.escalanteNome || ''; $('inpRespEscalanteCargo').value = r.escalanteCargo || ''; $('inpRespEscalanteMat').value = r.escalanteMat || '';
    $('inpRespComandoNome').value = r.comandoNome || ''; $('inpRespComandoCargo').value = r.comandoCargo || ''; $('inpRespComandoMat').value = r.comandoMat || '';
  }

  // =========================================================================
  // 3. CARTAO PROGRAMA + MAPA INTERATIVO DOS SETORES (LEAFLET + CROQUI SVG)
  // =========================================================================
  function iniciarMapaSetorSePreciso() {
    if (mapaSetor || typeof L === 'undefined') return;
    const container = $('mapaSetorCanvas');
    if (!container) return;
    mapaSetor = L.map(container, { zoomControl: true }).setView([-16.0650, -47.9790], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(mapaSetor);
    camadaPoligonos = L.layerGroup().addTo(mapaSetor);
    camadaPbs = L.layerGroup().addTo(mapaSetor);

    mapaSetor.on('click', (e) => {
      if (!modoMarcarPbMapa) return;
      const lat = Number(e.latlng.lat.toFixed(5));
      const lon = Number(e.latlng.lng.toFixed(5));
      const cur = lerCartaoDoEditor();
      const proxNum = cur.pontosBase.length + 1;
      cur.pontosBase.push({
        hora: '00:00 - 00:00',
        local: `PB ${proxNum} — Ponto marcado no mapa`,
        atividade: 'Descreva o que a guarnição deve fazer neste ponto...',
        lat, lon
      });
      renderLinhasPb(cur.pontosBase);
      modoMarcarPbMapa = false;
      $('avisoCliqueMapa').classList.add('oculto');
      $('btnModoMarcarPb').textContent = '+ Marcar PB clicando no Mapa';
      atualizarDesenhoMapaSetor();
      toast(`PB ${proxNum} marcado em (${lat}, ${lon}). Preencha o nome/horário e clique em Salvar.`);
    });
  }

  function atualizarDesenhoMapaSetor() {
    if (!mapaSetor || !camadaPoligonos || !camadaPbs) return;
    camadaPoligonos.clearLayers();
    camadaPbs.clearLayers();

    const pid = $('selCartaoPosto').value || ESTADO.postos[0]?.id;
    const postoAtual = ESTADO.postos.find(p => p.id === pid);
    const mostrarTodos = $('chkMostrarTodosSetores')?.checked;

    const listaDesenho = mostrarTodos ? ESTADO.postos.filter(p => p.id.startsWith('VTR-')) : (postoAtual ? [postoAtual] : []);
    let boundsAlvo = null;

    listaDesenho.forEach(p => {
      const poly = p.poligono || POLIGONOS_PADRAO[p.id] || POLIGONOS_PADRAO['MUNICIPIO'];
      if (!poly || !poly.length) return;
      const ehAtual = p.id === pid;
      const layer = L.polygon(poly, {
        color: p.cor || '#18181B',
        weight: ehAtual ? 3 : 1.5,
        fillColor: p.cor || '#18181B',
        fillOpacity: ehAtual ? 0.16 : 0.05,
        dashArray: ehAtual ? null : '5,5'
      }).addTo(camadaPoligonos);
      layer.bindTooltip(`${p.prefixo} — ${p.setor} (${p.bairros})`, { sticky: true });
      if (ehAtual) boundsAlvo = layer.getBounds();
    });

    // Desenha os PBs do cartao atual como pinos numerados (1, 2, 3...)
    const cpAtual = lerCartaoDoEditor();
    (cpAtual.pontosBase || []).forEach((pb, i) => {
      if (typeof pb.lat !== 'number' || typeof pb.lon !== 'number' || isNaN(pb.lat) || isNaN(pb.lon)) return;
      const icon = L.divIcon({ className: 'pb-pin-icon', html: String(i + 1), iconSize: [26, 26], iconAnchor: [13, 13] });
      const mk = L.marker([pb.lat, pb.lon], { icon, draggable: podeEditarEscala() }).addTo(camadaPbs);
      mk.bindPopup(`<strong>PB ${i + 1} (${esc(pb.hora)})</strong><br>${esc(pb.local)}<br><small>${esc(pb.atividade)}</small>`);
      mk.on('dragend', () => {
        const pos = mk.getLatLng();
        const trs = $('tbodyPontosBase').querySelectorAll('tr');
        if (trs[i]) {
          const inpCoord = trs[i].querySelector('.pb-gps');
          if (inpCoord) inpCoord.value = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`;
        }
        toast(`PB ${i + 1} movido! Clique em Salvar para gravar.`);
      });
    });

    if (postoAtual) {
      $('tituloMapaSetor').textContent = `Mapa do ${postoAtual.setor} (${postoAtual.prefixo}) — Valparaíso de Goiás`;
      $('subMapaSetor').textContent = `Bairros: ${postoAtual.bairros} · Arraste os pinos numerados ou clique em "+ Marcar PB" para ajustar.`;
    }
    if (boundsAlvo && boundsAlvo.isValid()) {
      mapaSetor.fitBounds(boundsAlvo, { padding: [24, 24], maxZoom: 15 });
    }
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
      responsavel: posto.responsavel || mod.responsavel || '',
      g01: nomeAgentePorId(mont.g01) || '', g02: nomeAgentePorId(mont.g02) || '', g03: nomeAgentePorId(mont.g03) || '',
      missao: mod.missao || '', pontosBase: JSON.parse(JSON.stringify(mod.pontosBase || [])), obs: mod.obs || ''
    };
  }
  function sincronizarDataCartao() {
    const d = $('inpCartaoData').value || hojeISO(); $('inpCartaoData').value = d;
    $('selCartaoEquipe').value = calcularCiclo24x72(d).equipeServico;
    carregarEditorCartao();
  }
  function carregarEditorCartao() {
    const d = $('inpCartaoData').value || hojeISO(), eq = $('selCartaoEquipe').value || 'ALFA';
    const pid = $('selCartaoPosto').value || ESTADO.postos[0]?.id;
    const posto = ESTADO.postos.find(p => p.id === pid); if (!posto) return;
    const cp = obterDadosCartao(d, eq, pid);
    $('tituloEditorCartao').textContent = `Roteiro Operacional — ${posto.prefixo} (${posto.setor})`;
    $('badgeAreaCartao').textContent = `EQUIPE ${eq} · ${formatarDataBR(d)}`;
    $('inpCpSetor').value = cp.setor || ''; $('inpCpPrefixo').value = cp.prefixo || '';
    $('inpCpRespSetor').value = cp.responsavel || ''; $('inpCpBairros').value = cp.bairros || '';
    $('inpCpG01').value = cp.g01 || ''; $('inpCpG02').value = cp.g02 || ''; $('inpCpG03').value = cp.g03 || '';
    $('inpCpMissao').value = cp.missao || ''; $('inpCpObs').value = cp.obs || '';
    renderLinhasPb(cp.pontosBase || []);
    setTimeout(() => { iniciarMapaSetorSePreciso(); if (mapaSetor) { mapaSetor.invalidateSize(); atualizarDesenhoMapaSetor(); } }, 80);
  }
  function renderLinhasPb(lista) {
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('tbodyPontosBase').innerHTML = (lista || []).map((it, i) => {
      const gpsStr = (typeof it.lat === 'number' && typeof it.lon === 'number') ? `${it.lat.toFixed(5)}, ${it.lon.toFixed(5)}` : '';
      return `
        <tr>
          <td><strong>PB ${i + 1}</strong></td>
          <td><input type="text" class="pb-hora" value="${esc(it.hora||'')}" ${desab}></td>
          <td><input type="text" class="pb-local" value="${esc(it.local||'')}" ${desab}></td>
          <td><input type="text" class="pb-ativ" value="${esc(it.atividade||'')}" ${desab}></td>
          <td><input type="text" class="pb-gps" value="${esc(gpsStr)}" placeholder="-16.07, -47.98" ${desab}></td>
          <td>${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-pb="${i}">X</button>` : ''}</td>
        </tr>
      `;
    }).join('');
    $('tbodyPontosBase').querySelectorAll('[data-del-pb]').forEach(b => b.addEventListener('click', () => { b.closest('tr').remove(); atualizarDesenhoMapaSetor(); }));
  }
  function lerCartaoDoEditor() {
    const pontosBase = [];
    $('tbodyPontosBase').querySelectorAll('tr').forEach(tr => {
      const hora = tr.querySelector('.pb-hora')?.value.trim() || '';
      const local = tr.querySelector('.pb-local')?.value.trim() || '';
      const atividade = tr.querySelector('.pb-ativ')?.value.trim() || '';
      const gpsRaw = (tr.querySelector('.pb-gps')?.value || '').split(',').map(x => Number(x.trim()));
      const lat = (gpsRaw.length === 2 && !isNaN(gpsRaw[0])) ? gpsRaw[0] : null;
      const lon = (gpsRaw.length === 2 && !isNaN(gpsRaw[1])) ? gpsRaw[1] : null;
      if (hora || local || atividade) pontosBase.push({ hora, local, atividade, lat, lon });
    });
    return { setor: $('inpCpSetor').value.trim(), prefixo: $('inpCpPrefixo').value.trim(), responsavel: $('inpCpRespSetor').value.trim(), bairros: $('inpCpBairros').value.trim(), g01: $('inpCpG01').value.trim(), g02: $('inpCpG02').value.trim(), g03: $('inpCpG03').value.trim(), missao: $('inpCpMissao').value.trim(), pontosBase, obs: $('inpCpObs').value.trim() };
  }

  // Gera croqui vetorial SVG georreferenciado do Setor + PBs numerados para embutir no PDF (funciona 100% offline)
  function gerarCroquiSvgSetor(posto, pontosBase) {
    const poly = posto.poligono || POLIGONOS_PADRAO[posto.id] || POLIGONOS_PADRAO['MUNICIPIO'];
    const todosPts = [...poly];
    (pontosBase || []).forEach(pb => { if (typeof pb.lat === 'number' && typeof pb.lon === 'number') todosPts.push([pb.lat, pb.lon]); });
    const lats = todosPts.map(p => p[0]), lons = todosPts.map(p => p[1]);
    const minLat = Math.min(...lats) - 0.0022, maxLat = Math.max(...lats) + 0.0022;
    const minLon = Math.min(...lons) - 0.0025, maxLon = Math.max(...lons) + 0.0025;
    const W = 250, H = 155, pad = 16;
    const x = (lon) => pad + ((lon - minLon) / Math.max(0.0001, maxLon - minLon)) * (W - pad * 2);
    const y = (lat) => pad + ((maxLat - lat) / Math.max(0.0001, maxLat - minLat)) * (H - pad * 2);

    const ptsStr = poly.map(p => `${x(p[1]).toFixed(1)},${y(p[0]).toFixed(1)}`).join(' ');
    const pinos = (pontosBase || []).map((pb, i) => {
      if (typeof pb.lat !== 'number' || typeof pb.lon !== 'number') return '';
      const cx = x(pb.lon).toFixed(1), cy = y(pb.lat).toFixed(1);
      return `<circle cx="${cx}" cy="${cy}" r="8" fill="#141414" stroke="#FFFFFF" stroke-width="1.5"/><text x="${cx}" y="${(Number(cy)+3).toFixed(1)}" text-anchor="middle" fill="#FFFFFF" font-size="8.5" font-weight="bold" font-family="Arial">${i+1}</text>`;
    }).join('');

    return `
      <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="border:1px solid #333;background:#F7F7F5;display:block;">
        <line x1="0" y1="${H/2}" x2="${W}" y2="${H/2}" stroke="#E0E0DC" stroke-dasharray="3,3"/>
        <line x1="${W/2}" y1="0" x2="${W/2}" y2="${H}" stroke="#E0E0DC" stroke-dasharray="3,3"/>
        <polygon points="${ptsStr}" fill="${esc(posto.cor||'#18181B')}" fill-opacity="0.14" stroke="${esc(posto.cor||'#18181B')}" stroke-width="2"/>
        ${pinos}
        <text x="6" y="12" font-size="8" font-weight="bold" fill="#141414" font-family="Arial">CROQUI ${esc(posto.setor.toUpperCase())} — VALPARAÍSO-GO</text>
        <text x="${W-16}" y="14" font-size="8" font-weight="bold" fill="#333" font-family="Arial">N↑</text>
      </svg>
    `;
  }

  function copiarResumoWhatsApp() {
    const d = $('inpCartaoData').value || hojeISO(), eq = $('selCartaoEquipe').value;
    const ls = [`*GCM VALPARAÍSO DE GOIÁS — CARTÃO PROGRAMA*`, `Data: *${formatarDataBR(d)}* | Turno: *${ESTADO.config.horarioTroca}*`, `Equipe 24x72: *EQUIPE ${eq}*`, `--------------------------------`];
    ESTADO.postos.forEach(p => {
      const cp = obterDadosCartao(d, eq, p.id);
      ls.push(`*${cp.prefixo || p.id} — ${cp.setor}*`);
      if (cp.responsavel) ls.push(`Resp. Setor: ${cp.responsavel}`);
      ls.push(`Cobertura: ${cp.bairros}`);
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
  // 4. EVENTOS EXTRAORDINARIOS
  // =========================================================================
  function statusAgenteNaData(ag, dataISO) {
    if (!ag) return '';
    if (ag.equipe === 'ADM') return 'ADM (Seg–Sex)';
    if (ag.equipe === '12X36') return '12x36';
    const st = calcularCiclo24x72(dataISO).mapa[ag.equipe];
    if (!st) return ag.equipe;
    if (st.codigo === 'SERVICO') return 'EM SERVIÇO 24h';
    if (st.codigo === 'FOLGA_1') return '1ª Folga 24h — Evitar';
    if (st.codigo === 'FOLGA_2') return '2ª Folga 48h — IDEAL';
    return '3ª Folga 72h — Entra amanhã';
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
    $('boxDicaFolgaEvento').innerHTML = `<strong>Folgas em ${formatarDataBR(dataISO)}:</strong> Serviço 24h: <span class="insig eq-${c.equipeServico}">${c.equipeServico}</span> · Ideal para convocação extra (2ª Folga 48h): <span class="insig eq-${ideal}">${ideal}</span>.`;
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
  }
  function renderViaturasEvento(viaturas, dataISO) {
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO'), desab = podeEditarEscala() ? '' : 'disabled';
    const peso = (a) => a.equipe==='ADM' ? 2 : ({ FOLGA_2:1, FOLGA_3:4, FOLGA_1:5, SERVICO:6 }[calcularCiclo24x72(dataISO).mapa[a.equipe]?.codigo] || 3);
    const ord = [...ativos].sort((a,b) => peso(a) - peso(b) || Number(a.matricula) - Number(b.matricula));
    const opts = (sel) => '<option value="">— Vago —</option>' + ord.map(a => `<option value="${esc(a.id)}" ${a.id===sel?'selected':''}>[${esc(a.matricula)}] ${esc(a.nomeGuerra)} · ${esc(a.equipe)} (${esc(statusAgenteNaData(a, dataISO))})</option>`).join('');
    $('gridViaturasEvento').innerHTML = (viaturas||[]).map((v, idx) => `
      <div class="posto-card" data-evv-idx="${idx}">
        <div class="card-cab"><strong>Viatura Extra #${idx+1}</strong>${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-del-evv="${idx}">Remover</button>`:''}</div>
        <div class="grid-2"><div class="campo"><label>Prefixo</label><input type="text" class="evv-pref" value="${esc(v.prefixo||'')}" ${desab}></div><div class="campo"><label>Setor no Evento</label><input type="text" class="evv-setor" value="${esc(v.setor||'')}" ${desab}></div></div>
        <div class="grid-2"><div class="campo"><label>01 — Comandante</label><select class="evv-g01" ${desab}>${opts(v.g01)}</select></div><div class="campo"><label>02 — Motorista</label><select class="evv-g02" ${desab}>${opts(v.g02)}</select></div></div>
        <div class="grid-2"><div class="campo"><label>03 — Patrulheiro</label><select class="evv-g03" ${desab}>${opts(v.g03)}</select></div><div class="campo"><label>04 — Apoio</label><select class="evv-g04" ${desab}>${opts(v.g04)}</select></div></div>
      </div>
    `).join('');
    $('gridViaturasEvento').querySelectorAll('[data-del-evv]').forEach(btn => btn.addEventListener('click', () => { const cur = lerEventoDoEditor(); cur.viaturas.splice(Number(btn.getAttribute('data-del-evv')), 1); renderViaturasEvento(cur.viaturas, cur.data); }));
  }
  function lerEventoDoEditor() {
    const viaturas = [];
    $('gridViaturasEvento').querySelectorAll('.posto-card').forEach((card, i) => viaturas.push({ id: 'evv_'+i, prefixo: card.querySelector('.evv-pref').value.trim()||`VTR-EVENTO 0${i+1}`, setor: card.querySelector('.evv-setor').value.trim(), g01: card.querySelector('.evv-g01').value, g02: card.querySelector('.evv-g02').value, g03: card.querySelector('.evv-g03').value, g04: card.querySelector('.evv-g04').value }));
    return { id: eventoSelecionadoId, nome: $('inpEvNome').value.trim()||'Evento', local: $('inpEvLocal').value.trim(), data: $('inpEvData').value||hojeISO(), inicio: $('inpEvInicio').value||'16:00', fim: $('inpEvFim').value||'23:00', regime: $('selEvRegime').value, coordenador: $('inpEvCoord').value.trim(), missao: $('inpEvMissao').value.trim(), obs: $('inpEvObs').value.trim(), viaturas };
  }
  function copiarWhatsAppEvento() {
    const ev = lerEventoDoEditor();
    const ls = [`*GCM VALPARAÍSO — ESCALA DE EVENTO*`, `Evento: *${ev.nome}*`, `Data: *${formatarDataBR(ev.data)}* (${ev.inicio}–${ev.fim})`, `Local: ${ev.local}`, `Coordenador: ${ev.coordenador||'A definir'}`, `--------------------------------`];
    (ev.viaturas||[]).forEach(v => { ls.push(`*${v.prefixo}* — ${v.setor}`); ls.push([v.g01&&`01: ${nomeAgentePorId(v.g01)}`, v.g02&&`02: ${nomeAgentePorId(v.g02)}`, v.g03&&`03: ${nomeAgentePorId(v.g03)}`, v.g04&&`04: ${nomeAgentePorId(v.g04)}`].filter(Boolean).join(' | ')||'A definir'); ls.push(''); });
    const txt = ls.join('\n');
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(() => toast('Evento copiado!'));
    else abrirModal('WhatsApp', `<textarea rows="11" style="width:100%;font-family:monospace;">${esc(txt)}</textarea>`, [{ texto: 'Fechar', onClick: fecharModal }]);
  }
  function gerarPdfEvento() {
    const ev = lerEventoDoEditor();
    const rows = (ev.viaturas||[]).map(v => `<tr><td><strong>${esc(v.prefixo)}</strong><br><small>${esc(v.setor)}</small></td><td>${esc(nomeAgentePorId(v.g01)||'—')}</td><td>${esc(nomeAgentePorId(v.g02)||'—')}</td><td>${esc(nomeAgentePorId(v.g03)||'—')}</td><td>${esc(nomeAgentePorId(v.g04)||'—')}</td></tr>`).join('');
    exportarHtmlParaPdf(montarDocumentoPdf(`Evento ${ev.nome}`, `${cabecalhoPdfHtml('ORDEM DE SERVIÇO — ESCALA DE EVENTO', `${ev.nome} · ${formatarDataBR(ev.data)} (${ev.inicio}–${ev.fim})`)}<div class="box"><div class="grid-info"><div><strong>Evento:</strong><br>${esc(ev.nome)}</div><div><strong>Local:</strong><br>${esc(ev.local)}</div><div><strong>Modalidade:</strong><br>${esc(MODALIDADE_EVENTO[ev.regime]||ev.regime)}</div></div><div><strong>Coordenador:</strong> ${esc(ev.coordenador||'—')} · <strong>Missão:</strong> ${esc(ev.missao||'—')}</div></div><h2>VIATURAS E GUARNIÇÕES</h2><table><thead><tr><th>Viatura / Setor</th><th>01</th><th>02</th><th>03</th><th>04</th></tr></thead><tbody>${rows}</tbody></table><div class="box" style="margin-top:8px;"><strong>Observações:</strong> ${esc(ev.obs||'—')}</div>${rodapeAssinaturasPdfHtml()}`, false), `escala-evento-${ev.data}.pdf`, false);
  }

  // =========================================================================
  // 5. EFETIVO & SISTEMA
  // =========================================================================
  function renderEfetivo() {
    const busca = ($('fltEfBusca').value||'').trim().toLowerCase(), eq = $('fltEfEquipe').value||'', area = $('fltEfArea').value||'';
    const lista = ESTADO.efetivo.filter(a => (!eq||a.equipe===eq) && (!area||a.area===area) && (!busca || a.nome.toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca) || (a.nomeGuerra||'').toLowerCase().includes(busca)));
    $('tbodyEfetivo').innerHTML = lista.map(a => `
      <tr>
        <td><strong>${esc(a.matricula)}</strong></td>
        <td><strong>${esc(a.nome)}</strong></td>
        <td>${esc(a.nomeGuerra || '—')}</td>
        <td><span class="insig eq-${esc(a.equipe)}">${esc(a.equipe)}</span></td>
        <td>${esc(AREAS_LABEL[a.area] || a.area)}</td>
        <td>${esc(FUNCOES_LABEL[a.funcao] || a.funcao)}</td>
        <td><span class="badge ${a.situacao==='ATIVO'?'badge-ok':'badge-warn'}">${esc(a.situacao)}</span></td>
        <td>${podeEditarEscala()?`<button type="button" class="btn btn-sec btn-sm" data-ed-ag="${esc(a.id)}">Editar</button> <button type="button" class="btn btn-sec btn-sm" data-del-ag="${esc(a.id)}">X</button>`:'—'}</td>
      </tr>
    `).join('');
    $('tbodyEfetivo').querySelectorAll('[data-ed-ag]').forEach(b => b.addEventListener('click', () => abrirModalAgente(agentePorId(b.getAttribute('data-ed-ag')))));
    $('tbodyEfetivo').querySelectorAll('[data-del-ag]').forEach(b => b.addEventListener('click', async () => { if (!confirm('Remover guarda?')) return; ESTADO.efetivo = ESTADO.efetivo.filter(x => x.id !== b.getAttribute('data-del-ag')); await salvarTudo(); atualizarTodasVistas(); }));
  }

  function abrirModalAgente(agente) {
    const a = agente || { id:'', matricula:'', nome:'', nomeGuerra:'', sexo:'M', telefone:'', equipe:'ALFA', area:'PATRULHAMENTO', funcao:'PATRULHEIRO_03', regime:'24X72', situacao:'ATIVO' };
    abrirModal(agente ? 'Editar Guarda GCM' : 'Novo Guarda GCM',
      `<div class="grid-2"><div class="campo"><label>Nome Completo</label><input type="text" id="mAgNome" value="${esc(a.nome)}"></div><div class="campo"><label>Nome de Guerra</label><input type="text" id="mAgGuerra" value="${esc(a.nomeGuerra||'')}"></div></div>
       <div class="grid-2"><div class="campo"><label>Nº Provisório / Matrícula Oficial</label><input type="text" id="mAgMat" value="${esc(a.matricula)}" placeholder="Ex.: 03"></div><div class="campo"><label>Telefone</label><input type="text" id="mAgTel" value="${esc(a.telefone||'')}"></div></div>
       <div class="grid-2"><div class="campo"><label>Equipe</label><select id="mAgEquipe">${['ALFA','BRAVO','CHARLIE','DELTA','ADM','12X36'].map(e => `<option value="${e}" ${a.equipe===e?'selected':''}>${e}</option>`).join('')}</select></div>
       <div class="campo"><label>Especialidade</label><select id="mAgArea">${Object.entries(AREAS_LABEL).map(([k,v]) => `<option value="${k}" ${a.area===k?'selected':''}>${v}</option>`).join('')}</select></div></div>
       <div class="grid-2"><div class="campo"><label>Função</label><select id="mAgFuncao">${Object.entries(FUNCOES_LABEL).map(([k,v]) => `<option value="${k}" ${a.funcao===k?'selected':''}>${v}</option>`).join('')}</select></div>
       <div class="campo"><label>Situação</label><select id="mAgSit">${['ATIVO','FERIAS','LICENCA','AFASTADO'].map(s => `<option value="${s}" ${a.situacao===s?'selected':''}>${s}</option>`).join('')}</select></div></div>`,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Salvar', classe: 'btn-primario', onClick: async () => {
          const nome = $('mAgNome').value.trim(); if (!nome) return toast('Informe o nome.');
          const eqSel = $('mAgEquipe').value;
          const obj = { id: a.id || 'ag_' + Date.now().toString(36), matricula: $('mAgMat').value.trim().toUpperCase() || String(ESTADO.efetivo.length + 1).padStart(2,'0'), nome, nomeGuerra: $('mAgGuerra').value.trim() || gerarNomeGuerra(nome), sexo: a.sexo||'M', telefone: $('mAgTel').value.trim(), equipe: eqSel, area: $('mAgArea').value, funcao: $('mAgFuncao').value, regime: eqSel==='ADM'?'ADM_SEG_SEX':(eqSel==='12X36'?'12X36':'24X72'), situacao: $('mAgSit').value };
          if (agente) { const i = ESTADO.efetivo.findIndex(x => x.id === a.id); if (i >= 0) ESTADO.efetivo[i] = obj; } else ESTADO.efetivo.push(obj);
          await salvarTudo(); fecharModal(); atualizarTodasVistas();
        }}
      ]
    );
  }

  function abrirModalImportar64() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    abrirModal('Importar Nomes', `<p class="subtexto">Cole 1 nome por linha (ou <code>Nome ; Nº ; Equipe</code>).</p><textarea id="txtImportarNomes" rows="9"></textarea><label class="check-linha"><input type="checkbox" id="chkSubstituirModelo"><span>Substituir lista atual</span></label>`, [
      { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
      { texto: 'Importar', classe: 'btn-primario', onClick: async () => {
        const ls = ($('txtImportarNomes').value||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean); if (!ls.length) return toast('Cole nomes.');
        const novos = ls.map((l,i) => { const p = l.split(/[;|\t]/).map(x=>x.trim()); return { id:'ag_i_'+Date.now().toString(36)+'_'+i, matricula: (p[1]||String(ESTADO.efetivo.length+i+1).padStart(2,'0')).toUpperCase(), nome:p[0], nomeGuerra:gerarNomeGuerra(p[0]), sexo:'M', telefone:'', equipe:p[2]||EQUIPES[i%4], area:'PATRULHAMENTO', funcao:'PATRULHEIRO_03', regime:'24X72', situacao:'ATIVO' }; });
        ESTADO.efetivo = $('chkSubstituirModelo').checked ? novos : ESTADO.efetivo.concat(novos);
        await salvarTudo(); fecharModal(); atualizarTodasVistas(); toast(`${novos.length} importado(s)!`);
      }}
    ]);
  }

  function renderContas() {
    const users = window.EscalaCloud.lerUsuariosLocal(), adm = isAdmin();
    $('tbodyContas').innerHTML = users.map(u => `<tr><td><strong>${esc(u.login)}</strong> ${u.mestre?'<span class="badge badge-invertido">Mestre</span>':''}</td><td>${esc(u.nome)}</td><td>${esc(u.matricula||'—')}</td><td>${adm && !u.mestre ? `<select data-perfil-u="${esc(u.login)}"><option value="ADMIN" ${u.perfil==='ADMIN'?'selected':''}>Admin</option><option value="ESCALANTE" ${u.perfil==='ESCALANTE'?'selected':''}>Escalante</option><option value="AGENTE" ${u.perfil==='AGENTE'?'selected':''}>Agente</option></select>` : `<span class="badge badge-neutro">${esc(u.perfil)}</span>`}</td><td><span class="badge ${u.aprovado?'badge-ok':'badge-warn'}">${u.aprovado?'Aprovado':'Pendente'}</span></td><td>${adm && !u.mestre ? `<button type="button" class="btn btn-sec btn-sm" data-aprovar-u="${esc(u.login)}">${u.aprovado?'Bloquear':'Aprovar'}</button> <button type="button" class="btn btn-sec btn-sm" data-del-u="${esc(u.login)}">X</button>` : '—'}</td></tr>`).join('');
    $('tbodyContas').querySelectorAll('[data-perfil-u]').forEach(s => s.addEventListener('change', () => { window.EscalaCloud.atualizarUsuario(s.getAttribute('data-perfil-u'), { perfil: s.value }); salvarTudo(true); }));
    $('tbodyContas').querySelectorAll('[data-aprovar-u]').forEach(b => b.addEventListener('click', () => { const l = b.getAttribute('data-aprovar-u'), u = window.EscalaCloud.lerUsuariosLocal().find(x => x.login === l); if (u) { window.EscalaCloud.atualizarUsuario(l, { aprovado: !u.aprovado }); renderContas(); salvarTudo(true); } }));
    $('tbodyContas').querySelectorAll('[data-del-u]').forEach(b => b.addEventListener('click', () => { if (!confirm('Excluir?')) return; window.EscalaCloud.removerUsuario(b.getAttribute('data-del-u')); renderContas(); salvarTudo(true); }));
  }

  function renderConfigBase() {
    $('inpBaseNome').value = ESTADO.config.baseNome || ''; $('inpBaseLat').value = ESTADO.config.baseLat ?? -16.0658;
    $('inpBaseLon').value = ESTADO.config.baseLon ?? -47.9756; $('inpBaseRaio').value = ESTADO.config.baseRaioMetros ?? 500;
    $('chkNuvemAtiva').checked = !!ESTADO.config.nuvemAtiva;
    const fb = window.EscalaCloud.lerConfigFirebase();
    $('txtFirebaseConfigJson').value = fb ? JSON.stringify(fb, null, 2) : '';
    $('statusDbProprio').textContent = fb ? `Conectado ao projeto "${fb.projectId}" · Sincronização: ${ESTADO.config.nuvemAtiva ? 'ATIVA' : 'Pausada'}` : 'Modo Local (sem Firebase configurado).';
  }

  // =========================================================================
  // PDFS OFICIAIS (POLICIAL SOBRIO — ZERO AZUL, ZERO CARNAVAL)
  // =========================================================================
  function cabecalhoPdfHtml(titulo, subtitulo) {
    return `<div class="pdf-cab"><img src="__LOGO__" class="pdf-logo" onerror="this.style.display='none'"><div><div class="pdf-org">PREFEITURA MUNICIPAL DE VALPARAÍSO DE GOIÁS — GUARDA CIVIL MUNICIPAL</div><h1>${esc(titulo)}</h1><div class="pdf-sub">${esc(subtitulo)}</div></div></div>`;
  }
  function rodapeAssinaturasPdfHtml() {
    const r = ESTADO.config.responsaveis || {};
    return `<div class="pdf-assinaturas"><div class="ass-col"><div class="ass-linha"></div><strong>${esc(r.escalanteNome || 'Responsável pela Escala')}</strong><div>${esc(r.escalanteCargo || 'Escalante GCM')} · Mat.: ${esc(r.escalanteMat || '—')}</div></div><div class="ass-col"><div class="ass-linha"></div><strong>${esc(r.comandoNome || 'Comandante da GCM')}</strong><div>${esc(r.comandoCargo || 'Comandante GCM')} · ${esc(r.comandoMat || '—')}</div></div></div><div class="pdf-emitido">GCM Valparaíso de Goiás · Emitido em ${formatarDataHoraBR(new Date().toISOString())}</div>`;
  }
  function montarDocumentoPdf(titulo, corpoHtml, paisagem) {
    return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>${esc(titulo)}</title><style>
      @page { size: A4 ${paisagem ? 'landscape' : 'portrait'}; margin: 11mm; }
      body { font-family: Arial, Helvetica, sans-serif; color: #141414; background: #FFFFFF; font-size: 10.5px; line-height: 1.35; margin: 0; }
      .pdf-cab { display: flex; align-items: center; gap: 12px; border-bottom: 2px solid #141414; padding-bottom: 8px; margin-bottom: 10px; }
      .pdf-logo { width: 50px; height: 50px; object-fit: contain; }
      .pdf-org { font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; color: #333; }
      h1 { font-size: 15px; margin: 2px 0; } h2 { font-size: 11.5px; margin: 10px 0 5px; padding: 4px 8px; background: #141414; color: #FFFFFF; letter-spacing: 0.03em; }
      h3 { font-size: 11px; margin: 8px 0 4px; padding: 3px 8px; border-left: 4px solid #141414; background: #EFEFED; }
      .pdf-sub { font-size: 10px; color: #444; }
      table { width: 100%; border-collapse: collapse; margin-top: 5px; font-size: 9.8px; }
      th, td { border: 1px solid #333; padding: 4px 6px; text-align: left; vertical-align: top; }
      th { background: #EBEBE8; font-weight: 700; text-transform: uppercase; font-size: 8.8px; }
      .box { border: 1px solid #333; padding: 8px; margin-bottom: 8px; }
      .grid-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 6px; }
      .cp-topo-mapa { display: grid; grid-template-columns: 1fr 255px; gap: 10px; align-items: start; margin-bottom: 6px; }
      .insig-pdf { display: inline-block; padding: 1px 6px; font-weight: 700; font-size: 9px; background: #EFEFED; border: 1px solid #666; border-left-width: 4px; }
      .quebra { page-break-before: always; }
      .foto-pdf { width: 46px; height: 36px; object-fit: cover; border: 1px solid #333; }
      .pdf-assinaturas { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; margin-top: 22px; page-break-inside: avoid; }
      .ass-col { text-align: center; font-size: 10px; } .ass-linha { border-top: 1px solid #141414; margin-bottom: 4px; }
      .pdf-emitido { margin-top: 10px; font-size: 8.5px; color: #555; text-align: right; border-top: 1px solid #CCC; padding-top: 4px; }
    </style></head><body>${corpoHtml}</body></html>`;
  }
  async function exportarHtmlParaPdf(html, nome, paisagem) {
    if (window.escalaAPI?.salvarRelatorioPdf) {
      const r = await window.escalaAPI.salvarRelatorioPdf(html, nome, !!paisagem);
      if (r?.ok) toast('PDF salvo em: ' + r.caminho);
      else if (r && !r.cancelado) toast('Erro PDF: ' + (r.erro || ''));
      return;
    }
    const win = window.open('', '_blank', 'width=980,height=760');
    if (!win) return toast('Permita pop-ups para gerar o PDF.');
    win.document.open();
    win.document.write(html.replace(/__LOGO__/g, 'logo.png') + '<script>window.onload=function(){setTimeout(function(){window.print();},350);};<\/script>');
    win.document.close();
  }

  function gerarPdfFolhaDia() {
    const data = $('inpFreqData').value || hojeISO();
    const { ciclo, escalados } = obterEscaladosDaData(data);
    const rows = escalados.map(item => {
      const a = item.agente, r = resumirDiaAgente(data, a.id);
      const stTxt = r.status === 'JUSTIFICADO' ? `${r.just.motivo}${r.just.obs ? ' ('+r.just.obs+')' : ''}` : (r.status === 'PRESENTE' ? 'Presente (Completo)' : (r.status === 'PARCIAL' ? 'Em Serviço (Parcial)' : 'Sem Batida / Pendente'));
      return `<tr><td><strong>${esc(a.matricula)}</strong></td><td><strong>${esc(a.nome)}</strong></td><td>${esc(a.equipe)} · ${esc(item.posto)}</td><td>${r.ent ? r.ent.horaLocal.slice(0,5) : '—'}</td><td>${r.sAlm ? r.sAlm.horaLocal.slice(0,5) : '—'}</td><td>${r.rAlm ? r.rAlm.horaLocal.slice(0,5) : '—'}</td><td>${r.sai ? r.sai.horaLocal.slice(0,5) : '—'}</td><td><strong>${esc(stTxt)}</strong></td></tr>`;
    }).join('');
    const corpo = `${cabecalhoPdfHtml(`FOLHA DE PONTO DIÁRIA — ${formatarDataBR(data)}`, `Equipe 24x72: ${ciclo.equipeServico} · Total de Escalados: ${escalados.length}`)}<table><thead><tr><th>Nº</th><th>Guarda GCM</th><th>Equipe / Setor</th><th>Entrada</th><th>S. Almoço</th><th>R. Almoço</th><th>Saída</th><th>Situação / Justificativa</th></tr></thead><tbody>${rows}</tbody></table>${rodapeAssinaturasPdfHtml()}`;
    exportarHtmlParaPdf(montarDocumentoPdf(`Folha de Ponto ${data}`, corpo, true), `folha-ponto-diaria-${data}.pdf`, true);
  }

  function gerarPdfFolhaMensal() {
    const lista = filtrarPontosHistorico(), m = $('fltPontoMes').value || mesAtualISO();
    const rows = lista.map(p => { const loc = p.localizacao||{}; return `<tr><td><img src="${p.foto}" class="foto-pdf"></td><td><strong>${formatarDataBR(p.dataLocal)}</strong><br>${esc(p.horaLocal)}</td><td><strong>Nº ${esc(p.agenteMatricula)} — ${esc(p.agenteNome)}</strong><br>${esc(p.equipe)} · ${esc(p.posto)}</td><td>${esc(TIPO_PONTO_LABEL[p.tipo]||p.tipo)}</td><td>${esc(loc.endereco||'—')}<br><small>${esc(loc.resumoDist||'')}</small></td><td>${esc(loc.status||'OK')}</td></tr>`; }).join('') || '<tr><td colspan="6" style="text-align:center;">Sem batidas no período.</td></tr>';
    exportarHtmlParaPdf(montarDocumentoPdf(`Espelho Ponto ${m}`, `${cabecalhoPdfHtml('ESPELHO MENSAL DE FOLHA DE PONTO', `Competência: ${m} · Total: ${lista.length} batida(s)`)}<table><thead><tr><th>Foto</th><th>Data / Hora</th><th>Guarda</th><th>Batida</th><th>Localização</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>${rodapeAssinaturasPdfHtml()}`, false), `espelho-ponto-${m}.pdf`, false);
  }

  function gerarPdfEscalaMensal(somenteQuadro) {
    const { titulo, datas } = gerarListaDatasEscala();
    const insig = (eq) => `<span class="insig-pdf" style="border-left-color:${EQUIPE_CORES[eq]?.cor||'#18181B'};">${esc(eq)}</span>`;
    const ordem = { ALFA:1, BRAVO:2, CHARLIE:3, DELTA:4, ADM:5, '12X36':6 };
    const listaPessoas = ESTADO.efetivo.filter(a => a.situacao==='ATIVO').sort((a,b) => (ordem[a.equipe]||9)-(ordem[b.equipe]||9) || Number(a.matricula)-Number(b.matricula));
    const rowsPessoas = listaPessoas.map(a => { const inf = descobrirSetorDoAgente(a); return `<tr><td><strong>${esc(a.matricula)}</strong></td><td><strong>${esc(a.nome)}</strong></td><td>${insig(a.equipe)}</td><td>${esc(inf.nome)}</td><td>${esc(inf.funcao)}</td><td><strong>${esc(proximosDiasServico(a.equipe, 30))}</strong></td></tr>`; }).join('');

    if (somenteQuadro) {
      exportarHtmlParaPdf(montarDocumentoPdf('Quadro Nominal Escala', `${cabecalhoPdfHtml('QUADRO NOMINAL DA ESCALA 24x72', titulo)}<table><thead><tr><th>Nº</th><th>Guarda GCM</th><th>Equipe</th><th>Setor / Viatura</th><th>Função</th><th>Próximos Dias de Serviço</th></tr></thead><tbody>${rowsPessoas}</tbody></table>${rodapeAssinaturasPdfHtml()}`, true), `quadro-nominal-escala.pdf`, true);
      return;
    }

    const linhasCal = datas.map(iso => {
      const c = calcularCiclo24x72(iso);
      const cel = (eq) => c.mapa[eq].codigo==='SERVICO' ? insig('SERVIÇO 24h') : c.mapa[eq].rotulo;
      return `<tr><td><strong>${formatarDataBR(iso)}</strong></td><td>${DIAS_SEMANA[diaSemanaISO(iso)]}</td><td>${insig('EQUIPE ' + c.equipeServico)}</td><td>${cel('ALFA')}</td><td>${cel('BRAVO')}</td><td>${cel('CHARLIE')}</td><td>${cel('DELTA')}</td></tr>`;
    }).join('');

    const blocosEquipes = EQUIPES.map(eq => {
      const m = ESTADO.equipesMontagem[eq] || {};
      const rows = ESTADO.postos.map(p => { const g = m[p.id]||{}; return `<tr><td><strong>${esc(p.prefixo)} — ${esc(p.setor)}</strong><br><small>Resp.: ${esc(p.responsavel||'—')}</small></td><td>${esc(nomeAgentePorId(g.g01)||'—')}</td><td>${esc(nomeAgentePorId(g.g02)||'—')}</td><td>${esc(nomeAgentePorId(g.g03)||'—')}</td></tr>`; }).join('');
      return `<h3 style="border-left-color:${EQUIPE_CORES[eq].cor};">EQUIPE ${eq} — Próximos Serviços: ${proximosDiasServico(eq, 30)}</h3><table><thead><tr><th>Setor / Viatura</th><th>01 — Comandante</th><th>02 — Motorista</th><th>03 — Patrulheiro</th></tr></thead><tbody>${rows}</tbody></table>`;
    }).join('');
    const rowsAdm = (ESTADO.administrativo||[]).map(c => `<tr><td><strong>${esc(c.cargo)}</strong></td><td>${esc(c.titular)}</td><td>${esc(c.horario)}</td><td>${esc(c.obs||'')}</td></tr>`).join('');

    const corpo = `
      ${cabecalhoPdfHtml('ESCALA CONTÍNUA 24x72 — GCM VALPARAÍSO DE GOIÁS', `${titulo} · Turno ${ESTADO.config.horarioTroca}`)}
      <h2>1. CALENDÁRIO OPERACIONAL CONTÍNUO 24x72</h2>
      <table><thead><tr><th>Data</th><th>Dia</th><th>Serviço 24h</th><th>ALFA</th><th>BRAVO</th><th>CHARLIE</th><th>DELTA</th></tr></thead><tbody>${linhasCal}</tbody></table>
      <div class="quebra"></div>
      ${cabecalhoPdfHtml('COMPOSIÇÃO DAS 4 EQUIPES OPERACIONAIS', 'Viaturas, Setores e Responsáveis')}
      <h2>2. GUARNIÇÕES POR EQUIPE</h2>${blocosEquipes}
      <div class="quebra"></div>
      ${cabecalhoPdfHtml('QUADRO NOMINAL EXPLICATIVO POR GUARDA', 'Dias exatos de serviço de cada integrante nos próximos 30 dias')}
      <h2>3. RELAÇÃO NOMINAL DO EFETIVO</h2>
      <table><thead><tr><th>Nº</th><th>Guarda GCM</th><th>Equipe</th><th>Setor / Viatura</th><th>Função</th><th>Próximos Dias de Serviço</th></tr></thead><tbody>${rowsPessoas}</tbody></table>
      <h2>4. EXPEDIENTE ADMINISTRATIVO (SEGUNDA A SEXTA)</h2>
      <table><thead><tr><th>Cargo</th><th>Titular</th><th>Horário</th><th>Obs.</th></tr></thead><tbody>${rowsAdm}</tbody></table>
      ${rodapeAssinaturasPdfHtml()}
    `;
    exportarHtmlParaPdf(montarDocumentoPdf('Escala Continua 24x72 GCM', corpo, true), `escala-24x72-gcm-${hojeISO()}.pdf`, true);
  }

  function blocoHtmlCartaoPrograma(data, eq, posto) {
    const cp = obterDadosCartao(data, eq, posto.id);
    const croqui = gerarCroquiSvgSetor(posto, cp.pontosBase);
    const linhasPb = (cp.pontosBase||[]).map((pb, i) => `<tr><td><strong>PB ${i+1}</strong></td><td><strong>${esc(pb.hora)}</strong></td><td>${esc(pb.local)}</td><td>${esc(pb.atividade)}</td></tr>`).join('');
    return `
      <div class="box" style="border-left:5px solid ${esc(posto.cor||'#18181B')};">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #333;padding-bottom:4px;margin-bottom:6px;">
          <strong style="font-size:13px;">${esc(cp.prefixo || posto.id)} — ${esc(cp.setor)}</strong>
          <span class="insig-pdf" style="border-left-color:${EQUIPE_CORES[eq]?.cor||'#18181B'};">EQUIPE ${esc(eq)} · ${formatarDataBR(data)}</span>
        </div>
        <div class="cp-topo-mapa">
          <div>
            <div><strong>Turno:</strong> ${esc(ESTADO.config.horarioTroca)} · <strong>Resp. Setor:</strong> ${esc(cp.responsavel || 'A definir')}</div>
            <div style="margin-top:3px;"><strong>Bairros de Cobertura:</strong> ${esc(cp.bairros)}</div>
            <table style="margin-top:6px;"><thead><tr><th>01 — Comandante</th><th>02 — Motorista</th><th>03 — Patrulheiro</th></tr></thead><tbody><tr><td>${esc(cp.g01||'—')}</td><td>${esc(cp.g02||'—')}</td><td>${esc(cp.g03||'2 integrantes')}</td></tr></tbody></table>
            <div style="margin-top:6px;"><strong>Objetivo do Turno:</strong> ${esc(cp.missao)}</div>
          </div>
          <div>${croqui}</div>
        </div>
        <table><thead><tr><th style="width:40px;">PB</th><th style="width:95px;">Horário</th><th style="width:175px;">Onde Ficar (Local)</th><th>Como Fazer na Prática</th></tr></thead><tbody>${linhasPb || '<tr><td colspan="4">—</td></tr>'}</tbody></table>
        <div style="margin-top:5px;"><strong>Conduta / Recomendações:</strong> ${esc(cp.obs||'—')}</div>
      </div>
    `;
  }

  function gerarPdfCartaoPrograma(apenasAtual) {
    const d = $('inpCartaoData').value || hojeISO(), eq = $('selCartaoEquipe').value || 'ALFA', pid = $('selCartaoPosto').value;
    const lista = apenasAtual ? ESTADO.postos.filter(p => p.id === pid) : ESTADO.postos;
    const blocos = lista.map((p, i) => (i > 0 ? '<div class="quebra"></div>' : '') + blocoHtmlCartaoPrograma(d, eq, p)).join('');
    const tit = apenasAtual ? `CARTÃO PROGRAMA — ${lista[0]?.prefixo||''} (${lista[0]?.setor||''})` : `CARTÃO PROGRAMA DO TURNO — EQUIPE ${eq}`;
    exportarHtmlParaPdf(montarDocumentoPdf(tit, `${cabecalhoPdfHtml(tit, `Data: ${formatarDataBR(d)} · Turno: ${ESTADO.config.horarioTroca} · Equipe ${eq}`)}${blocos}${rodapeAssinaturasPdfHtml()}`, false), apenasAtual ? `cartao-${pid}-${d}.pdf` : `cartao-completo-${eq}-${d}.pdf`, false);
  }

  // =========================================================================
  // NAVEGACAO & EVENTOS
  // =========================================================================
  function ativarSubtab(idSecao, idSub) {
    const sec = $(idSecao); if (!sec) return;
    sec.querySelectorAll('.subtab').forEach(x => x.classList.toggle('ativo', x.getAttribute('data-sub') === idSub));
    sec.querySelectorAll('.subpainel').forEach(p => p.classList.toggle('ativo', p.id === idSub));
  }

  function abrirAba(idSecao) {
    document.querySelectorAll('.secao-aba').forEach(s => s.classList.toggle('ativa', s.id === idSecao));
    document.querySelectorAll('.side-btn').forEach(b => b.classList.toggle('ativo', b.getAttribute('data-aba') === idSecao));
    if ($('lblTituloPaginaAtual')) $('lblTituloPaginaAtual').textContent = TITULOS_ABAS[idSecao] || 'GCM Valparaíso';
    fecharSidebarMobile();
    if (idSecao !== 'secPonto') pararCamera();
    if (idSecao === 'secPonto') { renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos(); }
    if (idSecao === 'secEscalas') { renderCalendario24(); renderQuadroPessoas(); renderMontagemEquipe(); renderSetoresResponsaveis(); renderAdmE12x36(); renderResponsaveis(); }
    if (idSecao === 'secCartao') { popularSelectsCartao(); carregarEditorCartao(); }
    if (idSecao === 'secEventos') renderListaEventos();
    if (idSecao === 'secEfetivo') renderEfetivo();
    if (idSecao === 'secSistema') { renderContas(); renderConfigBase(); }
  }

  function atualizarTodasVistas() {
    renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); renderFrequenciaDia(); renderTabelaPontos();
    renderCalendario24(); renderQuadroPessoas(); renderMontagemEquipe(); renderSetoresResponsaveis();
    renderAdmE12x36(); renderResponsaveis(); popularSelectsCartao(); carregarEditorCartao();
    renderListaEventos(); renderEfetivo(); renderContas(); renderConfigBase();
  }

  function iniciarAppLogado(sessao) {
    SESSAO = sessao;
    $('telaAuth').classList.add('oculto'); $('appShell').classList.remove('oculto');
    $('lblUsuarioTopo').textContent = sessao.nome; $('lblPerfilTopo').textContent = sessao.perfil;
    $('inpFreqData').value = hojeISO(); $('fltPontoMes').value = mesAtualISO();
    $('selMesEscala').value = mesAtualISO(); $('inpCartaoData').value = hojeISO();
    sincronizarDataCartao(); atualizarTodasVistas();
    abrirAba('secPonto'); // Primeira tela ao entrar = Folha de Ponto!

    // Se o usuario logado tiver numero/matricula de um guarda, pre-seleciona na tela de ponto
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

  function registrarEventos() {
    $('btnTema').addEventListener('click', alternarTema);
    $('btnTemaAuth').addEventListener('click', alternarTema);
    $('btnToggleMenu').addEventListener('click', alternarSidebar);
    $('btnFecharSidebar').addEventListener('click', fecharSidebarMobile);
    $('sidebarBackdrop').addEventListener('click', fecharSidebarMobile);

    // Botao permanente no topo para abrir direto a Folha de Ponto
    $('btnTopoRegistrarPonto').addEventListener('click', () => {
      abrirAba('secPonto');
      ativarSubtab('secPonto', 'subPtRegistrar');
      $('inpIdentificaGuarda').focus();
    });

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
      const r = window.EscalaCloud.cadastrarUsuario({ nome: $('inpCadNome').value, login: $('inpCadUser').value, matricula: $('inpCadMat').value, senha: $('inpCadPass').value, perfil: 'AGENTE', aprovado: false });
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
    $('btnColetarGps').addEventListener('click', coletarLocalizacaoPonto);
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

    // Escala Continua
    $('selModoEscala').addEventListener('change', renderCalendario24);
    $('selMesEscala').addEventListener('change', renderCalendario24);
    $('btnSalvarCiclo24').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.config.dataBaseAlfa = $('inpDataBaseAlfa').value || hojeISO(); ESTADO.config.horarioTroca = $('inpHorarioTroca').value.trim() || '07:00 às 07:00'; await salvarTudo(); renderCalendario24(); renderQuadroPessoas(); renderFaixaPlantaoHoje(); renderResumoEscaladosHoje(); });
    $('btnExportarPdfEscala').addEventListener('click', () => gerarPdfEscalaMensal(false));
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

    // Cartao Programa & Mapa
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
    $('btnAddLinhaPb').addEventListener('click', () => { const a = lerCartaoDoEditor().pontosBase; a.push({ hora:'', local:'', atividade:'', lat:null, lon:null }); renderLinhasPb(a); });
    $('btnPuxarGuarnicaoEscala').addEventListener('click', () => { const m = (ESTADO.equipesMontagem[$('selCartaoEquipe').value]||{})[$('selCartaoPosto').value]||{}, p = ESTADO.postos.find(x => x.id === $('selCartaoPosto').value); $('inpCpG01').value = nomeAgentePorId(m.g01)||''; $('inpCpG02').value = nomeAgentePorId(m.g02)||''; $('inpCpG03').value = nomeAgentePorId(m.g03)||''; if (p) $('inpCpRespSetor').value = p.responsavel||''; toast('Sincronizado.'); });
    $('btnSalvarCartaoDia').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.cartoesDia[chaveCartao($('inpCartaoData').value, $('selCartaoEquipe').value, $('selCartaoPosto').value)] = lerCartaoDoEditor(); await salvarTudo(); atualizarDesenhoMapaSetor(); });
    $('btnSalvarModeloSetor').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const pid = $('selCartaoPosto').value, d = lerCartaoDoEditor(); ESTADO.cartoesModelo[pid] = { setor:d.setor, bairros:d.bairros, prefixo:d.prefixo, responsavel:d.responsavel, missao:d.missao, pontosBase:d.pontosBase, obs:d.obs }; const p = ESTADO.postos.find(x => x.id === pid); if (p) Object.assign(p, { setor:d.setor, bairros:d.bairros, prefixo:d.prefixo, responsavel:d.responsavel }); await salvarTudo(); atualizarDesenhoMapaSetor(); toast('Padrão do setor atualizado!'); });
    $('btnPdfCartaoIndividual').addEventListener('click', () => gerarPdfCartaoPrograma(true));
    $('btnPdfCartaoCompleto').addEventListener('click', () => gerarPdfCartaoPrograma(false));
    $('btnCopiarWhatsApp').addEventListener('click', copiarResumoWhatsApp);

    // Eventos
    $('btnNovoEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const novo = { id:'ev_'+Date.now().toString(36), nome:'Novo Evento Extra', local:'Valparaíso de Goiás', data:hojeISO(), inicio:'16:00', fim:'23:00', regime:'HORA_EXTRA', coordenador:'', missao:'', obs:'', viaturas:[{ id:'evv_1', prefixo:'VTR-EVENTO 01', setor:'Principal', g01:'', g02:'', g03:'', g04:'' }, { id:'evv_2', prefixo:'VTR-EVENTO 02', setor:'Apoio', g01:'', g02:'', g03:'', g04:'' }] }; ESTADO.eventos.unshift(novo); eventoSelecionadoId = novo.id; await salvarTudo(true); renderListaEventos(); });
    $('inpEvData').addEventListener('change', () => { const cur = lerEventoDoEditor(); atualizarDicaFolgaEvento(cur.data); renderViaturasEvento(cur.viaturas, cur.data); });
    $('btnAddVtrEvento').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const cur = lerEventoDoEditor(); cur.viaturas.push({ id:'evv_'+Date.now(), prefixo:`VTR-EVENTO 0${cur.viaturas.length+1}`, setor:'', g01:'', g02:'', g03:'', g04:'' }); renderViaturasEvento(cur.viaturas, cur.data); });
    $('btnSalvarEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const cur = lerEventoDoEditor(), i = ESTADO.eventos.findIndex(e => e.id === cur.id); if (i >= 0) ESTADO.eventos[i] = cur; await salvarTudo(); renderListaEventos(); renderFrequenciaDia(); });
    $('btnExcluirEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); if (!confirm('Excluir evento?')) return; ESTADO.eventos = ESTADO.eventos.filter(e => e.id !== eventoSelecionadoId); eventoSelecionadoId = null; await salvarTudo(); renderListaEventos(); });
    $('btnWhatsAppEvento').addEventListener('click', copiarWhatsAppEvento);
    $('btnPdfEvento').addEventListener('click', gerarPdfEvento);

    // Efetivo & Sistema (Codigo 4 digitos)
    $('fltEfBusca').addEventListener('input', renderEfetivo);
    $('fltEfEquipe').addEventListener('change', renderEfetivo);
    $('fltEfArea').addEventListener('change', renderEfetivo);
    $('btnNovoAgente').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); abrirModalAgente(null); });
    $('btnAbrirImportar64').addEventListener('click', abrirModalImportar64);
    $('btnDistribuir64').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); if (!confirm('Rebalancear operacionais nas 4 equipes?')) return; const alvos = ESTADO.efetivo.filter(a => a.situacao==='ATIVO' && a.equipe!=='ADM' && a.equipe!=='12X36'); alvos.forEach((a,i) => { a.equipe = EQUIPES[i%4]; a.regime = '24X72'; }); await salvarTudo(); atualizarTodasVistas(); toast(`${alvos.length} guardas rebalanceados!`); });

    $('btnCriarContaAdmin').addEventListener('click', () => {
      if (!isAdmin()) return toast('Apenas Admin.');
      abrirModal('Criar Conta (Código 4+ dígitos)', `<div class="campo"><label>Nome</label><input type="text" id="mUsNome"></div><div class="grid-2"><div class="campo"><label>Login</label><input type="text" id="mUsLogin"></div><div class="campo"><label>Nº Provisório / Matrícula</label><input type="text" id="mUsMat" placeholder="Ex.: 03"></div></div><div class="grid-2"><div class="campo"><label>Código de Acesso (mín. 4 dígitos)</label><input type="password" id="mUsPass" minlength="4"></div><div class="campo"><label>Perfil</label><select id="mUsPerfil"><option value="AGENTE">Agente</option><option value="ESCALANTE">Escalante</option><option value="ADMIN">Admin</option></select></div></div>`, [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Criar', classe: 'btn-primario', onClick: () => { const r = window.EscalaCloud.cadastrarUsuario({ nome:$('mUsNome').value, login:$('mUsLogin').value, matricula:$('mUsMat').value, senha:$('mUsPass').value, perfil:$('mUsPerfil').value, aprovado:true }); if (!r.ok) return toast(r.erro); fecharModal(); renderContas(); salvarTudo(true); toast('Conta criada!'); }}
      ]);
    });
    $('btnCapturarBaseGps').addEventListener('click', () => {
      if (!navigator.geolocation) return toast('Sem GPS.');
      navigator.geolocation.getCurrentPosition(pos => { $('inpBaseLat').value = pos.coords.latitude.toFixed(6); $('inpBaseLon').value = pos.coords.longitude.toFixed(6); toast('GPS capturado!'); }, () => toast('Falha no GPS.'), { enableHighAccuracy:true, maximumAge:0, timeout:10000 });
    });
    $('btnSalvarConfigBase').addEventListener('click', async () => { if (!isAdmin()) return toast('Apenas Admin.'); Object.assign(ESTADO.config, { baseNome:$('inpBaseNome').value.trim(), baseLat:Number($('inpBaseLat').value), baseLon:Number($('inpBaseLon').value), baseRaioMetros:Math.max(30, Number($('inpBaseRaio').value)||500) }); await salvarTudo(); });
    $('btnSalvarFirebaseProprio').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Apenas Admin.');
      const obj = window.EscalaCloud.extrairObjetoFirebase($('txtFirebaseConfigJson').value);
      if (!obj) return toast('Cole um firebaseConfig válido.');
      if (obj.projectId === 'cco-viaturas') return toast('BLOQUEADO: Esse é o banco do CCO Viaturas! Crie um novo projeto separado.');
      $('statusDbProprio').textContent = 'Testando...';
      const t = await window.EscalaCloud.testarConexaoFirebase(obj);
      if (!t.ok) { $('statusDbProprio').textContent = 'Erro: ' + (t.erro||''); return toast('Falha na conexão.'); }
      window.EscalaCloud.salvarConfigFirebase(obj); ESTADO.config.nuvemAtiva = true; $('chkNuvemAtiva').checked = true;
      await salvarTudo(true); renderConfigBase(); toast(`Firebase "${obj.projectId}" conectado!`);
    });
    $('btnDesconectarFirebase').addEventListener('click', async () => { if (!isAdmin()) return toast('Apenas Admin.'); window.EscalaCloud.salvarConfigFirebase(null); ESTADO.config.nuvemAtiva = false; $('chkNuvemAtiva').checked = false; await salvarTudo(true); renderConfigBase(); atualizarBadgeSync('Local', 'badge-neutro'); toast('Modo local ativo.'); });
    $('chkNuvemAtiva').addEventListener('change', async () => { if (!isAdmin()) { $('chkNuvemAtiva').checked = !!ESTADO.config.nuvemAtiva; return; } if ($('chkNuvemAtiva').checked && !window.EscalaCloud.lerConfigFirebase()) { $('chkNuvemAtiva').checked = false; return toast('Configure o firebaseConfig primeiro.'); } ESTADO.config.nuvemAtiva = $('chkNuvemAtiva').checked; await salvarTudo(); renderConfigBase(); });
    $('btnSyncAgora').addEventListener('click', async () => { if (!window.EscalaCloud.lerConfigFirebase()) return toast('Modo local ativo.'); const r = await window.EscalaCloud.sincronizarBaixarNuvem(); if (r.ok && r.dados) { ESTADO = r.dados; await window.EscalaCloud.salvarEstadoLocal(ESTADO); atualizarTodasVistas(); toast('Sincronizado!'); } else await salvarTudo(); });
    $('btnAlterarMinhaSenha').addEventListener('click', () => abrirModal('Alterar Código de Acesso', `<div class="campo"><label>Novo Código / Senha (mínimo 4 dígitos)</label><input type="password" id="mNovaSenha" minlength="4" placeholder="Mínimo 4 dígitos"></div>`, [{ texto:'Cancelar', classe:'btn-sec', onClick:fecharModal }, { texto:'Salvar', classe:'btn-primario', onClick: () => { const s = $('mNovaSenha').value; if (!s || s.length < 4) return toast('Mínimo 4 dígitos.'); window.EscalaCloud.atualizarUsuario(SESSAO.login, { novaSenha:s }); fecharModal(); salvarTudo(true); toast('Código alterado!'); }}]));
    $('btnExportarBackup').addEventListener('click', async () => {
      const pac = { sistema:'GCM_VALP_ESCALA_V4', exportadoEm:new Date().toISOString(), estado:ESTADO, usuarios:window.EscalaCloud.lerUsuariosLocal() };
      if (window.escalaAPI?.exportarBackup) { const r = await window.escalaAPI.exportarBackup(pac); if (r?.ok) toast('Backup salvo em: '+r.caminho); return; }
      const b = new Blob([JSON.stringify(pac,null,2)], { type:'application/json' }), u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = `backup-gcm-escala-${hojeISO()}.json`; a.click(); URL.revokeObjectURL(u); toast('Backup baixado!');
    });
    $('btnImportarBackup').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Apenas Admin.');
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
    aplicarTema(localStorage.getItem('escala_gcm_tema_v4') || 'claro');
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(() => {});
    const carregado = await window.EscalaCloud.carregarEstadoLocal();
    ESTADO = (carregado && carregado.efetivo && carregado.postos && carregado.versao >= 4) ? carregado : criarEstadoInicial();
    if (!ESTADO.justificativas) ESTADO.justificativas = {};
    if (!Array.isArray(ESTADO.eventos)) ESTADO.eventos = [];
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    registrarEventos();
    const s = window.EscalaCloud.lerSessao();
    if (s && s.login) iniciarAppLogado(s);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
