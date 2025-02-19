import {pool} from "../database/db.js";

const Registrar_Sitio = async (req, res) => {
  try {
    const {
      nombre,
      persona_encargada,
      ubicacion,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_tipo_sitio,
      fk_area,
    } = req.body;
    const sql =
      " insert into sitios (nombre,persona_encargada,ubicacion,estado,fecha_creacion,fecha_actualizacion,fk_tipo_sitio,fk_area)  values($1,$2,$3,$4,$5,$6,$7,$8)";
    const result = await pool.query(sql, [
      nombre,
      persona_encargada,
      ubicacion,
      estado,
      fecha_creacion,
      fecha_actualizacion,
      fk_tipo_sitio,
      fk_area,
    ]);
    if (result.rowCount>0) {
        return res.status(201).json({message:"Se registro el sitio correctamente"});
    }else{
        return res.status(400).json({message:"No se registro el sitio"});
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar sitio" });
  }
};

const Actualizar_Sitio = async (req,res)=>{
    try {
        const {nombre,
            persona_encargada,
            ubicacion,
            estado,
            fecha_creacion,
            fecha_actualizacion,
            fk_tipo_sitio,fk_area}= req.body;
        const {id_sitio}= req.params
        const sql="update sitios set  nombre=$1,persona_encargada=$2,ubicacion=$3,estado=$4,fecha_creacion=$5,fecha_actualizacion=$6,fk_tipo_sitio=$7,fk_area=$8 where id_sitio=$9";
        const result = await pool.query(sql,[nombre,
            persona_encargada,
            ubicacion,
            estado,
            fecha_creacion,
            fecha_actualizacion,fk_tipo_sitio,fk_area,id_sitio])

            if (result.rowCount>0) {
                return res.status(201).json({message:"Se actualizar el sitio correctamente"});
            }else{
                return res.status(400).json({message:"No se actualizar el sitio"});
          }
     
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error al actualziar sitios"})
        
    }
}


const Desactivar_Sitio = async (req,res)=>{
    try {
        const {id_sitio}= req.params;
        const sql="update sitios set estado= CASE WHEN estado = false THEN true ELSE false END where id_sitio=$1";
        const result = await pool.query(sql,[id_sitio])
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se desactivo el sitio correctamente"});
        }else{
            return res.status(400).json({message:"No se desactivo el sitio"});
      }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error al desactivar sitio"})
        
    }
}

const Buscar_Sitio_por_nombre = async (req,res)=>{
    try {
        const {nombre} = req.params;
        const sql="select * from sitios where nombre=$1";
        const result = await pool.query(sql,[nombre]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "sitio no existe"});
      }else{
        res.status(200).json(result.rows);
      }
      
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

export { Registrar_Sitio,Actualizar_Sitio,Desactivar_Sitio,Buscar_Sitio_por_nombre,Listar_Sitios};
