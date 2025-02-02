import { Router } from "express";
import {registrar,actualizar,cambiaEstado,buscarMunicipio,getAll} from '../controllers/municipios.controller.js'

const router = Router()

router.get('/municipios',getAll);
router.get('/municipios/:nombre',buscarMunicipio);
router.post('/municipios',registrar);
router.put('/municipios/:id',actualizar);
router.put('/municipios/estado/:id',cambiaEstado);


export default router