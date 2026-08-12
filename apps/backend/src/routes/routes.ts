import { Router } from "express";
import {
    addOrganizationMemberController,
    createOrganizationController,
    getOrganizationMembersController,
} from "../controllers/org.controller";
import { requireAuth } from "../middlewares/auth.js";
import { createBoardController, getAllOrgBoardsController } from "../controllers/board.controller";

const router: Router = Router();

router.post("/org/add", requireAuth, createOrganizationController);
router.post("/:orgId/board/add", requireAuth, createBoardController);
router.get("/:orgId/boards", requireAuth, getAllOrgBoardsController);
router.post("/:orgId/add-member", requireAuth, addOrganizationMemberController);
router.get("/:orgId/members", requireAuth, getOrganizationMembersController);


export default router;