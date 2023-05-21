import { plainToInstance } from "class-transformer";
import { AgentDto } from "../entities/agent/agent-dto";
import { prisma } from "../prisma";
import { CreateAgentDto } from "../entities/agent/create-agent-dto";
import { UpdateAgentDto } from "../entities/agent/update-agent-dto";

export class AgentRepository {
    private constructor() {}

    public static make() {
        return new AgentRepository();
    }

    public async findByName(name: string): Promise<AgentDto>  {
        const agents = await prisma.agents.findFirst({
            where: { name }
        });

        return plainToInstance(AgentDto, agents);
    }

    public async findById(agentId: number, skills: boolean = false): Promise<AgentDto | undefined> {
        const agent = await prisma.agents.findUnique({ 
            where: { id: agentId },
            include: { skills }
        });

        if (agent) {
            return plainToInstance(AgentDto, agent, { groups: ["skills"] });
        }
    }

    public async create({ name, current_class }: CreateAgentDto): Promise<AgentDto> {
        const agent = await prisma.agents.create({
            data: {
                name,
                current_class
            }
        });

        return plainToInstance(AgentDto, agent);
    }

    public async update(agentId: number, {name, current_class}: UpdateAgentDto): Promise<AgentDto> {
        const agent = await prisma.agents.update({
            data: {
                name,
                current_class
            },
            where: { id: agentId }
        });

        return plainToInstance(AgentDto, agent, { exposeUnsetFields: false });
    }

    public async delete(agentId: number): Promise<void> {
        await prisma.agents.delete({
            where: { id: agentId }
        });
    }

    public async list(): Promise<AgentDto[]> {
        const agents = await prisma.agents.findMany();

        return plainToInstance(AgentDto, agents, { exposeUnsetFields: false });
    }
}