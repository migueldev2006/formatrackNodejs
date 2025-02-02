import { Router } from "express";
import {registrar,actualizar,cambiaEstado,buscarCentro,getAll} from '../controllers/centros.controller.js'

const router = Router()

router.get('/centros',getAll);
router.get('/centros/:nombre',buscarCentro);
router.post('/centros',registrar);
router.put('/centros/:id',actualizar);
router.put('/centros/estado/:id',cambiaEstado);


export default router