import { Router } from "express";
import { AgentController } from "../controllers/agent-controller";

const agentController = AgentController.make();

const agentRouter = Router();

agentRouter.post("/agents", agentController.createAgent.bind(agentController));
agentRouter.get("/agents", agentController.listAgents.bind(agentController));
agentRouter.get("/agents/:agent_id", agentController.findAgent.bind(agentController));
agentRouter.put("/agents/:agent_id", agentController.updateAgent.bind(agentController));
agentRouter.delete("/agents/:agent_id", agentController.deleteAgent.bind(agentController));

export { agentRouter };