import { Exclude, Expose, Type } from "class-transformer";
import { SkillDto } from "../skills/skill-dto";

@Exclude()
export class AgentDto {
    @Expose()
    public id!: number;

    @Expose()
    public name!: string;

    @Expose()
    public current_class!: string;
    
    @Type(() => SkillDto)
    @Expose({ groups: ["skills"] })
    public skills!: SkillDto[];
    
    @Expose()
    public created_at!: Date;

    @Expose()
    public updated_at!: Date;

}