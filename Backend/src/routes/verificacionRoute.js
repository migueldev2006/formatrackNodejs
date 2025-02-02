import {Router} from "express";
import { registrarVerificacion, buscarVerificacion, listarVerificaciones, actualizarVerificacion } from "../controllers/verificacionController.js";

export const verificacionRoute = Router();

verificacionRoute.post('/api/verificacion/register/', registrarVerificacion);
verificacionRoute.put('/api/verificacion/update/:id_verificacion/', actualizarVerificacion);
verificacionRoute.get('/api/verificacion/:persona_asignada/', buscarVerificacion);
verificacionRoute.get('/api/verificacion/:fecha/', buscarVerificacion);
verificacionRoute.get('/api/verificacion/', listarVerificaciones);