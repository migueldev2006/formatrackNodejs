import Router from 'express'
import { Registrar_Sitio,Actualizar_Sitio,Desactivar_Sitio,Buscar_Sitio_por_nombre,Listar_Sitios} from '../controllers/SitiosControllers.js'

const router = Router();

router.post("/Sitio",Registrar_Sitio)
router.put("/Sitio/:id_sitio",Actualizar_Sitio)
router.put("/Sitio/estado/:id_sitio",Desactivar_Sitio)
router.get("/Sitio/:nombre",Buscar_Sitio_por_nombre)
router.get("/Sitio",Listar_Sitios)


export default router;