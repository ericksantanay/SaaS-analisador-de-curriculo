import Router, { CookieOptions } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/verificarCodigo", async (req: Request, res: Response) => {

    // #####################  VERIFICAR CODIGO E EMAIL #######################
    const { email, codigoDeVerificacao } = req.body;

    if (!email || !codigoDeVerificacao) {
        return res.status(400).json({mensagem: "Email e codigo invalido."});
    };

    try {

        // Buscando usuario no banco de dados
        const usuario = await prisma.usuarios.findFirst({
            where: {
                email: email
            }
        });

        // Verificação do usuario
        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuario não existe"
            });
        };

        // Verificando se o email já foi validado
        if (usuario.emailVerificado) {
            return res.status(400).json({mensagem: "Email já foi validado."});
        };

        // Verificação das tentativas
        if (usuario.tentativasDoCodigo >= 4) {
            return res.status(403).json({mensagem: "Tentativas falhas, gere um codigo novo"});
        };

        // Verificando o codigo e o email
        if (usuario.codigoDeVerificacao === codigoDeVerificacao && usuario.email === email) {

            await prisma.usuarios.update({
                where: {
                    id: usuario.id
                },
                data: {
                    emailVerificado: true,
                    codigoVerificado: true,
                    tentativasDoCodigo: 0
                }
            });

            // ############################
            // PARTE DO ACESSTOKEN
            // ############################

            const cookieConfigAcessToken: CookieOptions = {
                httpOnly: true,
                secure: false, // Depois por true quando for para produção
                sameSite: "strict",
                maxAge: 10 * 60 * 1000
            };

            const cookieConfigRefreshToken: CookieOptions = {
                httpOnly: true,
                secure: false, // Depois por true quando for para produção
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            };

            // Criando os tokens
            const token = jwt.sign({ id: usuario.id },process.env.JWT_SECRET ?? "",{ expiresIn: "10m" });

            const refresh = jwt.sign({ id: usuario.id },process.env.REFRESH_SECRET ?? "",{ expiresIn: "7d" });

            // Criando os cookies
            res.cookie("acessToken", token, cookieConfigAcessToken);
                                                                                                        
            res.cookie("refreshToken", refresh, cookieConfigRefreshToken);

            return res.status(200).json({mensagem: "Email e codigo verificado com sucesso."});

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
                        codigoDeVerificacao: null,
                        tentativasDoCodigo: 4
                    }
                });

                return res.status(403).json({mensagem: "Tentativas falhas, gere um codigo novo"});
            };

            return res.status(403).json({mensagem: `Codigo incorreto. Tentativa ${incrementarTentativa} de 4.`});
        };

    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor"});
    };
});

export default router;