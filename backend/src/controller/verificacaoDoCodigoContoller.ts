import { Request, Response } from "express";
import {novoCodigoDeAcessoService} from "../services/codigoNovoService";

interface RequestUserId extends Request {
  userId?: string;
};

export class pedirNovoCodigo {

    async codigoNovo(req: RequestUserId, res: Response) {

        try {
             // Pegando o ID
            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({ error: "Usuário não autenticado." });
            };

            const idUsuario = await novoCodigoDeAcessoService(userId)

            return res.status(201).json(idUsuario);
        } catch (error) {
            return res.status(500).json({ error: "Erro no codigo" });
        }

       
    };

};