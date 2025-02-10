import {pool} from "../database/db.js";

export const registrarUsuarioFicha = async(req, res) => {
    try {
        const {fk_usuario, fk_ficha} = req.body;
        const sql = `INSERT INTO usuario_ficha (fk_usuario, fk_ficha) values ($1, $2)`;
        const result = await pool.query(sql, [fk_usuario, fk_ficha]);
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
        const {fk_usuario, fk_ficha} = req.body;
        const sql = `UPDATE usuario_ficha SET fk_usuario = $1, fk_ficha = $2 WHERE id_usuario_ficha = $3 `;
        const result = await pool.query(sql, [fk_usuario, fk_ficha, id_usuario_ficha]);
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