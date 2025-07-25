"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController"); // Ensure correct import path
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/signin', userController_1.signInWithEmail);
router.post('/profile', userController_1.verifyOtpAndCheckProfile);
router.put('/update-profile', auth_1.authenticateToken, userController_1.updateProfile);
exports.default = router;
