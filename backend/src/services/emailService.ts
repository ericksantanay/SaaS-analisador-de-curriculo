import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // treue  só para a porta 467 as outras é false
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

    async function exemplo() {
        try {
            await transporter.verify();
        } catch (error) {
        
        }
    }

    try {

        transporter.sendMail({
            from: `Empresa Vulto <${process.env.SMTP_USER}>`, // Quem esta enviando 
            to: `${process.env.EmailTeste}`,
            subject: "Ola, codigo para acessar a sua conta:> CODIGO",
            html: "<H1>Ola</H1> <p>Esse é um email teste para enviar emails.</p>",
            text: "Ola, Esse é um email teste para enviar emails. "
        })
        .then(() => console.log("Email enviado com sucesso!")); 

    } catch (error) {
        console.log("Erro" + error);
    };


