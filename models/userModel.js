"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    phoneNumber: { type: String },
    photos: { type: String },
    username: { type: String }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
const findOne = (query) => User.findOne(query);
exports.findOne = findOne;
