
# SoundBrary

SoundBrary é uma plataforma para criação de "dissays" (artigos musicais) baseados em parâmetros de música. A API foi construída com Express e integra funcionalidades avançadas como conexão ao banco de dados MongoDB, autenticação com JWT, e consumo da API do Spotify. O objetivo do projeto é oferecer uma experiência colaborativa e rica para músicos e entusiastas da música, permitindo a criação e compartilhamento de conteúdo relacionado a músicas e artistas.


## Funcionalidades

- **Integração com Spotify**: Permite buscar músicas, álbuns e artistas, além de obter detalhes completos desses itens dentro do próprio Website.
- **Criação de Dissays**: Produza artigos musicais detalhados, com a opção de torná-los públicos ou privados.
- **Avaliação e Comentários**: Os dissays podem receber avaliações e comentários de outros usuários.
- **Sistema de Notificações**: Notifique os usuários sobre atividades relevantes, como novos dissays relacionados às músicas salvas.
- **Sessão de usuário via JWT**: Sistema de login seguro, utilizando tokens de sessão do usuário.
- **Controle de Privacidade**: Opção de criar dissays privados, visíveis apenas para o autor.
- **Edição de Perfil**: Permite que os usuários personalizem suas informações pessoais.
- **Banco de Dados MongoDB**: Gerencia usuários, dissays, comentários e notificações em um banco de dados robusto e escalável.


## Screenshots

![App Screenshot](/frontend/src/assets/Tela%20inicial.png)
![App Screenshot](/frontend/src/assets/Tela%20musica.png)
![App Screenshot](/frontend/src/assets/Procurar%20musica.png)
![App Screenshot](/frontend/src/assets/Criar%20dissay.png)
![App Screenshot](/frontend/src/assets/Guitarra%20-%20Níveis.png)
![App Screenshot](/frontend/src/assets/Tela%20dissay.png)



## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/valadao-davi/SoundBrary.git
```

### 2. Navegue para o diretório do projeto backend

```bash
cd SoundBrary/backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `src` com o seguinte conteúdo:

```
MONGODB_URI=<sua-uri-mongodb>
SPOTIFY_CLIENT_ID=<seu-client-id>
SPOTIFY_CLIENT_SECRET=<seu-client-secret>
ACCESS_SECRET=<seu-access-secret>
REFRESH_TOKEN_SECRET=<seu-refresh-token-secret>

```
### 5. Inicie o servidor backend local na sua máquina

```bash
npx ts-node src/server.ts
```

### 6. Navegue para o diretório da pasta frontend

```bash
cd SoundBrary/frontend
```

### 6.5. (Caso não tenha Angular instalado na sua máquina):

```bash
npm install -g @angular/cli@16.2.0
```


### 7. Instale as dependências

```bash
npm install
```

### 8. Inicie o projeto e veja mágica acontencer!

```bash
ng serve

```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env:

`SPOTIFY_CLIENT_ID`

`SPOTIFY_CLIENT_SECRET`


`MONGODB_UR`

`ACCESS_SECRET`

`REFRESH_TOKEN_SECRET`

Esses valores podem ser encontrados nas configurações do seu dashboard de seu perfil Spotify Developer, e no seu cluster Mongodb. As variáveis de Token de acesso podem ser criadas por você mesmo átraves do comando:

```bash
openssl rand -hex 32
```



## Documentação da API
### Spotify (Todas requisições *precisam* do token de acesso gerado após colocar suas credenciais de cliente desenvolvedor do spotify!)

#### Pesquisa por músicas

```http
  GET http://localhost:3000/music/searchMusic/:musicName
```


#### Retorna detalhes da música

```http
  GET http://localhost:3000/music/musicId/:id
```

#### Pesquisa por álbuns

```http
  GET http://localhost:3000/album/searchAlbum/:albumName
```

#### Retorna detalhes do álbum

```http
  GET http://localhost:3000/album/idAlbum/:id
```

#### Pesquisa por artistas

```http
  GET http://localhost:3000/artists/searchArtist/:artistName
```


#### Retorna detalhes do artista

```http
  GET http://localhost:3000/artists/idArtist/:id
```

### Usuários (Requisições protegidas precisam ser informado o token de acesso do usuário)

### Criar Usuário no banco

```http
  POST http://localhost:3000/users/createUser
```
- **Descrição:** Cria um novo usuário no sistema.
- **Corpo da Requisição:**
  ```json
  {
    "name": "Nome do Usuário",
    "email": "email@exemplo.com",
    "userName": "nomeUsuario",
    "password": "senhaSegura"
  }
  ```

### Login
```http
  POST http://localhost:3000/users/login
```
- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Corpo da Requisição:**
  ```json
  {
    "userOrEmail": "nomeUsuarioOuEmail",
    "password": "senhaSegura"
  }
  ```



### Retornar Todos os Usuários (Apenas para Teste)
- **Descrição:** Retorna todos os usuários do banco.


