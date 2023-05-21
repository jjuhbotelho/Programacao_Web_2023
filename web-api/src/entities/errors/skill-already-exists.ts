import { ErrorBase } from "./__base__/error-base";

export class SkillAlreadyExists extends ErrorBase {
    constructor() {
        super(400, "já existe uma skill cadastrada com esse nome para esse agente");
    }
}