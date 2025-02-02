import { Router } from "express";
import { actualizarUnidadMedida, buscarUnidadMedida, desactivarUnidadMedida, listarUnidadMedida, resgistrarUnidadMedida } from "../controllers/unidadMedidaController.js";

export const unidadMedidaRoute = Router();

unidadMedidaRoute.post('/api/unidad/register/', resgistrarUnidadMedida);
unidadMedidaRoute.put('/api/unidad/update/:id_unidad/', actualizarUnidadMedida);
unidadMedidaRoute.put('/api/unidad/desactivar/:id_unidad/', desactivarUnidadMedida);
unidadMedidaRoute.get('/api/unidad/:nombre/', buscarUnidadMedida);
unidadMedidaRoute.get('/api/unidad/:estado/', buscarUnidadMedida);
unidadMedidaRoute.get('/api/unidad/', listarUnidadMedida);