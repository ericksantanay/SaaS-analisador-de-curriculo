import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Importações das rotas
import cadastroDeUsuarios from "./router/cadastroDeUsuarios";
import verificadorDeEmails from "./controller/controllerEmail";

// import "./services/emailService";


// Dotoenv
import "dotenv/config";


// ######################################
app.use(express.json()); // Ler JSON do req.body
app.use(express.urlencoded({extended: true})); // Aqui ele esta lendo formularios
app.use(cookieParser()); // Configura o middleware para ler cookies (req.cookies)

// Cors
// cors
app.use(cors()); // Depois colocar só as URLS que serão permitidas


// ######################################
// conectando as rotas no servidor
app.use(cadastroDeUsuarios);
app.use(verificadorDeEmails);
// app.use(enviarEmails);


const porta: number = 3000

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});