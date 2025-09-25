/**
 * ============================================================
 * SCRIPT: Processamento e Limpeza de Dados - Servidores SAE
 * VERSÃO: 3.5.1 Final
 * AUTOR: Guilherme
 * DATA: 02/09/2025
 * ============================================================
 *
Compactar Fluxo SAE - Teste * OBJETIVO:
 * ---------
 * Automatizar a limpeza, padronização e organização dos dados
 * da planilha "servidores", gerando a tabela final "TabelaServidoresSAE"
 * pronta para uso, com preenchimento automático de campos, remoção
 * de duplicatas e filtragem de registros inválidos.
 *
 * MÉTODO DE EXECUÇÃO:
 * -------------------
 * 1. Localiza o cabeçalho oficial pela coluna "ENTIDADE/ÓRGÃO".
 * 2. Remove linhas iniciais irrelevantes.
 * 3. Detecta a última linha real de dados, ignorando linhas vazias
 *    ou com apenas formatação.
 * 4. Preenche valores vazios na coluna Órgão com o último valor válido.
 * 5. Remove duplicatas com base no nome normalizado.
 * 6. Remove acentos e caracteres especiais de todos os campos.
 * 7. Valida e-mails (mantém apenas formatos corretos).
 * 8. Ignora registros cujo nome esteja com formatação tachada (strikethrough).
 * 9. Gera tabela final com colunas padronizadas e origem dos dados.
 *
 * DETALHES TÉCNICOS:
 * ------------------
 * - Função `removerAcentos()` usa `normalize("NFD")` + regex Unicode.
 * - Regex de e-mail simples para validação básica.
 * - Processamento em memória para reduzir chamadas ao Excel e aumentar performance.
 * - Identificação dinâmica de índices de colunas, permitindo mudança de ordem.
 * - Compatível com qualquer tamanho de planilha.
 *
 * OBSERVAÇÕES IMPORTANTES:
 * ------------------------
 * - Se a tabela final já existir, o script não executa novamente.
 * - Caso a planilha "servidores" não exista, o script encerra sem erro.
 * - Linhas com nome tachado são ignoradas (exclusão lógica).
 * - E-mails inválidos são limpos (campo fica vazio).
 * - Coluna "CARGO" tem "CC" substituído por "Cargo Comiss".
 * - Origem dos dados é marcada como "CGAJAPDI-Servidores".
 *
 * HISTÓRICO DE VERSÕES:
 * ---------------------
 * v4.0.0 - xx/xx/2025
 *      - Testes para automação da tarefa com recebimento via e-mail e integração com Power Apps totalmente automazida.
 *      - Em desenvolvimento.
 * 
 * v3.5.1 - 02/09/2025
 *      - Descrição: Apenas pequenas correções antes da versão final e totalmente funcional para o Power Apps.
 *      - Restauração da filtragem por nomes tachados.
 *      - Otimização de performance (menos chamadas na API para o Power Automate).
 *      - Comentários detalhados adicionados para documentação.
 *      - Ajuste na detecção da última linha real.
 * 
 * v3.5.0 - 25/08/2025
 *      - Descrição: Versão utilizada para testes iniciais no fluxo.
 *      - Adicionada verificação de formato de e-mail.
 *      - Adicionada remoção de apóstrofos.
 *      - Adicionada formatação de nomes próprios (Proper Case).
 *      - Adicionada formatação de e-mails para minúsculas.
 * 
 * v3.0.0 - 10/08/2025
 *      - Descrição: Versão inicial consolidada.
 *      - Implementada a lógica de remoção de duplicatas.
 *      - Implementada a lógica de desmesclar e preencher.
 *      - Implementada a remoção de acentos e limpeza de espaços.
 * 
 *v2.0.0 - 06/07/2025
 *      - Descrição: Versão pré-Power Automate, precisamos tratar algumas partes da tabela antes de enviar para o fluxo.
 *      - Adicionada a lógica para selecionar e renomear as colunas finais.
 *      - Adicionada a funcionalidade para detectar e ignorar servidores com nome taxado (strikethrough).
 *      - Implementada a função para remover acentos de todos os campos de texto.
 *      - Implementada a lógica para remover registros duplicados com base no nome.
 *
 * v1.0.0 - 02/07/2025
 *      - Descrição: Versão inicial do script.
 *      - Implementada a funcionalidade para encontrar o cabeçalho, remover lixo inicial,
 *      - Desmesclar a coluna de órgão e preenchê-la para baixo.
 *      - Criada a estrutura básica de criação da tabela final.
 * 
 * ============================================================
 */
