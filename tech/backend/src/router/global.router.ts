import { Router } from "express";
import { router } from "./chatbot.router";

export const globalRouter = Router({ mergeParams: true });

interface HelloWorldReponse {
  message: string;
}
globalRouter.get("/hallo", (req, res) => {
  res.send({ message: "hello world global" } as HelloWorldReponse);
});

globalRouter.use("/", router);
