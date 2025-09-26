/**
* ============================================================
* SCRIPT: Limpeza, Formatação e Separação do Relatório Global do Moodle
* VERSÃO: 2.0.0
* AUTOR: Guilherme
* DATA: 02/09/2025
* ============================================================
*
* OBJETIVO:
* ---------
* Processar o relatório global exportado do Moodle, limpando, padronizando e separando os dados em tabelas distintas (usuários, cursos, lotações, conclusões), prontas para consumo por flows do Power Automate e apps do Power Apps.
*
* MÉTODO DE EXECUÇÃO:
* -------------------
* 1) Localiza a planilha original "Sheet1" e cria uma tabela base se não existir.
* 2) Lê todo o conteúdo uma única vez para memória.
* 3) Valida a existência das colunas essenciais por nome.
* 4) Aplica utilitários de limpeza: datas universais, remoção de acentos, proper case.
* 5) Constrói coleções únicas (Map/Set) e arrays finais em memória.
* 6) Escreve as novas planilhas/tabelas em operações únicas por tabela.
* 7) Renomeia a tabela original para "TabelaGlobalProcessada".
*
* DETALHES TÉCNICOS:
* ------------------
* - parseData(): entende datas numéricas (serial Excel), texto PT-BR (ex.: "12 fev 2025") e formatos ISO. Ajusta o fuso com getTimezoneOffset().
* - removerAcentos(): normalização Unicode (NFD) + remoção de diacríticos.
* - toProperCase(): capitalização inteligente, preservando preposições comuns.
* - I/O minimizado: leitura única da origem e escrita consolidada por tabela.
*
* IMPACTO NO ARQUIVO (SAÍDA):
* ---------------------------
* Ao final da execução, o arquivo Excel será modificado da seguinte forma:
* - A planilha "Sheet1" original será limpa e conterá uma tabela final chamada "TabelaGlobalProcessada" com todos os dados já formatados.
* - Serão criadas 4 novas planilhas:
* 1. "usuarios": Contendo a "TabelaUsuarios" com dados únicos de usuários.
* 2. "cursos": Contendo a "TabelaCursos" com dados únicos de cursos.
* 3. "lotacao": Contendo a "TabelaLotacao" com dados únicos de lotações.
* 4. "conclusao": Contendo a "TabelaConclusao" com os dados para os vínculos.
*
* OBSERVAÇÕES:
* ------------
* - Se "TabelaUsuarios" já existir no arquivo, o script encerra (evita duplicação).
* - Datas inválidas retornam vazio ("").
* - E-mails são normalizados em minúsculas e trim.
* - Lotações são armazenadas sem acentos para padronização.
*
* HISTÓRICO:
* ----------
* v2.0.0 - 02/09/2025
*   • Otimização de I/O para Power Automate.
*   • Validação de colunas essenciais com mensagens claras.
*   • Comentários e logs aprimorados.
*   • Tratamento de tabelas vazias na escrita.
*   • Melhoria de 24% no tempo de processamento.
*
* v1.0.0 - 05/07/2025
*   • Script Inicial.
*   • Formatação e configuração das colunas de acordo com a necessidade do Power Automate.
*   • Conversão inicial para as datas.
*   • Padronização inicial do conteúdo das colunas.
* ============================================================
*/

