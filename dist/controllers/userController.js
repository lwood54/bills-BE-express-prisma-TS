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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = exports.loginUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envSecret = process.env.SECRET;
const createToken = (_id) => {
    if (envSecret) {
        return jsonwebtoken_1.default.sign({ _id }, envSecret, { expiresIn: "3d" });
    }
};
const prisma = new client_1.PrismaClient();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
    }
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(404).json({ error: "No user with that email" });
    }
    if (user) {
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ error: "Incorrect password" });
        }
        const token = createToken(user.id);
        res.status(200).json({ email, token });
    }
});
exports.loginUser = loginUser;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
    }
    const isUsed = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (isUsed) {
        return res.status(400).json({ message: "email is already in use" });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    try {
        const user = yield prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
            },
        });
        const token = createToken(user.id);
        if (user) {
            return res.status(200).json({ user, token });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.signupUser = signupUser;
//# sourceMappingURL=userController.js.map