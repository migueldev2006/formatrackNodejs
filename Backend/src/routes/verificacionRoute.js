import {Router} from "express";
import { registrarVerificacion, buscarVerificacion, listarVerificaciones, actualizarVerificacion } from "../controllers/verificacionController.js";
import verifyToken from "../middlewares/verifyToken.js";

export const verificacionRoute = Router();

verificacionRoute.post('/api/verificacion/register/', verifyToken(), registrarVerificacion);
verificacionRoute.put('/api/verificacion/update/:id_verificacion', verifyToken(), actualizarVerificacion);
verificacionRoute.get('/api/verificacion/:fecha_verificacion', verifyToken(), buscarVerificacion);
verificacionRoute.get('/api/verificacion/', verifyToken(), listarVerificaciones);