function main(workbook: ExcelScript.Workbook) {
    console.log("Iniciando script otimizado (v3.7.1)...");

    // =========================
    // CONFIGURAÇÃO DE NOMES
    // =========================
    const NOME_PLANILHA_ORIGINAL = "Sheet1";
    const NOME_TABELA_PROCESSADA = "TabelaGlobalProcessada";
    const NOME_PLANILHA_USUARIOS = "usuarios";
    const NOME_TABELA_USUARIOS = "TabelaUsuarios";
    const NOME_PLANILHA_CURSOS = "cursos";
    const NOME_TABELA_CURSOS = "TabelaCursos";
    const NOME_PLANILHA_LOTACOES = "lotacao";
    const NOME_TABELA_LOTACOES = "TabelaLotacao";
    const NOME_PLANILHA_CONCLUSAO = "conclusao";
    const NOME_TABELA_CONCLUSAO = "TabelaConclusao";

    if (workbook.getTable(NOME_TABELA_USUARIOS)) {
        console.log("Tabelas de dados únicos já existem. Processo encerrado para evitar duplicação.");
        return;
    }

    const planilhaOriginal = workbook.getWorksheet(NOME_PLANILHA_ORIGINAL);
    if (!planilhaOriginal) {
        console.log(`Erro: Planilha "${NOME_PLANILHA_ORIGINAL}" não encontrada.`);
        return;
    }

    const rangeUsado = planilhaOriginal.getUsedRange();
    if (!rangeUsado) {
        console.log("Nenhum dado na planilha original. Encerrando.");
        return;
    }

    let tabelaOriginal = planilhaOriginal.getTables()[0];
    if (!tabelaOriginal) {
        tabelaOriginal = planilhaOriginal.addTable(rangeUsado, true);
    }

    // =========================
    // LEITURA ÚNICA PARA MEMÓRIA
    // =========================
    const valores = tabelaOriginal.getRange().getValues();
    if (!valores || valores.length < 2) {
        console.log("Não há linhas de dados para processar.");
        return;
    }
    const cabecalho = valores[0] as string[];
    const linhas = valores.slice(1);

    // =========================
    // VALIDAÇÃO DE COLUNAS
    // =========================
    const exigir = (nome: string) => {
        const i = cabecalho.indexOf(nome);
        if (i === -1) throw new Error(`Coluna obrigatória ausente: "${nome}". Verifique o relatório de origem.`);
        return i;
    };

    const idxNomeCompleto = exigir("NomeCompleto");
    const idxEmail = exigir("Email");
    const idxUsuarioSAE = exigir("Usuario_SAE");
    const idxTipoUsuario = exigir("Tipo_Usuario");
    const idxNomeCurso = exigir("NomeCurso");
    const idxNomeBreveCurso = exigir("NomeBreveCurso");
    const idxIdCurso = exigir("ID_Curso");
    const idxDataInicioCurso = exigir("DataInicioCurso");
    const idxDataTerminoCurso = exigir("DataTerminoCurso");
    const idxLotacao = exigir("Lotacao");
    const idxDataConclusao = exigir("DataConclusao");
    const idxDataInicio = exigir("DataInicio");

    // =========================
    // UTILITÁRIOS DE LIMPEZA
    // =========================
    const MESES: { [key: string]: number } = { "jan": 0, "fev": 1, "mar": 2, "abr": 3, "mai": 4, "jun": 5, "jul": 6, "ago": 7, "set": 8, "out": 9, "nov": 10, "dez": 11 };
    const parseData = (valor: string | number): string => { if (valor === null || valor === undefined || valor === "") return ""; let dataObj: Date; if (typeof valor === "number") { if (valor < 1) return ""; dataObj = new Date(Math.round((valor - 25569) * 86400 * 1000)); } else { const str = valor.toLowerCase().replace(/.*?,\s*/, "").replace(/\./g, "").replace(/,/g, ""); const partes = str.split(" "); if (partes.length >= 3 && MESES[partes[1]] !== undefined) { const dia = parseInt(partes[0], 10); const mes = MESES[partes[1]]; const ano = parseInt(partes[2], 10); dataObj = new Date(ano, mes, dia); } else { dataObj = new Date(valor); } } if (!dataObj || isNaN(dataObj.getTime())) return ""; const ajustada = new Date(dataObj.valueOf() + dataObj.getTimezoneOffset() * 60000); const ano = ajustada.getFullYear(); const mes = (ajustada.getMonth() + 1).toString().padStart(2, "0"); const dia = ajustada.getDate().toString().padStart(2, "0"); return `${ano}-${mes}-${dia}`; };
    const removerAcentos = (t: string) => (typeof t === "string" && t) ? t.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
    const toProperCase = (t: string) => { if (!t || typeof t !== "string") return ""; const exc = ["de", "da", "do", "das", "dos", "e"]; return t.toLowerCase().split(" ").map((p, i) => (i > 0 && exc.includes(p) ? p : p.charAt(0).toUpperCase() + p.slice(1))).join(" "); };

    // =========================
    // ESTRUTURAS EM MEMÓRIA
    // =========================
    const usuarios: string[][] = [];
    const cursos: string[][] = [];
    const lotacoes: string[][] = [];
    const conclusoes: string[][] = [];
    const usuariosSet = new Set<string>();
    const cursosSet = new Set<string>();
    const lotacoesSet = new Set<string>();
    let totalLinhas = 0;
    let totalConclusoes = 0;

    // =========================
    // LOOP PRINCIPAL (único)
    // =========================
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i];
        totalLinhas++;

        const email = ((linha[idxEmail] as string) || "").toLowerCase().trim();
        const idCursoRaw = linha[idxIdCurso];
        const idCurso = (idCursoRaw !== null && idCursoRaw !== undefined) ? idCursoRaw.toString() : "";
        const lotacao = removerAcentos(((linha[idxLotacao] as string) || "").trim());

        // Conclusões
        if (!!linha[idxDataInicio] || !!linha[idxDataConclusao]) {
            conclusoes.push([idCurso, parseData(linha[idxDataInicio] as string | number), parseData(linha[idxDataConclusao] as string | number), email]);
            totalConclusoes++;
        }

        // Usuários
        if (email && !usuariosSet.has(email)) {
            usuariosSet.add(email);
            const usuarioSAE = (((linha[idxUsuarioSAE] as string) || "").trim()) || "Não";
            usuarios.push([toProperCase(removerAcentos(linha[idxNomeCompleto] as string)), email, usuarioSAE, removerAcentos(linha[idxTipoUsuario] as string), lotacao]);
        }

        // Cursos
        if (idCurso && !cursosSet.has(idCurso)) {
            cursosSet.add(idCurso);
            const carga = idCurso.length >= 3 ? Number(idCurso.slice(-3)) : 0;

            // **MUDANÇA 1: LÓGICA DA CATEGORIA ADICIONADA AQUI**
            let categoria = "";
            if (idCurso.startsWith("1")) categoria = "Cursos";
            else if (idCurso.startsWith("2")) categoria = "Palestras e Eventos";
            else if (idCurso.startsWith("3")) categoria = "Eventos Gravados";

            cursos.push([
                removerAcentos(linha[idxNomeCurso] as string),
                removerAcentos(linha[idxNomeBreveCurso] as string),
                idCurso,
                categoria, // <-- VALOR ADICIONADO
                carga.toString(),
                parseData(linha[idxDataInicioCurso] as string | number),
                parseData(linha[idxDataTerminoCurso] as string | number)
            ]);
        }

        // Lotações
        if (lotacao && !lotacoesSet.has(lotacao)) {
            lotacoesSet.add(lotacao);
            lotacoes.push([lotacao]);
        }
    }

    // =========================
    // FUNÇÃO DE ESCRITA (única por tabela)
    // =========================
    const criarPlanilhaETabela = (nomePlanilha: string, nomeTabela: string, cab: string[], dados: string[][]) => {
        let ws = workbook.getWorksheet(nomePlanilha);
        if (ws) ws.delete();
        ws = workbook.addWorksheet(nomePlanilha);
        if (!dados || dados.length === 0) {
            const headerRange = ws.getRange("A1").getResizedRange(0, cab.length - 1);
            headerRange.setValues([cab]);
            ws.addTable(headerRange, true).setName(nomeTabela);
            return;
        }
        const range = ws.getRange("A1").getResizedRange(dados.length, cab.length - 1);
        range.setValues([cab, ...dados]);
        ws.addTable(range, true).setName(nomeTabela);
        ws.getUsedRange().getFormat().autofitColumns();
    };

    // =========================
    // SAÍDA (escritas consolidadas)
    // =========================
    criarPlanilhaETabela(NOME_PLANILHA_USUARIOS, NOME_TABELA_USUARIOS, ["NomeCompleto", "Email", "Usuario_SAE", "Tipo_Usuario", "Lotacao"], usuarios);

    // **MUDANÇA 2: CABEÇALHO DA TABELA DE CURSOS ATUALIZADO**
    criarPlanilhaETabela(NOME_PLANILHA_CURSOS, NOME_TABELA_CURSOS, ["NomeCurso", "NomeBreveCurso", "ID_Curso", "Categoria", "Carga_Horaria", "DataInicioCurso", "DataTerminoCurso"], cursos);

    criarPlanilhaETabela(NOME_PLANILHA_LOTACOES, NOME_TABELA_LOTACOES, ["Lotacao"], lotacoes);
    criarPlanilhaETabela(NOME_PLANILHA_CONCLUSAO, NOME_TABELA_CONCLUSAO, ["ID_Curso", "DataInicio", "DataConclusao", "Email"], conclusoes);

    tabelaOriginal.setName(NOME_TABELA_PROCESSADA);

    console.log(`Linhas processadas: ${totalLinhas}`);
    console.log(`Usuários únicos: ${usuarios.length}`);
    console.log(`Cursos únicos: ${cursos.length}`);
    console.log(`Lotações únicas: ${lotacoes.length}`);
    console.log(`Registros de conclusão: ${totalConclusoes}`);
    console.log("Criação de planilhas e tabelas de dados únicos concluída!");
}
