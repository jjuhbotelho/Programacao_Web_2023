import { ErrorBase } from "./__base__/error-base";

export class AgentAlreadyExists extends ErrorBase {
    constructor() {
        super(400, "já existe um agente cadastrado com esse nome");
    }
}