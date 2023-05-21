import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { FindAgentDto } from "../agent/find-agent-dto";

export class FindSkillDto extends FindAgentDto {
    @IsNumber()
    @Transform(params => parseInt(params.value, 10))
    public skill_id!: number;
}