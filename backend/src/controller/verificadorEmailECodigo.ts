import Router, {CookieOptions}  from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/verificarCodigo", async (req: Request, res: Response) => {

    const { email, codigoDeVerificacao } = req.body;

    if (!email || !codigoDeVerificacao) {
        return res.status(400).json({mensagem: "Email e codigo invalido."});
    };

    try {

        // Busacando usuario no banco de dados
        const usuario = await prisma.usuarios.findFirst({
            where: {
                email: email
            }
        });

        // Verificação do usuario
        if (!usuario) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        // Validação do email
        if (usuario.emailVerificado) {
            return res.status(400).json({mensagem: "Email já foi verificado."});
        };

        // Verificação das tentaivas
        if (usuario.tentativasDoCodigo >= 4) {
            return res.status(403).json({mensagem: "Tentativas falhas, gere um codigo novo"});
        };

        // Verificando o codigo e email se for verdadeiro eu atualizo no banco de dados
        if (usuario.codigoDeVerificacao === codigoDeVerificacao && usuario.email === email) {

            await prisma.usuarios.update({

                where: {
                    id: usuario.id
                },

                data: {
                    emailVerificado: true,
                    tentativasDoCodigo: 0
                }

            });

            // Antes de liberar o acessToken eu vou verificar se esta false, se estiver eu retorno o erro
            if (usuario.emailVerificado === false || usuario.codigoVerificado === false) {
                return res.status(401).json({mensagem: "Seu codigo e seu email não foram verificados"})
            };

             // #
            // ####### PARTE DO ACESSTOKEN ####### //

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
            const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET ?? "", {expiresIn: "10m"});

            const refresh = jwt.sign({id: usuario.id}, process.env.REFRESH_SECRET ?? "", {expiresIn: "7d"});

            // Resposta do backend
            res.cookie('acessToken', token, cookieConfigAcessToken);
            res.cookie('refreshToken', refresh, cookieConfigRefreshToken);

            return res.status(200).json({mensagem: "Email e codigo verificado com sucesso."});

            // #
        } else {
            const incrementarTentativa = usuario.tentativasDoCodigo + 1;

            await prisma.usuarios.update({
                where: {
                    id: usuario.id
                },
                data: {
                    tentativasDoCodigo: incrementarTentativa
                }
            });

            if (incrementarTentativa >= 4) {

                await prisma.usuarios.update({
                    where: {
                        id: usuario.id
                    },
                    data: {
                        codigoVerificacao: null,
                        tentativasDoCodigo: 4
                    }
                });

                return res.status(403).json({mensagem: "Tentativas falhas, gere um codigo novo"});
            };

            return res.status(403).json({mensagem: `Codigo incorreto. Tentativa ${incrementarTentativa} de 4.`});
        };

    } catch (error) {

        console.log("Erro no controller:" + error);
        return res.status(500).json({
            mensagem: "Erro no servidor"
        });
    };
});

export default router;