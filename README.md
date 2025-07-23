# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

# Bubblechat Platform 🚀

Plataforma multi-tenant para gerenciamento de clientes e agentes de IA, com processamento automático de documentos e geração de orçamentos, construída sobre uma arquitetura moderna com Firebase e Next.js.

## ✨ Funcionalidades Principais

- 🏢 **Arquitetura Multi-Tenant**: Suporte robusto para múltiplos clientes com dados isolados e seguros no Firebase Firestore.
- 🤖 **Agentes de IA Integrados**: Conexão nativa com múltiplos provedores de LLM, incluindo **OpenAI**, **Gemini**, e **Agno**.
- 📄 **Processamento Inteligente de Documentos**: Extração de dados de arquivos PDF, imagens (OCR) e planilhas para análise e uso pelo sistema.
- 💰 **Geração Automatizada de Orçamentos**: Criação de orçamentos dinâmicos com base nos dados extraídos dos documentos processados.
- 🎛️ **Dashboard Administrativo**: Uma interface de gerenciamento completa, construída com Next.js e Tailwind CSS, para total controle sobre clientes, agentes, documentos e configurações.
- 💬 **Widget de Chat Embarcável (FAB)**: Um widget flutuante e customizável que pode ser facilmente integrado a qualquer site para interação direta com os agentes de IA.
- ⚙️ **API Centralizada**: Um backend robusto em Node.js (Express) que gerencia toda a lógica de negócios, autenticação e comunicação com os serviços.

## 🏗️ Arquitetura do Monorepo (Turborepo)

O projeto utiliza um monorepo gerenciado com Turborepo para otimizar o desenvolvimento e o compartilhamento de código entre as aplicações.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Banco de Dados:** Firebase Firestore (NoSQL)
- **Comunicação em Tempo Real:** Socket.IO
- **ORM:** Prisma (para uma camada de acesso a dados estruturada)
- **Autenticação:** Firebase Authentication
- **Hospedagem:** Firebase Hosting, Firebase Functions e Firebase Emulators