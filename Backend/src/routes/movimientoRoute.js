import {Router} from 'express';
import { aceptarMovimientos, actualizarMovimientos, buscarMovimientos, cancelarMovimientos, listarMovimientos, registrarMovimientos } from '../controllers/movimientoController.js';

export const movimientoRoute = Router();

movimientoRoute.post('/api/movimiento/register/', registrarMovimientos);
movimientoRoute.put('/api/movimiento/update/:id_movimiento', actualizarMovimientos);
movimientoRoute.put('/api/movimiento/aceptar/:id_movimiento', aceptarMovimientos);
movimientoRoute.put('/api/movimiento/cancelar/:id_movimiento', cancelarMovimientos);
movimientoRoute.get('/api/movimiento/:estado', buscarMovimientos);
movimientoRoute.get('/api/movimiento/', listarMovimientos);