import {Router} from "express";
import { registrarVerificacion, buscarVerificacion, listarVerificaciones, actualizarVerificacion } from "../controllers/verificacionController.js";

export const verificacionRoute = Router();

verificacionRoute.post('/verificacion/register/', registrarVerificacion);
verificacionRoute.put('/verificacion/update/:id_verificacion', actualizarVerificacion);
verificacionRoute.get('/verificacion/search/:valor', buscarVerificacion);
verificacionRoute.get('/verificacion/', listarVerificaciones);