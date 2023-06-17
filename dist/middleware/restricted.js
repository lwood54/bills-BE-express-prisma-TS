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
    let hasError = false;
    if (!authToken || !secret) {
        console.error("restricted - missing authToken or secret");
        return res.status(401).json({ error: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(authToken, secret, (err, payload) => {
        if (err) {
            console.error("restricted - error with verification", err);
            hasError = true;
            return res.status(401).json({ error: "Unauthorized - expired token" });
        }
        req.payload = payload;
    });
    if (hasError) {
        return;
    }
    if (next) {
        next();
    }
};
exports.restricted = restricted;
//# sourceMappingURL=restricted.js.map