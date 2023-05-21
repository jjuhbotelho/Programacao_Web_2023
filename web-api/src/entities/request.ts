import { 
    Request as ExpressRequest,
    Response as ExpressResponse
} from "express";

export type Request<B = never, P = never> = ExpressRequest<P, any, B>;
export type Response = ExpressResponse;