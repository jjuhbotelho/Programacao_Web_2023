import "express-async-errors";
import express from "express";
import { apiRouter } from "./routers";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRouter);

app.use(errorHandler);

export { app };