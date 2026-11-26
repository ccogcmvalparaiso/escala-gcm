(function () {
  'use strict';

  const EQUIPES = ['ALFA', 'BRAVO', 'CHARLIE', 'DELTA'];
  const AREAS_LABEL = {
    PATRULHAMENTO: 'Patrulhamento',
    MARIA_DA_PENHA: 'Patrulha Maria da Penha',
    ESCOLAR: 'Patrulha Escolar',
    TRANSITO: 'Trânsito',
    CCO: 'Operador CCO',
    COMANDO: 'Comando / Adm'
  };
  const FUNCOES_LABEL = {
    COMANDANTE_01: '01 — Comandante',
    MOTORISTA_02: '02 — Motorista',
    PATRULHEIRO_03: '03 — Patrulheiro',
    OPERADOR_CCO: 'Operador CCO',
    ADMINISTRATIVO: 'Administrativo'
  };
  const MODALIDADE_EVENTO = {
    HORA_EXTRA: 'Hora Extra / Gratificação',
    BANCO_HORAS: 'Banco de Horas / Folga Compensatória',
    REMANEJAMENTO: 'Remanejamento do Turno'
  };
  const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const MESES_EXT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const ROL_OFICIAL_64 = [["GCM-001", "Vinicios Mateus Pires da Silva", "VAGA_IMEDIATA", "AC 01 (Nota 100,00)", "M"], ["GCM-002", "Yago Rocha da Silva Dias", "VAGA_IMEDIATA", "AC 02 (Nota 99,00)", "M"], ["GCM-003", "Anderson Pereira Costa", "VAGA_IMEDIATA", "AC 03 (Nota 99,00)", "M"], ["GCM-004", "Gabrielle da Cruz Nunes", "VAGA_IMEDIATA", "AC 04 / 1ª SF (Nota 99,00)", "F"], ["GCM-005", "Tiago Ferreira Lopes", "VAGA_IMEDIATA", "AC 05 (Nota 99,00)", "M"], ["GCM-006", "Luthero Pinheiro Martins Filho", "VAGA_IMEDIATA", "AC 06 (Nota 98,00)", "M"], ["GCM-007", "Tiago Batista Ferreira", "VAGA_IMEDIATA", "AC 07 (Nota 98,00)", "M"], ["GCM-008", "Luís Otávio de Andrade Torres", "VAGA_IMEDIATA", "AC 08 (Nota 97,00)", "M"], ["GCM-009", "Michael Larangeira Linhares", "VAGA_IMEDIATA", "AC 09 (Nota 97,00)", "M"], ["GCM-010", "Valterson da Silva Junior", "VAGA_IMEDIATA", "AC 10 (Nota 97,00)", "M"], ["GCM-011", "Vinicius Lemes Lopes", "VAGA_IMEDIATA", "AC 11 (Nota 97,00)", "M"], ["GCM-012", "Cleber Brilhante de Albuquerque Neto", "VAGA_IMEDIATA", "AC 12 (Nota 97,00)", "M"], ["GCM-013", "Anderson Lucas Brito Gomes", "VAGA_IMEDIATA", "AC 13 (Nota 97,00)", "M"], ["GCM-014", "Alex Sandro Souza Gomes", "VAGA_IMEDIATA", "AC 14 (Nota 96,00)", "M"], ["GCM-015", "Michele Bezerra de Araujo Aniceto", "VAGA_IMEDIATA", "AC 15 / 2ª SF (Nota 96,00)", "F"], ["GCM-016", "Mayara Valeria Damasceno Pastana", "VAGA_IMEDIATA", "SF 01 (Nota 96,00)", "F"], ["GCM-017", "Amanda Rodrigues Cavalcante", "VAGA_IMEDIATA", "SF 02 (Nota 96,00)", "F"], ["GCM-018", "Jemima Costa de Jesus", "VAGA_IMEDIATA", "SF 03 (Nota 96,00)", "F"], ["GCM-019", "Geyssom Chaves Duarte Mazinho", "VAGA_IMEDIATA", "N 01 (Nota 96,00)", "M"], ["GCM-020", "Diego Stanley Cantallops Santos", "VAGA_IMEDIATA", "N 02 (Nota 95,00)", "M"], ["GCM-021", "Rafael Miranda Dias", "VAGA_IMEDIATA", "N 03 (Nota 95,00)", "M"], ["GCM-022", "Daniel Kimberley de Oliveira Franco", "VAGA_IMEDIATA", "N 04 (Nota 95,00)", "M"], ["GCM-023", "Renan Rodrigues de Aquino", "VAGA_IMEDIATA", "N 05 (Nota 94,00)", "M"], ["GCM-024", "Gilmar Figueiredo dos Santos", "VAGA_IMEDIATA", "N 06 (Nota 94,00)", "M"], ["GCM-025", "Juliana Iza de Oliveira Nunes", "VAGA_IMEDIATA", "N 07 / 12ª SF (Nota 94,00)", "F"], ["GCM-026", "Douglas Araujo dos Santos", "VAGA_IMEDIATA", "N 08 (Nota 94,00)", "M"], ["GCM-027", "Victor dos Santos Nunes", "VAGA_IMEDIATA", "PcD 01 (Nota 96,00)", "M"], ["GCM-028", "Bruno Guerreiro Galdino", "VAGA_IMEDIATA", "PcD 02 (Nota 93,00)", "M"], ["GCM-029", "Glauber Terena Guerra da Silva", "VAGA_IMEDIATA", "I 01 (Nota 90,00)", "M"], ["GCM-030", "Gean Martins Godinho da Silva", "VAGA_IMEDIATA", "Q 01 — sub judice (Nota 84,00)", "M"], ["GCM-031", "Davy Guedes de Oliveira", "CADASTRO_RESERVA", "1º CR AC (Nota 96,00)", "M"], ["GCM-032", "Rayan Thalles Bonfim da Silva", "CADASTRO_RESERVA", "2º CR AC (Nota 96,00)", "M"], ["GCM-033", "Joao Pedro Martins Pinheiro", "CADASTRO_RESERVA", "3º CR AC (Nota 96,00)", "M"], ["GCM-034", "Gustavo Amorim Lima", "CADASTRO_RESERVA", "4º CR AC (Nota 96,00)", "M"], ["GCM-035", "Laryssa Santos Souza", "CADASTRO_RESERVA", "1ª CR SF / 5º CR AC (Nota 95,00)", "F"], ["GCM-036", "Regivânia Rodrigues de Macedo", "CADASTRO_RESERVA", "2ª CR SF / 6º CR AC (Nota 95,00)", "F"], ["GCM-037", "Bruna Albéfaro Pereira", "CADASTRO_RESERVA", "3ª CR SF / 7º CR AC (Nota 95,00)", "F"], ["GCM-038", "Vanessa Vasconcelos Sampaio", "CADASTRO_RESERVA", "4ª CR SF / 8º CR AC (Nota 95,00)", "F"], ["GCM-039", "Victor Lauriano de Paula Souza", "CADASTRO_RESERVA", "9º CR AC (Nota 95,00)", "M"], ["GCM-040", "Valeria Januario Monteiro", "CADASTRO_RESERVA", "5ª CR SF / 10º CR AC (Nota 95,00)", "F"], ["GCM-041", "Lucas Lacerda de Melo", "CADASTRO_RESERVA", "11º CR AC (Nota 95,00)", "M"], ["GCM-042", "Mayara Albuquerque Oliveira", "CADASTRO_RESERVA", "6ª CR SF / 12º CR AC (Nota 95,00)", "F"], ["GCM-043", "Alexandre Monteiro Januario", "CADASTRO_RESERVA", "13º CR AC (Nota 95,00)", "M"], ["GCM-044", "Maísa Vitória Barbosa Vieira", "CADASTRO_RESERVA", "1ª CR N / 7ª CR SF (Nota 94,00)", "F"], ["GCM-045", "Hugo Sales Targino", "CADASTRO_RESERVA", "2º CR N (Nota 94,00)", "M"], ["GCM-046", "Davi Jonas Santos Duarte", "CADASTRO_RESERVA", "3º CR N (Nota 94,00)", "M"], ["GCM-047", "Julia Silveira Carvalho Ferreira", "CADASTRO_RESERVA", "8ª CR SF (Nota 94,00)", "F"], ["GCM-048", "Isabella Alves de Carvalho Basto", "CADASTRO_RESERVA", "9ª CR SF (Nota 94,00)", "F"], ["GCM-049", "Alessandro de Souza Silva", "CADASTRO_RESERVA", "4º CR N (Nota 94,00)", "M"], ["GCM-050", "Graziele Medeiros de Lima", "CADASTRO_RESERVA", "10ª CR SF (Nota 94,00)", "F"], ["GCM-051", "Luiz Felipe Oliveira Barros Dias", "CADASTRO_RESERVA", "5º CR N (Nota 94,00)", "M"], ["GCM-052", "Aline Rayane Vieira Maia", "CADASTRO_RESERVA", "11ª CR SF (Nota 94,00)", "F"], ["GCM-053", "Camila dos Santos Alves", "CADASTRO_RESERVA", "6ª CR N (Nota 93,00)", "F"], ["GCM-054", "Carolina dos Santos Pereira", "CADASTRO_RESERVA", "7ª CR N (Nota 93,00)", "F"], ["GCM-055", "Lucas Nunes da Silva", "CADASTRO_RESERVA", "8º CR N (Nota 93,00)", "M"], ["GCM-056", "Hugo Wildson de Lucena", "CADASTRO_RESERVA", "9º CR N (Nota 93,00)", "M"], ["GCM-057", "Vitor de Farias Lemes", "CADASTRO_RESERVA", "10º CR N (Nota 93,00)", "M"], ["GCM-058", "Esdras Roberto da Silva Braga", "CADASTRO_RESERVA", "11º CR N (Nota 93,00)", "M"], ["GCM-059", "Samuel Alessandro da Silva", "CADASTRO_RESERVA", "12º CR N (Nota 93,00)", "M"], ["GCM-060", "Valdir Borges da Silva Filho", "CADASTRO_RESERVA", "13º CR N (Nota 93,00)", "M"], ["GCM-061", "Felipe Augusto Ribeiro", "CADASTRO_RESERVA", "14º CR N (Nota 93,00)", "M"], ["GCM-062", "Allan Carvalho Gonçalves", "CADASTRO_RESERVA", "15º CR N (Nota 93,00)", "M"], ["GCM-063", "Arthur dos Reis Siqueira Bastos", "CADASTRO_RESERVA", "1º CR PcD — menor de 18 anos (Nota 91,00)", "M"], ["GCM-064", "Rodrigo de Oliveira Correa", "CADASTRO_RESERVA", "1º CR Indígena (Nota 83,00)", "M"]];

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  let ESTADO = null;
  let SESSAO = null;
  let eventoSelecionadoId = null;
  let streamCamera = null;
  let fotoCapturadaDataUrl = null;
  let auditoriaGpsAtual = null;
  let timerRelogio = null;

  // =========================================================================
  // UTILITARIOS DE DATA E CICLO 24x72
  // =========================================================================
  function hojeISO() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  function mesAtualISO() { return hojeISO().slice(0, 7); }
  function formatarDataBR(iso) {
    if (!iso || iso.length < 10) return '—';
    const [y, m, d] = iso.slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
  }
  function formatarDataHoraBR(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const p = (n) => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }
  function diffDiasISO(dataA, dataB) {
    const [ya, ma, da] = dataA.split('-').map(Number);
    const [yb, mb, db] = dataB.split('-').map(Number);
    return Math.round((Date.UTC(ya, ma - 1, da) - Date.UTC(yb, mb - 1, db)) / 86400000);
  }
  function calcularCiclo24x72(dataISO) {
    const base = (ESTADO && ESTADO.config && ESTADO.config.dataBaseAlfa) || hojeISO();
    const diff = diffDiasISO(dataISO, base);
    const idxServico = ((diff % 4) + 4) % 4;
    const equipeServico = EQUIPES[idxServico];
    const mapa = {};
    EQUIPES.forEach((eq, i) => {
      const dist = ((idxServico - i) + 4) % 4;
      if (dist === 0) mapa[eq] = { codigo: 'SERVICO', rotulo: 'SERVIÇO 24h', idealEvento: false };
      else if (dist === 1) mapa[eq] = { codigo: 'FOLGA_1', rotulo: '1ª Folga (24h)', idealEvento: false };
      else if (dist === 2) mapa[eq] = { codigo: 'FOLGA_2', rotulo: '2ª Folga (48h)', idealEvento: true };
      else mapa[eq] = { codigo: 'FOLGA_3', rotulo: '3ª Folga (72h)', idealEvento: false };
    });
    return { dataISO, equipeServico, mapa };
  }

  function statusAgenteNaData(agente, dataISO) {
    if (!agente) return '';
    if (agente.equipe === 'ADM') return 'ADM (Seg–Sex)';
    if (agente.equipe === '12X36') return '12x36';
    if (agente.equipe === 'RESERVA') return 'Reserva';
    const c = calcularCiclo24x72(dataISO);
    const st = c.mapa[agente.equipe];
    if (!st) return agente.equipe;
    if (st.codigo === 'SERVICO') return 'EM SERVIÇO 24h';
    if (st.codigo === 'FOLGA_1') return '1ª Folga 24h — Evitar';
    if (st.codigo === 'FOLGA_2') return '2ª Folga 48h — IDEAL';
    return '3ª Folga 72h — Entra amanhã';
  }

  // =========================================================================
  // ESTADO INICIAL: 64 NOMES REAIS DO PDF
  // 58 ATIVOS = 10 ADMINISTRATIVO + 48 OPERACIONAIS (12 x 4 EQUIPES 24x72)
  // + 6 CADASTRO DE RESERVA (100% EDITAVEL)
  // =========================================================================
  function criarPostosPadrao() {
    return [
      { id: 'VTR-01', nome: 'VTR-01 — Setor 01 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 01', bairros: 'Valparaíso I (Etapas A a E), Jardim Anhanguera', prefixo: 'VTR-01', responsavel: 'A definir (Chefe Setor 01)' },
      { id: 'VTR-02', nome: 'VTR-02 — Setor 02 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 02', bairros: 'Parque Esplanada I a V, Cruzeiro do Sul, Valparaízo II', prefixo: 'VTR-02', responsavel: 'A definir (Chefe Setor 02)' },
      { id: 'VTR-03', nome: 'VTR-03 — Setor 03 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 03', bairros: 'Jardim Céu Azul, Jardim Oriente, Ipanema', prefixo: 'VTR-03', responsavel: 'A definir (Chefe Setor 03)' },
      { id: 'VTR-04', nome: 'VTR-04 — Setor 04 (Patrulhamento)', area: 'PATRULHAMENTO', setor: 'Setor 04', bairros: 'Cidade Jardins, Parque Rio Branco, Marajó, Santa Rita', prefixo: 'VTR-04', responsavel: 'A definir (Chefe Setor 04)' },
      { id: 'PMP-01', nome: 'Patrulha Maria da Penha', area: 'MARIA_DA_PENHA', setor: 'Especializada — Maria da Penha', bairros: 'Todo o Município de Valparaíso de Goiás', prefixo: 'VTR-PMP', responsavel: 'A definir (Resp. Maria da Penha)' },
      { id: 'ESC-01', nome: 'Patrulha Escolar / Trânsito', area: 'ESCOLAR', setor: 'Especializada — Escolar e Trânsito', bairros: 'Escolas Municipais, CMEIs e Corredores BR-040', prefixo: 'VTR-ESC', responsavel: 'A definir (Resp. Escolar/Trânsito)' },
      { id: 'CCO-01', nome: 'Operador CCO / Rádio 153', area: 'CCO', setor: 'Base CCO / Videomonitoramento', bairros: 'Central de Controle Operacional — Valparaíso-GO', prefixo: 'BASE-CCO', responsavel: 'A definir (Coord. CCO)' }
    ];
  }

  function criarModeloCartaoPadrao(posto) {
    if (posto.area === 'MARIA_DA_PENHA') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
        missao: 'Fiscalização de medidas protetivas de urgência, visitas tranquilizadoras e apoio integrado à rede de proteção à mulher.',
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso', atividade: 'Assunção de serviço, conferência de pastas de medidas protetivas e vistoria da VTR.' },
          { hora: '08:00 - 12:00', local: 'Roteiro de Visitas (Etapas / Esplanada / Céu Azul)', atividade: 'Visitas preventivas agendadas e acompanhamento de assistidas.' },
          { hora: '14:00 - 18:00', local: 'CRAM / Rede de Apoio / Visitas', atividade: 'Integração com a rede de proteção e visitas do período vespertino.' },
          { hora: '18:00 - 07:00', local: 'Prontidão Operacional / Apoio CCO', atividade: 'Atendimento prioritário a chamados 153 de violência doméstica e patrulhamento preventivo.' }
        ],
        obs: 'Manter sigilo absoluto dos endereços de assistidas. Reportar deslocamentos e ocorrências ao CCO.'
      };
    }
    if (posto.area === 'ESCOLAR' || posto.area === 'TRANSITO') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
        missao: 'Segurança viária e proteção no entorno das escolas municipais nos horários de pico, entrada e saída de alunos.',
        pontosBase: [
          { hora: '07:00 - 08:30', local: 'Escolas Municipais / Acessos BR-040', atividade: 'Ponto Base na entrada matutina e fluidez viária.' },
          { hora: '11:15 - 13:00', local: 'Corredores Escolares — Troca de Turno', atividade: 'Travessia segura na saída matutina e entrada vespertina.' },
          { hora: '16:45 - 19:00', local: 'Escolas e Rotatórias Principais', atividade: 'Saída escolar e operação fluidez no retorno do trabalho.' },
          { hora: '19:00 - 07:00', local: 'Ronda Patrimonial Escolar Noturna', atividade: 'Vistoria perimetral de escolas, CMEIs e prédios públicos.' }
        ],
        obs: 'Priorizar contato preventivo com direções escolares e sinalização luminosa nas intervenções viárias.'
      };
    }
    if (posto.area === 'CCO') {
      return {
        setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
        missao: 'Recepção de chamados 153, despacho de viaturas, controle de posicionamento das guarnições e livro de plantão.',
        pontosBase: [
          { hora: '07:00 - 07:30', local: 'Sala CCO', atividade: 'Recebimento do plantão, conferência de rádios, câmeras e mapa de viaturas.' },
          { hora: '07:30 - 19:00', local: 'Sala CCO — Diurno', atividade: 'Despacho de ocorrências, monitoramento de perímetro e apoio às guarnições.' },
          { hora: '19:00 - 07:00', local: 'Sala CCO — Noturno', atividade: 'Monitoramento contínuo, conferência de rondas patrimoniais e relatório final.' }
        ],
        obs: 'Emitir relatório de encerramento do turno às 06:45 e repassar pendências à equipe entrante.'
      };
    }
    return {
      setor: posto.setor, bairros: posto.bairros, prefixo: posto.prefixo, responsavel: posto.responsavel || '',
      missao: 'Patrulhamento ostensivo preventivo, proteção de bens, serviços e instalações municipais e pronta resposta a chamados do CCO.',
      pontosBase: [
        { hora: '07:00 - 07:30', local: 'Base GCM Valparaíso', atividade: 'Assunção do turno, checklist de viatura, equipamentos e alinhamento com CCO.' },
        { hora: '07:30 - 11:30', local: `PB 1 — ${posto.bairros.split(',')[0]}`, atividade: 'Patrulhamento preventivo em praças, UBSs, escolas e áreas comerciais.' },
        { hora: '11:30 - 14:00', local: `PB 2 — Corredores do ${posto.setor}`, atividade: 'Presença ostensiva em pontos de grande circulação e horário de almoço.' },
        { hora: '14:00 - 18:00', local: `PB 3 — Prédios Públicos do ${posto.setor}`, atividade: 'Ronda em postos de saúde, CRAS, ginásios e apoio comunitário.' },
        { hora: '18:00 - 22:00', local: `PB 4 — Operação Saturação (${posto.setor})`, atividade: 'Ponto base com giroflex em paradas de ônibus e comércio noturno.' },
        { hora: '22:00 - 06:30', local: `Ronda Patrimonial Noturna — ${posto.setor}`, atividade: 'Vistoria periódica em próprios municipais e prontidão para ocorrências.' },
        { hora: '06:30 - 07:00', local: 'Base GCM Valparaíso', atividade: 'Abastecimento, relatório de turno e passagem de serviço à próxima equipe.' }
      ],
      obs: 'Manter rádio na frequência operacional, reportar início/término de PB ao CCO e registrar ponto na entrada e saída.'
    };
  }

  function gerarNomeGuerra(nomeCompleto) {
    const p = String(nomeCompleto || '').trim().split(/\s+/);
    if (p.length <= 1) return nomeCompleto;
    return `${p[0]} ${p[p.length - 1]}`;
  }

  function criarEstadoInicial() {
    const postos = criarPostosPadrao();
    const efetivo = [];

    // 58 guardas ativos iniciais:
    // - 10 no Administrativo (Seg-Sex, comercial)
    // - 48 na Escala Operacional 24x72 (12 por equipe: ALFA, BRAVO, CHARLIE, DELTA)
    // + 6 no Cadastro de Reserva (posicoes 59 a 64, incluindo menor de 18 anos) — tudo 100% editavel
    const cargosAdmRotulos = [
      'Comandante da GCM',
      'Subcomandante da GCM',
      'Corregedor(a) da GCM',
      'Ouvidor(a) da GCM',
      'Chefia de Operações e Escalas',
      'Setor de Logística / Armamento e Frota',
      'Setor de Inteligência / Estatística CCO',
      'Coordenação de Ensino e Instrução',
      'Apoio Administrativo / RH e Ponto',
      'Apoio Administrativo / Patrimônio'
    ];

    const administrativos = [];
    // Índices 0..9 -> 10 alocados inicialmente no Administrativo (100% editável)
    // Índices 10..57 -> 48 alocados inicialmente na 24x72 (12 por equipe)
    // Índices 58..63 -> 6 no Cadastro de Reserva / Aguardando Convocação
    const opPool = [];
    ROL_OFICIAL_64.forEach((item, idx) => {
      const [mat, nome, origem, classificacao, sexo] = item;
      const id = 'ag_' + String(idx + 1).padStart(2, '0');
      const guerra = gerarNomeGuerra(nome);
      if (idx < 10) {
        efetivo.push({
          id, matricula: mat, nome, nomeGuerra: guerra, sexo,
          origem, classificacao, telefone: '',
          equipe: 'ADM', area: 'COMANDO', funcao: 'ADMINISTRATIVO',
          regime: 'ADM_SEG_SEX', situacao: 'ATIVO'
        });
        administrativos.push({
          id: 'adm_' + (idx + 1),
          cargo: cargosAdmRotulos[idx],
          agenteId: id,
          titular: `${nome} (${mat})`,
          horario: 'Seg–Sex · 08h às 17h',
          obs: 'Editável — fora da escala 24x72'
        });
      } else if (idx < 58) {
        opPool.push({ id, matricula: mat, nome, nomeGuerra: guerra, sexo, origem, classificacao });
      } else {
        efetivo.push({
          id, matricula: mat, nome, nomeGuerra: guerra, sexo,
          origem, classificacao, telefone: '',
          equipe: 'RESERVA', area: 'PATRULHAMENTO', funcao: 'PATRULHEIRO_03',
          regime: '24X72', situacao: 'RESERVA'
        });
      }
    });

    // Distribui os 48 operacionais equilibrando mulheres nas 4 equipes (para Maria da Penha)
    const mulheresOp = opPool.filter(x => x.sexo === 'F');
    const homensOp = opPool.filter(x => x.sexo !== 'F');
    const ordenado48 = [];
    // Intercala para que cada equipe (ALFA, BRAVO, CHARLIE, DELTA) receba mulheres e homens equilibrados
    const maxLen = Math.max(mulheresOp.length, homensOp.length);
    let mi = 0, hi = 0;
    while (ordenado48.length < opPool.length) {
      if (mi < mulheresOp.length) ordenado48.push(mulheresOp[mi++]);
      if (hi < homensOp.length) ordenado48.push(homensOp[hi++]);
      if (hi < homensOp.length) ordenado48.push(homensOp[hi++]);
    }

    const eqContadores = { ALFA: 0, BRAVO: 0, CHARLIE: 0, DELTA: 0 };
    const equipesListas = { ALFA: [], BRAVO: [], CHARLIE: [], DELTA: [] };
    ordenado48.forEach((p, i) => {
      const eq = EQUIPES[i % 4];
      const posNaEq = eqContadores[eq]++;
      // 12 guardas por equipe: 0..7 Patrulhamento (4 VTRs x 2), 8..9 Maria da Penha, 10 Escolar/Transito, 11 CCO
      let area = 'PATRULHAMENTO';
      let funcao = posNaEq % 2 === 0 ? 'COMANDANTE_01' : 'MOTORISTA_02';
      if (posNaEq === 8 || posNaEq === 9) { area = 'MARIA_DA_PENHA'; funcao = posNaEq === 8 ? 'COMANDANTE_01' : 'MOTORISTA_02'; }
      else if (posNaEq === 10) { area = 'ESCOLAR'; funcao = 'COMANDANTE_01'; }
      else if (posNaEq === 11) { area = 'CCO'; funcao = 'OPERADOR_CCO'; }
      const reg = {
        id: p.id, matricula: p.matricula, nome: p.nome, nomeGuerra: p.nomeGuerra, sexo: p.sexo,
        origem: p.origem, classificacao: p.classificacao, telefone: '',
        equipe: eq, area, funcao, regime: '24X72', situacao: 'ATIVO'
      };
      efetivo.push(reg);
      equipesListas[eq].push(reg);
    });

    // Ordena efetivo por matricula (GCM-001 a GCM-064)
    efetivo.sort((a, b) => a.matricula.localeCompare(b.matricula));

    // Monta automaticamente as 4 equipes (12 guardas por equipe = 48 operacionais)
    const equipesMontagem = {};
    EQUIPES.forEach((eq) => {
      const daEq = equipesListas[eq];
      // Garante que mulheres fiquem preferencialmente na Patrulha Maria da Penha
      const fems = daEq.filter(a => a.sexo === 'F');
      const usados = new Set();
      const pegar = (prefFem) => {
        let pick = null;
        if (prefFem) pick = fems.find(a => !usados.has(a.id));
        if (!pick) pick = daEq.find(a => !usados.has(a.id));
        if (pick) usados.add(pick.id);
        return pick ? pick.id : '';
      };
      const pmp01 = pegar(true);
      const pmp02 = pegar(true);
      const v1_01 = pegar(false), v1_02 = pegar(false);
      const v2_01 = pegar(false), v2_02 = pegar(false);
      const v3_01 = pegar(false), v3_02 = pegar(false);
      const v4_01 = pegar(false), v4_02 = pegar(false);
      const esc01 = pegar(false);
      const cco01 = pegar(false);
      equipesMontagem[eq] = {
        'VTR-01': { g01: v1_01, g02: v1_02, g03: '' },
        'VTR-02': { g01: v2_01, g02: v2_02, g03: '' },
        'VTR-03': { g01: v3_01, g02: v3_02, g03: '' },
        'VTR-04': { g01: v4_01, g02: v4_02, g03: '' },
        'PMP-01': { g01: pmp01, g02: pmp02, g03: '' },
        'ESC-01': { g01: esc01, g02: '', g03: '' },
        'CCO-01': { g01: cco01, g02: '', g03: '' }
      };
    });

    const cartoesModelo = {};
    postos.forEach((p) => { cartoesModelo[p.id] = criarModeloCartaoPadrao(p); });

    // Um modelo de evento pronto para demonstrar como funciona
    const eventos = [
      {
        id: 'ev_modelo_1',
        nome: 'Operação Evento Municipal (Modelo Editável)',
        local: 'Praça Central / Valparaíso de Goiás',
        data: hojeISO(),
        inicio: '16:00',
        fim: '23:00',
        regime: 'HORA_EXTRA',
        coordenador: 'A definir (Coordenador do Evento)',
        missao: 'Reforço de segurança preventiva, controle de público e ordenamento viário no entorno do evento.',
        obs: 'Apresentação na Base GCM com 30 min de antecedência. Equipamento completo, rádio e sinalizadores.',
        viaturas: [
          { id: 'evv_1', prefixo: 'VTR-EVENTO 01', setor: 'Área Palco / Acesso Principal', g01: '', g02: '', g03: '', g04: '' },
          { id: 'evv_2', prefixo: 'VTR-EVENTO 02', setor: 'Perímetro Externo / Trânsito', g01: '', g02: '', g03: '', g04: '' }
        ]
      }
    ];

    return {
      versao: 2,
      config: {
        dataBaseAlfa: hojeISO(),
        horarioTroca: '07:00 às 07:00',
        baseNome: 'Base Operacional — GCM Valparaíso de Goiás',
        baseLat: -16.0658,
        baseLon: -47.9756,
        baseRaioMetros: 500,
        acaoSuspeita: 'ALERTAR',
        nuvemAtiva: false,
        responsaveis: {
          escalanteNome: 'A definir (Responsável pela Escala)',
          escalanteCargo: 'Encarregado de Escala — GCM',
          escalanteMat: '—',
          comandoNome: 'A definir (Comando GCM)',
          comandoCargo: 'Comandante da Guarda Civil Municipal',
          comandoMat: '—'
        }
      },
      postos,
      efetivo,
      equipesMontagem,
      administrativo: administrativos,
      escala12x36: [
        { id: 'e12_1', posto: 'Paço Municipal / Sede Prefeitura', turno: 'Diurno (07h às 19h)', equipeA: 'A definir (Dias Ímpares)', equipeB: 'A definir (Dias Pares)' }
      ],
      eventos,
      cartoesModelo,
      cartoesDia: {},
      pontos: []
    };
  }

  // =========================================================================
  // PERSISTENCIA E FEEDBACK
  // =========================================================================
  function toast(msg) {
    const area = $('toastArea');
    if (!area) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    area.appendChild(el);
    setTimeout(() => { el.remove(); }, 3500);
  }

  function atualizarBadgeSync(texto, classe) {
    const b = $('badgeSync');
    if (!b) return;
    b.textContent = texto;
    b.className = 'badge ' + (classe || 'badge-neutro');
  }

  async function salvarTudo(silencioso) {
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    atualizarBadgeSync('Salvo Local', 'badge-ok');
    if (ESTADO.config && ESTADO.config.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      atualizarBadgeSync('Sincronizando...', 'badge-warn');
      const r = await window.EscalaCloud.sincronizarEnviarNuvem(ESTADO);
      if (r.ok) atualizarBadgeSync('Nuvem Própria OK', 'badge-ok');
      else atualizarBadgeSync('Local (Offline)', 'badge-warn');
    }
    if (!silencioso) toast('Alterações salvas.');
  }

  function isAdmin() { return SESSAO && SESSAO.perfil === 'ADMIN'; }
  function podeEditarEscala() { return SESSAO && (SESSAO.perfil === 'ADMIN' || SESSAO.perfil === 'ESCALANTE'); }

  function nomeAgentePorId(id) {
    if (!id) return '';
    const a = (ESTADO.efetivo || []).find(x => x.id === id);
    return a ? `${a.nomeGuerra || a.nome} (${a.matricula})` : '';
  }

  // =========================================================================
  // TEMA BRANCO / PRETO (ZERO AZUL)
  // =========================================================================
  function aplicarTema(tema) {
    const t = tema === 'noturno' ? 'noturno' : 'claro';
    document.documentElement.setAttribute('data-tema', t);
    localStorage.setItem('escala_gcm_tema_v2', t);
    const meta = $('metaThemeColor');
    if (meta) meta.setAttribute('content', t === 'noturno' ? '#000000' : '#FFFFFF');
    if ($('btnTema')) $('btnTema').textContent = t === 'noturno' ? 'Modo Claro (Branco)' : 'Modo Noturno (Preto)';
    if ($('btnTemaAuth')) $('btnTemaAuth').textContent = t === 'noturno' ? 'Alternar Modo Claro (Branco)' : 'Alternar Modo Noturno (Preto)';
  }
  function alternarTema() {
    aplicarTema((document.documentElement.getAttribute('data-tema') || 'claro') === 'noturno' ? 'claro' : 'noturno');
  }

  function abrirModal(titulo, corpoHtml, botoes) {
    $('modalTitulo').textContent = titulo;
    $('modalCorpo').innerHTML = corpoHtml;
    const rod = $('modalRodape');
    rod.innerHTML = '';
    (botoes || []).forEach((b) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn ' + (b.classe || 'btn-sec');
      btn.textContent = b.texto;
      btn.addEventListener('click', () => { if (b.onClick) b.onClick(); });
      rod.appendChild(btn);
    });
    $('modalOverlay').classList.remove('oculto');
  }
  function fecharModal() { $('modalOverlay').classList.add('oculto'); }

  // =========================================================================
  // ABA 1: PAINEL DO DIA
  // =========================================================================
  function renderPainel() {
    const hoje = hojeISO();
    const d = new Date();
    $('lblDataHojeExtenso').textContent = `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES_EXT[d.getMonth()]} de ${d.getFullYear()} · Troca de turno: ${ESTADO.config.horarioTroca}`;

    const ciclo = calcularCiclo24x72(hoje);
    $('badgeEquipeHoje').textContent = `EQUIPE ${ciclo.equipeServico} (24h)`;

    $('cardsStatusEquipes').innerHTML = EQUIPES.map((eq) => {
      const st = ciclo.mapa[eq];
      const emServ = st.codigo === 'SERVICO';
      const qtd = ESTADO.efetivo.filter(a => a.equipe === eq && a.situacao === 'ATIVO').length;
      return `
        <div class="status-equipe-card ${emServ ? 'em-servico' : ''}">
          <div class="card-cab">
            <strong>EQUIPE ${eq}</strong>
            <span class="badge ${emServ ? 'badge-ok' : 'badge-neutro'}">${st.rotulo}</span>
          </div>
          <div class="subtexto">${emServ ? 'Em serviço operacional 24h hoje' : (st.codigo === 'FOLGA_2' ? '48h de descanso · Ideal para eventos extras' : (st.codigo === 'FOLGA_3' ? 'Completa 72h · Entra amanhã' : 'Saiu de 24h · Descanso prioritário'))}</div>
          <div style="font-size:12px;font-weight:700;margin-top:4px;">Efetivo ativo: ${qtd} guardas</div>
        </div>
      `;
    }).join('');

    const opAtivos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && EQUIPES.includes(a.equipe)).length;
    const admAtivos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === 'ADM').length;
    const totalAtivos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO').length;
    const reservas = ESTADO.efetivo.filter(a => a.situacao === 'RESERVA' || a.equipe === 'RESERVA').length;
    const pontosHoje = (ESTADO.pontos || []).filter(p => (p.dataLocal || '').startsWith(hoje));

    $('cardsKpiResumo').innerHTML = `
      <div class="kpi-card"><div class="kpi-rotulo">Efetivo Ativo (Operac. + Adm)</div><div class="kpi-valor">${totalAtivos} <span class="subtexto">(${opAtivos} + ${admAtivos})</span></div></div>
      <div class="kpi-card"><div class="kpi-rotulo">Cadastro Reserva / Banco</div><div class="kpi-valor">${reservas} <span class="subtexto">/ ${ESTADO.efetivo.length} total</span></div></div>
      <div class="kpi-card"><div class="kpi-rotulo">Eventos Programados</div><div class="kpi-valor">${(ESTADO.eventos || []).length}</div></div>
      <div class="kpi-card"><div class="kpi-rotulo">Pontos Registrados Hoje</div><div class="kpi-valor">${pontosHoje.length}</div></div>
    `;

    const mont = ESTADO.equipesMontagem[ciclo.equipeServico] || {};
    $('listaGuarnicoesHoje').innerHTML = ESTADO.postos.map((p) => {
      const g = mont[p.id] || {};
      const nomes = [
        g.g01 ? `<strong>01:</strong> ${esc(nomeAgentePorId(g.g01))}` : '',
        g.g02 ? `<strong>02:</strong> ${esc(nomeAgentePorId(g.g02))}` : '',
        g.g03 ? `<strong>03:</strong> ${esc(nomeAgentePorId(g.g03))}` : ''
      ].filter(Boolean).join(' · ') || '<span class="subtexto">Guarnição não definida</span>';
      return `
        <div class="item-compacto">
          <div>
            <strong>${esc(p.nome)}</strong>
            <div class="subtexto">Resp. Setor: ${esc(p.responsavel || 'A definir')}</div>
            <div style="font-size:12px;margin-top:3px;">${nomes}</div>
          </div>
          <span class="badge badge-neutro">${esc(AREAS_LABEL[p.area] || p.area)}</span>
        </div>
      `;
    }).join('');

    // Eventos proximos no painel
    const evs = (ESTADO.eventos || []).slice().sort((a, b) => (a.data || '').localeCompare(b.data || ''));
    $('listaEventosPainel').innerHTML = evs.length ? evs.slice(0, 3).map(ev => `
      <div class="item-compacto clicavel" data-ir-ev="${esc(ev.id)}">
        <div>
          <strong>[EVENTO] ${esc(ev.nome)}</strong>
          <div class="subtexto">${formatarDataBR(ev.data)} · ${esc(ev.inicio)} às ${esc(ev.fim)} · ${esc(ev.local)}</div>
        </div>
        <span class="badge badge-invertido">${(ev.viaturas || []).length} VTR(s)</span>
      </div>
    `).join('') : '<div class="item-compacto"><span class="subtexto">Nenhum evento extraordinário cadastrado.</span></div>';

    $('listaEventosPainel').querySelectorAll('[data-ir-ev]').forEach(el => {
      el.addEventListener('click', () => {
        eventoSelecionadoId = el.getAttribute('data-ir-ev');
        abrirAba('secEventos');
      });
    });

    $('badgePontosHoje').textContent = `${pontosHoje.length} ponto(s) hoje`;
    $('listaPontosHoje').innerHTML = pontosHoje.length ? pontosHoje.slice(0, 6).map((pt) => {
      const cls = pt.auditoria?.status === 'VERIFICADO' ? 'badge-ok' : (pt.auditoria?.status === 'ATENCAO' ? 'badge-warn' : 'badge-erro');
      return `
        <div class="item-compacto">
          <div>
            <strong>${esc(pt.agenteNome)}</strong> <span class="badge badge-neutro">${esc(pt.tipo)}</span>
            <div class="subtexto">${esc(pt.horaLocal)} · ${esc(pt.posto || pt.equipe)} · ${esc(pt.auditoria?.resumoDistancia || '—')}</div>
          </div>
          <span class="badge ${cls}">${esc(pt.auditoria?.status || '—')} (${pt.auditoria?.score ?? 0}%)</span>
        </div>
      `;
    }).join('') : '<div class="item-compacto"><span class="subtexto">Nenhum registro de ponto lançado hoje.</span></div>';
  }

  // =========================================================================
  // ABA 2: ESCALAS (24x72, EQUIPES, SETORES & RESPONSAVEIS, ADM, 12x36)
  // =========================================================================
  function renderCalendario24() {
    const mesVal = $('selMesEscala').value || mesAtualISO();
    $('selMesEscala').value = mesVal;
    $('inpDataBaseAlfa').value = ESTADO.config.dataBaseAlfa || hojeISO();
    $('inpHorarioTroca').value = ESTADO.config.horarioTroca || '07:00 às 07:00';

    const [ano, mes] = mesVal.split('-').map(Number);
    const ultimoDia = new Date(ano, mes, 0).getDate();
    const hoje = hojeISO();
    const linhas = [];

    for (let dia = 1; dia <= ultimoDia; dia++) {
      const iso = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      const dt = new Date(ano, mes - 1, dia);
      const ciclo = calcularCiclo24x72(iso);
      const ehHoje = iso === hoje;
      const cell = (eq) => {
        const st = ciclo.mapa[eq];
        if (st.codigo === 'SERVICO') return '<span class="badge badge-invertido">SERVIÇO 24h</span>';
        if (st.codigo === 'FOLGA_2') return '<span class="badge badge-ok">2ª Folga (48h)</span>';
        return `<span class="subtexto">${st.rotulo}</span>`;
      };
      linhas.push(`
        <tr class="${ehHoje ? 'linha-hoje' : ''}">
          <td><strong>${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}</strong> ${ehHoje ? '<span class="badge badge-invertido">HOJE</span>' : ''}</td>
          <td>${DIAS_SEMANA[dt.getDay()]}</td>
          <td><strong>EQUIPE ${ciclo.equipeServico}</strong></td>
          <td>${cell('ALFA')}</td><td>${cell('BRAVO')}</td><td>${cell('CHARLIE')}</td><td>${cell('DELTA')}</td>
          <td><button type="button" class="btn btn-sec btn-sm" data-abrir-cp="${iso}">Cartão Programa</button></td>
        </tr>
      `);
    }
    $('tbodyCalendario24').innerHTML = linhas.join('');
    $('tbodyCalendario24').querySelectorAll('[data-abrir-cp]').forEach((btn) => {
      btn.addEventListener('click', () => {
        abrirAba('secCartao');
        $('inpCartaoData').value = btn.getAttribute('data-abrir-cp');
        sincronizarDataCartao();
      });
    });
  }

  function renderMontagemEquipe() {
    const eq = $('selEquipeMontagem').value || 'ALFA';
    const mont = ESTADO.equipesMontagem[eq] || {};
    const daEq = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe === eq);
    const outros = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe !== eq);

    const opcoesHtml = (sel) => {
      let h = '<option value="">— Vago / Não escalado —</option>';
      h += `<optgroup label="Efetivo da Equipe ${eq} (${daEq.length})">`;
      daEq.forEach(a => { h += `<option value="${esc(a.id)}" ${a.id === sel ? 'selected' : ''}>${esc(a.nomeGuerra)} (${esc(a.matricula)})</option>`; });
      h += '</optgroup><optgroup label="Outros Ativos (Permuta / Apoio)">';
      outros.forEach(a => { h += `<option value="${esc(a.id)}" ${a.id === sel ? 'selected' : ''}>[${esc(a.equipe)}] ${esc(a.nomeGuerra)} (${esc(a.matricula)})</option>`; });
      h += '</optgroup>';
      return h;
    };

    const desab = podeEditarEscala() ? '' : 'disabled';
    $('gridPostosEquipe').innerHTML = ESTADO.postos.map((p) => {
      const g = mont[p.id] || { g01: '', g02: '', g03: '' };
      return `
        <div class="posto-card" data-posto-id="${esc(p.id)}">
          <div class="card-cab">
            <div>
              <strong>${esc(p.nome)}</strong>
              <div class="subtexto">Resp.: ${esc(p.responsavel || 'A definir')} · ${esc(p.bairros)}</div>
            </div>
            <div class="acoes-linha">
              <span class="badge badge-neutro">${esc(AREAS_LABEL[p.area] || p.area)}</span>
              ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-rem-posto="${esc(p.id)}">Remover</button>` : ''}
            </div>
          </div>
          <div class="campo"><label>01 — Comandante / Encarregado</label><select class="sel-g01" ${desab}>${opcoesHtml(g.g01)}</select></div>
          <div class="campo"><label>02 — Motorista / Condutor</label><select class="sel-g02" ${desab}>${opcoesHtml(g.g02)}</select></div>
          <div class="campo"><label>03 — Patrulheiro (Opcional)</label><select class="sel-g03" ${desab}>${opcoesHtml(g.g03)}</select></div>
        </div>
      `;
    }).join('');

    $('gridPostosEquipe').querySelectorAll('[data-rem-posto]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const pid = btn.getAttribute('data-rem-posto');
        if (!confirm(`Remover o posto/setor ${pid}?`)) return;
        ESTADO.postos = ESTADO.postos.filter(x => x.id !== pid);
        EQUIPES.forEach(e => { if (ESTADO.equipesMontagem[e]) delete ESTADO.equipesMontagem[e][pid]; });
        await salvarTudo();
        atualizarTodasVistas();
      });
    });
    $('gridPostosEquipe').querySelectorAll('select').forEach(s => s.addEventListener('change', verificarConflitosEquipeUI));
    verificarConflitosEquipeUI();
  }

  function verificarConflitosEquipeUI() {
    const vistos = new Map();
    const dups = [];
    $('gridPostosEquipe').querySelectorAll('.posto-card').forEach((card) => {
      const pid = card.getAttribute('data-posto-id');
      ['.sel-g01', '.sel-g02', '.sel-g03'].forEach((cls) => {
        const val = card.querySelector(cls)?.value;
        if (!val) return;
        if (vistos.has(val)) dups.push(`${nomeAgentePorId(val)} (${vistos.get(val)} e ${pid})`);
        else vistos.set(val, pid);
      });
    });
    const box = $('alertaConflitoEquipe');
    if (dups.length) {
      box.textContent = 'Conflito na mesma equipe (agente em 2 postos): ' + dups.join(' | ');
      box.classList.remove('oculto');
    } else box.classList.add('oculto');
    return dups.length === 0;
  }

  async function salvarMontagemEquipeAtual() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    if (!verificarConflitosEquipeUI() && !confirm('Há agente repetido em dois postos. Salvar mesmo assim?')) return;
    const eq = $('selEquipeMontagem').value;
    ESTADO.equipesMontagem[eq] = ESTADO.equipesMontagem[eq] || {};
    $('gridPostosEquipe').querySelectorAll('.posto-card').forEach((card) => {
      const pid = card.getAttribute('data-posto-id');
      ESTADO.equipesMontagem[eq][pid] = {
        g01: card.querySelector('.sel-g01').value,
        g02: card.querySelector('.sel-g02').value,
        g03: card.querySelector('.sel-g03').value
      };
    });
    await salvarTudo();
    renderPainel();
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
    // Preenche Maria da Penha primeiro (priorizando femininas), depois VTRs e demais
    const ordem = [...ESTADO.postos].sort((a, b) => (a.area === 'MARIA_DA_PENHA' ? -1 : 1));
    ordem.forEach((p) => {
      const prefF = p.area === 'MARIA_DA_PENHA';
      const g01 = pegar(p.area, prefF);
      const g02 = (p.area === 'CCO' || p.area === 'ESCOLAR') ? '' : pegar(p.area, prefF);
      ESTADO.equipesMontagem[eq][p.id] = { g01, g02, g03: '' };
    });
    // Se sobrar efetivo, preenche g02 do Escolar/Transito e g03 nas VTRs
    ESTADO.postos.forEach((p) => {
      if (p.area !== 'CCO' && !ESTADO.equipesMontagem[eq][p.id].g02) {
        const sobra = livres.find(a => !usados.has(a.id));
        if (sobra) { usados.add(sobra.id); ESTADO.equipesMontagem[eq][p.id].g02 = sobra.id; }
      }
    });
    ESTADO.postos.filter(p => p.area === 'PATRULHAMENTO').forEach((p) => {
      const sobra = livres.find(a => !usados.has(a.id));
      if (sobra) { usados.add(sobra.id); ESTADO.equipesMontagem[eq][p.id].g03 = sobra.id; }
    });
    renderMontagemEquipe();
    toast(`Equipe ${eq} preenchida! Clique em "Salvar Composição" para gravar.`);
  }

  // SUB 2.3: SETORES & RESPONSAVEIS (EDITAR QUEM E RESPONSAVEL POR CADA SETOR)
  function renderSetoresResponsaveis() {
    const desab = podeEditarEscala() ? '' : 'disabled';
    const nomesLista = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO').map(a => `${a.nome} (${a.matricula})`);
    const datalistHtml = `<datalist id="dlEfetivoResp">${nomesLista.map(n => `<option value="${esc(n)}">`).join('')}</datalist>`;

    $('listaSetoresResp').innerHTML = datalistHtml + ESTADO.postos.map((p, idx) => `
      <div class="posto-card" data-setor-idx="${idx}">
        <div class="grid-4">
          <div class="campo"><label>Código / Prefixo</label><input type="text" class="st-prefixo" value="${esc(p.prefixo || p.id)}" ${desab}></div>
          <div class="campo"><label>Nome do Setor / Posto</label><input type="text" class="st-nome" value="${esc(p.nome)}" ${desab}></div>
          <div class="campo"><label>Responsável pelo Setor (digite ou selecione)</label><input type="text" list="dlEfetivoResp" class="st-resp" value="${esc(p.responsavel || '')}" placeholder="Ex.: GCM Responsável pelo Setor" ${desab}></div>
          <div class="campo"><label>Área / Especialidade</label>
            <select class="st-area" ${desab}>
              ${Object.entries(AREAS_LABEL).map(([k, v]) => `<option value="${k}" ${p.area === k ? 'selected' : ''}>${v}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="campo"><label>Rótulo Curto do Setor (Cartão Programa)</label><input type="text" class="st-setor" value="${esc(p.setor || '')}" ${desab}></div>
          <div class="campo"><label>Bairros / Abrangência em Valparaíso-GO</label><input type="text" class="st-bairros" value="${esc(p.bairros || '')}" ${desab}></div>
        </div>
      </div>
    `).join('');
  }

  async function salvarSetoresResponsaveis() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    $('listaSetoresResp').querySelectorAll('.posto-card').forEach((card) => {
      const idx = Number(card.getAttribute('data-setor-idx'));
      const p = ESTADO.postos[idx];
      if (!p) return;
      p.prefixo = card.querySelector('.st-prefixo').value.trim() || p.id;
      p.nome = card.querySelector('.st-nome').value.trim() || p.nome;
      p.responsavel = card.querySelector('.st-resp').value.trim();
      p.area = card.querySelector('.st-area').value;
      p.setor = card.querySelector('.st-setor').value.trim() || p.setor;
      p.bairros = card.querySelector('.st-bairros').value.trim();
      if (ESTADO.cartoesModelo[p.id]) {
        ESTADO.cartoesModelo[p.id].setor = p.setor;
        ESTADO.cartoesModelo[p.id].prefixo = p.prefixo;
        ESTADO.cartoesModelo[p.id].bairros = p.bairros;
        ESTADO.cartoesModelo[p.id].responsavel = p.responsavel;
      }
    });
    await salvarTudo();
    atualizarTodasVistas();
  }

  function abrirModalNovoPosto() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    abrirModal(
      'Adicionar Novo Setor / Viatura',
      `
        <div class="grid-2">
          <div class="campo"><label>Código / Prefixo</label><input type="text" id="mPosId" placeholder="Ex.: VTR-05"></div>
          <div class="campo"><label>Área</label><select id="mPosArea">${Object.entries(AREAS_LABEL).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></div>
        </div>
        <div class="campo"><label>Nome do Posto / Setor</label><input type="text" id="mPosNome" placeholder="Ex.: VTR-05 — Setor 05 (Patrulhamento)"></div>
        <div class="campo"><label>Responsável pelo Setor</label><input type="text" id="mPosResp" placeholder="Ex.: Nome do guarda responsável"></div>
        <div class="campo"><label>Bairros / Cobertura</label><input type="text" id="mPosBairros" placeholder="Ex.: Bairros atendidos em Valparaíso-GO"></div>
      `,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        {
          texto: 'Adicionar Setor', classe: 'btn-primario',
          onClick: async () => {
            const id = ($('mPosId').value || '').trim().toUpperCase().replace(/\s+/g, '-');
            const nome = ($('mPosNome').value || '').trim();
            if (!id || !nome) return toast('Informe código e nome.');
            if (ESTADO.postos.some(x => x.id === id)) return toast('Código já existe.');
            const novo = {
              id, nome, area: $('mPosArea').value, setor: nome,
              bairros: $('mPosBairros').value.trim() || 'Valparaíso de Goiás',
              prefixo: id, responsavel: $('mPosResp').value.trim() || 'A definir'
            };
            ESTADO.postos.push(novo);
            ESTADO.cartoesModelo[id] = criarModeloCartaoPadrao(novo);
            await salvarTudo();
            fecharModal();
            atualizarTodasVistas();
          }
        }
      ]
    );
  }

  function renderAdmE12x36() {
    const desab = podeEditarEscala() ? '' : 'disabled';
    const nomesLista = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO').map(a => `${a.nome} (${a.matricula})`);
    const dl = `<datalist id="dlAdmEfetivo">${nomesLista.map(n => `<option value="${esc(n)}">`).join('')}</datalist>`;

    $('listaCargosAdm').innerHTML = dl + (ESTADO.administrativo || []).map((c, idx) => `
      <div class="linha-editavel" data-adm-idx="${idx}">
        <div class="campo"><label>Cargo / Setor Adm</label><input type="text" class="adm-cargo" value="${esc(c.cargo)}" ${desab}></div>
        <div class="campo"><label>Guarda / Titular</label><input type="text" list="dlAdmEfetivo" class="adm-titular" value="${esc(c.titular)}" ${desab}></div>
        ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-adm="${idx}">Excluir</button>` : ''}
        <div class="campo"><label>Horário</label><input type="text" class="adm-horario" value="${esc(c.horario || 'Seg–Sex · 08h às 17h')}" ${desab}></div>
        <div class="campo"><label>Observação</label><input type="text" class="adm-obs" value="${esc(c.obs || '')}" ${desab}></div>
      </div>
    `).join('');

    $('listaCargosAdm').querySelectorAll('[data-del-adm]').forEach((b) => {
      b.addEventListener('click', () => { ESTADO.administrativo.splice(Number(b.getAttribute('data-del-adm')), 1); renderAdmE12x36(); });
    });

    $('listaPostos12x36').innerHTML = (ESTADO.escala12x36 || []).map((e, idx) => `
      <div class="linha-editavel" data-e12-idx="${idx}">
        <div class="campo"><label>Posto / Missão 12x36</label><input type="text" class="e12-posto" value="${esc(e.posto)}" ${desab}></div>
        <div class="campo"><label>Turno</label><input type="text" class="e12-turno" value="${esc(e.turno)}" ${desab}></div>
        ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-e12="${idx}">Excluir</button>` : ''}
        <div class="campo"><label>Turma A (Ímpar)</label><input type="text" class="e12-a" value="${esc(e.equipeA || '')}" ${desab}></div>
        <div class="campo"><label>Turma B (Par)</label><input type="text" class="e12-b" value="${esc(e.equipeB || '')}" ${desab}></div>
      </div>
    `).join('');

    $('listaPostos12x36').querySelectorAll('[data-del-e12]').forEach((b) => {
      b.addEventListener('click', () => { ESTADO.escala12x36.splice(Number(b.getAttribute('data-del-e12')), 1); renderAdmE12x36(); });
    });
  }

  function renderResponsaveis() {
    const r = ESTADO.config.responsaveis || {};
    $('inpRespEscalanteNome').value = r.escalanteNome || '';
    $('inpRespEscalanteCargo').value = r.escalanteCargo || '';
    $('inpRespEscalanteMat').value = r.escalanteMat || '';
    $('inpRespComandoNome').value = r.comandoNome || '';
    $('inpRespComandoCargo').value = r.comandoCargo || '';
    $('inpRespComandoMat').value = r.comandoMat || '';
  }

  // =========================================================================
  // ABA 3: EVENTOS & OPERACOES EXTRAS (EVENTUAL — 1, 2+ VIATURAS EXTRAS)
  // =========================================================================
  function renderListaEventos() {
    const lista = ESTADO.eventos || [];
    $('badgeQtdEventos').textContent = lista.length;
    if (!lista.length) {
      $('listaEventosSidebar').innerHTML = '<div class="subtexto">Nenhum evento cadastrado.</div>';
      $('vazioEvento').classList.remove('oculto');
      $('conteudoEditorEvento').classList.add('oculto');
      return;
    }
    if (!eventoSelecionadoId || !lista.some(e => e.id === eventoSelecionadoId)) {
      eventoSelecionadoId = lista[0].id;
    }
    $('listaEventosSidebar').innerHTML = lista.map(ev => `
      <div class="item-compacto clicavel ${ev.id === eventoSelecionadoId ? 'selecionado' : ''}" data-sel-ev="${esc(ev.id)}">
        <div>
          <strong>${esc(ev.nome)}</strong>
          <div class="subtexto">${formatarDataBR(ev.data)} · ${esc(ev.inicio)}–${esc(ev.fim)} · ${(ev.viaturas || []).length} VTR(s)</div>
        </div>
        <span class="badge badge-neutro">${esc(ev.regime === 'HORA_EXTRA' ? 'Extra' : (ev.regime === 'BANCO_HORAS' ? 'Banco' : 'Turno'))}</span>
      </div>
    `).join('');

    $('listaEventosSidebar').querySelectorAll('[data-sel-ev]').forEach(el => {
      el.addEventListener('click', () => {
        eventoSelecionadoId = el.getAttribute('data-sel-ev');
        renderListaEventos();
      });
    });

    carregarEditorEvento();
  }

  function atualizarDicaFolgaEvento(dataISO) {
    if (!dataISO) return;
    const c = calcularCiclo24x72(dataISO);
    const ideal = EQUIPES.find(eq => c.mapa[eq].codigo === 'FOLGA_2') || '—';
    const folga1 = EQUIPES.find(eq => c.mapa[eq].codigo === 'FOLGA_1') || '—';
    const folga3 = EQUIPES.find(eq => c.mapa[eq].codigo === 'FOLGA_3') || '—';
    $('boxDicaFolgaEvento').innerHTML = `
      <strong>Mapa de Folgas em ${formatarDataBR(dataISO)}:</strong>
      Serviço 24h: <strong>${c.equipeServico}</strong> ·
      <strong style="color:var(--ok);">IDEAL p/ Evento Extra (2ª Folga 48h): EQUIPE ${ideal}</strong> + <strong>Administrativo (fins de semana)</strong> ·
      Evitar convocar: <strong>${folga1}</strong> (acabou de sair de 24h) e <strong>${folga3}</strong> (entra de serviço amanhã).
    `;
  }

  function carregarEditorEvento() {
    const ev = (ESTADO.eventos || []).find(x => x.id === eventoSelecionadoId);
    if (!ev) {
      $('vazioEvento').classList.remove('oculto');
      $('conteudoEditorEvento').classList.add('oculto');
      return;
    }
    $('vazioEvento').classList.add('oculto');
    $('conteudoEditorEvento').classList.remove('oculto');
    $('tituloEditorEvento').textContent = `Evento: ${ev.nome}`;
    $('inpEvNome').value = ev.nome || '';
    $('inpEvLocal').value = ev.local || '';
    $('inpEvData').value = ev.data || hojeISO();
    $('inpEvInicio').value = ev.inicio || '16:00';
    $('inpEvFim').value = ev.fim || '23:00';
    $('selEvRegime').value = ev.regime || 'HORA_EXTRA';
    $('inpEvCoord').value = ev.coordenador || '';
    $('inpEvMissao').value = ev.missao || '';
    $('inpEvObs').value = ev.obs || '';
    atualizarDicaFolgaEvento($('inpEvData').value);
    renderViaturasEvento(ev.viaturas || [], $('inpEvData').value);
  }

  function renderViaturasEvento(viaturas, dataISO) {
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    const desab = podeEditarEscala() ? '' : 'disabled';

    // Ordena deixando os de 2a Folga (IDEAL) e ADM no topo do dropdown
    const peso = (a) => {
      if (a.equipe === 'ADM') return 2;
      const c = calcularCiclo24x72(dataISO);
      const st = c.mapa[a.equipe];
      if (!st) return 3;
      if (st.codigo === 'FOLGA_2') return 1;
      if (st.codigo === 'FOLGA_3') return 4;
      if (st.codigo === 'FOLGA_1') return 5;
      return 6;
    };
    const ordenados = [...ativos].sort((a, b) => peso(a) - peso(b) || a.nome.localeCompare(b.nome));

    const opts = (sel) => {
      let h = '<option value="">— Vago / Não escalado —</option>';
      ordenados.forEach(a => {
        const tag = statusAgenteNaData(a, dataISO);
        h += `<option value="${esc(a.id)}" ${a.id === sel ? 'selected' : ''}>${esc(a.nomeGuerra)} (${esc(a.matricula)}) · [${esc(a.equipe)} — ${esc(tag)}]</option>`;
      });
      return h;
    };

    $('gridViaturasEvento').innerHTML = (viaturas || []).map((v, idx) => `
      <div class="posto-card" data-evv-idx="${idx}">
        <div class="card-cab">
          <strong>Viatura / Equipe Extra #${idx + 1}</strong>
          ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-evv="${idx}">Remover VTR</button>` : ''}
        </div>
        <div class="grid-2">
          <div class="campo"><label>Prefixo / Equipe</label><input type="text" class="evv-pref" value="${esc(v.prefixo || '')}" placeholder="Ex.: VTR-EVENTO 01" ${desab}></div>
          <div class="campo"><label>Setor / Ponto no Evento</label><input type="text" class="evv-setor" value="${esc(v.setor || '')}" placeholder="Ex.: Palco Principal / Trânsito" ${desab}></div>
        </div>
        <div class="grid-2">
          <div class="campo"><label>01 — Comandante</label><select class="evv-g01" ${desab}>${opts(v.g01)}</select></div>
          <div class="campo"><label>02 — Motorista</label><select class="evv-g02" ${desab}>${opts(v.g02)}</select></div>
        </div>
        <div class="grid-2">
          <div class="campo"><label>03 — Patrulheiro (Opcional)</label><select class="evv-g03" ${desab}>${opts(v.g03)}</select></div>
          <div class="campo"><label>04 — Apoio (Opcional)</label><select class="evv-g04" ${desab}>${opts(v.g04)}</select></div>
        </div>
      </div>
    `).join('');

    $('gridViaturasEvento').querySelectorAll('[data-del-evv]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cur = lerEventoDoEditor();
        cur.viaturas.splice(Number(btn.getAttribute('data-del-evv')), 1);
        renderViaturasEvento(cur.viaturas, cur.data);
      });
    });
  }

  function lerEventoDoEditor() {
    const viaturas = [];
    $('gridViaturasEvento').querySelectorAll('.posto-card').forEach((card, i) => {
      viaturas.push({
        id: 'evv_' + i,
        prefixo: card.querySelector('.evv-pref').value.trim() || `VTR-EVENTO 0${i + 1}`,
        setor: card.querySelector('.evv-setor').value.trim(),
        g01: card.querySelector('.evv-g01').value,
        g02: card.querySelector('.evv-g02').value,
        g03: card.querySelector('.evv-g03').value,
        g04: card.querySelector('.evv-g04').value
      });
    });
    return {
      id: eventoSelecionadoId,
      nome: $('inpEvNome').value.trim() || 'Evento Extraordinário',
      local: $('inpEvLocal').value.trim(),
      data: $('inpEvData').value || hojeISO(),
      inicio: $('inpEvInicio').value || '16:00',
      fim: $('inpEvFim').value || '23:00',
      regime: $('selEvRegime').value,
      coordenador: $('inpEvCoord').value.trim(),
      missao: $('inpEvMissao').value.trim(),
      obs: $('inpEvObs').value.trim(),
      viaturas
    };
  }

  function copiarWhatsAppEvento() {
    const ev = lerEventoDoEditor();
    const linhas = [
      `*GCM VALPARAÍSO DE GOIÁS — ESCALA DE EVENTO EXTRA*`,
      `Evento: *${ev.nome}*`,
      `Data: *${formatarDataBR(ev.data)}* | Horário: *${ev.inicio} às ${ev.fim}*`,
      `Local: ${ev.local || 'Valparaíso de Goiás'}`,
      `Modalidade: ${MODALIDADE_EVENTO[ev.regime] || ev.regime}`,
      `Coordenador: ${ev.coordenador || 'A definir'}`,
      `--------------------------------`
    ];
    (ev.viaturas || []).forEach(v => {
      linhas.push(`*${v.prefixo}* — ${v.setor || 'Apoio Geral'}`);
      const gs = [v.g01 && `01: ${nomeAgentePorId(v.g01)}`, v.g02 && `02: ${nomeAgentePorId(v.g02)}`, v.g03 && `03: ${nomeAgentePorId(v.g03)}`, v.g04 && `04: ${nomeAgentePorId(v.g04)}`].filter(Boolean);
      linhas.push(`Guarnição: ${gs.join(' | ') || 'A definir'}`);
      linhas.push('');
    });
    if (ev.obs) linhas.push(`Obs.: ${ev.obs}`);
    const txt = linhas.join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(() => toast('Escala do Evento copiada para o WhatsApp!'));
    } else {
      abrirModal('Copiar Escala do Evento', `<textarea rows="12" style="width:100%;font-family:monospace;">${esc(txt)}</textarea>`, [{ texto: 'Fechar', onClick: fecharModal }]);
    }
  }

  function gerarPdfEvento() {
    const ev = lerEventoDoEditor();
    const rows = (ev.viaturas || []).map(v => `
      <tr>
        <td><strong>${esc(v.prefixo)}</strong><br><small>${esc(v.setor)}</small></td>
        <td>${esc(nomeAgentePorId(v.g01) || '—')}</td>
        <td>${esc(nomeAgentePorId(v.g02) || '—')}</td>
        <td>${esc(nomeAgentePorId(v.g03) || '—')}</td>
        <td>${esc(nomeAgentePorId(v.g04) || '—')}</td>
      </tr>
    `).join('') || '<tr><td colspan="5">Nenhuma viatura alocada.</td></tr>';

    const corpo = `
      ${cabecalhoPdfHtml(`ORDEM DE SERVIÇO — ESCALA DE EVENTO EXTRAORDINÁRIO`, `${ev.nome} · ${formatarDataBR(ev.data)} (${ev.inicio} às ${ev.fim})`)}
      <div class="box">
        <div class="grid-info">
          <div><strong>Evento:</strong><br>${esc(ev.nome)}</div>
          <div><strong>Local:</strong><br>${esc(ev.local || 'Valparaíso de Goiás')}</div>
          <div><strong>Modalidade:</strong><br>${esc(MODALIDADE_EVENTO[ev.regime] || ev.regime)}</div>
        </div>
        <div><strong>Coordenador do Evento:</strong> ${esc(ev.coordenador || 'A definir')}</div>
        <div style="margin-top:4px;"><strong>Missão / Diretrizes:</strong> ${esc(ev.missao || '—')}</div>
      </div>
      <h2>VIATURAS E GUARNIÇÕES EMPREGADAS NO EVENTO</h2>
      <table>
        <thead><tr><th>Viatura / Setor</th><th>01 — Comandante</th><th>02 — Motorista</th><th>03 — Patrulheiro</th><th>04 — Apoio</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="box" style="margin-top:10px;"><strong>Observações e Equipamentos:</strong> ${esc(ev.obs || '—')}</div>
      ${rodapeAssinaturasPdfHtml()}
    `;
    exportarHtmlParaPdf(montarDocumentoPdf(`Evento ${ev.nome}`, corpo, false), `escala-evento-${ev.data}.pdf`, false);
  }

  // =========================================================================
  // ABA 4: CARTAO PROGRAMA
  // =========================================================================
  function popularSelectsCartao() {
    const sel = $('selCartaoPosto');
    const atual = sel.value;
    sel.innerHTML = ESTADO.postos.map(p => `<option value="${esc(p.id)}">${esc(p.nome)}</option>`).join('');
    if (atual && ESTADO.postos.some(p => p.id === atual)) sel.value = atual;
  }
  function chaveCartao(data, equipe, postoId) { return `${data}|${equipe}|${postoId}`; }

  function obterDadosCartao(data, equipe, postoId) {
    const salvo = ESTADO.cartoesDia[chaveCartao(data, equipe, postoId)];
    const posto = ESTADO.postos.find(p => p.id === postoId) || ESTADO.postos[0];
    const modelo = ESTADO.cartoesModelo[postoId] || criarModeloCartaoPadrao(posto);
    const mont = (ESTADO.equipesMontagem[equipe] && ESTADO.equipesMontagem[equipe][postoId]) || {};
    if (salvo) return JSON.parse(JSON.stringify(salvo));
    return {
      setor: modelo.setor || posto.setor,
      bairros: modelo.bairros || posto.bairros,
      prefixo: modelo.prefixo || posto.prefixo,
      responsavel: posto.responsavel || modelo.responsavel || '',
      g01: nomeAgentePorId(mont.g01) || '',
      g02: nomeAgentePorId(mont.g02) || '',
      g03: nomeAgentePorId(mont.g03) || '',
      missao: modelo.missao || '',
      pontosBase: JSON.parse(JSON.stringify(modelo.pontosBase || [])),
      obs: modelo.obs || ''
    };
  }

  function sincronizarDataCartao() {
    const data = $('inpCartaoData').value || hojeISO();
    $('inpCartaoData').value = data;
    $('selCartaoEquipe').value = calcularCiclo24x72(data).equipeServico;
    carregarEditorCartao();
  }

  function carregarEditorCartao() {
    const data = $('inpCartaoData').value || hojeISO();
    const equipe = $('selCartaoEquipe').value || 'ALFA';
    const postoId = $('selCartaoPosto').value || (ESTADO.postos[0] && ESTADO.postos[0].id);
    const posto = ESTADO.postos.find(p => p.id === postoId);
    if (!posto) return;
    const cp = obterDadosCartao(data, equipe, postoId);

    $('tituloEditorCartao').textContent = `Cartão Programa — ${posto.nome} (${formatarDataBR(data)} · Equipe ${equipe})`;
    $('badgeAreaCartao').textContent = AREAS_LABEL[posto.area] || posto.area;
    $('inpCpSetor').value = cp.setor || '';
    $('inpCpPrefixo').value = cp.prefixo || '';
    $('inpCpRespSetor').value = cp.responsavel || '';
    $('inpCpBairros').value = cp.bairros || '';
    $('inpCpG01').value = cp.g01 || '';
    $('inpCpG02').value = cp.g02 || '';
    $('inpCpG03').value = cp.g03 || '';
    $('inpCpMissao').value = cp.missao || '';
    $('inpCpObs').value = cp.obs || '';
    renderLinhasPb(cp.pontosBase || []);
  }

  function renderLinhasPb(lista) {
    const desab = podeEditarEscala() ? '' : 'disabled';
    $('tbodyPontosBase').innerHTML = (lista || []).map((item, i) => `
      <tr>
        <td><input type="text" class="pb-hora" value="${esc(item.hora || '')}" placeholder="07:00 - 09:00" ${desab}></td>
        <td><input type="text" class="pb-local" value="${esc(item.local || '')}" placeholder="Local / PB" ${desab}></td>
        <td><input type="text" class="pb-ativ" value="${esc(item.atividade || '')}" placeholder="Atividade" ${desab}></td>
        <td>${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-del-pb="${i}">X</button>` : ''}</td>
      </tr>
    `).join('');
    $('tbodyPontosBase').querySelectorAll('[data-del-pb]').forEach(b => b.addEventListener('click', () => b.closest('tr').remove()));
  }

  function lerCartaoDoEditor() {
    const pontosBase = [];
    $('tbodyPontosBase').querySelectorAll('tr').forEach((tr) => {
      const hora = tr.querySelector('.pb-hora')?.value.trim() || '';
      const local = tr.querySelector('.pb-local')?.value.trim() || '';
      const atividade = tr.querySelector('.pb-ativ')?.value.trim() || '';
      if (hora || local || atividade) pontosBase.push({ hora, local, atividade });
    });
    return {
      setor: $('inpCpSetor').value.trim(),
      prefixo: $('inpCpPrefixo').value.trim(),
      responsavel: $('inpCpRespSetor').value.trim(),
      bairros: $('inpCpBairros').value.trim(),
      g01: $('inpCpG01').value.trim(),
      g02: $('inpCpG02').value.trim(),
      g03: $('inpCpG03').value.trim(),
      missao: $('inpCpMissao').value.trim(),
      pontosBase,
      obs: $('inpCpObs').value.trim()
    };
  }

  function copiarResumoWhatsApp() {
    const data = $('inpCartaoData').value || hojeISO();
    const equipe = $('selCartaoEquipe').value;
    const linhas = [
      `*GCM VALPARAÍSO DE GOIÁS — CARTÃO PROGRAMA*`,
      `Data: *${formatarDataBR(data)}* | Turno: *${ESTADO.config.horarioTroca}*`,
      `Equipe 24x72: *EQUIPE ${equipe}*`,
      `--------------------------------`
    ];
    ESTADO.postos.forEach((p) => {
      const cp = obterDadosCartao(data, equipe, p.id);
      linhas.push(`*${cp.prefixo || p.id} — ${cp.setor}*`);
      if (cp.responsavel) linhas.push(`Resp. Setor: ${cp.responsavel}`);
      linhas.push(`Cobertura: ${cp.bairros}`);
      const g = [cp.g01 && `01: ${cp.g01}`, cp.g02 && `02: ${cp.g02}`, cp.g03 && `03: ${cp.g03}`].filter(Boolean).join(' | ');
      linhas.push(`Guarnição: ${g || 'A definir'}`);
      linhas.push(`Missão: ${cp.missao}`);
      (cp.pontosBase || []).forEach(pb => linhas.push(`  - [${pb.hora}] ${pb.local}: ${pb.atividade}`));
      linhas.push('');
    });
    const txt = linhas.join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(() => toast('Resumo copiado para o WhatsApp!'));
    } else {
      abrirModal('Copiar WhatsApp', `<textarea rows="14" style="width:100%;font-family:monospace;">${esc(txt)}</textarea>`, [{ texto: 'Fechar', onClick: fecharModal }]);
    }
  }

  // =========================================================================
  // ABA 5: FOLHA DE PONTO (CAMERA AO VIVO + GPS ANTIFRAUDE 7 CAMADAS)
  // =========================================================================
  function popularSelectsPonto() {
    const sel = $('selPontoAgente');
    const flt = $('fltPontoAgente');
    const ativos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO');
    sel.innerHTML = ativos.map(a => `<option value="${esc(a.id)}">${esc(a.nome)} (${esc(a.matricula)}) · ${esc(a.equipe)}</option>`).join('');
    flt.innerHTML = '<option value="">Todos os Agentes</option>' + ativos.map(a => `<option value="${esc(a.id)}">${esc(a.nome)} (${esc(a.matricula)})</option>`).join('');

    if (!podeEditarEscala() && SESSAO && SESSAO.matricula) {
      const meu = ativos.find(a => (a.matricula || '').toUpperCase() === SESSAO.matricula.toUpperCase());
      if (meu) { sel.value = meu.id; sel.disabled = true; }
      else sel.disabled = false;
    } else sel.disabled = false;

    $('selPontoEquipe').value = calcularCiclo24x72(hojeISO()).equipeServico;
    if (!$('fltPontoMes').value) $('fltPontoMes').value = mesAtualISO();
  }

  async function abrirCameraAoVivo() {
    pararCamera();
    try {
      streamCamera = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      const v = $('videoCamera');
      v.srcObject = streamCamera;
      v.classList.remove('oculto');
      $('placeholderCamera').classList.add('oculto');
      $('imgPreviewFoto').classList.add('oculto');
      $('btnCapturarFoto').disabled = false;
      $('btnRefazerFoto').disabled = true;
      $('statusFoto').textContent = 'Câmera ativa';
      $('statusFoto').className = 'badge badge-warn';
    } catch (e) {
      toast('Não foi possível abrir a câmera. Verifique a permissão (HTTPS obrigatório no celular).');
    }
  }

  function pararCamera() {
    if (streamCamera) { streamCamera.getTracks().forEach(t => t.stop()); streamCamera = null; }
  }

  function capturarFotoComCarimbo() {
    const video = $('videoCamera');
    const canvas = $('canvasFoto');
    if (!video || !video.videoWidth) return toast('Aguarde a câmera carregar.');
    const w = 480;
    const h = Math.round((video.videoHeight / video.videoWidth) * w) || 360;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);

    const ag = ESTADO.efetivo.find(a => a.id === $('selPontoAgente').value);
    const tipo = $('selPontoTipo').value;
    const agora = formatarDataHoraBR(new Date().toISOString());
    const coordTxt = auditoriaGpsAtual && auditoriaGpsAtual.lat
      ? `GPS: ${auditoriaGpsAtual.lat.toFixed(5)}, ${auditoriaGpsAtual.lon.toFixed(5)} (±${Math.round(auditoriaGpsAtual.accuracy)}m)`
      : 'GPS: Validado na assinatura';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
    ctx.fillRect(0, h - 58, w, 58);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`GCM VALPARAÍSO-GO · PONTO ${tipo} · ${agora}`, 10, h - 38);
    ctx.font = '11px monospace';
    ctx.fillText(`AGENTE: ${ag ? ag.nome + ' (' + ag.matricula + ')' : (SESSAO?.nome || '—')}`, 10, h - 22);
    ctx.fillText(coordTxt, 10, h - 8);

    fotoCapturadaDataUrl = canvas.toDataURL('image/jpeg', 0.68);
    pararCamera();
    video.classList.add('oculto');
    const img = $('imgPreviewFoto');
    img.src = fotoCapturadaDataUrl;
    img.classList.remove('oculto');
    $('btnCapturarFoto').disabled = true;
    $('btnRefazerFoto').disabled = false;
    $('statusFoto').textContent = 'Foto ao vivo OK';
    $('statusFoto').className = 'badge badge-ok';
  }

  function distanciaMetros(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = (v) => (v * Math.PI) / 180;
    const a = Math.sin(toRad(lat2 - lat1) / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(toRad(lon2 - lon1) / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  async function consultarEnderecoReal(lat, lon) {
    const fetchJson = async (url, ms) => {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), ms || 4500);
      try {
        const r = await fetch(url, { signal: ctrl.signal });
        clearTimeout(t);
        return r.ok ? await r.json() : null;
      } catch (e) { clearTimeout(t); return null; }
    };
    const nom = await fetchJson(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=pt-BR`, 4500);
    if (nom && nom.address) {
      const a = nom.address;
      const rua = a.road || a.pedestrian || a.neighbourhood || a.suburb || '';
      const num = a.house_number ? `, ${a.house_number}` : '';
      const bairro = a.suburb || a.neighbourhood || a.quarter || '';
      const cid = a.city || a.town || a.municipality || a.village || '';
      const uf = a.state_code || a.state || '';
      const cep = a.postcode ? ` — CEP ${a.postcode}` : '';
      const montado = [rua + num, bairro, cid, uf].filter(Boolean).join(', ') + cep;
      if (montado.trim()) return { confirmado: true, texto: montado, fonte: 'OpenStreetMap' };
    }
    const ph = await fetchJson(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`, 4000);
    if (ph && ph.features && ph.features[0]?.properties) {
      const p = ph.features[0].properties;
      const montado = [p.street || p.name, p.district || p.locality, p.city, p.state].filter(Boolean).join(', ');
      if (montado.trim()) return { confirmado: true, texto: montado, fonte: 'Photon' };
    }
    const bdc = await fetchJson(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`, 4000);
    if (bdc && (bdc.city || bdc.locality)) {
      return { confirmado: true, texto: [bdc.locality, bdc.city, bdc.principalSubdivision].filter(Boolean).join(', '), fonte: 'BigDataCloud' };
    }
    return { confirmado: false, texto: `Localidade não confirmada (offline) · Lat ${lat.toFixed(6)}, Lon ${lon.toFixed(6)}`, fonte: 'Offline' };
  }

  async function consultarHoraRede() {
    for (const u of ['https://timeapi.io/api/Time/current/zone?timeZone=America/Sao_Paulo', 'https://worldtimeapi.org/api/timezone/America/Sao_Paulo']) {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 3500);
        const r = await fetch(u, { signal: ctrl.signal });
        clearTimeout(t);
        if (!r.ok) continue;
        const j = await r.json();
        const iso = j.dateTime || j.datetime || j.utc_datetime;
        if (iso) {
          const dt = new Date(iso);
          if (!isNaN(dt.getTime())) return { ok: true, timestampMs: dt.getTime(), iso: dt.toISOString() };
        }
      } catch (e) {}
    }
    return { ok: false };
  }

  async function consultarIpGeo() {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 3500);
      const r = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
      clearTimeout(t);
      if (!r.ok) return null;
      const j = await r.json();
      if (j && typeof j.latitude === 'number' && typeof j.longitude === 'number') {
        return { ip: j.ip || '', cidade: j.city || '', regiao: j.region || '', lat: j.latitude, lon: j.longitude };
      }
    } catch (e) {}
    return null;
  }

  async function coletarGpsAntifraude() {
    if (!navigator.geolocation) return toast('Dispositivo sem geolocalização.');
    const btn = $('btnColetarGpsAntifraude');
    btn.disabled = true;
    btn.textContent = 'Coletando leituras reais de satélite (4s)...';
    $('statusGpsBadge').textContent = 'Auditando...';
    $('statusGpsBadge').className = 'badge badge-warn';

    const amostras = [];
    let erroGeo = null;
    await new Promise((resolve) => {
      let fim = false;
      const done = () => { if (fim) return; fim = true; try { navigator.geolocation.clearWatch(wid); } catch (e) {} resolve(); };
      const wid = navigator.geolocation.watchPosition(
        (pos) => {
          const c = pos.coords;
          amostras.push({
            lat: c.latitude, lon: c.longitude, accuracy: c.accuracy, altitude: c.altitude,
            ts: pos.timestamp || Date.now(),
            mocked: !!(pos.mocked || c.mocked || (window.AndroidBridge && window.AndroidBridge.isMockLocation && window.AndroidBridge.isMockLocation()))
          });
          if (amostras.length >= 4) done();
        },
        (err) => { erroGeo = err; done(); },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
      setTimeout(done, 4200);
    });

    btn.disabled = false;
    btn.textContent = 'Revalidar Localização Real (Anti-Fake GPS)';

    if (!amostras.length) {
      $('statusGpsBadge').textContent = 'Falha GPS';
      $('statusGpsBadge').className = 'badge badge-erro';
      $('painelResultadoGps').classList.remove('oculto');
      $('painelResultadoGps').innerHTML = `<div class="alerta-inline erro">Falha ao obter GPS (${esc(erroGeo ? erroGeo.message : 'GPS desligado ou bloqueado')}).</div>`;
      return;
    }

    const ultima = amostras[amostras.length - 1];
    let score = 100;
    const alertas = [];
    const checksOk = [`${amostras.length} leitura(s) GPS sem cache (±${Math.round(ultima.accuracy)}m)`];

    if (amostras.some(a => a.mocked)) {
      score -= 80;
      alertas.push('CRÍTICO: Localização simulada (Fake GPS) detectada pelo sistema.');
    }
    if (amostras.length >= 2) {
      const congelado = amostras.every(a => a.lat === amostras[0].lat && a.lon === amostras[0].lon);
      if (congelado && [0, 1, 3, 5, 10].includes(ultima.accuracy) && ultima.altitude === null) {
        score -= 40;
        alertas.push('SUSPEITA: Coordenadas congeladas + precisão artificial cravada.');
      } else checksOk.push('Telemetria de satélite coerente.');
      for (let i = 1; i < amostras.length; i++) {
        const dist = distanciaMetros(amostras[i-1].lat, amostras[i-1].lon, amostras[i].lat, amostras[i].lon);
        const dtS = Math.max(0.5, (amostras[i].ts - amostras[i-1].ts) / 1000);
        if (dist > 120 && (dist / dtS) * 3.6 > 160) {
          score -= 55;
          alertas.push(`CRÍTICO: Salto impossível detectado (${Math.round(dist)}m em ${dtS.toFixed(1)}s).`);
          break;
        }
      }
    }

    const ultPonto = (ESTADO.pontos || []).find(p => p.agenteId === $('selPontoAgente').value && p.auditoria?.lat);
    if (ultPonto) {
      const dtH = Math.abs(Date.now() - new Date(ultPonto.timestampIso).getTime()) / 3600000;
      const distKm = distanciaMetros(ultPonto.auditoria.lat, ultPonto.auditoria.lon, ultima.lat, ultima.lon) / 1000;
      if (dtH > 0.002 && dtH < 12 && (distKm / dtH) > 160 && distKm > 10) {
        score -= 50;
        alertas.push(`TELETRANSPORTE: ${distKm.toFixed(1)} km em ${(dtH * 60).toFixed(0)} min desde o último ponto.`);
      }
    }
    if (ultima.accuracy > 250) {
      score -= 15;
      alertas.push(`ATENÇÃO: Precisão de GPS baixa (±${Math.round(ultima.accuracy)}m).`);
    }

    const [horaRede, ipGeo, endReal] = await Promise.all([consultarHoraRede(), consultarIpGeo(), consultarEnderecoReal(ultima.lat, ultima.lon)]);
    let relogioDeltaSeg = null;
    let horaOficialIso = new Date().toISOString();
    if (horaRede.ok) {
      relogioDeltaSeg = Math.round((Date.now() - horaRede.timestampMs) / 1000);
      horaOficialIso = horaRede.iso;
      if (Math.abs(relogioDeltaSeg) > 180) {
        score -= 35;
        alertas.push(`RELÓGIO ADULTERADO (${Math.abs(relogioDeltaSeg)}s de diferença). Aplicado horário oficial.`);
      } else checksOk.push('Relógio validado com hora oficial.');
    }
    if (ipGeo) {
      const dIp = distanciaMetros(ultima.lat, ultima.lon, ipGeo.lat, ipGeo.lon) / 1000;
      if (dIp > 450) {
        score -= 25;
        alertas.push(`DIVERGÊNCIA DE REDE/VPN: IP em ${ipGeo.cidade}/${ipGeo.regiao} (${Math.round(dIp)} km do GPS).`);
      } else checksOk.push(`Rede coerente (${ipGeo.cidade || 'Região'}/${ipGeo.regiao || 'GO-DF'}).`);
    }

    const distBase = Math.round(distanciaMetros(ultima.lat, ultima.lon, Number(ESTADO.config.baseLat || -16.0658), Number(ESTADO.config.baseLon || -47.9756)));
    const raio = Number(ESTADO.config.baseRaioMetros || 500);
    const resumoDistancia = distBase < 1000 ? `${distBase}m da Base` : `${(distBase / 1000).toFixed(2)} km da Base`;
    if (distBase > raio) {
      score -= 20;
      alertas.push(`FORA DA CERCA DA BASE: ${resumoDistancia} (raio: ${raio}m).`);
    } else checksOk.push(`DENTRO DO PERÍMETRO DA BASE (${resumoDistancia}).`);

    score = Math.max(0, Math.min(100, score));
    const status = score >= 80 ? 'VERIFICADO' : (score >= 50 ? 'ATENCAO' : 'SUSPEITO');

    auditoriaGpsAtual = {
      lat: ultima.lat, lon: ultima.lon, accuracy: Math.round(ultima.accuracy), amostrasQtd: amostras.length,
      distanciaBaseM: distBase, resumoDistancia, dentroCerca: distBase <= raio,
      endereco: endReal.texto, enderecoFonte: endReal.fonte, relogioDeltaSeg, horaOficialIso,
      ipInfo: ipGeo ? `${ipGeo.ip} (${ipGeo.cidade}/${ipGeo.regiao})` : 'Offline',
      score, status, alertas, checksOk
    };

    const cls = status === 'VERIFICADO' ? 'badge-ok' : (status === 'ATENCAO' ? 'badge-warn' : 'badge-erro');
    $('statusGpsBadge').textContent = `${status} · ${score}%`;
    $('statusGpsBadge').className = 'badge ' + cls;
    $('painelResultadoGps').classList.remove('oculto');
    $('painelResultadoGps').innerHTML = `
      <div><strong>Endereço (${esc(endReal.fonte)}):</strong> ${esc(endReal.texto)}</div>
      <div><strong>GPS:</strong> ${ultima.lat.toFixed(6)}, ${ultima.lon.toFixed(6)} (±${Math.round(ultima.accuracy)}m) · <strong>${esc(resumoDistancia)}</strong></div>
      ${checksOk.map(c => `<div style="color:var(--ok);">[OK] ${esc(c)}</div>`).join('')}
      ${alertas.map(a => `<div style="color:var(--danger);font-weight:700;">[ALERTA] ${esc(a)}</div>`).join('')}
    `;
    toast(`Auditoria concluída: ${status} (${score}%).`);
  }

  async function confirmarRegistroPonto() {
    const errBox = $('msgPontoErro');
    errBox.classList.add('oculto');
    const ag = ESTADO.efetivo.find(a => a.id === $('selPontoAgente').value);
    if (!ag) { errBox.textContent = 'Selecione um agente.'; errBox.classList.remove('oculto'); return; }
    if (!fotoCapturadaDataUrl) { errBox.textContent = 'Foto ao vivo obrigatória!'; errBox.classList.remove('oculto'); return; }
    if (!auditoriaGpsAtual) { errBox.textContent = 'Valide a localização real antes de confirmar!'; errBox.classList.remove('oculto'); return; }
    if (auditoriaGpsAtual.status === 'SUSPEITO' && ESTADO.config.acaoSuspeita === 'BLOQUEAR') {
      errBox.textContent = 'BLOQUEADO: Suspeita grave de localização simulada/adulterada.'; errBox.classList.remove('oculto'); return;
    }

    const agoraIso = auditoriaGpsAtual.horaOficialIso || new Date().toISOString();
    const dt = new Date(agoraIso);
    const p2 = (n) => String(n).padStart(2, '0');
    const dataLocal = `${dt.getFullYear()}-${p2(dt.getMonth()+1)}-${p2(dt.getDate())}`;
    const horaLocal = `${p2(dt.getHours())}:${p2(dt.getMinutes())}:${p2(dt.getSeconds())}`;
    const tipo = $('selPontoTipo').value;
    const prevHash = (ESTADO.pontos[0] && ESTADO.pontos[0].hashIntegridade) || 'GENESIS_GCM_VALP_V2';
    const hashIntegridade = window.EscalaCloud.sha256Hex(`${prevHash}|${ag.matricula}|${tipo}|${agoraIso}|${auditoriaGpsAtual.lat.toFixed(6)}|${auditoriaGpsAtual.lon.toFixed(6)}|${auditoriaGpsAtual.score}`);

    ESTADO.pontos.unshift({
      id: 'pt_' + Date.now().toString(36),
      agenteId: ag.id, agenteNome: ag.nome, agenteMatricula: ag.matricula,
      registradoPor: SESSAO ? SESSAO.login : 'sistema',
      tipo, equipe: $('selPontoEquipe').value, posto: $('inpPontoPosto').value.trim() || 'Base GCM',
      obs: $('inpPontoObs').value.trim(),
      timestampIso: agoraIso, dataLocal, horaLocal,
      foto: fotoCapturadaDataUrl, auditoria: auditoriaGpsAtual, hashIntegridade
    });
    await salvarTudo(true);

    fotoCapturadaDataUrl = null; auditoriaGpsAtual = null;
    $('imgPreviewFoto').classList.add('oculto');
    $('placeholderCamera').classList.remove('oculto');
    $('statusFoto').textContent = 'Pendente'; $('statusFoto').className = 'badge badge-neutro';
    $('btnRefazerFoto').disabled = true;
    $('statusGpsBadge').textContent = 'Não coletado'; $('statusGpsBadge').className = 'badge badge-neutro';
    $('painelResultadoGps').classList.add('oculto');
    $('inpPontoObs').value = '';
    renderTabelaPontos();
    renderPainel();
    toast(`Ponto de ${tipo} assinado com selo SHA-256!`);
  }

  function filtrarPontos() {
    const mes = $('fltPontoMes').value || '';
    const agId = $('fltPontoAgente').value || '';
    const st = $('fltPontoStatus').value || '';
    return (ESTADO.pontos || []).filter(p => {
      if (mes && !(p.dataLocal || '').startsWith(mes)) return false;
      if (agId && p.agenteId !== agId) return false;
      if (st && (p.auditoria?.status || '') !== st) return false;
      return true;
    });
  }

  function renderTabelaPontos() {
    const lista = filtrarPontos();
    $('badgeTotalPontosFiltrados').textContent = `${lista.length} registro(s)`;
    if (!lista.length) {
      $('tbodyPontos').innerHTML = '<tr><td colspan="6" class="subtexto" style="text-align:center;padding:18px;">Nenhum registro de ponto neste filtro.</td></tr>';
      return;
    }
    $('tbodyPontos').innerHTML = lista.map((p) => {
      const st = p.auditoria?.status || '—';
      const cls = st === 'VERIFICADO' ? 'badge-ok' : (st === 'ATENCAO' ? 'badge-warn' : 'badge-erro');
      return `
        <tr>
          <td><img src="${p.foto}" class="foto-thumb" data-ver-ponto="${esc(p.id)}" alt="Foto"></td>
          <td><strong>${formatarDataBR(p.dataLocal)}</strong><div class="subtexto">${esc(p.horaLocal)}</div></td>
          <td><strong>${esc(p.agenteNome)}</strong><div class="subtexto">${esc(p.agenteMatricula)} · ${esc(p.equipe)} · ${esc(p.posto)}</div></td>
          <td><span class="badge ${p.tipo === 'ENTRADA' ? 'badge-invertido' : 'badge-neutro'}">${esc(p.tipo)}</span></td>
          <td><div style="max-width:220px;font-size:12px;">${esc(p.auditoria?.endereco || '—')}</div><div class="subtexto">${esc(p.auditoria?.resumoDistancia || '')}</div></td>
          <td><span class="badge ${cls}">${esc(st)} (${p.auditoria?.score ?? 0}%)</span><div class="subtexto" style="font-size:10px;">SHA: ${esc((p.hashIntegridade || '').slice(0, 10))}...</div></td>
        </tr>
      `;
    }).join('');

    $('tbodyPontos').querySelectorAll('[data-ver-ponto]').forEach(img => {
      img.addEventListener('click', () => {
        const pt = ESTADO.pontos.find(x => x.id === img.getAttribute('data-ver-ponto'));
        if (!pt) return;
        const a = pt.auditoria || {};
        abrirModal(
          `Auditoria de Ponto — ${pt.agenteNome} (${pt.tipo})`,
          `
            <div style="text-align:center;"><img src="${pt.foto}" style="max-width:100%;border-radius:8px;border:1px solid var(--border);"></div>
            <div class="box-borda" style="font-size:12px;display:flex;flex-direction:column;gap:5px;">
              <div><strong>Agente:</strong> ${esc(pt.agenteNome)} (${esc(pt.agenteMatricula)})</div>
              <div><strong>Data/Hora:</strong> ${formatarDataBR(pt.dataLocal)} às ${esc(pt.horaLocal)}</div>
              <div><strong>Endereço:</strong> ${esc(a.endereco || '—')}</div>
              <div><strong>GPS:</strong> ${a.lat ? a.lat.toFixed(6) + ', ' + a.lon.toFixed(6) : '—'} (±${a.accuracy || 0}m · ${esc(a.resumoDistancia || '')})</div>
              <div><strong>IP/Rede:</strong> ${esc(a.ipInfo || '—')}</div>
              <div><strong>Antifraude:</strong> ${esc(a.status || '—')} (${a.score ?? 0}%)</div>
              ${(a.alertas || []).length ? `<div style="color:var(--danger);font-weight:700;">Alertas: ${esc(a.alertas.join(' | '))}</div>` : '<div style="color:var(--ok);font-weight:700;">Sem indícios de fraude.</div>'}
              <div><strong>SHA-256:</strong> <code style="word-break:break-all;">${esc(pt.hashIntegridade)}</code></div>
            </div>
          `,
          [
            ...(isAdmin() ? [{ texto: 'Excluir (Admin)', classe: 'btn-perigo', onClick: async () => {
              if (!confirm('Excluir este ponto?')) return;
              ESTADO.pontos = ESTADO.pontos.filter(x => x.id !== pt.id);
              await salvarTudo(); fecharModal(); renderTabelaPontos(); renderPainel();
            }}] : []),
            { texto: 'Fechar', classe: 'btn-sec', onClick: fecharModal }
          ]
        );
      });
    });
  }

  // =========================================================================
  // ABA 6: EFETIVO (64 DO PDF) & BANCO DE DADOS SEPARADO
  // =========================================================================
  function renderEfetivo() {
    const busca = ($('fltEfBusca').value || '').trim().toLowerCase();
    const origem = $('fltEfOrigem').value || '';
    const eq = $('fltEfEquipe').value || '';

    const lista = (ESTADO.efetivo || []).filter(a => {
      if (origem && a.origem !== origem) return false;
      if (eq && a.equipe !== eq) return false;
      if (busca && !(a.nome.toLowerCase().includes(busca) || (a.nomeGuerra || '').toLowerCase().includes(busca) || (a.matricula || '').toLowerCase().includes(busca))) return false;
      return true;
    });

    $('tbodyEfetivo').innerHTML = lista.map(a => `
      <tr>
        <td><strong>${esc(a.matricula)}</strong></td>
        <td><strong>${esc(a.nome)}</strong><div class="subtexto">${esc(a.nomeGuerra || '')}</div></td>
        <td>
          <span class="badge ${a.origem === 'VAGA_IMEDIATA' ? 'badge-invertido' : 'badge-neutro'}">${a.origem === 'VAGA_IMEDIATA' ? 'Vaga Imediata' : 'Cadastro Reserva'}</span>
          <div class="subtexto">${esc(a.classificacao || '')}</div>
        </td>
        <td><span class="badge badge-invertido">${esc(a.equipe)}</span></td>
        <td>${esc(AREAS_LABEL[a.area] || a.area)}</td>
        <td>${esc(a.regime || '24X72')}</td>
        <td><span class="badge ${a.situacao === 'ATIVO' ? 'badge-ok' : 'badge-warn'}">${esc(a.situacao)}</span></td>
        <td>
          ${podeEditarEscala() ? `<button type="button" class="btn btn-sec btn-sm" data-ed-ag="${esc(a.id)}">Editar</button> <button type="button" class="btn btn-sec btn-sm" data-del-ag="${esc(a.id)}">X</button>` : '—'}
        </td>
      </tr>
    `).join('');

    $('tbodyEfetivo').querySelectorAll('[data-ed-ag]').forEach(b => b.addEventListener('click', () => abrirModalAgente(ESTADO.efetivo.find(x => x.id === b.getAttribute('data-ed-ag')))));
    $('tbodyEfetivo').querySelectorAll('[data-del-ag]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('Remover integrante?')) return;
      ESTADO.efetivo = ESTADO.efetivo.filter(x => x.id !== b.getAttribute('data-del-ag'));
      await salvarTudo(); atualizarTodasVistas();
    }));
  }

  function abrirModalAgente(agente) {
    const a = agente || { id: '', matricula: '', nome: '', nomeGuerra: '', sexo: 'M', origem: 'VAGA_IMEDIATA', classificacao: '', telefone: '', equipe: 'ALFA', area: 'PATRULHAMENTO', funcao: 'PATRULHEIRO_03', regime: '24X72', situacao: 'ATIVO' };
    abrirModal(
      agente ? 'Editar Integrante GCM' : 'Novo Integrante GCM',
      `
        <div class="grid-2">
          <div class="campo"><label>Nome Completo</label><input type="text" id="mAgNome" value="${esc(a.nome)}"></div>
          <div class="campo"><label>Nome de Guerra</label><input type="text" id="mAgGuerra" value="${esc(a.nomeGuerra)}"></div>
        </div>
        <div class="grid-3">
          <div class="campo"><label>Matrícula</label><input type="text" id="mAgMat" value="${esc(a.matricula)}"></div>
          <div class="campo"><label>Origem Concurso</label>
            <select id="mAgOrigem">
              <option value="VAGA_IMEDIATA" ${a.origem === 'VAGA_IMEDIATA' ? 'selected' : ''}>Vaga Imediata</option>
              <option value="CADASTRO_RESERVA" ${a.origem === 'CADASTRO_RESERVA' ? 'selected' : ''}>Cadastro Reserva</option>
            </select>
          </div>
          <div class="campo"><label>Classificação / Obs.</label><input type="text" id="mAgClass" value="${esc(a.classificacao || '')}"></div>
        </div>
        <div class="grid-2">
          <div class="campo"><label>Equipe / Alocação</label>
            <select id="mAgEquipe">${['ALFA','BRAVO','CHARLIE','DELTA','ADM','12X36','RESERVA'].map(e => `<option value="${e}" ${a.equipe === e ? 'selected' : ''}>${e}</option>`).join('')}</select>
          </div>
          <div class="campo"><label>Especialidade</label>
            <select id="mAgArea">${Object.entries(AREAS_LABEL).map(([k, v]) => `<option value="${k}" ${a.area === k ? 'selected' : ''}>${v}</option>`).join('')}</select>
          </div>
        </div>
        <div class="grid-3">
          <div class="campo"><label>Função</label><select id="mAgFuncao">${Object.entries(FUNCOES_LABEL).map(([k, v]) => `<option value="${k}" ${a.funcao === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
          <div class="campo"><label>Regime</label><select id="mAgRegime">${['24X72','ADM_SEG_SEX','12X36'].map(r => `<option value="${r}" ${a.regime === r ? 'selected' : ''}>${r}</option>`).join('')}</select></div>
          <div class="campo"><label>Situação</label><select id="mAgSit">${['ATIVO','RESERVA','FERIAS','LICENCA','AFASTADO'].map(s => `<option value="${s}" ${a.situacao === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
        </div>
      `,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        {
          texto: 'Salvar', classe: 'btn-primario',
          onClick: async () => {
            const nome = $('mAgNome').value.trim();
            if (!nome) return toast('Informe o nome.');
            const eqSel = $('mAgEquipe').value;
            const obj = {
              id: a.id || 'ag_' + Date.now().toString(36),
              matricula: $('mAgMat').value.trim().toUpperCase() || ('GCM-' + String(ESTADO.efetivo.length + 1).padStart(3, '0')),
              nome, nomeGuerra: $('mAgGuerra').value.trim() || gerarNomeGuerra(nome),
              sexo: a.sexo || 'M', origem: $('mAgOrigem').value, classificacao: $('mAgClass').value.trim(),
              telefone: a.telefone || '', equipe: eqSel, area: $('mAgArea').value,
              funcao: $('mAgFuncao').value,
              regime: eqSel === 'ADM' ? 'ADM_SEG_SEX' : $('mAgRegime').value,
              situacao: $('mAgSit').value
            };
            if (agente) {
              const i = ESTADO.efetivo.findIndex(x => x.id === a.id);
              if (i >= 0) ESTADO.efetivo[i] = obj;
            } else ESTADO.efetivo.push(obj);
            await salvarTudo(); fecharModal(); atualizarTodasVistas();
          }
        }
      ]
    );
  }

  function abrirModalImportar64() {
    if (!podeEditarEscala()) return toast('Sem permissão.');
    abrirModal(
      'Importar / Colar Nomes em Massa',
      `
        <p class="subtexto">Cole 1 nome por linha (ou <code>Nome ; Matrícula ; Equipe</code>).</p>
        <textarea id="txtImportarNomes" rows="9" placeholder="Nome Completo 1&#10;Nome Completo 2 ; GCM-065 ; ALFA"></textarea>
        <label class="check-linha"><input type="checkbox" id="chkSubstituirModelo"><span>Substituir a lista atual (desmarcado = apenas adicionar)</span></label>
      `,
      [
        { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
        {
          texto: 'Importar', classe: 'btn-primario',
          onClick: async () => {
            const linhas = ($('txtImportarNomes').value || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
            if (!linhas.length) return toast('Cole ao menos um nome.');
            const novos = linhas.map((l, i) => {
              const p = l.split(/[;|\t]/).map(x => x.trim());
              return {
                id: 'ag_imp_' + Date.now().toString(36) + '_' + i,
                matricula: (p[1] || ('GCM-' + String(ESTADO.efetivo.length + i + 1).padStart(3, '0'))).toUpperCase(),
                nome: p[0], nomeGuerra: gerarNomeGuerra(p[0]), sexo: 'M',
                origem: 'VAGA_IMEDIATA', classificacao: 'Importado', telefone: '',
                equipe: p[2] || EQUIPES[i % 4], area: 'PATRULHAMENTO', funcao: 'PATRULHEIRO_03',
                regime: '24X72', situacao: 'ATIVO'
              };
            });
            ESTADO.efetivo = $('chkSubstituirModelo').checked ? novos : ESTADO.efetivo.concat(novos);
            await salvarTudo(); fecharModal(); atualizarTodasVistas();
            toast(`${novos.length} nome(s) importado(s)!`);
          }
        }
      ]
    );
  }

  function renderContas() {
    const users = window.EscalaCloud.lerUsuariosLocal();
    const adm = isAdmin();
    $('tbodyContas').innerHTML = users.map(u => `
      <tr>
        <td><strong>${esc(u.login)}</strong> ${u.mestre ? '<span class="badge badge-invertido">Mestre</span>' : ''}</td>
        <td>${esc(u.nome)}</td><td>${esc(u.matricula || '—')}</td>
        <td>${adm && !u.mestre ? `<select data-perfil-u="${esc(u.login)}"><option value="ADMIN" ${u.perfil === 'ADMIN' ? 'selected' : ''}>Administrador</option><option value="ESCALANTE" ${u.perfil === 'ESCALANTE' ? 'selected' : ''}>Escalante</option><option value="AGENTE" ${u.perfil === 'AGENTE' ? 'selected' : ''}>Agente GCM</option></select>` : `<span class="badge badge-neutro">${esc(u.perfil)}</span>`}</td>
        <td><span class="badge ${u.aprovado ? 'badge-ok' : 'badge-warn'}">${u.aprovado ? 'Aprovado' : 'Pendente'}</span></td>
        <td>${adm && !u.mestre ? `<button type="button" class="btn btn-sec btn-sm" data-aprovar-u="${esc(u.login)}">${u.aprovado ? 'Bloquear' : 'Aprovar'}</button> <button type="button" class="btn btn-sec btn-sm" data-del-u="${esc(u.login)}">Excluir</button>` : '—'}</td>
      </tr>
    `).join('');
    $('tbodyContas').querySelectorAll('[data-perfil-u]').forEach(s => s.addEventListener('change', () => { window.EscalaCloud.atualizarUsuario(s.getAttribute('data-perfil-u'), { perfil: s.value }); salvarTudo(true); toast('Perfil atualizado.'); }));
    $('tbodyContas').querySelectorAll('[data-aprovar-u]').forEach(b => b.addEventListener('click', () => {
      const l = b.getAttribute('data-aprovar-u');
      const u = window.EscalaCloud.lerUsuariosLocal().find(x => x.login === l);
      if (u) { window.EscalaCloud.atualizarUsuario(l, { aprovado: !u.aprovado }); renderContas(); salvarTudo(true); }
    }));
    $('tbodyContas').querySelectorAll('[data-del-u]').forEach(b => b.addEventListener('click', () => {
      if (!confirm('Excluir conta?')) return;
      window.EscalaCloud.removerUsuario(b.getAttribute('data-del-u')); renderContas(); salvarTudo(true);
    }));
  }

  function renderConfigBase() {
    $('inpBaseNome').value = ESTADO.config.baseNome || '';
    $('inpBaseLat').value = ESTADO.config.baseLat ?? -16.0658;
    $('inpBaseLon').value = ESTADO.config.baseLon ?? -47.9756;
    $('inpBaseRaio').value = ESTADO.config.baseRaioMetros ?? 500;
    $('selBloquearSuspeito').value = ESTADO.config.acaoSuspeita || 'ALERTAR';
    $('chkNuvemAtiva').checked = !!ESTADO.config.nuvemAtiva;
    const fbCfg = window.EscalaCloud.lerConfigFirebase();
    $('txtFirebaseConfigJson').value = fbCfg ? JSON.stringify(fbCfg, null, 2) : '';
    $('statusDbProprio').textContent = fbCfg
      ? `Projeto conectado: ${fbCfg.projectId} (100% isolado do CCO Viaturas) · Sincronização: ${ESTADO.config.nuvemAtiva ? 'ATIVA' : 'Pausada'}`
      : 'Status: Modo Local/Offline (nenhum projeto Firebase conectado).';
  }

  // =========================================================================
  // PDFS OFICIAIS (PRETO & BRANCO INSTITUCIONAL — ZERO AZUL)
  // =========================================================================
  function cabecalhoPdfHtml(titulo, subtitulo) {
    return `<div class="pdf-cab"><img src="__LOGO__" class="pdf-logo" onerror="this.style.display='none'"><div><div class="pdf-org">PREFEITURA MUNICIPAL DE VALPARAÍSO DE GOIÁS — GUARDA CIVIL MUNICIPAL</div><h1>${esc(titulo)}</h1><div class="pdf-sub">${esc(subtitulo)}</div></div></div>`;
  }
  function rodapeAssinaturasPdfHtml() {
    const r = ESTADO.config.responsaveis || {};
    return `<div class="pdf-assinaturas"><div class="ass-col"><div class="ass-linha"></div><strong>${esc(r.escalanteNome || 'Responsável pela Escala')}</strong><div>${esc(r.escalanteCargo || 'Escalante GCM')} · Mat.: ${esc(r.escalanteMat || '—')}</div></div><div class="ass-col"><div class="ass-linha"></div><strong>${esc(r.comandoNome || 'Comandante da GCM')}</strong><div>${esc(r.comandoCargo || 'Comandante GCM')} · ${esc(r.comandoMat || '—')}</div></div></div><div class="pdf-emitido">Sistema de Escala, Eventos, Cartão Programa e Ponto — GCM Valparaíso de Goiás · Emitido em ${formatarDataHoraBR(new Date().toISOString())}</div>`;
  }
  function montarDocumentoPdf(titulo, corpoHtml, paisagem) {
    return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>${esc(titulo)}</title><style>
      @page { size: A4 ${paisagem ? 'landscape' : 'portrait'}; margin: 12mm; }
      body { font-family: Arial, Helvetica, sans-serif; color: #111111; background: #FFFFFF; font-size: 11px; line-height: 1.38; margin: 0; }
      .pdf-cab { display: flex; align-items: center; gap: 12px; border-bottom: 2px solid #111111; padding-bottom: 8px; margin-bottom: 12px; }
      .pdf-logo { width: 52px; height: 52px; object-fit: contain; }
      .pdf-org { font-size: 10px; font-weight: 700; letter-spacing: 0.04em; color: #333333; }
      h1 { font-size: 16px; margin: 2px 0; color: #000000; }
      h2 { font-size: 13px; margin: 12px 0 6px; padding: 4px 8px; background: #111111; color: #FFFFFF; }
      h3 { font-size: 12px; margin: 8px 0 4px; color: #111111; }
      .pdf-sub { font-size: 11px; color: #444444; }
      table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 10.5px; }
      th, td { border: 1px solid #333333; padding: 5px 6px; text-align: left; vertical-align: top; }
      th { background: #EBEBEB; font-weight: 700; text-transform: uppercase; font-size: 9.5px; }
      .box { border: 1px solid #333333; padding: 8px; margin-bottom: 8px; }
      .grid-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px; }
      .tag { display: inline-block; padding: 2px 6px; font-weight: 700; font-size: 9.5px; border: 1px solid #111111; }
      .tag-dark { background: #111111; color: #FFFFFF; }
      .tag-ok { background: #DCFCE7; color: #15803D; border-color: #15803D; }
      .tag-warn { background: #FEF3C7; color: #A16207; border-color: #A16207; }
      .tag-err { background: #FEE2E2; color: #B91C1C; border-color: #B91C1C; }
      .quebra { page-break-before: always; }
      .foto-pdf { width: 54px; height: 42px; object-fit: cover; border: 1px solid #333333; }
      .pdf-assinaturas { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; margin-top: 26px; page-break-inside: avoid; }
      .ass-col { text-align: center; font-size: 10.5px; }
      .ass-linha { border-top: 1px solid #111111; margin-bottom: 5px; }
      .pdf-emitido { margin-top: 14px; font-size: 9px; color: #555555; text-align: right; border-top: 1px solid #CCCCCC; padding-top: 4px; }
    </style></head><body>${corpoHtml}</body></html>`;
  }

  async function exportarHtmlParaPdf(html, nomeArquivo, paisagem) {
    if (window.escalaAPI && window.escalaAPI.salvarRelatorioPdf) {
      const res = await window.escalaAPI.salvarRelatorioPdf(html, nomeArquivo, !!paisagem);
      if (res && res.ok) toast('PDF salvo em: ' + res.caminho);
      else if (res && !res.cancelado) toast('Erro ao gerar PDF: ' + (res.erro || ''));
      return;
    }
    const win = window.open('', '_blank', 'width=960,height=760');
    if (!win) return toast('Permita pop-ups para gerar o PDF.');
    win.document.open();
    win.document.write(html.replace(/__LOGO__/g, 'logo.png') + '<script>window.onload=function(){setTimeout(function(){window.print();},350);};<\/script>');
    win.document.close();
  }

  function gerarPdfEscalaMensal() {
    const mesVal = $('selMesEscala').value || mesAtualISO();
    const [ano, mes] = mesVal.split('-').map(Number);
    const ultimoDia = new Date(ano, mes, 0).getDate();
    let linhasCal = '';
    for (let dia = 1; dia <= ultimoDia; dia++) {
      const iso = `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      const dt = new Date(ano, mes - 1, dia);
      const c = calcularCiclo24x72(iso);
      const cel = (eq) => c.mapa[eq].codigo === 'SERVICO' ? '<span class="tag tag-dark">SERVIÇO 24h</span>' : c.mapa[eq].rotulo;
      linhasCal += `<tr><td><strong>${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}</strong></td><td>${DIAS_SEMANA[dt.getDay()]}</td><td><strong>EQUIPE ${c.equipeServico}</strong></td><td>${cel('ALFA')}</td><td>${cel('BRAVO')}</td><td>${cel('CHARLIE')}</td><td>${cel('DELTA')}</td></tr>`;
    }
    const blocosEquipes = EQUIPES.map(eq => {
      const m = ESTADO.equipesMontagem[eq] || {};
      const rows = ESTADO.postos.map(p => {
        const g = m[p.id] || {};
        return `<tr><td><strong>${esc(p.nome)}</strong><br><small>Resp.: ${esc(p.responsavel || '—')}</small></td><td>${esc(nomeAgentePorId(g.g01) || '—')}</td><td>${esc(nomeAgentePorId(g.g02) || '—')}</td><td>${esc(nomeAgentePorId(g.g03) || '—')}</td></tr>`;
      }).join('');
      return `<h3>EQUIPE ${eq} (Ciclo 24x72)</h3><table><thead><tr><th>Viatura / Setor</th><th>01 — Comandante</th><th>02 — Motorista</th><th>03 — Patrulheiro</th></tr></thead><tbody>${rows}</tbody></table>`;
    }).join('');
    const rowsAdm = (ESTADO.administrativo || []).map(c => `<tr><td><strong>${esc(c.cargo)}</strong></td><td>${esc(c.titular)}</td><td>${esc(c.horario)}</td><td>${esc(c.obs || '')}</td></tr>`).join('');
    const rows12 = (ESTADO.escala12x36 || []).map(e => `<tr><td><strong>${esc(e.posto)}</strong></td><td>${esc(e.turno)}</td><td>${esc(e.equipeA)}</td><td>${esc(e.equipeB)}</td></tr>`).join('');

    const corpo = `
      ${cabecalhoPdfHtml(`ESCALA MENSAL DE SERVIÇO — ${MESES_EXT[mes - 1].toUpperCase()} / ${ano}`, `Regime 24x72 (${ESTADO.config.horarioTroca}) · Administrativo (10 Guardas) · 12x36`)}
      <h2>1. CALENDÁRIO OPERACIONAL 24x72</h2>
      <table><thead><tr><th>Data</th><th>Dia</th><th>Serviço 24h</th><th>ALFA</th><th>BRAVO</th><th>CHARLIE</th><th>DELTA</th></tr></thead><tbody>${linhasCal}</tbody></table>
      <div class="quebra"></div>
      ${cabecalhoPdfHtml(`COMPOSIÇÃO DAS EQUIPES E ADMINISTRATIVO — ${MESES_EXT[mes - 1].toUpperCase()} / ${ano}`, 'Viaturas, Setores, Responsáveis e Expediente Administrativo')}
      <h2>2. EQUIPES OPERACIONAIS (24x72)</h2>${blocosEquipes}
      <h2>3. EXPEDIENTE ADMINISTRATIVO (SEGUNDA A SEXTA)</h2>
      <table><thead><tr><th>Cargo / Setor</th><th>Titular</th><th>Horário</th><th>Observação</th></tr></thead><tbody>${rowsAdm}</tbody></table>
      <h2>4. ESCALA COMPLEMENTAR 12x36</h2>
      <table><thead><tr><th>Posto</th><th>Turno</th><th>Turma A</th><th>Turma B</th></tr></thead><tbody>${rows12}</tbody></table>
      ${rodapeAssinaturasPdfHtml()}
    `;
    exportarHtmlParaPdf(montarDocumentoPdf(`Escala GCM ${mesVal}`, corpo, true), `escala-gcm-valparaiso-${mesVal}.pdf`, true);
  }

  function blocoHtmlCartaoPrograma(data, equipe, posto) {
    const cp = obterDadosCartao(data, equipe, posto.id);
    const linhasPb = (cp.pontosBase || []).map(pb => `<tr><td><strong>${esc(pb.hora)}</strong></td><td>${esc(pb.local)}</td><td>${esc(pb.atividade)}</td></tr>`).join('');
    return `
      <div class="box">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #111111;padding-bottom:5px;margin-bottom:6px;">
          <strong style="font-size:13px;">${esc(cp.prefixo || posto.id)} — ${esc(cp.setor)}</strong>
          <span class="tag tag-dark">${esc(AREAS_LABEL[posto.area] || posto.area)}</span>
        </div>
        <div class="grid-info">
          <div><strong>Data / Turno:</strong><br>${formatarDataBR(data)} (${esc(ESTADO.config.horarioTroca)})</div>
          <div><strong>Equipe 24x72 / Resp. Setor:</strong><br>EQUIPE ${esc(equipe)} · ${esc(cp.responsavel || 'A definir')}</div>
          <div><strong>Cobertura / Bairros:</strong><br>${esc(cp.bairros)}</div>
        </div>
        <table><thead><tr><th>01 — Comandante</th><th>02 — Motorista</th><th>03 — Patrulheiro</th></tr></thead>
        <tbody><tr><td>${esc(cp.g01 || '—')}</td><td>${esc(cp.g02 || '—')}</td><td>${esc(cp.g03 || 'Guarnição de 2 integrantes')}</td></tr></tbody></table>
        <div style="margin-top:6px;"><strong>Missão Principal:</strong> ${esc(cp.missao)}</div>
        <table><thead><tr><th style="width:110px;">Horário</th><th style="width:200px;">Ponto Base (PB)</th><th>Atividade Operacional</th></tr></thead>
        <tbody>${linhasPb || '<tr><td colspan="3">Sem pontos base cadastrados.</td></tr>'}</tbody></table>
        <div style="margin-top:6px;"><strong>Recomendações:</strong> ${esc(cp.obs || '—')}</div>
      </div>
    `;
  }

  function gerarPdfCartaoPrograma(apenasAtual) {
    const data = $('inpCartaoData').value || hojeISO();
    const equipe = $('selCartaoEquipe').value || 'ALFA';
    const postoId = $('selCartaoPosto').value;
    const lista = apenasAtual ? ESTADO.postos.filter(p => p.id === postoId) : ESTADO.postos;
    const blocos = lista.map((p, i) => (i > 0 && i % 2 === 0 ? '<div class="quebra"></div>' : '') + blocoHtmlCartaoPrograma(data, equipe, p)).join('');
    const titulo = apenasAtual ? `CARTÃO PROGRAMA — ${lista[0]?.prefixo || ''}` : `CARTÃO PROGRAMA DO TURNO — EQUIPE ${equipe}`;
    const corpo = `${cabecalhoPdfHtml(titulo, `Data: ${formatarDataBR(data)} · Turno: ${ESTADO.config.horarioTroca} · Equipe ${equipe}`)}${blocos}${rodapeAssinaturasPdfHtml()}`;
    exportarHtmlParaPdf(montarDocumentoPdf(titulo, corpo, false), apenasAtual ? `cartao-${postoId}-${data}.pdf` : `cartao-completo-${equipe}-${data}.pdf`, false);
  }

  function gerarPdfFolhaPonto() {
    const lista = filtrarPontos();
    const mes = $('fltPontoMes').value || mesAtualISO();
    const ag = ESTADO.efetivo.find(x => x.id === $('fltPontoAgente').value);
    const sub = ag ? `Agente: ${ag.nome} (${ag.matricula}) · Mês: ${mes}` : `Relatório Geral de Pontos · Mês: ${mes} · Total: ${lista.length}`;
    const rows = lista.map(p => {
      const a = p.auditoria || {};
      const cls = a.status === 'VERIFICADO' ? 'tag-ok' : (a.status === 'ATENCAO' ? 'tag-warn' : 'tag-err');
      return `<tr><td><img src="${p.foto}" class="foto-pdf"></td><td><strong>${formatarDataBR(p.dataLocal)}</strong><br>${esc(p.horaLocal)}</td><td><strong>${esc(p.agenteNome)}</strong><br>${esc(p.agenteMatricula)} · ${esc(p.equipe)} · ${esc(p.posto)}</td><td><span class="tag ${p.tipo === 'ENTRADA' ? 'tag-dark' : ''}">${esc(p.tipo)}</span></td><td>${esc(a.endereco || '—')}<br><small>GPS: ${a.lat ? a.lat.toFixed(5) + ', ' + a.lon.toFixed(5) : '—'} (${esc(a.resumoDistancia || '')})</small></td><td><span class="tag ${cls}">${esc(a.status || '—')} (${a.score ?? 0}%)</span><br><small>SHA: ${esc((p.hashIntegridade || '').slice(0, 12))}</small>${(a.alertas || []).length ? '<br><small>' + esc(a.alertas.join('; ')) + '</small>' : ''}</td></tr>`;
    }).join('') || '<tr><td colspan="6" style="text-align:center;">Sem registros no período.</td></tr>';
    const corpo = `${cabecalhoPdfHtml('FOLHA DE PONTO OFICIAL — FOTO AO VIVO + GPS ANTIFRAUDE', sub)}<table><thead><tr><th>Foto</th><th>Data / Hora</th><th>Agente / Equipe</th><th>Tipo</th><th>Local / Distância</th><th>Auditoria / SHA-256</th></tr></thead><tbody>${rows}</tbody></table>${rodapeAssinaturasPdfHtml()}`;
    exportarHtmlParaPdf(montarDocumentoPdf(`Folha de Ponto ${mes}`, corpo, false), `folha-ponto-gcm-${mes}.pdf`, false);
  }

  // =========================================================================
  // NAVEGACAO & EVENTOS
  // =========================================================================
  function abrirAba(idSecao) {
    document.querySelectorAll('.secao-aba').forEach(s => s.classList.toggle('ativa', s.id === idSecao));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('ativo', b.getAttribute('data-aba') === idSecao));
    if (idSecao !== 'secPonto') pararCamera();
    if (idSecao === 'secPainel') renderPainel();
    if (idSecao === 'secEscalas') { renderCalendario24(); renderMontagemEquipe(); renderSetoresResponsaveis(); renderAdmE12x36(); renderResponsaveis(); }
    if (idSecao === 'secEventos') renderListaEventos();
    if (idSecao === 'secCartao') { popularSelectsCartao(); carregarEditorCartao(); }
    if (idSecao === 'secPonto') { popularSelectsPonto(); renderTabelaPontos(); }
    if (idSecao === 'secEfetivo') { renderEfetivo(); renderContas(); renderConfigBase(); }
  }

  function atualizarTodasVistas() {
    renderPainel();
    renderCalendario24();
    renderMontagemEquipe();
    renderSetoresResponsaveis();
    renderAdmE12x36();
    renderResponsaveis();
    renderListaEventos();
    popularSelectsCartao();
    carregarEditorCartao();
    popularSelectsPonto();
    renderTabelaPontos();
    renderEfetivo();
    renderContas();
    renderConfigBase();
  }

  function iniciarAppLogado(sessao) {
    SESSAO = sessao;
    $('telaAuth').classList.add('oculto');
    $('appShell').classList.remove('oculto');
    $('lblUsuarioTopo').textContent = sessao.nome;
    $('lblPerfilTopo').textContent = sessao.perfil;
    $('selMesEscala').value = mesAtualISO();
    $('inpCartaoData').value = hojeISO();
    $('fltPontoMes').value = mesAtualISO();
    sincronizarDataCartao();
    atualizarTodasVistas();

    if (timerRelogio) clearInterval(timerRelogio);
    timerRelogio = setInterval(() => { if ($('lblRelogioPonto')) $('lblRelogioPonto').textContent = new Date().toLocaleTimeString('pt-BR'); }, 1000);

    if (ESTADO.config?.nuvemAtiva && window.EscalaCloud.lerConfigFirebase()) {
      window.EscalaCloud.assinarNuvem(true, (remoto) => {
        if (!remoto || !remoto.efetivo) return;
        ESTADO = remoto;
        window.EscalaCloud.salvarEstadoLocal(ESTADO);
        atualizarBadgeSync('Nuvem Própria OK', 'badge-ok');
        atualizarTodasVistas();
      });
    }
  }

  function registrarEventos() {
    $('btnTema').addEventListener('click', alternarTema);
    $('btnTemaAuth').addEventListener('click', alternarTema);
    $('btnTabEntrar').addEventListener('click', () => { $('btnTabEntrar').classList.add('ativo'); $('btnTabCadastrar').classList.remove('ativo'); $('formLogin').classList.remove('oculto'); $('formCadastro').classList.add('oculto'); });
    $('btnTabCadastrar').addEventListener('click', () => { $('btnTabCadastrar').classList.add('ativo'); $('btnTabEntrar').classList.remove('ativo'); $('formCadastro').classList.remove('oculto'); $('formLogin').classList.add('oculto'); });

    $('formLogin').addEventListener('submit', async (e) => {
      e.preventDefault(); $('msgAuthErro').classList.add('oculto');
      const r = await window.EscalaCloud.tentarLogin($('inpLoginUser').value, $('inpLoginPass').value);
      if (!r.ok) { $('msgAuthErro').textContent = r.erro; $('msgAuthErro').classList.remove('oculto'); return; }
      iniciarAppLogado(r.sessao);
    });

    $('formCadastro').addEventListener('submit', (e) => {
      e.preventDefault();
      const box = $('msgCadInfo'); box.classList.remove('oculto', 'erro', 'ok');
      const r = window.EscalaCloud.cadastrarUsuario({ nome: $('inpCadNome').value, login: $('inpCadUser').value, matricula: $('inpCadMat').value, senha: $('inpCadPass').value, perfil: 'AGENTE', aprovado: false });
      box.classList.add(r.ok ? 'ok' : 'erro');
      box.textContent = r.ok ? 'Solicitação enviada! Peça ao Administrador para aprovar em Contas & Perfis.' : r.erro;
      if (r.ok) $('formCadastro').reset();
    });

    $('btnSair').addEventListener('click', () => { pararCamera(); window.EscalaCloud.salvarSessao(null); SESSAO = null; $('appShell').classList.add('oculto'); $('telaAuth').classList.remove('oculto'); });
    $('btnBrasaoMenu').addEventListener('click', () => abrirAba('secPainel'));
    $('btnFecharModal').addEventListener('click', fecharModal);
    $('modalOverlay').addEventListener('click', (e) => { if (e.target === $('modalOverlay')) fecharModal(); });

    document.querySelectorAll('.nav-btn').forEach(b => b.addEventListener('click', () => abrirAba(b.getAttribute('data-aba'))));
    document.querySelectorAll('.subtabs').forEach(gr => {
      gr.querySelectorAll('.subtab').forEach(btn => {
        btn.addEventListener('click', () => {
          const alvo = btn.getAttribute('data-sub');
          const sec = btn.closest('.secao-aba');
          gr.querySelectorAll('.subtab').forEach(x => x.classList.toggle('ativo', x === btn));
          sec.querySelectorAll('.subpainel').forEach(p => p.classList.toggle('ativo', p.id === alvo));
        });
      });
    });

    $('btnAtalhoPonto').addEventListener('click', () => abrirAba('secPonto'));
    $('btnAtalhoCartaoHoje').addEventListener('click', () => { $('inpCartaoData').value = hojeISO(); sincronizarDataCartao(); gerarPdfCartaoPrograma(false); });

    // Escalas & Setores
    $('selMesEscala').addEventListener('change', renderCalendario24);
    $('btnSalvarCiclo24').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      ESTADO.config.dataBaseAlfa = $('inpDataBaseAlfa').value || hojeISO();
      ESTADO.config.horarioTroca = $('inpHorarioTroca').value.trim() || '07:00 às 07:00';
      await salvarTudo(); renderCalendario24(); renderPainel();
    });
    $('btnExportarPdfEscala').addEventListener('click', gerarPdfEscalaMensal);
    $('selEquipeMontagem').addEventListener('change', renderMontagemEquipe);
    $('btnSalvarMontagemEquipe').addEventListener('click', salvarMontagemEquipeAtual);
    $('btnAutoDistribuirEquipe').addEventListener('click', autoDistribuirEquipeAtual);
    $('btnAdicionarPosto').addEventListener('click', abrirModalNovoPosto);
    $('btnAddSetorDireto').addEventListener('click', abrirModalNovoPosto);
    $('btnSalvarSetoresResp').addEventListener('click', salvarSetoresResponsaveis);

    $('btnAddCargoAdm').addEventListener('click', () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      ESTADO.administrativo.push({ id: 'adm_' + Date.now(), cargo: 'Nova Função Adm', titular: 'A definir', horario: 'Seg–Sex · 08h às 17h', obs: '' });
      renderAdmE12x36();
    });
    $('btnSalvarAdm').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const lista = [];
      $('listaCargosAdm').querySelectorAll('.linha-editavel').forEach((el, i) => {
        lista.push({ id: 'adm_' + i, cargo: el.querySelector('.adm-cargo').value.trim(), titular: el.querySelector('.adm-titular').value.trim(), horario: el.querySelector('.adm-horario').value.trim(), obs: el.querySelector('.adm-obs').value.trim() });
      });
      ESTADO.administrativo = lista;
      await salvarTudo();
    });
    $('btnAddPosto12x36').addEventListener('click', () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      ESTADO.escala12x36.push({ id: 'e12_' + Date.now(), posto: 'Novo Posto 12x36', turno: 'Diurno (07h às 19h)', equipeA: 'A definir', equipeB: 'A definir' });
      renderAdmE12x36();
    });
    $('btnSalvar12x36').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const lista = [];
      $('listaPostos12x36').querySelectorAll('.linha-editavel').forEach((el, i) => {
        lista.push({ id: 'e12_' + i, posto: el.querySelector('.e12-posto').value.trim(), turno: el.querySelector('.e12-turno').value.trim(), equipeA: el.querySelector('.e12-a').value.trim(), equipeB: el.querySelector('.e12-b').value.trim() });
      });
      ESTADO.escala12x36 = lista;
      await salvarTudo();
    });
    $('btnSalvarResponsaveis').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      ESTADO.config.responsaveis = {
        escalanteNome: $('inpRespEscalanteNome').value.trim(), escalanteCargo: $('inpRespEscalanteCargo').value.trim(), escalanteMat: $('inpRespEscalanteMat').value.trim(),
        comandoNome: $('inpRespComandoNome').value.trim(), comandoCargo: $('inpRespComandoCargo').value.trim(), comandoMat: $('inpRespComandoMat').value.trim()
      };
      await salvarTudo();
    });

    // Eventos
    $('btnNovoEvento').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const novo = {
        id: 'ev_' + Date.now().toString(36),
        nome: 'Novo Evento / Operação Extra', local: 'Valparaíso de Goiás', data: hojeISO(),
        inicio: '16:00', fim: '23:00', regime: 'HORA_EXTRA', coordenador: '', missao: '', obs: '',
        viaturas: [
          { id: 'evv_1', prefixo: 'VTR-EVENTO 01', setor: 'Área Principal', g01: '', g02: '', g03: '', g04: '' },
          { id: 'evv_2', prefixo: 'VTR-EVENTO 02', setor: 'Apoio / Trânsito', g01: '', g02: '', g03: '', g04: '' }
        ]
      };
      ESTADO.eventos = ESTADO.eventos || [];
      ESTADO.eventos.unshift(novo);
      eventoSelecionadoId = novo.id;
      await salvarTudo(true);
      renderListaEventos();
      renderPainel();
      toast('Novo evento criado!');
    });
    $('inpEvData').addEventListener('change', () => {
      const cur = lerEventoDoEditor();
      atualizarDicaFolgaEvento(cur.data);
      renderViaturasEvento(cur.viaturas, cur.data);
    });
    $('btnAddVtrEvento').addEventListener('click', () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const cur = lerEventoDoEditor();
      cur.viaturas.push({ id: 'evv_' + Date.now(), prefixo: `VTR-EVENTO 0${cur.viaturas.length + 1}`, setor: '', g01: '', g02: '', g03: '', g04: '' });
      renderViaturasEvento(cur.viaturas, cur.data);
    });
    $('btnSalvarEvento').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const cur = lerEventoDoEditor();
      const idx = (ESTADO.eventos || []).findIndex(e => e.id === cur.id);
      if (idx >= 0) ESTADO.eventos[idx] = cur;
      await salvarTudo();
      renderListaEventos();
      renderPainel();
    });
    $('btnExcluirEvento').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      if (!confirm('Excluir este evento?')) return;
      ESTADO.eventos = (ESTADO.eventos || []).filter(e => e.id !== eventoSelecionadoId);
      eventoSelecionadoId = null;
      await salvarTudo();
      renderListaEventos();
      renderPainel();
    });
    $('btnWhatsAppEvento').addEventListener('click', copiarWhatsAppEvento);
    $('btnPdfEvento').addEventListener('click', gerarPdfEvento);

    // Cartao Programa
    $('inpCartaoData').addEventListener('change', sincronizarDataCartao);
    $('selCartaoEquipe').addEventListener('change', carregarEditorCartao);
    $('selCartaoPosto').addEventListener('change', carregarEditorCartao);
    $('btnAddLinhaPb').addEventListener('click', () => { const a = lerCartaoDoEditor().pontosBase; a.push({ hora: '', local: '', atividade: '' }); renderLinhasPb(a); });
    $('btnPuxarGuarnicaoEscala').addEventListener('click', () => {
      const mont = (ESTADO.equipesMontagem[$('selCartaoEquipe').value] || {})[$('selCartaoPosto').value] || {};
      const posto = ESTADO.postos.find(p => p.id === $('selCartaoPosto').value);
      $('inpCpG01').value = nomeAgentePorId(mont.g01) || '';
      $('inpCpG02').value = nomeAgentePorId(mont.g02) || '';
      $('inpCpG03').value = nomeAgentePorId(mont.g03) || '';
      if (posto) $('inpCpRespSetor').value = posto.responsavel || '';
      toast('Guarnição e responsável sincronizados com a escala.');
    });
    $('btnSalvarCartaoDia').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      ESTADO.cartoesDia[chaveCartao($('inpCartaoData').value, $('selCartaoEquipe').value, $('selCartaoPosto').value)] = lerCartaoDoEditor();
      await salvarTudo();
    });
    $('btnSalvarModeloSetor').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      const pid = $('selCartaoPosto').value;
      const d = lerCartaoDoEditor();
      ESTADO.cartoesModelo[pid] = { setor: d.setor, bairros: d.bairros, prefixo: d.prefixo, responsavel: d.responsavel, missao: d.missao, pontosBase: d.pontosBase, obs: d.obs };
      const p = ESTADO.postos.find(x => x.id === pid);
      if (p) { p.setor = d.setor; p.bairros = d.bairros; p.prefixo = d.prefixo; p.responsavel = d.responsavel; }
      await salvarTudo();
      toast('Modelo padrão do setor atualizado!');
    });
    $('btnPdfCartaoIndividual').addEventListener('click', () => gerarPdfCartaoPrograma(true));
    $('btnPdfCartaoCompleto').addEventListener('click', () => gerarPdfCartaoPrograma(false));
    $('btnCopiarWhatsApp').addEventListener('click', copiarResumoWhatsApp);

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

    // Efetivo & Config
    $('fltEfBusca').addEventListener('input', renderEfetivo);
    $('fltEfOrigem').addEventListener('change', renderEfetivo);
    $('fltEfEquipe').addEventListener('change', renderEfetivo);
    $('btnNovoAgente').addEventListener('click', () => { if (!podeEditarEscala()) return toast('Sem permissão.'); abrirModalAgente(null); });
    $('btnAbrirImportar64').addEventListener('click', abrirModalImportar64);
    $('btnDistribuir64').addEventListener('click', async () => {
      if (!podeEditarEscala()) return toast('Sem permissão.');
      if (!confirm('Rebalancear todos os agentes ATIVOS operacionais (exceto ADM e Reserva) igualmente entre ALFA, BRAVO, CHARLIE e DELTA?')) return;
      const alvos = ESTADO.efetivo.filter(a => a.situacao === 'ATIVO' && a.equipe !== 'ADM' && a.equipe !== '12X36' && a.equipe !== 'RESERVA');
      alvos.forEach((a, i) => { a.equipe = EQUIPES[i % 4]; a.regime = '24X72'; });
      await salvarTudo(); atualizarTodasVistas();
      toast(`${alvos.length} operacionais rebalanceados nas 4 equipes!`);
    });

    $('btnCriarContaAdmin').addEventListener('click', () => {
      if (!isAdmin()) return toast('Apenas Administrador.');
      abrirModal('Criar Conta de Acesso',
        `<div class="campo"><label>Nome</label><input type="text" id="mUsNome"></div>
         <div class="grid-2"><div class="campo"><label>Login</label><input type="text" id="mUsLogin"></div><div class="campo"><label>Matrícula</label><input type="text" id="mUsMat"></div></div>
         <div class="grid-2"><div class="campo"><label>Senha (mín. 6)</label><input type="password" id="mUsPass"></div>
         <div class="campo"><label>Perfil</label><select id="mUsPerfil"><option value="AGENTE">Agente GCM</option><option value="ESCALANTE">Escalante</option><option value="ADMIN">Administrador</option></select></div></div>`,
        [
          { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
          { texto: 'Criar', classe: 'btn-primario', onClick: () => {
            const r = window.EscalaCloud.cadastrarUsuario({ nome: $('mUsNome').value, login: $('mUsLogin').value, matricula: $('mUsMat').value, senha: $('mUsPass').value, perfil: $('mUsPerfil').value, aprovado: true });
            if (!r.ok) return toast(r.erro);
            fecharModal(); renderContas(); salvarTudo(true); toast('Conta criada!');
          }}
        ]
      );
    });

    $('btnCapturarBaseGps').addEventListener('click', () => {
      if (!navigator.geolocation) return toast('GPS indisponível.');
      navigator.geolocation.getCurrentPosition(
        (pos) => { $('inpBaseLat').value = pos.coords.latitude.toFixed(6); $('inpBaseLon').value = pos.coords.longitude.toFixed(6); toast('GPS capturado! Clique em Salvar.'); },
        () => toast('Não foi possível obter sua localização.'), { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    });

    $('btnSalvarConfigBase').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Apenas Administrador.');
      ESTADO.config.baseNome = $('inpBaseNome').value.trim();
      ESTADO.config.baseLat = Number($('inpBaseLat').value);
      ESTADO.config.baseLon = Number($('inpBaseLon').value);
      ESTADO.config.baseRaioMetros = Math.max(30, Number($('inpBaseRaio').value) || 500);
      ESTADO.config.acaoSuspeita = $('selBloquearSuspeito').value;
      await salvarTudo();
    });

    // Firebase Proprio Isolado
    $('btnSalvarFirebaseProprio').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Apenas Administrador pode configurar o banco de dados.');
      const obj = window.EscalaCloud.extrairObjetoFirebase($('txtFirebaseConfigJson').value);
      if (!obj) return toast('Cole um objeto firebaseConfig válido (com apiKey e projectId).');
      if (obj.projectId === 'cco-viaturas') {
        return toast('BLOQUEADO: Este é o projeto do CCO Viaturas! Crie um novo projeto Firebase separado.');
      }
      $('statusDbProprio').textContent = 'Testando conexão com ' + obj.projectId + '...';
      const teste = await window.EscalaCloud.testarConexaoFirebase(obj);
      if (!teste.ok) {
        $('statusDbProprio').textContent = 'Erro ao conectar: ' + (teste.erro || 'verifique as regras do Firestore.');
        return toast('Falha no teste de conexão. Verifique se o Firestore foi criado no novo projeto.');
      }
      window.EscalaCloud.salvarConfigFirebase(obj);
      ESTADO.config.nuvemAtiva = true;
      $('chkNuvemAtiva').checked = true;
      await salvarTudo(true);
      renderConfigBase();
      toast(`Novo Firebase "${obj.projectId}" conectado e sincronizado com sucesso!`);
    });

    $('btnDesconectarFirebase').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Apenas Administrador.');
      window.EscalaCloud.salvarConfigFirebase(null);
      ESTADO.config.nuvemAtiva = false;
      $('chkNuvemAtiva').checked = false;
      await salvarTudo(true);
      renderConfigBase();
      atualizarBadgeSync('Salvo Local', 'badge-neutro');
      toast('Banco em nuvem desconectado. Sistema operando 100% local.');
    });

    $('chkNuvemAtiva').addEventListener('change', async () => {
      if (!isAdmin()) { $('chkNuvemAtiva').checked = !!ESTADO.config.nuvemAtiva; return toast('Apenas Administrador.'); }
      if ($('chkNuvemAtiva').checked && !window.EscalaCloud.lerConfigFirebase()) {
        $('chkNuvemAtiva').checked = false;
        return toast('Cole e salve primeiro o firebaseConfig do seu novo projeto Firebase.');
      }
      ESTADO.config.nuvemAtiva = $('chkNuvemAtiva').checked;
      await salvarTudo();
      renderConfigBase();
    });

    $('btnSyncAgora').addEventListener('click', async () => {
      if (!window.EscalaCloud.lerConfigFirebase()) return toast('Nenhum Firebase próprio configurado ainda.');
      const r = await window.EscalaCloud.sincronizarBaixarNuvem();
      if (r.ok && r.dados) {
        ESTADO = r.dados; await window.EscalaCloud.salvarEstadoLocal(ESTADO);
        atualizarTodasVistas(); toast('Dados baixados do seu Firebase próprio!');
      } else { await salvarTudo(); }
    });

    $('btnAlterarMinhaSenha').addEventListener('click', () => {
      abrirModal('Alterar Minha Senha', `<div class="campo"><label>Nova Senha (mín. 6)</label><input type="password" id="mNovaSenha" minlength="6"></div>`,
        [
          { texto: 'Cancelar', classe: 'btn-sec', onClick: fecharModal },
          { texto: 'Salvar', classe: 'btn-primario', onClick: () => {
            const s = $('mNovaSenha').value;
            if (!s || s.length < 6) return toast('Mínimo 6 caracteres.');
            window.EscalaCloud.atualizarUsuario(SESSAO.login, { novaSenha: s });
            fecharModal(); salvarTudo(true); toast('Senha alterada!');
          }}
        ]
      );
    });

    $('btnExportarBackup').addEventListener('click', async () => {
      const pacote = { sistema: 'ESCALA_GCM_VALPARAISO_V2', exportadoEm: new Date().toISOString(), estado: ESTADO, usuarios: window.EscalaCloud.lerUsuariosLocal() };
      if (window.escalaAPI && window.escalaAPI.exportarBackup) {
        const r = await window.escalaAPI.exportarBackup(pacote);
        if (r && r.ok) toast('Backup salvo em: ' + r.caminho);
        return;
      }
      const blob = new Blob([JSON.stringify(pacote, null, 2)], { type: 'application/json' });
      const u = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = u; a.download = `backup-escala-gcm-${hojeISO()}.json`; a.click();
      URL.revokeObjectURL(u); toast('Backup JSON baixado!');
    });

    $('btnImportarBackup').addEventListener('click', async () => {
      if (!isAdmin()) return toast('Apenas Administrador.');
      if (window.escalaAPI && window.escalaAPI.importarBackup) {
        const r = await window.escalaAPI.importarBackup();
        if (r && r.ok && r.dados?.estado) {
          ESTADO = r.dados.estado;
          if (Array.isArray(r.dados.usuarios)) window.EscalaCloud.salvarUsuariosLocal(r.dados.usuarios);
          await salvarTudo(); atualizarTodasVistas(); toast('Backup restaurado!');
        }
        return;
      }
      $('inpFileBackup').click();
    });

    $('inpFileBackup').addEventListener('change', async (e) => {
      const file = e.target.files[0]; if (!file) return;
      try {
        const parsed = JSON.parse(await file.text());
        if (!parsed.estado || !parsed.estado.efetivo) throw new Error('Arquivo inválido.');
        ESTADO = parsed.estado;
        if (Array.isArray(parsed.usuarios)) window.EscalaCloud.salvarUsuariosLocal(parsed.usuarios);
        await salvarTudo(); atualizarTodasVistas(); toast('Backup restaurado!');
      } catch (err) { toast('Erro ao importar: ' + err.message); }
      e.target.value = '';
    });
  }

  async function init() {
    aplicarTema(localStorage.getItem('escala_gcm_tema_v2') || 'claro');
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
    const carregado = await window.EscalaCloud.carregarEstadoLocal();
    ESTADO = (carregado && carregado.efetivo && carregado.postos && carregado.versao >= 2) ? carregado : criarEstadoInicial();
    if (!Array.isArray(ESTADO.eventos)) ESTADO.eventos = [];
    await window.EscalaCloud.salvarEstadoLocal(ESTADO);
    registrarEventos();
    const sessaoSalva = window.EscalaCloud.lerSessao();
    if (sessaoSalva && sessaoSalva.login) iniciarAppLogado(sessaoSalva);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
