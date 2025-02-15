import {pool} from '../database/db.js'


//Registrar Tipo de Sitio

const registrar = async(req,res) =>{
    try{
        const {nombre,estado, fecha_creacion,fecha_actualizacion} = req.body
        const sql = "INSERT INTO tipo_sitios(nombre,estado,fecha_creacion,fecha_actualizacion) VALUES($1,$2,$3,$4)"
        const result = await pool.query(sql,[nombre,estado,fecha_creacion,fecha_actualizacion])
        return res.status(200).json({msg:"Tipo de sitio registrado exitosamente"})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Error registrando Tipo de sitio"})
    }
}

//Actualizar Tipo de Sitio

const actualizar = async(req,res) => {
    try{
        const {id} = req.params
        const {nombre,estado, fecha_creacion,fecha_actualizacion} = req.body
        const sql = `UPDATE tipo_sitios SET nombre = $1,estado = $2, fecha_creacion = $3,fecha_actualizacion = $4 WHERE id_tipo = $5 `
        const result = await pool.query(sql,[nombre,estado,fecha_creacion,fecha_actualizacion,id])
        return res.status(200).json({msg:"Actualizado con exito"})
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error actualizando"})
    }
}

//Desactivar Tipo de Sitio

const cambiaEstado = async(req,res) =>{  
    try{
        const { id } = req.params
        const sql = `UPDATE tipo_sitios SET estado =
        CASE 
        WHEN estado = true THEN false
        WHEN estado = false THEN true
        END
        WHERE id_tipo = $1`
        const result = await pool.query(sql,[id] )
        res.status(200).json({ msg: "Estado actualizado con exito" })

    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error cambiando el estado"})
    }
}

//Buscar Tipo de Sitio por Nombre

const buscarTipoSitio = async(req,res) =>{
    try{
        const {nombre} = req.params
        const sql = `SELECT * FROM tipo_sitios WHERE nombre = $1`
        const result = await pool.query(sql,[nombre])
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: `No se encontró ningún tipo de sitio con el nombre: ${nombre}` });
        }
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error buscando tipoSitio"})
    }
}

//Listar Tipos de Sitios

const getAll = async(req,res) =>{
    try{
        const sql = "SELECT * FROM tipo_sitios"
        const result = await pool.query(sql)
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error obteniendo los tipos de sitios"})
    }
}


export {registrar,actualizar,cambiaEstado,buscarTipoSitio,getAll}
