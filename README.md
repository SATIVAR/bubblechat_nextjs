## Bubblechat Platform PRD (Revisado)

### 1. Visão Geral.

**Bubblechat** é uma plataforma SaaS multi-tenant para gerenciamento de agentes de IA, focada em atendimento automatizado e geração de orçamentos a partir de documentos. O sistema conta com:

- Área exclusiva de **Super Admin** para configuração e monitoramento.
- Widget de chat embarcável (script de header/footer) para clientes.
- Processamento inteligente de **PDF**, **imagens** (OCR) e **tabelas**.
- Conexão com múltiplos provedores de LLM, incluindo Agno.
- Autenticação via sistema próprio e **Google Auth**.
- Planos de licença: Básico, Profissional e Enterprise.

...
Credenciais para teste:

Email: admin@bubblechat.com
Senha: admin
...

### 2. Objetivos do Produto

1. Automatizar extração de dados de diferentes formatos de documentos.
2. Contextualizar as informações extraídas para geração precisa de orçamentos.
3. Prover controle total ao Super Admin e facilidade de integração para clientes.
4. Garantir segurança e escalabilidade multi-tenant.

### 3. Usuários e Permissões

| Papel           | Acesso                                                                                  |
| --------------- | --------------------------------------------------------------------------------------- |
| **Super Admin** | Dashboard completo (Next.js) e acesso a logs e métricas.                                |
| **Cliente**     | Recebe script (JS) para incorporar o widget no sistema; não acessa dashboard.           |
| **Funcionário** | Usa o widget dentro do sistema do cliente para atendimento e solicitação de orçamentos. |

### 4. Fluxo de Extração e Orçamento

1. **Upload/Envio**: Funcionário no widget envia documento (PDF, imagem ou Excel/CSV).
2. **Processamento**:
   - PDFs: uso de **PDF.js** (Node) / **pdf-parse** para extração de texto e tabelas.
   - Imagens: OCR com **Tesseract.js** (frontend) e **Google Cloud Vision** (backend).
   - Planilhas: parsing via **SheetJS** (xlsx) para leitura de células e tabelas.
3. **Normalização**: Limpeza e formatação dos dados extraídos (regex, heurísticas).
4. **Contextualização**: Geração de prompt para o agente, agregando histórico do cliente e parâmetros de orçamento.
5. **Geração de Orçamento**: Agente de IA (Agno ou OpenAI) responde com proposta de orçamento.
6. **Apresentação**: Orçamento exibido no widget e salvo no Firestore para histórico.

### 5. Integração e APIs

- **Widget**: Script JS embedável (header/footer) que carrega o componente React (widget-fab).
- **APIs** (Node.js / Express):
  - /api/upload → recebe documentos.
  - /api/process → aciona processamento e OCR/PDF parsing.
  - /api/context → envia dados ao LLM (Agno/OpenAI).
  - **Webhooks**: opcional para notificações em frameworks externos (Agno).

### 6. Contextualização de Agente

- **No Super Admin**: editor de texto rich (Markdown) para calibrar contexto geral (prompts-padrão, variáveis de negócio).
- **Via Arquivos**: upload de docx, .xlsx, .csv para alimentar dados de contexto (e.g., tabela de preços).
- **API/Webhook**: endpoints para sincronizar base de conhecimento externa (Agno, CRM).

### 7. Autenticação e Segurança

- **NextJS**: suporte a e-mail/senha.
- **JWT** para APIs, com roles (super\_admin, client, employee).
- **CORS** configurado apenas para domínios registrados.
- **SSL/TLS** obrigatório (HTTPS em todas as chamadas).
- **Store de segredos**: ?

### 8. Roadmap de Licenciamento

| Plano            | Features Principais                                                    | Preço (USD/mês) |
| ---------------- | ---------------------------------------------------------------------- | --------------- |
| **Básico**       | 1 agente, 100 doc mensais, OCR básico, suporte forum.                  | 29              |
| **Profissional** | 3 agentes, 1k doc mensais, OCR avançado, relatórios e integrações API. | 99              |
| **Enterprise**   | Agentes ilimitados, doc ilimitados, SLA 24h, customização de contexto. | Sob consulta    |

### 9. Métricas e Monitoramento

- **Uso de documentos**: contagem por cliente e plano.
- **Latência de processamento**: média de extração e resposta LLM.
- **Erros**: taxa de falhas em OCR/PDF parsing e chamadas de LLM.
- **Autenticações**: sucesso vs. falha, abuso de token.

### 10. Tecnologias e Bibliotecas

- **Frontend**: Next.js, React, Tailwind CSS, Tesseract.js.
- **Backend**: Node.js, Express, PDF.js, pdf-parse, SheetJS, Firebase Functions.
- **LLM**: Agno Framework, OpenAI SDK, Gemini.
- **Banco**: Firestore (multi-tenant).
- **Infra**: Firebase Hosting, Firebase functions, Firebase emulators, Cloud Run (Vision API).

---

*Este documento deve servir de referência para equipes de desenvolvimento, produto e design para as próximas sprints.*