import {pool} from "../database/db.js";

const Registrar_Programas_de_Formación = async (req, res) => {
  try {
    const { nombre,estado, fecha_creacion, fecha_actualizacion, fk_area } = req.body;
    const sql =
      "insert into programas_formacion (nombre,estado,fecha_creacion,fecha_actualizacion,fk_area) values($1,$2,$3,$4,$5)";
    const result = await pool.query(sql, [
      nombre,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_area,
    ]);
    if (result.rowCount>0) {
      return res.status(201).json({message:"Se registro el programa correctamente"});
  }else{
      return res.status(400).json({message:"No se registro el programa"});
}
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al registrar programas de formacion" });
  }
};
const Actualizar_Programas_de_Formación = async (req, res) => {
  try {
    const { nombre,estado, fecha_creacion, fecha_actualizacion, fk_area } = req.body;
    const { id_programa } = req.params;
    const sql =
      "update programas_formacion set nombre=$1,estado=$2, fecha_creacion=$3, fecha_actualizacion=$4, fk_area=$5 where id_programa=$6";
    const result = await pool.query(sql, [
      nombre,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_area,
      id_programa,
    ]);
    if (result.rowCount>0) {
      return res.status(201).json({message:"Se actualizar el programa correctamente"});
  }else{
      return res.status(400).json({message:"No se actualizar el programa"});
}

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al actualizar programas de formacion" });
  }
};


const Desactivar_Programas_de_Formación = async (req, res) => {
    try {
        const {id_programa} = req.params;
        const sql= "update programas_formacion set estado= CASE WHEN estado = false THEN true ELSE false END   where id_programa=$1"
        const result= await pool.query(sql,[id_programa]) 

        if (result.rowCount>0) {
          return res.status(201).json({message:"Se desactivo el programa correctamente"});
      }else{
          return res.status(400).json({message:"No se desactivo el programa"});
    }

    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Error al desactivas programa de fromacion"})
        
    }
    
};



const Buscar_Programa_de_Formación_por_Nombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const sql = "select * from programas_formacion where nombre=$1";
    const result = await pool.query(sql, [nombre]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "programa  no existe"});
}else{
  res.status(200).json(result.rows);
}
   
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
