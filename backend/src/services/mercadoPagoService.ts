import { MercadoPagoConfig, Preference } from "mercadopago";
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
    const preference = new Preference(client);

    const planoPro = await preference.create({
        body: {
            items: [
                {
                    id: "plano_pro",
                    title: "Plano Pro - Acesso Mensal - Analisador de Cúrriculos",
                    quantity: 1,
                    unit_price: 9.90, // Valor em número
                    currency_id: "BRL"
                }
            ],
            payer: {
                email: user.email,
            },
            external_reference: user.id, // O ID do seu usuário continua aqui para você resgatar no Webhook!
            back_urls: {
                success: "https://www.google.com.br", // URL temporária de sucesso
                failure: "https://www.google.com.br",
                pending: "https://www.google.com.br"
            },
            auto_return: "approved", // Se aprovado, redireciona o usuário automaticamente de volta para o seu site
        }
    });

    // O Preference retorna um objeto contendo o 'init_point'
    return planoPro;

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
    const preference = new Preference(client);

    const planoFull = await preference.create({
        body: {
            items: [
                {
                    id: "plano_full",
                    title: "Plano Full - Acesso Mensal - Analisador de Cúrriculos",
                    quantity: 1,
                    unit_price: 19.00, // Valor
                    currency_id: "BRL"
                }
            ],
            payer: {
                email: user.email,
            },
            external_reference: user.id, // O ID do usuário
            back_urls: {
                success: "https://www.mercadopago.com.br/checkout/v1/payment/redirect/fd4b82a1-7cf5-4887-981f-28ed21f282b8/review/?preference-id=3655964097-cbd2b7be-6afb-4ee4-89d9-3401cc4774a0&router-request-id=f7a701c9-bbdb-4a3e-85e5-09f435757d87&p=4f3ca7e7cae4447235938efe529b3a77", // URL temporária de sucesso
                failure: "https://www.mercadopago.com.br/checkout/v1/payment/redirect/fd4b82a1-7cf5-4887-981f-28ed21f282b8/review/?preference-id=3655964097-cbd2b7be-6afb-4ee4-89d9-3401cc4774a0&router-request-id=f7a701c9-bbdb-4a3e-85e5-09f435757d87&p=4f3ca7e7cae4447235938efe529b3a77",
                pending: "https://www.mercadopago.com.br/checkout/v1/payment/redirect/fd4b82a1-7cf5-4887-981f-28ed21f282b8/review/?preference-id=3655964097-cbd2b7be-6afb-4ee4-89d9-3401cc4774a0&router-request-id=f7a701c9-bbdb-4a3e-85e5-09f435757d87&p=4f3ca7e7cae4447235938efe529b3a77b "
            },
            auto_return: "approved", // Se aprovado, redireciona o usuário automaticamente de volta para o seu site
        }
    });

    return planoFull;
};