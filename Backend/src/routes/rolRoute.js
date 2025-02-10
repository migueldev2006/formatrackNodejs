import { Router } from "express";
import { actualizarRol, buscarRol, desactivarRol, listarRoles, registrarRol } from "../controllers/rolController.js";

export const rolRoute = Router();

rolRoute.post('/api/rol/register/', registrarRol);
rolRoute.put('/api/rol/update/:id_rol/', actualizarRol);
rolRoute.put('/api/rol/desactivar/:id_rol/', desactivarRol);
rolRoute.get('/api/rol/:nombre/', buscarRol);
rolRoute.get('/api/rol/', listarRoles)