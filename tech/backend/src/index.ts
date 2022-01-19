import express from "express";
import { globalRouter } from "./router/global.router";
import * as bodyParser from "body-parser";
const app = express();
const http = require("http");
const server = http.createServer(app);

const port = 4000;

export const startServer = async () => {
  try {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use(bodyParser.json());
    app.use("/api", globalRouter);

    server.listen(port, () => {
      console.log(`chatbot app listening at http://localhost:${port}`);
    });
    return server;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

startServer();
