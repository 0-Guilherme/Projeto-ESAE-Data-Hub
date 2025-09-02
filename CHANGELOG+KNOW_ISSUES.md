# Este Documento contém o CHANGELOG e o KNOW_ISSUES

Posteriormente incluir informações para o README neste arquivo!

# CHANGELOG 🔧 - Histórico de Alterações do Aplicativo

Todos as mudanças notáveis neste projeto serão documentadas neste arquivo.

---

## [0.5.0] - In Dev
### Adicionado (CHANGELOG)
- O fluxo SAE-CGAJAPDI-Servidores-v2 está apto a gerar uma lista em excel com os novos usuários.
- A LST_Usuarios agora tem uma coluna com Data da Última Modificação.
- Fluxo_Usuarios-v2 24% mais eficiente após as mudanças.
- Script_Usuarios-v2 foi separado em tabelas com nomes únicos para diminuir a quantidade de tempo gasto em loops entre as listas de nomes e conclusões.
- Fluxo_SAE-CGAJAPDI-Servidores-v2 está apto a rodar na nuvem em sua totalidade. Basta enviar e-mail, assunto "Fluxo_Atualizar_SAE".
- Script_SAE-CGAJAPDI-Servidores-v4.0.0 está totalmente atualizado e funcional.

### Problemas (KNOW_ISSUES)
- Provavel 1 curso sem ID no ultimo relatório rodado, necessario adicionar try/catch para pegar essa exceção.


### Informações Extras (TRABALHANDO)
>>> Tentar Try and Catch para achar problemas no fluxo, ou separar a informação.
>>> Última ingestão de dados em 22/08/2025

---

# Planejamento para Novas Versões

Este documento descreve o roteiro de desenvolvimento para futuras versões do sistema, focando em agregar valor, robustez e novas funcionalidades à base já construída.

## [Não Lançado] - Planejamento para Próximas Versões

### Adicionar
- [ ] **Gráficos no Dashboard:** Inclusão de elementos visuais de BI na tela principal para análise de dados (`Gráfico de Colunas` para Top Cursos, `Gráfico de Pizza` para distribuição de usuários).
- [ ] **Ferramenta de Mesclagem de Lotações:** Nova tela no Power App e fluxo associado para permitir que administradores corrijam e unifiquem registros de lotações duplicados.
- [ ] **Filtros Adicionais na Tela de Conclusões:** Implementar novos filtros na `TelaConclusoesRecentes` (ex: "Este Mês", "Últimos 7 dias") para facilitar a análise dos gestores.

### Melhorar
- [ ] **Interface Gráfica Responsiva:** Refatorar as telas do Power App utilizando Contêineres de Layout para garantir a adaptabilidade a dispositivos móveis em modo vertical.
- [ ] **Otimizar Fluxo de Dados da `LST_Usuarios`:** Revisar o fluxo de sincronização para reduzir o número de chamadas e otimizar a performance, garantindo que não exceda os limites diários de solicitações da plataforma.
- [ ] **Tratamento de Erros Avançado:** Implementar um sistema de notificação por e-mail no Power Automate para alertar administradores sobre falhas na execução dos fluxos.
- [ ] **Fluxo de Ingestão AJS-NS:** Desenvolver um novo fluxo de trabalho para processar a lista de AJS-NS, que é recebida em um formato diferente (apenas nomes). O fluxo precisará buscar e validar os e-mails no Microsoft 365 para enriquecer os dados antes de sincronizá-los.
- [ ] **Fluxo de Ingestão da CGAJAPI:** Automatizar o fluxo para usar gatilho por email e processar automaticamente.

---

### Fluxo dos Relatórios da Silvia 
> Power Automate: Relatorios_ESAE_Teste
> Recebe Relatorio do Moodle: Automatico_ID=1 =2 =3 e envia para o e-mail relacionado
> Scripts Utilizados - Relatorio_ESAE_Testes - Criar_Tabela_1 // Mudar_Datas // Criar_Tabelas_Dinamicas
> ID = 1 Rodando normalmente a cada semana. ID = 2 e 3 Pausados, rodando sob solicitação do Rodrigo

---

## [0.4.0] - 2025-08-28

