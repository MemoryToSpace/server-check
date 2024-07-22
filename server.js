"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes/routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const vars_1 = require("./config/vars");
const connectDb_1 = require("./config/connectDb");
const modelLoader_1 = __importDefault(require("./config/modelLoader"));
const cors_1 = __importDefault(require("cors"));
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
(0, modelLoader_1.default)();
const port = vars_1.vars.port || 3000;
const corsOptions = {
    origin: ['https://from-memory-to-space.netlify.app', 'https://memory-to-space.netlify.app'],
    optionsSuccessStatus: 200, // For legacy browser support
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
(0, routes_1.RegisterRoutes)(app);
const swagger_json_1 = __importDefault(require("./swagger.json"));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use((err, req, res, next) => {
    if (err instanceof appError_1.default) {
        res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});
(0, connectDb_1.connectDB)();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger docs are available at http://localhost:${port}/docs`);
});
