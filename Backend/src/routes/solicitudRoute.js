import { Router } from "express";
import { registrarSolicitudes, actualizarSolicitudes, buscarSolicitudes, listarSolicitudes, aceptarSolicitudes, rechazarSolicitudes } from "../controllers/solicitudController.js";
import verifyToken from "../middlewares/verifyToken.js";

export const solicitudRoute = Router();

solicitudRoute.post('/api/solicitud/register/', verifyToken(), registrarSolicitudes);
solicitudRoute.put('/api/solicitud/update/:id_solicitud', verifyToken(), actualizarSolicitudes);
solicitudRoute.put('/api/solicitud/aceptar/:id_solicitud', verifyToken(), aceptarSolicitudes);
solicitudRoute.put('/api/solicitud/rechazar/:id_solicitud', verifyToken(), rechazarSolicitudes)
solicitudRoute.get('/api/solicitud/:estado', verifyToken(), buscarSolicitudes);
solicitudRoute.get('/api/solicitud/', verifyToken(), listarSolicitudes);