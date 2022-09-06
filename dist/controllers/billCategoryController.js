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
    try {
        const category = yield db_prisma_1.default.billCategory.create({
            data: {
                title: "household",
            },
        });
        res.status(200).json(category);
    }
    catch (error) {
        res.status(400).json({ error });
    }
    // res.json({ message: "creating bill category" });
});
exports.createBillCategory = createBillCategory;
const getBillCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getBillCategories = getBillCategories;
const updateBillCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateBillCategory = updateBillCategory;
const deleteBillCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteBillCategory = deleteBillCategory;
//# sourceMappingURL=billCategoryController.js.map