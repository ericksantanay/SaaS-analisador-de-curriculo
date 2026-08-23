import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Para rotas privadas

type ID = {
    id: string
}

interface RequestUserId extends Request {
    userId?: string
}

export function verificarAutenticacao(req: RequestUserId, res: Response, next: NextFunction) {


    const acessToken = req.cookies.acessToken;

    console.log("AcessToken", acessToken);

    if (!acessToken) {
        return res.status(401).json({mensagem: "Acesso negado, token não fornecido."});
    };

    // Parte do token
   try {
    
    // Valida o token. Se falhar, o código pula direto para o bloco catch. 
    const {id} = jwt.verify(acessToken, process.env.JWT_SECRET ?? "") as ID;

    req.userId = id;

    next();
   } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' }); 
   };

};