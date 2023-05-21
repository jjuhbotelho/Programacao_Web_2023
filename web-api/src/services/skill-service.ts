import { AgentDto } from "../entities/agent/agent-dto";
import { AgentNotFound } from "../entities/errors/agent-not-found";
import { SkillAlreadyExists } from "../entities/errors/skill-already-exists";
import { SkillNotFound } from "../entities/errors/skill-not-found";
import { List } from "../entities/list";
import { CreateSkillDto } from "../entities/skills/create-skill-dto";
import { SkillDto } from "../entities/skills/skill-dto";
import { UpdateSkillDto } from "../entities/skills/update-skill-dto";
import { AgentRepository } from "../repositories/agent-repository";
import { SkillRepository } from "../repositories/skill-repository";
import { AgentService } from "./agent-service";

export class SkillService {
    private constructor(
        private readonly skillRepository: SkillRepository,
        private readonly agentService: AgentService
    ) {}

    public static make() {
        return new SkillService(
            SkillRepository.make(),
            AgentService.make()
        );
    }

    public async listAgentSkills(agentId: number): Promise<List<SkillDto>> {
        await this.agentService.findAgent(agentId);

        const skills = await this.skillRepository.findByAgentId(agentId);

        return new List(skills);
    }

    public async createSkill(agentId: number, createSkillDto: CreateSkillDto): Promise<SkillDto> {
        await this.agentService.findAgent(agentId);

        const skillExists = await this.skillRepository.findByName(createSkillDto.name, agentId);
        if(skillExists) {
            throw new SkillAlreadyExists();
        }

        return this.skillRepository.create(agentId, createSkillDto);
    }

    public async updateSkill(agentId: number, skillId: number, updateSkillDto: UpdateSkillDto): Promise<SkillDto> {
        await this.agentService.findAgent(agentId);

        const AgentSkillExists = await this.skillRepository.findByAgentId(agentId, skillId);
        if(!AgentSkillExists.length) {
            throw new SkillNotFound();
        }

        const skillExists = await this.skillRepository.findByName(updateSkillDto.name, agentId);
        if (skillExists && skillExists.id !== skillId) {
            throw new SkillAlreadyExists();
        }

        return this.skillRepository.update(skillId, updateSkillDto);
    }

    public async deleteSkill(agentId: number, skillId: number): Promise<void> {
        await this.agentService.findAgent(agentId);

        const AgentSkillExists = await this.skillRepository.findByAgentId(agentId, skillId);
        if(!AgentSkillExists.length) {
            throw new SkillNotFound();
        }

        return this.skillRepository.delete(skillId);
    }
}