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
const runtime_1 = require("@prisma/client/runtime");
const db_prisma_1 = __importDefault(require("../db/db.prisma"));
const createBill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance, dayDue, rate, limit, amount, title, userId } = req.body;
    if (balance !== 0 && !Boolean(balance)) {
        return res.status(400).json({ error: "Balance is required" });
    }
    if (!Boolean(dayDue)) {
        return res.status(400).json({ error: "Day due is required" });
    }
    if (rate !== 0 && !Boolean(rate)) {
        return res.status(400).json({ error: "Interest Rate is required" });
    }
    if (!Boolean(limit)) {
        return res.status(400).json({ error: "Credit Limit is required" });
    }
    if (amount !== 0 && !Boolean(amount)) {
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
    if (balance > limit) {
        return res
            .status(400)
            .json({ error: "Balance cannot be greater than credit limit" });
    }
    if (amount < 0) {
        return res
            .status(400)
            .json({ error: "Payment amount must be greater than or equal to 0" });
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
        if (error instanceof runtime_1.PrismaClientValidationError) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(400).json({ error: "error of unknown type" });
    }
});
exports.createBill = createBill;
// // get all bills by user
// export const getBills = async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   const isUserMatch = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });
//   if (isUserMatch) {
//     try {
//       const bills = await prisma.bill.findMany({ where: { userId } });
//       return res.status(200).json(bills);
//     } catch (error) {
//       return res.status(400).json({ error });
//     }
//   } else {
//     res.status(404).json({ error: "No user matches that id" });
//   }
// };
// // get single bill by user
// export const getBill = async (req: Request, res: Response) => {
//   const billId = req.params.id;
//   try {
//     const bill = await prisma.bill.findUnique({ where: { id: billId } });
//     res.status(200).json(bill);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };
// // update bill
// export const updateBill = async (req: Request, res: Response) => {
//   const billId = req.params.id;
//   const { balance, categoryId, dayDue, rate, limit, amount, title } = req.body;
//   if (balance !== 0 && !Boolean(balance)) {
//     return res.status(400).json({ error: "Balance is required" });
//   }
//   if (!Boolean(dayDue)) {
//     return res.status(400).json({ error: "Day due is required" });
//   }
//   if (rate !== 0 && !Boolean(rate)) {
//     return res.status(400).json({ error: "Interest Rate is required" });
//   }
//   if (!Boolean(limit)) {
//     return res.status(400).json({ error: "Credit Limit is required" });
//   }
//   if (amount !== 0 && !Boolean(amount)) {
//     return res.status(400).json({ error: "Payment Amount is required" });
//   }
//   if (!Boolean(title)) {
//     return res.status(400).json({ error: "Title is required" });
//   }
//   if (balance < 0) {
//     return res
//       .status(400)
//       .json({ error: "Balance must be greater than or equal to 0" });
//   }
//   if (dayDue < 1 || dayDue > 31) {
//     return res.status(400).json({ error: "Day due must be between 1 and 31" });
//   }
//   if (balance > limit) {
//     return res
//       .status(400)
//       .json({ error: "Balance cannot be greater than credit limit" });
//   }
//   if (amount < 0) {
//     return res
//       .status(400)
//       .json({ error: "Payment amount must be greater than or equal to 0" });
//   }
//   if (categoryId) {
//     const isCategoryMatch = await prisma.categories.findUnique({
//       where: { id: categoryId },
//     });
//     if (!isCategoryMatch) {
//       return res.status(404).json({ error: "No bill category with that id" });
//     }
//   }
//   try {
//     const bill = await prisma.bill.update({
//       where: {
//         id: billId,
//       },
//       data: {
//         balance,
//         dayDue,
//         rate,
//         limit,
//         amount,
//         title,
//         category: categoryId && {
//           connect: {
//             id: categoryId,
//           },
//         },
//       },
//     });
//     if (bill) {
//       return res.status(200).json(bill);
//     }
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };
// // delete bill
// export const deleteBill = async (req: Request, res: Response) => {
//   const billId = req.params.id;
//   try {
//     const bill = await prisma.bill.delete({ where: { id: billId } });
//     res.status(200).json(bill);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };
//# sourceMappingURL=billsController.js.map