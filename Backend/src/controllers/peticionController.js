import {pool} from '../database/db.js';

export const registrarPeticiones = async(req, res) => {
    try {
        const {Nombre_Solicitante, Fecha, Estado, Cantidad, fk_usuario, fk_elemento} = req.body;
        const sql = `INSERT INTO peticiones (nombre_solicitante, fecha, estado, cantidad, fk_usuario, fk_elemento) VALUES ($1, $2, $3, $4, $5, $6)`;
        const result = await pool.query(sql, [Nombre_Solicitante, Fecha, Estado, Cantidad, fk_usuario, fk_elemento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Peticion realizada exitosamente"});
        } else {
            return res.status(400).json({message:"No fue posible realizar a peticion"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const actualizarPeticiones = async(req, res) => {
    try {
        const {id_peticion} = req.params;
        const {Nombre_Solicitante, Fecha, Estado, Cantidad, fk_usuario, fk_elemento} = req.body
        const sql = `UPDATE peticiones SET nombre_solicitante = $1, fecha = $2, estado = $3, cantidad = $4, fk_usuario = $5, fk_elemento = $6 WHERE id_peticion = $7`
        const result = await pool.query(sql, [Nombre_Solicitante, Fecha, Estado, Cantidad, fk_usuario, fk_elemento, id_peticion]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Peticion actualizada correctamente"})
        } else {
            return res.status(400).json({message:"No fue posible actualizar a peticion"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const rechazarPeticiones = async(req, res) => {
    try {
        const {id_peticion} = req.params;
        const sql = `UPDATE peticiones SET estado = 'Rechazado' WHERE id_peticion = $1 and estado = 'Pendiente'`;
        const result = await pool.query(sql, [id_peticion]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"La peticion ha sido rechazada"})
        } else {
            return res.status(400).json({message:"No fue posible rechazar la peticion"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const aceptarPeticiones = async(req, res) => {
    try {
        const {id_peticion} = req.params;
        const sql = `UPDATE peticiones SET estado = 'Aceptado' WHERE id_peticion = $1 and estado = 'Pendiente'`;
        const result = await pool.query(sql, [id_peticion]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"La peticion ha sido aceptada"})
        } else {
            return res.status(400).json({message:"No fue posible aceptar la peticion"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const buscarPeticiones = async(req, res) => {
    try {
        const {Nombre_Solicitante, Fecha} = req.body;
        const sql = `SELECT * FROM peticiones WHERE nombre_solicitante = $1 || fecha = $2`
        const result = await pool.query(sql, [Nombre_Solicitante, Fecha]);
        return res.status(201).json({message:result})
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const listarPeticiones = async(req, res) => {
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