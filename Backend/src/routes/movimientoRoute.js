import {Router} from 'express';
import { aceptarMovimientos, actualizarMovimientos, buscarMovimientos, cancelarMovimientos, listarMovimientos, registrarMovimientos,actualizarStockMovimiento } from '../controllers/movimientoController.js';
import verifyToken from "../middlewares/verifyToken.js";

export const movimientoRoute = Router();

movimientoRoute.post('/api/movimiento/register/', verifyToken(), registrarMovimientos);
movimientoRoute.put('/api/movimiento/update/:id_movimiento', verifyToken(), actualizarMovimientos);
movimientoRoute.put('/api/movimiento/aceptar/:id_movimiento', verifyToken(), aceptarMovimientos);
movimientoRoute.put('/api/movimiento/stock/:id_movimiento',verifyToken(), actualizarStockMovimiento);
movimientoRoute.put('/api/movimiento/cancelar/:id_movimiento', verifyToken(), cancelarMovimientos);
movimientoRoute.get('/api/movimiento/:estado', verifyToken(), buscarMovimientos);
movimientoRoute.get('/api/movimiento/',  verifyToken(),listarMovimientos);