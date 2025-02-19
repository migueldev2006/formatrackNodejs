import { Router } from "express";
import {getAll,registrar,actualizar,cambiaEstado} from '../controllers/categorias.controller.js'
import verifyToken from "../middlewares/verifyToken.js";

const router = Router()

router.get('/categorias',verifyToken(),getAll);
router.post('/categorias',verifyToken(),registrar);
router.put('/categorias/:id',verifyToken(),actualizar);
router.put('/categorias/estado/:id',verifyToken(),cambiaEstado);


export default router