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
// src/config/nodeMailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const vars_1 = require("./vars");
const appError_1 = __importDefault(require("../utils/appError"));
const { emailHost, emailPort, emailUsername, emailPassword } = vars_1.vars;
// reusable transporter object using the default SMTP transport
const transporter = nodemailer_1.default.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465, // true for 465, false for other ports
    auth: {
        user: emailUsername,
        pass: emailPassword,
    },
});
/**
 * Sends an email with the provided options.
 * @param {EmailOptions} options - The email options including recipient, subject, message, and optionally HTML content.
 * @returns {Promise<void>} - A promise that resolves if the email is sent successfully, or rejects with an error otherwise.
 */
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'memorytospace@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log(`Email sent to ${options.email}`);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Failed to send email to ${options.email}:`, errorMessage);
        throw new appError_1.default(`Failed to send email to ${options.email}: ${errorMessage}`, 500);
    }
});
exports.default = sendEmail;
