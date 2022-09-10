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
exports.deleteBillCategory = exports.updateBillCategory = exports.getBillCategories = exports.createBillCategory = void 0;
const db_prisma_1 = __importDefault(require("../db/db.prisma"));
const createBillCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { scale, title, userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "user is required" });
    }
    if (!title) {
        return res.status(400).json({ error: "category title is required" });
    }
    try {
        const category = yield db_prisma_1.default.billCategory.create({
            data: {
                scale,
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
exports.createBillCategory = createBillCategory;
const getBillCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: "user is required" });
    }
    try {
        const billCategories = yield db_prisma_1.default.billCategory.findMany({
            where: { userId },
        });
        res.status(200).json(billCategories);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.getBillCategories = getBillCategories;
const updateBillCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billCategoryId = req.params.id;
    const { scale, title } = req.body;
    // if (!title) {
    //   res.status(400).json({ error: "category title is required" });
    // }
    if (!billCategoryId) {
        res.status(400).json({ error: "id required" });
    }
    const isBillCategoryMatch = yield db_prisma_1.default.billCategory.findUnique({
        where: { id: billCategoryId },
    });
    if (!isBillCategoryMatch) {
        return res.status(404).json({ error: "No matching category with that id" });
    }
    try {
        const updatedBill = yield db_prisma_1.default.billCategory.update({
            where: { id: billCategoryId },
            data: { scale, title },
        });
        res.status(200).json(updatedBill);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.updateBillCategory = updateBillCategory;
const deleteBillCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const billCategoryId = req.params.id;
    if (!billCategoryId) {
        res.status(400).json({ error: "id required" });
    }
    const isBillCategoryMatch = yield db_prisma_1.default.billCategory.findUnique({
        where: { id: billCategoryId },
    });
    if (!isBillCategoryMatch) {
        return res.status(404).json({ error: "No matching category with that id" });
    }
    try {
        const deletedBillCategory = yield db_prisma_1.default.billCategory.delete({
            where: { id: billCategoryId },
        });
        res.status(200).json(deletedBillCategory);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.deleteBillCategory = deleteBillCategory;
//# sourceMappingURL=billCategoryController.js.map