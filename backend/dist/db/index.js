"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const connectDB = async () => {
    try {
        const mongo_uri = process.env.MONGO_URI;
        if (!mongo_uri) {
            throw new Error("MongoDB URI is not defined in environment variables");
        }
        const conectionInstances = await mongoose_1.default.connect(`${mongo_uri}/${constants_1.DB_NAME}`);
        console.log(`MongoDB connected: ${conectionInstances.connection.host}`);
    }
    catch (error) {
        console.log("mongodb failed to conect", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
