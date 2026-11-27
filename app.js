(function () {
  'use strict';

  const EQUIPES = ['ALFA', 'BRAVO', 'CHARLIE', 'DELTA'];
  const EQUIPE_CORES = {
    ALFA:    { nome: 'Verde',    cor: '#15803D', bg: '#DCFCE7' },
    BRAVO:   { nome: 'Laranja',  cor: '#D97706', bg: '#FEF3C7' },
    CHARLIE: { nome: 'Roxo',     cor: '#7C3AED', bg: '#F3E8FF' },
    DELTA:   { nome: 'Vermelho', cor: '#DC2626', bg: '#FEE2E2' },
    ADM:     { nome: 'Grafite',  cor: '#27272A', bg: '#E4E4E7' },
    '12X36': { nome: 'Chumbo',   cor: '#3F3F46', bg: '#E4E4E7' }
  };
  const AREAS_LABEL = {
    PATRULHAMENTO: 'Patrulhamento',
    MARIA_DA_PENHA: 'Patrulha Maria da Penha',
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
  const CAT_Q_LABEL = {
    COMUNICACAO: 'Comunicação & Escuta',
    LOCALIZACAO: 'Localização & Deslocamento',
    OCORRENCIA: 'Ocorrência & Apoio',
    ROTINA: 'Rotina Operacional'
  };
  const MODALIDADE_EVENTO = {
    HORA_EXTRA: 'Hora Extra / Gratificação',
    BANCO_HORAS: 'Banco de Horas / Folga',
    REMANEJAMENTO: 'Remanejamento'
  };
  const TITULOS_ABAS = {
    secPainel: 'Início / Painel do Dia',
    secEscalas: 'Escala 24x72 & Quadro por Cores',
    secCartao: 'Cartão Programa (PDF)',
    secEventos: 'Eventos & Operações Extras',
    secPonto: 'Folha de Ponto (Foto + GPS)',
    secCodigoQ: 'Relação de Código Q & QRA',
    secEfetivo: 'Efetivo da Guarda (64)',
    secSistema: 'Contas, Base & Banco de Dados'
  };
  const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const MESES_EXT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const ROL_EFETIVO_64 = [["GCM-001", "Vinicios Mateus Pires da Silva", "M"], ["GCM-002", "Yago Rocha da Silva Dias", "M"], ["GCM-003", "Anderson Pereira Costa", "M"], ["GCM-004", "Gabrielle da Cruz Nunes", "F"], ["GCM-005", "Tiago Ferreira Lopes", "M"], ["GCM-006", "Luthero Pinheiro Martins Filho", "M"], ["GCM-007", "Tiago Batista Ferreira", "M"], ["GCM-008", "Luís Otávio de Andrade Torres", "M"], ["GCM-009", "Michael Larangeira Linhares", "M"], ["GCM-010", "Valterson da Silva Junior", "M"], ["GCM-011", "Vinicius Lemes Lopes", "M"], ["GCM-012", "Cleber Brilhante de Albuquerque Neto", "M"], ["GCM-013", "Anderson Lucas Brito Gomes", "M"], ["GCM-014", "Alex Sandro Souza Gomes", "M"], ["GCM-015", "Michele Bezerra de Araujo Aniceto", "F"], ["GCM-016", "Mayara Valeria Damasceno Pastana", "F"], ["GCM-017", "Amanda Rodrigues Cavalcante", "F"], ["GCM-018", "Jemima Costa de Jesus", "F"], ["GCM-019", "Geyssom Chaves Duarte Mazinho", "M"], ["GCM-020", "Diego Stanley Cantallops Santos", "M"], ["GCM-021", "Rafael Miranda Dias", "M"], ["GCM-022", "Daniel Kimberley de Oliveira Franco", "M"], ["GCM-023", "Renan Rodrigues de Aquino", "M"], ["GCM-024", "Gilmar Figueiredo dos Santos", "M"], ["GCM-025", "Juliana Iza de Oliveira Nunes", "F"], ["GCM-026", "Douglas Araujo dos Santos", "M"], ["GCM-027", "Victor dos Santos Nunes", "M"], ["GCM-028", "Bruno Guerreiro Galdino", "M"], ["GCM-029", "Glauber Terena Guerra da Silva", "M"], ["GCM-030", "Gean Martins Godinho da Silva", "M"], ["GCM-031", "Davy Guedes de Oliveira", "M"], ["GCM-032", "Rayan Thalles Bonfim da Silva", "M"], ["GCM-033", "Joao Pedro Martins Pinheiro", "M"], ["GCM-034", "Gustavo Amorim Lima", "M"], ["GCM-035", "Laryssa Santos Souza", "F"], ["GCM-036", "Regivânia Rodrigues de Macedo", "F"], ["GCM-037", "Bruna Albéfaro Pereira", "F"], ["GCM-038", "Vanessa Vasconcelos Sampaio", "F"], ["GCM-039", "Victor Lauriano de Paula Souza", "M"], ["GCM-040", "Valeria Januario Monteiro", "F"], ["GCM-041", "Lucas Lacerda de Melo", "M"], ["GCM-042", "Mayara Albuquerque Oliveira", "F"], ["GCM-043", "Alexandre Monteiro Januario", "M"], ["GCM-044", "Maísa Vitória Barbosa Vieira", "F"], ["GCM-045", "Hugo Sales Targino", "M"], ["GCM-046", "Davi Jonas Santos Duarte", "M"], ["GCM-047", "Julia Silveira Carvalho Ferreira", "F"], ["GCM-048", "Isabella Alves de Carvalho Basto", "F"], ["GCM-049", "Alessandro de Souza Silva", "M"], ["GCM-050", "Graziele Medeiros de Lima", "F"], ["GCM-051", "Luiz Felipe Oliveira Barros Dias", "M"], ["GCM-052", "Aline Rayane Vieira Maia", "F"], ["GCM-053", "Camila dos Santos Alves", "F"], ["GCM-054", "Carolina dos Santos Pereira", "F"], ["GCM-055", "Lucas Nunes da Silva", "M"], ["GCM-056", "Hugo Wildson de Lucena", "M"], ["GCM-057", "Vitor de Farias Lemes", "M"], ["GCM-058", "Esdras Roberto da Silva Braga", "M"], ["GCM-059", "Samuel Alessandro da Silva", "M"], ["GCM-060", "Valdir Borges da Silva Filho", "M"], ["GCM-061", "Felipe Augusto Ribeiro", "M"], ["GCM-062", "Allan Carvalho Gonçalves", "M"], ["GCM-063", "Arthur dos Reis Siqueira Bastos", "M"], ["GCM-064", "Rodrigo de Oliveira Correa", "M"]];
  const CODIGO_Q_INICIAL = [["QAP", "COMUNICACAO", "Na escuta / Pronto para receber transmissão no rádio."], ["QAR", "COMUNICACAO", "Autorização para abandonar a escuta / desligar rádio."], ["QRA", "COMUNICACAO", "Nome de guerra / identificação do operador ou guarda no rádio."], ["QRM", "COMUNICACAO", "Interferência humana ou de outra estação na frequência."], ["QRN", "COMUNICACAO", "Interferência atmosférica ou estática no sinal."], ["QRQ", "COMUNICACAO", "Transmita mais depressa."], ["QRS", "COMUNICACAO", "Transmita mais devagar."], ["QRT", "COMUNICACAO", "Parar de transmitir / encerrar serviço ou desligar equipamento."], ["QRU", "OCORRENCIA", "Ocorrência / novidade / tem algo para mim?"], ["QRV", "COMUNICACAO", "À disposição / pronto para cumprir missão."], ["QRX", "COMUNICACAO", "Aguarde um momento na escuta."], ["QSA", "COMUNICACAO", "Qualidade / intensidade do sinal de rádio (1 a 5)."], ["QSJ", "ROTINA", "Dinheiro / valor / taxa."], ["QSL", "COMUNICACAO", "Entendido / confirmado / copiado positivo."], ["QSM", "COMUNICACAO", "Repita a última mensagem."], ["QSO", "COMUNICACAO", "Contato / comunicação entre estações ou guarnições."], ["QSP", "COMUNICACAO", "Fazer ponte / retransmitir mensagem para outra viatura."], ["QTA", "OCORRENCIA", "Cancelar a última mensagem / abortar deslocamento ou ocorrência."], ["QTC", "COMUNICACAO", "Mensagem / comunicado / informe para transmitir."], ["QTH", "LOCALIZACAO", "Endereço / localização exata da viatura ou ocorrência."], ["QTI", "LOCALIZACAO", "A caminho / em deslocamento para o local."], ["QTO", "ROTINA", "Banheiro / necessidade fisiológica rápida."], ["QTR", "ROTINA", "Horário exato."], ["QTU", "ROTINA", "Horário de funcionamento da estação / serviço."], ["QUD", "OCORRENCIA", "Sinal de urgência / prioridade máxima / pedido de apoio imediato."], ["QSO-ZERO", "OCORRENCIA", "Sem novidades / patrulhamento normal."], ["TKS", "COMUNICACAO", "Obrigado / agradecido pela informação."]];

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  let ESTADO = null;
  let SESSAO = null;
  let eventoSelecionadoId = null;
  let streamCamera = null;
  let fotoCapturadaDataUrl = null;
  let auditoriaGpsAtual = null;
  let timerRelogio = null;

  // ---------- DATAS E CICLO 24x72 ----------
  function hojeISO() { const d = new Date(), p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`; }
  function mesAtualISO() { return hojeISO().slice(0, 7); }
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
  function diasServicoNoMes(equipe, mesISO) {
    if (equipe === 'ADM') return 'Segunda a Sexta (Horário Comercial)';
    if (equipe === '12X36') return 'Escala 12x36 (Dias Alternados)';
    if (!EQUIPES.includes(equipe)) return '—';
    const [ano, mes] = (mesISO || mesAtualISO()).split('-').map(Number);
    const ult = new Date(ano, mes, 0).getDate();
    const dias = [];
    for (let d = 1; d <= ult; d++) {
      const iso = `${ano}-${String(mes).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      if (calcularCiclo24x72(iso).equipeServico === equipe) dias.push(String(d).padStart(2,'0'));
    }
    return dias.join(', ');
  }
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

  // ---------- ESTADO INICIAL LIMPO (64 ATIVOS, CORES POR SETOR, FULANO/SICRANO NO ADM) ----------
  function criarPostosPadrao() {
    return [
      { id: 'VTR-01', nome: 'VTR-01 — Setor 01 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 01', bairros: 'Valparaíso I (Etapas A a E), Jardim Anhanguera', prefixo: 'VTR-01', cor: '#166534', responsavel: 'A definir (Chefe Setor 01)' },
      { id: 'VTR-02', nome: 'VTR-02 — Setor 02 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 02', bairros: 'Parque Esplanada I a V, Cruzeiro do Sul, Valparaízo II', prefixo: 'VTR-02', cor: '#B45309', responsavel: 'A definir (Chefe Setor 02)' },
      { id: 'VTR-03', nome: 'VTR-03 — Setor 03 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 03', bairros: 'Jardim Céu Azul, Jardim Oriente, Ipanema', prefixo: 'VTR-03', cor: '#6D28D9', responsavel: 'A definir (Chefe Setor 03)' },
      { id: 'VTR-04', nome: 'VTR-04 — Setor 04 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 04', bairros: 'Cidade Jardins, Parque Rio Branco, Marajó, Santa Rita', prefixo: 'VTR-04', cor: '#9F1239', responsavel: 'A definir (Chefe Setor 04)' },
      { id: 'PMP-01', nome: 'Patrulha Maria da Penha', area: 'MARIA_DA_PENHA', setor: 'Maria da Penha', bairros: 'Todo o Município de Valparaíso de Goiás', prefixo: 'VTR-PMP', cor: '#BE185D', responsavel: 'A definir (Resp. Maria da Penha)' },
      { id: 'ESC-01', nome: 'Patrulha Escolar', area: 'ESCOLAR', setor: 'Patrulha Escolar', bairros: 'Escolas Municipais, CMEIs e Corredores Escolares', prefixo: 'VTR-ESC', cor: '#9A3412', responsavel: 'A definir (Resp. Escolar)' },
      { id: 'TRN-01', nome: 'Trânsito / Mobilidade', area: 'TRANSITO', setor: 'Trânsito', bairros: 'Marginais BR-040, Av. Central e Rotatórias', prefixo: 'VTR-TRN', cor: '#4D7C0F', responsavel: 'A definir (Resp. Trânsito)' },
      { id: 'CCO-01', nome: 'Operador CCO / Rádio 153', area: 'CCO', setor: 'Base CCO', bairros: 'Central de Controle Operacional — Valparaíso-GO', prefixo: 'BASE-CCO', cor: '#27272A', responsavel: 'A definir (Coord. CCO)' }
    ];
  }

  function criarModeloCartaoPadrao(posto) {
    if (posto.area === 'MARIA_DA_PENHA') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
        missao: 'Fiscalização de medidas protetivas, visitas tranquilizadoras e apoio integrado à rede de proteção à mulher.',
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso', atividade: 'Assunção de serviço, conferência de pastas de medidas protetivas e vistoria da VTR.' },
          { hora: '08:00 - 12:00', local: 'Roteiro de Visitas Preventivas', atividade: 'Visitas agendadas e acompanhamento de assistidas.' },
          { hora: '14:00 - 18:00', local: 'CRAM / Rede de Proteção', atividade: 'Integração com a rede e visitas do período vespertino.' },
          { hora: '18:00 - 07:00', local: 'Prontidão / Apoio CCO', atividade: 'Atendimento prioritário a chamados 153 de violência doméstica.' }
        ],
        obs: 'Sigilo absoluto dos endereços de assistidas. Reportar deslocamentos ao CCO.'
      };
    }
    if (posto.area === 'ESCOLAR') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
        missao: 'Proteção no entorno das unidades escolares nos horários de entrada e saída e ronda patrimonial.',
        pontosBase: [
          { hora: '07:00 - 08:15', local: 'Escolas Municipais — Matutino', atividade: 'PB na entrada dos alunos e travessia segura.' },
          { hora: '11:15 - 12:45', local: 'Corredores Escolares — Troca', atividade: 'Saída matutina e entrada vespertina.' },
          { hora: '16:45 - 18:15', local: 'Escolas Municipais — Saída', atividade: 'Dispersão segura dos estudantes.' },
          { hora: '19:00 - 07:00', local: 'Ronda Patrimonial Escolar', atividade: 'Vistoria perimetral de escolas e CMEIs.' }
        ],
        obs: 'Manter contato preventivo com direções escolares.'
      };
    }
    if (posto.area === 'TRANSITO') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
        missao: 'Ordenamento viário, fluidez nos horários de pico e apoio em sinistros.',
        pontosBase: [
          { hora: '07:00 - 09:00', local: 'Acessos BR-040 / Av. Central', atividade: 'Operação fluidez no pico matutino.' },
          { hora: '11:30 - 13:30', local: 'Áreas Comerciais e Escolares', atividade: 'Fiscalização preventiva e segurança viária.' },
          { hora: '17:00 - 19:30', local: 'Rotatórias e Retornos BR-040', atividade: 'Operação fluidez no retorno do trabalho.' },
          { hora: '20:00 - 07:00', local: 'Apoio Operacional / Corredores', atividade: 'Sinalização de ocorrências viárias e patrulhamento.' }
        ],
        obs: 'Uso obrigatório de colete refletivo, cones e giroflex nas intervenções.'
      };
    }
    if (posto.area === 'CCO') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
        missao: 'Recepção de chamados 153, despacho de viaturas, controle de posicionamento e livro de plantão.',
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Sala CCO', atividade: 'Recebimento do plantão, teste de rádios e conferência de guarnições.' },
          { hora: '07:30 - 19:00', local: 'Sala CCO — Diurno', atividade: 'Despacho de ocorrências e monitoramento de perímetro.' },
          { hora: '19:00 - 07:00', local: 'Sala CCO — Noturno', atividade: 'Monitoramento contínuo e fechamento do relatório de turno.' }
        ],
        obs: 'Fechar relatório do plantão às 06:45 e repassar pendências à equipe entrante.'
      };
    }
    return {
      setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
      missao: 'Patrulhamento ostensivo preventivo, proteção de bens e instalações municipais e pronta resposta ao CCO.',
      pontosBase: [
        { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso', atividade: 'Assunção de serviço, vistoria de viatura e alinhamento CCO.' },
        { hora: '07:30 - 11:30', local: `PB 1 — ${posto.bairros.split(',')[0]}`, atividade: 'Patrulhamento em praças, UBSs, escolas e comércios.' },
        { hora: '11:30 - 14:00', local: `PB 2 — Corredores do ${posto.setor}`, atividade: 'Presença ostensiva em pontos de grande circulação.' },
        { hora: '14:00 - 18:00', local: `PB 3 — Prédios Públicos (${posto.setor})`, atividade: 'Ronda em postos de saúde, CRAS e ginásios.' },
        { hora: '18:00 - 22:00', local: `PB 4 — Saturação (${posto.setor})`, atividade: 'Ponto base com giroflex em paradas de ônibus e comércio noturno.' },
        { hora: '22:00 - 06:30', local: `Ronda Patrimonial Noturna`, atividade: 'Vistoria periódica em próprios municipais e prontidão.' },
        { hora: '06:30 - 07:00', local: 'Base GCM Valparaíso', atividade: 'Abastecimento, relatório de turno e passagem de serviço.' }
      ],
      obs: 'Manter rádio em QAP total, informar início/fim de PB ao CCO e registrar ponto na entrada e saída.'
    };
  }

  function gerarQra(nome) {
    const p = String(nome || '').trim().split(/\s+/);
    return p.length <= 1 ? nome : `${p[0]} ${p[p.length - 1]}`;
  }

  function criarEstadoInicial() {
    const postos = criarPostosPadrao();
    // Cargos de Autoridade/Administrativo com nomes FICTICIOS (Fulano, Sicrano, Beltrano, Terciano...) — NINGUEM dos 64 aqui!
    const administrativo = [
      { id: 'adm_1', cargo: 'Comandante da GCM', titular: 'Fulano de Tal (Provisório — Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Autoridade de Comando' },
      { id: 'adm_2', cargo: 'Subcomandante da GCM', titular: 'Sicrano de Tal (Provisório — Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Subcomando Operacional' },
      { id: 'adm_3', cargo: 'Corregedor(a) da GCM', titular: 'Beltrano de Tal (Provisório — Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Corregedoria' },
      { id: 'adm_4', cargo: 'Ouvidor(a) da GCM', titular: 'Terciano de Tal (Provisório — Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Ouvidoria' },
      { id: 'adm_5', cargo: 'Chefia de Operações e Escalas', titular: 'A definir (Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Gestão de Escalas e Cartão Programa' },
      { id: 'adm_6', cargo: 'Logística, Frota e Armamento', titular: 'A definir (Editar)', horario: 'Seg–Sex · 08h às 17h', obs: 'Apoio Administrativo' }
    ];

    // TODOS os 64 guardas entram diretamente como EFETIVO ATIVO da GCM (equilibrando mulheres nas 4 equipes)
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
      const [mat, nome, sexo] = item;
      const eq = EQUIPES[idx % 4];
      const pos = contEq[eq]++;
      let area = 'PATRULHAMENTO';
      let funcao = pos % 3 === 0 ? 'COMANDANTE_01' : (pos % 3 === 1 ? 'MOTORISTA_02' : 'PATRULHEIRO_03');
      if (pos === 9 || pos === 10) { area = 'MARIA_DA_PENHA'; funcao = pos === 9 ? 'COMANDANTE_01' : 'MOTORISTA_02'; }
      else if (pos === 11 || pos === 12) { area = 'ESCOLAR'; funcao = pos === 11 ? 'COMANDANTE_01' : 'MOTORISTA_02'; }
      else if (pos === 13 || pos === 14) { area = 'TRANSITO'; funcao = pos === 13 ? 'COMANDANTE_01' : 'MOTORISTA_02'; }
      else if (pos === 15) { area = 'CCO'; funcao = 'OPERADOR_CCO'; }

      const reg = {
        id: 'ag_' + mat.replace(/\D/g, ''),
        matricula: mat,
        nome,
        qra: gerarQra(nome),
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
    efetivo.sort((a, b) => a.matricula.localeCompare(b.matricula));

    // Monta as 4 equipes 24x72 (16 por equipe: 4 VTRs + Maria da Penha + Escolar + Transito + CCO)
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

    const codigosQ = CODIGO_Q_INICIAL.map((c, i) => ({ id: 'q_' + i, codigo: c[0], categoria: c[1], significado: c[2] }));

    return {
      versao: 3,
      config: {
        dataBaseAlfa: hojeISO(),
        horarioTroca: '07:00 às 07:00',
        baseNome: 'Base Operacional — GCM Valparaíso de Goiás',
        baseLat: -16.0658, baseLon: -47.9756, baseRaioMetros: 500,
        acaoSuspeita: 'ALERTAR', nuvemAtiva: false,
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
        { id: 'e12_1', posto: 'Paço Municipal / Sede Prefeitura', turno: 'Diurno (07h às 19h)', equipeA: 'A definir (Dias Ímpares)', equipeB: 'A definir (Dias Pares)' }
      ],
      eventos: [
        {
          id: 'ev_modelo_1', nome: 'Operação Evento Municipal (Modelo)', local: 'Praça Central — Valparaíso de Goiás',
          data: hojeISO(), inicio: '16:00', fim: '23:00', regime: 'HORA_EXTRA',
          coordenador: 'Fulano de Tal (Coordenador)', missao: 'Reforço preventivo, controle de público e fluidez viária.',
          obs: 'Apresentação 30 min antes na Base GCM com equipamento completo.',
          viaturas: [
            { id: 'evv_1', prefixo: 'VTR-EVENTO 01', setor: 'Palco / Acesso Principal', g01: '', g02: '', g03: '', g04: '' },
            { id: 'evv_2', prefixo: 'VTR-EVENTO 02', setor: 'Perímetro / Trânsito', g01: '', g02: '', g03: '', g04: '' }
          ]
        }
      ],
      codigosQ,
      cartoesModelo,
      cartoesDia: {},
      pontos: []
    };
  }

  // ---------- AUXILIARES ----------
  function toast(msg) {
    const area = $('toastArea'); if (!area) return;
    const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
    area.appendChild(el); setTimeout(() => el.remove(), 3500);
  }
  function atualizarBadgeSync(txt, cls) { const b = $('badgeSync'); if (b) { b.textContent = txt; b.className = 'badge ' + (cls || 'badge-neutro'); } }
  async function salvarTudo(silencioso) {
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    atualizarBadgeSync('Salvo Local', 'badge-ok');
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      atualizarBadgeSync('Sincronizando...', 'badge-warn');
      const r = await window.EscalaCloud.sincronizarEnviarNuvem(ESTADO);
      atualizarBadgeSync(r.ok ? 'Nuvem Própria OK' : 'Local (Offline)', r.ok ? 'badge-ok' : 'badge-warn');
    }
    if (!silencioso) toast('Alterações salvas.');
  }
  function isAdmin() { return SESSAO && SESSAO.perfil === 'ADMIN'; }
  function podeEditarEscala() { return SESSAO && (SESSAO.perfil === 'ADMIN' || SESSAO.perfil === 'ESCALANTE'); }
  function agentePorId(id) { return (ESTADO.efetivo || []).find(x => x.id === id); }
  function nomeAgentePorId(id) { const a = agentePorId(id); return a ? `${a.qra || a.nome} (${a.matricula})` : ''; }

  function descobrirSetorDoAgente(ag) {
    if (!ag) return { nome: '—', cor: '#52525B', funcao: '—' };
    if (ag.equipe === 'ADM') return { nome: 'Administrativo (Seg–Sex)', cor: '#27272A', funcao: 'Administrativo' };
    const mont = ESTADO.equipesMontagem[ag.equipe] || {};
    for (const p of ESTADO.postos) {
      const g = mont[p.id] || {};
      if (g.g01 === ag.id) return { nome: `${p.prefixo} — ${p.setor}`, cor: p.cor || '#27272A', funcao: '01 — Comandante' };
      if (g.g02 === ag.id) return { nome: `${p.prefixo} — ${p.setor}`, cor: p.cor || '#27272A', funcao: '02 — Motorista' };
      if (g.g03 === ag.id) return { nome: `${p.prefixo} — ${p.setor}`, cor: p.cor || '#27272A', funcao: '03 — Patrulheiro' };
    }
    return { nome: AREAS_LABEL[ag.area] || 'Reserva da Equipe', cor: '#52525B', funcao: FUNCOES_LABEL[ag.funcao] || 'Apoio' };
  }

  function aplicarTema(tema) {
    const t = tema === 'noturno' ? 'noturno' : 'claro';
    document.documentElement.setAttribute('data-tema', t);
    localStorage.setItem('escala_gcm_tema_v3', t);
    $('metaThemeColor')?.setAttribute('content', t === 'noturno' ? '#000000' : '#FFFFFF');
    if ($('btnTema')) $('btnTema').textContent = t === 'noturno' ? 'Modo Claro (Branco)' : 'Modo Noturno (Preto)';
    if ($('btnTemaAuth')) $('btnTemaAuth').textContent = t === 'noturno' ? 'Alternar Modo Claro (Branco)' : 'Alternar Modo Noturno (Preto)';
  }
  function alternarTema() { aplicarTema((document.documentElement.getAttribute('data-tema') || 'claro') === 'noturno' ? 'claro' : 'noturno'); }

  function abrirModal(titulo, corpoHtml, botoes) {
    $('modalTitulo').textContent = titulo;
    $('modalCorpo').innerHTML = corpoHtml;
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

  // ---------- MENU LATERAL ----------
  function fecharSidebarMobile() {
    $('appShell').classList.remove('menu-aberto-mobile');
    $('sidebarBackdrop').classList.add('oculto');
  }
  function alternarSidebar() {
    if (window.innerWidth <= 1024) {
      const aberto = $('appShell').classList.toggle('menu-aberto-mobile');
      $('sidebarBackdrop').classList.toggle('oculto', !aberto);
    } else {
      $('appShell').classList.toggle('menu-recolhido');
    }
  }

  // =========================================================================
  // 1. PAINEL DO DIA (LIMPO + DESTAQUE COLORIDO)
  // =========================================================================
  function renderPainel() {
    const hoje = hojeISO();
    const d = new Date();
    const dataExt = `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES_EXT[d.getMonth()]} de ${d.getFullYear()}`;
    $('lblSubtopo').textContent = `${dataExt} · Troca: ${ESTADO.config.horarioTroca}`;

    const ciclo = calcularCiclo24x72(hoje);
    const corHoje = EQUIPE_CORES[ciclo.equipeServico];
    const eqAmanha = EQUIPES[(EQUIPES.indexOf(ciclo.equipeServico) + 1) % 4];
    const corAmanha = EQUIPE_CORES[eqAmanha];
    const totalAtivos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO').length;
    const pontosHoje = (ESTADO.pontos || []).filter(p => (p.dataLocal || '').startsWith(hoje));

    $('heroEquipeHoje').style.borderLeftColor = corHoje.cor;
    $('heroEquipeHoje').innerHTML = `
      <div>
        <div class="subtexto">${esc(dataExt)} · Turno ${esc(ESTADO.config.horarioTroca)}</div>
        <div class="hero-titulo">EM SERVIÇO HOJE: <span class="pill-eq eq-${ciclo.equipeServico}" style="font-size:15px;padding:4px 12px;">EQUIPE ${ciclo.equipeServico} (${corHoje.nome})</span></div>
        <div class="subtexto mt-4">Amanhã entra a <strong style="color:${corAmanha.cor};">EQUIPE ${eqAmanha} (${corAmanha.nome})</strong> · Efetivo ativo total: <strong>${totalAtivos} guardas</strong> · Pontos hoje: <strong>${pontosHoje.length}</strong></div>
      </div>
      <div class="acoes-linha">
        <button type="button" class="btn btn-primario" id="btnHeroPdf">Baixar PDF Escala 24x72</button>
      </div>
    `;
    $('btnHeroPdf').addEventListener('click', () => gerarPdfEscalaMensal(false));

    $('cardsStatusEquipes').innerHTML = EQUIPES.map((eq) => {
      const st = ciclo.mapa[eq], c = EQUIPE_CORES[eq];
      const emServ = st.codigo === 'SERVICO';
      const qtd = ESTADO.efetivo.filter(a => a.equipe === eq && a.situacao === 'ATIVO').length;
      return `
        <div class="status-equipe-card ${emServ ? 'em-servico' : ''}" style="border-top-color:${c.cor};${emServ ? 'border-color:' + c.cor + ';' : ''}">
          <div class="card-cab">
            <strong style="color:${c.cor};">EQUIPE ${eq}</strong>
            <span class="pill-eq eq-${eq}">${st.rotulo}</span>
          </div>
          <div class="subtexto">${emServ ? 'Em patrulhamento 24h hoje' : (st.codigo === 'FOLGA_2' ? '48h descanso · Ideal p/ eventos' : (st.codigo === 'FOLGA_3' ? '72h descanso · Entra amanhã' : 'Saiu de 24h · Descanso'))}</div>
          <div style="font-size:12px;font-weight:700;">${qtd} guardas nesta equipe</div>
        </div>
      `;
    }).join('');

    $('badgeEquipeHoje').textContent = `EQUIPE ${ciclo.equipeServico} (${corHoje.nome})`;
    $('badgeEquipeHoje').style.background = corHoje.cor;
    $('badgeEquipeHoje').style.color = '#FFFFFF';
    $('badgeEquipeHoje').style.borderColor = corHoje.cor;

    const mont = ESTADO.equipesMontagem[ciclo.equipeServico] || {};
    $('gridGuarnicoesHoje').innerHTML = ESTADO.postos.map(p => {
      const g = mont[p.id] || {};
      const nomes = [
        g.g01 ? `<div><strong>01:</strong> ${esc(nomeAgentePorId(g.g01))}</div>` : '',
        g.g02 ? `<div><strong>02:</strong> ${esc(nomeAgentePorId(g.g02))}</div>` : '',
        g.g03 ? `<div><strong>03:</strong> ${esc(nomeAgentePorId(g.g03))}</div>` : ''
      ].filter(Boolean).join('') || '<div class="subtexto">Guarnição não definida</div>';
      return `
        <div class="posto-card" style="border-left-color:${esc(p.cor || '#27272A')};">
          <div class="card-cab">
            <strong>${esc(p.nome)}</strong>
            <span class="pill-setor" style="background:${esc(p.cor || '#27272A')};">${esc(p.setor)}</span>
          </div>
          <div class="subtexto">Resp.: ${esc(p.responsavel || 'A definir')} · ${esc(p.bairros)}</div>
          <div style="font-size:12px;">${nomes}</div>
        </div>
      `;
    }).join('');

    const evs = (ESTADO.eventos || []).slice().sort((a,b) => (a.data||'').localeCompare(b.data||''));
    $('listaEventosPainel').innerHTML = evs.length ? evs.slice(0, 4).map(ev => `
      <div class="item-compacto clicavel" data-ir-ev="${esc(ev.id)}">
        <div><strong>${esc(ev.nome)}</strong><div class="subtexto">${formatarDataBR(ev.data)} · ${esc(ev.inicio)}–${esc(ev.fim)} · ${esc(ev.local)}</div></div>
        <span class="badge badge-invertido">${(ev.viaturas||[]).length} VTR(s)</span>
      </div>
    `).join('') : '<div class="item-compacto"><span class="subtexto">Nenhum evento programado.</span></div>';
    $('listaEventosPainel').querySelectorAll('[data-ir-ev]').forEach(el => el.addEventListener('click', () => { eventoSelecionadoId = el.getAttribute('data-ir-ev'); abrirAba('secEventos'); }));

    $('badgePontosHoje').textContent = `${pontosHoje.length} ponto(s)`;
    $('listaPontosHoje').innerHTML = pontosHoje.length ? pontosHoje.slice(0, 5).map(pt => {
      const cls = pt.auditoria?.status === 'VERIFICADO' ? 'badge-ok' : (pt.auditoria?.status === 'ATENCAO' ? 'badge-warn' : 'badge-erro');
      return `<div class="item-compacto"><div><strong>${esc(pt.agenteNome)}</strong> <span class="badge badge-neutro">${esc(pt.tipo)}</span><div class="subtexto">${esc(pt.horaLocal)} · ${esc(pt.posto)}</div></div><span class="badge ${cls}">${esc(pt.auditoria?.status||'—')} (${pt.auditoria?.score??0}%)</span></div>`;
    }).join('') : '<div class="item-compacto"><span class="subtexto">Nenhum ponto registrado hoje.</span></div>';
  }

  // =========================================================================
  // 2. ESCALA 24x72, QUADRO EXPLICATIVO POR PESSOA, EQUIPES, SETORES, ADM
  // =========================================================================
  function renderCalendario24() {
    const mesVal = $('selMesEscala').value || mesAtualISO();
    $('selMesEscala').value = mesVal;
    $('inpDataBaseAlfa').value = ESTADO.config.dataBaseAlfa || hojeISO();
    $('inpHorarioTroca').value = ESTADO.config.horarioTroca || '07:00 às 07:00';
    const [ano, mes] = mesVal.split('-').map(Number);
    const ult = new Date(ano, mes, 0).getDate();
    const hoje = hojeISO();
    const rows = [];
    for (let d = 1; d <= ult; d++) {
      const iso = `${ano}-${String(mes).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dt = new Date(ano, mes - 1, d);
      const c = calcularCiclo24x72(iso);
      const ehHoje = iso === hoje;
      const cel = (eq) => c.mapa[eq].codigo === 'SERVICO' ? `<span class="pill-eq eq-${eq}">SERVIÇO 24h</span>` : `<span class="subtexto">${c.mapa[eq].rotulo}</span>`;
      rows.push(`
        <tr class="${ehHoje ? 'linha-hoje' : ''}">
          <td><strong>${String(d).padStart(2,'0')}/${String(mes).padStart(2,'0')}</strong> ${ehHoje ? '<span class="badge badge-invertido">HOJE</span>' : ''}</td>
          <td>${DIAS_SEMANA[dt.getDay()]}</td>
          <td><span class="pill-eq eq-${c.equipeServico}">EQUIPE ${c.equipeServico}</span></td>
          <td>${cel('ALFA')}</td><td>${cel('BRAVO')}</td><td>${cel('CHARLIE')}</td><td>${cel('DELTA')}</td>
          <td><button type="button" class="btn btn-sec btn-sm" data-abrir-cp="${iso}">Cartão</button></td>
        </tr>
      `);
    }
    $('tbodyCalendario24').innerHTML = rows.join('');
    $('tbodyCalendario24').querySelectorAll('[data-abrir-cp]').forEach(b => b.addEventListener('click', () => {
      abrirAba('secCartao'); $('inpCartaoData').value = b.getAttribute('data-abrir-cp'); sincronizarDataCartao();
    }));
  }

  function renderQuadroPessoas() {
    const mesVal = $('selMesEscala').value || mesAtualISO();
    const fltEq = $('fltQpEquipe').value || '';
    const busca = ($('fltQpBusca').value || '').trim().toLowerCase();
    const ordemEq = { ALFA: 1, BRAVO: 2, CHARLIE: 3, DELTA: 4, ADM: 5, '12X36': 6 };

    const lista = ESTADO.efetivo
      .filter(a => a.situacao === 'ATIVO')
      .filter(a => !fltEq || a.equipe === fltEq)
      .filter(a => !busca || a.nome.toLowerCase().includes(busca) || (a.qra||'').toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca))
      .sort((a, b) => (ordemEq[a.equipe] || 9) - (ordemEq[b.equipe] || 9) || a.matricula.localeCompare(b.matricula));

    $('tbodyQuadroPessoas').innerHTML = lista.map(a => {
      const infoSetor = descobrirSetorDoAgente(a);
      const dias = diasServicoNoMes(a.equipe, mesVal);
      return `
        <tr>
          <td><strong>${esc(a.matricula)}</strong></td>
          <td><strong>${esc(a.nome)}</strong><div class="subtexto">QRA: ${esc(a.qra || '—')}</div></td>
          <td><span class="pill-eq eq-${esc(a.equipe)}">${esc(a.equipe)}</span></td>
          <td><span class="pill-setor" style="background:${esc(infoSetor.cor)};">${esc(infoSetor.nome)}</span></td>
          <td>${esc(infoSetor.funcao)}</td>
          <td><strong>${esc(dias)}</strong></td>
        </tr>
      `;
    }).join('');
  }

  function renderMontagemEquipe() {
    const eq = $('selEquipeMontagem').value || 'ALFA';
    const mont = ESTADO.equipesMontagem[eq] || {};
    const daEq = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === eq);
    const outros = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe !== eq);
    const opts = (sel) => {
      let h = '<option value="">— Vago —</option>';
      h += `<optgroup label="Efetivo Equipe ${eq} (${daEq.length})">`;
      daEq.forEach(a => { h += `<option value="${esc(a.id)}" ${a.id === sel ? 'selected' : ''}>${esc(a.qra)} (${esc(a.matricula)})</option>`; });
      h += '</optgroup><optgroup label="Outros (Permuta / Apoio)">';
      outros.forEach(a => { h += `<option value="${esc(a.id)}" ${a.id === sel ? 'selected' : ''}>[${esc(a.equipe)}] ${esc(a.qra)} (${esc(a.matricula)})</option>`; });
      return h + '</optgroup>';
    };
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('gridPostosEquipe').innerHTML = ESTADO.postos.map(p => {
      const g = mont[p.id] || { g01: '', g02: '', g03: '' };
      return `
        <div class="posto-card" data-posto-id="${esc(p.id)}" style="border-left-color:${esc(p.cor || '#27272A')};">
          <div class="card-cab">
            <div><strong>${esc(p.nome)}</strong><div class="subtexto">Resp.: ${esc(p.responsavel || 'A definir')} · ${esc(p.bairros)}</div></div>
            <div class="acoes-linha">
              <span class="pill-setor" style="background:${esc(p.cor || '#27272A')};">${esc(p.setor)}</span>
              ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-rem-posto="${esc(p.id)}">Remover</button>` : ''}
            </div>
          </div>
          <div class="campo"><label>01 — Comandante</label><select class="sel-g01" ${desab}>${opts(g.g01)}</select></div>
          <div class="campo"><label>02 — Motorista</label><select class="sel-g02" ${desab}>${opts(g.g02)}</select></div>
          <div class="campo"><label>03 — Patrulheiro (Opcional)</label><select class="sel-g03" ${desab}>${opts(g.g03)}</select></div>
        </div>
      `;
    }).join('');
    $('gridPostosEquipe').querySelectorAll('[data-rem-posto]').forEach(btn => btn.addEventListener('click', async () => {
      const pid = btn.getAttribute('data-rem-posto');
      if (!confirm(`Remover setor ${pid}?`)) return;
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
        if (vistos.has(val)) dups.push(`${nomeAgentePorId(val)} (${vistos.get(val)} e ${pid})`);
        else vistos.set(val, pid);
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
    const eq = $('selEquipeMontagem').value;
    ESTADO.equipesMontagem[eq] = ESTADO.equipesMontagem[eq] || {};
    $('gridPostosEquipe').querySelectorAll('.posto-card').forEach(card => {
      ESTADO.equipesMontagem[eq][card.getAttribute('data-posto-id')] = {
        g01: card.querySelector('.sel-g01').value, g02: card.querySelector('.sel-g02').value, g03: card.querySelector('.sel-g03').value
      };
    });
    await salvarTudo(); renderPainel(); renderQuadroPessoas();
  }

  function autoDistribuirEquipeAtual() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    const eq = $('selEquipeMontagem').value;
    const livres = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === eq);
    const usados = new Set();
    const pegar = (area, prefFem) => {
      let f = prefFem ? livres.find(a => a.sexo === 'F' && !usados.has(a.id)) : null;
      if (!f) f = livres.find(a => a.area === area && !usados.has(a.id)) || livres.find(a => !usados.has(a.id));
      if (f) usados.add(f.id);
      return f ? f.id : '';
    };
    ESTADO.equipesMontagem[eq] = {};
    [...ESTADO.postos].sort((a,b) => a.area === 'MARIA_DA_PENHA' ? -1 : 1).forEach(p => {
      const pf = p.area === 'MARIA_DA_PENHA';
      ESTADO.equipesMontagem[eq][p.id] = { g01: pegar(p.area, pf), g02: p.area === 'CCO' ? '' : pegar(p.area, pf), g03: '' };
    });
    ESTADO.postos.filter(p => p.area === 'PATRULHAMENTO').forEach(p => {
      const s = livres.find(a => !usados.has(a.id));
      if (s) { usados.add(s.id); ESTADO.equipesMontagem[eq][p.id].g03 = s.id; }
    });
    renderMontagemEquipe();
    toast(`Equipe ${eq} preenchida! Clique em Salvar Composição.`);
  }

  function renderSetoresResponsaveis() {
    const desab = podeEditarEscala() ? '' : 'disabled';
    const dl = `<datalist id="dlEfetivoResp">${ESTADO.efetivo.map(a => `<option value="${esc(a.nome)} (${esc(a.matricula)})">`).join('')}</datalist>`;
    $('listaSetoresResp').innerHTML = dl + ESTADO.postos.map((p, idx) => `
      <div class="posto-card" data-setor-idx="${idx}" style="border-left-color:${esc(p.cor || '#27272A')};">
        <div class="grid-4">
          <div class="campo"><label>Prefixo</label><input type="text" class="st-prefixo" value="${esc(p.prefixo || p.id)}" ${desab}></div>
          <div class="campo"><label>Nome do Setor / Posto</label><input type="text" class="st-nome" value="${esc(p.nome)}" ${desab}></div>
          <div class="campo"><label>Responsável pelo Setor</label><input type="text" list="dlEfetivoResp" class="st-resp" value="${esc(p.responsavel || '')}" ${desab}></div>
          <div class="campo"><label>Cor do Setor (Tela e PDF)</label><input type="color" class="st-cor" value="${esc(p.cor || '#166534')}" ${desab}></div>
        </div>
        <div class="grid-3">
          <div class="campo"><label>Rótulo Curto</label><input type="text" class="st-setor" value="${esc(p.setor || '')}" ${desab}></div>
          <div class="campo"><label>Área</label><select class="st-area" ${desab}>${Object.entries(AREAS_LABEL).map(([k,v]) => `<option value="${k}" ${p.area === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
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
      p.cor = card.querySelector('.st-cor').value || '#27272A';
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
      `<div class="grid-3">
         <div class="campo"><label>Prefixo</label><input type="text" id="mPosId" placeholder="VTR-05"></div>
         <div class="campo"><label>Área</label><select id="mPosArea">${Object.entries(AREAS_LABEL).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}</select></div>
         <div class="campo"><label>Cor do Setor</label><input type="color" id="mPosCor" value="#0F766E"></div>
       </div>
       <div class="campo"><label>Nome do Posto / Setor</label><input type="text" id="mPosNome" placeholder="VTR-05 — Setor 05"></div>
       <div class="campo"><label>Responsável pelo Setor</label><input type="text" id="mPosResp" placeholder="Nome do responsável"></div>
       <div class="campo"><label>Bairros / Cobertura</label><input type="text" id="mPosBairros" placeholder="Bairros de Valparaíso-GO"></div>`,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Adicionar', classe: 'btn-primario', onClick: async () => {
          const id = ($('mPosId').value || '').trim().toUpperCase().replace(/\s+/g, '-');
          const nome = ($('mPosNome').value || '').trim();
          if (!id || !nome) return toast('Informe prefixo e nome.');
          if (ESTADO.postos.some(x => x.id === id)) return toast('Prefixo já existe.');
          const novo = { id, nome, area: $('mPosArea').value, setor: nome, bairros: $('mPosBairros').value.trim() || 'Valparaíso de Goiás', prefixo: id, cor: $('mPosCor').value || '#0F766E', responsavel: $('mPosResp').value.trim() || 'A definir' };
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
        <div class="campo"><label>Cargo / Autoridade</label><input type="text" class="adm-cargo" value="${esc(c.cargo)}" ${desab}></div>
        <div class="campo"><label>Titular (Provisório / Editar)</label><input type="text" class="adm-titular" value="${esc(c.titular)}" ${desab}></div>
        ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-adm="${idx}">X</button>` : ''}
        <div class="campo"><label>Horário</label><input type="text" class="adm-horario" value="${esc(c.horario || 'Seg–Sex · 08h às 17h')}" ${desab}></div>
        <div class="campo"><label>Observação</label><input type="text" class="adm-obs" value="${esc(c.obs || '')}" ${desab}></div>
      </div>
    `).join('');
    $('listaCargosAdm').querySelectorAll('[data-del-adm]').forEach(b => b.addEventListener('click', () => { ESTADO.administrativo.splice(Number(b.getAttribute('data-del-adm')), 1); renderAdmE12x36(); }));

    $('listaPostos12x36').innerHTML = (ESTADO.escala12x36 || []).map((e, idx) => `
      <div class="linha-editavel" data-e12-idx="${idx}">
        <div class="campo"><label>Posto 12x36</label><input type="text" class="e12-posto" value="${esc(e.posto)}" ${desab}></div>
        <div class="campo"><label>Turno</label><input type="text" class="e12-turno" value="${esc(e.turno)}" ${desab}></div>
        ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-e12="${idx}">X</button>` : ''}
        <div class="campo"><label>Turma A</label><input type="text" class="e12-a" value="${esc(e.equipeA || '')}" ${desab}></div>
        <div class="campo"><label>Turma B</label><input type="text" class="e12-b" value="${esc(e.equipeB || '')}" ${desab}></div>
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
  // 3. CARTAO PROGRAMA
  // =========================================================================
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
    $('tituloEditorCartao').textContent = `Cartão Programa — ${posto.nome} (${formatarDataBR(d)} · Equipe ${eq})`;
    $('badgeAreaCartao').textContent = posto.setor;
    $('badgeAreaCartao').style.background = posto.cor || '#27272A';
    $('badgeAreaCartao').style.color = '#FFFFFF';
    $('inpCpSetor').value = cp.setor || ''; $('inpCpPrefixo').value = cp.prefixo || '';
    $('inpCpRespSetor').value = cp.responsavel || ''; $('inpCpBairros').value = cp.bairros || '';
    $('inpCpG01').value = cp.g01 || ''; $('inpCpG02').value = cp.g02 || ''; $('inpCpG03').value = cp.g03 || '';
    $('inpCpMissao').value = cp.missao || ''; $('inpCpObs').value = cp.obs || '';
    renderLinhasPb(cp.pontosBase || []);
  }
  function renderLinhasPb(lista) {
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('tbodyPontosBase').innerHTML = (lista || []).map((it, i) => `
      <tr>
        <td><input type="text" class="pb-hora" value="${esc(it.hora||'')}" ${desab}></td>
        <td><input type="text" class="pb-local" value="${esc(it.local||'')}" ${desab}></td>
        <td><input type="text" class="pb-ativ" value="${esc(it.atividade||'')}" ${desab}></td>
        <td>${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-pb="${i}">X</button>` : ''}</td>
      </tr>
    `).join('');
    $('tbodyPontosBase').querySelectorAll('[data-del-pb]').forEach(b => b.addEventListener('click', () => b.closest('tr').remove()));
  }
  function lerCartaoDoEditor() {
    const pontosBase = [];
    $('tbodyPontosBase').querySelectorAll('tr').forEach(tr => {
      const hora = tr.querySelector('.pb-hora')?.value.trim() || '', local = tr.querySelector('.pb-local')?.value.trim() || '', atividade = tr.querySelector('.pb-ativ')?.value.trim() || '';
      if (hora || local || atividade) pontosBase.push({ hora, local, atividade });
    });
    return { setor: $('inpCpSetor').value.trim(), prefixo: $('inpCpPrefixo').value.trim(), responsavel: $('inpCpRespSetor').value.trim(), bairros: $('inpCpBairros').value.trim(), g01: $('inpCpG01').value.trim(), g02: $('inpCpG02').value.trim(), g03: $('inpCpG03').value.trim(), missao: $('inpCpMissao').value.trim(), pontosBase, obs: $('inpCpObs').value.trim() };
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
      ls.push(`Missão: ${cp.missao}`);
      (cp.pontosBase||[]).forEach(pb => ls.push(`  - [${pb.hora}] ${pb.local}: ${pb.atividade}`));
      ls.push('');
    });
    const txt = ls.join('\n');
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(() => toast('Resumo copiado para o WhatsApp!'));
    else abrirModal('Copiar WhatsApp', `<textarea rows="13" style="width:100%;font-family:monospace;">${esc(txt)}</textarea>`, [{ texto: 'Fechar', onClick: fecharModal }]);
  }

  // =========================================================================
  // 4. EVENTOS EXTRAORDINARIOS
  // =========================================================================
  function renderListaEventos() {
    const lista = ESTADO.eventos || [];
    $('badgeQtdEventos').textContent = lista.length;
    if (!lista.length) { $('listaEventosSidebar').innerHTML = '<div class="subtexto">Nenhum evento.</div>'; $('vazioEvento').classList.remove('oculto'); $('conteudoEditorEvento').classList.add('oculto'); return; }
    if (!eventoSelecionadoId || !lista.some(e => e.id === eventoSelecionadoId)) eventoSelecionadoId = lista[0].id;
    $('listaEventosSidebar').innerHTML = lista.map(ev => `
      <div class="item-compacto clicavel ${ev.id === eventoSelecionadoId ? 'selecionado' : ''}" data-sel-ev="${esc(ev.id)}">
        <div><strong>${esc(ev.nome)}</strong><div class="subtexto">${formatarDataBR(ev.data)} · ${esc(ev.inicio)}–${esc(ev.fim)}</div></div>
        <span class="badge badge-neutro">${(ev.viaturas||[]).length} VTR</span>
      </div>
    `).join('');
    $('listaEventosSidebar').querySelectorAll('[data-sel-ev]').forEach(el => el.addEventListener('click', () => { eventoSelecionadoId = el.getAttribute('data-sel-ev'); renderListaEventos(); }));
    carregarEditorEvento();
  }
  function atualizarDicaFolgaEvento(dataISO) {
    if (!dataISO) return;
    const c = calcularCiclo24x72(dataISO);
    const ideal = EQUIPES.find(eq => c.mapa[eq].codigo === 'FOLGA_2') || '—';
    const f1 = EQUIPES.find(eq => c.mapa[eq].codigo === 'FOLGA_1') || '—';
    const f3 = EQUIPES.find(eq => c.mapa[eq].codigo === 'FOLGA_3') || '—';
    $('boxDicaFolgaEvento').innerHTML = `<strong>Folgas em ${formatarDataBR(dataISO)}:</strong> Serviço 24h: <span class="pill-eq eq-${c.equipeServico}">${c.equipeServico}</span> · Ideal p/ Evento (2ª Folga 48h): <span class="pill-eq eq-${ideal}">${ideal}</span> · Evitar: ${f1} e ${f3}.`;
  }
  function carregarEditorEvento() {
    const ev = (ESTADO.eventos || []).find(x => x.id === eventoSelecionadoId);
    if (!ev) { $('vazioEvento').classList.remove('oculto'); $('conteudoEditorEvento').classList.add('oculto'); return; }
    $('vazioEvento').classList.add('oculto'); $('conteudoEditorEvento').classList.remove('oculto');
    $('tituloEditorEvento').textContent = `Evento: ${ev.nome}`;
    $('inpEvNome').value = ev.nome || ''; $('inpEvLocal').value = ev.local || ''; $('inpEvData').value = ev.data || hojeISO();
    $('inpEvInicio').value = ev.inicio || '16:00'; $('inpEvFim').value = ev.fim || '23:00'; $('selEvRegime').value = ev.regime || 'HORA_EXTRA';
    $('inpEvCoord').value = ev.coordenador || ''; $('inpEvMissao').value = ev.missao || ''; $('inpEvObs').value = ev.obs || '';
    atualizarDicaFolgaEvento($('inpEvData').value);
    renderViaturasEvento(ev.viaturas || [], $('inpEvData').value);
  }
  function renderViaturasEvento(viaturas, dataISO) {
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    const desab = podeEditarEscala() ? '' : 'disabled';
    const peso = (a) => {
      if (a.equipe === 'ADM') return 2;
      const st = calcularCiclo24x72(dataISO).mapa[a.equipe];
      if (!st) return 3;
      return st.codigo === 'FOLGA_2' ? 1 : (st.codigo === 'FOLGA_3' ? 4 : (st.codigo === 'FOLGA_1' ? 5 : 6));
    };
    const ord = [...ativos].sort((a,b) => peso(a) - peso(b) || a.nome.localeCompare(b.nome));
    const opts = (sel) => '<option value="">— Vago —</option>' + ord.map(a => `<option value="${esc(a.id)}" ${a.id === sel ? 'selected' : ''}>${esc(a.qra)} (${esc(a.matricula)}) · [${esc(a.equipe)} — ${esc(statusAgenteNaData(a, dataISO))}]</option>`).join('');
    $('gridViaturasEvento').innerHTML = (viaturas || []).map((v, idx) => `
      <div class="posto-card" data-evv-idx="${idx}">
        <div class="card-cab"><strong>Viatura Extra #${idx + 1}</strong>${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-evv="${idx}">Remover</button>` : ''}</div>
        <div class="grid-2"><div class="campo"><label>Prefixo</label><input type="text" class="evv-pref" value="${esc(v.prefixo||'')}" ${desab}></div><div class="campo"><label>Setor no Evento</label><input type="text" class="evv-setor" value="${esc(v.setor||'')}" ${desab}></div></div>
        <div class="grid-2"><div class="campo"><label>01 — Comandante</label><select class="evv-g01" ${desab}>${opts(v.g01)}</select></div><div class="campo"><label>02 — Motorista</label><select class="evv-g02" ${desab}>${opts(v.g02)}</select></div></div>
        <div class="grid-2"><div class="campo"><label>03 — Patrulheiro</label><select class="evv-g03" ${desab}>${opts(v.g03)}</select></div><div class="campo"><label>04 — Apoio</label><select class="evv-g04" ${desab}>${opts(v.g04)}</select></div></div>
      </div>
    `).join('');
    $('gridViaturasEvento').querySelectorAll('[data-del-evv]').forEach(btn => btn.addEventListener('click', () => {
      const cur = lerEventoDoEditor(); cur.viaturas.splice(Number(btn.getAttribute('data-del-evv')), 1); renderViaturasEvento(cur.viaturas, cur.data);
    }));
  }
  function lerEventoDoEditor() {
    const viaturas = [];
    $('gridViaturasEvento').querySelectorAll('.posto-card').forEach((card, i) => viaturas.push({
      id: 'evv_' + i, prefixo: card.querySelector('.evv-pref').value.trim() || `VTR-EVENTO 0${i+1}`,
      setor: card.querySelector('.evv-setor').value.trim(), g01: card.querySelector('.evv-g01').value,
      g02: card.querySelector('.evv-g02').value, g03: card.querySelector('.evv-g03').value, g04: card.querySelector('.evv-g04').value
    }));
    return { id: eventoSelecionadoId, nome: $('inpEvNome').value.trim() || 'Evento Extra', local: $('inpEvLocal').value.trim(), data: $('inpEvData').value || hojeISO(), inicio: $('inpEvInicio').value || '16:00', fim: $('inpEvFim').value || '23:00', regime: $('selEvRegime').value, coordenador: $('inpEvCoord').value.trim(), missao: $('inpEvMissao').value.trim(), obs: $('inpEvObs').value.trim(), viaturas };
  }
  function copiarWhatsAppEvento() {
    const ev = lerEventoDoEditor();
    const ls = [`*GCM VALPARAÍSO — ESCALA DE EVENTO*`, `Evento: *${ev.nome}*`, `Data: *${formatarDataBR(ev.data)}* (${ev.inicio} às ${ev.fim})`, `Local: ${ev.local}`, `Coordenador: ${ev.coordenador || 'A definir'}`, `--------------------------------`];
    (ev.viaturas||[]).forEach(v => { ls.push(`*${v.prefixo}* — ${v.setor}`); ls.push([v.g01 && `01: ${nomeAgentePorId(v.g01)}`, v.g02 && `02: ${nomeAgentePorId(v.g02)}`, v.g03 && `03: ${nomeAgentePorId(v.g03)}`, v.g04 && `04: ${nomeAgentePorId(v.g04)}`].filter(Boolean).join(' | ') || 'A definir'); ls.push(''); });
    const txt = ls.join('\n');
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).then(() => toast('Evento copiado para WhatsApp!'));
    else abrirModal('WhatsApp', `<textarea rows="12" style="width:100%;font-family:monospace;">${esc(txt)}</textarea>`, [{ texto: 'Fechar', onClick: fecharModal }]);
  }
  function gerarPdfEvento() {
    const ev = lerEventoDoEditor();
    const rows = (ev.viaturas||[]).map(v => `<tr><td><strong>${esc(v.prefixo)}</strong><br><small>${esc(v.setor)}</small></td><td>${esc(nomeAgentePorId(v.g01)||'—')}</td><td>${esc(nomeAgentePorId(v.g02)||'—')}</td><td>${esc(nomeAgentePorId(v.g03)||'—')}</td><td>${esc(nomeAgentePorId(v.g04)||'—')}</td></tr>`).join('');
    const corpo = `${cabecalhoPdfHtml('ORDEM DE SERVIÇO — ESCALA DE EVENTO EXTRAORDINÁRIO', `${ev.nome} · ${formatarDataBR(ev.data)} (${ev.inicio} às ${ev.fim})`)}<div class="box"><div class="grid-info"><div><strong>Evento:</strong><br>${esc(ev.nome)}</div><div><strong>Local:</strong><br>${esc(ev.local)}</div><div><strong>Modalidade:</strong><br>${esc(MODALIDADE_EVENTO[ev.regime]||ev.regime)}</div></div><div><strong>Coordenador:</strong> ${esc(ev.coordenador||'—')} · <strong>Missão:</strong> ${esc(ev.missao||'—')}</div></div><h2>VIATURAS E GUARNIÇÕES</h2><table><thead><tr><th>Viatura / Setor</th><th>01</th><th>02</th><th>03</th><th>04</th></tr></thead><tbody>${rows}</tbody></table><div class="box" style="margin-top:8px;"><strong>Observações:</strong> ${esc(ev.obs||'—')}</div>${rodapeAssinaturasPdfHtml()}`;
    exportarHtmlParaPdf(montarDocumentoPdf(`Evento ${ev.nome}`, corpo, false), `escala-evento-${ev.data}.pdf`, false);
  }

  // =========================================================================
  // 5. FOLHA DE PONTO (FOTO AO VIVO + GPS ANTIFRAUDE 7 CAMADAS)
  // =========================================================================
  function popularSelectsPonto() {
    const sel = $('selPontoAgente'), flt = $('fltPontoAgente');
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    sel.innerHTML = ativos.map(a => `<option value="${esc(a.id)}">${esc(a.nome)} (${esc(a.matricula)}) · ${esc(a.equipe)}</option>`).join('');
    flt.innerHTML = '<option value="">Todos os Guardas</option>' + ativos.map(a => `<option value="${esc(a.id)}">${esc(a.nome)} (${esc(a.matricula)})</option>`).join('');
    if (!podeEditarEscala() && SESSAO?.matricula) {
      const meu = ativos.find(a => (a.matricula||'').toUpperCase() === SESSAO.matricula.toUpperCase());
      if (meu) { sel.value = meu.id; sel.disabled = true; } else sel.disabled = false;
    } else sel.disabled = false;
    $('selPontoEquipe').value = calcularCiclo24x72(hojeISO()).equipeServico;
    if (!$('fltPontoMes').value) $('fltPontoMes').value = mesAtualISO();
  }
  async function abrirCameraAoVivo() {
    pararCamera();
    try {
      streamCamera = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      const v = $('videoCamera'); v.srcObject = streamCamera; v.classList.remove('oculto');
      $('placeholderCamera').classList.add('oculto'); $('imgPreviewFoto').classList.add('oculto');
      $('btnCapturarFoto').disabled = false; $('btnRefazerFoto').disabled = true;
      $('statusFoto').textContent = 'Câmera ativa'; $('statusFoto').className = 'badge badge-warn';
    } catch (e) { toast('Permita o uso da câmera (HTTPS obrigatório no celular).'); }
  }
  function pararCamera() { if (streamCamera) { streamCamera.getTracks().forEach(t => t.stop()); streamCamera = null; } }
  function capturarFotoComCarimbo() {
    const v = $('videoCamera'), c = $('canvasFoto'); if (!v || !v.videoWidth) return toast('Aguarde a câmera.');
    const w = 440, h = Math.round((v.videoHeight / v.videoWidth) * w) || 330;
    c.width = w; c.height = h; const ctx = c.getContext('2d'); ctx.drawImage(v, 0, 0, w, h);
    const ag = agentePorId($('selPontoAgente').value), tipo = $('selPontoTipo').value, agora = formatarDataHoraBR(new Date().toISOString());
    const coord = auditoriaGpsAtual?.lat ? `GPS: ${auditoriaGpsAtual.lat.toFixed(5)}, ${auditoriaGpsAtual.lon.toFixed(5)} (±${Math.round(auditoriaGpsAtual.accuracy)}m)` : 'GPS: Validado na assinatura';
    ctx.fillStyle = 'rgba(0,0,0,0.8)'; ctx.fillRect(0, h - 54, w, 54); ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px monospace'; ctx.fillText(`GCM VALPARAÍSO-GO · ${tipo} · ${agora}`, 8, h - 36);
    ctx.font = '10px monospace'; ctx.fillText(`GUARDA: ${ag ? ag.nome + ' (' + ag.matricula + ')' : '—'}`, 8, h - 21);
    ctx.fillText(coord, 8, h - 7);
    fotoCapturadaDataUrl = c.toDataURL('image/jpeg', 0.62);
    pararCamera(); v.classList.add('oculto');
    const img = $('imgPreviewFoto'); img.src = fotoCapturadaDataUrl; img.classList.remove('oculto');
    $('btnCapturarFoto').disabled = true; $('btnRefazerFoto').disabled = false;
    $('statusFoto').textContent = 'Foto ao vivo OK'; $('statusFoto').className = 'badge badge-ok';
  }
  function distanciaMetros(la1, lo1, la2, lo2) {
    const R = 6371000, rad = v => v * Math.PI / 180;
    const a = Math.sin(rad(la2-la1)/2)**2 + Math.cos(rad(la1))*Math.cos(rad(la2))*Math.sin(rad(lo2-lo1)/2)**2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  async function consultarEnderecoReal(lat, lon) {
    const fj = async (u, ms) => { const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), ms||4500); try { const r = await fetch(u, { signal: ctrl.signal }); clearTimeout(t); return r.ok ? await r.json() : null; } catch (_) { clearTimeout(t); return null; } };
    const nom = await fj(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=pt-BR`);
    if (nom?.address) {
      const a = nom.address, txt = [(a.road||a.suburb||'') + (a.house_number ? ', '+a.house_number : ''), a.suburb||a.neighbourhood||'', a.city||a.town||a.municipality||'', a.state_code||a.state||''].filter(Boolean).join(', ') + (a.postcode ? ' — CEP ' + a.postcode : '');
      if (txt.trim()) return { texto: txt, fonte: 'OpenStreetMap' };
    }
    const ph = await fj(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`);
    if (ph?.features?.[0]?.properties) {
      const p = ph.features[0].properties, txt = [p.street||p.name, p.district||p.locality, p.city, p.state].filter(Boolean).join(', ');
      if (txt.trim()) return { texto: txt, fonte: 'Photon' };
    }
    const bdc = await fj(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`);
    if (bdc && (bdc.city || bdc.locality)) return { texto: [bdc.locality, bdc.city, bdc.principalSubdivision].filter(Boolean).join(', '), fonte: 'BigDataCloud' };
    return { texto: `Localidade não confirmada (offline) · ${lat.toFixed(6)}, ${lon.toFixed(6)}`, fonte: 'Offline' };
  }
  async function consultarHoraRede() {
    for (const u of ['https://timeapi.io/api/Time/current/zone?timeZone=America/Sao_Paulo', 'https://worldtimeapi.org/api/timezone/America/Sao_Paulo']) {
      try { const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 3500); const r = await fetch(u, { signal: ctrl.signal }); clearTimeout(t); if (!r.ok) continue; const j = await r.json(); const dt = new Date(j.dateTime || j.datetime || j.utc_datetime); if (!isNaN(dt.getTime())) return { ok: true, timestampMs: dt.getTime(), iso: dt.toISOString() }; } catch (_) {}
    }
    return { ok: false };
  }
  async function consultarIpGeo() {
    try { const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 3500); const r = await fetch('https://ipapi.co/json/', { signal: ctrl.signal }); clearTimeout(t); if (!r.ok) return null; const j = await r.json(); return typeof j.latitude === 'number' ? { ip: j.ip||'', cidade: j.city||'', regiao: j.region||'', lat: j.latitude, lon: j.longitude } : null; } catch (_) { return null; }
  }
  async function coletarGpsAntifraude() {
    if (!navigator.geolocation) return toast('Sem geolocalização.');
    const btn = $('btnColetarGpsAntifraude'); btn.disabled = true; btn.textContent = 'Auditando satélites reais (4s)...';
    $('statusGpsBadge').textContent = 'Auditando...'; $('statusGpsBadge').className = 'badge badge-warn';
    const amostras = []; let errG = null;
    await new Promise(resolve => {
      let fim = false; const done = () => { if (fim) return; fim = true; try { navigator.geolocation.clearWatch(wid); } catch (_) {} resolve(); };
      const wid = navigator.geolocation.watchPosition(pos => {
        const c = pos.coords;
        amostras.push({ lat: c.latitude, lon: c.longitude, accuracy: c.accuracy, altitude: c.altitude, ts: pos.timestamp || Date.now(), mocked: !!(pos.mocked || c.mocked) });
        if (amostras.length >= 4) done();
      }, e => { errG = e; done(); }, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 });
      setTimeout(done, 4200);
    });
    btn.disabled = false; btn.textContent = 'Revalidar Localização Real (Anti-Fake GPS)';
    if (!amostras.length) {
      $('statusGpsBadge').textContent = 'Falha GPS'; $('statusGpsBadge').className = 'badge badge-erro';
      $('painelResultadoGps').classList.remove('oculto'); $('painelResultadoGps').innerHTML = `<div class="alerta-inline erro">Falha ao obter GPS (${esc(errG ? errG.message : 'GPS desligado')}).</div>`;
      return;
    }
    const ult = amostras[amostras.length - 1]; let score = 100; const alertas = [], checksOk = [`${amostras.length} leitura(s) GPS sem cache (±${Math.round(ult.accuracy)}m)`];
    if (amostras.some(a => a.mocked)) { score -= 80; alertas.push('CRÍTICO: Fake GPS detectado.'); }
    if (amostras.length >= 2) {
      if (amostras.every(a => a.lat === amostras[0].lat && a.lon === amostras[0].lon) && [0,1,3,5,10].includes(ult.accuracy) && ult.altitude === null) { score -= 40; alertas.push('SUSPEITA: Coordenada congelada + precisão artificial.'); }
      else checksOk.push('Telemetria de satélite coerente.');
      for (let i = 1; i < amostras.length; i++) {
        const dist = distanciaMetros(amostras[i-1].lat, amostras[i-1].lon, amostras[i].lat, amostras[i].lon);
        const dtS = Math.max(0.5, (amostras[i].ts - amostras[i-1].ts) / 1000);
        if (dist > 120 && (dist / dtS) * 3.6 > 160) { score -= 55; alertas.push(`CRÍTICO: Salto impossível (${Math.round(dist)}m em ${dtS.toFixed(1)}s).`); break; }
      }
    }
    const ultPt = (ESTADO.pontos || []).find(p => p.agenteId === $('selPontoAgente').value && p.auditoria?.lat);
    if (ultPt) {
      const dtH = Math.abs(Date.now() - new Date(ultPt.timestampIso).getTime()) / 3600000;
      const dKm = distanciaMetros(ultPt.auditoria.lat, ultPt.auditoria.lon, ult.lat, ult.lon) / 1000;
      if (dtH > 0.002 && dtH < 12 && (dKm / dtH) > 160 && dKm > 10) { score -= 50; alertas.push(`TELETRANSPORTE: ${dKm.toFixed(1)} km em ${(dtH*60).toFixed(0)} min.`); }
    }
    if (ult.accuracy > 250) { score -= 15; alertas.push(`Precisão GPS baixa (±${Math.round(ult.accuracy)}m).`); }

    const [hRede, ipG, endR] = await Promise.all([consultarHoraRede(), consultarIpGeo(), consultarEnderecoReal(ult.lat, ult.lon)]);
    let horaOficialIso = new Date().toISOString();
    if (hRede.ok) {
      horaOficialIso = hRede.iso;
      const delta = Math.abs(Math.round((Date.now() - hRede.timestampMs) / 1000));
      if (delta > 180) { score -= 35; alertas.push(`RELÓGIO ADULTERADO (${delta}s). Aplicado horário oficial.`); }
      else checksOk.push('Relógio conferido com hora oficial.');
    }
    if (ipG) {
      const dIp = distanciaMetros(ult.lat, ult.lon, ipG.lat, ipG.lon) / 1000;
      if (dIp > 450) { score -= 25; alertas.push(`REDE/VPN DIVERGENTE: IP em ${ipG.cidade}/${ipG.regiao}.`); }
      else checksOk.push(`Rede coerente (${ipG.cidade}/${ipG.regiao}).`);
    }
    const distB = Math.round(distanciaMetros(ult.lat, ult.lon, Number(ESTADO.config.baseLat||-16.0658), Number(ESTADO.config.baseLon||-47.9756)));
    const raio = Number(ESTADO.config.baseRaioMetros || 500);
    const resDist = distB < 1000 ? `${distB}m da Base` : `${(distB/1000).toFixed(2)} km da Base`;
    if (distB > raio) { score -= 20; alertas.push(`FORA DA CERCA DA BASE (${resDist}, limite ${raio}m).`); }
    else checksOk.push(`DENTRO DO PERÍMETRO DA BASE (${resDist}).`);

    score = Math.max(0, Math.min(100, score));
    const status = score >= 80 ? 'VERIFICADO' : (score >= 50 ? 'ATENCAO' : 'SUSPEITO');
    auditoriaGpsAtual = { lat: ult.lat, lon: ult.lon, accuracy: Math.round(ult.accuracy), amostrasQtd: amostras.length, distanciaBaseM: distB, resumoDistancia: resDist, endereco: endR.texto, enderecoFonte: endR.fonte, horaOficialIso, ipInfo: ipG ? `${ipG.ip} (${ipG.cidade}/${ipG.regiao})` : 'Offline', score, status, alertas, checksOk };
    const cls = status === 'VERIFICADO' ? 'badge-ok' : (status === 'ATENCAO' ? 'badge-warn' : 'badge-erro');
    $('statusGpsBadge').textContent = `${status} · ${score}%`; $('statusGpsBadge').className = 'badge ' + cls;
    $('painelResultadoGps').classList.remove('oculto');
    $('painelResultadoGps').innerHTML = `<div><strong>Endereço (${esc(endR.fonte)}):</strong> ${esc(endR.texto)}</div><div><strong>GPS:</strong> ${ult.lat.toFixed(6)}, ${ult.lon.toFixed(6)} (±${Math.round(ult.accuracy)}m) · <strong>${esc(resDist)}</strong></div>${checksOk.map(c => `<div style="color:var(--ok);">[OK] ${esc(c)}</div>`).join('')}${alertas.map(a => `<div style="color:var(--danger);font-weight:700;">[ALERTA] ${esc(a)}</div>`).join('')}`;
  }

  async function confirmarRegistroPonto() {
    const err = $('msgPontoErro'); err.classList.add('oculto');
    const ag = agentePorId($('selPontoAgente').value);
    if (!ag) { err.textContent = 'Selecione um guarda.'; err.classList.remove('oculto'); return; }
    if (!fotoCapturadaDataUrl) { err.textContent = 'Foto ao vivo obrigatória!'; err.classList.remove('oculto'); return; }
    if (!auditoriaGpsAtual) { err.textContent = 'Valide a localização real antes de confirmar!'; err.classList.remove('oculto'); return; }
    if (auditoriaGpsAtual.status === 'SUSPEITO' && ESTADO.config.acaoSuspeita === 'BLOQUEAR') { err.textContent = 'BLOQUEADO por suspeita grave de Fake GPS.'; err.classList.remove('oculto'); return; }
    const agoraIso = auditoriaGpsAtual.horaOficialIso || new Date().toISOString();
    const dt = new Date(agoraIso), p2 = n => String(n).padStart(2,'0');
    const dataLocal = `${dt.getFullYear()}-${p2(dt.getMonth()+1)}-${p2(dt.getDate())}`, horaLocal = `${p2(dt.getHours())}:${p2(dt.getMinutes())}:${p2(dt.getSeconds())}`;
    const tipo = $('selPontoTipo').value;
    const prevHash = ESTADO.pontos[0]?.hashIntegridade || 'GENESIS_GCM_V3';
    const hashIntegridade = window.EscalaCloud.sha256Hex(`${prevHash}|${ag.matricula}|${tipo}|${agoraIso}|${auditoriaGpsAtual.lat.toFixed(6)}|${auditoriaGpsAtual.lon.toFixed(6)}|${auditoriaGpsAtual.score}`);
    const reg = { id: 'pt_' + Date.now().toString(36), agenteId: ag.id, agenteNome: ag.nome, agenteMatricula: ag.matricula, tipo, equipe: $('selPontoEquipe').value, posto: $('inpPontoPosto').value.trim() || 'Base GCM', obs: $('inpPontoObs').value.trim(), timestampIso: agoraIso, dataLocal, horaLocal, foto: fotoCapturadaDataUrl, auditoria: auditoriaGpsAtual, hashIntegridade };
    ESTADO.pontos.unshift(reg);
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) await window.EscalaCloud.enviarPontoIndividualNuvem(reg);
    fotoCapturadaDataUrl = null; auditoriaGpsAtual = null;
    $('imgPreviewFoto').classList.add('oculto'); $('placeholderCamera').classList.remove('oculto');
    $('statusFoto').textContent = 'Pendente'; $('statusFoto').className = 'badge badge-neutro'; $('btnRefazerFoto').disabled = true;
    $('statusGpsBadge').textContent = 'Não coletado'; $('statusGpsBadge').className = 'badge badge-neutro'; $('painelResultadoGps').classList.add('oculto');
    $('inpPontoObs').value = '';
    renderTabelaPontos(); renderPainel(); toast(`Ponto de ${tipo} assinado com selo SHA-256!`);
  }
  function filtrarPontos() {
    const m = $('fltPontoMes').value||'', ag = $('fltPontoAgente').value||'', st = $('fltPontoStatus').value||'';
    return (ESTADO.pontos||[]).filter(p => (!m || (p.dataLocal||'').startsWith(m)) && (!ag || p.agenteId === ag) && (!st || (p.auditoria?.status||'') === st));
  }
  function renderTabelaPontos() {
    const lista = filtrarPontos(); $('badgeTotalPontosFiltrados').textContent = `${lista.length} registro(s)`;
    if (!lista.length) { $('tbodyPontos').innerHTML = '<tr><td colspan="6" class="subtexto" style="text-align:center;padding:18px;">Nenhum registro de ponto.</td></tr>'; return; }
    $('tbodyPontos').innerHTML = lista.map(p => {
      const st = p.auditoria?.status || '—', cls = st === 'VERIFICADO' ? 'badge-ok' : (st === 'ATENCAO' ? 'badge-warn' : 'badge-erro');
      return `<tr><td><img src="${p.foto}" class="foto-thumb" data-ver-ponto="${esc(p.id)}"></td><td><strong>${formatarDataBR(p.dataLocal)}</strong><div class="subtexto">${esc(p.horaLocal)}</div></td><td><strong>${esc(p.agenteNome)}</strong><div class="subtexto">${esc(p.agenteMatricula)} · ${esc(p.equipe)} · ${esc(p.posto)}</div></td><td><span class="badge ${p.tipo==='ENTRADA'?'badge-invertido':'badge-neutro'}">${esc(p.tipo)}</span></td><td><div style="max-width:210px;font-size:12px;">${esc(p.auditoria?.endereco||'—')}</div><div class="subtexto">${esc(p.auditoria?.resumoDistancia||'')}</div></td><td><span class="badge ${cls}">${esc(st)} (${p.auditoria?.score??0}%)</span></td></tr>`;
    }).join('');
    $('tbodyPontos').querySelectorAll('[data-ver-ponto]').forEach(img => img.addEventListener('click', () => {
      const pt = ESTADO.pontos.find(x => x.id === img.getAttribute('data-ver-ponto')); if (!pt) return; const a = pt.auditoria || {};
      abrirModal(`Auditoria — ${pt.agenteNome} (${pt.tipo})`, `<div style="text-align:center;"><img src="${pt.foto}" style="max-width:100%;border-radius:8px;border:1px solid var(--border);"></div><div class="box-borda" style="font-size:12px;"><div><strong>Data/Hora:</strong> ${formatarDataBR(pt.dataLocal)} ${esc(pt.horaLocal)}</div><div><strong>Endereço:</strong> ${esc(a.endereco||'—')}</div><div><strong>GPS:</strong> ${a.lat?a.lat.toFixed(6)+', '+a.lon.toFixed(6):'—'} (±${a.accuracy||0}m · ${esc(a.resumoDistancia||'')})</div><div><strong>Antifraude:</strong> ${esc(a.status||'—')} (${a.score??0}%)</div><div><strong>SHA-256:</strong> <code style="word-break:break-all;">${esc(pt.hashIntegridade)}</code></div></div>`, [
        ...(isAdmin() ? [{ texto: 'Excluir (Admin)', classe: 'btn-perigo', onClick: async () => { if (!confirm('Excluir ponto?')) return; ESTADO.pontos = ESTADO.pontos.filter(x => x.id !== pt.id); await salvarTudo(); fecharModal(); renderTabelaPontos(); renderPainel(); }}] : []),
        { texto: 'Fechar', classe: 'btn-sec', onClick: fecharModal }
      ]);
    }));
  }

  // =========================================================================
  // 6. RELACAO DE CODIGO Q & QRA (NOVO MODULO)
  // =========================================================================
  function renderCodigoQ() {
    const busca = ($('fltBuscaQ').value || '').trim().toLowerCase();
    const cat = $('fltCatQ').value || '';
    const lista = (ESTADO.codigosQ || []).filter(c => (!cat || c.categoria === cat) && (!busca || c.codigo.toLowerCase().includes(busca) || c.significado.toLowerCase().includes(busca)));
    $('tbodyCodigoQ').innerHTML = lista.map(c => `
      <tr>
        <td><strong style="font-size:15px;">${esc(c.codigo)}</strong></td>
        <td><span class="badge badge-neutro">${esc(CAT_Q_LABEL[c.categoria] || c.categoria)}</span></td>
        <td>${esc(c.significado)}</td>
        <td>${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-q="${esc(c.id)}">X</button>` : '—'}</td>
      </tr>
    `).join('') || '<tr><td colspan="4" class="subtexto" style="text-align:center;">Nenhum código encontrado.</td></tr>';
    $('tbodyCodigoQ').querySelectorAll('[data-del-q]').forEach(b => b.addEventListener('click', async () => {
      ESTADO.codigosQ = ESTADO.codigosQ.filter(x => x.id !== b.getAttribute('data-del-q'));
      await salvarTudo(); renderCodigoQ();
    }));

    const desab = podeEditarEscala() ? '' : 'disabled';
    $('tbodyListaQra').innerHTML = ESTADO.efetivo.map(a => `
      <tr>
        <td><strong>${esc(a.matricula)}</strong></td>
        <td>${esc(a.nome)}</td>
        <td><span class="pill-eq eq-${esc(a.equipe)}">${esc(a.equipe)}</span></td>
        <td><input type="text" class="inp-qra-lote" data-qra-id="${esc(a.id)}" value="${esc(a.qra || '')}" ${desab}></td>
        <td>${esc(AREAS_LABEL[a.area] || a.area)}</td>
      </tr>
    `).join('');
  }

  function gerarPdfCodigoQ(apenasQra) {
    if (apenasQra) {
      const rows = ESTADO.efetivo.map(a => {
        const c = EQUIPE_CORES[a.equipe] || { cor: '#27272A', bg: '#E4E4E7' };
        return `<tr><td><strong>${esc(a.matricula)}</strong></td><td>${esc(a.nome)}</td><td><strong>${esc(a.qra || '—')}</strong></td><td><span class="tag" style="background:${c.bg};color:${c.cor};border-color:${c.cor};">${esc(a.equipe)}</span></td><td>${esc(AREAS_LABEL[a.area] || a.area)}</td></tr>`;
      }).join('');
      const corpo = `${cabecalhoPdfHtml('RELAÇÃO OFICIAL DE QRA (RÁDIO) — EFETIVO GCM', `Total: ${ESTADO.efetivo.length} guardas`)}<table><thead><tr><th>Matrícula</th><th>Nome Completo</th><th>QRA (Rádio)</th><th>Equipe</th><th>Especialidade</th></tr></thead><tbody>${rows}</tbody></table>${rodapeAssinaturasPdfHtml()}`;
      exportarHtmlParaPdf(montarDocumentoPdf('Relação de QRA GCM', corpo, false), 'relacao-qra-gcm-valparaiso.pdf', false);
      return;
    }
    const rows = (ESTADO.codigosQ || []).map(c => `<tr><td><strong style="font-size:12px;">${esc(c.codigo)}</strong></td><td>${esc(CAT_Q_LABEL[c.categoria] || c.categoria)}</td><td>${esc(c.significado)}</td></tr>`).join('');
    const corpo = `${cabecalhoPdfHtml('RELAÇÃO OFICIAL DE CÓDIGO Q — COMUNICAÇÃO OPERACIONAL', 'Guarda Civil Municipal de Valparaíso de Goiás · Rádio / HT / CCO 153')}<table><thead><tr><th style="width:85px;">Código</th><th style="width:160px;">Categoria</th><th>Significado / Aplicação Operacional</th></tr></thead><tbody>${rows}</tbody></table>${rodapeAssinaturasPdfHtml()}`;
    exportarHtmlParaPdf(montarDocumentoPdf('Relação de Código Q GCM', corpo, false), 'relacao-codigo-q-gcm-valparaiso.pdf', false);
  }

  // =========================================================================
  // 7. EFETIVO DA GUARDA (64 ATIVOS — ZERO ROTULO DE CONCURSO)
  // =========================================================================
  function renderEfetivo() {
    const busca = ($('fltEfBusca').value || '').trim().toLowerCase();
    const eq = $('fltEfEquipe').value || '', area = $('fltEfArea').value || '';
    const lista = ESTADO.efetivo.filter(a => (!eq || a.equipe === eq) && (!area || a.area === area) && (!busca || a.nome.toLowerCase().includes(busca) || (a.qra||'').toLowerCase().includes(busca) || a.matricula.toLowerCase().includes(busca)));
    $('tbodyEfetivo').innerHTML = lista.map(a => `
      <tr>
        <td><strong>${esc(a.matricula)}</strong></td>
        <td><strong>${esc(a.nome)}</strong></td>
        <td>${esc(a.qra || '—')}</td>
        <td><span class="pill-eq eq-${esc(a.equipe)}">${esc(a.equipe)}</span></td>
        <td>${esc(AREAS_LABEL[a.area] || a.area)}</td>
        <td>${esc(FUNCOES_LABEL[a.funcao] || a.funcao)}</td>
        <td><span class="badge ${a.situacao === 'ATIVO' ? 'badge-ok' : 'badge-warn'}">${esc(a.situacao)}</span></td>
        <td>${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-ed-ag="${esc(a.id)}">Editar</button> <button type="button" class="btn btn-sec btn-sm" data-del-ag="${esc(a.id)}">X</button>` : '—'}</td>
      </tr>
    `).join('');
    $('tbodyEfetivo').querySelectorAll('[data-ed-ag]').forEach(b => b.addEventListener('click', () => abrirModalAgente(agentePorId(b.getAttribute('data-ed-ag')))));
    $('tbodyEfetivo').querySelectorAll('[data-del-ag]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('Remover guarda do efetivo?')) return;
      ESTADO.efetivo = ESTADO.efetivo.filter(x => x.id !== b.getAttribute('data-del-ag'));
      await salvarTudo(); atualizarTodasVistas();
    }));
  }

  function abrirModalAgente(agente) {
    const a = agente || { id: '', matricula: '', nome: '', qra: '', sexo: 'M', telefone: '', equipe: 'ALFA', area: 'PATRULHAMENTO', funcao: 'PATRULHEIRO_03', regime: '24X72', situacao: 'ATIVO' };
    abrirModal(agente ? 'Editar Guarda GCM' : 'Cadastrar Novo Guarda',
      `<div class="grid-2"><div class="campo"><label>Nome Completo</label><input type="text" id="mAgNome" value="${esc(a.nome)}"></div><div class="campo"><label>QRA (Nome de Rádio)</label><input type="text" id="mAgQra" value="${esc(a.qra || '')}"></div></div>
       <div class="grid-2"><div class="campo"><label>Matrícula</label><input type="text" id="mAgMat" value="${esc(a.matricula)}"></div><div class="campo"><label>Telefone / WhatsApp</label><input type="text" id="mAgTel" value="${esc(a.telefone || '')}"></div></div>
       <div class="grid-2"><div class="campo"><label>Equipe</label><select id="mAgEquipe">${['ALFA','BRAVO','CHARLIE','DELTA','ADM','12X36'].map(e => `<option value="${e}" ${a.equipe === e ? 'selected' : ''}>${e}</option>`).join('')}</select></div>
       <div class="campo"><label>Especialidade</label><select id="mAgArea">${Object.entries(AREAS_LABEL).map(([k,v]) => `<option value="${k}" ${a.area === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div></div>
       <div class="grid-2"><div class="campo"><label>Função Padrão</label><select id="mAgFuncao">${Object.entries(FUNCOES_LABEL).map(([k,v]) => `<option value="${k}" ${a.funcao === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
       <div class="campo"><label>Situação</label><select id="mAgSit">${['ATIVO','FERIAS','LICENCA','AFASTADO'].map(s => `<option value="${s}" ${a.situacao === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div></div>`,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Salvar', classe: 'btn-primario', onClick: async () => {
          const nome = $('mAgNome').value.trim(); if (!nome) return toast('Informe o nome.');
          const eqSel = $('mAgEquipe').value;
          const obj = { id: a.id || 'ag_' + Date.now().toString(36), matricula: $('mAgMat').value.trim().toUpperCase() || ('GCM-' + String(ESTADO.efetivo.length + 1).padStart(3,'0')), nome, qra: $('mAgQra').value.trim() || gerarQra(nome), sexo: a.sexo || 'M', telefone: $('mAgTel').value.trim(), equipe: eqSel, area: $('mAgArea').value, funcao: $('mAgFuncao').value, regime: eqSel === 'ADM' ? 'ADM_SEG_SEX' : (eqSel === '12X36' ? '12X36' : '24X72'), situacao: $('mAgSit').value };
          if (agente) { const i = ESTADO.efetivo.findIndex(x => x.id === a.id); if (i >= 0) ESTADO.efetivo[i] = obj; } else ESTADO.efetivo.push(obj);
          await salvarTudo(); fecharModal(); atualizarTodasVistas();
        }}
      ]
    );
  }

  function abrirModalImportar64() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    abrirModal('Importar / Colar Nomes', `<p class="subtexto">Cole 1 nome por linha (ou <code>Nome ; Matrícula ; Equipe</code>).</p><textarea id="txtImportarNomes" rows="9"></textarea><label class="check-linha"><input type="checkbox" id="chkSubstituirModelo"><span>Substituir lista atual</span></label>`, [
      { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
      { texto: 'Importar', classe: 'btn-primario', onClick: async () => {
        const ls = ($('txtImportarNomes').value||'').split(/\r?\n/).map(x => x.trim()).filter(Boolean); if (!ls.length) return toast('Cole ao menos um nome.');
        const novos = ls.map((l, i) => { const p = l.split(/[;|\t]/).map(x => x.trim()); return { id: 'ag_i_' + Date.now().toString(36) + '_' + i, matricula: (p[1] || ('GCM-' + String(ESTADO.efetivo.length + i + 1).padStart(3,'0'))).toUpperCase(), nome: p[0], qra: gerarQra(p[0]), sexo: 'M', telefone: '', equipe: p[2] || EQUIPES[i % 4], area: 'PATRULHAMENTO', funcao: 'PATRULHEIRO_03', regime: '24X72', situacao: 'ATIVO' }; });
        ESTADO.efetivo = $('chkSubstituirModelo').checked ? novos : ESTADO.efetivo.concat(novos);
        await salvarTudo(); fecharModal(); atualizarTodasVistas(); toast(`${novos.length} guarda(s) importado(s)!`);
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
    $('selBloquearSuspeito').value = ESTADO.config.acaoSuspeita || 'ALERTAR'; $('chkNuvemAtiva').checked = !!ESTADO.config.nuvemAtiva;
    const fb = window.EscalaCloud.lerConfigFirebase();
    $('txtFirebaseConfigJson').value = fb ? JSON.stringify(fb, null, 2) : '';
    $('statusDbProprio').textContent = fb ? `Conectado ao projeto "${fb.projectId}" · Sincronização: ${ESTADO.config.nuvemAtiva ? 'ATIVA' : 'Pausada'}` : 'Status: Modo Local (100% funcional sem Firebase).';
  }

  // =========================================================================
  // PDFS COLORIDOS POR EQUIPE E SETOR (EXPLICANDO CADA PESSOA — ZERO AZUL)
  // =========================================================================
  function cabecalhoPdfHtml(titulo, subtitulo) {
    return `<div class="pdf-cab"><img src="__LOGO__" class="pdf-logo" onerror="this.style.display='none'"><div><div class="pdf-org">PREFEITURA MUNICIPAL DE VALPARAÍSO DE GOIÁS — GUARDA CIVIL MUNICIPAL</div><h1>${esc(titulo)}</h1><div class="pdf-sub">${esc(subtitulo)}</div></div></div>`;
  }
  function rodapeAssinaturasPdfHtml() {
    const r = ESTADO.config.responsaveis || {};
    return `<div class="pdf-assinaturas"><div class="ass-col"><div class="ass-linha"></div><strong>${esc(r.escalanteNome || 'Responsável pela Escala')}</strong><div>${esc(r.escalanteCargo || 'Escalante GCM')} · Mat.: ${esc(r.escalanteMat || '—')}</div></div><div class="ass-col"><div class="ass-linha"></div><strong>${esc(r.comandoNome || 'Comandante da GCM')}</strong><div>${esc(r.comandoCargo || 'Comandante GCM')} · ${esc(r.comandoMat || '—')}</div></div></div><div class="pdf-emitido">Sistema de Escala 24x72, Código Q, Cartão Programa e Ponto — GCM Valparaíso de Goiás · ${formatarDataHoraBR(new Date().toISOString())}</div>`;
  }
  function montarDocumentoPdf(titulo, corpoHtml, paisagem) {
    return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>${esc(titulo)}</title><style>
      @page { size: A4 ${paisagem ? 'landscape' : 'portrait'}; margin: 11mm; }
      body { font-family: Arial, Helvetica, sans-serif; color: #111111; background: #FFFFFF; font-size: 10.5px; line-height: 1.35; margin: 0; }
      .pdf-cab { display: flex; align-items: center; gap: 12px; border-bottom: 2px solid #111111; padding-bottom: 8px; margin-bottom: 10px; }
      .pdf-logo { width: 50px; height: 50px; object-fit: contain; }
      .pdf-org { font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; color: #333333; }
      h1 { font-size: 15px; margin: 2px 0; } h2 { font-size: 12px; margin: 10px 0 5px; padding: 4px 8px; background: #111111; color: #FFFFFF; }
      h3 { font-size: 11.5px; margin: 8px 0 4px; padding: 3px 8px; border-left: 5px solid #111111; background: #F4F4F4; }
      .pdf-sub { font-size: 10.5px; color: #444444; }
      table { width: 100%; border-collapse: collapse; margin-top: 5px; font-size: 10px; }
      th, td { border: 1px solid #333333; padding: 4px 6px; text-align: left; vertical-align: top; }
      th { background: #EBEBEB; font-weight: 700; text-transform: uppercase; font-size: 9px; }
      .box { border: 1px solid #333333; padding: 8px; margin-bottom: 8px; }
      .grid-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 6px; }
      .tag { display: inline-block; padding: 2px 6px; font-weight: 700; font-size: 9px; border: 1px solid #111111; border-radius: 3px; }
      .tag-dark { background: #111111; color: #FFFFFF; }
      .tag-ok { background: #DCFCE7; color: #15803D; border-color: #15803D; }
      .tag-warn { background: #FEF3C7; color: #B45309; border-color: #B45309; }
      .tag-err { background: #FEE2E2; color: #B91C1C; border-color: #B91C1C; }
      .quebra { page-break-before: always; }
      .foto-pdf { width: 52px; height: 40px; object-fit: cover; border: 1px solid #333333; }
      .pdf-assinaturas { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; margin-top: 24px; page-break-inside: avoid; }
      .ass-col { text-align: center; font-size: 10px; } .ass-linha { border-top: 1px solid #111111; margin-bottom: 4px; }
      .pdf-emitido { margin-top: 12px; font-size: 8.5px; color: #555555; text-align: right; border-top: 1px solid #CCCCCC; padding-top: 4px; }
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

  function gerarPdfEscalaMensal(somenteQuadroPessoas) {
    const mesVal = $('selMesEscala').value || mesAtualISO();
    const [ano, mes] = mesVal.split('-').map(Number);
    const ult = new Date(ano, mes, 0).getDate();

    const tagEq = (eq) => {
      const c = EQUIPE_CORES[eq] || { cor: '#27272A', bg: '#E4E4E7' };
      return `<span class="tag" style="background:${c.bg};color:${c.cor};border-color:${c.cor};">${esc(eq)}</span>`;
    };
    const tagSetor = (nome, cor) => `<span class="tag" style="background:${esc(cor||'#27272A')};color:#FFFFFF;border-color:${esc(cor||'#27272A')};">${esc(nome)}</span>`;

    // Quadro Nominal Explicativo (explicando cada guarda, equipe colorida, setor colorido, funcao e dias de servico no mes)
    const ordemEq = { ALFA: 1, BRAVO: 2, CHARLIE: 3, DELTA: 4, ADM: 5, '12X36': 6 };
    const fltEq = somenteQuadroPessoas ? ($('fltQpEquipe').value || '') : '';
    const listaPessoas = ESTADO.efetivo
      .filter(a => a.situacao === 'ATIVO' && (!fltEq || a.equipe === fltEq))
      .sort((a,b) => (ordemEq[a.equipe]||9) - (ordemEq[b.equipe]||9) || a.matricula.localeCompare(b.matricula));

    const rowsPessoas = listaPessoas.map(a => {
      const inf = descobrirSetorDoAgente(a);
      const dias = diasServicoNoMes(a.equipe, mesVal);
      return `<tr><td><strong>${esc(a.matricula)}</strong></td><td><strong>${esc(a.nome)}</strong></td><td>${esc(a.qra||'—')}</td><td>${tagEq(a.equipe)}</td><td>${tagSetor(inf.nome, inf.cor)}</td><td>${esc(inf.funcao)}</td><td><strong>${esc(dias)}</strong></td></tr>`;
    }).join('');

    if (somenteQuadroPessoas) {
      const corpo = `${cabecalhoPdfHtml(`QUADRO NOMINAL EXPLICATIVO DA ESCALA — ${MESES_EXT[mes-1].toUpperCase()} / ${ano}`, `Separação por Cor de Equipe e Setor · Horário: ${ESTADO.config.horarioTroca}`)}<table><thead><tr><th>Matrícula</th><th>Guarda GCM</th><th>QRA</th><th>Equipe</th><th>Setor / Viatura</th><th>Função</th><th>Dias de Serviço no Mês</th></tr></thead><tbody>${rowsPessoas}</tbody></table>${rodapeAssinaturasPdfHtml()}`;
      exportarHtmlParaPdf(montarDocumentoPdf(`Quadro Explicativo ${mesVal}`, corpo, true), `quadro-explicativo-escala-${mesVal}.pdf`, true);
      return;
    }

    let linhasCal = '';
    for (let d = 1; d <= ult; d++) {
      const iso = `${ano}-${String(mes).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dt = new Date(ano, mes - 1, d);
      const c = calcularCiclo24x72(iso);
      const cel = (eq) => c.mapa[eq].codigo === 'SERVICO' ? tagEq('SERVIÇO 24h · ' + eq) : c.mapa[eq].rotulo;
      linhasCal += `<tr><td><strong>${String(d).padStart(2,'0')}/${String(mes).padStart(2,'0')}</strong></td><td>${DIAS_SEMANA[dt.getDay()]}</td><td>${tagEq('EQUIPE ' + c.equipeServico)}</td><td>${cel('ALFA')}</td><td>${cel('BRAVO')}</td><td>${cel('CHARLIE')}</td><td>${cel('DELTA')}</td></tr>`;
    }

    const blocosEquipes = EQUIPES.map(eq => {
      const c = EQUIPE_CORES[eq], m = ESTADO.equipesMontagem[eq] || {};
      const rows = ESTADO.postos.map(p => {
        const g = m[p.id] || {};
        return `<tr><td>${tagSetor(p.prefixo + ' · ' + p.setor, p.cor)}<br><small>Resp.: ${esc(p.responsavel||'—')}</small></td><td>${esc(nomeAgentePorId(g.g01)||'—')}</td><td>${esc(nomeAgentePorId(g.g02)||'—')}</td><td>${esc(nomeAgentePorId(g.g03)||'—')}</td></tr>`;
      }).join('');
      return `<h3 style="border-left-color:${c.cor};background:${c.bg};color:${c.cor};">EQUIPE ${eq} (${c.nome.toUpperCase()}) — Dias de Serviço: ${diasServicoNoMes(eq, mesVal)}</h3><table><thead><tr><th>Setor / Viatura</th><th>01 — Comandante</th><th>02 — Motorista</th><th>03 — Patrulheiro</th></tr></thead><tbody>${rows}</tbody></table>`;
    }).join('');

    const rowsAdm = (ESTADO.administrativo || []).map(c => `<tr><td><strong>${esc(c.cargo)}</strong></td><td>${esc(c.titular)}</td><td>${esc(c.horario)}</td><td>${esc(c.obs||'')}</td></tr>`).join('');
    const rows12 = (ESTADO.escala12x36 || []).map(e => `<tr><td><strong>${esc(e.posto)}</strong></td><td>${esc(e.turno)}</td><td>${esc(e.equipeA)}</td><td>${esc(e.equipeB)}</td></tr>`).join('');

    const corpo = `
      ${cabecalhoPdfHtml(`ESCALA MENSAL 24x72 — ${MESES_EXT[mes-1].toUpperCase()} / ${ano}`, `Cores: ALFA (Verde) · BRAVO (Laranja) · CHARLIE (Roxo) · DELTA (Vermelho) · Turno: ${ESTADO.config.horarioTroca}`)}
      <h2>1. CALENDÁRIO OPERACIONAL 24x72 (72 HORAS DE DESCANSO)</h2>
      <table><thead><tr><th>Data</th><th>Dia</th><th>Serviço 24h</th><th>ALFA</th><th>BRAVO</th><th>CHARLIE</th><th>DELTA</th></tr></thead><tbody>${linhasCal}</tbody></table>
      <div class="quebra"></div>
      ${cabecalhoPdfHtml(`COMPOSIÇÃO DAS EQUIPES POR SETOR — ${MESES_EXT[mes-1].toUpperCase()} / ${ano}`, 'Cada Equipe e Setor separado por cor')}
      <h2>2. GUARNIÇÕES POR EQUIPE E SETOR</h2>${blocosEquipes}
      <div class="quebra"></div>
      ${cabecalhoPdfHtml(`QUADRO NOMINAL EXPLICATIVO POR GUARDA — ${MESES_EXT[mes-1].toUpperCase()} / ${ano}`, 'Localização exata de cada integrante, equipe, setor, função e dias de serviço no mês')}
      <h2>3. RELAÇÃO NOMINAL EXPLICATIVA (EFETIVO ATIVO)</h2>
      <table><thead><tr><th>Matrícula</th><th>Guarda GCM</th><th>QRA</th><th>Equipe</th><th>Setor / Viatura</th><th>Função</th><th>Dias de Serviço no Mês</th></tr></thead><tbody>${rowsPessoas}</tbody></table>
      <h2>4. EXPEDIENTE ADMINISTRATIVO (SEGUNDA A SEXTA) &amp; 12x36</h2>
      <table><thead><tr><th>Cargo / Autoridade</th><th>Titular</th><th>Horário</th><th>Observação</th></tr></thead><tbody>${rowsAdm}</tbody></table>
      <table><thead><tr><th>Posto 12x36</th><th>Turno</th><th>Turma A</th><th>Turma B</th></tr></thead><tbody>${rows12}</tbody></table>
      ${rodapeAssinaturasPdfHtml()}
    `;
    exportarHtmlParaPdf(montarDocumentoPdf(`Escala 24x72 GCM ${mesVal}`, corpo, true), `escala-24x72-colorida-gcm-${mesVal}.pdf`, true);
  }

  function blocoHtmlCartaoPrograma(data, eq, posto) {
    const cp = obterDadosCartao(data, eq, posto.id);
    const cEq = EQUIPE_CORES[eq] || { cor: '#27272A', bg: '#E4E4E7' };
    const linhasPb = (cp.pontosBase||[]).map(pb => `<tr><td><strong>${esc(pb.hora)}</strong></td><td>${esc(pb.local)}</td><td>${esc(pb.atividade)}</td></tr>`).join('');
    return `
      <div class="box" style="border-left:6px solid ${esc(posto.cor || '#27272A')};">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #333;padding-bottom:5px;margin-bottom:6px;">
          <strong style="font-size:13px;">${esc(cp.prefixo || posto.id)} — ${esc(cp.setor)}</strong>
          <div>
            <span class="tag" style="background:${cEq.bg};color:${cEq.cor};border-color:${cEq.cor};">EQUIPE ${esc(eq)}</span>
            <span class="tag" style="background:${esc(posto.cor||'#27272A')};color:#FFFFFF;border-color:${esc(posto.cor||'#27272A')};">${esc(posto.setor)}</span>
          </div>
        </div>
        <div class="grid-info">
          <div><strong>Data / Turno:</strong><br>${formatarDataBR(data)} (${esc(ESTADO.config.horarioTroca)})</div>
          <div><strong>Responsável pelo Setor:</strong><br>${esc(cp.responsavel || 'A definir')}</div>
          <div><strong>Cobertura / Bairros:</strong><br>${esc(cp.bairros)}</div>
        </div>
        <table><thead><tr><th>01 — Comandante</th><th>02 — Motorista</th><th>03 — Patrulheiro</th></tr></thead><tbody><tr><td>${esc(cp.g01||'—')}</td><td>${esc(cp.g02||'—')}</td><td>${esc(cp.g03||'Guarnição de 2 integrantes')}</td></tr></tbody></table>
        <div style="margin-top:5px;"><strong>Missão:</strong> ${esc(cp.missao)}</div>
        <table><thead><tr><th style="width:105px;">Horário</th><th style="width:190px;">Ponto Base (PB)</th><th>Atividade</th></tr></thead><tbody>${linhasPb || '<tr><td colspan="3">—</td></tr>'}</tbody></table>
        <div style="margin-top:5px;"><strong>Recomendações:</strong> ${esc(cp.obs||'—')}</div>
      </div>
    `;
  }
  function gerarPdfCartaoPrograma(apenasAtual) {
    const d = $('inpCartaoData').value || hojeISO(), eq = $('selCartaoEquipe').value || 'ALFA', pid = $('selCartaoPosto').value;
    const lista = apenasAtual ? ESTADO.postos.filter(p => p.id === pid) : ESTADO.postos;
    const blocos = lista.map((p, i) => (i > 0 && i % 2 === 0 ? '<div class="quebra"></div>' : '') + blocoHtmlCartaoPrograma(d, eq, p)).join('');
    const tit = apenasAtual ? `CARTÃO PROGRAMA — ${lista[0]?.prefixo||''}` : `CARTÃO PROGRAMA DO TURNO — EQUIPE ${eq}`;
    exportarHtmlParaPdf(montarDocumentoPdf(tit, `${cabecalhoPdfHtml(tit, `Data: ${formatarDataBR(d)} · Turno: ${ESTADO.config.horarioTroca} · Equipe ${eq}`)}${blocos}${rodapeAssinaturasPdfHtml()}`, false), apenasAtual ? `cartao-${pid}-${d}.pdf` : `cartao-completo-${eq}-${d}.pdf`, false);
  }
  function gerarPdfFolhaPonto() {
    const lista = filtrarPontos(), m = $('fltPontoMes').value || mesAtualISO(), ag = agentePorId($('fltPontoAgente').value);
    const sub = ag ? `Guarda: ${ag.nome} (${ag.matricula}) · Mês: ${m}` : `Relatório Geral de Pontos · Mês: ${m} · Total: ${lista.length}`;
    const rows = lista.map(p => { const a = p.auditoria||{}, cls = a.status==='VERIFICADO'?'tag-ok':(a.status==='ATENCAO'?'tag-warn':'tag-err'); return `<tr><td><img src="${p.foto}" class="foto-pdf"></td><td><strong>${formatarDataBR(p.dataLocal)}</strong><br>${esc(p.horaLocal)}</td><td><strong>${esc(p.agenteNome)}</strong><br>${esc(p.agenteMatricula)} · ${esc(p.equipe)} · ${esc(p.posto)}</td><td><span class="tag ${p.tipo==='ENTRADA'?'tag-dark':''}">${esc(p.tipo)}</span></td><td>${esc(a.endereco||'—')}<br><small>${esc(a.resumoDistancia||'')}</small></td><td><span class="tag ${cls}">${esc(a.status||'—')} (${a.score??0}%)</span><br><small>SHA: ${esc((p.hashIntegridade||'').slice(0,12))}</small></td></tr>`; }).join('') || '<tr><td colspan="6" style="text-align:center;">Sem registros.</td></tr>';
    exportarHtmlParaPdf(montarDocumentoPdf(`Folha de Ponto ${m}`, `${cabecalhoPdfHtml('FOLHA DE PONTO OFICIAL — FOTO AO VIVO + GPS ANTIFRAUDE', sub)}<table><thead><tr><th>Foto</th><th>Data / Hora</th><th>Guarda</th><th>Tipo</th><th>Local</th><th>Auditoria / SHA</th></tr></thead><tbody>${rows}</tbody></table>${rodapeAssinaturasPdfHtml()}`, false), `folha-ponto-gcm-${m}.pdf`, false);
  }

  // =========================================================================
  // NAVEGACAO & EVENTOS
  // =========================================================================
  function abrirAba(idSecao) {
    document.querySelectorAll('.secao-aba').forEach(s => s.classList.toggle('ativa', s.id === idSecao));
    document.querySelectorAll('.side-btn').forEach(b => b.classList.toggle('ativo', b.getAttribute('data-aba') === idSecao));
    if ($('lblTituloPaginaAtual')) $('lblTituloPaginaAtual').textContent = TITULOS_ABAS[idSecao] || 'GCM Valparaíso';
    fecharSidebarMobile();
    if (idSecao !== 'secPonto') pararCamera();
    if (idSecao === 'secPainel') renderPainel();
    if (idSecao === 'secEscalas') { renderCalendario24(); renderQuadroPessoas(); renderMontagemEquipe(); renderSetoresResponsaveis(); renderAdmE12x36(); renderResponsaveis(); }
    if (idSecao === 'secCartao') { popularSelectsCartao(); carregarEditorCartao(); }
    if (idSecao === 'secEventos') renderListaEventos();
    if (idSecao === 'secPonto') { popularSelectsPonto(); renderTabelaPontos(); }
    if (idSecao === 'secCodigoQ') renderCodigoQ();
    if (idSecao === 'secEfetivo') renderEfetivo();
    if (idSecao === 'secSistema') { renderContas(); renderConfigBase(); }
  }

  function atualizarTodasVistas() {
    renderPainel(); renderCalendario24(); renderQuadroPessoas(); renderMontagemEquipe();
    renderSetoresResponsaveis(); renderAdmE12x36(); renderResponsaveis(); renderListaEventos();
    popularSelectsCartao(); carregarEditorCartao(); popularSelectsPonto(); renderTabelaPontos();
    renderCodigoQ(); renderEfetivo(); renderContas(); renderConfigBase();
  }

  function iniciarAppLogado(sessao) {
    SESSAO = sessao;
    $('telaAuth').classList.add('oculto'); $('appShell').classList.remove('oculto');
    $('lblUsuarioTopo').textContent = sessao.nome; $('lblPerfilTopo').textContent = sessao.perfil;
    $('selMesEscala').value = mesAtualISO(); $('inpCartaoData').value = hojeISO(); $('fltPontoMes').value = mesAtualISO();
    sincronizarDataCartao(); atualizarTodasVistas();
    if (timerRelogio) clearInterval(timerRelogio);
    timerRelogio = setInterval(() => { if ($('lblRelogioPonto')) $('lblRelogioPonto').textContent = new Date().toLocaleTimeString('pt-BR'); }, 1000);
    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      window.EscalaCloud.assinarNuvem(true, (rem) => { if (!rem?.efetivo) return; ESTADO = rem; window.EscalaCloud.salvarEstadoLocal(ESTADO); atualizarBadgeSync('Nuvem Própria OK', 'badge-ok'); atualizarTodasVistas(); });
    }
  }

  function registrarEventos() {
    $('btnTema').addEventListener('click', alternarTema);
    $('btnTemaAuth').addEventListener('click', alternarTema);
    $('btnToggleMenu').addEventListener('click', alternarSidebar);
    $('btnFecharSidebar').addEventListener('click', fecharSidebarMobile);
    $('sidebarBackdrop').addEventListener('click', fecharSidebarMobile);

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
      b.classList.add(r.ok ? 'ok' : 'erro'); b.textContent = r.ok ? 'Solicitação enviada! Aguarde aprovação do Admin.' : r.erro;
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

    // Atalhos Painel
    $('btnAtalhoPdfEscala').addEventListener('click', () => gerarPdfEscalaMensal(false));
    $('btnAtalhoCartaoHoje').addEventListener('click', () => { $('inpCartaoData').value = hojeISO(); sincronizarDataCartao(); gerarPdfCartaoPrograma(false); });
    $('btnAtalhoPonto').addEventListener('click', () => abrirAba('secPonto'));
    $('btnAtalhoCodigoQ').addEventListener('click', () => abrirAba('secCodigoQ'));
    $('btnIrEventosPainel').addEventListener('click', () => abrirAba('secEventos'));

    // Escalas
    $('selMesEscala').addEventListener('change', () => { renderCalendario24(); renderQuadroPessoas(); });
    $('btnSalvarCiclo24').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.config.dataBaseAlfa = $('inpDataBaseAlfa').value || hojeISO(); ESTADO.config.horarioTroca = $('inpHorarioTroca').value.trim() || '07:00 às 07:00'; await salvarTudo(); renderCalendario24(); renderQuadroPessoas(); renderPainel(); });
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

    $('btnAddCargoAdm').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.administrativo.push({ id: 'adm_' + Date.now(), cargo: 'Novo Cargo', titular: 'A definir (Editar)', horario: 'Seg–Sex · 08h às 17h', obs: '' }); renderAdmE12x36(); });
    $('btnSalvarAdm').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const l = []; $('listaCargosAdm').querySelectorAll('.linha-editavel').forEach((el, i) => l.push({ id: 'adm_' + i, cargo: el.querySelector('.adm-cargo').value.trim(), titular: el.querySelector('.adm-titular').value.trim(), horario: el.querySelector('.adm-horario').value.trim(), obs: el.querySelector('.adm-obs').value.trim() })); ESTADO.administrativo = l; await salvarTudo(); });
    $('btnAddPosto12x36').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.escala12x36.push({ id: 'e12_' + Date.now(), posto: 'Novo Posto 12x36', turno: 'Diurno (07h às 19h)', equipeA: 'A definir', equipeB: 'A definir' }); renderAdmE12x36(); });
    $('btnSalvar12x36').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const l = []; $('listaPostos12x36').querySelectorAll('.linha-editavel').forEach((el, i) => l.push({ id: 'e12_' + i, posto: el.querySelector('.e12-posto').value.trim(), turno: el.querySelector('.e12-turno').value.trim(), equipeA: el.querySelector('.e12-a').value.trim(), equipeB: el.querySelector('.e12-b').value.trim() })); ESTADO.escala12x36 = l; await salvarTudo(); });
    $('btnSalvarResponsaveis').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.config.responsaveis = { escalanteNome: $('inpRespEscalanteNome').value.trim(), escalanteCargo: $('inpRespEscalanteCargo').value.trim(), escalanteMat: $('inpRespEscalanteMat').value.trim(), comandoNome: $('inpRespComandoNome').value.trim(), comandoCargo: $('inpRespComandoCargo').value.trim(), comandoMat: $('inpRespComandoMat').value.trim() }; await salvarTudo(); });

    // Cartao Programa
    $('inpCartaoData').addEventListener('change', sincronizarDataCartao);
    $('selCartaoEquipe').addEventListener('change', carregarEditorCartao);
    $('selCartaoPosto').addEventListener('change', carregarEditorCartao);
    $('btnAddLinhaPb').addEventListener('click', () => { const a = lerCartaoDoEditor().pontosBase; a.push({ hora: '', local: '', atividade: '' }); renderLinhasPb(a); });
    $('btnPuxarGuarnicaoEscala').addEventListener('click', () => { const m = (ESTADO.equipesMontagem[$('selCartaoEquipe').value]||{})[$('selCartaoPosto').value]||{}, p = ESTADO.postos.find(x => x.id === $('selCartaoPosto').value); $('inpCpG01').value = nomeAgentePorId(m.g01)||''; $('inpCpG02').value = nomeAgentePorId(m.g02)||''; $('inpCpG03').value = nomeAgentePorId(m.g03)||''; if (p) $('inpCpRespSetor').value = p.responsavel||''; toast('Sincronizado.'); });
    $('btnSalvarCartaoDia').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); ESTADO.cartoesDia[chaveCartao($('inpCartaoData').value, $('selCartaoEquipe').value, $('selCartaoPosto').value)] = lerCartaoDoEditor(); await salvarTudo(); });
    $('btnSalvarModeloSetor').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const pid = $('selCartaoPosto').value, d = lerCartaoDoEditor(); ESTADO.cartoesModelo[pid] = { setor: d.setor, bairros: d.bairros, prefixo: d.prefixo, responsavel: d.responsavel, missao: d.missao, pontosBase: d.pontosBase, obs: d.obs }; const p = ESTADO.postos.find(x => x.id === pid); if (p) Object.assign(p, { setor: d.setor, bairros: d.bairros, prefixo: d.prefixo, responsavel: d.responsavel }); await salvarTudo(); toast('Modelo padrão atualizado!'); });
    $('btnPdfCartaoIndividual').addEventListener('click', () => gerarPdfCartaoPrograma(true));
    $('btnPdfCartaoCompleto').addEventListener('click', () => gerarPdfCartaoPrograma(false));
    $('btnCopiarWhatsApp').addEventListener('click', copiarResumoWhatsApp);

    // Eventos
    $('btnNovoEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const novo = { id: 'ev_' + Date.now().toString(36), nome: 'Novo Evento Extra', local: 'Valparaíso de Goiás', data: hojeISO(), inicio: '16:00', fim: '23:00', regime: 'HORA_EXTRA', coordenador: '', missao: '', obs: '', viaturas: [{ id: 'evv_1', prefixo: 'VTR-EVENTO 01', setor: 'Principal', g01:'', g02:'', g03:'', g04:'' }, { id: 'evv_2', prefixo: 'VTR-EVENTO 02', setor: 'Apoio', g01:'', g02:'', g03:'', g04:'' }] }; ESTADO.eventos.unshift(novo); eventoSelecionadoId = novo.id; await salvarTudo(true); renderListaEventos(); renderPainel(); });
    $('inpEvData').addEventListener('change', () => { const cur = lerEventoDoEditor(); atualizarDicaFolgaEvento(cur.data); renderViaturasEvento(cur.viaturas, cur.data); });
    $('btnAddVtrEvento').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const cur = lerEventoDoEditor(); cur.viaturas.push({ id: 'evv_'+Date.now(), prefixo: `VTR-EVENTO 0${cur.viaturas.length+1}`, setor:'', g01:'', g02:'', g03:'', g04:'' }); renderViaturasEvento(cur.viaturas, cur.data); });
    $('btnSalvarEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); const cur = lerEventoDoEditor(), i = ESTADO.eventos.findIndex(e => e.id === cur.id); if (i >= 0) ESTADO.eventos[i] = cur; await salvarTudo(); renderListaEventos(); renderPainel(); });
    $('btnExcluirEvento').addEventListener('click', async () => { if (!podeEditarEscala()) return toast('Sem permissão.'); if (!confirm('Excluir evento?')) return; ESTADO.eventos = ESTADO.eventos.filter(e => e.id !== eventoSelecionadoId); eventoSelecionadoId = null; await salvarTudo(); renderListaEventos(); renderPainel(); });
    $('btnWhatsAppEvento').addEventListener('click', copiarWhatsAppEvento);
    $('btnPdfEvento').addEventListener('click', gerarPdfEvento);

    // Ponto
    $('btnAbrirCamera').addEventListener('click', abrirCameraAoVivo);
    $('btnCapturarFoto').addEventListener('click', capturarFotoComCarimbo);
    $('btnRefazerFoto').addEventListener('click', () => { fotoCapturadaDataUrl = null; abrirCameraAoVivo(); });
    $('btnColetarGpsAntifraude').addEventListener('click', coletarGpsAntifraude);
    $('btnConfirmarPonto').addEventListener('click', confirmarRegistroPonto);
    $('fltPontoMes').addEventListener('change', renderTabelaPontos);
    $('fltPontoAgente').addEventListener('change', renderTabelaPontos);
    $('fltPontoStatus').addEventListener('change', renderTabelaPontos);
    $('btnPdfFolhaPonto').addEventListener('click', gerarPdfFolhaPonto);

    // Codigo Q & QRA
    $('fltBuscaQ').addEventListener('input', renderCodigoQ);
    $('fltCatQ').addEventListener('change', renderCodigoQ);
    $('btnAddCodigoQ').addEventListener('click', () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      abrirModal('Adicionar Código Q Personalizado',
        `<div class="grid-2"><div class="campo"><label>Código</label><input type="text" id="mQCod" placeholder="Ex.: QSO-10"></div><div class="campo"><label>Categoria</label><select id="mQCat">${Object.entries(CAT_Q_LABEL).map(([k,v]) => `<option value="${k}">${v}</option>`).join('')}</select></div></div><div class="campo"><label>Significado / Uso na GCM</label><input type="text" id="mQSig" placeholder="Descreva o significado..."></div>`,
        [
          { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
          { texto: 'Salvar Código', classe: 'btn-primario', onClick: async () => {
            const cod = ($('mQCod').value||'').trim().toUpperCase(), sig = ($('mQSig').value||'').trim();
            if (!cod || !sig) return toast('Preencha código e significado.');
            ESTADO.codigosQ.push({ id: 'q_' + Date.now(), codigo: cod, categoria: $('mQCat').value, significado: sig });
            await salvarTudo(); fecharModal(); renderCodigoQ();
          }}
        ]
      );
    });
    $('btnPdfCodigoQ').addEventListener('click', () => gerarPdfCodigoQ(false));
    $('btnPdfListaQra').addEventListener('click', () => gerarPdfCodigoQ(true));
    $('btnSalvarQraLote').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      $('tbodyListaQra').querySelectorAll('.inp-qra-lote').forEach(inp => {
        const ag = agentePorId(inp.getAttribute('data-qra-id'));
        if (ag) ag.qra = inp.value.trim() || gerarQra(ag.nome);
      });
      await salvarTudo(); atualizarTodasVistas();
    });

    // Efetivo
    $('fltEfBusca').addEventListener('input', renderEfetivo);
    $('fltEfEquipe').addEventListener('change', renderEfetivo);
    $('fltEfArea').addEventListener('change', renderEfetivo);
    $('btnNovoAgente').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); abrirModalAgente(null); });
    $('btnAbrirImportar64').addEventListener('click', abrirModalImportar64);
    $('btnDistribuir64').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      if (!confirm('Rebalancear os guardas operacionais igualmente nas 4 equipes (ALFA, BRAVO, CHARLIE, DELTA)?')) return;
      const alvos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe !== 'ADM' && a.equipe !== '12X36');
      alvos.forEach((a, i) => { a.equipe = EQUIPES[i % 4]; a.regime = '24X72'; });
      await salvarTudo(); atualizarTodasVistas(); toast(`${alvos.length} guardas rebalanceados!`);
    });

    // Sistema / Contas / Base / Banco
    $('btnCriarContaAdmin').addEventListener('click', () => {
      if (!isAdmin()) return toast('Apenas Admin.');
      abrirModal('Criar Conta', `<div class="campo"><label>Nome</label><input type="text" id="mUsNome"></div><div class="grid-2"><div class="campo"><label>Login</label><input type="text" id="mUsLogin"></div><div class="campo"><label>Matrícula</label><input type="text" id="mUsMat"></div></div><div class="grid-2"><div class="campo"><label>Senha (mín. 6)</label><input type="password" id="mUsPass"></div><div class="campo"><label>Perfil</label><select id="mUsPerfil"><option value="AGENTE">Agente</option><option value="ESCALANTE">Escalante</option><option value="ADMIN">Admin</option></select></div></div>`, [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        { texto: 'Criar', classe: 'btn-primario', onClick: () => { const r = window.EscalaCloud.cadastrarUsuario({ nome: $('mUsNome').value, login: $('mUsLogin').value, matricula: $('mUsMat').value, senha: $('mUsPass').value, perfil: $('mUsPerfil').value, aprovado: true }); if (!r.ok) return toast(r.erro); fecharModal(); renderContas(); salvarTudo(true); toast('Conta criada!'); }}
      ]);
    });
    $('btnCapturarBaseGps').addEventListener('click', () => {
      if (!navigator.geolocation) return toast('GPS indisponível.');
      navigator.geolocation.getCurrentPosition(pos => { $('inpBaseLat').value = pos.coords.latitude.toFixed(6); $('inpBaseLon').value = pos.coords.longitude.toFixed(6); toast('GPS da Base capturado!'); }, () => toast('Falha no GPS.'), { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 });
    });
    $('btnSalvarConfigBase').addEventListener('click', async () => { if (!isAdmin()) return toast('Apenas Admin.'); Object.assign(ESTADO.config, { baseNome: $('inpBaseNome').value.trim(), baseLat: Number($('inpBaseLat').value), baseLon: Number($('inpBaseLon').value), baseRaioMetros: Math.max(30, Number($('inpBaseRaio').value)||500), acaoSuspeita: $('selBloquearSuspeito').value }); await salvarTudo(); });
    $('btnSalvarFirebaseProprio').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Apenas Admin.');
      const obj = window.EscalaCloud.extrairObjetoFirebase($('txtFirebaseConfigJson').value);
      if (!obj) return toast('Cole um firebaseConfig válido.');
      if (obj.projectId === 'cco-viaturas') return toast('BLOQUEADO: Esse é o banco do CCO Viaturas! Use um projeto separado.');
      $('statusDbProprio').textContent = 'Testando conexão...';
      const t = await window.EscalaCloud.testarConexaoFirebase(obj);
      if (!t.ok) { $('statusDbProprio').textContent = 'Erro: ' + (t.erro||'verifique Firestore.'); return toast('Falha na conexão.'); }
      window.EscalaCloud.salvarConfigFirebase(obj); ESTADO.config.nuvemAtiva = true; $('chkNuvemAtiva').checked = true;
      await salvarTudo(true); renderConfigBase(); toast(`Firebase "${obj.projectId}" conectado!`);
    });
    $('btnDesconectarFirebase').addEventListener('click', async () => { if (!isAdmin()) return toast('Apenas Admin.'); window.EscalaCloud.salvarConfigFirebase(null); ESTADO.config.nuvemAtiva = false; $('chkNuvemAtiva').checked = false; await salvarTudo(true); renderConfigBase(); atualizarBadgeSync('Modo Local', 'badge-neutro'); toast('Sistema operando 100% local.'); });
    $('chkNuvemAtiva').addEventListener('change', async () => { if (!isAdmin()) { $('chkNuvemAtiva').checked = !!ESTADO.config.nuvemAtiva; return; } if ($('chkNuvemAtiva').checked && !window.EscalaCloud.lerConfigFirebase()) { $('chkNuvemAtiva').checked = false; return toast('Configure o firebaseConfig primeiro.'); } ESTADO.config.nuvemAtiva = $('chkNuvemAtiva').checked; await salvarTudo(); renderConfigBase(); });
    $('btnSyncAgora').addEventListener('click', async () => { if (!window.EscalaCloud.lerConfigFirebase()) return toast('Modo local ativo (sem Firebase).'); const r = await window.EscalaCloud.sincronizarBaixarNuvem(); if (r.ok && r.dados) { ESTADO = r.dados; await window.EscalaCloud.salvarEstadoLocal(ESTADO); atualizarTodasVistas(); toast('Sincronizado!'); } else await salvarTudo(); });
    $('btnAlterarMinhaSenha').addEventListener('click', () => abrirModal('Alterar Senha', `<div class="campo"><label>Nova Senha (mín. 6)</label><input type="password" id="mNovaSenha" minlength="6"></div>`, [{ texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal }, { texto: 'Salvar', classe: 'btn-primario', onClick: () => { const s = $('mNovaSenha').value; if (!s || s.length < 6) return toast('Mínimo 6 caracteres.'); window.EscalaCloud.atualizarUsuario(SESSAO.login, { novaSenha: s }); fecharModal(); salvarTudo(true); toast('Senha alterada!'); }}]));
    $('btnExportarBackup').addEventListener('click', async () => {
      const pac = { sistema: 'ESCALA_GCM_V3', exportadoEm: new Date().toISOString(), estado: ESTADO, usuarios: window.EscalaCloud.lerUsuariosLocal() };
      if (window.escalaAPI?.exportarBackup) { const r = await window.escalaAPI.exportarBackup(pac); if (r?.ok) toast('Backup salvo em: ' + r.caminho); return; }
      const b = new Blob([JSON.stringify(pac, null, 2)], { type: 'application/json' }), u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = `backup-escala-gcm-${hojeISO()}.json`; a.click(); URL.revokeObjectURL(u); toast('Backup JSON baixado!');
    });
    $('btnImportarBackup').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Apenas Admin.');
      if (window.escalaAPI?.importarBackup) { const r = await window.escalaAPI.importarBackup(); if (r?.ok && r.dados?.estado) { ESTADO = r.dados.estado; if (Array.isArray(r.dados.usuarios)) window.EscalaCloud.salvarUsuariosLocal(r.dados.usuarios); await salvarTudo(); atualizarTodasVistas(); toast('Backup restaurado!'); } return; }
      $('inpFileBackup').click();
    });
    $('inpFileBackup').addEventListener('change', async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try { const p = JSON.parse(await f.text()); if (!p.estado?.efetivo) throw new Error('Inválido.'); ESTADO = p.estado; if (Array.isArray(p.usuarios)) window.EscalaCloud.salvarUsuariosLocal(p.usuarios); await salvarTudo(); atualizarTodasVistas(); toast('Backup restaurado!'); } catch (er) { toast('Erro: ' + er.message); }
      e.target.value = '';
    });
  }

  async function init() {
    aplicarTema(localStorage.getItem('escala_gcm_tema_v3') || 'claro');
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(() => {});
    const carregado = await window.EscalaCloud.carregarEstadoLocal();
    ESTADO = (carregado && carregado.efetivo && carregado.postos && carregado.versao >= 3) ? carregado : criarEstadoInicial();
    if (!Array.isArray(ESTADO.eventos)) ESTADO.eventos = [];
    if (!Array.isArray(ESTADO.codigosQ)) ESTADO.codigosQ = CODIGO_Q_INICIAL.map((c,i) => ({ id:'q_'+i, codigo:c[0], categoria:c[1], significado:c[2] }));
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    registrarEventos();
    const s = window.EscalaCloud.lerSessao();
    if (s && s.login) iniciarAppLogado(s);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