```http
  GET  http://localhost:3000/users/login
```

### Buscar por Usuário com base no Nome de Usuário
- **Descrição:** Retorna o usuário com o username (insira com @ antes, ex: @Davi).

```http
  GET  http://localhost:3000/users/profile/:query
```
### Rotas Protegidas (JWT)

#### Perfil do Usuário
- **Descrição:** Retorna informações detalhadas do perfil do usuário autenticado.

```http
  GET http://localhost:3000/users/profile
```


### Notificações do Usuário
- **Descrição:** Retorna a lista de notificações do usuário.
```http
    GET http://localhost:3000/users/profile/notifications
```


### Excluir Notificação
- **Descrição:** Remove uma notificação do perfil do usuário.

```http
    DELETE http://localhost:3000/users/profile/deleteNotification/:id
```


### Adicionar itens aos favoritos
- **Descrição:** Retorna a lista de notificações do usuário.
```http
  PATCH http://localhost:3000/users/addToFavorites/<categoria>
```
- **Categorias disponíveis:** 
    - **songs**
    - **albums**
    - **artists**

- **Corpo da Requisição:**
  ```json
  {
    "id": "idDoItem"
  }
  ```


### Remover item dos favoritos
- **Descrição:** Retorna a lista de notificações do usuário.
```http
  PATCH http://localhost:3000/users/removeFavorites/<categoria>
```
- **Categorias disponíveis:** 
    - **songs**
    - **albums**
    - **artists**

- **Corpo da Requisição:**
  ```json
  {
    "id": "idDoItem"
  }
  ```

### Editar Perfil do Usuário
- **Descrição:** Atualiza os dados do perfil do usuário autenticado.
```http
PUT http://localhost:3000/users/profile/edit
```
- **Categorias disponíveis:** 
    - **songs**
    - **albums**
    - **artists**

- **Corpo da Requisição:**
  ```json
    {
        "campo": "valorAtualizado"
    }
  ```

### Dissays (Requisições protegidas precisam ser informado o token de acesso do usuário)

### Retornar todos os dissays (Apenas para Teste)
- **Descrição:** Retorna todos os dissays PÚBLICOS e PRIVADOS do banco.

```http
  GET  http://localhost:3000/dissays
```

### Retornar todos os dissays públicos

- **Descrição:** Retorna apenas os dissays PÚBLICOS do banco.

```http
  GET  http://localhost:3000/publicDissays
```

### Retornar todos os dissays públicos com base em um nome
- **Descrição:** Retorna apenas os dissays PÚBLICOS do banco com base em um nome.

```http
  GET  http://localhost:3000/publicDissays/:query
```

### Retornar todos os 10 dissays mais recentes
- **Descrição**: Retorna apenas os dissays recentes PÚBLICOS do banco.


```http
  GET  http://localhost:3000/recentDissays
```

### Rotas Protegidas (JWT)


### Criar dissay
- **Descrição**: Método para criar um Dissay PÚBLICO no banco.


```http
  POST http://localhost:3000/createDissay/:musicId
```

- **Corpo da Requisição:**
  ```json
    {
  "name": "Nome do Dissay",
  "description": "Descrição do Dissay",
  "instruments": [
    {
      "defaultInstrument": {
        "nameInstrument": "Guitarra",
        "imageUrl": "../../../assets/guitarra_icon.svg"
      },
      "effects": [
        {
          "name": "Reverb",
          "parameters": {
            "level": "5",
            "decay": "2"
          }
        }
      ],
      "model": "Fender Stratocaster"
    },
    {
      "defaultInstrument": {
        "nameInstrument": "Bateria",
        "imageUrl": "../../../assets/bateria_icon.svg"
      },
      "effects": [
        {
          "name": "Distortion",
          "parameters": {
            "gain": "7",
            "tone": "3"
          }
        }
      ],
      "model": "Yamaha Stage Custom"
    }
    ]
  }
  ```


### Criar dissay privado
- **Descrição**: Método para criar um Dissay PRIVADO no banco.

```http
  POST http://localhost:3000/privateDissay/:musicId
```

- **Corpo da Requisição:**
  ```json
    {
  "name": "Nome do Dissay",
  "description": "Descrição do Dissay",
  "instruments": [
    {
      "defaultInstrument": {
        "nameInstrument": "Guitarra",
        "imageUrl": "../../../assets/guitarra_icon.svg"
      },
      "effects": [
        {
          "name": "Reverb",
          "parameters": {
            "level": "5",
            "decay": "2"
          }
        }
      ],
      "model": "Fender Stratocaster"
    },
    {
      "defaultInstrument": {
        "nameInstrument": "Bateria",
        "imageUrl": "../../../assets/bateria_icon.svg"
      },
      "effects": [
        {
          "name": "Distortion",
          "parameters": {
            "gain": "7",
            "tone": "3"
          }
        }
      ],
      "model": "Yamaha Stage Custom"
    }
    ]
  }
  ```
