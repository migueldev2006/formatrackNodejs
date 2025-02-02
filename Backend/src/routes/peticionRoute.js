import { Router } from "express";
import { registrarPeticiones, actualizarPeticiones, buscarPeticiones, listarPeticiones, rechazarPeticiones, aceptarPeticiones } from "../controllers/peticionController.js";

export const peticionRoute = Router();

peticionRoute.post('/api/peticion/register/', registrarPeticiones);
peticionRoute.put('/api/peticion/update/:id_peticion/', actualizarPeticiones);
peticionRoute.put('/api/peticion/aceptar/:id_peticion/', aceptarPeticiones);
peticionRoute.put('/api/peticion/rechazar/:id_peticion/', rechazarPeticiones);
peticionRoute.get('/api/peticion/:nombre_solicitante/', buscarPeticiones);
peticionRoute.get('/api/peticion/:fecha/', buscarPeticiones);
peticionRoute.get('/api/peticion/', listarPeticiones)