import express from 'express';
import { register, login, forgetPassword, resetPasswordController } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPasswordController);

export default router;
