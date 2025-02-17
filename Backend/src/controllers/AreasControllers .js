import { pool } from "../database/db.js";

const RegistrarArea = async (req, res) => {
  try {
    const { nombre, persona_encargada,estado,fecha_creacion,fecha_actualizacion, fk_sede } = req.body;
    const sql =
      "insert into areas (nombre,persona_encargada,estado,fecha_creacion,fecha_actualizacion,fk_sede) Values ($1,$2,$3,$4,$5,$6)";
    const result = await pool.query(sql, [nombre, persona_encargada,estado,fecha_creacion,fecha_actualizacion, fk_sede]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al regsitrar area" });
  }
};

const ActualizarArea = async (req, res) => {
  try {
    const { nombre, persona_encargada,estado,fecha_creacion,fecha_actualizacion, fk_sede  } = req.body;
    const { id_Area } = req.params;
    const sql =
      "update areas set nombre=$1,persona_encargada=$2,estado=$3,fecha_creacion=$4,fecha_actualizacion=$5,fk_sede=$6 where id_area=$7";
    const result = await pool.query(sql, [
      nombre,
      persona_encargada,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_sede,
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
    const { nombre } = req.params;
    const sql = "select * from  areas  where nombre=$1";
    const result = await pool.query(sql, [nombre]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en al buscar  areas  por nombre" });
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

const Desactivar_Area = async (req,res)=>{
  try {
    const {id_Area}=req.params;
    const sql="update areas set estado= CASE WHEN estado= false THEN true ELSE false END where id_area=$1"
    const result= await pool.query(sql,[id_Area])
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Error al desactivar area"})
    
  }
};





export { RegistrarArea, ActualizarArea, Listar_Áreas, Buscar_Área_por_Nombre,Desactivar_Area };
