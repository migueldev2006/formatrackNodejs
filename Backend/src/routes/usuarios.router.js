import { Router } from "express";
import { login,logout,registrar,actualizar,cambiarEstado,eliminar,listar,buscarUsuario} from '../controllers/usuarios.controller.js'
import verifyToken from "../middlewares/verifyToken.js";
const router = Router()


router.get('/usuarios',listar);
router.get('/usuarios/buscar/:documento',buscarUsuario);
router.post('/usuarios/login',login);
router.post('/usuarios/cerrar',logout);
router.post('/usuarios',registrar);
router.put('/usuarios/:id',actualizar);
router.put('/usuarios/estado/:id',cambiarEstado);
router.delete('/usuarios/:id',eliminar);


export default router
