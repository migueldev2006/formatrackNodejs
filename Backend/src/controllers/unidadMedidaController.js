import {pool}  from '../database/db.js';

export const resgistrarUnidadMedida = async(req, res) => {
    try {
        const {Nombre, Estado, Fecha_Creacion, Fecha_Actualizacion} = req.body;
        const sql = `INSERT INTO unidades_medida (nombre, estado, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, $3, $4)`;
        const result = await pool.query(sql, [Nombre, Estado, Fecha_Creacion, Fecha_Actualizacion]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha registrado la unidad correctamente"})
        } else {
            return res.status(400).json({message:"No fue posible registrar la unidad"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}
export const actualizarUnidadMedida = async(req, res) => {
    try {
        const {id_unidad} = req.params;
        const {Nombre, Estado, Fecha_Creacion, Fecha_Actualizacion} = req.body;
        const sql = `UPDATE unidades_medida SET nombre = $1, estado = $2, fecha_creacion = $3, fecha_actualizacion = $4 WHERE id_unidad = 5`;
        const result = await pool.query(sql, [Nombre, Estado, Fecha_Creacion, Fecha_Actualizacion, id_unidad]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha actualizado la unidad correctamente"})
        } else {
            return res.status(400).json({message:"No fue posible actualizar la unidad"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}
export const desactivarUnidadMedida = async(req, res) => {
    try {
        const {id_unidad} = req.params;
        const sql = `UPDATE unidades_medida SET estado =         
        CASE 
        WHEN estado = true THEN false
        WHEN estado = false THEN true
        END WHERE id_unidad = $1`;
        const result = await pool.query(sql, [id_unidad]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha desactivado la unidad correctamente"})
        } else {
            return res.status(400).json({message:"No fue posible desactivar la unidad"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const buscarUnidadMedida = async(req, res) => {
    try {
        const {Nombre, Estado} = req.body
        const sql = `SELECT * FROM unidades_medida WHERE nombre = $1 || estado = $2`;
        const result = await pool.query(sql,[Nombre, Estado]);
        return res.status(201).json({unidad:result})
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}
export const listarUnidadMedida = async(req, res) => {
    try {
        const sql = `SELECT * FROM unidades_medida`;
        const result = await pool.query(sql);
        if (result.rowCount === 0) {
            return res.status(200).json([])
        } else {
            return res.status(200).json(result.rows);
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}