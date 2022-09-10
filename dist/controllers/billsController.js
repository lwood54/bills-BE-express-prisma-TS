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
const createBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance, billCategoryId, dayDue, interestRate, creditLimit, paymentAmount, title, userId, } = req.body;
    if (balance !== 0 && !Boolean(balance)) {
        return res.status(400).json({ error: "Balance is required" });
    }
    if (!Boolean(dayDue)) {
        return res.status(400).json({ error: "Day due is required" });
    }
    if (interestRate !== 0 && !Boolean(interestRate)) {
        return res.status(400).json({ error: "Interest Rate is required" });
    }
    if (!Boolean(creditLimit)) {
        return res.status(400).json({ error: "Credit Limit is required" });
    }
    if (paymentAmount !== 0 && !Boolean(paymentAmount)) {
        return res.status(400).json({ error: "Payment Amount is required" });
    }
    if (!Boolean(title)) {
        return res.status(400).json({ error: "Title is required" });
    }
    if (!Boolean(userId)) {
        return res.status(400).json({ error: "User id is required" });
    }
    if (balance < 0) {
        return res
            .status(400)
            .json({ error: "Balance must be greater than or equal to 0" });
    }
    if (dayDue < 1 || dayDue > 31) {
        return res.status(400).json({ error: "Day due must be between 1 and 31" });
    }
    if (balance > creditLimit) {
        return res
            .status(400)
            .json({ error: "Balance cannot be greater than credit limit" });
    }
    if (paymentAmount < 0) {
        return res
            .status(400)
            .json({ error: "Payment amount must be greater than or equal to 0" });
    }
    const isUserMatch = yield db_prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!isUserMatch) {
        return res.status(404).json({ error: "No user with that id" });
    }
    if (billCategoryId) {
        const isBillCategoryMatch = yield db_prisma_1.default.billCategory.findUnique({
            where: { id: billCategoryId },
        });
        if (!isBillCategoryMatch) {
            return res.status(404).json({ error: "No bill category with that id" });
        }
    }
    try {
        const bill = yield db_prisma_1.default.bill.create({
            data: {
                balance,
                dayDue,
                interestRate,
                creditLimit,
                paymentAmount,
                title,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                billCategory: billCategoryId && {
                    connect: {
                        id: billCategoryId,
                    },
                },
            },
        });
        if (bill) {
            return res.status(200).json(bill);
        }
    }
    catch (error) {
        return res.status(400).json({ error });
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
            return res.status(400).json({ error });
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
        res.status(400).json({ error });
    }
});
exports.getBill = getBill;
// update bill
const updateBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billId = req.params.id;
    const { balance, billCategoryId, dayDue, interestRate, creditLimit, paymentAmount, title, } = req.body;
    if (balance !== 0 && !Boolean(balance)) {
        return res.status(400).json({ error: "Balance is required" });
    }
    if (!Boolean(dayDue)) {
        return res.status(400).json({ error: "Day due is required" });
    }
    if (interestRate !== 0 && !Boolean(interestRate)) {
        return res.status(400).json({ error: "Interest Rate is required" });
    }
    if (!Boolean(creditLimit)) {
        return res.status(400).json({ error: "Credit Limit is required" });
    }
    if (paymentAmount !== 0 && !Boolean(paymentAmount)) {
        return res.status(400).json({ error: "Payment Amount is required" });
    }
    if (!Boolean(title)) {
        return res.status(400).json({ error: "Title is required" });
    }
    if (balance < 0) {
        return res
            .status(400)
            .json({ error: "Balance must be greater than or equal to 0" });
    }
    if (dayDue < 1 || dayDue > 31) {
        return res.status(400).json({ error: "Day due must be between 1 and 31" });
    }
    if (balance > creditLimit) {
        return res
            .status(400)
            .json({ error: "Balance cannot be greater than credit limit" });
    }
    if (paymentAmount < 0) {
        return res
            .status(400)
            .json({ error: "Payment amount must be greater than or equal to 0" });
    }
    if (billCategoryId) {
        const isBillCategoryMatch = yield db_prisma_1.default.billCategory.findUnique({
            where: { id: billCategoryId },
        });
        if (!isBillCategoryMatch) {
            return res.status(404).json({ error: "No bill category with that id" });
        }
    }
    try {
        const bill = yield db_prisma_1.default.bill.update({
            where: {
                id: billId,
            },
            data: {
                balance,
                dayDue,
                interestRate,
                creditLimit,
                paymentAmount,
                title,
                billCategory: billCategoryId && {
                    connect: {
                        id: billCategoryId,
                    },
                },
            },
        });
        if (bill) {
            return res.status(200).json(bill);
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.updateBill = updateBill;
// delete bill
const deleteBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billId = req.params.id;
    try {
        const bill = yield db_prisma_1.default.bill.delete({ where: { id: billId } });
        res.status(200).json(bill);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.deleteBill = deleteBill;
//# sourceMappingURL=billsController.js.map