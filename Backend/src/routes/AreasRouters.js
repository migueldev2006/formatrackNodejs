import Router from "express";
import {
  RegistrarArea,
  ActualizarArea,
  Listar_Áreas,
  Buscar_Área_por_Nombre,
} from "../controllers/AreasControllers.js";

const router = Router();

router.get("/Areas", Listar_Áreas);
router.get("/Areas/:Nombre", Buscar_Área_por_Nombre);
router.update("/Areas:id_Area", ActualizarArea);
router.create("/Areas", RegistrarArea);

export default router;
