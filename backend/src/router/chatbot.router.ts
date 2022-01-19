import { Router } from "express";
import {
  handleChat,
  insertEventIntoCalender,
  insertFeedback,
  insertQuestion,
} from "../controller/chatbot.controller";

export const router = Router({ mergeParams: true });

router.post(
  "/calender/:time/:date/:firstname/:lastname/:email/:theme/:text",
  insertEventIntoCalender
);

router.post("/feedback/:text", insertFeedback);
router.post("/question/:text/:email", insertQuestion);
router.post("/chat/", handleChat);
