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
exports.sendMemoryByEmail = void 0;
// src/services/email.service.ts
const dataAccess_1 = __importDefault(require("../utils/dataAccess"));
const mongoose_1 = __importDefault(require("mongoose"));
const mailersend_1 = __importDefault(require("../config/mailersend"));
const sendMemoryByEmail = (memoryId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const memory = yield dataAccess_1.default.findById('Memory', new mongoose_1.default.Types.ObjectId(memoryId));
    if (!memory) {
        throw new Error(`Memory with ID ${memoryId} not found`);
    }
    const message = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f3f4f6;">
    <h1 style="color: #4CAF50; text-align: center;">Your Memory</h1>
    <p style="font-size: 16px; color: #333;">Here is the memory you requested:</p>
    <div style="margin: 20px 0; padding: 10px; border-radius: 8px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 14px; color: #555;"><strong>Text:</strong></p>
      <p style="font-size: 18px; color: #000; background: #e0f7fa; padding: 10px; border-radius: 5px;">${memory.inputText}</p>
    </div>
    <div style="text-align: center; margin: 20px 0;">
      <img src="${memory.imageUrl}" alt="Memory Image" style="max-width: 100%; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);" />
    </div>
    <p style="font-size: 14px; color: #666;">Thank you for using our service!</p>
    <p style="font-size: 14px; color: #666;">Best regards,<br /><strong>The MemorySpace Team</strong></p>
    <div style="text-align: center; margin-top: 30px;">
      <a href="https://example.com" style="font-size: 14px; color: #fff; background-color: #4CAF50; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
    </div>
  </div>
`;
    yield (0, mailersend_1.default)({
        to: email,
        subject: 'Your Requested Memory',
        text: `Here is your requested memory: ${memory.inputText}`,
        html: message,
    });
});
exports.sendMemoryByEmail = sendMemoryByEmail;
