import { Router } from "express";
import { login,logout,registrar,actualizar,cambiarEstado,eliminar,listar,buscarUsuario} from '../controllers/usuarios.controller.js'
import verifyToken from "../middlewares/verifyToken.js";
const router = Router()


router.get('/usuarios',verifyToken(), listar);
router.get('/usuarios/buscar/:documento',verifyToken(), buscarUsuario);
router.post('/usuarios/login',login);
router.post('/usuarios/cerrar',verifyToken(), logout);
router.post('/usuarios',verifyToken(), registrar);
router.put('/usuarios/:id',verifyToken(), actualizar);
router.put('/usuarios/estado/:id',verifyToken(), cambiarEstado);
router.delete('/usuarios/:id',verifyToken(), eliminar);


export default router
