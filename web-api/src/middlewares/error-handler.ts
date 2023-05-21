import { Request, Response, NextFunction } from "express";
import { ErrorBase } from "../entities/errors/__base__/error-base";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ErrorBase) {
        return res.status(err.httpCode).json({
            error: err.message,
            code: err.constructor.name
        });
    }

    console.log(err);

    return res.status(500).json({
        error: "erro interno",
        code: "InternalError"
    });
}