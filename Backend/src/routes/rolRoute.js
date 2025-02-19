import { Router } from "express";
import { actualizarRol, buscarRol, desactivarRol, listarRoles, registrarRol } from "../controllers/rolController.js";
import verifyToken from "../middlewares/verifyToken.js";

export const rolRoute = Router();

rolRoute.post('/api/rol/register/', verifyToken(), registrarRol);
rolRoute.put('/api/rol/update/:id_rol', verifyToken(), actualizarRol);
rolRoute.put('/api/rol/desactivar/:id_rol', verifyToken(), desactivarRol);
rolRoute.get('/api/rol/:nombre', verifyToken(), buscarRol);
rolRoute.get('/api/rol/', verifyToken(), listarRoles)