"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.OpenAIController = void 0;
// src/controllers/imageGenerator.controller.ts
const tsoa_1 = require("tsoa");
const imageGenerator_types_1 = require("../types/imageGenerator.types");
const imageGenerator_service_1 = require("../services/imageGenerator.service");
const sendMemoryEmail_types_1 = require("../types/sendMemoryEmail.types");
const email_service_1 = require("../services/email.service");
const appError_1 = __importDefault(require("../utils/appError"));
let OpenAIController = class OpenAIController extends tsoa_1.Controller {
    /**
     * Generate an image based on the provided text prompt using OpenAI
     * @param request The text prompt to be used for image generation
     * @example request { "text": "A cozy cottage in the woods" }
     * @example response { "_id": "60d5f2c2fc13ae1d7c002b1e", "inputText": "A cozy cottage in the woods", "imageUrl": "https://example.com/image.png" }
     */
    generateImageOpenAI(request) {
        return __awaiter(this, void 0, void 0, function* () {
            imageGenerator_types_1.GenerateImageRequestSchema.parse(request);
            return (0, imageGenerator_service_1.generateImageOpenAI)(request.text);
        });
    }
    /**
     * Send memory details to the provided email
     * @param request The request containing memory ID and email
     * @example request { "_id": "60d5f2c2fc13ae1d7c002b1e", "email": "example@example.com" }
     */
    sendMemoryByEmail(request) {
        return __awaiter(this, void 0, void 0, function* () {
            sendMemoryEmail_types_1.sendMemoryEmailRequestSchema.parse(request);
            try {
                yield (0, email_service_1.sendMemoryByEmail)(request._id, request.email);
                return { message: 'Email sent successfully' };
            }
            catch (error) {
                throw new appError_1.default(error.message, 500);
            }
        });
    }
};
exports.OpenAIController = OpenAIController;
__decorate([
    (0, tsoa_1.Post)('openai'),
    (0, tsoa_1.Example)({ text: 'A cozy cottage in the woods' }),
    (0, tsoa_1.SuccessResponse)(200),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OpenAIController.prototype, "generateImageOpenAI", null);
__decorate([
    (0, tsoa_1.Post)('send-memory'),
    (0, tsoa_1.SuccessResponse)(200),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OpenAIController.prototype, "sendMemoryByEmail", null);
exports.OpenAIController = OpenAIController = __decorate([
    (0, tsoa_1.Route)('generate-image')
], OpenAIController);
