import { Router } from "express";
import { createOrganizationController } from "../controllers/org.controller";
import { requireAuth } from "../middlewares/auth.js";
import { createBoardController } from "../controllers/board.controller";

const router: Router = Router();

router.post("/org/add", requireAuth, createOrganizationController);
router.post("/:orgId/board/add", requireAuth, createBoardController);


export default router;