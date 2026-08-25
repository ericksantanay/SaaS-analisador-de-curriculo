import Router  from "express";
import { Request, Response } from "express";

const router = Router();

router.post("/analisarCurriculo", async (req: Request, res: Response) => {

    const { GoogleGenAI } = await import("@google/genai");
        
        const {prompt} = req.body;

        if (!prompt) {
            return res.status(404).json({mensagem: "Voce nao escreveu um prompt"});
        };

        try {

            const ia = new GoogleGenAI({
                apiKey: process.env.API_KEY
            });

            const response = await ia.models.generateContent({
                model: "gemini-3.6-flash",
                contents: prompt
            });

            return res.status(200).json(response.text);
        } catch (error) {
            console.log(error);
            return res.status(500).json({mensagem: "Erro no servidor"});
        };
});

export default router;