import { Router } from "express";
import { actualizarInventarios, buscarInventarios, cargarImagen, desactivarInventario, listarInventarios, registrarInventarios } from "../controllers/inventraioController.js";


export const inventarioRoute = Router();

inventarioRoute.post('/api/inventario/register/', cargarImagen, registrarInventarios);
inventarioRoute.put('/api/inventario/update/:id_inventario', cargarImagen, actualizarInventarios);
inventarioRoute.put('/api/inventario/desactivar/:id_inventario', desactivarInventario);
inventarioRoute.get('/api/inventario/:estado', buscarInventarios);
inventarioRoute.get('/api/inventario/', listarInventarios);