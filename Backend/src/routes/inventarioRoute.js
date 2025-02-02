import { Router } from "express";
import { actualizarInventarios, buscarInventarios, desactivarInventario, listarInventarios, registrarInventarios } from "../controllers/inventraioController.js";


export const inventarioRoute = Router();

inventarioRoute.post('/api/inventario/register/', registrarInventarios);
inventarioRoute.put('/api/inventario/update/:id_inventario/', actualizarInventarios);
inventarioRoute.put('/api/inventario/desactivar/:id_inventario/', desactivarInventario);
inventarioRoute.get('/api/inventario/:stock/', buscarInventarios);
inventarioRoute.get('/api/inventario/:estado/', buscarInventarios);
inventarioRoute.get('/api/inventario/', listarInventarios);