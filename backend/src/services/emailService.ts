import nodemailer from "nodemailer";

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

    } catch (error) {

        console.error("ERRO NO VERIFY:", error);

        throw error;
    }

    try {

        console.log("5 - Antes do sendMail");

        await transporter.sendMail({
            from: `"Analisador de Currículo" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Código de verificação",
            text: `Seu código de verificação é: ${codigoGerado}`
        });

        console.log("6 - Email enviado");

    } catch (error) {

        console.error("ERRO NO SENDMAIL:", error);

        throw error;
    }
}