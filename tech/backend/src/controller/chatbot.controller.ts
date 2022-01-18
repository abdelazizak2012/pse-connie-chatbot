import { Request, Response } from "express";
import { dateTimeForCalander, insertEvent } from "../googleApi";
const fs = require("fs");

export const insertEventIntoCalender = async (req: Request, res: Response) => {
  const { time, date, firstname, lastname, email } = req.params;

  let dateTime = dateTimeForCalander(date, time);

  // Event for Google Calendar
  let event = {
    summary: `Termin mit Herr/Frau ${lastname} ${firstname}`,
    description: `
    Email Adresse: ${email}
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

  const status = await insertEvent(event);

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
    "test.txt",
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
    "question.txt",
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
