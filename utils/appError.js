"use strict";
// src/utils/appError.ts
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // Call parent constructor with the message
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Indicates that this is an operational, rather than a programming, error
        // Attach the stack trace to this error instance (excluding the constructor call)
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
