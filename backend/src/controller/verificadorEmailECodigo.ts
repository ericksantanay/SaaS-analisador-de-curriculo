import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

const router = Router();

router.post("/verificarCodigo", async (req: Request, res: Response) => {

    const {email, codigoVerificacao} = req.body;

    if (!email || ! codigoVerificacao) {
        return res.status(404).json({mensagem: "Email e codigo invalido."});
    };

    try {
      
        const usuario = await prisma.usuarios.findFirst({
            where: {
                email: email,
                codigoVerificacao: codigoVerificacao
            }
        });

        if (!usuario) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        if (usuario.codigoVerificacao === codigoVerificacao && usuario.email === email) {

            await prisma.usuarios.update({ 
                where: {
                    id: usuario.id
                },
                data: {
                    emailVerificado: true
                }
            });

            return res.status(200).json({mensagem: "Email e codigo verificado com sucesso."});
        }else {
            return res.status(403).json({mensagem: "Email não verificado"});
        };
        
    } catch (error) {
        console.log("Erro no controller:" + error);
        return res.status(500).json({mensagem: "Erro no servidor"});
    };
});

export default router;