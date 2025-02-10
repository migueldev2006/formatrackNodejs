import {pool} from "../database/db.js";

export const registrarRol = async(req, res) => {
    try {
        const {Nombre, EStado, fk_usuario} = req.body;
        const sql = `INSERT INTO roles (Nombre, EStado, fk_usuario) values ($1, $2, $3)`;
        const result = await pool.query(sql, [Nombre, EStado, fk_usuario]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Rol registrado exitosamente"});
        } else {
            return res.status(400).json({message:"No fue posible registrar el rol"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const actualizarRol = async(req, res) => {
    try {
        const {id_rol} = req.params;
        const {Nombre, EStado, fk_usuario} = req.body;
        const sql = `UPDATE roles SET Nombre = $1, EStado = $2, fk_usuario = $3 WHERE id_rol = $4 `;
        const result = await pool.query(sql, [Nombre, EStado, fk_usuario, id_rol]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"El rol se ha actualizado correctamente"});
        } else {
            return res.status(400).json({message:"No fue posible actualizar el rol"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const desactivarRol = async(req, res) => {
    try {
        const {id_unidad} = req.params;
        const sql = `UPDATE roles SET estado =         
        CASE 
        WHEN estado = true THEN false
        WHEN estado = false THEN true
        END WHERE id_unidad = $1`;
        const result = await pool.query(sql, [id_unidad]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"el rol se ha desactivado correctamente"})
        } else {
            return res.status(400).json({message:"No fue posible desactivar el rol"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const buscarRol = async(req, res) => {
    try {
        const {Persona_Asignada, Fecha} = req.body;
        const sql = `SELECT * FROM roles WHERE nombre = $1`;
        const result = await pool.query(sql, [Persona_Asignada, Fecha]);
        return res.status(201).json({rol:result})
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const listarRoles = async(req, res) => {
    try {
        const sql = `SELECT * FROM roles`;
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