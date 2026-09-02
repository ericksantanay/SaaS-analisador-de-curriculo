import { Request, Response } from "express";

import { buscarPagamento } from "../services/webhook.service";

export async function webhookController(req: Request, res: Response) {

    try {

        // Pega o ID do pagamento enviado pelo Mercado Pago
        const paymentId = req.body.data?.id;

        // Envia esse ID para o service buscar os dados completos
        const pagamento = await buscarPagamento(paymentId);

        // Apenas para testar e ver os dados retornados
        console.log(pagamento);

        return res.sendStatus(200);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            mensagem: "Erro no webhook"
        });

    }

}