import {Router} from 'express';
import { registrarElementos, actualizarElementos, buscarElementos, desactivarElementos, eliminarElementos, listarElementos } from '../controllers/elementoController.js';

export const elementoRoute = Router();

elementoRoute.post('/api/elemento/register/', registrarElementos);
elementoRoute.put('/api/elemento/update/:id_elemento', actualizarElementos);
elementoRoute.put('/api/elemento/desactivar/:id_elemento/', desactivarElementos);
elementoRoute.get('/api/elemento/:id_elemento/', buscarElementos);
elementoRoute.get('/api/elemento/nombre/', buscarElementos);
elementoRoute.get('/api/elemento/', listarElementos);
elementoRoute.delete('/api/elemento/delete/id_elemento/', eliminarElementos)