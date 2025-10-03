# Dashboard de Inscrições e Conclusões por Período

## 🎯 Objetivo
Criar um dashboard inteligente e flexível para acompanhar inscrições e conclusões de alunos ao longo do tempo, com recortes por **Ano**, **Semestre** e **Quadrimestre**, usando uma única tabela de calendário como base de filtragem.

---
## Resultado Final

Um dashboard **limpo**, **flexível** e **inteligente**, com:

- ✅ Filtros temporais hierárquicos (Ano, Semestre, Quadrimestre)  
- ✅ Comparação visual entre inscrições e conclusões  
- ✅ Navegação intuitiva por período com uso de marcadores e botões  
- ✅ Interface centrada na experiência e demandas dos usuários

### Dashboard

![Dashboard Power BI](Imagens/17.jpg)

---
## Próximas Atualizações

* Adicionar **Distribuiução por lotação** , para análises mais precisas em relação a cada equipe. Problema: o nome das equipes não é padronizado.
* Adicionar números do campo amostral para comparativos diretos. Necessário pedir a administração com acesso a base de dados atual.
* Testar o método de título dinâmico para preenchimento de acordo com o filtro utilizado.

---
## 📚 Estrutura de Dados (Modelo Semântico)

A estrutura de dados no Power BI foi projetada para otimizar as análises, conectando as listas do SharePoint em um modelo semântico robusto. Foram utilizadas fórmulas DAX para criar tabelas e colunas adicionais que auxiliam na formatação e na montagem dos visuais, de acordo com as necessidades dos gestores.

O resultado são dashboards com indicadores objetivos, gráficos de distribuição mensal, análise de horas de capacitação e visões percentuais dos principais KPIs.

### Tabelas Envolvidas no Modelo

* **`LST_Usuarios` (Dimensão):** Tabela com os dados de cadastro dos usuários do Moodle.
* **`LST_Usuarios_SAE` (Dimensão):** Tabela de referência para identificar quais usuários fazem parte do público SAE.
* **`LST_Cursos` (Dimensão):** Catálogo com as informações de todos os cursos e eventos.
* **`LST_Lotacoes` (Dimensão):** Lista com o nome de todas as lotações únicas.
* **`LST_Usuarios-Cursos` (Fato):** Tabela central que registra todos os eventos de inscrição e conclusão, conectando as dimensões.
* **`dCalendario` (Dimensão):** Tabela de calendário, criada via DAX, que serve como o eixo do tempo para todas as análises.

---
### Tabela de Calendário (`dCalendario`)

Criada como uma Tabela Calculada em DAX para garantir uma base de tempo consistente e contínua para as análises. Devido a necessidades administrativas, os relatórios devem ser separados em filtros por ano, semestre e quadrimestres.

A construção em DAX se dá por:

```
dCalendario = 
ADDCOLUMNS (
    CALENDARAUTO(),
    "Ano", YEAR([Date]),
    "MesNome", FORMAT([Date], "mmmm"),
    "MesNumero", MONTH([Date]),
    "AnoMes", FORMAT([Date], "yyyy-mm"),
    "Semestre", IF(MONTH([Date]) <= 6, "1º Semestre", "2º Semestre"),
    "Quadrimestre", SWITCH(
        TRUE(),
        MONTH([Date]) <= 4, "1º Quadrimestre",
        MONTH([Date]) <= 8, "2º Quadrimestre",
        "3º Quadrimestre"
    )
)
```

---

## 🔗 Relacionamentos no Modelo do Power BI

A arquitetura do modelo de dados no Power BI foi projetada para permitir análises complexas e performáticas, conectando as tabelas de fatos (eventos) com as de dimensão (contexto).

### Relacionamentos Temporais (Análise de Datas)

Para permitir a análise por duas datas diferentes (**inscrição** e **conclusão**) a partir da mesma tabela de fatos, a seguinte estratégia de relacionamentos foi utilizada:

- `dCalendario[Date]` → `LST_Usuarios-Cursos[Data_Inscricao]` (**Relação Ativa**)
- `dCalendario[Date]` → `LST_Usuarios-Cursos[Data_Conclusao]` (**Relação Inativa**)

A relação inativa é ativada sob demanda dentro das medidas DAX utilizando a função `USERELATIONSHIP`, o que permite que a mesma tabela de calendário filtre os dados por duas perspectivas de tempo diferentes.

---

### Relacionamentos Estruturais (Vínculos de Dados)

Os seguintes vínculos formam a espinha dorsal do modelo de dados.

