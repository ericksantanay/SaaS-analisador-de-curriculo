import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { emailServico }  from "../services/emailService";

const router = Router();

router.post("/cadastroDeUsuarios", async (req: Request, res: Response) => {

    const {nome, email, senha} = req.body;

    //  Verificação caso o usuario 
    if (!nome || !email || !senha) {
        return res.status(404).json({mensagem: "Cadastre-se"});
    };

    try {
      
        // Buscando o usuario no banco de dados
        const buscarUsuario = await prisma.usuarios.findUnique({
            where: {
                email: email
            }
        });

        // Senha
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada= await bcrypt.hash(senha, salt);

        // Codigo gerado
        const codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();

        // Caso o usuario não 
        if (!buscarUsuario) {
            
            const conta = await prisma.usuarios.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaCriptografada,
                    codigoVerificacao: codigoGerado
                }
            });

            emailServico(email, codigoGerado);

            return res.status(201).json({mensagem: "Conta cadastrada com sucesso."});
        }else {
            return res.status(409).json({mensagem: "Essa conta ja esta cadastrada."});
        };
        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor"});
    };

});

export default router;