import { Router } from "express";
import { actualizarTipoMovimiento, buscarTipoMovimiento, desactivarTipoMovimiento, listarTipoMovimiento, registrarTipoMovimiento } from "../controllers/tipoMovimientoController.js";

export const tipoMovimientoRoute = Router();

tipoMovimientoRoute.post('/api/tipoMovimiento/register/', registrarTipoMovimiento);
tipoMovimientoRoute.put('/api/tipoMovimiento/update/:id_tipo/', actualizarTipoMovimiento);
tipoMovimientoRoute.put('/api/tipoMovimiento/desactivar/:id_tipo/', desactivarTipoMovimiento);
tipoMovimientoRoute.get('/api/tipoMovimiento/:fecha/', buscarTipoMovimiento);
tipoMovimientoRoute.get('/api/tipoMovimiento/:estado', buscarTipoMovimiento);
tipoMovimientoRoute.get('/api/tipoMovimiento/', listarTipoMovimiento);