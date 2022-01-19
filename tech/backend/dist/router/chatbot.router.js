"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var chatbot_controller_1 = require("../controller/chatbot.controller");
exports.router = express_1.Router({ mergeParams: true });
exports.router.post("/calender/:time/:date/:firstname/:lastname/:email/:theme/:text", chatbot_controller_1.insertEventIntoCalender);
exports.router.post("/feedback/:text", chatbot_controller_1.insertFeedback);
exports.router.post("/question/:text/:email", chatbot_controller_1.insertQuestion);
exports.router.post("/chat/", chatbot_controller_1.handleChat);
