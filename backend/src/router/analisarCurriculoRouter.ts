import Router from "express";
import multer from "multer";
import {verificarAutenticacao} from "../middleware/authMiddleware";
import {analisarCurriculosController} from "../controller/analisarCurriculoController";
import {verificadorDeQuantidadeDeAnalises} from "../middleware/middlewareVerificarQuantidadesAnalises";

const router = Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./pdf");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,

    fileFilter: function (req, file, cb) {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Apenas arquivos PDF são permitidos"));
        }
    }
});

router.post(
    "/analisarCurriculo",
    verificarAutenticacao,
    upload.single("pdfCurriculo"),
    analisarCurriculosController,
    verificadorDeQuantidadeDeAnalises
);

export default router;


//         //     console.log(req.file);

//         //     const pdfInteiro = req.file;

//         //     const nomePdf = req.file?.filename;

//         //     if (!pdfInteiro) {
//         //         return res.status(404).json({mensagem: "Adicione um PDF"});
//         //     };

//         //     const pdfBuffer = fs.readFileSync(pdfInteiro.path);

//         //     const pdfEmBase64 = pdfBuffer.toString("base64");

//         //     const ia = new GoogleGenAI({apiKey: process.env.API_KEY});

           

//         //     if (!response.text) {
//         //         return res.status(500).json({mensagem: "A IA não retornou uma resposta"});
//         //     };

//         //     // Salvar no banco de dados com o prisma.

//         //     return res.status(200).json(JSON.parse(response.text));;

//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({mensagem: "Erro no servidor"});
//     };

// });

// export default router;