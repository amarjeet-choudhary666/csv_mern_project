"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asycHandler = void 0;
const asycHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};
exports.asycHandler = asycHandler;
