# E-commerce Catalog API

API RESTful para gerenciamento de catálogo de produtos de e-commerce.

## Tecnologias
- Node.js
- Express
- MongoDB (Mongoose)
- DOTENV

## Requisitos Funcionais Atendidos
-  RF01 - Cadastro de Produtos com Esquema Dinâmico
-  RF02 - Consulta com Filtros Compostos
-  RF03 - Busca Textual
-  RF04 - Paginação e Ordenação de Resultados
-  RF05 - Atualização do Estoque e Dados
-  RF06 - Remoção de Produtos

## Como executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env`
4. Execute: `npm run dev`

## Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/products` | Cadastra produto |
| GET | `/api/products` | Lista produtos (com filtros, busca, paginação e ordenação) |
| PUT | `/api/products/:id` | Atualiza produto/estoque |
| DELETE | `/api/products/:id` | Remove produto |

## Vídeo

-  https://youtu.be/wJ-RKcq_4uY