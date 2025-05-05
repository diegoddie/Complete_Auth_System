import express from 'express'
import { forgotPassword, login, logout, refresh, register, resetPassword } from '../controllers/authController';

const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router
