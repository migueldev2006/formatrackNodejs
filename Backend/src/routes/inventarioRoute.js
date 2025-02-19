import { Router } from "express";
import { actualizarInventarios, buscarInventarios, cargarImagen, desactivarInventario, listarInventarios, registrarInventarios } from "../controllers/inventraioController.js";
import verifyToken from "../middlewares/verifyToken.js";

export const inventarioRoute = Router();

inventarioRoute.post('/api/inventario/register/', verifyToken(), cargarImagen, registrarInventarios);
inventarioRoute.put('/api/inventario/update/:id_inventario',verifyToken(),  actualizarInventarios);
inventarioRoute.put('/api/inventario/desactivar/:id_inventario', verifyToken(), desactivarInventario);
inventarioRoute.get('/api/inventario/:estado', verifyToken(), buscarInventarios);
inventarioRoute.get('/api/inventario/',verifyToken(), listarInventarios);