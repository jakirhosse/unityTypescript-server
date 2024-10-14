import { Request, Response } from 'express';
import { registerUser, loginUser, generateResetToken, resetPassword } from '../services/authService';
import { registerValidation, loginValidation } from '../validators/authValidator';

export const register = async (req: Request, res: Response) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const resetToken = await generateResetToken(email);
    res.status(200).json({ message: `Password reset token sent: ${resetToken}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { resetToken, newPassword } = req.body;
    await resetPassword(resetToken, newPassword);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
