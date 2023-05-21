import { Request, Response } from "../entities/request";
import { ValidatorPipeBody, ValidatorPipeParams } from "../decorators/class-validator";
import { FindAgentDto } from "../entities/agent/find-agent-dto";
import { CreateSkillDto } from "../entities/skills/create-skill-dto";
import { SkillService } from "../services/skill-service";
import { UpdateSkillDto } from "../entities/skills/update-skill-dto";
import { FindSkillDto } from "../entities/skills/find-skill-dto";

export class SkillController {
    private constructor(
        private readonly skillService: SkillService
    ) {}
        
    public static make() {
        return new SkillController(
            SkillService.make()
        );
    }

    @ValidatorPipeBody(CreateSkillDto)
    @ValidatorPipeParams(FindAgentDto)
    public async createSkill(req: Request<CreateSkillDto,FindAgentDto>, res: Response) {
        await this.skillService.createSkill(req.params.agent_id, req.body);
        return res.status(201).end();
    }

    @ValidatorPipeParams(FindAgentDto)
    public async listAgentSkills(req: Request<never, FindAgentDto>, res: Response) {
        const skillList = await this.skillService.listAgentSkills(req.params.agent_id);
        return res.json(skillList);
    }

    @ValidatorPipeBody(UpdateSkillDto)
    @ValidatorPipeParams(FindSkillDto)
    public async updateAgentSkill(req: Request<UpdateSkillDto, FindSkillDto>, res: Response) {
        const skill = await this.skillService.updateSkill(
            req.params.agent_id,
            req.params.skill_id,
            req.body
        );

        return res.json(skill);
    }

    @ValidatorPipeParams(FindSkillDto)
    public async deleteAgentSkill(req: Request<never, FindSkillDto>, res: Response) {
        await this.skillService.deleteSkill(
            req.params.agent_id,
            req.params.skill_id
        );

        return res.status(204).end();
    }
}