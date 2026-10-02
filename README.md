# 📄 Analisador de Currículos com IA

> Backend de um SaaS para análise automatizada de currículos utilizando Inteligência Artificial.

Este projeto foi desenvolvido como um projeto de estudo e portfólio com o objetivo de construir o backend de uma plataforma capaz de receber currículos em PDF, analisar seu conteúdo utilizando Inteligência Artificial e gerar informações estruturadas sobre o currículo.

O projeto também conta com autenticação de usuários, banco de dados, sistema de planos, integração com pagamentos e Webhooks.

> **Status:** 🚧 Projeto arquivado / desenvolvimento encerrado

---

## ✨ Funcionalidades

* 👤 Cadastro de usuários
* 🔐 Autenticação utilizando JWT
* 🍪 Autenticação através de cookies HTTP-only
* 🔄 Access Token e Refresh Token
* 📄 Upload de currículos em PDF
* 🤖 Análise de currículos utilizando Google Gemini
* 📊 Geração de análise estruturada
* 🎯 Avaliação geral do currículo
* 🤖 Análise de compatibilidade com ATS
* 💪 Identificação de pontos fortes
* ⚠️ Identificação de pontos fracos
* 🔎 Identificação de palavras-chave ausentes
* 📚 Histórico de análises
* 💳 Sistema de planos
* 💰 Integração com Mercado Pago
* 🔔 Processamento de pagamentos através de Webhooks
* 🛡️ Middlewares para autenticação e controle de acesso

---

## 🧠 Funcionamento

O fluxo principal desenvolvido no backend funciona da seguinte forma:

```text
Usuário
   │
   ▼
Cadastro / Login
   │
   ▼
Autenticação
   │
   ▼
Upload do currículo
   │
   ▼
Arquivo PDF
   │
   ▼
Google Gemini
   │
   ▼
Análise do currículo
   │
   ├── Nota geral
   ├── Status ATS
   ├── Pontos fortes
   ├── Pontos fracos
   └── Palavras-chave faltantes
   │
   ▼
Resultado da análise
```

---

## 🛠️ Tecnologias utilizadas

### Backend

* **Node.js**
* **TypeScript**
* **Express**
* **Prisma**
* **MongoDB**
* **JWT**
* **bcrypt**
* **Multer**
* **Nodemailer**
* **Google Gemini API**
* **Mercado Pago**

### Ferramentas utilizadas durante o desenvolvimento

* **Git**
* **GitHub**
* **Postman**
* **ngrok**
* **Render**

---

## 🏗️ Estrutura do projeto

A estrutura do backend foi organizada separando responsabilidades entre rotas, controllers, services, middlewares e configurações.

```text
backend/
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── lib/
│   └── index.ts
│
├── prisma/
│   └── schema.prisma
│
├── pdf/
│
├── package.json
└── tsconfig.json
```

---

## 🤖 Inteligência Artificial

Uma das principais funcionalidades do projeto é a análise automática de currículos utilizando a API do **Google Gemini**.

O backend recebe um currículo em PDF e envia seu conteúdo para o modelo de Inteligência Artificial.

A resposta é estruturada para fornecer informações como:

```json
{
  "nota_geral": 85,
  "status_ats": "Aprovado",
  "pontos_fortes": [
    "Experiência profissional relevante",
    "Boa organização do currículo"
  ],
  "pontos_fracos": [
    "Poucas informações sobre projetos"
  ],
  "palavras_faltantes": [
    "Docker",
    "TypeScript",
    "Jest"
  ]
}
```

A ideia era transformar o currículo em uma análise que pudesse posteriormente ser apresentada ao usuário através de uma interface.

---

## 💳 Mercado Pago

O backend também possui integração com o **Mercado Pago** para trabalhar com diferentes planos.

O fluxo desenvolvido utiliza Webhooks para receber a confirmação dos pagamentos.

```text
Usuário
   │
   ▼
Escolha do plano
   │
   ▼
Mercado Pago
   │
   ▼
Pagamento
   │
   ▼
Webhook
   │
   ▼
Backend
   │
   ▼
Confirmação do pagamento
   │
   ▼
Atualização do plano do usuário
```

Durante o desenvolvimento, os Webhooks foram testados localmente utilizando **ngrok**.

---

## 🔐 Autenticação

O sistema utiliza **JWT** para autenticação dos usuários.

Foram implementados:

* Access Token
* Refresh Token
* Cookies HTTP-only
* Middleware de autenticação
* Renovação de sessão

Os tokens são utilizados para identificar o usuário e proteger as rotas que exigem autenticação.

---

## 📄 Upload de currículos

O backend utiliza **Multer** para receber arquivos enviados através de `multipart/form-data`.

O sistema foi desenvolvido para trabalhar com currículos em formato PDF.

Fluxo:

```text
PDF
 │
 ▼
Multer
 │
 ▼
Backend
 │
 ▼
Arquivo
 │
 ▼
Google Gemini
 │
 ▼
Análise
```

---

## 🗄️ Banco de dados

O projeto utiliza:

* **MongoDB** como banco de dados
* **Prisma** como ORM

O banco foi utilizado para armazenar informações relacionadas a:

* Usuários
* Autenticação
* Planos
* Quantidade de análises
* Histórico
* Análises de currículos
* Pagamentos

---

## 🌐 Deploy e desenvolvimento

Durante o desenvolvimento, o backend foi preparado para deploy utilizando **Render**.

Também foi utilizado **ngrok** para expor temporariamente o servidor local à internet e permitir testes de Webhooks do Mercado Pago.

O desenvolvimento e os testes das APIs foram realizados principalmente utilizando **Postman**.

---

## 📚 Principais aprendizados

Este projeto foi desenvolvido principalmente para colocar em prática conhecimentos de desenvolvimento backend.

Durante sua construção, foram estudados e utilizados conceitos como:

* Desenvolvimento de APIs REST
* TypeScript com Node.js
* Express
* Arquitetura de backend
* JWT
* Cookies HTTP-only
* Refresh Tokens
* Middlewares
* Prisma ORM
* MongoDB
* Upload de arquivos
* Integração com Inteligência Artificial
* Processamento de PDFs
* APIs externas
* Integração com gateways de pagamento
* Webhooks
* Variáveis de ambiente
* Deploy
* Debugging
* Postman
* ngrok

---

## 🚧 Status do projeto

O projeto foi **arquivado e não está mais em desenvolvimento ativo**.

O desenvolvimento da aplicação foi interrompido antes da criação de um frontend funcional.

O backend, entretanto, foi utilizado para estudar e implementar diversas funcionalidades presentes em aplicações SaaS reais, incluindo autenticação, banco de dados, processamento de arquivos, Inteligência Artificial e pagamentos.

Algumas funcionalidades poderiam ser aprimoradas ou finalizadas em uma futura versão, mas o projeto cumpriu seu principal objetivo como experiência prática de desenvolvimento.

---

## 🎯 Objetivo

O principal objetivo deste projeto não foi lançar um produto comercial, mas sim aprender como diferentes partes de uma aplicação SaaS se conectam.

A experiência envolveu:

```text
API
 +
Banco de dados
 +
Autenticação
 +
Upload de arquivos
 +
Inteligência Artificial
 +
Pagamentos
 +
Webhooks
 +
Deploy
```

---

## 👨‍💻 Autor

Desenvolvido por **Erick** como projeto de estudo e portfólio.

---

## ⭐ Sobre o projeto

Mesmo não tendo sido finalizado como produto, este projeto representa uma etapa do processo de aprendizado em desenvolvimento backend.

O código permanece público como registro do desenvolvimento e dos conhecimentos adquiridos durante sua construção.
