import {pool} from "../../src/database/db.js";


const Registrar_Sede = async (req,res)=>{
    try {
        const {Nombre,Estado,Fecha_Creacion,Fecha_Actualizacion,fk_Centro} = req.body;
        const sql= "insert into sedes (nombre,estado,fecha_creacion,fecha_actualizacion,fk_centro) values($1,$2,$3,$4,$5,$6)";
        const result = await pool.query(sql,[Nombre,Estado,Fecha_Creacion,Fecha_Actualizacion,fk_Centro]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error en el registro de una sede"})
    }
}

const Actualizar_Sede = async (req,res)=>{
    try {
        const {Nombre,Estado,Fecha_Creacion,Fecha_Actualizacion,fk_Centro} = req.body
        const {id_sede}= req.params;
        const sql = "update sedes set  nombre=$1,estado=$2,fecha_creacion=$3,fecha_actualizacion=$4,fk_centro=$5 where id_sede=$6";
        const result = await pool.query(sql,[Nombre,Estado,Fecha_Creacion,Fecha_Actualizacion,fk_Centro,id_sede]);
        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error al actualziar sede"})
        
    }
}


const Buscar_Sede_por_Nombre = async (req,res)=>{
    try {
        const {Nombre} = req.body;
        const sql="select * from sedes where nombre=$1";
        const result = await pool.query(sql,[Nombre]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error al  busqueda sede por nombre"})
    }
}

const Desactivar_Sede = async (req,res)=>{
    try {
        const {id_sede}= req.body;
        const sql=" update sedes set estado=false where id_sede=$1"
        const result = await pool.query(sql,[id_sede])
        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error al desactivar sede"})
        
    }
}

const Listar_Sedes = async (req,res)=>{
    try {
        const sql="select * from sedes";
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error al listas sedes"})

        
    }
}


export {Registrar_Sede,Actualizar_Sede,Buscar_Sede_por_Nombre,Listar_Sedes,Desactivar_Sede}