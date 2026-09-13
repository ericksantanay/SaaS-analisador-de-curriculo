import Router  from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
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

        return res.status(200).json({mensagem:"Login efetuado com sucesso"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensagem: "Erro no servidor:" + error});
    };
});

export default router;