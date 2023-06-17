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
    const { balance, dayDue, rate, limit, amount, title } = req.body;
    const userId = req.params.userId;
    const validation = (0, validation_1.billValidation)("create", balance, dayDue, rate, limit, amount, title);
    if (validation !== "valid") {
        return res.status(400).json({ error: validation });
    }
    try {
        const response = yield db_prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!response) {
            return res.status(404).json({ error: "No user with that id" });
        }
    }
    catch (error) {
        console.error("ERROR @billsController createBill", error);
        return res.status(400).json({ error: "server error getting user" });
    }
    try {
        const response = yield db_prisma_1.default.bill.create({
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
        if (response) {
            return res.status(200).json(response);
        }
    }
    catch (error) {
        console.error("ERROR @billsController create", error);
        return res.status(400).json({ error: "error creating bill" });
    }
});
exports.createBill = createBill;
// get all bills by user
const getBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const response = yield db_prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!response) {
            return res.status(400).json({ error: "unable to find user" });
        }
    }
    catch (error) { }
    try {
        const bills = yield db_prisma_1.default.bill.findMany({ where: { userId } });
        return res.status(200).json(bills);
    }
    catch (error) {
        console.error("ERROR @billsController getBills", error);
        return res.status(400).json({ error: "error getting bills" });
    }
});
exports.getBills = getBills;
// get single bill
const getBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billId = req.params.id;
    try {
        const bill = yield db_prisma_1.default.bill.findUnique({ where: { id: billId } });
        return res.status(200).json(bill);
    }
    catch (error) {
        console.error("ERROR @billsController getBill", error);
        return res.status(400).json({ error: "error getting bill" });
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
    try {
        const response = yield db_prisma_1.default.bill.findUnique({
            where: {
                id: billId,
            },
        });
        if (!response) {
            return res.status(404).json({ error: "unable to find bill" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "server error finding bill" });
    }
    try {
        const response = yield db_prisma_1.default.bill.update({
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
        if (response) {
            return res.status(200).json(response);
        }
    }
    catch (error) {
        console.error("ERROR @billsController updateBill", error);
        return res.status(400).json({ error: "error updating bill" });
    }
});
exports.updateBill = updateBill;
// delete bill
const deleteBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billId = req.params.id;
    if (!billId) {
        return res.status(400).json({ error: "no bill id provided" });
    }
    const response = yield db_prisma_1.default.bill.findUnique({
        where: {
            id: billId,
        },
    });
    if (!response) {
        return res.status(404).json({ error: "unable to find bill" });
    }
    try {
        const response = yield db_prisma_1.default.bill.delete({ where: { id: billId } });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @billsController deleteBill", error);
        return res.status(400).json({ error: "error deleting bill" });
    }
});
exports.deleteBill = deleteBill;
//# sourceMappingURL=billsController.js.map