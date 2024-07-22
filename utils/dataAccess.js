"use strict";
// src/utils/dataAccess.ts
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
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("./appError"));
class DataAccess {
    constructor() {
        // Private constructor to prevent direct instantiation
    }
    static getInstance() {
        if (!DataAccess.instance) {
            DataAccess.instance = new DataAccess();
        }
        return DataAccess.instance;
    }
    getModel(modelName) {
        return mongoose_1.default.model(modelName);
    }
    saveDocument(document, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!document || typeof document.save !== 'function') {
                throw new appError_1.default('Invalid document or document does not have a save method', 400);
            }
            try {
                const savedDocument = yield document.save(options);
                return savedDocument;
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new appError_1.default(`Failed to save the document. Error: ${errorMessage}`, 500);
            }
        });
    }
    create(modelName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            const document = yield Model.create(data);
            return document;
        });
    }
    deleteById(modelName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            const document = yield Model.findByIdAndDelete(id);
            if (!document) {
                throw new appError_1.default(`No document of ${modelName} found with that ID`, 404);
            }
        });
    }
    exists(modelName, conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            const result = yield Model.exists(conditions);
            return Boolean(result);
        });
    }
    findById(modelName, id, populateOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            let query = Model.findById(id);
            if (populateOptions) {
                query = query.populate(populateOptions);
            }
            const document = yield query.exec();
            if (!document) {
                throw new appError_1.default(`No document of ${modelName} found with that ID`, 404);
            }
            return document;
        });
    }
    findOneByConditions(modelName, conditions, projection = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            const query = Model.findOne(conditions, projection, options);
            if (options.lean) {
                query.lean();
            }
            const document = yield query.exec();
            return document;
        });
    }
    findByConditions(modelName, conditions = {}, projection = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            const documents = yield Model.find(conditions, projection, options).exec();
            return documents;
        });
    }
    updateById(modelName, id, updateData, options = { new: true, runValidators: true, session: undefined }) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            const document = yield Model.findByIdAndUpdate(id, updateData, options);
            if (!document) {
                throw new appError_1.default(`No document of ${modelName} found with that ID`, 404);
            }
            return document;
        });
    }
    updateOne(modelName, filter, updateData, options = { new: true, runValidators: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            const updatedDocument = yield Model.findOneAndUpdate(filter, updateData, options);
            if (!updatedDocument) {
                throw new appError_1.default('No document found with the provided filter', 404);
            }
            return updatedDocument;
        });
    }
    updateMany(modelName, filter, updateData, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = this.getModel(modelName);
            const result = yield Model.updateMany(filter, updateData, options);
            return result;
        });
    }
}
// Export a singleton instance of DataAccess
exports.default = DataAccess.getInstance();
