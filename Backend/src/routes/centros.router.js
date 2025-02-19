import { Router } from "express";
import {registrar,actualizar,cambiaEstado,buscarCentro,getAll} from '../controllers/centros.controller.js'
import verifyToken from "../middlewares/verifyToken.js";

const router = Router()

router.get('/centros',verifyToken(),getAll);
router.get('/centros/:nombre',verifyToken(),buscarCentro);
router.post('/centros',verifyToken(),registrar);
router.put('/centros/:id',verifyToken(),actualizar);
router.put('/centros/estado/:id',verifyToken(),cambiaEstado);


export default router