import Router from "express";
import {
  Registrar_Sede,
  Actualizar_Sede,
  Buscar_Sede_por_nombre,
  Listar_Sedes,
  Desactivar_Sede
} from "../controllers/SedeControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/Sede", verifyToken(), Registrar_Sede);
router.put("/Sede/:id_sede", verifyToken(), Actualizar_Sede);
router.get("/Sede/:nombre", verifyToken(), Buscar_Sede_por_nombre);
router.get("/Sede", verifyToken(), Listar_Sedes);
router.put("Sede/:id_sede", verifyToken(), Desactivar_Sede);

export default router;