function main(workbook: ExcelScript.Workbook) {
    /**
     * =========================
     * CONFIGURAÇÃO FIXA
     * =========================
     * Nomes de planilha, tabela e colunas usados pelo script.
     * Mantidos fixos para rodar de forma automática, sem parâmetros externos.
     */
    const NOME_PLANILHA_PRINCIPAL = "servidores";
    const NOME_TABELA_FINAL = "TabelaServidoresSAE";
    const NOME_COLUNA_ORGAO = "ENTIDADE/ÓRGÃO";
    const NOME_COLUNA_NOME = "NOME";
    const NOME_COLUNA_CARGO = "CARGO";
    const NOME_COLUNA_EMAIL = "E-MAIL";
    const VALOR_ORIGEM_DADOS = "CGAJAPDI-Servidores";

    /**
     * =========================
     * ETAPA 0 - VERIFICAÇÕES INICIAIS
     * =========================
     * - Se a tabela final já existe, não processa novamente.
     * - Se a planilha não existe, encerra.
     */
    if (workbook.getTable(NOME_TABELA_FINAL)) return;
    const planilha = workbook.getWorksheet(NOME_PLANILHA_PRINCIPAL);
    if (!planilha) return;

    // Remove qualquer tabela existente para trabalhar apenas com ranges
    planilha.getTables().forEach(t => t.convertToRange());

    /**
     * =========================
     * ETAPA 1 - LOCALIZAR CABEÇALHO
     * =========================
     * - Procura a linha onde está o cabeçalho oficial (coluna Órgão).
     * - Remove linhas "lixo" acima dele.
     */
    const rangeVerificacao = planilha.getRange("A1").getResizedRange(4, 20).getValues();
    let indiceLinhaCabecalho = rangeVerificacao.findIndex(linha =>
        linha.some(celula => typeof celula === 'string' && celula.trim().toUpperCase() === NOME_COLUNA_ORGAO.toUpperCase())
    );
    if (indiceLinhaCabecalho === -1) return;
    if (indiceLinhaCabecalho > 0) {
        planilha.getRange(`A1:A${indiceLinhaCabecalho}`).getEntireRow().delete(ExcelScript.DeleteShiftDirection.up);
    }

    /**
     * =========================
     * ETAPA 2 - DETECTAR ÚLTIMA LINHA REAL
     * =========================
     * - getUsedRange() pode incluir linhas "fantasmas" com formatação.
     * - Aqui filtramos para pegar apenas até a última linha com dados reais.
     * - Também removemos linhas totalmente vazias no meio.
     */
    let rangeUsado = planilha.getUsedRange();
    if (!rangeUsado) return;
    let valores = rangeUsado.getValues();

    valores = valores.filter(linha => !linha.every(c => c === null || c.toString().trim() === ""));
    if (valores.length <= 1) return; // só cabeçalho ou vazio

    // Redimensiona o range para o tamanho real dos dados
    rangeUsado = planilha.getRangeByIndexes(0, 0, valores.length, valores[0].length);

    /**
     * =========================
     * ETAPA 3 - IDENTIFICAR ÍNDICES DAS COLUNAS
     * =========================
     * - Isso garante que o script funcione mesmo que a ordem das colunas mude.
     */
    const cabecalhos = valores[0];
    const idxOrgao = cabecalhos.indexOf(NOME_COLUNA_ORGAO);
    const idxNome = cabecalhos.indexOf(NOME_COLUNA_NOME);
    const idxCargo = cabecalhos.indexOf(NOME_COLUNA_CARGO);
    const idxEmail = cabecalhos.indexOf(NOME_COLUNA_EMAIL);
    if (idxOrgao === -1 || idxNome === -1) return;

    /**
     * =========================
     * ETAPA 4 - FUNÇÕES DE APOIO
     * =========================
     * - removerAcentos: remove acentos e cedilhas usando normalize().
     * - regexEmail: valida formato básico de e-mail.
     */
    const removerAcentos = (texto: string): string =>
        typeof texto === 'string' ? texto.normalize("NFD").replace(/\p{Diacritic}/gu, "") : "";
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * =========================
     * ETAPA 5 - PREENCHIMENTO PARA BAIXO (ÓRGÃO)
     * =========================
     * - Preenche valores vazios na coluna Órgão com o último valor válido acima.
     * - Feito em memória para evitar múltiplas chamadas ao Excel.
     */
    let ultimoValorValido = "";
    for (let i = 1; i < valores.length; i++) {
        const celula = valores[i][idxOrgao];
        if (celula && celula.toString().trim() !== "") {
            ultimoValorValido = celula as string;
        } else {
            valores[i][idxOrgao] = ultimoValorValido;
        }
    }

    /**
     * =========================
     * ETAPA 6 - PROCESSAMENTO DE DADOS
     * =========================
     * - Remove duplicatas pelo nome (normalizado).
     * - Remove acentos e caracteres indesejados.
     * - Valida e-mails.
     * - Ignora linhas onde o nome está tachado (strikethrough).
     */
    const novoCabecalho = ["Lotacao_SAE", "NomeCompletoSAE", "Cargo_SAE", "Email_SAE", "OrigemDados"];
    const dadosFinais: (string | number | boolean)[][] = [];
    const nomesVistos = new Set<string>();

    // Criamos um range físico só para checar formatação (strikethrough)
    const corpoRange = rangeUsado.getOffsetRange(1, 0);

    for (let i = 1; i < valores.length; i++) {
        // Ignora linhas onde o nome está tachado
        if (corpoRange.getCell(i - 1, idxNome).getFormat().getFont().getStrikethrough()) continue;

        const linha = valores[i];
        const nomeOriginal = linha[idxNome] as string;
        if (!nomeOriginal || nomeOriginal.trim() === '') continue;

        const nomeNormalizado = nomeOriginal.trim().toLowerCase().replace(/\s+/g, ' ');
        if (nomesVistos.has(nomeNormalizado)) continue; // remove duplicatas
        nomesVistos.add(nomeNormalizado);

        let cargoProcessado = idxCargo > -1 ? removerAcentos(linha[idxCargo] as string) : "";
        cargoProcessado = cargoProcessado.replace(/CC/g, "Cargo Comiss");

        let emailProcessado = idxEmail > -1 ? removerAcentos(linha[idxEmail] as string) : "";
        if (emailProcessado && !regexEmail.test(emailProcessado)) {
            emailProcessado = ""; // limpa e-mail inválido
        }

        dadosFinais.push([
            removerAcentos(linha[idxOrgao] as string),
            removerAcentos(nomeOriginal.trim()),
            cargoProcessado,
            emailProcessado,
            VALOR_ORIGEM_DADOS
        ].map(item => typeof item === 'string' ? item.replace(/'/g, '') : item));
    }

    /**
     * =========================
     * ETAPA 7 - ESCRITA FINAL
     * =========================
     * - Limpa a planilha.
     * - Escreve os dados processados como tabela.
     * - Aplica formatação final.
     */
    planilha.getUsedRange()?.clear();
    if (dadosFinais.length > 0) {
        const dadosParaEscrever = [novoCabecalho, ...dadosFinais];
        const rangeFinal = planilha.getRange("A1").getResizedRange(dadosFinais.length, novoCabecalho.length - 1);
        rangeFinal.setValues(dadosParaEscrever);

        const novaTabelaFinal = planilha.addTable(rangeFinal, true);
        novaTabelaFinal.setName(NOME_TABELA_FINAL);

        const formatoFinal = novaTabelaFinal.getRange().getFormat();
        formatoFinal.autofitColumns();
        formatoFinal.setWrapText(false);
        formatoFinal.setRowHeight(15);
    }
}
