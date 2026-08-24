import Router, {CookieOptions}  from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
// refazer o refresh token

const router = Router();

type ID = {
    id: string
};

router.post("/refreshToken", (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({mensagem: "Acesso negado. Token não fornecido."});
    };

    try {

        // Verificando o refresh
        const refreshTokenVerficiado = jwt.verify(refreshToken, process.env.REFRESH_SECRET ?? '') 

        const token = jwt.sign({id: refreshTokenVerficiado.id}, process.env.JWT_SECRET ?? "", {expiresIn: "10m"});
        
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }



});

export default router;