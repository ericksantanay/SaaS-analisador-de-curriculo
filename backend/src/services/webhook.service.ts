import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: process.env.Acess_Token_Mercado_Pago!,
    options: {
        timeout: 5000
    }
});

export async function buscarPagamento(paymentId: string) {

    // Criando o objeto que permite trabalhar com pagamentos
    const payment = new Payment(client);

    const pagamento = await payment.get({
        id: paymentId
    });

    console.log(pagamento)

    return pagamento;

}