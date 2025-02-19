import Router from "express";
import {
  Registrar_Sede,
  Actualizar_Sede,
  Buscar_Sede_por_nombre,
  Listar_Sedes,
  Desactivar_Sede
} from "../controllers/SedeControllers.js";

const router = Router();

router.post("/Sede", Registrar_Sede);
router.put("/Sede/:id_sede", Actualizar_Sede);
router.get("/Sede/:nombre", Buscar_Sede_por_nombre);
router.get("/Sede", Listar_Sedes);
router.put("Sede/:id_sede", Desactivar_Sede);

export default router;
