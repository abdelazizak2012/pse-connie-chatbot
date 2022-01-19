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
var googleapis_1 = require("googleapis");
require("dotenv").config();
var calendarIds = [
    {
        name: "Produkt",
        id: "dhqhlbce7oajj7is79bsscc710@group.calendar.google.com",
    },
    { name: "Job", id: "8ocs46knu1el6kjl3j9esecp4c@group.calendar.google.com" },
    {
        name: "Generell",
        id: "rur7v2lhp8260igg33s7r1l0uk@group.calendar.google.com",
    },
];
// Provide the required configuration
var CREDENTIALS = {
    type: "service_account",
    project_id: "pse-chatbot-336911",
    private_key_id: "f2f3c2ab135c07d098a9eb0ef05f73afd191ad22",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCMpKyG+zaWVe9P\nJ/PlblI20FmAIPouf7bNlujbdh90juX+9EIKd00VIYFIb56XmNHjlgtZUtac2j2V\noHF2nqw0vgbzzuRH0LyJ6Ai11CJvGZvAMpAoMUElqDdKqOexF+ogxa1I5tLoE2ki\nRPaK4Yp4n1iK6MC+KsN5DHLcjxMSoLllzzcdqnf2EoKamrViVdppkFYXGNYdAMcn\nqKdvR4aOdasXHLj86aLi0CTYdDQ/XnYs8WiPD6a8rKqpQbI3jZFVV3+icppIYsqW\nV+p1fulYDI2dPW7cw1yO0FCgrOrkcSm9NMw0dYU/VPtcfLn4MoDN/xqhISmkDOnb\nWr3rw/LVAgMBAAECggEAC14EP2z+nTl+W/03F61/kcRsC3Cpj923gm0xTmBBIWxV\nogePbpBJvQy7dIWTAZ6II6HHsoqWY9CO0YZezU8nTM7+ubDDNMZl9VZ5R8BIyoZ9\nFxRvICnU9wxzcEJvvC7vjS0KTlNbq1wQRK+4ES2yrFZNXigllektFIj2n/rPYuis\neZI6ZCc6rDdQc+Uip+cQvpJ+9iExVaWBLrSJHbiZ/K6QJuPXXazelhCG7TmSCGTy\npg7vrQRnSiMv+3wjiJqkWUNCu0sVe3sbgGkGmgowBG3unE0sQPZk25ThUF80fx0V\n1XXqwFOa0jJohVQjyyuCngWzd4MzTUpKayHAxjrtgQKBgQC/Wes7GHrTLPp1+gYx\n34ZC9RW/a2URoc42R7xgXFu6vV9hnCzCq9mYSSpEEM+rGzsf8HVpnTt5j8o1mMYg\nJVzNAmbQTcKKCSkbu320Ik9CjKd5/NUXIy/+6B3GbMD4gploWXDP47W2BjiIGk/8\nUSzMj1KEotUGJWoNU17ADS9jgQKBgQC8KP3Uq1SuUj43xI20bFKehlAnNzUWlvBM\nMhfz0jVx7vPcJNeAvKyU7IEYZkg1e89BtjpBeR/0hcTDyR8icPDntMZjavoPOpn4\nJYAzdlYVTa/ZbAUw5bS0w12iE+bxZWtWcPWpoptq+upajOfDk/k/zudZAK1557ec\n9fmi1zhpVQKBgQCJIDIfjmJutTvjkcIguXNoxmPIYnjyUscJRQ0s7OLbhtw0ggvd\nkfOEW2JLltSLZR9QuywY/JFjgvTAxfOtk7jWPZNaUW9JJllsQ0dI8JFmOo/GLray\nNwgtH0A/My5yqHyxN+9NO3y7reeTOW/6fF2jVk4nON154xQF6qnq7Uf5gQKBgEu0\n7pSgLx1IqBIGOsHqh7+S6TMuKmUhbCQsT6jh3nEuJN5h0HfS8lmlYzfvB4TFgRm+\neWgYlTvsisP/61APQ07nVJ9xzpVMDeFjLVcHeRFvRZ7ksJ4A/plwtf7dpSFhnjOU\nlbOgYopD1QGECkiOBE6hMEKGXEZdbmpwKfZURDVVAoGABV1Crd40bqqDTmOoN37J\nybowxjS3NqmA8Lm6nunAKkFuLUPzJummd05HsSACEG0PuwFjEwpYDHLjp9VS7x1Y\n+cNaq9yRSKFkDdgRtxSRiENPb10yDI0Tq33XY4/ESgEPFBQSYFf/je7BczaeE7Mk\nuindiUnHSbNKYrHgVxHcEjo=\n-----END PRIVATE KEY-----\n",
    client_email: "pse-chatbot@pse-chatbot-336911.iam.gserviceaccount.com",
    client_id: "110106243487053004571",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/pse-chatbot%40pse-chatbot-336911.iam.gserviceaccount.com",
};
// Google calendar API settings
var SCOPES = "https://www.googleapis.com/auth/calendar";
var calendar = googleapis_1.google.calendar({ version: "v3" });
var auth = new googleapis_1.google.auth.JWT(CREDENTIALS.client_email, undefined, CREDENTIALS.private_key, SCOPES);
// Get date-time string for calender
exports.dateTimeForCalander = function (dateParameter, timeParameter) {
    var date = new Date(dateParameter);
    var timeHours = timeParameter.substring(0, 2);
    var timeMin = timeParameter.substring(3, 5);
    date.setHours(parseInt(timeHours));
    date.setMinutes(parseInt(timeMin));
    // Delay in end time is 1
    var endDate = new Date(new Date(date).setHours(date.getHours() + 1));
    return {
        start: date,
        end: endDate,
    };
};
// Insert new event to Google Calendar
exports.insertEvent = function (event, theme) { return __awaiter(void 0, void 0, void 0, function () {
    var calendarId, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                calendarId = calendarIds.find(function (c) { return c.name === theme; });
                return [4 /*yield*/, calendar.events.insert({
                        calendarId: calendarId === null || calendarId === void 0 ? void 0 : calendarId.id,
                        auth: auth,
                        requestBody: event,
                    })];
            case 1:
                response = _a.sent();
                if (response["status"] == 200 && response["statusText"] === "OK") {
                    return [2 /*return*/, 1];
                }
                else {
                    return [2 /*return*/, 0];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log("Error at insertEvent --> " + error_1);
                return [2 /*return*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}); };
