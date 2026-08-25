import Router from "express";
import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./pdf");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

router.post("/analisarCurriculo", async (req: Request, res: Response) => {

    const { GoogleGenAI } = await import("@google/genai");

    try {

        const upload = multer({

            storage: storage,

            fileFilter: function (req, file, cb) {

                if (file.mimetype === "application/pdf") {

                    cb(null, true);

                } else {

                    cb(new Error("Apenas arquivos PDF são permitidos"));

                }

            }

        }).single("pdfCurriculo");


        upload(req, res, async function (err) {

            if (err instanceof multer.MulterError) {

                return res.status(400).json({
                    mensagem: "Erro no upload",
                    erro: err.message
                });

            }


            if (err) {

                return res.status(400).json({
                    mensagem: "Erro no arquivo",
                    erro: err.message
                });

            }


            const { prompt } = req.body;


            if (!prompt) {

                return res.status(404).json({
                    mensagem: "Voce nao escreveu um prompt"
                });

            }


            console.log(req.file);


            const pdfInteiro = req.file;

            const nomePdf = req.file?.filename;


            if (!pdfInteiro) {
                return res.status(404).json({mensagem: "Adicione um PDF"});
            };

            const pdfBuffer = fs.readFileSync(pdfInteiro.path);

            const pdfEmBase64 = pdfBuffer.toString("base64");

            const ia = new GoogleGenAI({
                apiKey: process.env.API_KEY
            });


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
                return res.status(500).json({mensagem: "A IA não retornou uma resposta"});
            };

            return res.status(200).json(JSON.parse(response.text));;

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            mensagem: "Erro no servidor"
        });

    };

});

export default router;