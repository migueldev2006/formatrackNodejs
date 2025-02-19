import {pool} from '../database/db.js'

export const registrarMovimientos = async(req, res) => {
    try {
        const {descripcion, cantidad, hora_ingreso, hora_salida, estado, caracterizacion, fecha_movimiento, fecha_actualizacion, fk_usuario, fk_tipo_movimiento, fk_sitio, fk_elemento} = req.body;
        const sql = `INSERT INTO movimientos (descripcion, cantidad, hora_ingreso, hora_salida, estado, caracterizacion, fecha_movimiento, fecha_actualizacion, fk_usuario, fk_tipo_movimiento, fk_sitio, fk_elemento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
        const result = await pool.query(sql, [descripcion, cantidad, hora_ingreso, hora_salida, estado, caracterizacion, fecha_movimiento, fecha_actualizacion, fk_usuario, fk_tipo_movimiento, fk_sitio, fk_elemento]);
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
        const {descripcion, cantidad, hora_ingreso, hora_salida, estado, caracterizacion, fecha_movimiento, fecha_actualizacion, fk_usuario, fk_tipo_movimiento, fk_sitio, fk_elemento} = req.body;
        const sql = `UPDATE movimientos SET descripcion = $1, cantidad = $2, hora_ingreso = $3, hora_salida = $4, estado = $5, caracterizacion = $6, fecha_movimiento = $7, fecha_actualizacion = $8, fk_usuario = $9, fk_tipo_movimiento = $10, fk_sitio = $11, fk_elemento = $12 WHERE id_movimiento = $13`;
        const result = await pool.query(sql, [descripcion, cantidad, hora_ingreso, hora_salida, estado, caracterizacion, fecha_movimiento, fecha_actualizacion, fk_usuario, fk_tipo_movimiento, fk_sitio, fk_elemento, id_movimiento]);
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
        const sql = `UPDATE movimientos 
            SET estado = 
                CASE 
                    WHEN estado = 'Pendiente' THEN 'Aprobado'::estado_movimiento
                END
            WHERE id_movimiento = $1`;
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
        const sql = `UPDATE movimientos 
        SET estado = 
            CASE 
                WHEN estado = 'Pendiente' THEN 'Rechazado'::estado_movimiento
            END
        WHERE id_movimiento = $1`;
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
        const {estado} = req.params;
        const sql = `SELECT * FROM movimientos WHERE estado = $1`;
        const result = await pool.query(sql, [estado]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay movimientos registrados con este estado"});
        }else{
            return res.status(200).json(result.rows);
        }    } catch (error) {
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