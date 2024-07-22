"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/firebaseAdmin.ts
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const vars_1 = require("./vars");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(vars_1.vars.firebaseServiceAccount),
    storageBucket: vars_1.vars.firebaseStorageBucket,
});
const bucket = firebase_admin_1.default.storage().bucket();
exports.default = bucket;
