import { ErrorBase } from "./__base__/error-base";

export class AgentNotFound extends ErrorBase {
    constructor() {
        super(404, "não foi possível encontrar um agente correspondente");
    }
}