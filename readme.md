# 🏦 Coop Cred

Sistema de **cooperativa de crédito digital**, desenvolvido com Node.js e Javascript.  
Oferece funcionalidades de **contas, transações, relatórios financeiros com agregações MongoDB**, autenticação JWT e documentação automática via Swagger.

Este serviço complementa o [Coop Cred Front](https://github.com/raimundofullstack/coop-cred-front)

---

## 🚀 Tecnologias utilizadas

### 🧠 Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-003B57?style=for-the-badge&logo=security&logoColor=white)

### 🧩 Documentação

![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

### 🧪 Testes

![Jest](https://img.shields.io/badge/Jest-323330?logo=Jest&logoColor=white&style=for-the-badge)
![Supertest](https://img.shields.io/badge/Supertest-333?style=for-the-badge&logo=mocha&logoColor=white)

### 🧰 Ambiente & DevOps

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![CI/CD](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

### 📈 Monitoramento e Logs

![Winston](https://img.shields.io/badge/Winston-005571?style=for-the-badge&logo=logstash&logoColor=white)
![Morgan](https://img.shields.io/badge/Morgan-000000?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)

### 💬 Linguagem

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)

---

## 🧩 Próximas integrações

![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

---

## 📁 Estrutura do projeto

```
github/
├── workflows/ # Arquivo github actions
src/
├── config/ # Configurações (DB e Logs)
├── controllers/ # Regras de entrada da API
├── erros/ # Definições de erros
├── middlewares/ # JWT, errorHandler, logsMorgan
├── models/ # Schemas Mongoose
├── routes/ # Rotas Express
├── services/ # Lógica de negócios
├── tests/ # Testes unitarios e integrados
├──├─── factories/ # Criar dados de teste para reaproveitamento
├──├─── helpers/ # Configurações e utilitários
├──├─── integration/ # Testes integrados
├──├─── unit/ # Testes unitarios
├──├───├─── controllers/ # Testes dos controllers
├──├───├─── services/ # Testes dos services
├──├─── unit/ # Testes unitarios
├── app.js # Definições do servidor
├── server.js # Inicialização do servidor
└── Dockerfile # Nosso docker da aplicação
└── docker-compose.yml # Nosso container contendo a aplicação e o banco mongoDb
```

---

## ⚙️ Configuração e execução local

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/raimundofullstack/coop-cred.git
cd coop-cred
```

### 2️⃣ Instalar dependências

```bash
yarn install --frozen-lockfile
```

### 3️⃣ Criar arquivo .env

Crie o arquivo na raiz do projeto com as variáveis:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/nome-do-banco
JWT_SECRET=sua-chave-secreta
NODE_ENV=development
SENTRY_DSN=https://uuid@string.ingest.us.sentry.io/numberProject
```

### 4️⃣ Rodar em modo desenvolvimento

```bash
yarn dev
```

Depois, acesse:
📄 http://localhost:3000/docs

## 📚 Endpoints principais

| Módulo            | Rota base           | Descrição                        |
| ----------------- | ------------------- | -------------------------------- |
| 👤 **Usuários**   | `/api/users`        | Registro e login com JWT         |
| 💳 **Contas**     | `/api/accounts`     | Criação e consulta de conta      |
| 💸 **Transações** | `/api/transactions` | Depósito, saque e transferência  |
| 📊 **Relatórios** | `/api/reports`      | Agregações financeiras e resumos |

## 🧠 Agregações e relatórios

- Totais por tipo de transação
- Resumo mensal de entradas/saídas (a fazer)
- Saldo consolidado (a fazer)

Preparado para dashboards e gráficos no front-end

## 🧪 Testes

```
yarn test
```

## 🚀 CI/CD e Deploy (planejado)

- Deploy automático em:
  - AWS Elastic Beanstalk (ambiente completo)

## 💡 Próximos módulos

| Módulo         | Descrição                                            |
| -------------- | ---------------------------------------------------- |
| 🏦 **Crédito** | Crédito Controle de limite, juros e crédito rotativo |

## 👨‍💻 Autor

Raimundo Martins | Desenvolvedor Full Stack

💼 Projeto desenvolvido para fins de demonstração de arquitetura back-end moderna com Node.js, JavaScript e MongoDB.
