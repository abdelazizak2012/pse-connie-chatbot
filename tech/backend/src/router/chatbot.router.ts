import { Router } from "express";
import {
  insertEventIntoCalender,
  insertFeedback,
  insertQuestion,
} from "../controller/chatbot.controller";

export const router = Router({ mergeParams: true });

router.post(
  "/calender/:time/:date/:firstname/:lastname/:email",
  insertEventIntoCalender
);

router.post("/feedback/:text", insertFeedback);
router.post("/question/:text/:email", insertQuestion);
