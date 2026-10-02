import nodemailer from "nodemailer";
import dns from "node:dns";

// Faz o Node priorizar IPv4
dns.setDefaultResultOrder("ipv4first");

export async function emailServico(email: string, codigoGerado: string) {

    console.log("1 - Entrou no emailService");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },

        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000
    });

    console.log("2 - Transporter criado");

    try {

        console.log("3 - Antes do verify");

        await transporter.verify();

        console.log("4 - Verify passou");

        await transporter.sendMail({
            from: `Analisador de Currículo <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Código de verificação",
            html: `
                <h1>Olá!</h1>
                <p>Seu código de verificação é:</p>
                <h2>${codigoGerado}</h2>
            `,
            text: `Seu código de verificação é: ${codigoGerado}`
        });

        console.log("5 - Email enviado com sucesso!");

    } catch (error) {

        console.error("ERRO NO EMAIL:", error);

        throw error;
    }
}