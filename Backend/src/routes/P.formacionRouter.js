import Router from "express";
import {
  Registrar_Programas_de_Formación,
  Actualizar_Programas_de_Formación,
  Buscar_Programa_de_Formación_por_Nombre,
  Listar_Programas_de_Formación,
  Desactivar_Programas_de_Formación,
} from "../controllers/P.formacionControllers.js";

const router = Router();

router.create("P.formacion", Registrar_Programas_de_Formación);
router.update("P.formacion/:id_programa", Actualizar_Programas_de_Formación);
router.get("P.formacion/:Nombre", Buscar_Programa_de_Formación_por_Nombre);
router.get("P.formacion", Listar_Programas_de_Formación);
router.put("P.formacion/:id_programa", Desactivar_Programas_de_Formación);

export default router;
