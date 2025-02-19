import { pool } from "../database/db.js";

export const registrarSolicitudes = async(req, res) => {
    try {
        const {descripcion, cantidad, estado, fecha_solicitud, fecha_actualizacion, fk_elemento, fk_usuario} = req.body;
        const sql = `INSERT INTO solicitudes (descripcion, cantidad, estado, fecha_solicitud, fecha_actualizacion, fk_elemento, fk_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const result = await pool.query(sql, [descripcion, cantidad, estado, fecha_solicitud, fecha_actualizacion, fk_elemento, fk_usuario]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Solicitud registrada exitosamente"})
        } else {
            return res.status(400).json({message:"No se logro realizar la solicitud"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema");
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const actualizarSolicitudes = async(req, res) => {
    try {
        const {id_solicitud} = req.params
        const {descripcion, cantidad, estado, fecha_solicitud, fecha_actualizacion, fk_elemento, fk_usuario} = req.body;
        const sql = `UPDATE solicitudes SET descripcion = $1, cantidad = $2, estado = $3, fecha_solicitud = $4, fecha_actualizacion = $5, fk_elemento = $6, fk_usuario = $7 WHERE id_solicitud = $8 `;
        const result = await pool.query(sql, [descripcion, cantidad, estado, fecha_solicitud, fecha_actualizacion, fk_elemento, fk_usuario, id_solicitud]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Solicitud actualizada exitosamente"})
        } else {
            return res.status(400).json({message:"No se logro actualizar la solicitud"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const aceptarSolicitudes = async(req, res) => {
    try {
        const {id_solicitud} = req.params;
        const sql = `UPDATE solicitudes 
            SET estado = 
                CASE 
                    WHEN estado = 'En Proceso' THEN 'Aceptada'::estado_solicitud
                END
            WHERE id_solicitud = $1`;
        const result = await pool.query(sql, [id_solicitud]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"La solicitud ha sido aceptada"})
        } else {
            return res.status(400).json({message:"No fue posible aceptar la solicitud"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const rechazarSolicitudes = async(req, res) => {
    try {
        const {id_solicitud} = req.params;
        const sql = `UPDATE solicitudes 
            SET estado = 
                CASE 
                    WHEN estado = 'En Proceso' THEN 'Cancelada'::estado_solicitud
                END
            WHERE id_solicitud = $1`;
        const result = await pool.query(sql, [id_solicitud]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"La solicitud ha sido rechazada"})
        } else {
            return res.status(400).json({message:"No fue posible rechazar la solicitud"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const buscarSolicitudes = async(req, res) => {
    try {
        const {estado} = req.params;
        const sql = `SELECT * FROM solicitudes WHERE estado = $1`;
        const result = await pool.query(sql, [estado]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay solicitudes registrados con este estado"});
        }else{
            return res.status(200).json(result.rows);
        }    } catch (error) {
        console.log("Error al consultar en el sistema");
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const listarSolicitudes = async(req, res) => {
    try {
        const sql = `SELECT * FROM solicitudes ORDER BY fecha_solicitud DESC`;
        const result =  await pool.query(sql);
        if (result.rowCount === 0) {
            return res.status(200).json([])
        } else {
            return res.status(200).json(result.rows);
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:" Error al consultar en el sistema"});
    }

}

export const actualizarStockSolicitud = async (req, res) => {
    try {
        const { id_solicitud } = req.params;

        if (!id_solicitud) {
            return res.status(400).json({ message: "El id_solicitud es obligatorio." });
        }

        const sql = `CALL actualizar_stock_solicitud($1)`;
        await pool.query(sql, [id_solicitud]);

        return res.status(200).json({ message: "Stock actualizado correctamente." });

    } catch (error) {
        console.error("Error al actualizar stock de la solicitud:", error.message);
        return res.status(500).json({ message: "Error al actualizar el stock de la solicitud." });
    }
}