import { Router } from "express";
import { registrarUsuarioFicha, actualizarUsuarioFicha, listarUsariosFichas } from "../controllers/usuarioFichaController.js";
import verifyToken from "../middlewares/verifyToken.js";

export const usuarioFichaRoute = Router();

usuarioFichaRoute.post('/api/usuario_ficha/register/', verifyToken(), registrarUsuarioFicha);
usuarioFichaRoute.put('/api/usuario_ficha/update/:id_usuario_ficha', verifyToken(), actualizarUsuarioFicha);
usuarioFichaRoute.get('/api/usuario_ficha/', verifyToken(), listarUsariosFichas);