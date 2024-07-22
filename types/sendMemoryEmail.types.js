"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMemoryEmailRequestSchema = void 0;
// src/types/sendMemoryEmail.types.ts
const zod_1 = require("zod");
exports.sendMemoryEmailRequestSchema = zod_1.z.object({
    _id: zod_1.z.string().min(1, 'Memory ID is required'),
    email: zod_1.z.string().email('Invalid email address'),
});
