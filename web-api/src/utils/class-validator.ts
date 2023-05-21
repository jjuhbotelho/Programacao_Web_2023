import { ClassNotFound } from "../entities/errors/class-not-found";

export function agentClassIsValid(agentClass: string) {
    const classes = ["controlador", "duelista", "iniciador", "sentinela"];
    if (!classes.includes(agentClass)) {
        throw new ClassNotFound();
    }
}