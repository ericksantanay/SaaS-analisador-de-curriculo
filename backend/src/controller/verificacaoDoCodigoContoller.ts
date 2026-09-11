import { Request, Response } from "express";

interface RequestUserId extends Request {
  userId?: string;
};

export class pedirNovoCodigo {

    async codigoNovo(req: RequestUserId, res: Response) {

    };

};