import { Router } from "express";
import { Request, Response } from "express";
import {pedirNovoCodigo} from "../controller/verificacaoDoCodigoContoller";

const router = Router();
const pedirCodigo = new pedirNovoCodigo();

router.post("/novoCodigo", (req: Request, res: Response) => {
    pedirCodigo.codigoNovo(req, res)
});

export default router;