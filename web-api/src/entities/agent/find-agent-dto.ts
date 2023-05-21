import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class FindAgentDto {
    @IsNumber()
    @Transform(params => parseInt(params.value, 10))
    public agent_id!: number;
}