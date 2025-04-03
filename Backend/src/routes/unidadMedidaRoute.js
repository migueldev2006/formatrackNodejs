import { Router } from "express";
import { actualizarUnidadMedida, buscarUnidadMedida, cambiarEstadoUnidadMedida, listarUnidadMedida, resgistrarUnidadMedida } from "../controllers/unidadMedidaController.js";

export const unidadMedidaRoute = Router();

unidadMedidaRoute.post('/unidad/register/', resgistrarUnidadMedida);
unidadMedidaRoute.put('/unidad/update/:id_unidad', actualizarUnidadMedida);
unidadMedidaRoute.put('/unidad/cambiarEstado/:id_unidad', cambiarEstadoUnidadMedida);
unidadMedidaRoute.get('/unidad/search/:valor', buscarUnidadMedida);
unidadMedidaRoute.get('/unidad/', listarUnidadMedida);  