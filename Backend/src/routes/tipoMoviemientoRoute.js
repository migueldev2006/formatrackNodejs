import { Router } from "express";
import { actualizarTipoMovimiento, buscarTipoMovimiento, desactivarTipoMovimiento, listarTipoMovimiento, registrarTipoMovimiento } from "../controllers/tipoMovimientoController.js";
import verifyToken from "../middlewares/verifyToken.js";

export const tipoMovimientoRoute = Router();

tipoMovimientoRoute.post('/api/tipoMovimiento/register/', verifyToken(), registrarTipoMovimiento);
tipoMovimientoRoute.put('/api/tipoMovimiento/update/:id_tipo', verifyToken(), actualizarTipoMovimiento);
tipoMovimientoRoute.put('/api/tipoMovimiento/desactivar/:id_tipo', verifyToken(), desactivarTipoMovimiento);
tipoMovimientoRoute.get('/api/tipoMovimiento/:estado', verifyToken(), buscarTipoMovimiento);
tipoMovimientoRoute.get('/api/tipoMovimiento/', verifyToken(), listarTipoMovimiento);