### Adicionado
- **Módulo de Gestão de Usuários SAE:** Criada a lista `LST_Usuarios_SAE` para servir como "fonte da verdade" para usuários externos.
- **Fluxo de Sincronização SAE:** Criado um novo fluxo no Power Automate para sincronizar a lista `LST_Usuarios_SAE` a partir de um arquivo Excel, incluindo lógica de inativação de usuários removidos.
- **Telas de Reconciliação no Power App:** Criadas as telas `TelaGerenciarUsuariosSAE` (com filtros) e `TelaDetalhesUsuarioSAE` (para comparação lado a lado dos dados SAE vs. Moodle).
- **Fluxo "Auditor":** Implementada uma automação agendada para verificar e sinalizar inconsistências de status entre as listas `LST_Usuarios` e `LST_Usuarios_SAE`.
- **Pré-processamento com Office Scripts:** Criado um script mestre para limpar e formatar os relatórios do Excel (SAE e Moodle) antes da ingestão de dados.

### Alterado
- **Escopo do Power App:** O aplicativo foi redefinido como uma ferramenta de **visualização e consulta** para os dados do Moodle.
- **Fluxo Principal do Moodle:** A lógica de preenchimento do campo `Usuario_SAE` foi alterada para consultar a lista `LST_Usuarios_SAE`.

### Removido
- **Funcionalidade de Edição/Criação:** As telas e botões para criar/editar/excluir usuários e cursos das listas principais foram removidos.

### Corrigido
- **Filtros Complexos não Delegáveis:** Otimizadas as fórmulas de filtro em várias telas (como `TelaAuditoria`) para serem delegáveis ao SharePoint, utilizando `SortByColumns` e reestruturando a lógica para resolver problemas de performance e os limites de delegação de dados.
- Múltiplos erros de conversão de tipo de dado (Datas, Números, Booleanos) no Power Automate.

---

## [0.3.0] - 2025-08-04

### Adicionado
- **Fluxo de Ingestão de Dados (Power Automate):** Criado o fluxo principal acionado por arquivo no OneDrive para sincronizar os dados do Moodle com o SharePoint.
- **Lógica de Sincronização Otimizada:** Implementado o padrão de "Selecionar" e "Compor" (`union`) para processar apenas usuários e cursos únicos, melhorando a performance.
- **Lógica de "Check-then-Create/Update":** O fluxo agora verifica se um registro já existe antes de criá-lo, para evitar duplicatas.
- **Contagem Automática de Alunos:** Adicionada uma etapa ao final do fluxo de ingestão que calcula e atualiza a coluna `QtdAlunos`.
- **Tela de "Conclusões Recentes":** Criada tela no Power App para exibir conclusões dos últimos meses, com filtros de data dinâmicos.

### Corrigido
- **Problemas de Delegação:** Otimizadas as fórmulas das galerias nas telas de detalhes com `SortByColumns` para resolver problemas de lentidão com mais de 2000 itens.
- **Erros de Tipo de Dado:** Resolvidos múltiplos erros de conversão de dados (Datas, Números, Booleanos) no Power Automate.

---

## [0.2.0] - 2025-07-10

### Adicionado
- Funcionalidade completa de CRUD para Usuários e Cursos no Power App para manter o controle dos dados nas etapas iniciais de desenvolvimento.
- Telas de formulário (`TelaEditarUsuario`, `TelaNovoUsuario`, etc.) utilizando o controle `Formulário de Edição`.
- Lógica de `NewForm()` e `ResetForm()` para gerenciamento do estado dos formulários.
- Implementado pop-up de confirmação para a ação de excluir.

---

## [0.1.0] - 2025-06-22

### Adicionado
- **Base de Dados:** Criadas as 4 listas iniciais no SharePoint (`LST_Usuarios`, `LST_Cursos`, `LST_Lotacoes`, `LST_Usuarios-Cursos`).
- **Power App (Interface de Leitura):**
    - `TelaDashboard` com indicadores de contagem (`CountRows()`) e navegação principal.
    - `TelaUsuarios` e `TelaCursos` com galerias e caixas de busca.
    - `TelaDetalhesUsuario` e `TelaDetalhesCurso` para visualização 360°, incluindo sub-galerias para dados relacionados.
    - Navegação cruzada entre as telas de detalhes.

