import { Request, Response } from "../entities/request";
import { AgentService } from "../services/agent-service";
import { ValidatorPipeBody, ValidatorPipeParams } from "../decorators/class-validator";
import { CreateAgentDto } from "../entities/agent/create-agent-dto";
import { FindAgentDto } from "../entities/agent/find-agent-dto";
import { UpdateAgentDto } from "../entities/agent/update-agent-dto";

export class AgentController {
    private constructor(
        private readonly agentService: AgentService
    ) {}
        
    public static make() {
        return new AgentController(
            AgentService.make()
        );
    }
        
    @ValidatorPipeBody(CreateAgentDto)
    public async createAgent(req: Request<CreateAgentDto>, res: Response) {
        await this.agentService.createAgent(req.body);
        return res.status(201).end();
    }

    public async listAgents(req: Request, res: Response) {
        const agentList = await this.agentService.listAgents();
        return res.json(agentList);
    }

    @ValidatorPipeParams(FindAgentDto)
    public async findAgent(req: Request<never, FindAgentDto>, res: Response) {
        const agent = await this.agentService.findAgent(req.params.agent_id);
        return res.json(agent);
    }

    @ValidatorPipeBody(UpdateAgentDto)
    @ValidatorPipeParams(FindAgentDto)
    public async updateAgent(req: Request<UpdateAgentDto, FindAgentDto>, res: Response) {
        const agent = await this.agentService.updateAgent(
            req.params.agent_id,
            req.body
        );

        return res.json(agent);
    }

    @ValidatorPipeParams(FindAgentDto)
    public async deleteAgent(req: Request<never, FindAgentDto>, res: Response) {
        await this.agentService.deleteAgent(req.params.agent_id);
        return res.status(204).end();
    }
}