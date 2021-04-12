# Desafio Backend Mesa
## _Ernani Ricoy_

Esse projeto busca implementar uma API REST simples de um sistema de cadastro e avaliação de locais.

## Tecnologias
- Node.js + express
- MongoDB + Mongoose
- Pacotes para gerar token de autenticação, encriptar senha, validação de esquema e otimização de pacote gerado no deploy.

## Banco de dados
O sistema usa uma solução em nuvem disponibilizado pelo próprio MongoDB (Atlas). Foi criado um usuário e senha especialmente para esse sistema que já está preenchido no código, então não é necessário nenhuma configuração para acessar o banco. Já existem dados pré populados.
_O mongoose cuida das validações dos objetos que se tenta cadastrar usando esquemas._

## Rodar local
```sh
git clone https://github.com/Ludrin/mesa-desafio-locais.git
npm install
npm start
```

Por padrão o sistema roda na porta 3000. Dessa forma, o prefixo das requisições deve ser `http://localhost:3000/`.
_Exemplo: `http://localhost:3000//api/user/login`_.

## Rodar remoto
Foi feito deploy do projeto no Heroku na URL `https://mesa-desafio-locais.herokuapp.com/`. Como o projeto não tem frontend nada aparecerá se acessar a URL pelo navegador. Ela deve ser usada no prefixo das requisições.

Ao fazer requisições REST para o Heroku é necessário omitir a porta. Dessa forma, o prefixo das requisições deve ser `https://mesa-desafio-locais.herokuapp.com/`.
_Exemplo: `https://mesa-desafio-locais.herokuapp.com/api/user/login`_.

## Usando o sistema

### Autenticação

É necessário estar autenticado para realizar todas as operações REST, exceto `/signup` e `/login`. É usado uma autenticação simples via jwt, por isso não há método de `/logout` no backend (deve ser feito no frontend).

Para facilitar é possível usar o seguinte usuário de teste previamente cadastrado:
```
email: mesa@mesa.com
senha: 1234
```

### Postman
Dentro da pasta postman há uma coleção criada para testar o sistema com todas as requisições possíveis, bem como exemplos de requisições bem sucedidas. Ela pode ser usada para facilitar os testes.

## Linguagem
As variáveis e classes foram escritas em inglês, mas as mensagens de tratamento de erro estão em português.

## APIs
Exemplos completos do corpo, resposta e cabeçalho das requisições pode ser encontrados na coleção Postman.

### User
Em uma aplicação real a senha do usuário (mesmo criptografada) não deve ser retornada ao frontend por questões de segurança. Entretanto, para esse teste, a senha criptografada é retornada nas requisições de usuário para mostrar que realmente foi gravada.

```sh
Cadastro: <POST> /api/user/signup
Login: <POST> /api/user/login
Edição: <PUT> /api/user/edit
Mudança de senha: <PUT> /api/user/change-password
Busca: <GET> /api/user/:userId
```

### Local
É necessário salvar no local as coordenadas dele para ser exibido corretamente em um possível frontend e realizar a lógica de busca por proximidade. Naturalmente, não é esperado que o usuário saiba essas coordenadas. Ela deve ser calculada com base no endereço inserido pelo usuário pela API de mapas usada no fronted.

```sh
Cadastro: <POST> /api/local/create
Busca por proximidade: <POST> /api/local/map
Busca por ordem alfabética: <GET> /api/local/list
Busca com avaliações: <GET> /api/local/:localId
```

### Avaliações
A cada avaliação feita a média do local é recalculada. A média fica armazenada no local.

```sh
Cadastro: <POST> /api/review/create
Busca: <GET> /api/review/:reviewId
```