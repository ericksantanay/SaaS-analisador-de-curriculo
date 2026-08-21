import { Router } from "express";
// import {emailServico} from "../services/emailService";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

const router = Router();

router.post("/verificarCodigo", async (req: Request, res: Response) => {

    // Fazer a verificação do email + codigo

    const {codigoVerificacao} = req.body;

    if (codigoVerificacao) {
        return res.status(404).json({mensagem: "Esse codigo nao existe"});
    };

    try {
      
        const usuario = await prisma.usuarios.findFirst({
            where: {
                codigoVerificacao: codigoVerificacao
            }
        });

        if (!usuario) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        if (usuario.emailVerificado === codigoVerificacao) {
            return res.status(200).json({mensagem: "Email verificado com sucesso."});
        }else {
            return res.status(403).json({mensagem: "Email não verificado"});
        };
        
    } catch (error) {
        console.log("Erro no controller:" + error);
        return res.status(500).json({mensagem: "Erro no servidor"});
    };
});

export default router;