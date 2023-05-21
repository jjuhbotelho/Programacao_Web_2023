import { ErrorBase } from "./__base__/error-base";

export class InvalidPayload extends ErrorBase {
    constructor() {
        super(400, "um dos campos informados não está correto");
    }
}