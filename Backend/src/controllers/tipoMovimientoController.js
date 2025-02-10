import { pool } from "../database/db.js";

export const registrarTipoMovimiento = async(req, res) => {
    try {
        const {Nombre, Estado, Fecha_Creacion, Fecha_Actualizacion} = req.body;
        const sql = `INSERT INTO tipo_movimientos (nombre, fecha_creacion, fecha_actualizacion) VALUES ($1, $2, $3)`;
        const result = await pool.query(sql, [Nombre, Estado, Fecha_Creacion, Fecha_Actualizacion]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Tipo de movimeiento registrado con exito"});
        } else {
            return res.status(400).json({message:"No  fue posible registrar el tipo de movimiento"});
        }
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const actualizarTipoMovimiento = async(req, res) => {
    try {
        const {id_tipo} = req.params;
        const {Nombre, Estado, Fecha_Creacion, Fecha_Actualizacion} = req.body;
        const sql = `UPDATE tipo_movimientos SET nombre = $1, estado = $2, fecha_creacion = $3, fecha_actualizacion = $4 WHERE id_tipo = $5`;
        const result = await pool.query(sql, [Nombre, Estado, Fecha_Creacion, Fecha_Actualizacion, id_tipo]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Tipo de movimiento actualizado"});
        } else {
            return res.status(400).json({message:"No se logro realizar la actualizacion"});
        }
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const desactivarTipoMovimiento = async(req, res) => {
    try {
        const {id_tipo} = req.params;
        const sql = `UPDATE tipo_movimientos SET estado =    
        CASE 
        WHEN estado = true THEN false
        WHEN estado = false THEN true
        END WHERE id_tipo = $1 `;
        const result = await pool.query(sql, [id_tipo]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Tipo de movimiento desctivado exitosamente"});
        } else {
            return res.status(400).json({message:" No se logro desactivar el tipo de movimeinto"});
        }
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const buscarTipoMovimiento = async(req, res) => {
    try {
        const sql = `SELECT * FROM tipo_movimientos WHERE fecha = $1 || estado = $2`;
        const result = await pool.query(sql);
        return res.status(201).json({tipoMovimiento:result})
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const listarTipoMovimiento = async(req, res) => {
    try {
        const sql = `SELECT * FROM peticiones`
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