#### Relação: Usuarios-Curso → Usuários
Conecta cada registro de inscrição/conclusão ao participante correspondente.

* **Tabela de Origem (Muitos):** `LST_Usuarios-Cursos`
* **Coluna de Origem:** `FK_Usuario_in_Text`
* **Tabela de Destino (Um):** `LST_Usuarios`
* **Coluna de Destino:** `ID_Text` *(Coluna calculada que converte o ID numérico para texto)*
* **Cardinalidade:** Muitos para Um (`*..1`)
* **Propósito:** Permite que os filtros aplicados a um usuário (como sua lotação ou tipo) se propaguem para suas respectivas inscrições e conclusões.

#### Relação: Usuarios-Curso → Cursos
Conecta cada registro de inscrição/conclusão ao curso correspondente.

* **Tabela de Origem (Muitos):** `LST_Usuarios-Cursos`
* **Coluna de Origem:** `FK_Curso_in_Text`
* **Tabela de Destino (Um):** `LST_Cursos`
* **Coluna de Destino:** `PK_ID_Curso_Text` *(Coluna calculada que converte o ID numérico para texto)*
* **Cardinalidade:** Muitos para Um (`*..1`)
* **Propósito:** Permite que os filtros aplicados a um curso (como sua categoria) se propaguem para todos os seus participantes.

#### Relação: Usuários → Lotações
Conecta cada usuário à sua lotação oficial, permitindo agrupar e analisar os dados por departamento.

* **Tabela de Origem (Muitos):** `LST_Usuarios`
* **Coluna de Origem:** `Lotacao.Id` *(O ID da coluna de Pesquisa/Lookup)*
* **Tabela de Destino (Um):** `LST_Lotacoes`
* **Coluna de Destino:** `ID`
* **Cardinalidade:** Muitos para Um (`*..1`)
* **Propósito:** Fundamental para a criação de análises de engajamento por lotação.

#### Relação Virtual: Usuários → Usuários SAE
A relação entre os usuários do Moodle e os da lista SAE é gerenciada de forma virtual, através de medidas DAX, para máxima flexibilidade.

* **Tabelas Envolvidas:** `LST_Usuarios` e a tabela calculada `SAE_Limpo`.
* **Chave de Ligação:** A coluna `Email` em ambas as tabelas.
* **Cardinalidade:** Um para Um (`1..1`)
* **Propósito:** Permite cruzar dados e criar métricas como a "Contagem de Alunos Únicos (SAE)", filtrando os participantes dos cursos com base em uma lista de referência externa, sem a necessidade de criar um relacionamento físico no modelo.

---

# Análise Técnica: Medidas DAX para Cálculo de Horas e KPIs

Esta seção detalha as fórmulas (medidas) DAX utilizadas no Power BI. Elas transformam os dados brutos em indicadores de performance (KPIs), permitindo análises de profundidade sobre o investimento em capacitação.

---
## Lógica Conceitual e Aplicações

### A Lógica por Trás do Cálculo de Horas

Para calcular o total de horas, utilizamos a função iteradora **`SUMX`**. Esta função é essencial porque nos permite percorrer uma tabela, linha por linha, fazer um cálculo para cada linha e, no final, somar todos os resultados. O processo executado pela medida `[Total Horas Concluídas]` é o seguinte:

1.  **Filtragem Inicial (`FILTER`):** Primeiro, cria-se uma tabela virtual contendo **apenas** os registos da `LST_Usuarios-Cursos` onde o `StatusAluno` é `"Concluído"`.
2.  **Iteração e Busca de Dados (`SUMX` + `RELATED`):** A `SUMX` percorre esta tabela virtual. Para cada conclusão, a função `RELATED` "sobe" pelo relacionamento até à `LST_Cursos` e "puxa" a `Carga_Horaria` correspondente.
3.  **Soma Final:** A `SUMX` soma todas as cargas horárias que coletou, retornando o total geral.

### Aplicações das Medidas no Dashboard

Uma única medida bem construída pode ser utilizada em diversos visuais para responder a diferentes perguntas de negócio, graças ao **Contexto de Filtro** do Power BI.

* **Análise de "Horas por Usuário":** Ao usar a medida `[Total Horas Concluídas]` numa tabela ao lado do nome do usuário, o Power BI automaticamente filtra o cálculo para mostrar as horas acumuladas **apenas** por aquele usuário.
* **Análise de "Horas por Mês" ou "Horas por Lotação":** Da mesma forma, ao usar a medida como o valor de um gráfico de colunas com um campo de dimensão no eixo (como `dCalendario[AnoMes]` ou `'LST_Lotacoes'[Nome da Lotação]`), o Power BI recalcula a medida para cada contexto, permitindo análises de tendências e de engajamento por departamento.

