import {pool} from '../database/db.js'

export const registrarMovimientos = async(req, res) => {
    try {
        const {Descripcion, Cantidad, Fecha, Hora_Ingreso, Hora_Salida, Estado, Caracterizacion, fk_Usuario, fk_Tipo_Movimiento, fk_sitio} = req.body;
        const sql = `INSERT INTO movimientos (descripcion, cantidad, fecha, hora_ingreso, hora_salida, estado, caracterizacion, fk_usuario, fk_tipo_movimiento, fk_sitio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        const result = await pool.query(sql, [Descripcion, Cantidad, Fecha, Hora_Ingreso, Hora_Salida, Estado, Caracterizacion, fk_Usuario, fk_Tipo_Movimiento, fk_sitio]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha resgistrado el movimiento correctamente"})
        } else {
            return res.status(400).json({message:"No se logro registrar el movimiento"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const actualizarMovimientos = async(req, res) => {
    try {
        const {id_movimiento} = req.params;
        const {Descripcion, Cantidad, Fecha, Hora_Ingreso, Hora_Salida, Estado, Caracterizacion, fk_Usuario, fk_Tipo_Movimiento, fk_Sitio} = req.body;
        const sql = `UPDATE movimientos SET descripcion = $1, cantidad = $2, fecha = $3, hora_ingreso = $4, hora_salida = $5, estado = $6, caracterizacion = $7, fk_usuario = 8, fk_tipo_movimiento = $9, fk_sitio = $10 WHERE id_movimiento = $11`;
        const result = await pool.query(sql, [Descripcion, Cantidad, Fecha, Hora_Ingreso, Hora_Salida, Estado, Caracterizacion, fk_Usuario, fk_Tipo_Movimiento, fk_Sitio, id_movimiento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Movimiento actualizado"})
        } else {
            return res.status(400).json({message:"Fallo la actualizacion del movimeiento"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const aceptarMovimientos = async(req, res) => {
    try {
        const {id_movimiento} = req.params;
        const sql = `UPDATE movimientos SET estado = 'Aceptado' WHERE id_movimiento = $1 and estado = 'Pendiente' RETURNING id_movimiento`;
        const result = await pool.query(sql, [id_movimiento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Su movimiento ha sido aceptado"})
        } else {
            return res.status(400).json({message:"No se ha aceptado el movimiento"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const cancelarMovimientos = async(req, res) => {
    try {
        const {id_movimiento} = req.params;
        const sql = `UPDATE movimientos SET estado = 'Rechazado' WHERE id_movimiento = $1 and estado = 'Pendiente' RETURNING id_movimiento`;
        const result = await pool.query(sql, [id_movimiento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha rechazado el movimiento correctamente"})
        } else {
            return res.status(400).json({message:"No se logro rechazar el movimiento"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const buscarMovimientos = async(req, res) => {
    try {
        const {Fecha, Estado, Caracterizacion} = req.body;
        const sql = `SELECT * FROM movimientos WHERE fecha = $1 || estado = $2 || caracterizacion = $3`;
        const result = await pool.query(sql, [Fecha, Estado, Caracterizacion]);
        return res.status(201).json({Movimiento:result});
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const listarMovimientos = async(req, res) => {
    try {
        const sql = `SELECT * FROM movimientos`
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