import prisma from "../lib/prisma";
import nodemailer from "nodemailer";

export async function novoCodigoDeAcessoService(userId: string) {
    
    const codigoGerado = Math.floor(1000000 + Math.random() * 10000000).toString(); 

    const usuario = await prisma.usuarios.findUnique({
        where: {
            id: userId
        }
    });

    if (!usuario) {
        throw new Error("Usuario não existe"); 
    };

    if (usuario.codigoVerificacao === null && usuario.tentativasDoCodigo === 4) {

        const atualizandoOCodigoDeAcesso = await prisma.usuarios.update({
            where: {
                id: usuario.id
            },
            data:{
                codigoVerificacao:codigoGerado
            }
        });


        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Verify do transporter
        try {
            await transporter.verify();
        } catch (error) {
            console.log("Erro:" + error);
        };

        try {
            // Mandando o Email
            transporter.sendMail({
                from: `noroleplay<${process.env.SMTP_USER}>`,
                to: `${usuario.email}`,
                subject: `Codigo de verificação 2`,
                html: `<H1>Olá</H1> <p>Esse é o seu novo codigo para verificar o seu Email: ${codigoGerado}</p>`
            })
            .then(() => console.log("Novo codigo enviado com sucesso!")); 
        } catch (error) {
            console.log("Erro" + error);
            return;
        };

        return  atualizandoOCodigoDeAcesso;
    };
     
};