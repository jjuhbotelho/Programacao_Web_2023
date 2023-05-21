import { ErrorBase } from "./__base__/error-base";

export class ClassNotFound extends ErrorBase {
    constructor() {
        super(404, "não foi possível encontrar uma classe correspondente");
    }
}