import { Request, Response } from "express";
import {novoCodigoDeAcessoService} from "../services/codigoNovoService";

interface RequestUserId extends Request {
  userId?: string;
};

export class pedirNovoCodigo {

    async codigoNovo(req: RequestUserId, res: Response) {
        // Pegando o ID
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado." });
        };

        const idUsuario = await novoCodigoDeAcessoService(userId)
    };

};