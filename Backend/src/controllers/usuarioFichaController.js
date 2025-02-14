import {pool} from "../database/db.js";

export const registrarUsuarioFicha = async(req, res) => {
    try {
        const {fecha_creacion, fecha_actualizacion, fk_usuario, fk_ficha} = req.body;
        const sql = `INSERT INTO usuario_ficha ( fecha_creacion, fecha_actualizacion, fk_usuario, fk_ficha) values ($1, $2, $3, $4)`;
        const result = await pool.query(sql, [fecha_creacion, fecha_actualizacion, fk_usuario, fk_ficha]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se le ha asignado una ficha al usuario"});
        } else {
            return res.status(400).json({message:"No fue posible realizar la asignacion"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const actualizarUsuarioFicha = async(req, res) => {
    try {
        const {id_usuario_ficha} = req.params;
        const {fecha_creacion, fecha_actualizacion, fk_usuario, fk_ficha} = req.body;
        const sql = `UPDATE usuario_ficha SET fecha_creacion = $1, fecha_actualizacion = $2, fk_usuario = $3, fk_ficha = $4 WHERE id_usuario_ficha = $5 `;
        const result = await pool.query(sql, [fecha_creacion, fecha_actualizacion, fk_usuario, fk_ficha, id_usuario_ficha]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se ha actualizado correctamente"});
        } else {
            return res.status(400).json({message:"No fue posible actualizar la asignacion"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}


export const listarUsariosFichas = async(req, res) => {
    try {
        const sql = `SELECT * FROM usuario_ficha`;
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