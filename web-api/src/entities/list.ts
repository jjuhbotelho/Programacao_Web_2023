export class List<T> {
    public count: number;

    constructor(public readonly data: T[]) {
        this.count = data.length;
    }
}