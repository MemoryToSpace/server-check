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
exports.translateText = exports.enhancePrompt = void 0;
// src/services/nlp.service.ts
const vars_1 = require("../config/vars");
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: vars_1.vars.openAiKey,
});
const enhancePrompt = (text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const systemMessage = `
    Given the following input memory, generate a detailed description that can be translated into architectural and landscape elements. Include key elements, emotions and atmosphere, visualization and design details, and historical and cultural significance where applicable.

    **Input Memory:**
    {memory_description}

    **Output Prompt:**

    ### Key Elements:

    1. **Landscape and Surroundings:**
        - Describe the paths, greenery, and any significant landscape features.
        - Mention any specific elements like cyclists, tractors, or other vehicles.

    2. **Buildings and Structures:**
        - Detail any houses, buildings, or other structures.
        - Include information about their appearance, location, and any surrounding features.

    3. **Recreational and Community Areas:**
        - Describe playgrounds, recreational areas, or communal spaces.
        - Include any activities or sounds, such as children playing or other community interactions.

    4. **Flora and Fauna:**
        - Mention any significant trees, plants, or gardens.
        - Include details about animals present and their behavior.

    ### Emotions and Atmosphere:

    1. **Serenity and Harmony:**
        - Describe elements that symbolize peace and calm, such as lush greenery or harmonious architecture.

    2. **Community and Playfulness:**
        - Include aspects that create a sense of community and liveliness, like children's voices or freely roaming animals.

    3. **Historical Significance and Nature:**
        - Highlight any elements that signify history and continuity, such as old trees or traditional plants.

    ### Visualization and Design:

    1. **Landscape and Paths:**
        - Provide details on how to create and visualize the landscape and paths.
        - Include any specific elements like cyclists or tractors.

    2. **Buildings and Structures:**
        - Describe the design and placement of buildings and structures.
        - Mention any surrounding features that should be included.

    3. **Recreational Areas:**
        - Detail the design of playgrounds and recreational areas.
        - Include any specific activities or interactions.

    4. **Flora and Fauna:**
        - Describe the placement and significance of trees, plants, and animals.

    ### Historical and Cultural Significance (if applicable):

    1. **Setting and Atmosphere:**
        - Provide context about the location and time period.
        - Mention any significant historical or cultural aspects.

    2. **Community Life and Environment:**
        - Describe communal spaces and the lifestyle of the community.
        - Highlight any significant cultural or historical practices.
    `;
    try {
        const completion = yield openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: systemMessage.replace('{memory_description}', text),
                },
                { role: 'user', content: text },
            ],
        });
        const message = (_c = (_b = (_a = completion.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
        if (message) {
            return message.trim();
        }
        else {
            throw new Error('No message content found');
        }
    }
    catch (error) {
        throw new Error('Error enhancing prompt: ' + error.message);
    }
});
exports.enhancePrompt = enhancePrompt;
const translateText = (text) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const translationPrompt = `
  Translate the following Hebrew text to English:
  
  Hebrew: ${text}
  
  English:
  `;
    try {
        const completion = yield openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: translationPrompt },
                { role: 'user', content: text },
            ],
        });
        const message = (_f = (_e = (_d = completion.choices) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.content;
        if (message) {
            return message.trim();
        }
        else {
            throw new Error('No message content found');
        }
    }
    catch (error) {
        throw new Error('Error translating text: ' + error.message);
    }
});
exports.translateText = translateText;
