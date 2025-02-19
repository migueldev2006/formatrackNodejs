import Router from "express";
import {
  Registrar_Programas_de_Formación,
  Actualizar_Programas_de_Formación,
  Buscar_Programa_de_Formación_por_Nombre,
  Listar_Programas_de_Formación,
  Desactivar_Programas_de_Formación,
} from "../controllers/P.formacionControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/P.formacion", verifyToken(), Registrar_Programas_de_Formación);
router.put("/P.formacion/:id_programa", verifyToken(), Actualizar_Programas_de_Formación);
router.get("/P.formacion/:nombre", verifyToken(), Buscar_Programa_de_Formación_por_Nombre);
router.get("/P.formacion", verifyToken(), Listar_Programas_de_Formación);
router.put("/P.formacion/estado/:id_programa", verifyToken(), Desactivar_Programas_de_Formación);

export default router;
