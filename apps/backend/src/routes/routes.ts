import { Router } from "express";
import {
    addOrganizationMemberController,
    createOrganizationController,
    getOrganizationMembersController,
    getUserOrganizationsController,
} from "../controllers/org.controller";
import { requireAuth } from "../middlewares/auth.js";
import {
    createBoardController,
    getAllOrgBoardsController,
} from "../controllers/board.controller";
import { createSectionController } from "../controllers/section.controller";
import { createIssueController } from "../controllers/issue.controller";

const router: Router = Router();

router.get("/org/user-orgs", requireAuth, getUserOrganizationsController);
router.post("/org/add", requireAuth, createOrganizationController);
router.post("/:orgId/board/add", requireAuth, createBoardController);
router.get("/:orgId/boards", requireAuth, getAllOrgBoardsController);
router.post("/:orgId/add-member", requireAuth, addOrganizationMemberController);
router.get("/:orgId/members", requireAuth, getOrganizationMembersController);
router.post("/section/add", requireAuth, createSectionController);
router.post("/issue/new", requireAuth, createIssueController);

export default router;