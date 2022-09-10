"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, _res, next) => {
    console.log({ PATH: req.path, METHOD: req.method });
    next(); // must do with middleware to advance process
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map