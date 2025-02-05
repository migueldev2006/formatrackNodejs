import { pool } from "../../src/database/db.js";

const RegistrarArea = async (req, res) => {
  try {
    const { Nombre, Persona_Encargada, fk_Sede } = req.body;
    const sql =
      "insert into areas (nombre,persona_encargada,fk_sede) Values($1,$2,$3,$4)";
    const result = await pool.query(sql, [Nombre, Persona_Encargada, fk_Sede]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al regsitrar area" });
  }
};

const ActualizarArea = async (req, res) => {
  try {
    const { Nombre, Persona_Encargada, fk_Sede } = req.body;
    const { id_Area } = req.params;
    const sql =
      "update areas set nombre=$1,persona_encargada=$2,fk_sede=$3 where id_area=$4";
    const result = await pool.query(sql, [
      Nombre,
      Persona_Encargada,
      fk_Sede,
      id_Area,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en la actualizacion de areas" });
  }
};

const Buscar_Área_por_Nombre = async (req, res) => {
  try {
    const { Nombre } = req.body;
    const sql = "select * from  areas  where nombre=$1";
    const result = await pool.query(sql, [Nombre]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en la actualizacion de areas" });
  }
};

const Listar_Áreas = async (req, res) => {
  try {
    const sql = "select * from areas";
    const result = await pool.query(sql);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al listar todas las Areas registradas" });
  }
};
export { RegistrarArea, ActualizarArea, Listar_Áreas, Buscar_Área_por_Nombre };
