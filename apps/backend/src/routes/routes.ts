import { Router } from "express";
import { createOrganizationController } from "../controllers/org.controller";
import { requireAuth } from "../middlewares/auth.js";

const router: Router = Router();

router.post("/org/add", requireAuth, createOrganizationController);

export default router;