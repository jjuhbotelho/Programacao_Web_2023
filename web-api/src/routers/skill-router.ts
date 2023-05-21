import { Router } from "express";
import { SkillController } from "../controllers/skill-controller";

const skillController = SkillController.make();

const skillRouter = Router();

skillRouter.post("/agents/:agent_id/skills", skillController.createSkill.bind(skillController));
skillRouter.get("/agents/:agent_id/skills", skillController.listAgentSkills.bind(skillController));
skillRouter.put("/agents/:agent_id/skills/:skill_id", skillController.updateAgentSkill.bind(skillController));
skillRouter.delete("/agents/:agent_id/skills/:skill_id", skillController.deleteAgentSkill.bind(skillController));

export { skillRouter };