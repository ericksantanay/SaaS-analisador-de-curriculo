import nodemailer from "nodemailer";
console.log("1 - Entrou no emailService");

export async function emailServico(
    email: string,
    codigoGerado: string
) {
    console.log("Chegou no email Service");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    try {

        await transporter.verify();

        console.log("SMTP funcionando!");

        // Enviando email
        await transporter.sendMail({
            from: `noroleplay <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Código de verificação",
            html: 
            `<h1>Olá</h1> 
            <p>Esse é o seu código para verificar o seu email:${codigoGerado}</p>`,
            text: `Esse é o seu código para verificar o seu email: ${codigoGerado}`
        });

        console.log("Código enviado com sucesso!");

    } catch (error) {
        console.log("Erro ao enviar email:", error);
        throw error;
    }
}