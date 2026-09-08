import { Request, Response } from "express";
import { mercadoPagoServicePlanoPro, mercadoPagoServicePlanoFull } from "../services/mercadoPagoService";
import {planoProService, planoFullService} from "../services/regraDosPlanos";

// Interface para estender o Request do Express com a nossa propriedade customizada
interface RequestUserId extends Request {
  userId?: string;
};

export class PagamentoController {
  
  // Trata a requisição do Plano Pro
  async handlePlanoPro(req: RequestUserId, res: Response) {
    try {
      // Pega o ID injetado pelo Middleware de Autenticação
      const userId = req.userId;
      
      // Validação: garante que o middleware realmente injetou o ID
      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      };

      // Chama o Service passando apenas a string do userId
      const subscription = await mercadoPagoServicePlanoPro(userId);

      // Retorna a resposta contendo a URL de checkout (init_point)
      return res.status(201).json(subscription);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar assinatura do Plano Pro." });
    };
  };

  // Trata a requisição do Plano Full
  async handlePlanoFull(req: RequestUserId, res: Response) {
    try {
      // Pega o ID injetado pelo Middleware de Autenticação
      const userId = req.userId;

      // Validação: garante que o middleware realmente injetou o ID
      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      };

      // Chama o Service passando apenas a string do userId
      const subscription = await mercadoPagoServicePlanoFull(userId);

      // Retorna a resposta contendo a URL de checkout (init_point)
      return res.status(201).json(subscription);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar assinatura do Plano Full." });
    };
  };
};