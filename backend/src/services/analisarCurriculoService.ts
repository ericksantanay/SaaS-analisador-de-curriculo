import fs from "fs";
import prisma from "../lib/prisma";

export async function analisarCurriculosService(userId: string, prompt: string, arquivo: Express.Multer.File) {
    
        const { GoogleGenAI } = await import("@google/genai");

        const usuario = await prisma.usuarios.findUnique({
            where:{
                id: userId
            }
        })

        if (!usuario) {
            throw new Error("Usuario não existe");
        };

        const nomePdf = arquivo.filename;

        // ########
        const pdfBuffer = fs.readFileSync(arquivo.path);
        
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

            const resultado = JSON.parse(response.text);

             // Salvar no banco de dados com o prisma.
             if (usuario.plano === "full") {

                await prisma.promptsCurriculos.create({
                    data: {
                        prompt: prompt,
                        pdfCurriculo: arquivo.filename,

                        notaGeral: resultado.nota_geral,
                        statusAts: resultado.status_ats,
                        pontosFortes: resultado.pontos_fortes,
                        pontosFracos: resultado.pontos_fracos,
                        palavrasFaltantes: resultado.palavras_faltantes,

                        userId: usuario.id
                    }
                });

                
             }; 

             return resultado;
};