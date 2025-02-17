import Router from 'express'
import {Registrar_Ficha,Actualizar_Ficha,Listar_Fichas,Buscar_Ficha_por_codigo,Desactivar_Ficha} from '../controllers/FichaControllers.js'

const  router = Router();


router.get('/Fichas/:codigo_ficha',Buscar_Ficha_por_codigo)
router.get('/Fichas',Listar_Fichas)
router.post('/Fichas',Registrar_Ficha)
router.put('/Fichas/:id_ficha',Actualizar_Ficha)
router.put('/Fichas/estado/:id_ficha',Desactivar_Ficha)


export default router;