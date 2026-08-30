import { Router } from "express";
import prisma from "../lib/prisma";
import {verificarAutenticacao} from "../middleware/authMiddleware";
import { Request, Response } from "express";
// PLANO PRO

const router = Router();

interface RequestUserId extends Request {
    userId?: string
}

router.post("/planoPro", verificarAutenticacao, async (req: RequestUserId, res: Response) => {

    try {

        // Buscando o usuario
        const usuario = await prisma.usuarios.findUnique({
            where: {
                id: req.userId
            }
        });

        if (!usuario) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        // Aqui eu estou atualizando para o Plano Pro
        const atualizarPlanoPro = await prisma.usuarios.update({
            where: {id: usuario.id},
            data: {
                plano: "pro",
                analises: 20
           },
           select: {
            plano: true,
            analises: true,
            historico: true
           }
        });

        return res.status(200).json(atualizarPlanoPro);

    } catch (error) {
        console.log(error);
        return res.status(500).json({mensagem: "Erro no servidor"});
    };

});

export default router;