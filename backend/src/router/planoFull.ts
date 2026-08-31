import { Router } from "express";
import { Request, Response } from "express";
import {verificarAutenticacao} from "../middleware/authMiddleware";
import {PagamentoController} from "../controller/pagamentoController";
// PLANO FULL

const router = Router();
const pagamentoControllerRouter = new PagamentoController();

interface RequestUserId extends Request {
    userId?: string
}

router.post("/planoFull", verificarAutenticacao, async (req: RequestUserId, res: Response) => {

    pagamentoControllerRouter.handlePlanoFull(req, res);
});

export default router;