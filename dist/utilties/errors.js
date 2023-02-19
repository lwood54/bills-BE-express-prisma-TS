"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorResponse = void 0;
const runtime_1 = require("@prisma/client/runtime");
const getErrorResponse = (error, prefix, fallbackErrorMessage = "unkown server error") => {
    if (error instanceof runtime_1.PrismaClientValidationError) {
        return error.message;
    }
    return `${prefix}: ${fallbackErrorMessage}`;
};
exports.getErrorResponse = getErrorResponse;
//# sourceMappingURL=errors.js.map