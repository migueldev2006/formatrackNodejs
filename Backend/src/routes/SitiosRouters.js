import Router from 'express'
import { Registrar_Sitio,Actualizar_Sitio,Desactivar_Sitio,Buscar_Sitio_por_nombre,Listar_Sitios} from '../controllers/SitiosControllers.js'
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/Sitio", verifyToken(), Registrar_Sitio)
router.put("/Sitio/:id_sitio", verifyToken(), Actualizar_Sitio)
router.put("/Sitio/estado/:id_sitio", verifyToken(), Desactivar_Sitio)
router.get("/Sitio/:nombre", verifyToken(), Buscar_Sitio_por_nombre)
router.get("/Sitio", verifyToken(), Listar_Sitios)


export default router;