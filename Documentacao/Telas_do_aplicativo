# Telas do Aplicativo - Descrição Funcional

Esta seção detalha o fluxo de navegação e as principais funcionalidades de cada tela do Data Hub ESAE.

---

**1. Tela Inicial (Dashboard Principal)**
>
> Funciona como o hub de navegação central do aplicativo. Apresenta os botões principais para acesso aos módulos de gestão (Usuários Moodle, Cursos, Usuários SAE) e aos relatórios (Histórico de Conclusões, Dashboards de BI). Inclui também um botão de atualização para sincronizar os dados com o SharePoint sob demanda.
>
> * **Funções e Lógicas Principais:**
>     * **`OnVisible`:** `Concurrent(Refresh(LST_Usuarios); Refresh(LST_Cursos); Refresh('LST_Usuarios-Cursos'))` para garantir que os dados dos contadores estejam sempre atualizados ao visitar a tela.
>     * **Controles de Botão (Texto HTML):** Usam a propriedade `HtmlText` para combinar texto, quebras de linha (`<br>`) e a contagem de itens em tempo real (`CountRows()`).
>     * **Navegação:** A propriedade `OnSelect` de cada controle utiliza a função `Maps()` para direcionar o usuário ao módulo correspondente.
>
> ![Tela 1](Documentacao/Imagens/1.jpg)

---

**2. Gestão de Usuários (Moodle)**
>
> Tela de gestão da lista principal de usuários (`LST_Usuarios`). Apresenta uma galeria com a listagem completa dos utilizadores, permitindo uma busca delegável por nome ou e-mail. A vista prévia de cada utilizador exibe informações chave como lotação, e-mail e status SAE. Ao selecionar qualquer utilizador, o administrador é direcionado para a sua tela de detalhes.
>
> * **Funções e Lógicas Principais:**
>     * **`OnVisible`:** `Reset(txtBuscaUsuario)` para limpar o campo de busca automaticamente.
>     * **`Items` (Galeria):** Utiliza uma fórmula `Filter` com o operador `in` para uma busca do tipo "contém" que é delegável: `Filter(LST_Usuarios; IsBlank(txtBuscaUsuario.Value) Or txtBuscaUsuario.Value in NomeCompleto)`.
>     * **`OnSelect` (Galeria):** `Set(gblUsuarioSelecionado; ThisItem);; Navigate(tela_detalhes_usuarios)` para guardar o registro selecionado e navegar.
>
> ![Tela 2](Documentacao/Imagens/2.jpg)

---

**3. Tabela de Usuários (Moodle)**
>
> Apresenta os mesmos dados da lista de gestão, mas em um formato de tabela densa, utilizando o controle Data Table. Esta vista é otimizada para a análise de um grande volume de dados na tela e serve de base para futuras funcionalidades de exportação.
>
> * **Funções e Lógicas Principais:**
>     * **Controle `Data Table`:** A propriedade `Items` é conectada à mesma fonte de dados filtrada da tela anterior para consistência.
>
> ![Tela 3](Documentacao/Imagens/3.jpg)

---

**4. Detalhes do Usuário (Moodle)**
>
> Oferece uma visão 360° de um utilizador selecionado. Um Formulário de Exibição no topo mostra todos os seus dados de perfil, enquanto uma galeria na parte inferior lista o histórico completo de todos os cursos em que o utilizador está inscrito ou que já concluiu.
>
> * **Funções e Lógicas Principais:**
>     * **`Item` (Formulário):** `gblUsuarioSelecionado` para exibir os dados do usuário.
>     * **`Items` (Galeria de Histórico):** Utiliza a coluna de texto otimizada (`FK_Usuario_in_Text`) para buscar de forma delegável todos os cursos de um usuário: `Filter('LST_Usuarios-Cursos'; FK_Usuario_in_Text = Text(gblUsuarioSelecionado.ID))`.
>
> ![Tela 4](Documentacao/Imagens/4.jpg)

---

**5. Gestão de Cursos**
>
> Tela de gestão do catálogo de cursos (`LST_Cursos`), com uma interface e lógica semelhantes à tela de gestão de usuários. Permite a busca por nome ou ID do curso e a navegação para os detalhes de um curso específico.
>
> * **Funções e Lógicas Principais:**
>     * **`Items` (Galeria):** Utiliza uma fórmula `Filter` com `With` para uma busca universal que lida com texto (`in Nome_Curso`) e número (`PK_ID_Curso = NumeroBusca`).
>
> ![Tela 5](Documentacao/Imagens/5.jpg)

---

