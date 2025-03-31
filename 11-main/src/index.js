import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './routes/db.js'; 
import indexRoutes from './routes/index.js';
import paeRoutes from './pae/pae.router.js';
import usersRoutes from './users/users.router.js';
import passwordresettokensRoutes from './routes/passwordresettokensRoutes.js';
import productsRoutes from './products/products.router.js';
import providersRoutes from './providers/providers.router.js';
import garantiaRoutes from './products/garantia.router.js';
import trazabilidadRoutes from './products/trazabilidad.router.js';
import dashboardRoutes from './dashboard/dashboard.router.js';

dotenv.config(); // Esto debería estar aquí al principio

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

connectDB().then(() => {
  app.use('/', indexRoutes);
  app.use('/api/pae', paeRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/passwordresettokens', passwordresettokensRoutes);
  app.use('/api/products', productsRoutes);
  app.use('/api/providers', providersRoutes);
  app.use('/api/garantias', garantiaRoutes);
  app.use('/api/trazabilidad', trazabilidadRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
  });
});
