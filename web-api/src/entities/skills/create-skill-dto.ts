import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateSkillDto {
    @IsString()
    public name!: string;

    @IsString()
    public keybind!: string;

    @IsInt()
    @IsOptional()
    public cost?: number;
}