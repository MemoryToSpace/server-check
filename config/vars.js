"use strict";
// config/vars.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const default_1 = require("./default");
dotenv_1.default.config();
if (!process.env.DATABASE) {
    throw new Error('DATABASE environment variable is not defined.');
}
const databaseURL = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD || '');
exports.vars = {
    nodeEnv: process.env.NODE_ENV || default_1.defaults.nodeEnv,
    port: process.env.PORT || default_1.defaults.port,
    limeToken: process.env.LIME_TOKEN || '',
    openAiKey: process.env.OPENAI_KEY || '',
    databaseURL: databaseURL,
    emailUsername: process.env.EMAIL_USERNAME || '',
    emailPassword: process.env.EMAIL_PASSWORD || '',
    emailHost: process.env.EMAIL_HOST || '',
    emailPort: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : default_1.defaults.emailPort,
    firebaseServiceAccount: {
        type: process.env.TYPE || '',
        project_id: process.env.PROJECT_ID || '',
        private_key_id: process.env.PRIVATE_KEY_ID || '',
        private_key: process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : '',
        client_email: process.env.CLIENT_EMAIL || '',
        client_id: process.env.CLIENT_ID || '',
        auth_uri: process.env.AUTH_URI || '',
        token_uri: process.env.TOKEN_URI || '',
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL || '',
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL || '',
        universe_domain: process.env.UNIVERSE_DOMAIN || '',
    },
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    huggingFaceApiToken: process.env.HUGGING_FACE_API_TOKEN || '',
    mailgunApiKey: process.env.MAILGUN_API_KEY || '',
    mailgunDomain: process.env.MAILGUN_DOMAIN || '',
    emailFrom: process.env.EMAIL_FROM || '',
    mailgunUsername: process.env.MAILGUN_USERNAME || '',
    mailesendApiKey: process.env.MAILERSEND_API_KEY || '',
    fromEmail: process.env.FROM_EMAIL || '',
    fromName: process.env.FROM_NAME || '',
};
