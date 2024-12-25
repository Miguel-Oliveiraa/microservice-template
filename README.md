# Microserive Template

Este é o guia para configurar e executar o projeto, incluindo os pré-requisitos e os diferentes fluxos de execução disponíveis. Antes de começar, **certifique-se de ler toda a documentação** para evitar erros durante a configuração ou execução do projeto.

---

## **Stack Tecnológica**

Este projeto utiliza as seguintes tecnologias:

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma**
- **Jest**

---

## **Pré-requisitos**

1. **Docker**  
   Certifique-se de que o Docker está instalado e funcionando na sua máquina.

   - [Instalar Docker](https://docs.docker.com/get-docker/)

2. **NVM (Node Version Manager)**  
   O projeto utiliza o NVM para gerenciar a versão do Node.js.
   - [Instalar NVM](https://github.com/nvm-sh/nvm#installing-and-updating)

---

## **Configuração Inicial**

1. Instale a versão correta do Node.js utilizando o NVM:

   ```bash
   nvm install
   nvm use
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

---

## **Fluxos de Execução**

1.  Desenvolvimento Local
    Este fluxo é ideal para trabalhar no código da aplicação localmente.
    Ele sobe apenas o banco de dados no Docker e executa a aplicação diretamente com o Node.js.

    1. Suba o PostgreSQL no Docker:

    ```bash
    docker compose --profile db-only up --build -d
    ```

    2. Execute a aplicação em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

    A aplicação será executada com hot-reload para facilitar o desenvolvimento.

2.  Simulação de Deploy Local
    Este fluxo simula como a aplicação seria executada em produção.
    Ele sobe o banco de dados e executa a aplicação diretamente dentro de um container Docker.

    1. Execute o comando abaixo para subir o banco de dados no Docker e rodar a aplicação

    ```bash
    docker compose --profile full up --build -d
    ```

---

## **Estrutura do Projeto**

- src/ - Código-fonte da aplicação
- prisma/ - Configuração do Prisma (ORM)
- Dockerfile - Configuração para build da imagem Docker
- docker-compose.yml - Configuração para subir a aplicação com Docker

---

## **Considerações**

Certifique-se de que o arquivo .env está configurado corretamente, para isso preencha de acordo com o .env.example.
