import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

const router = Router();

router.post("/verificarCodigo", async (req: Request, res: Response) => {

    const { email, codigoVerificacao } = req.body;

    if (!email || !codigoVerificacao) {
        return res.status(400).json({mensagem: "Email e codigo invalido."});
    };

    try {

        const usuario = await prisma.usuarios.findFirst({
            where: {
                email: email
            }
        });

        if (!usuario) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        if (usuario.emailVerificado) {
            return res.status(400).json({mensagem: "Email já foi verificado."});
        };

        if (usuario.tentativasDoCodigo >= 4) {
            return res.status(403).json({mensagem: "Tentativas falhas, gere um codigo novo"});
        };

        if (usuario.codigoVerificacao === codigoVerificacao && usuario.email === email) {

            await prisma.usuarios.update({

                where: {
                    id: usuario.id
                },

                data: {
                    emailVerificado: true,
                    tentativasDoCodigo: 0
                }

            });


            // if (usuario.emailVerificado  == true) {

            // }

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