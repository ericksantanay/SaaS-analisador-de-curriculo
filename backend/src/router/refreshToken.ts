import Router, {CookieOptions}  from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const router = Router();

type ID = {
    id: string
};

router.post("/refreshToken", (req: Request, res: Response) => {

    const refresh = req.cookies.refreshToken;

    if (!refresh) {
        return res.status(401).json({mensagem: "Acesso negado. Token não fornecido."});
    };

    try {

        // Verificando o refresh
        const refreshTokenVerficiado = jwt.verify(refresh, process.env.REFRESH_SECRET ?? '') as ID 

        // Criando um novo token
        const token = jwt.sign({id: refreshTokenVerficiado.id}, process.env.JWT_SECRET ?? "", {expiresIn: "10m"});

        // Configuração do cookies
        const configCookie: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 10 * 60 * 1000
        };

        res.cookie('acessToken', token, configCookie);

        return res.status(201).json({mensagem: "Refresh criado com sucesso"});
        
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    };

});

export default router;