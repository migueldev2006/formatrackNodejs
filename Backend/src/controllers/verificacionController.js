import {pool} from "../database/db.js";

export const registrarVerificacion = async(req, res) => {
    try {
        const {Persona_Encargada, Persona_Asignada, Fecha, Hora_Ingreso, Hora_Fin, fk_inventario} = req.body;
        const sql = `INSERT INTO verificaciones (persona_encargada, perona_asignada, fecha, hora_ingreso, hora_fin) values ($1, $2, $3, $4, $5)`;
        const result = await pool.query(sql, [Persona_Encargada, Persona_Asignada, Fecha, Hora_Ingreso, Hora_Fin, fk_inventario]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Registro exitoso, Iniciando Verificacion"});
        } else {
            return res.status(400).json({message:"No fue posible iniciar la verificacion"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const actualizarVerificacion = async(req, res) => {
    try {
        const {id_verificacion} = req.params;
        const {Persona_Encargada, Persona_Asignada, Fecha, Hora_Ingreso, Hora_Fin, fk_inventario} = req.body;
        const sql = `UPDATE verificaciones SET persona_encargada = $1, persona_asignada = $2, fecha = $3, hora_ingreso = $4, hora_fin = $5, fk_inventaro = $6 WHERE id_verificacion = $7 `;
        const result = await pool.query(sql, [Persona_Encargada, Persona_Asignada, Fecha, Hora_Ingreso, Hora_Fin, fk_inventario, id_verificacion]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha actualizado correctamente"});
        } else {
            return res.status(400).json({message:"No fue posible actualizar la verificacion"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const buscarVerificacion = async(req, res) => {
    try {
        const {Persona_Asignada, Fecha} = req.body;
        const sql = `SELECT * FROM verificaciones WHERE persona_asignada = $1 || fecha = $2`;
        const result = await pool.query(sql, [Persona_Asignada, Fecha]);
        return res.status(201).json({verificacion:result})
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const listarVerificaciones = async(req, res) => {
    try {
        const sql = `SELECT * FROM verificaciones`;
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