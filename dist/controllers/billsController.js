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
exports.deleteBill = exports.updateBill = exports.getBill = exports.getBills = exports.createBill = void 0;
const db_prisma_1 = __importDefault(require("../db/db.prisma"));
const validation_1 = require("../utilties/validation");
const createBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance, dayDue, rate, limit, amount, title, userId } = req.body;
    const validation = (0, validation_1.billValidation)("create", balance, dayDue, rate, limit, amount, title);
    if (validation !== "valid") {
        return res.status(400).json({ error: validation });
    }
    const isUserMatch = yield db_prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!isUserMatch) {
        return res.status(404).json({ error: "No user with that id" });
    }
    try {
        const bill = yield db_prisma_1.default.bill.create({
            data: {
                balance,
                dayDue,
                rate,
                limit,
                amount,
                title,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        if (bill) {
            return res.status(200).json(bill);
        }
    }
    catch (error) {
        return res
            .status(400)
            .json({ error: (0, validation_1.getErrorResponse)(error, "createBill") });
    }
});
exports.createBill = createBill;
// get all bills by user
const getBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const isUserMatch = yield db_prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (isUserMatch) {
        try {
            const bills = yield db_prisma_1.default.bill.findMany({ where: { userId } });
            return res.status(200).json(bills);
        }
        catch (error) {
            return res
                .status(400)
                .json({ error: (0, validation_1.getErrorResponse)(error, "getBills") });
        }
    }
    else {
        res.status(404).json({ error: "No user matches that id" });
    }
});
exports.getBills = getBills;
// get single bill by user
const getBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billId = req.params.id;
    try {
        const bill = yield db_prisma_1.default.bill.findUnique({ where: { id: billId } });
        res.status(200).json(bill);
    }
    catch (error) {
        return res.status(400).json({ error: (0, validation_1.getErrorResponse)(error, "getBill") });
    }
});
exports.getBill = getBill;
// update bill
const updateBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billId = req.params.id;
    const { balance, dayDue, rate, limit, amount, title } = req.body;
    const validation = (0, validation_1.billValidation)("update", balance, dayDue, rate, limit, amount, title);
    if (validation !== "valid") {
        return res.status(400).json({ error: validation });
    }
    const billMatch = yield db_prisma_1.default.bill.findUnique({
        where: {
            id: billId,
        },
    });
    if (!billMatch) {
        return res.status(404).json({ error: "unable to find bill" });
    }
    try {
        const bill = yield db_prisma_1.default.bill.update({
            where: {
                id: billId,
            },
            data: {
                balance,
                dayDue,
                rate,
                limit,
                amount,
                title,
            },
        });
        if (bill) {
            return res.status(200).json(bill);
        }
    }
    catch (error) {
        return res
            .status(400)
            .json({ error: (0, validation_1.getErrorResponse)(error, "updateBill") });
    }
});
exports.updateBill = updateBill;
// delete bill
const deleteBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billId = req.params.id;
    if (!billId) {
        return res.status(400).json({ error: "no bill id provided" });
    }
    const billMatch = yield db_prisma_1.default.bill.findUnique({
        where: {
            id: billId,
        },
    });
    if (!billMatch) {
        return res.status(404).json({ error: "unable to find bill" });
    }
    try {
        const bill = yield db_prisma_1.default.bill.delete({ where: { id: billId } });
        return res.status(200).json(bill);
    }
    catch (error) {
        return res
            .status(400)
            .json({ error: (0, validation_1.getErrorResponse)(error, "deleteBill") });
    }
});
exports.deleteBill = deleteBill;
//# sourceMappingURL=billsController.js.map