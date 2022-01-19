"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var googleApi_1 = require("../googleApi");
var fs = require("fs");
var uuid_1 = require("uuid");
exports.insertEventIntoCalender = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, time, date, firstname, lastname, email, theme, text, dateTime, event, status;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, time = _a.time, date = _a.date, firstname = _a.firstname, lastname = _a.lastname, email = _a.email, theme = _a.theme, text = _a.text;
                dateTime = googleApi_1.dateTimeForCalander(date, time);
                event = {
                    summary: "Termin mit Herr/Frau " + lastname + " " + firstname,
                    description: "\n    Email Adresse: " + email + "\n    Thema: " + theme + "\n    Beschreibung: " + text + "\n    ",
                    start: {
                        dateTime: dateTime["start"],
                        timeZone: "Europe/Berlin",
                    },
                    end: {
                        dateTime: dateTime["end"],
                        timeZone: "Europe/Berlin",
                    },
                };
                return [4 /*yield*/, googleApi_1.insertEvent(event, theme)];
            case 1:
                status = _b.sent();
                try {
                    res.send({
                        data: status ? "202" : "404",
                    });
                }
                catch (error) {
                    res.status(404).send({
                        status: "not_found",
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.insertFeedback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text;
    return __generator(this, function (_a) {
        text = req.params.text;
        fs.writeFile("test.json", JSON.stringify({
            feedback: text,
        }), function (err) {
            if (err) {
                console.log(err);
            }
        });
        try {
            res.send({
                data: "202",
            });
        }
        catch (error) {
            res.status(404).send({
                status: "not_found",
            });
        }
        return [2 /*return*/];
    });
}); };
exports.insertQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, text, email;
    return __generator(this, function (_b) {
        _a = req.params, text = _a.text, email = _a.email;
        fs.writeFile("question.json", JSON.stringify({
            question: text,
            email: email,
        }), function (err) {
            if (err) {
                console.log(err);
            }
        });
        try {
            res.send({
                data: "202",
            });
        }
        catch (error) {
            res.status(404).send({
                status: "not_found",
            });
        }
        return [2 /*return*/];
    });
}); };
exports.handleChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chat, uuid;
    return __generator(this, function (_a) {
        chat = req.body.chat;
        uuid = uuid_1.v4();
        fs.writeFile(uuid + "-chat.json", JSON.stringify({
            chat: chat
        }), function (err) {
            if (err) {
                console.log(err);
            }
        });
        try {
            res.send({
                data: "202",
            });
        }
        catch (error) {
            res.status(404).send({
                status: "not_found",
            });
        }
        return [2 /*return*/];
    });
}); };
