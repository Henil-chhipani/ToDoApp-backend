import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true}
))

app.use(express.json())

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

import router from "./routes/tasks.routes.js";

app.use("/api/v1/tasks", router)

export { app }