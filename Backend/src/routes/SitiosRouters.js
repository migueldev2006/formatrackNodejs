import Router from "express";
import {
  Registrar_Sitio,
  Actualizar_Sitio,
  Desactivar_Sitio,
  Buscar_Sitio_por_Nombre,
  Listar_Sitios,
} from "../controllers/SitiosControllers.js";

const router = Router();

router.create("/Sitio", Registrar_Sitio);
router.update("/Sitio", Actualizar_Sitio);
router.put("/Sitio/:id_sitio", Desactivar_Sitio);
router.get("/Sitio/:Nombre", Buscar_Sitio_por_Nombre);
router.get("/Sitio", Listar_Sitios);

export default router;
