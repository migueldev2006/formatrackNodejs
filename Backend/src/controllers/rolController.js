import {pool} from "../database/db.js";

export const registrarRol = async(req, res) => {
    try {
        const {nombre, estado, fecha_creacion, fecha_actualizacion, fk_usuario} = req.body;
        const sql = `INSERT INTO roles (nombre, estado, fecha_creacion, fecha_actualizacion, fk_usuario) values ($1, $2, $3, $4, $5)`;
        const result = await pool.query(sql, [nombre, estado, fecha_creacion, fecha_actualizacion, fk_usuario]);
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
        const {nombre, estado, fecha_creacion, fecha_actualizacion, fk_usuario} = req.body;
        const sql = `UPDATE roles SET nombre = $1, estado = $2, fecha_creacion = $3, fecha_actualizacion = $4, fk_usuario = $5 WHERE id_rol = $6 `;
        const result = await pool.query(sql, [nombre, estado, fecha_creacion, fecha_actualizacion, fk_usuario, id_rol]);
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
        const {id_rol} = req.params;
        const sql = `UPDATE roles SET estado =         
        CASE 
        WHEN estado = true THEN false
        WHEN estado = false THEN true
        END WHERE id_rol = $1`;
        const result = await pool.query(sql, [id_rol]);
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
        const {nombre} = req.params;
        const sql = "SELECT * FROM roles WHERE nombre = $1";
        const result = await pool.query(sql, [nombre]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay roles registrados con ese nombre"});
        }else{
            return res.status(200).json(result.rows);
        }    } catch (error) {
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