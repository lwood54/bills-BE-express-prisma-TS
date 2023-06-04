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
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
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
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(403).json({ error: "not authorized" });
    }
    try {
        const categories = yield db_prisma_1.default.category.findMany({
            where: {
                user: { id: userId },
            },
        });
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    if (!categoryId) {
        res.status(400).json({ error: "category not specified" });
    }
    try {
        const category = yield db_prisma_1.default.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        res.status(200).json(category);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: "category title is required" });
    }
    if (!categoryId) {
        res.status(400).json({ error: "category not specified" });
    }
    const isCategoryMatch = yield db_prisma_1.default.category.findUnique({
        where: { id: categoryId },
    });
    if (!isCategoryMatch) {
        return res.status(404).json({ error: "No matching category with that id" });
    }
    try {
        const updatedBill = yield db_prisma_1.default.category.update({
            where: { id: categoryId },
            data: { title },
        });
        res.status(200).json(updatedBill);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    if (!categoryId) {
        res.status(400).json({ error: "id required" });
    }
    const isCategoryMatch = yield db_prisma_1.default.category.findUnique({
        where: { id: categoryId },
    });
    if (!isCategoryMatch) {
        return res.status(404).json({ error: "No matching category with that id" });
    }
    try {
        const deletedCategory = yield db_prisma_1.default.category.delete({
            where: { id: categoryId },
        });
        res.status(200).json(deletedCategory);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map