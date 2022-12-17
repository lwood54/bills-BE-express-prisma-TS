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
exports.createCategory = void 0;
const db_prisma_1 = __importDefault(require("../db/db.prisma"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "user is required" });
    }
    if (!title) {
        return res.status(400).json({ error: "category title is required" });
    }
    try {
        const category = yield db_prisma_1.default.category.create({
            data: {
                title,
                userId,
            },
        });
        res.status(200).json(category);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createCategory = createCategory;
// export const createCategory = async (req: Request, res: Response) => {
//   const { scale, title, userId } = req.body;
// if (!userId) {
//   return res.status(400).json({ error: "user is required" });
// }
// if (!title) {
//   return res.status(400).json({ error: "category title is required" });
// }
// try {
//   const category = await prisma.category.create({
//     data: {
//       scale,
//       title,
//       userId,
//     },
//   });
//   res.status(200).json(category);
// } catch (error) {
//   res.status(400).json({ error });
// }
// };
// export const getCategories = async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   if (!userId) {
//     return res.status(400).json({ error: "user is required" });
//   }
//   try {
//     const billCategories = await prisma.billCategory.findMany({
//       where: { userId },
//     });
//     res.status(200).json(billCategories);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };
// export const updateCategory = async (req: Request, res: Response) => {
//   const billCategoryId = req.params.id;
//   const { scale, title } = req.body;
//   // if (!title) {
//   //   res.status(400).json({ error: "category title is required" });
//   // }
//   if (!billCategoryId) {
//     res.status(400).json({ error: "id required" });
//   }
//   const isBillCategoryMatch = await prisma.billCategory.findUnique({
//     where: { id: billCategoryId },
//   });
//   if (!isBillCategoryMatch) {
//     return res.status(404).json({ error: "No matching category with that id" });
//   }
//   try {
//     const updatedBill = await prisma.billCategory.update({
//       where: { id: billCategoryId },
//       data: { scale, title },
//     });
//     res.status(200).json(updatedBill);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };
// export const deleteCategory = async (req: Request, res: Response) => {
//   const billCategoryId = req.params.id;
//   if (!billCategoryId) {
//     res.status(400).json({ error: "id required" });
//   }
//   const isBillCategoryMatch = await prisma.billCategory.findUnique({
//     where: { id: billCategoryId },
//   });
//   if (!isBillCategoryMatch) {
//     return res.status(404).json({ error: "No matching category with that id" });
//   }
//   try {
//     const deletedBillCategory = await prisma.billCategory.delete({
//       where: { id: billCategoryId },
//     });
//     res.status(200).json(deletedBillCategory);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };
//# sourceMappingURL=categoryController.js.map