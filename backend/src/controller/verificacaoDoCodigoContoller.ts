import { Request, Response } from "express";
import prisma from "../lib/prisma";

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

        
    };

};