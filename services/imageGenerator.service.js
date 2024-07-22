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
exports.generateImageOpenAI = void 0;
// src/services/imageGenerator.service.ts
const axios_1 = __importDefault(require("axios"));
const vars_1 = require("../config/vars");
const dataAccess_1 = __importDefault(require("../utils/dataAccess"));
const firebase_1 = require("../utils/firebase");
const uuid_1 = require("uuid");
const nlp_service_1 = require("./nlp.service");
const openaiUrl = 'https://api.openai.com/v1/images/generations';
const generateImageOpenAI = (text) => __awaiter(void 0, void 0, void 0, function* () {
    let processedText = text;
    if (/[א-ת]/.test(text)) {
        processedText = yield (0, nlp_service_1.translateText)(text);
    }
    const improvedText = yield (0, nlp_service_1.enhancePrompt)(processedText);
    const refinedPrompt = `Create an image according to: "${improvedText}". The image should have an style: Architecture drawing in black and white.`;
    const res = yield generateImageRequestOpenAI(refinedPrompt);
    const base64Image = res.data[0].b64_json;
    const buffer = convertBase64ToBuffer(base64Image);
    const firebaseUrl = yield uploadImageToFirebase(buffer);
    return createMemoryRecord(text, firebaseUrl);
});
exports.generateImageOpenAI = generateImageOpenAI;
const generateImageRequestOpenAI = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        model: 'dall-e-3',
        prompt: prompt,
        size: '1792x1024',
        quality: 'standard',
        n: 1,
        response_format: 'b64_json',
    };
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vars_1.vars.openAiKey}`,
    };
    const response = yield axios_1.default.post(openaiUrl, payload, { headers });
    return response.data;
});
const convertBase64ToBuffer = (base64) => {
    return Buffer.from(base64, 'base64');
};
const uploadImageToFirebase = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = `${(0, uuid_1.v4)()}.png`;
    return (0, firebase_1.uploadBufferToFirebase)(buffer, fileName);
});
const createMemoryRecord = (text, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const memory = yield dataAccess_1.default.create('Memory', {
        inputText: text,
        imageUrl: imageUrl,
    });
    return {
        _id: memory._id.toString(),
        inputText: memory.inputText,
        imageUrl: memory.imageUrl,
    };
});
