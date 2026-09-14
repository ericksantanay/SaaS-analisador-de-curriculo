import { Request, Response } from "express";
import { novoCodigoDeAcessoService } from "../services/codigoNovoService";
import prisma from "../lib/prisma";

export class pedirNovoCodigo {

  async codigoNovo(req: Request, res: Response) {

    // ########### CHEGOU NO CONTROLLER ############

    const {email} = req.body;
    
    if (!email) {
      return res.status(400).json({mensagem: "Email e senha não recebidos."});
    };

    try {
      const user = await prisma.usuarios.findUnique({
          where: {
            email: email
          }
      });

      if (!user) {
        return res.status(404).json({mensagem: "Usuario não existe."});
      };

      const emailDoUsuario = user.email
    
      await novoCodigoDeAcessoService(emailDoUsuario);

      return res.status(201).json({mensagem: "Novo codigo enviado com sucesso"});
      
    } catch (error) {

      return res.status(500).json({ error: "Erro ao gerar codigo" });
    };
  };
};