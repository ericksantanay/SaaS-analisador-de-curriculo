import { Router } from "express";
import {verificarAutenticacao} from "../middleware/authMiddleware";
import { Request, Response } from "express";
import {pedirNovoCodigo} from "../controller/verificacaoDoCodigoContoller";

const router = Router();
const pedirCodigo = new pedirNovoCodigo();

interface RequestUserId extends Request {
    userId?: string
}

router.post("/novoCodigo", verificarAutenticacao, (req: RequestUserId, res: Response) => {
    pedirCodigo.codigoNovo(req, res)
});


export default router;