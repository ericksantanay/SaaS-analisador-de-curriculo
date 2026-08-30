import { Router } from "express";
import prisma from "../lib/prisma";
import {verificarAutenticacao} from "../middleware/authMiddleware"
import { Request, Response } from "express";

const router = Router();

interface RequestUserId extends Request {
    userId?: string
}

router.post("/planoPro", async (req: RequestUserId, res: Response) => {

    try {

        // Buscando o usuario
        const usuario = await prisma.usuarios.findUnique({
            where: {
                id: req.userId
            }
        });

        const atualizarPlanoPro = await prisma.usuarios.update({
             select
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensagem: "Erro no servidor"});
    };

});

export default router;