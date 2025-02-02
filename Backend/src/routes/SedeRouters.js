import Router from "express";
import {
  Registrar_Sede,
  Actualizar_Sede,
  Buscar_Sede_por_Nombre,
  Listar_Sedes,
  Desactivar_Sede
} from "../controllers/SedeControllers.js";

const router = Router();

router.create("/Sede", Registrar_Sede);
router.update("/Sede", Actualizar_Sede);
router.get("/Sede/:Nombre", Buscar_Sede_por_Nombre);
router.get("/Sede", Listar_Sedes);
router.put("/Sede/:id_sede", Desactivar_Sede);

export default router;
