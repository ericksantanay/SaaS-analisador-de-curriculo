import Router, {CookieOptions}  from "express";;
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/loginDeUsuarios", async (req: Request, res: Response) => {

    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(404).json({mensagem: "Preencha os campos corretamente"});
    };

    try {

        const user = await prisma.usuarios.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        if (!user.email) {
            return res.status(404).json({mensagem: "Usuario ou senha invalidos"})
        };
        
        // Comparando a senha com a que esta no banco de dados
        const password = await bcrypt.compare(senha, user.senha);

        // Validando a senha 
        if (!password) {
            res.status(404).json({mensagem: "Usuario ou senha invalidos"});
        };

        // Configuração dos cookies
        const cookieConfigAcessToken: CookieOptions = {
            httpOnly: true, //JavaScript não pode acessar esse cookie
            secure: true, //JavaScript não pode acessar esse cookie
            sameSite: 'none', // Quando for para producao deixar true!
            maxAge: 10 * 60 * 1000 // 10 minutos
        };

        const cookieConfigRefreshToken: CookieOptions = {
            httpOnly: true, //JavaScript não pode acessar esse cookie
            secure: true, //JavaScript não pode acessar esse cookie
            sameSite: 'none', // Quando for para producao deixar true!
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        };

        // Criando o token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET ?? "", {expiresIn: "10m"});

        const refresh = jwt.sign({id: user.id}, process.env.REFRESH_SECRET ?? "", {expiresIn: "7d"});

        // Resposta do backend
        res.cookie('acessToken', token, cookieConfigAcessToken);
        res.cookie('refreshToken', refresh, cookieConfigRefreshToken);

        return res.status(200).json({mensagem:"Login efetuado com sucesso"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensagem: "Erro no servidor:" + error});
    };
});

export default router;