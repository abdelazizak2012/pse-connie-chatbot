"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var chatbot_controller_1 = require("../controller/chatbot.controller");
exports.router = (0, express_1.Router)({ mergeParams: true });
exports.router.post("/calender/:time/:date/:firstname/:lastname/:email", chatbot_controller_1.insertEventIntoCalender);
exports.router.post("/feedback/:text", chatbot_controller_1.insertFeedback);
exports.router.post("/question/:text/:email", chatbot_controller_1.insertQuestion);
