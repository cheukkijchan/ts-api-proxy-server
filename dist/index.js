"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const api_1 = require("./routes/api");
const error_1 = require("./middleware/error");
require('dotenv').config();
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
app.use((0, cors_1.default)());
app.use(limiter);
app.set('trust proxy', 1);
app.use('/api', api_1.apiRouter);
app.use(error_1.errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
//# sourceMappingURL=index.js.map