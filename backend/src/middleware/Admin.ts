import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

type Id = {
    id: string
}

export async function verificarRole(req: Request, res: Response, next: NextFunction) {

    const acessTokenJwt = req.cookies.acessToken;

    if (!acessTokenJwt) {
        return res.status(401).json({mensagem: "Acesso negado. Token não fornecido."});
    };

    try {

        const {id} = jwt.verify(acessTokenJwt, process.env.JWT_SECRET ?? "") as Id
        
        const userRole = await prisma.usuarios.findUnique({
            where: { 
                id: id
            }
        });

        // Verificando se o usuario existe
        if (!userRole) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        // Verificando o role
        if (userRole.role !== "admin") {
            return res.status(403).json({mensagem: "Voce não tem autorização"});
        };

        next();

    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    };
};
