import { Request, Response } from "express";
import { JsxEmit } from "typescript";
import { dateTimeForCalander, insertEvent } from "../googleApi";
const fs = require("fs");
import { v4 as uuidv4 } from 'uuid';
export const insertEventIntoCalender = async (req: Request, res: Response) => {
  const { time, date, firstname, lastname, email, theme, text } = req.params;

  let dateTime = dateTimeForCalander(date, time);

  // Event for Google Calendar
  let event = {
    summary: `Termin mit Herr/Frau ${lastname} ${firstname}`,
    description: `
    Email Adresse: ${email}
    Thema: ${theme}
    Beschreibung: ${text}
    `,
    start: {
      dateTime: dateTime["start"],
      timeZone: "Europe/Berlin",
    },
    end: {
      dateTime: dateTime["end"],
      timeZone: "Europe/Berlin",
    },
  };

  const status = await insertEvent(event, theme);

  try {
    res.send({
      data: status ? "202" : "404",
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const insertFeedback = async (req: Request, res: Response) => {
  const text = req.params.text;

  fs.writeFile(
    "test.json",
    JSON.stringify({
      feedback: text,
    }),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  try {
    res.send({
      data: "202",
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const insertQuestion = async (req: Request, res: Response) => {
  const { text, email } = req.params;

  fs.writeFile(
    "question.json",
    JSON.stringify({
      question: text,
      email: email,
    }),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  try {
    res.send({
      data: "202",
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const handleChat = async (req: Request, res: Response) => {
  const {chat} = req.body;
  const uuid = uuidv4();

  fs.writeFile(
    `${uuid}-chat.json`,
    JSON.stringify({
      chat: chat
    }),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  try {
    res.send({
      data: "202",
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};
