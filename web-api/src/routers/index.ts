import { Router } from "express";
import { agentRouter } from "./agent-router";
import { skillRouter } from "./skill-router";

const apiRouter = Router();

apiRouter.use("/valorant", agentRouter);
apiRouter.use("/valorant", skillRouter);

export { apiRouter };