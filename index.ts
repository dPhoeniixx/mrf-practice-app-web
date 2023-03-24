import dotenv from "dotenv";
dotenv.config();

import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";

import morgan from "morgan";
import cors from "cors";
import https from "https";
import fs from "fs";
import { connectDB } from "./src/configs/db";
import apiRouter from "./src/routes/api";

// Constants
const HTTP_PORT   = process.env.PORT || 8080;
const HTTPS_PORT  = process.env.PORT || 8443;

// Connect to database
connectDB();

// App
const app: Express = express();
app.use(cors());
// parse request bodies (req.body)
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Serving static assets
app.use(express.static("public"));
// logger
app.use(morgan("combined"));


// API Routes
app.get("/", (req: Request, res: Response) => {
  const doc = `GET /       - Documentation
GET /api/v1 - API v1 documentation`;
  res.status(200).set("Content-Type", "text/plain").send(doc);
});

app.use("/api/v1/", apiRouter);

/* Error handler middleware */
app.use(((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
}) as ErrorRequestHandler);

const key = fs.readFileSync('src/selfsigned.key');
const cert = fs.readFileSync('src/selfsigned.crt');
const options = {
  key: key,
  cert: cert
};

const server = https.createServer(options, app);

app.listen(HTTP_PORT, () => {
  console.log(`⚡️[server]: Plain Server is running at ${HTTP_PORT}`);
});

server.listen(HTTPS_PORT, () => {
  console.log(`⚡️[server]: SSL Server is running at ${HTTP_PORT}`);
});

export default server;
