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
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const apicache_1 = __importDefault(require("apicache"));
require('dotenv').config();
const API_BASE_URL = process.env.API_BASE_URL || '';
const API_KEY_NAME = process.env.API_KEY_NAME || '';
const API_KEY_VALUE = process.env.API_KEY_VALUE || '';
const cache = apicache_1.default.middleware;
exports.apiRouter = express_1.default.Router();
exports.apiRouter.get('/', cache('10 minutes'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        let searchParams = new URLSearchParams(fullUrl.search);
        const params = new URLSearchParams(Object.assign({ [API_KEY_NAME]: API_KEY_VALUE }, Object.fromEntries(searchParams.entries())));
        const apiRes = yield axios_1.default.get(`${API_BASE_URL}?${params}`);
        const data = apiRes.data;
        if (process.env.NODE_ENV === 'development') {
            console.log(`Requesting: ${API_BASE_URL}?${params}`);
        }
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=api.js.map