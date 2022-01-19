"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var chatbot_router_1 = require("./chatbot.router");
exports.globalRouter = express_1.Router({ mergeParams: true });
exports.globalRouter.get("/hallo", function (req, res) {
    res.send({ message: "hello world global" });
});
exports.globalRouter.use("/", chatbot_router_1.router);
