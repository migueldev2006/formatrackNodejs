import {pool} from '../database/db.js'


//Registrar Centro

const registrar = async(req,res) =>{
    try{
        const {nombre,estado, fecha_creacion,fecha_actualizacion,fk_municipio} = req.body
        const sql = "INSERT INTO centros(nombre,estado, fecha_creacion,fecha_actualizacion,fk_municipio) VALUES($1,$2,$3,$4,$5)"
        const result = await pool.query(sql,[nombre,estado, fecha_creacion,fecha_actualizacion,fk_municipio])
        return res.status(200).json({msg:"Centro registrado exitosamente"})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Error registrando centro"})
    }
}

//Actualizar Centro

const actualizar = async(req,res) =>{
    try{
        const {id} = req.params
        const {nombre,estado, fecha_creacion,fecha_actualizacion,fk_municipio} = req.body
        const sql = `UPDATE centros SET nombre = $1, estado = $2, fecha_creacion = $3, fecha_actualizacion = $4, fk_municipio = $5 WHERE id_centro = $6 `
        const result = await pool.query(sql,[nombre,estado, fecha_creacion,fecha_actualizacion,fk_municipio,id])
        return res.status(200).json({msg:"Actualizado con exito"})
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error actualizando"})
    }
}

//Desactivar Centro

const cambiaEstado = async(req,res) =>{ //Probar bien 
    try{
        const { id } = req.params
        const sql = `UPDATE centros SET estado =
        CASE 
        WHEN estado = true THEN false
        WHEN estado = false THEN true
        END
        WHERE id_centro = $1`
        const result = await pool.query(sql,[id] )
        res.status(200).json({ msg: "Estado actualizado con exito" })

    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error cambiando el estado"})
    }
}

//Buscar Centro por Nombre

const buscarCentro = async(req,res) =>{
    try{
        const nombre = req.params.nombre
        const sql = `SELECT * FROM centros WHERE nombre = $1`
        const result = await pool.query(sql,[nombre])
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: `No se encontró ningún centro con el nombre: ${nombre}` });
        }
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error buscando centro"})
    }
}

//Listar Centros

const getAll = async(req,res) =>{
    try{
        const sql = "SELECT * FROM centros"
        const result = await pool.query(sql)
        return res.status(200).json(result.rows)
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:"Error obteniendo los centros"})
    }
}

export {registrar,actualizar,cambiaEstado,buscarCentro,getAll}