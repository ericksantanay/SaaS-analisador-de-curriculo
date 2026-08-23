import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
// Para rotas que precisa de que o email e o codigo seja verificado.

type Id = {
    id: string
}

export async function verificacaoEmailMiddleware(req: Request, res: Response, next: NextFunction) {

    const acessTokenJwt = req.cookies.acessToken;

    if (!acessTokenJwt) {
        return res.status(401).json({mensagem: "Acesso negado, token não fornecido."});
    };

    try {
        
         const {id} = jwt.verify(acessTokenJwt, process.env.JWT_SECRET ?? "") as Id

        const usuarioEmailverificado = await prisma.usuarios.findUnique({
            where: {
                id: id
            }
        });

        // Verificando se o usuario existe
        if (!usuarioEmailverificado) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        // Verificando se o email foi verificado
        if (usuarioEmailverificado.emailVerificado === false) {
            return res.status(403).json({mensagem: "Você não verificou o seu email."});
        };

        // 
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' }); 
    };
};