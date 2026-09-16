import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

type Id = {
    id: string
};

export async function verificadorDeQuantidadeDeAnalises(req: Request, res: Response, next: NextFunction) {

    const acessTokenJwt = req.cookies.acessToken;

    if (!acessTokenJwt) {
        return res.status(401).json({mensagem: "Acesso negado. Token não fornecido."});
    };

    try {

        const {id} = jwt.verify(acessTokenJwt, process.env.JWT_SECRET ?? "") as Id

        const usuario = await prisma.usuarios.findUnique({
            where: {
                id: id
            }
        });

        if (!usuario) {
            return res.status(404).json({mensagem: "Usuario não encontrado"});
        };

        if (usuario.plano === "gratis" && usuario.analises <= 0) {
            return res.status(403).json({mensagem: "Suas analises acabaram, atualize o plano para mais analises"});
        };

        if (usuario.plano === "pro" && usuario.analises <= 0) {
            return res.status(403).json({mensagem: "Suas analises acabaram, atualize o plano para mais analises"});
        };

        if (usuario.plano === "full" && usuario.analises <= 0) {
            return res.status(403).json({mensagem: "Suas analises acabaram"});
        };

        next();
    } catch (error) {
        return res.status(403).json({mensagem: "Erro nas analises, tente novamente mais tarde."});
    };

};