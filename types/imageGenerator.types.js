"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateImageRequestSchema = void 0;
// src/types/imageGenerator.types.ts
const zod_1 = require("zod");
exports.GenerateImageRequestSchema = zod_1.z.object({
    text: zod_1.z.string().min(1, 'Text is required'),
});
