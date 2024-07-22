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
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/mailersend.ts
const mailersend_1 = require("mailersend");
const vars_1 = require("./vars");
const mailerSend = new mailersend_1.MailerSend({
    apiKey: vars_1.vars.mailesendApiKey,
});
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const emailParams = new mailersend_1.EmailParams()
        .setFrom(new mailersend_1.Sender(vars_1.vars.fromEmail, vars_1.vars.fromName))
        .setTo([new mailersend_1.Recipient(options.to)])
        .setSubject(options.subject)
        .setText(options.text)
        .setHtml(options.html);
    try {
        yield mailerSend.email.send(emailParams);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
});
exports.default = sendEmail;
