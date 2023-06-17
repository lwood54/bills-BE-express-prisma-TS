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
exports.deleteLog = exports.updateLog = exports.getLog = exports.getLogs = exports.createLog = void 0;
const db_prisma_1 = __importDefault(require("../db/db.prisma"));
const createLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, categoryId, createdAt, scale, title } = req.body;
    const userId = req.params.userId;
    if (!userId) {
        return res.status(403).json({ error: "not authorized" });
    }
    if (!title) {
        return res.status(400).json({ error: "log title is required" });
    }
    try {
        const response = yield db_prisma_1.default.log.create({
            data: {
                amount: Number(amount),
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
                createdAt,
                scale,
                title,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @logsController create", error);
        return res.status(500).json({ error: "server error creating log" });
    }
});
exports.createLog = createLog;
const getLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(403).json({ error: "not authorized" });
    }
    try {
        const response = yield db_prisma_1.default.log.findMany({
            where: {
                user: { id: userId },
            },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @logsController getLogs", error);
        return res.status(500).json({ error: "server error getting logs" });
    }
});
exports.getLogs = getLogs;
const getLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logId = req.params.id;
    if (!logId) {
        return res.status(400).json({ error: "no matching log" });
    }
    try {
        const response = yield db_prisma_1.default.log.findUnique({
            where: {
                id: logId,
            },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @logsController getLog", error);
        return res.status(500).json({ error: "server error getting log" });
    }
});
exports.getLog = getLog;
const updateLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logId = req.params.id;
    const { amount, categoryId, createdAt, scale, title } = req.body;
    if (!logId) {
        return res.status(400).json({ error: "log not specified" });
    }
    const isLogMatch = yield db_prisma_1.default.log.findUnique({
        where: { id: logId },
    });
    if (!isLogMatch) {
        return res.status(404).json({ error: "No matching log with that id" });
    }
    try {
        const response = yield db_prisma_1.default.log.update({
            where: { id: logId },
            data: { amount, categoryId, createdAt, scale, title },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @logsController udpateLog", error);
        return res.status(500).json({ error: "server error updating log" });
    }
});
exports.updateLog = updateLog;
const deleteLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logId = req.params.id;
    if (!logId) {
        return res.status(400).json({ error: "id required" });
    }
    const isLogMatch = yield db_prisma_1.default.log.findUnique({
        where: { id: logId },
    });
    if (!isLogMatch) {
        return res.status(404).json({ error: "No matching log with that id" });
    }
    try {
        const response = yield db_prisma_1.default.log.delete({
            where: { id: logId },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @logsController deleteLog", error);
        return res.status(500).json({ error: "server error deleting log" });
    }
});
exports.deleteLog = deleteLog;
//# sourceMappingURL=logsController.js.map