import { Router } from "express";
import {registrar,actualizar,cambiaEstado,buscarTipoSitio,getAll} from '../controllers/tipoSitios.controller.js'
import verifyToken from "../middlewares/verifyToken.js";

const router = Router()

router.get('/tipoSitio',verifyToken(), getAll);
router.get('/tipoSitio/:nombre',verifyToken(), buscarTipoSitio);
router.post('/tipoSitio',verifyToken(), registrar);
router.put('/tipoSitio/:id',verifyToken(), actualizar);
router.put('/tipoSitio/estado/:id',verifyToken(), cambiaEstado);


export default router