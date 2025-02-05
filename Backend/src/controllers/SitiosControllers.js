import {pool} from "../database/db.js";

const Registrar_Sitio = async (req, res) => {
  try {
    const {
      Nombre,
      Persona_Encargada,
      Ubicacion,
      Estado,
      Fecha_Creacion,
      Fecha_Actualizacion,
      fk_Tipo_Sitio,
    } = req.body;
    const sql =
      " insert into sitios (nombre,persona_encargada,ubicacion,estado,fecha_creacion,fecha_actualizacion,fk_tipo_sitio)  values($1,$2,$3,$4,$5,$6,$7)";
    const result = await pool.query(sql, [
      Nombre,
      Persona_Encargada,
      Ubicacion,
      Estado,
      Fecha_Creacion,
      Fecha_Actualizacion,
      fk_Tipo_Sitio,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar sitio" });
  }
};

const Actualizar_Sitio = async (req,res)=>{
    try {
        const {Nombre,
            Persona_Encargada,
            Ubicacion,
            Estado,
            Fecha_Creacion,
            Fecha_Actualizacion,
            fk_Tipo_Sitio,}= req.body;
        const {id_sitio}= req.params
        const sql="update sitios set  nombre=$1,persona_encargada=$2,ubicacion=$3,estado=$4,fecha_creacion=$5,fecha_actualizacion=$6,fk_tipo_sitio=$7 where id_sitio=$8";
        const result = await pool.query(sql,[Nombre,
            Persona_Encargada,
            Ubicacion,
            Estado,
            Fecha_Creacion,
            Fecha_Actualizacion,fk_Tipo_Sitio,id_sitio])
            res.status(200).json(result.rows);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error al actualziar sitios"})
        
    }
}


const Desactivar_Sitio = async (req,res)=>{
    try {
        const {id_sitio}= req.body;
        const sql="update sitios set sstado= false where id_sitio=$1";
        const result = await pool.query(sql,[id_sitio])
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error al desactivar sitio"})
        
    }
}

const Buscar_Sitio_por_Nombre = async (req,res)=>{
    try {
        const {Nombre} = req.body;
        const sql="select * from sitios where nombre=$1";
        const result = await pool.query(sql,[Nombre]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).josn({message:"Error al buscar sitio por nombre"})
        
    }
}

const Listar_Sitios = async (req,res)=>{
    try {
        const sql="select * from sitios";
        const result = await pool.query(sql);
        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error al listar sitios"})
        
    }
}

export { Registrar_Sitio,Actualizar_Sitio,Desactivar_Sitio,Buscar_Sitio_por_Nombre,Listar_Sitios};
