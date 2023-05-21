import { CreateAgentDto } from "../entities/agent/create-agent-dto";
import { AgentAlreadyExists } from "../entities/errors/agent-already-exists";
import { AgentRepository } from "../repositories/agent-repository";
import { agentClassIsValid } from "../utils/class-validator";
import { AgentNotFound } from "../entities/errors/agent-not-found";
import { UpdateAgentDto } from "../entities/agent/update-agent-dto";
import { List } from "../entities/list";

export class AgentService {
    private constructor(
        private readonly agentRepository: AgentRepository
    ) {}

    public static make() {
        return new AgentService(
            AgentRepository.make()
        );
    }

    public async createAgent(createAgentDto: CreateAgentDto) {
        agentClassIsValid(createAgentDto.current_class);

        const agentExists = await this.agentRepository.findByName(createAgentDto.name);
        if (agentExists) {
            throw new AgentAlreadyExists();
        }

        return this.agentRepository.create(createAgentDto);
    }

    public async listAgents() {
        const agents = await this.agentRepository.list();
        
        return new List(agents);
    }

    public async findAgent(id: number) {
        const agent = await this.agentRepository.findById(id, true);
        if (!agent) {
            throw new AgentNotFound();
        }

        return agent;
    }

    public async updateAgent(id: number, updateAgentDto: UpdateAgentDto) {
        const agent = await this.agentRepository.findById(id);
        if (!agent) {
            throw new AgentNotFound();
        }

        const agentExists = await this.agentRepository.findByName(updateAgentDto.name);
        if (agentExists && agentExists.id !== id) {
            throw new AgentAlreadyExists();
        }

        return this.agentRepository.update(id, updateAgentDto);
    }

    public async deleteAgent(id: number) {
        const agent = await this.agentRepository.findById(id);
        if (!agent) {
            throw new AgentNotFound();
        }

        return this.agentRepository.delete(id);
    }
}