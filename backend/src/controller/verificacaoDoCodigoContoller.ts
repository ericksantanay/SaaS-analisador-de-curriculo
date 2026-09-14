import { Request, Response } from "express";
import { novoCodigoDeAcessoService } from "../services/codigoNovoService";
import prisma from "../lib/prisma";

export class pedirNovoCodigo {

  async codigoNovo(req: Request, res: Response) {

    const {email, codigoDeVerificacao} = req.body;

    if (!email || !codigoDeVerificacao) {
      res.status(400).json({mensagem: "Email e senha não recebidos."});
    };

    try {

      const user = await prisma.usuarios.findUnique({
          where: {
            email: email, 
            codigoDeVerificacao: codigoDeVerificacao
          }
      });

      if (!user) {
        return res.status(404).json({mensagem: "Usuario nãoe existe."});
      };
    
      const emailUsuario = await novoCodigoDeAcessoService(user.email);

      return res.status(201).json(emailUsuario);
    } catch (error) {
      return res.status(500).json({ error: "Erro no codigo" });
    };
  };
};