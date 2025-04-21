import { google } from "googleapis";
import open from "open";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const CLIENT_ID = process.env.CLIENT_ID || "";
  const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
  const REDIRECT_URI = process.env.REDIRECT_URI || "";

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  const SCOPES = ["https://mail.google.com/"];

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("Abrindo o navegador para autenticar...");
  await open(authUrl);

  http
    .createServer(async (req, res) => {
      if (req.url.startsWith("/oauth2callback")) {
        const url = new URL(req.url, `http://localhost:3000`);
        const code = url.searchParams.get("code");

        res.end("Autenticação concluída! Pode fechar esta janela.");

        const { tokens } = await oAuth2Client.getToken(code);
        console.log("\n✅ Tokens obtidos com sucesso:\n");
        console.log("access_token:", tokens.access_token);
        console.log("refresh_token:", tokens.refresh_token);
        console.log("\n⚠️ Guarde esses tokens com segurança.\n");

        process.exit();
      }
    })
    .listen(3000, () => {
      console.log(
        "Servidor aguardando o código em http://localhost:3000/oauth2callback"
      );
    });
}

main();
