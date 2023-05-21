import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { InvalidPayload } from "../entities/errors/invalid-payload";

function ValidatorPipeRequest(klass: any, transform: boolean, key: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = new Proxy(descriptor.value, {
            async apply(target: Function, thisArg, argArray) {
                const request = argArray[0];
                const instance = plainToInstance(klass, request[key]);
                const errors = await validate(instance);
                
                if (errors.length > 0) {
                    throw new InvalidPayload();
                }

                if (transform) {
                    request[key] = instance;
                }

                return target.apply(thisArg, argArray);
            },
        });
    }
}

export function ValidatorPipeBody<T extends { new(): any }>(klass: T, transform: boolean = true) {
    return ValidatorPipeRequest(klass, transform, "body");
}

export function ValidatorPipeParams<T extends { new(): any }>(klass: T, transform: boolean = true) {
    return ValidatorPipeRequest(klass, transform, "params");
}