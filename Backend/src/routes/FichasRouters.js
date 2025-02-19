import Router from 'express'
import {Registrar_Ficha,Actualizar_Ficha,Listar_Fichas,Buscar_Ficha_por_codigo,Desactivar_Ficha} from '../controllers/FichaControllers.js'
import verifyToken from "../middlewares/verifyToken.js";

const  router = Router();


router.get('/Fichas/:codigo_ficha', verifyToken(), Buscar_Ficha_por_codigo)
router.get('/Fichas', verifyToken(), Listar_Fichas)
router.post('/Fichas', verifyToken(), Registrar_Ficha)
router.put('/Fichas/:id_ficha', verifyToken(), Actualizar_Ficha)
router.put('/Fichas/estado/:id_ficha', verifyToken(), Desactivar_Ficha)


export default router;