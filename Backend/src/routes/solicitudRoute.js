import { Router } from "express";
import { registrarSolicitudes, actualizarSolicitudes, buscarSolicitudes, listarSolicitudes, aceptarSolicitudes, rechazarSolicitudes } from "../controllers/solicitudController.js";

export const solicitudRoute = Router();

solicitudRoute.post('/api/solicitud/register/', registrarSolicitudes);
solicitudRoute.put('/api/solicitud/update/:id_solicitud', actualizarSolicitudes);
solicitudRoute.put('/api/solicitud/aceptar/:id_solicitud', aceptarSolicitudes);
solicitudRoute.put('/api/solicitud/rechazar/:id_solicitud', rechazarSolicitudes)
solicitudRoute.get('/api/solicitud/:estado', buscarSolicitudes);
solicitudRoute.get('/api/solicitud/', listarSolicitudes);