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
        return jsonwebtoken_1.default.sign({ _id }, envSecret, { expiresIn: "3d" });
    }
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // console.log({ username, password });
    if (!username || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
    }
    const user = yield db_prisma_1.default.user.findUnique({ where: { username } });
    if (!user) {
        return res.status(404).json({ error: "No user with that username" });
    }
    if (user) {
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ error: "Incorrect password" });
        }
        const token = createToken(user.id);
        res
            .status(200)
            .json({ username, userId: user.id, email: user.email, token });
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
        return res.status(400).json({ error: "username" });
    }
    const isEmailTaken = yield db_prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (isEmailTaken) {
        return res.status(400).json({ message: "email is already taken" });
    }
    const isUsernameTaken = yield db_prisma_1.default.user.findFirst({
        where: {
            username,
        },
    });
    if (isUsernameTaken) {
        return res.status(400).json({ message: "username is already taken" });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    try {
        const user = yield db_prisma_1.default.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                username,
            },
        });
        const token = createToken(user.id);
        if (user) {
            const { email, firstName, lastName, username } = user;
            return res
                .status(200)
                .json({ email, firstName, lastName, username, userId: user.id, token });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.signup = signup;
// use restrcited middleware function - don't pass next
const userUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, restricted_1.restricted)(req, res);
    const { email, firstName, lastName, username, password } = req.body;
    const userId = req.params.id;
    // console.log("USER ID ???? ____------->", userId);
    const user = yield db_prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        return res.status(404).json({ error: "No user matches the credentials" });
    }
    const isUsernameTaken = yield db_prisma_1.default.user.findFirst({
        where: {
            username,
        },
    });
    if (isUsernameTaken) {
        return res.status(400).json({ message: "username is already taken" });
    }
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = password && (yield bcrypt_1.default.hash(password, salt));
        const updatedUser = yield db_prisma_1.default.user.update({
            where: { id: userId },
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                username,
            },
        });
        if (updatedUser) {
            return res.json(200).json({ username: user.username });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
    // if (user) {
    //   try {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // const updatedUser = await prisma.user.update({
    //   where: { id: userId },
    //   data: {
    //     email,
    //     firstName,
    //     lastName,
    //     password: hashedPassword,
    //     username,
    //   },
    // });
    // if (updatedUser) {
    //   return res.json(200).json({ username: user.username });
    // }
    //   } catch (error) {
    //     return res.json(400).json({ error: "something went wrong" });
    //   }
    // }
});
exports.userUpdate = userUpdate;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, restricted_1.restricted)(req, res);
    const userId = req.params.id;
    // console.log({ userId });
    if (!userId) {
        return res.status(400).json({ error: "user id required" });
    }
    try {
        const user = yield db_prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        else {
            const { email, username, firstName, lastName } = user;
            return res
                .status(200)
                .json({ email, username, firstName, lastName, userId });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.getUser = getUser;
//# sourceMappingURL=userController.js.map