import {Router} from 'express';
import { registrarElementos, actualizarElementos, buscarElementos, desactivarElementos, listarElementos } from '../controllers/elementoController.js';
import verifyToken from "../middlewares/verifyToken.js";

export const elementoRoute = Router();

elementoRoute.post('/api/elemento/register/',verifyToken(), registrarElementos);
elementoRoute.put('/api/elemento/update/:id_elemento',verifyToken(), actualizarElementos);
elementoRoute.put('/api/elemento/desactivar/:id_elemento',verifyToken(), desactivarElementos);
elementoRoute.get('/api/elemento/:nombre',verifyToken(), buscarElementos);
elementoRoute.get('/api/elemento/',verifyToken(), listarElementos);