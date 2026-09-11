import { MercadoPagoConfig, Payment} from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: process.env.Acess_Token_Mercado_Pago!,
    options: {
        timeout: 5000
    }
});

export async function buscarPagamento(paymentId: string) {

    const payment = new Payment(client);

    const pagamento = await payment.get({
        id: paymentId
    });

    console.log("Pagamento consultado:", pagamento);

    return pagamento;
};