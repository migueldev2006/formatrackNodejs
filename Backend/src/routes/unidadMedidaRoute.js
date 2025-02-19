import { Router } from "express";
import { actualizarUnidadMedida, buscarUnidadMedida, desactivarUnidadMedida, listarUnidadMedida, resgistrarUnidadMedida } from "../controllers/unidadMedidaController.js";
import verifyToken from "../middlewares/verifyToken.js";

export const unidadMedidaRoute = Router();

unidadMedidaRoute.post('/api/unidad/register/', verifyToken(), resgistrarUnidadMedida);
unidadMedidaRoute.put('/api/unidad/update/:id_unidad', verifyToken(), actualizarUnidadMedida);
unidadMedidaRoute.put('/api/unidad/desactivar/:id_unidad', verifyToken(), desactivarUnidadMedida);
unidadMedidaRoute.get('/api/unidad/:nombre', verifyToken(), buscarUnidadMedida);
unidadMedidaRoute.get('/api/unidad/', verifyToken(), listarUnidadMedida);  