# RestaurantSystem

Sistema de gerenciamento de pedidos para restaurantes, composto por uma Web API em ASP.NET Core (.NET 9) e uma interface web em HTML, CSS e JavaScript. Video demonstrando: https://youtu.be/hvkcqm0dUkw

---

## 📋 Funcionalidades

- **Catálogo de Produtos**  
  - Listagem e filtro por categoria (comida, bebida)
- **Fluxo de Pedido**  
  - Seleção de itens e quantidade  
  - Escolha de mesa  
  - Informações do cliente (nome, telefone, tipo de pedido, observações)  
  - Visualização do status do pedido  
- **Autenticação de Usuários**  
  - Cadastro e login de usuários  
- **Histórico de Pedidos**  
  - Consulta de histórico por usuário  
- **Painel de Cozinha/Copa**  
  - Listagem de pedidos pendentes por setor  
- **Atualização de Status**  
  - Inclusão de etapas (“Em preparo”, “Pronto”, “Entregue”)

---

## 🛠 Tecnologias

### Backend
- **.NET 9** (ASP.NET Core Web API)  
- **Entity Framework Core 8** + **Pomelo MySQL**  
- **Swashbuckle (Swagger)** para documentação automática da API  
- **BCrypt.Net** para hash de senhas  

### Frontend
- **HTML5**, **CSS3**, **JavaScript (ES6+)**  
- **Bootstrap 5** (layout responsivo)  
- **jQuery** (manipulação DOM, chamadas AJAX)  
- **SweetAlert2** (alertas estilizados)  
- **Bootstrap Icons** & **FontAwesome**  

---

## 🚀 Pré‑requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)  
- [MySQL Server](https://dev.mysql.com/downloads/)  
- Navegador moderno (Chrome, Firefox, Edge etc.)

---

## 🔧 Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/guilhermegnc/RestaurantSystem.git
   ```
2. **Configure a string de conexão**  
   No arquivo `RestaurantSystem.API/appsettings.json`, ajuste:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Port=NUMERO_PORTA;Database=restaurante;User=SEU_USUARIO;Password=SUA_SENHA;"
   }
   ```
3. **Crie o banco de dados**  
   Eu utilizei o WorkBench do MySQL, por isso deixei na pasta do banco de dados
   o arquivo de dump que é possível fazer o import, indo em Server -> Data Import.
   Também deixei um arquivo nomeado "Banco_De_Dados" com os Creates, do Database e das tabelas, e os Inserts.

4. **Execute a API**  
   ```bash
   cd RestaurantSystem.API
   dotnet run
   ```
   A API ficará disponível na porta indicada no console.
   Lembrando que é necessario verificar se a porta dos seguintes arquivos .js é a mesma da porta em que a API está.
   Arquivos: carregar-mesas.js, carregar-produtos.js, conteudo-usuario.js, envio-pedido.js, historico.js, login-cadastro.js 

5. **Sirva a interface web**  
   Utilizando o Vs Code, primeiro abra o arquivo HTML `RestaurantSystem.Web/wwwroot/index.html`. 
   Caso já tenha a extensão Live Server, basta clicar com o botão direito em qualquer parte do arquivo e selecionar "Open with Live Server".

   
---

## 📡 Endpoints da API

### Autenticação
| Método | Rota                         | Descrição                  |
| ------ | ---------------------------- | -------------------------- |
| POST   | `/api/usuarios/cadastro`     | Cadastra novo usuário      |
| POST   | `/api/usuarios/login`        | Autentica usuário          |

### Produtos
| Método | Rota                    | Query String      | Descrição                             |
| ------ | ----------------------- | ----------------- | ------------------------------------- |
| GET    | `/api/produtos`         | `?categoria=`     | Lista produtos (filtro opcional)      |

### Mesas
| Método | Rota              | Descrição                       |
| ------ | ----------------- | ------------------------------- |
| GET    | `/api/mesas`      | Lista as mesas                  |

### Pedidos
| Método | Rota                                  | Descrição                                      |
| ------ | ------------------------------------- | ---------------------------------------------- |
| POST   | `/api/pedidos`                        | Cria novo pedido                               |
| GET    | `/api/pedidos/historico`              | Lista histórico (filtros `usuarioId`, `setor`) |
| GET    | `/api/pedidos/{id}`                   | Recupera detalhes de um pedido                 |
| PUT    | `/api/pedidos/{id}/status`            | Atualiza status (body: `"NovoStatus"`)         |

```
