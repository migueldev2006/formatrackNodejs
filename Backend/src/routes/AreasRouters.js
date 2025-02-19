import Router from "express";
import {
  RegistrarArea,
  ActualizarArea,
  Listar_Áreas,
  Buscar_Área_por_Nombre,
  Desactivar_Area
} from "../controllers/AreasControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.get("/Areas", verifyToken(),Listar_Áreas);
router.get("/Areas/:nombre",verifyToken(), Buscar_Área_por_Nombre);
router.put("/Areas/:id_Area",verifyToken(), ActualizarArea);
router.put("/Areas/estado/:id_Area",verifyToken(), Desactivar_Area);
router.post("/Areas",verifyToken(), RegistrarArea);

export default router;
