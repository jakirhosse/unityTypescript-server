import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const registerUser = async (name: string, email: string, password: string) => {
  const newUser = new User({ name, email, password });
  await newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  
  return user;
};

export const generateResetToken = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User with this email does not exist');

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 মিনিট পরের এক্সপায়ারি সেট
  await user.save();
  return resetToken;
};

export const resetPassword = async (resetToken: string, newPassword: string) => {
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: new Date() },
  });

  if (!user) throw new Error('Invalid or expired token');

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
};
