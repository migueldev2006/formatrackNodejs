import { Router } from "express";
import {registrarUsuarioFicha} from '../routes/usuarioFichaRoute.js'
import { actualizarUsuarioFicha, listarUsariosFichas } from "../controllers/usuarioFichaController.js";

export const usuarioFichaRoute = Router();

usuarioFichaRoute.post('/api/usuario_ficha/register/', registrarUsuarioFicha);
usuarioFichaRoute.put('/api/usuario_ficha/update/:id_usuario_ficha/', actualizarUsuarioFicha);
usuarioFichaRoute.get('/api/usuario_ficha/', listarUsariosFichas);