---

## KNOW_ISSUES ⚠️ - Problemas Conhecidos e Suas Limitações

Este documento rastreia bugs conhecidos, limitações de arquitetura e potenciais problemas da solução atual.

---

## Integridade dos Dados

### Duplicata de Nomes (Script) 🔵
- **Problema:** Foi identificado um caso raro em que o script de limpeza do Excel pode não detectar um nome duplicado se ele contiver caracteres invisíveis ou formatações muito específicas.
- **Impacto:** Baixo. A lógica de verificação por e-mail (que é único) no fluxo do Power Automate serve como uma segunda camada de proteção contra a criação de usuários duplicados.

## Automação (Power Automate)

### Tratamento de Erros 🟡
- **Problema:** O fluxo de ingestão principal foi construído para ser resiliente (continua mesmo que a busca no Teams falhe), mas não possui um sistema avançado para registrar ou notificar sobre cada linha individual do Excel que possa falhar por outros motivos (ex: uma lotação que não foi encontrada).
- **Impacto:** Médio. Uma execução pode terminar com sucesso, mas algumas linhas podem não ter sido processadas.
- **Solução Planejada:** Implementar uma ramificação de tratamento de erros que, em caso de falha em uma etapa crítica (como a busca de ID de Lotação), registre o erro em uma lista do SharePoint ou envie um e-mail de alerta para o administrador.

### Sobrecarga de Dados 🔵
- **Problema:** O fluxo de ingestão principal foi construído com muitas redundancias, gerando uma quantidade de loop desnecessária para as versões futuras.
- **Impacto:** Baixo. Dependendo da quantidade de dados pode exeder o limite de 10.000 solicitações diárias, deixando o fluxo lento.
- **Solução Planejada:** Otimizar o fluxo, utilizando tabelas de nomes de usuarios unicos e cursos unicos, a fim de reduzir a redundancia no preenchimento das LST_Usuarios e LST_Cursos, mantendo o fluxo completo para a LST_Usuarios-Curso.

### Fluxo dos AJS-NS 🟡
- **Problema:** O fluxo para ingestão dos dados da lista dos AJS-NS não esta configuado diretamente para o formato em que recebemos.
- **Impacto:** Médio. Necessario ajustar para a correta ingestão, uma vez que apenas recebemos os nomes via planilha, diferente da CGAJAPDI que vem a tabela com todos os dados completo.
- **Solução Planejada:** Ajustar para utilizar apenas o Nome do Ususario para preencher os dados, fazendo buscas no teams para capturar o email do usuario, possivelmente sendo necessario analisar mais de um e-mail deste usuario para o colocar na lista.

## Desempenho (Power Apps)

### Interface Gráfica 🔵
- **Problema:** A tela do aplicativo não é adaptavel para dispositivos móveis.
- **Impacto:** Em telas menores a unica forma de funcionalidade atual é utilizar na horiontal, virando a tela, o que precisamos e adaptar para vertical e manter todas as funcionalidades visuais.
- **Solução Planejada:** Criar layout adaptativo ou diretamente para o Mobile.

```
### Fluxo dos AJS-NS 🔴 🟡 🔵 🟢
- **STATUS:** ❌ RESOLVIDO
- **MÉTODO:**   

- **Problema:**
- **Impacto:**
- **Solução Planejada:**
```

## 🛠️ Como Reportar Problemas

### Antes de Reportar
Verifique se o problema já está listado aqui

### Template de Report
```markdown
## Problema Reportado

**Versão**: 1.0.0
**Ambiente**: [Windows 11, IOS]

### Descrição
[Descreva o problema]

### Passos para Reproduzir
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

### Comportamento Esperado
[O que deveria acontecer]

### Comportamento Atual
[O que está acontecendo]

### Logs de Erro
[Se houver, cole os logs aqui]
```

## 📞 Suporte

Para problemas não listados aqui:
1. Consulte o `CHANGELOG.md` para mudanças recentes
2. Contato Teams: e-guilherme-ramos@pge.rs.gov.br

---

**Última Atualização**: 2025-09-02

**Versão do Documento**: 0.9.0

