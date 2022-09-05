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
exports.createBill = void 0;
const db_prisma_1 = __importDefault(require("../db/db.prisma"));
const createBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance, dayDue, interestRate, creditLimit, paymentAmount, title, userId, } = req.body;
    if (typeof balance === "undefined" ||
        typeof dayDue === "undefined" ||
        typeof interestRate === "undefined" ||
        typeof creditLimit === "undefined" ||
        typeof paymentAmount === "undefined" ||
        typeof title === "undefined") {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (balance < 0) {
        return res.status(400).json({ error: "Balance must be positive or 0" });
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
            },
        });
        if (bill) {
            return res.status(200).json({ bill });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.createBill = createBill;
// get all bills by user
// get single bill by user
// export const getBill = async (req: Request, res: Response) => {
// };
// update bill
// delete bill
//# sourceMappingURL=billController.js.map