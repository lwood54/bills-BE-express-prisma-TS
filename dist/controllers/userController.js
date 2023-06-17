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
exports.getUser = exports.userUpdate = exports.signup = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_prisma_1 = __importDefault(require("../db/db.prisma"));
const restricted_1 = require("../middleware/restricted");
const envSecret = process.env.SECRET;
const createToken = (_id) => {
    if (envSecret) {
        // return jwt.sign({ _id }, envSecret, { expiresIn: "3d" });
        return jsonwebtoken_1.default.sign({ _id }, envSecret, { expiresIn: "1m" });
    }
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
    }
    try {
        const response = yield db_prisma_1.default.user.findUnique({ where: { username } });
        if (!response) {
            return res.status(404).json({ error: "No user with that username" });
        }
        if (response) {
            const isMatch = yield bcrypt_1.default.compare(password, response.password);
            if (!isMatch) {
                return res.status(404).json({ error: "Incorrect password" });
            }
            const token = createToken(response.id);
            return res
                .status(200)
                .json({ username, userId: response.id, email: response.email, token });
        }
    }
    catch (error) {
        console.error("ERROR @userController login", error);
        return res.status(500).json({ error: "server error logging in" });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, username, password } = req.body;
    if (!email) {
        return res.status(400).json({ error: "email required" });
    }
    if (!password) {
        return res.status(400).json({ error: "password required" });
    }
    if (!username) {
        return res.status(400).json({ error: "username required" });
    }
    try {
        const response = yield db_prisma_1.default.user.findFirst({
            where: {
                email,
            },
        });
        if (response) {
            return res.status(409).json({ message: "email is already taken" });
        }
    }
    catch (error) {
        console.error("ERROR @email lookup: ", error);
        return res.status(500).json({ error: "server error finding user" });
    }
    try {
        const response = yield db_prisma_1.default.user.findFirst({
            where: {
                username,
            },
        });
        if (response) {
            return res.status(409).json({ message: "username is already taken" });
        }
    }
    catch (error) {
        console.error("ERROR @username lookup: ", error);
        return res.status(500).json({ error: "server error getting user" });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    try {
        const response = yield db_prisma_1.default.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                username,
            },
        });
        if (response) {
            const token = createToken(response.id);
            const { email, firstName, lastName, username } = response;
            return res.status(200).json({
                email,
                firstName,
                lastName,
                username,
                userId: response.id,
                token,
            });
        }
    }
    catch (error) {
        console.error("ERROR @user create: ", error);
        return res.status(500).json({ error: "server error creating user" });
    }
});
exports.signup = signup;
// use restrcited middleware function - don't pass next
const userUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, restricted_1.restricted)(req, res);
    const { email, firstName, lastName, username, password } = req.body;
    const userId = req.params.id;
    const user = yield db_prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        return res.status(404).json({ error: "No user matches the credentials" });
    }
    try {
        const response = yield db_prisma_1.default.user.findFirst({
            where: {
                username,
            },
        });
        if (response) {
            return res.status(409).json({ message: "username is already taken" });
        }
    }
    catch (error) {
        console.error("ERROR @username lookup: ", error);
        return res.status(500).json({ error: "server error getting user" });
    }
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = password && (yield bcrypt_1.default.hash(password, salt));
        const response = yield db_prisma_1.default.user.update({
            where: { id: userId },
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                username,
            },
        });
        if (response) {
            return res.status(200).json({
                username: response.username,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
            });
        }
    }
    catch (error) {
        console.error("ERROR @userController update", error);
        return res.status(400).json({ error: "server error updating user" });
    }
});
exports.userUpdate = userUpdate;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, restricted_1.restricted)(req, res);
    if (!req.payload) {
        return;
    }
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: "user id required" });
    }
    try {
        const response = yield db_prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!response) {
            return res.status(404).json({ error: "User not found." });
        }
        else {
            const { email, username, firstName, lastName } = response;
            return res
                .status(200)
                .json({ email, username, firstName, lastName, userId });
        }
    }
    catch (error) {
        console.error("ERROR @userController getUser", error);
        return res.status(400).json({ error: "server error getting user" });
    }
});
exports.getUser = getUser;
// TODO: add isAdmin boolean to schema and allow admin to delete a user
//# sourceMappingURL=userController.js.map