---
##  Fórmulas Aplicadas (Dicionário de Medidas DAX)

Esta seção serve como um guia de referência para todas as lógicas de negócio e cálculos implementados no modelo semântico.

### Total de Inscrições
- **Descrição:** Realiza uma contagem simples de todas as linhas na tabela de fatos, representando o número total de matrículas.
- **Fórmula DAX:**
    ```dax
    Total de Inscrições = COUNTROWS('LST_Usuarios-Cursos')
    ```

### Total de Conclusões
- **Descrição:** Conta o número de matrículas que foram efetivamente concluídas, usando uma lógica segura.
- **Fórmula DAX:**
    ```dax
    Total de Conclusões = 
    CALCULATE(
        COUNTROWS('LST_Usuarios-Cursos'),
        'LST_Usuarios-Cursos'[StatusAluno] = "Concluído",
        NOT(ISBLANK('LST_Usuarios-Cursos'[Data_Conclusao])),
        'LST_Usuarios-Cursos'[Data_Conclusao] <= TODAY(),
        USERELATIONSHIP(dCalendario[Date], 'LST_Usuarios-Cursos'[Data_Conclusao])
    )
    ```

### Total Horas Concluídas
- **Descrição:** Calcula o volume total de horas de treinamento concluídas.
- **Fórmula DAX:**
    ```dax
    Total Horas Concluídas = 
    SUMX(
        FILTER(
            'LST_Usuarios-Cursos',
            'LST_Usuarios-Cursos'[StatusAluno] = "Concluído"
        ),
        RELATED('LST_Cursos'[Carga_Horaria])
    )
    ```

### Contagem de Alunos Únicos
- **Descrição:** Conta o número de participantes distintos que possuem pelo menos uma inscrição.
- **Fórmula DAX:**
    ```dax
    Contagem de Alunos Únicos = 
    DISTINCTCOUNT('LST_Usuarios-Cursos'[FK_Usuario_in_Text])
    ```

### Contagem de Alunos Únicos (SAE)
- **Descrição:** Variação que conta apenas os participantes únicos que pertencem ao grupo SAE.
- **Fórmula DAX:**
    ```dax
    Contagem de Alunos Únicos (SAE) = 
    CALCULATE(
        DISTINCTCOUNT('LST_Usuarios-Cursos'[FK_Usuario_in_Text]),
        LST_Usuarios[Usuario_SAE.Value] = "Sim"
    )
    ```

---

## 🎛️ Interatividade e UX

### Segmentadores de Dados (Slicers)

Utilizados para permitir filtros temporais hierárquicos:

- `dCalendario[Ano]`  
- `dCalendario[Semestre]`  
- `dCalendario[Quadrimestre]`

---

### Navegação por Período com Marcadores (Bookmarks)

Para criar uma experiência de navegação fluida entre os recortes de tempo, foram utilizados **Marcadores** e **Botões**:

- **Marcadores Criados**: Visão Anual, Visão Semestral, Visão Quadrimestral  
- **Botões Configurados**: Cada botão ativa um marcador específico  
- **Painel de Seleção**: Usado para ocultar os slicers que não são relevantes em cada visão  
  *(ex: na "Visão Semestral", o slicer de Quadrimestre é ocultado)*

---

### Título Dinâmico do Período

Para que o usuário saiba sempre qual período está sendo analisado, foi criada uma medida DAX que gera um título dinâmico:

```
PeriodoSelecionado =   
VAR AnoSelecionado = SELECTEDVALUE(dCalendario[Ano])  
VAR SemestreSelecionado = SELECTEDVALUE(dCalendario[Semestre])  
VAR QuadrimestreSelecionado = SELECTEDVALUE(dCalendario[Quadrimestre])  
RETURN  
    IF(  
        HASONEVALUE(dCalendario[Quadrimestre]), QuadrimestreSelecionado & " de " & AnoSelecionado,  
        IF(  
            HASONEVALUE(dCalendario[Semestre]), SemestreSelecionado & " de " & AnoSelecionado,  
            IF(  
                HASONEVALUE(dCalendario[Ano]), "Ano " & AnoSelecionado,  
                "Todo o Período"  
            )  
        )  
    )
```

---
