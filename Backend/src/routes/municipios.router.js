import { Router } from "express";
import {registrar,actualizar,cambiaEstado,buscarMunicipio,getAll} from '../controllers/municipios.controller.js'
import verifyToken from "../middlewares/verifyToken.js";

const router = Router()

router.get('/municipios', verifyToken(), getAll);
router.get('/municipios/:nombre', verifyToken(), buscarMunicipio);
router.post('/municipios', verifyToken(), registrar);
router.put('/municipios/:id', verifyToken(), actualizar);
router.put('/municipios/estado/:id', verifyToken(), cambiaEstado);


export default router