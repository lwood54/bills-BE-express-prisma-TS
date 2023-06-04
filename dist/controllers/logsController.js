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
exports.createLog = void 0;
const db_prisma_1 = __importDefault(require("../db/db.prisma"));
const createLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, categoryId, scale, title, userId } = req.body;
    if (!userId) {
        return res.status(403).json({ error: "not authorized" });
    }
    if (!title) {
        return res.status(400).json({ error: "log title is required" });
    }
    try {
        const newLog = yield db_prisma_1.default.log.create({
            data: {
                amount: Number(amount),
                title,
                scale,
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        res.status(200).json({ data: newLog });
    }
    catch (error) {
        console.error("ERROR @logsController create", error);
        res.status(500).json({ error });
    }
});
exports.createLog = createLog;
//# sourceMappingURL=logsController.js.map