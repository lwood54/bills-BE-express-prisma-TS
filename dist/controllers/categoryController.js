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
    const { title } = req.body;
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: "user is required" });
    }
    if (!title) {
        return res.status(400).json({ error: "category title is required" });
    }
    try {
        const response = yield db_prisma_1.default.category.create({
            data: {
                title,
                userId,
            },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @categoryController create", error);
        return res.status(500).json({ error: "failed attempt creating category" });
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    // return { message: "list list list" };
    if (!userId) {
        return res.status(403).json({ error: "not authorized" });
    }
    try {
        const response = yield db_prisma_1.default.category.findMany({
            where: {
                user: { id: userId },
            },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @categoryController getCategories", error);
        return res
            .status(500)
            .json({ error: "failed attempt to fetch categories" });
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).json({ error: "category not specified" });
    }
    try {
        const response = yield db_prisma_1.default.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @categoryController getCategory", error);
        return res
            .status(500)
            .json({ error: "server error when getting categories" });
    }
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "category title is required" });
    }
    if (!categoryId) {
        return res.status(400).json({ error: "category not specified" });
    }
    const isCategoryMatch = yield db_prisma_1.default.category.findUnique({
        where: { id: categoryId },
    });
    if (!isCategoryMatch) {
        return res.status(404).json({ error: "No matching category with that id" });
    }
    try {
        const response = yield db_prisma_1.default.category.update({
            where: { id: categoryId },
            data: { title },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @categoryController udpateCategory", error);
        return res.status(500).json({ error: "server error updating bill" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).json({ error: "id required" });
    }
    const isCategoryMatch = yield db_prisma_1.default.category.findUnique({
        where: { id: categoryId },
    });
    if (!isCategoryMatch) {
        return res.status(404).json({ error: "No matching category with that id" });
    }
    try {
        const response = yield db_prisma_1.default.category.delete({
            where: { id: categoryId },
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("ERROR @categoryController deleteCategory", error);
        return res.status(500).json({ error: "server error deleting category" });
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map