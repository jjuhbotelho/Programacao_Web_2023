import { plainToInstance } from "class-transformer";
import { CreateSkillDto } from "../entities/skills/create-skill-dto";
import { SkillDto } from "../entities/skills/skill-dto";
import { prisma } from "../prisma";
import { UpdateSkillDto } from "../entities/skills/update-skill-dto";

export class SkillRepository {
    private constructor() {}

    public static make() {
        return new SkillRepository();
    }

    public async findByAgentId(agentId: number, skillId?: number): Promise<SkillDto[]> {
        const skills = await prisma.skills.findMany({
            where: {
                id: skillId,
                agent_id: agentId
            }
        });

        return plainToInstance(SkillDto, skills);
    }

    public async findByName(name: string, agentId?: number): Promise<SkillDto | undefined> {
        const skill = await prisma.skills.findFirst({
            where: {
                name,
                agent_id: agentId,
            }
        });

        if (skill) {
            return plainToInstance(SkillDto, skill);
        }
    }

    public async update(skillId: number, { name, keybind, cost }: UpdateSkillDto): Promise<SkillDto> {
        const skill = await prisma.skills.update({
            data: {
                name,
                keybind,
                cost
            },
            where: {
                id: skillId
            }
        });

        return plainToInstance(SkillDto, skill);
    }

    public async create(agentId: number, { name, keybind, cost }: CreateSkillDto): Promise<SkillDto> {
        const skill = await prisma.skills.create({
            data: {
                name,
                keybind,
                cost,
                agent_id: agentId
            }
        });

        return plainToInstance(SkillDto, skill);
    }

    public async delete(skillId: number): Promise<void> {
        await prisma.skills.delete({
            where: { id: skillId }
        });
    }
}