"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_2 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserSchema = new mongoose_2.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    },
}, {
    timestamps: true,
});
UserSchema.pre('save', async function (next) {
    const doc = this;
    if (!doc.isModified('password'))
        return next();
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(doc.password, salt);
    next();
});
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt_1.default.compare(enteredPassword, this.password);
};
exports.User = mongoose_1.default.model('User', UserSchema);
