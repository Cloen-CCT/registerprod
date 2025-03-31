import User from './users.model.js';
import PasswordResetToken from './passwordResetToken.model.js';

export const create = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const getAll = async () => {
  return await User.find();
};

export const getById = async (id) => {
  return await User.findById(id);
};

export const getByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getByUsername = async (username) => {
  return await User.findOne({ username });
};

export const savePasswordResetToken = async (userId, token) => {
  const user = await User.findById(userId);
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
  await user.save();
};


export const getUserIdByPasswordResetToken = async (token) => {
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  return user ? user._id : null;
};

export const updatePassword = async (userId, newPassword) => {
  const user = await User.findById(userId);
  user.password = newPassword;
  await user.save();
};

export const update = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const patch = async (id, updatedFields) => {
  return await User.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
};

export const remove = async (id) => {
  return await User.findByIdAndDelete(id);
};
