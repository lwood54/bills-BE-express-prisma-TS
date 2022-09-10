"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restricted = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const restricted = (req, res, next) => {
    var _a;
    const authToken = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const secret = process.env.SECRET;
    if (!authToken || !secret) {
        return res.status(400).json({ error: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(authToken, secret, (err, payload) => {
        if (err) {
            return res.status(400).json({ error: "Unauthorized" });
        }
        req.payload = payload;
    });
    next();
};
exports.restricted = restricted;
//# sourceMappingURL=restricted.js.map