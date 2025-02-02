import {pool} from "../../src/database/db.js";

const Registrar_Programas_de_Formación = async (req, res) => {
  try {
    const { Nombre,Estado, Fecha_Creacion, Fecha_Actualizacion, fk_Area } = req.body;
    const sql =
      "insert into programas_formacion (nombre,fecha_creacion,fecha_actualizacion,fk_area) values($1,$2,$3,$4)";
    const result = await pool.query(sql, [
      Nombre,
      Estado,
      Fecha_Creacion,
      Fecha_Actualizacion,
      fk_Area,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al registrar programas de formacion" });
  }
};
const Actualizar_Programas_de_Formación = async (req, res) => {
  try {
    const { Nombre,Estado, Fecha_Creacion, Fecha_Actualizacion, fk_Area } = req.body;
    const { id_programa } = req.params;
    const sql =
      "update programas_formacion set nombre=$1,estado=$2, fecha_creacion=$3, fecha_actualizacion=$4, fk_area=$5 where id_programa=$6";
    const result = await pool.query(sql, [
      Nombre,
      Estado,
      Fecha_Creacion,
      Fecha_Actualizacion,
      fk_Area,
      id_programa,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al actualizar programas de formacion" });
  }
};


const Desactivar_Programas_de_Formación = async (req, res) => {
    try {
        const {id_programa} = req.body
        const sql= "update programas_formacion set estado= false where id_programa=$1"
        const result= await pool.query(sql,[id_programa]) 
        res.status(200).json(result.rows)
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Error al desactivas programa de fromacion"})
        
    }
    
};



const Buscar_Programa_de_Formación_por_Nombre = async (req, res) => {
  try {
    const { Nombre } = req.body;
    const sql = "select * from programas_formacion where nombre=$1";
    const result = await pool.query(sql, [Nombre]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al buscar Programa_Formacion " });
  }
};

const Listar_Programas_de_Formación = async (req, res) => {
  try {
    const sql = "select * from programas_formacion";
    const result = await pool.query(sql);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al listar los Programa_Formacion" });
  }
};

export  {
  Registrar_Programas_de_Formación,
  Actualizar_Programas_de_Formación,
  Desactivar_Programas_de_Formación,
  Buscar_Programa_de_Formación_por_Nombre,
  Listar_Programas_de_Formación,
};
