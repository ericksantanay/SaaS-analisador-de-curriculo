import fs from "fs";

export async function analisarCurriculosService(userId: string, prompt: string, arquivo: any) {
    
        const { GoogleGenAI } = await import("@google/genai");

        const pdfInteiro = arquivo.file;
        const nomePdf = arquivo.file.filename;

        // ########
         const pdfBuffer = fs.readFileSync(pdfInteiro.path);

          const pdfEmBase64 = pdfBuffer.toString("base64");

           const ia = new GoogleGenAI({apiKey: process.env.API_KEY});

            const response = await ia.models.generateContent({

                model: "gemini-3.6-flash",

                contents: [
                    {
                        text: prompt
                    },
                    {
                        inlineData: {
                            mimeType: "application/pdf",
                            data: pdfEmBase64
                        }
                    }
                ],

                config: {

                    responseMimeType: "application/json",

                    responseSchema: {

                        type: "object",

                        properties: {

                            nota_geral: {
                                type: "number"
                            },

                            status_ats: {
                                type: "string"
                            },

                            pontos_fortes: {

                                type: "array",

                                items: {
                                    type: "string"
                                }

                            },

                            pontos_fracos: {

                                type: "array",

                                items: {
                                    type: "string"
                                }

                            },

                            palavras_faltantes: {

                                type: "array",

                                items: {
                                    type: "string"
                                }

                            }

                        }

                    }

                }

            });

            if (!response.text) {
                throw new Error("A IA não retornou uma resposta")
            };

             // Salvar no banco de dados com o prisma.

            return response.text;
    
};