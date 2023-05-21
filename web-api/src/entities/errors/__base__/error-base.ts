export class ErrorBase extends Error {
    constructor(
        public readonly httpCode: number,
        message: string
    ) {
        super(message);
    }
}