import {pool}  from '../database/db.js';

export const resgistrarUnidadMedida = async(req, res) => {
    try {
        const {nombre, estado} = req.body;
        const sql = `INSERT INTO unidades_medida (nombre, estado) VALUES ($1, $2)`;
        const result = await pool.query(sql, [nombre, estado]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha registrado la unidad correctamente"})
        } else {
            return res.status(400).json({message:"No fue posible registrar la unidad"})
        }
    } catch (error) {
        console.log("Error al registrar una unidad en el sistema "+error.message);
        return res.status(500).json({message:"Error al registrar una unidad en el sistema"})
    }
}
export const actualizarUnidadMedida = async(req, res) => {
    try {
        const {id_unidad} = req.params;
        const {nombre, estado} = req.body;
        const sql = `UPDATE unidades_medida SET nombre = $1, estado = $2 WHERE id_unidad = $3`;
        const result = await pool.query(sql, [nombre, estado, id_unidad]);
        if (result.rowCount>0) {
            return res.status(200).json({message:"Se ha actualizado la unidad correctamente"})
        } else {
            return res.status(400).json({message:"No fue posible actualizar la unidad"})
        }
    } catch (error) {
        console.log("Error al actualizar la unidad en el sistema "+error.message);
        return res.status(500).json({message:"Error al actualizar la unidad en el sistema"})
    }
}
export const cambiarEstadoUnidadMedida = async(req, res) => {
    try {
        const {id_unidad} = req.params;
        const sql = `UPDATE unidades_medida SET estado = CASE WHEN estado = TRUE THEN FALSE WHEN estado = FALSE THEN TRUE END WHERE id_unidad = $1`;
        const result = await pool.query(sql, [id_unidad]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha cambiado el estado de la unidad correctamente"})
        } else {
            return res.status(400).json({message:"No fue posible cambiar el estado de la unidad"})
        }
    } catch (error) {
        console.log("Error al cambiar el estado de la unidad en el sistema "+error.message);
        return res.status(500).json({message:"Error al cambiar el estado de la unidad en el sistema"})
    }
}
//pendiente
export const buscarUnidadMedida = async(req, res) => {
    try {
        const {valor} = req.params
        const sql = `SELECT * FROM unidades_medida WHERE nombre ILIKE $1 OR estado::TEXT ILIKE $1 OR created_at::TEXT ILIKE $1 OR updated_at::TEXT ILIKE $1 OR id_unidad::TEXT ILIKE $1`;
        const values = [`%${valor}%`];
        const result = await pool.query(sql, values);
        if (result.rowCount>0) {
            return res.status(200).json(result.rows)
        } else {
            return res.status(404).json({message:"No hay informacion con la busqueda que tratas de realizar"})
        }
    } catch (error) {
        console.log("Error al buscar en el sistema "+error.message);
        return res.status(500).json({message:"Error al buscar en el sistema"})
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
        console.log("Error al consultar la unidades registradas en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar la unidades registradas en el sistema"});
    }
}