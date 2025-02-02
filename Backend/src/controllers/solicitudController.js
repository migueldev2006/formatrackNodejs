import { pool } from "../database/db.js";

export const registrarSolicitudes = async(req, res) => {
    try {
        const {Descripcion, fecha, fk_elemento, fk_usuario} = req.body;
        const sql = `INSERT INTO solicitudes (descripcion, fecha, fk_elemento, fk_usuario) VALUES ($1, $2, $3)`;
        const result = await pool.query(sql, [Descripcion, fecha, fk_elemento, fk_usuario]);
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
        const {Descripcion, fk_elemento, fk_usuario} = req.body;
        const sql = `UPDATE verificaciones SET descripcion = $1, fecha = $2, fk_elemento = $3, fk_usuario = $4 WHERE id_solicitud = $5 `;
        const result = await pool.query(sql, [Descripcion, fk_elemento, fk_usuario, id_solicitud]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Solicitud actualizada exitosamente"})
        } else {
            return res.status(400).json({message:"No se logro actualizar la solicitud"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema");
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const rechazarSolicitudes = async(req, res) => {
    try {
        const {id_solicitud} = req.params;
        const sql = `UPDATE solicitudes SET estado = 'Cancelada' WHERE id_solicitud = $1 and estado = 'En Proceso'`;
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

export const aceptarSolicitudes = async(req, res) => {
    try {
        const {id_solicitud} = req.params;
        const sql = `UPDATE solicitudes SET estado = 'Aceptada' WHERE id_solicitud = $1 and estado = 'En Proceso'`;
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

export const buscarSolicitudes = async(req, res) => {
    try {
        const {id_solicitud} = req.params;
        const {fecha} = req.body;
        const sql = `SELECT * FROM solicitudes WHERE id_solicitud = 1 || fecha = $2`;
        const result = await pool.query(sql, [fecha, id_solicitud]);
        return res.status(201).json({solicitud:result})
    } catch (error) {
        console.log("Error al consultar en el sistema");
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const listarSolicitudes = async(req, res) => {
    try {
        const sql = `SELECT * FROM solicitudes WHERE fecha = $1 ORDER BY fecha DESC`;
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