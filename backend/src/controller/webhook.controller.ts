import { Request, Response } from "express";
import { buscarPagamento } from "../services/webhook.service";
import {planoProService, planoFullService} from "../services/regraDosPlanos";

export async function webhookController(req: Request, res: Response) {
    try {
        console.log("===== WEBHOOK RECEBIDO =====");
        console.log(JSON.stringify(req.body, null, 2));

        const paymentId = req.body.resource;

        console.log("PAYMENT ID RECEBIDO:", paymentId);

        if (!paymentId) {
            console.log("Webhook recebido sem ID de pagamento.");

            return res.status(400).json({
                mensagem: "ID do pagamento não encontrado"
            });
        }

        console.log("ID do pagamento:", paymentId);

        const pagamento = await buscarPagamento(String(paymentId));
        // console.log("PAGAMENTO ENCONTRADO:");
        console.log("Pagamento:", pagamento);
        const idUser = pagamento.external_reference;

        console.log("External Reference:", pagamento.external_reference);

        if (!idUser) {
            return res.status(404).json({mensagem: "Usuario não existe"});
        };

        if (pagamento.status !== "approved") {
            return res.status(200).json({mensagem: "Pagamento não aprovado"});
        };

        if (pagamento.status === "approved") {
            res.status(200).json({mensagem: "Pagamento aprovado"});
            // Passando o id do usuario pela função;
            await planoProService(idUser);
            await planoFullService(idUser);
        };
        
        

        return res.sendStatus(200);

    } catch (error) {
        console.error("ERRO NO WEBHOOK:");
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro no webhook"
        });
    };
};