**6. Tabela de Cursos**
>
> Vista em formato de tabela do catálogo completo de cursos, otimizada para análise e futuras exportações.
>
> * **Funções e Lógicas Principais:**
>     * **Controle `Data Table`:** A propriedade `Items` é conectada à mesma fonte de dados filtrada da tela de gestão de cursos.
>
> ![Tela 6](Documentacao/Imagens/6.jpg)

---

**7. Detalhes do Curso**
>
> Apresenta todas as informações de um curso selecionado (datas, carga horária, etc.) e, crucialmente, exibe uma galeria com a lista de todos os participantes que estão inscritos ou que já concluíram aquele curso.
>
> * **Funções e Lógicas Principais:**
>     * **`OnVisible`:** `ClearCollect(colAlunosDoCurso; Filter('LST_Usuarios-Cursos'; FK_Curso_in_Text = Text(gblCursoSelecionado.PK_ID_Curso)))` para carregar de forma performática e delegável apenas os alunos do curso.
>     * **`Items` (Galeria de Alunos):** A galeria é conectada à coleção local `colAlunosDoCurso`, tornando a rolagem instantânea.
>
> ![Tela 7](Documentacao/Imagens/7.jpg)

---

**8. Histórico de Conclusões Recentes**
>
> Tela de relatório que exibe todas as conclusões de cursos que ocorreram num período de tempo definido.
>
> * **Funções e Lógicas Principais:**
>     * **`OnSelect` (Botões de Filtro):** Botões como "Esta Semana" usam `UpdateContext` para definir variáveis de data (`varDataInicioFiltro`, `varDataFimFiltro`).
>     * **`Items` (Galeria):** A galeria é filtrada com base nessas variáveis de data: `Filter('LST_Usuarios-Cursos'; Data_Conclusao >= varDataInicioFiltro And Data_Conclusao < DateAdd(varDataFimFiltro; 1))`.
>
> ![Tela 8](Documentacao/Imagens/8.jpg)

---

**9. Dashboard Interativo de Cursos (BI)**
>
> Tela de análise visual focado nos cursos. Apresenta um gráfico interativo (construído com uma galeria) que mostra os cursos mais populares.
>
> * **Funções e Lógicas Principais:**
>     * **Técnica "Galeria como Gráfico":** Utiliza uma galeria de altura flexível para simular um gráfico de barras.
>     * **`Width` (Barra do Gráfico):** `(Parent.Width * 0,7) * (ThisItem.QtdAlunos / Max(colTopCursos; QtdAlunos))` para desenhar barras proporcionais.
>     * **`OnSelect` (Galeria):** Permite clicar em uma "barra" e navegar para os detalhes daquele curso.
>
> ![Tela 9](Documentacao/Imagens/9.jpg)

---

**10. Gestão de Usuários SAE**
>
> Tela principal para a gestão da lista de referência `LST_Usuarios_SAE`. Inclui uma galeria com filtros avançados que permitem ao administrador visualizar os utilizadores por `Status` e por `OrigemDados`.
>
> * **Funções e Lógicas Principais:**
>     * **`Items` (Galeria):** Utiliza uma fórmula `Filter` que combina a busca por texto com múltiplos menus suspensos de forma delegável.
>
> ![Tela 10](Documentacao/Imagens/10.jpg)

---

**11. Tela de Auditoria de Inconsistências**
>
> Tela de "ações necessárias" que exibe uma lista filtrada apenas com os utilizadores que o fluxo "auditor" do Power Automate sinalizou como tendo dados inconsistentes.
>
> * **Funções e Lógicas Principais:**
>     * **`Items` (Galeria):** Utiliza uma fórmula `Filter` para buscar na `LST_Usuarios_SAE`, mas com uma condição `LookUp` que verifica a coluna `ValidarSAE` na `LST_Usuarios`.
>
> ![Tela 11](Documentacao/Imagens/11.jpg)

---

**12. Tabela Completa de Usuários SAE**
>
> Apresenta os dados da lista `LST_Usuarios_SAE` em um formato de tabela denso, otimizado para análise.
>
> * **Funções e Lógicas Principais:**
>     * **Controle `Data Table`:** A propriedade `Items` é conectada à mesma fonte de dados filtrada da tela de gestão SAE.
>
> ![Tela 12](Documentacao/Imagens/12.jpg)

---

