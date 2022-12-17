"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// get user route
router.get("/user/:id", userController_1.getUser);
// login route
router.post("/login", userController_1.login);
// signup route
router.post("/signup", userController_1.signup);
// update route
router.patch("/user/:id", userController_1.userUpdate);
exports.default = router;
//# sourceMappingURL=user.js.map