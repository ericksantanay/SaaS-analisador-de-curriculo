import { MercadoPagoConfig, PreApproval } from "mercadopago";
import prisma from "../lib/prisma";

// Client
const client = new MercadoPagoConfig({
    accessToken: process.env.Acess_Token_Mercado_Pago!,
    options: { timeout: 5000 },
});

export async function mercadoPagoServicePlanoPro(userId: string) {

    const user = await prisma.usuarios.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("Usuario não existe");
    };

    // Inicializando o objeto da API
    const preApproval = new PreApproval(client);

    const planoPro = {
        reason: "Assinatura do Plano Pro",
        external_reference: user.id, // ID do usuário que está assinando (vindo do banco)
        payer_email: user.email, 
        back_url: "Aqui vai ser o link de uma pagina de sucesso tenho que fazer o frontend", // Depois por link da pagina de sucesso
        status: "authorized",
        auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            transaction_amount: 9.90, // Valor mensal do plano
            currency_id: "BRL",
        }
    };

    // Faz a requisição ao Mercado Pago e retorna a resposta
    const response = await preApproval.create({ body: planoPro });
    return response;

};

// Função exclusiva do Plano Full
export async function mercadoPagoServicePlanoFull(userId: string) {

    const user = await prisma.usuarios.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("Usuario não existe");
    };

    // Inicializando o objeto da API
    const preApproval = new PreApproval(client);

    const planoFull = {
        reason: "Assinatura do Plano Full",
        external_reference: user.id, // ID do usuário que está assinando (vindo do seu banco)
        payer_email: user.email, 
        back_url: "Aqui vai ser o link de uma pagina de sucesso tenho que fazer o frontend",
        status: "authorized",
        auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            transaction_amount: 19.00, // Valor mensal do plano
            currency_id: "BRL",
        }
    };

    // Faz a requisição ao Mercado Pago e retorna a resposta
    const response = await preApproval.create({ body: planoFull });
    return response;
};