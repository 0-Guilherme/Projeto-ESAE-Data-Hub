# KNOWN_ISSUES ⚠️ - Problemas Conhecidos e Suas Limitações

Este documento rastreia bugs conhecidos, limitações de arquitetura e potenciais problemas da solução atual.

---
## Classificação de Prioridade:
* 🔴 **Alta Prioridade:** Deve ser tratado o mais rápido possível.
* 🟡 **Média Prioridade:** Deve ser tratado nos próximos updates.
* 🔵 **Baixa Prioridade:** Será resolvido quando possível.

---

### Tratamento de Erros 🟡
- **Problema:** O fluxo de ingestão principal foi construído para ser resiliente (continua mesmo que a busca no Teams falhe), mas não possui um sistema avançado para registrar ou notificar sobre cada linha individual do Excel que possa falhar por outros motivos (ex: uma lotação que não foi encontrada).
- **Impacto:** Médio. Uma execução pode terminar com sucesso, mas algumas linhas podem não ter sido processadas.
- **Solução Planejada:** Implementar uma ramificação de tratamento de erros que, em caso de falha em uma etapa crítica, registre o erro em uma lista do SharePoint ou envie um e-mail de alerta para o administrador.

### Fluxo dos AJS-NS e Coordenadores 🔵
- **Problema:** O fluxo para ingestão dos dados da lista dos AJS-NS e Coordenadores ainda não foi configurado para o formato específico em que os dados são recebidos.
- **Impacto:** Baixo (enquanto a ingestão for manual). A ingestão destes dados ainda é um processo manual.
- **Solução Planejada:** Desenvolver um fluxo que utilize o nome do usuário para buscar e validar o e-mail no Microsoft 365 antes de sincronizar os dados.

### Interface Gráfica Responsiva 🔵
- **Problema:** O aplicativo não está totalmente adaptado para a orientação vertical em dispositivos móveis.
- **Impacto:** Em telas menores, a funcionalidade é limitada ao uso na horizontal.
- **Solução Planejada:** Continuar a refatoração das telas restantes utilizando contêineres flexíveis para permitir uma experiência nativa na vertical, seguindo o exemplo já aplicado na `tela_inicial` e `tela_dashboard`.

### Duplicata de Nomes (Script) 🔵
- **Problema:** Foi identificado um caso raro em que o script de limpeza do Excel pode não detectar um nome duplicado se ele contiver caracteres invisíveis ou formatações muito específicas.
- **Impacto:** Baixo. A lógica de verificação por e-mail (que é único) no fluxo do Power Automate serve como uma segunda camada de proteção contra a criação de usuários duplicados.
