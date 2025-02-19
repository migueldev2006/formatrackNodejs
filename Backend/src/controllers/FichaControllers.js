import {pool} from "../database/db.js";

const Registrar_Ficha = async (req, res) => {
  try {
    const {
      codigo_ficha,
      persona_encargada,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_programa,
    } = req.body;
    const sql =
      "insert into fichas (codigo_ficha,persona_encargada,estado,fecha_creacion,fecha_actualizacion,fk_programa) values($1,$2,$3,$4,$5,$6)";
    const result = await pool.query(sql, [
      codigo_ficha,
      persona_encargada,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_programa,
    ]);
    if (result.rowCount>0) {
      return res.status(201).json({message:"Se registro la ficha  correctamente"});
  }else{
      return res.status(400).json({message:"No se registro la ficha"});
}

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar fichas" });
  }
};

const Actualizar_Ficha = async (req, res) => {
  try {
    const {
      codigo_ficha,
      persona_encargada,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_programa,
    } = req.body;
    const { id_ficha } = req.params;
    const sql="update fichas set codigo_ficha=$1,persona_encargada=$2,estado=$3,fecha_creacion=$4,fecha_actualizacion=$5,fk_programa=$6 where id_ficha=$7"
    const result = await pool.query(sql, [
      codigo_ficha,
      persona_encargada,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_programa,
      id_ficha,
    ]);
    if (result.rowCount>0) {
      return res.status(201).json({message:"Se actualizar la ficha correctamente"});
  }else{
      return res.status(400).json({message:"No se actualizar la ficha"});
}


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar ficha" });
  }
};



const Buscar_Ficha_por_codigo = async (req,res)=>{
    try {
        const {codigo_ficha} = req.params;
        const sql= "select * from fichas where codigo_ficha=$1"
        const result = await pool.query(sql,[codigo_ficha]);
        if (result.rows.length === 0) {
          return res.status(404).json({ msg: "ficha no existe"});
    }else{
      res.status(200).json(result.rows);
    }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error al buscar ficha por id"})
    }
}


const Listar_Fichas = async (req,res)=>{
    try {
        const sql="select * from Fichas";
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error al listar todas las fichas registradas"})
        
    }
}


const Desactivar_Ficha = async (req,res)=>{
  try {
    const {id_ficha}=req.params;
    const sql="update fichas set estado= CASE WHEN estado= false THEN true ELSE false END where id_ficha=$1"
    const result= await pool.query(sql,[id_ficha])
    if (result.rowCount>0) {
      return res.status(201).json({message:"Se desactivo la ficha correctamente"});
  }else{
      return res.status(400).json({message:"No se desactivo la ficha"});
}


  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Error al desactivar ficha"})
    
  }
}

export { Registrar_Ficha,Actualizar_Ficha,Listar_Fichas,Buscar_Ficha_por_codigo,Desactivar_Ficha };
