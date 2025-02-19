import {pool} from "../database/db.js";

export const registrarVerificacion = async(req, res) => {
    try {
        const {persona_encargada, persona_asignada, hora_ingreso, hora_fin, fecha_verificacion, fecha_actualizacion, fk_inventario} = req.body;
        const sql = `INSERT INTO verificaciones (persona_encargada, persona_asignada, hora_ingreso, hora_fin, fecha_verificacion, fecha_actualizacion, fk_inventario) values ($1, $2, $3, $4, $5, $6, $7)`;
        const result = await pool.query(sql, [persona_encargada, persona_asignada, hora_ingreso, hora_fin, fecha_verificacion, fecha_actualizacion, fk_inventario]);
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
        const {persona_encargada, persona_asignada, hora_ingreso, hora_fin, fecha_verificacion, fecha_actualizacion, fk_inventario} = req.body;
        const sql = `UPDATE verificaciones SET persona_encargada = $1, persona_asignada = $2, hora_ingreso = $3, hora_fin = $4, fecha_verificacion = $5, fecha_actualizacion = $6, fk_inventario = $7 WHERE id_verificacion = $8 `;
        const result = await pool.query(sql, [persona_encargada, persona_asignada, hora_ingreso, hora_fin, fecha_verificacion, fecha_actualizacion, fk_inventario, id_verificacion]);
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
        const {fecha_verificacion} = req.params;
        const sql = `SELECT * FROM verificaciones WHERE fecha_verificacion = $1`;
        const result = await pool.query(sql, [fecha_verificacion]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay verificaciones registrados es esta fecha"});
        }else{
            return res.status(200).json(result.rows);
        }    } catch (error) {
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