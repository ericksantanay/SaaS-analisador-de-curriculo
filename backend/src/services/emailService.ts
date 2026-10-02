import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function emailServico(email: string, codigoGerado: string) {

    console.log("1 - Entrou no emailService");

    try {

        const { data, error } = await resend.emails.send({
            from: "Analisador de Currículo <onboarding@resend.dev>",
            to: [email],
            subject: "Código de verificação",
            html: `
                <h1>Olá!</h1>

                <p>
                    Esse é o seu código para verificar o seu email:
                </p>

                <h2>${codigoGerado}</h2>
            `,
        });

        if (error) {
            console.error("Erro do Resend:", error);
            throw new Error(error.message);
        }

        console.log("Email enviado com sucesso!");
        console.log("ID do email:", data?.id);

        return data;

    } catch (error) {

        console.error("Erro ao enviar email:", error);

        throw error;
    }
}