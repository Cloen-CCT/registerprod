// import { Router } from 'express';
// import * as usersController from './users.controller.js';

// const router = Router();

// router.post('/', usersController.create); // Ruta para crear un usuario
// router.get('/', usersController.getAll); // Ruta para obtener todos los usuarios
// router.get('/email/:email', usersController.getByEmail); // Ruta para obtener un usuario por email
// router.get('/username/:username', usersController.getByUsername); // Ruta para obtener un usuario por username
// router.get('/:id', usersController.getById); // Ruta para obtener un usuario por ID
// router.put('/:id', usersController.update); // Ruta para actualizar un usuario por ID
// router.patch('/:id', usersController.patch); // Ruta para modificar parcialmente un usuario por ID
// router.delete('/:id', usersController.remove); // Ruta para eliminar un usuario por ID
// router.post('/request-password-reset', usersController.requestPasswordReset); // Ruta para solicitar restablecimiento de contraseña
// router.post('/reset-password', usersController.resetPassword); // Ruta para restablecer la contraseña
// router.post('/login', usersController.login); // Ruta para iniciar sesión


// export default router;


import { Router } from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.post('/login', usersController.login);
router.post('/refresh-token', usersController.refreshAccessToken);
router.post('/register', usersController.create); // Ruta para registrar un usuario
router.post('/request-password-reset', usersController.requestPasswordReset);
router.post('/reset-password', usersController.resetPassword);
router.post('/', usersController.create);

router.get('/', usersController.getAll);
router.get('/email/:email', usersController.getByEmail);
router.get('/username/:username', usersController.getByUsername);
router.get('/:id', usersController.getById);
router.put('/:id', usersController.update);
router.patch('/:id', usersController.patch);
router.delete('/:id', usersController.remove);

export default router;

