import { Router } from "express";
import {verificarAutenticacao} from "../middleware/authMiddleware";
import { Request, Response } from "express";
import {PagamentoController} from "../controller/pagamentoController";
// PLANO PRO

const router = Router();
const pagamentoControllerRouter = new PagamentoController();

interface RequestUserId extends Request {
    userId?: string
}

router.post("/planoPro", verificarAutenticacao, async (req: RequestUserId, res: Response) => {

    pagamentoControllerRouter.handlePlanoPro(req, res);
});

export default router;