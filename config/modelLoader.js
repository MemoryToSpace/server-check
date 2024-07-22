"use strict";
// src/config/modelLoader.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loadModels = (relativePath = '../models') => {
    const modelsPath = path_1.default.join(__dirname, relativePath);
    fs_1.default.readdirSync(modelsPath).forEach((file) => {
        if (path_1.default.extname(file) === '.js' || path_1.default.extname(file) === '.ts') {
            require(path_1.default.join(modelsPath, file));
        }
    });
};
exports.default = loadModels;
