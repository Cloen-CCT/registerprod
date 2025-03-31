import * as userService from './users.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Esto debería estar aquí al principio

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$')).required().messages({
    'string.pattern.base': 'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número, y debe tener al menos 6 caracteres.'
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  rol: Joi.string().optional(),
  birthDate: Joi.date().optional()
});

export async function create(req, res) {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { username, password, email, phone, rol, birthDate } = req.body;
    const existingUser = await userService.getByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya existe." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.create({ username, password: hashedPassword, email, phone, rol, birthDate });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userService.getByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Contraseña incorrecta." });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login exitoso.", token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

export async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: "Token de refresco requerido." });
  }
  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ error: "Token de refresco no válido." });
  }
}

export async function getAll(req, res) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function getByEmail(req, res) {
  try {
    const user = await userService.getByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function getByUsername(req, res) {
  try {
    const user = await userService.getByUsername(req.params.username);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function getById(req, res) {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan campos necesarios." });
  }
  try {
    const updatedUser = await userService.update(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function patch(req, res) {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    if (updatedFields.password) {
      const { error } = Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$')).validate(updatedFields.password);
      if (error) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número, y debe tener al menos 6 caracteres.' });
      }
      updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
    }
    const updatedUser = await userService.patch(id, updatedFields);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function remove(req, res) {
  try {
    const user = await userService.remove(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json({ message: "Usuario eliminado." });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});


export async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    console.log(`Recibida solicitud de restablecimiento para el email: ${email}`);
    
    const user = await userService.getByEmail(email);
    if (!user) {
      console.log('Usuario no encontrado.');
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const token = crypto.randomBytes(32).toString('hex');
    console.log(`Token generado: ${token}`);
    await userService.savePasswordResetToken(user._id, token);

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Restablecimiento de Contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${process.env.FRONTEND_URL}/reset-password?token=${token}`
    };

    console.log(`Configuración del transportador:`, transporter.options);
    console.log(`Opciones de correo:`, mailOptions);

    await transporter.sendMail(mailOptions);
    console.log('Correo de recuperación enviado.');
    res.json({ message: 'Correo de recuperación enviado.' });
  } catch (error) {
    console.error('Error en la solicitud de restablecimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    const userId = await userService.getUserIdByPasswordResetToken(token);
    if (!userId) {
      return res.status(400).json({ error: "Token inválido o expirado." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userService.updatePassword(userId, hashedPassword);
    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
