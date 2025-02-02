import { Router } from "express";
import {getAll,registrar,actualizar,cambiaEstado} from '../controllers/categorias.controller.js'

const router = Router()

router.get('/categorias',getAll);
router.post('/categorias',registrar);
router.put('/categorias/:id',actualizar);
router.put('/categorias/estado/:id',cambiaEstado);


export default router