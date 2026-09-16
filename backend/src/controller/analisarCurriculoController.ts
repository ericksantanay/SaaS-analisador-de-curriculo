import { Request, Response } from "express";
import {analisarCurriculosService} from "../services/analisarCurriculoService";

interface RequestUserId extends Request {
  userId?: string;
};

export async function analisarCurriculosController(req: RequestUserId, res: Response) {

    try {
        
        const { prompt } = req.body;
        const userId = req.userId;
        const arquivo = req.file;
        
        // Validação: garante que o middleware realmente injetou o ID
        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado." });
        };

        // Validaçãod o prompt
        if (!prompt) {
            return res.status(404).json({mensagem: "Voce nao escreveu um prompt"});
        };

        // Validação do PDF
        if (!arquivo) {
            return res.status(404).json({mensagem: "Adicione um PDF"});
        };
        
        const dadosDasAnalises = await analisarCurriculosService(userId, prompt, arquivo);

        return res.status(200).json(dadosDasAnalises);

    } catch (error) {
        console.log("Erro ao analisar o curriculo (Backend)",error);
        return res.status(500).json({ error: "Erro ao analisar o curriculo" });
    };
};