import { Router } from "express";
import {registrar,actualizar,cambiaEstado,buscarTipoSitio,getAll} from '../controllers/tipoSitios.controller.js'

const router = Router()

router.get('/tipoSitio',getAll);
router.get('/tipoSitio/:nombre',buscarTipoSitio);
router.post('/tipoSitio',registrar);
router.put('/tipoSitio/:id',actualizar);
router.put('/tipoSitio/estado/:id',cambiaEstado);


export default router