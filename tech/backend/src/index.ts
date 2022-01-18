import express from "express";
import { globalRouter } from "./router/global.router";
import bodyParser from "body-parser";

const port = 4000;

export const startServer = async () => {
  try {
    const app = express();

    app.use(bodyParser.json());
    app.use("/api", globalRouter);

    const server = app.listen(port, () => {
      console.log(`chatbot app listening at http://localhost:${port}`);
    });
    return server;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

startServer();
