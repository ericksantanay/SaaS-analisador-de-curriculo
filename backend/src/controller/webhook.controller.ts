import { Request, Response } from "express";
import {buscarPagamento} from "../services/webhook.service";
import {planoProService, planoFullService} from "../services/regraDosPlanos";

export async function webhookController(req: Request, res: Response) {
    try {
        // WEBHOOK
        console.log(JSON.stringify(req.body, null, 2));

        if (req.body?.topic !== "payment") {
            return res.sendStatus(200);
        };

        const paymentId = req.body.resource;

        if (!paymentId) {
            return res.status(400).json({
                mensagem: "ID do pagamento não encontrado"
            });
        };

        const pagamento = await buscarPagamento(String(paymentId));

        // console.log("PAGAMENTO ENCONTRADO:");
        const idUser = pagamento.external_reference;

        // console.log("External Reference:", pagamento.external_reference);

        if (!idUser) {
            return res.status(404).json({mensagem: "Usuario não encontrado"});
        };

        if (pagamento.status !== "approved") {
            return res.status(200).json({mensagem: "Pagamento não aprovado"});
        };

         // Aqui pegamos o valor dentro do objeto metadata
        const metadata = pagamento.metadata as {
            plano?: string
        } | undefined;

         const plano = metadata?.plano;
        
        //  Liberando o plano pro
        if (plano === "plano_pro") {
            await planoProService(idUser);
            return res.status(200).json({mensagem: "Pagamento aprovado. Plano Pro liberado."});
        };

        // Libernado o plano full
        if (plano === "plano_full") {
            await planoFullService(idUser);
            return res.status(200).json({mensagem: "Pagamento aprovado. Plano Full liberado."});
        };

        return res.status(400).json({
            mensagem: "Plano não identificado"
        });    

    } catch (error) {
        console.error("ERRO NO WEBHOOK:", error);
        return res.status(500).json({
            mensagem: "Erro no webhook"
        });
    };
};