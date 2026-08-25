import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Importações das rotas
import cadastroDeUsuarios from "./router/cadastroDeUsuarios";
import verificadorDeEmails from "./controller/verificadorEmailECodigo";
import  controllerEmail from "./controller/verificadorEmailECodigo";
import refreshToken from "./router/refreshToken";
import analiseCurriculo from "./router/analisarCurriculo";


// Dotoenv
import "dotenv/config";


// ######################################
app.use(express.json()); // Ler JSON do req.body
app.use(express.urlencoded({extended: true})); // Aqui ele esta lendo formularios
app.use(cookieParser()); // Configura o middleware para ler cookies (req.cookies)

// Cors
app.use(cors()); // Depois colocar só as URLS que serão permitidas


// ######################################
// conectando as rotas no servidor
app.use(cadastroDeUsuarios);
app.use(verificadorDeEmails);
app.use(controllerEmail);
app.use(refreshToken);
app.use(analiseCurriculo);



const porta: number = 3000

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});