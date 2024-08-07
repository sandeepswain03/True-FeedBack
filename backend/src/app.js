import express from "express";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import logger from "./utils/logger.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);
const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3]
                };
                const coloredLogObject = {
                    method: chalk.red.bold(logObject.method),
                    url: chalk.blue.bold(logObject.url),
                    status: chalk.yellow.bold(logObject.status),
                    responseTime: chalk.green.bold(logObject.responseTime)
                };
                logger.info(
                    `Method: ${coloredLogObject.method}, URL: ${coloredLogObject.url}, Status: ${coloredLogObject.status}, Response Time: ${coloredLogObject.responseTime}`
                );
            }
        }
    })
);
//common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

export default app;
