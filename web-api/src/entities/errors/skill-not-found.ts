import { ErrorBase } from "./__base__/error-base";

export class SkillNotFound extends ErrorBase {
    constructor() {
        super(404, "não foi possível encontrar uma skill correspondente");
    }
}