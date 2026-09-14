import nodemailer from "nodemailer";

export async function emailServico(emailUser: string, codigoGerado: string) {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // treue  só para a porta 467 as outras é false
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

    // Enviar os emails
    try {

        transporter.sendMail({
        from: `noroleplay<${process.env.SMTP_USER}>`, // Quem esta enviando 
        to: `${emailUser}`,
        subject: `Codigo de verificação`,
        html: `<H1>Olá</H1> <p>Esse é o seu codigo para verificar do seu email: ${codigoGerado}</p>`,
        text: `Esse é o seu codigo para verificar o seu Email:${codigoGerado}`
    })
    .then(() => console.log("Codigo enviado com sucesso!")); 

    } catch (error) {
        console.log("Erro" + error);
        return
    };
};