# 🏦 Coop Cred

Sistema de **cooperativa de crédito digital**, desenvolvido com Node.js e TypeScript.  
Oferece funcionalidades de **contas, transações, relatórios financeiros com agregações MongoDB**, autenticação JWT e documentação automática via Swagger.

Este serviço complementa o [Coop Cred Front](https://github.com/raimundofullstack/coop-cred-front)

---

## 🚀 Tecnologias utilizadas

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-003B57?style=for-the-badge&logo=security&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)


---

## 🧩 Próximas integrações

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-333?style=for-the-badge&logo=mocha&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

---

## 📁 Estrutura do projeto

```
src/
├── controllers/ # Regras de entrada da API
├── middlewares/ # JWT, validações, etc
├── models/ # Schemas Mongoose
├── routes/ # Rotas Express
├── services/ # Lógica de negócios
├── config/ # Configurações (DB)
├── server.ts # Inicialização do servidor
└── swagger.ts # Geração automática da doc Swagger
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
npm install
```

### 3️⃣ Criar arquivo .env

Crie o arquivo na raiz do projeto com as variáveis:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/coopcred
JWT_SECRET=sua_chave_super_secreta
```

### 4️⃣ Rodar em modo desenvolvimento

```bash
npm run dev
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

## 🧪 Testes (planejado)

Será adicionado suporte a:

- Jest (testes unitários e de integração)
- Supertest (testar rotas REST)
- MongoMemoryServer (mock de banco de dados)

```
npm run test
```

## 🚀 CI/CD e Deploy (planejado)

- Integração com GitHub Actions
- Deploy automático em:
  - AWS Elastic Beanstalk (ambiente completo)
  - Docker Compose (multi-container local)

## 💡 Próximos módulos

| Módulo         | Descrição                                            |
| -------------- | ---------------------------------------------------- |
| 🏦 **Crédito** | Crédito Controle de limite, juros e crédito rotativo |

## 👨‍💻 Autor

Raimundo Martins | Desenvolvedor Full Stack

💼 Projeto desenvolvido para fins de demonstração de arquitetura back-end moderna com Node.js, TypeScript e MongoDB.
