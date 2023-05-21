import { IsString } from "class-validator";

export class CreateAgentDto {
    @IsString()
    public name!: string;

    @IsString()
    public current_class!: string;
}