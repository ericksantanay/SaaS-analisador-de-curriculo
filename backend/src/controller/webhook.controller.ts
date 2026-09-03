import { Request, Response } from "express";
import { buscarPagamento } from "../services/webhook.service";

export async function webhookController(req: Request, res: Response) {
    try {
        // console.log("===== WEBHOOK RECEBIDO =====");
        console.log(JSON.stringify(req.body, null, 2));

        const paymentId = req.body?.data?.id;

        if (!paymentId) {
            console.log("Webhook recebido sem ID de pagamento.");

            return res.status(400).json({
                mensagem: "ID do pagamento não encontrado"
            });
        }

        console.log("ID do pagamento:", paymentId);

        const pagamento = await buscarPagamento(String(paymentId));

        // console.log("PAGAMENTO ENCONTRADO:");
        console.log(pagamento);

        return res.sendStatus(200);

    } catch (error) {
        console.error("ERRO NO WEBHOOK:");
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro no webhook"
        });
    };
}