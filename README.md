# 🔐 Gerador de Tokens OAuth2 para Gmail + Nodemailer

Este script automatiza a geração de `access_token` e `refresh_token` do Google OAuth2 para permitir o envio seguro de e-mails com **Gmail + Nodemailer**, usando sua conta do Gmail Workspace ou Gmail comum.

## ⚙️ Requisitos

- Node.js v14 ou superior
- Conta Google (Gmail ou Google Workspace)
- Projeto criado no [Google Cloud Console](https://console.cloud.google.com/)

---

## 🚀 Como usar

### 1. Crie seu projeto e credenciais OAuth2

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Vá em **APIs e Serviços > Tela de Consentimento OAuth**
   - Configure como **externo** (mesmo que for só você)
   - Preencha nome da aplicação, e-mail e salve
4. Vá em **Credenciais > Criar credenciais > ID do cliente OAuth**
   - Tipo: **Aplicativo para computador**
   - Redirecionamento: `http://localhost:3000/oauth2callback`
5. Copie o **Client ID** e **Client Secret**

---

### 2. Clone o projeto

```bash
git clone https://github.com/seu-usuario/oauth2-nodemailer.git
cd oauth2-nodemailer
```

---

### 3. Instale as dependências

```bash
npm install
```

---

### 4. Configure suas credenciais

Crie um arquivo `.env` com o seguinte conteúdo:

```env
CLIENT_ID=seu_client_id
CLIENT_SECRET=seu_client_secret
REDIRECT_URI=http://localhost:3000/oauth2callback
```

---

### 5. Gere os tokens

```bash
node oauth2-gmail-cli.js
```

- O navegador será aberto para você autorizar
- Um código será interceptado automaticamente pelo servidor local
- Os tokens (`access_token`, `refresh_token`) serão exibidos no terminal

---

## 📨 Como usar com Nodemailer

Depois de gerar os tokens, use o `refresh_token` no seu código Nodemailer:

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "seu-email@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: "seu_refresh_token",
  },
});
```

---

## 🛟 Segurança

- Nunca compartilhe seu `refresh_token` ou `client_secret` publicamente
- Adicione `.env` e `tokens.json` (se existir) ao seu `.gitignore`

---

## 📄 Licença

MIT
