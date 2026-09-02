import { Router } from "express";

import { webhookController } from "../controller/webhook.controller";

const router = Router();

router.post("/webhook", webhookController);

export default router;