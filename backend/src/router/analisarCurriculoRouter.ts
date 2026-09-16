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