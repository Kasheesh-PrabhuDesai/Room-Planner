"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "free"
    },
    numberOfDesks: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Room", roomSchema);
