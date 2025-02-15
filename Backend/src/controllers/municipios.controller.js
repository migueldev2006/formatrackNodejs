import { pool } from "../database/db.js";

//Registrar municipios

const registrar = async(req,res) =>{
    try{
        const {nombre, departamento,estado,fecha_creacion,fecha_actualizacion} = req.body
        const sql = "INSERT INTO municipios(nombre, departamento,estado,fecha_creacion,fecha_actualizacion) VALUES($1,$2,$3,$4,$5)"
        const result = await pool.query(sql,[nombre,departamento,estado,fecha_creacion,fecha_actualizacion])
        return res.status(200).json({msg:"Municipio registrado exitosamente"})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Error registrando centro"})
    }
}

//Actualizar municipio

const actualizar = async(req,res) =>{
    try{
        const {id} = req.params
        const {nombre,departamento,estado,fecha_creacion,fecha_actualizacion} = req.body
        const sql = `UPDATE municipios SET nombre = $1, departamento = $2, estado = $3, fecha_creacion = $4, fecha_actualizacion = $5 WHERE id_municipio = $6`
        const result = await pool.query(sql,[nombre, departamento,estado,fecha_creacion,fecha_actualizacion,id])
        return res.status(200).json({msg:"Actualizado con exito"})
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error actualizando"})
    }
}

//Desactivar municipio

const cambiaEstado = async (req, res) => { 
    try {
        const { id } = req.params
        const sql = `UPDATE municipios SET estado =
        CASE 
        WHEN estado = true THEN false
        WHEN estado = false THEN true
        END
        WHERE id_municipio = $1`
        const result = await pool.query(sql,[id] )
        res.status(200).json({ msg: "Estado actualizado con exito" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Algo salio mal" })
    }
}


//Buscar municipio por Nombre

const buscarMunicipio = async(req,res) =>{
    try{
        const nombre = req.params.nombre
        const sql = `SELECT * FROM municipios WHERE nombre = $1`
        const result = await pool.query(sql,[nombre])
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: `No se encontró ningún municipio con el nombre: ${nombre}` });
        }
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error buscando municipio"})
    }
}

//Listar municipios

const getAll = async(req,res) =>{
    try{
        const sql = "SELECT * FROM municipios"
        const result = await pool.query(sql)
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error obteniendo los municipios"})
    }
}

export {registrar,actualizar,cambiaEstado,buscarMunicipio,getAll}