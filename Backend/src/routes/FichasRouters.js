import Router from 'express'
import {Registrar_Ficha,Actualizar_Ficha,Listar_Fichas,Buscar_Ficha_por_id,Desactivar_Ficha} from '../controllers/FichaControllers.js'

const  router = Router();


router.get('/Fichas/:id_ficha',Buscar_Ficha_por_id)
router.get('/Fichas',Listar_Fichas)
router.create('/Fichas',Registrar_Ficha)
router.update('/Fichas',Actualizar_Ficha)
router.put('/Fichas/:id_ficha',Desactivar_Ficha)


export default router;