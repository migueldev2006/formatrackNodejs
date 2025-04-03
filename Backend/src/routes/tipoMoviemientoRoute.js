import { Router } from "express";
import { actualizarTipoMovimiento, buscarTipoMovimiento, cambiarEstadoTipoMovimiento, listarTipoMovimiento, registrarTipoMovimiento } from "../controllers/tipoMovimientoController.js";

export const tipoMovimientoRoute = Router();

tipoMovimientoRoute.post('/tipoMovimiento/', registrarTipoMovimiento);
tipoMovimientoRoute.put('/tipoMovimiento/:id_tipo', actualizarTipoMovimiento);
tipoMovimientoRoute.put('/tipoMovimiento/cambiarEstado/:id_tipo', cambiarEstadoTipoMovimiento);
tipoMovimientoRoute.get('/tipoMovimiento/search/:valor', buscarTipoMovimiento);
tipoMovimientoRoute.get('/tipoMovimiento/', listarTipoMovimiento);