**13. Tela de Detalhes e Reconciliação (SAE vs. Moodle)**
>
> Tela de análise comparativa. Apresenta dois formulários lado a lado, mostrando as informações de um mesmo utilizador como estão na lista `LST_Usuarios_SAE` e como estão na lista principal `LST_Usuarios`.
>
> * **Funções e Lógicas Principais:**
>     * **`OnVisible`:** Usa `UpdateContext` para criar variáveis locais (`locSAEUser`, `locMoodleUser`) que armazenam os registros das duas listas, otimizando a performance.
>     * **`Visible` (Controles):** A visibilidade do formulário Moodle e de uma mensagem de "não encontrado" é controlada pela fórmula `IsBlank(locMoodleUser)`.
>
> ![Tela 13](Documentacao/Imagens/13.jpg)

---

**14. Análise da Auditoria**
>
> Detalhe do fluxo de auditoria. Esta imagem exemplifica um utilizador que foi sinalizado como não inscrito na plataforma moodle.
>
> * **Funções e Lógicas Principais:**
>     * Esta é uma vista da tela de detalhes (13), onde a fórmula `IsBlank(locMoodleUser)` resultou em `true`, tornando a mensagem de alerta visível.
>
> ![Tela 14](Documentacao/Imagens/14.jpg)

---

**15. Análise do Alerta (Inconsistência Tipo 2)**
>
> Segundo exemplo do fluxo de auditoria. A mensagem de alerta em amarelo destaca uma outra regra de negócio.
>
> * **Funções e Lógicas Principais:**
>     * Novamente uma vista da tela 13, mas aqui a visibilidade de um ícone de alerta ⚠️ é controlada por uma fórmula de comparação de status, como: `locMoodleUser.Usuario_SAE.Value = "Sim" && locSAEUser.Status.Value = "Inativo"`.
>
> ![Tela 15](Documentacao/Imagens/15.jpg)

---

**16. Layout Responsivo para Dispositivos Móveis**
>
> Demonstração da interface do aplicativo refatorada com Contêineres Flexíveis, mostrando como o layout se adapta automaticamente para as orientações vertical e horizontal em um celular.
>
> * **Funções e Lógicas Principais:**
>     * **Configurações do App:** `Ajustar à escala = Desativado`.
>     * **Contêineres de Layout:** Uso de contêineres verticais e horizontais para organizar os elementos.
>     * **Propriedades Responsivas:** Uso extensivo de `Parent.Width`, `Fill portions` e fórmulas com `If(App.ActiveScreen.Size <= 1; ...)` para alterar o layout e o tamanho de fontes.
>
> ![Tela 16](Documentacao/Imagens/16.jpg)

---

**17. Dashboard de BI (Power BI) - Tela Inicial**
>
> Tela principal do relatório no Power BI, que é integrado ao Power App. Apresenta os KPIs e os principais filtros.
>
> * **Funções e Lógicas Principais:**
>     * A integração é feita no Power App com um botão que usa a função `Launch("https://app.powerbi.com/...")` para abrir o relatório no navegador.
>
> ![Tela 17](Documentacao/Imagens/17.jpg)

---

**18. Dashboard de BI - Análise Comparativa**
>
> Vista do relatório no Power BI que permite o estudo de campo amostral, cruzando dados administrativos com os dados de participação em cursos.
>
> * **Funções e Lógicas Principais:**
>     * A lógica de cruzamento de dados e os visuais são construídos com **DAX e Power Query** dentro do Power BI Desktop.
>
> ![Tela 18](Documentacao/Imagens/18.jpg)

---

**19. Dashboard de BI - Distribuição por Lotação**
>
> Gráfico de barras ou pizza no Power BI que exibe a distribuição quantitativa de participantes por lotação.
>
> * **Funções e Lógicas Principais:**
>     * Visual de gráfico no Power BI, utilizando as colunas de Lotação e a contagem de usuários.
>
> ![Tela 19](Documentacao/Imagens/19.jpg)

---

**20. Dashboard de BI - Distribuição por Cargo**
>
> Análise visual no Power BI que mostra a distribuição de participantes por cargo.
>
> * **Funções e Lógicas Principais:**
>     * Visual de gráfico no Power BI, utilizando as colunas de Cargo e a contagem de usuários.
>
> ![Tela 20](Documentacao/Imagens/20.jpg)

---

**21. Dashboard de BI - Análise Temporal**
>
> Gráfico de linhas no Power BI que exibe a evolução do número de inscrições e conclusões ao longo do tempo.
>
> * **Funções e Lógicas Principais:**
>     * Visual de gráfico de linhas no Power BI, utilizando as colunas de data e medidas de contagem (`COUNTROWS`) em DAX.
>
> ![Tela 21](Documentacao/Imagens/21.jpg)
