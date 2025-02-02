import { pool } from '../database/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//Iniciar Sesion

const login = async (req, res) => {
    try {
        const { documento, contraseña } = req.body;
        const sql = 'SELECT * FROM usuarios WHERE documento = $1';
        const result = await pool.query(sql, [documento]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        const user = result.rows[0];
        const verified = await bcrypt.compare(contraseña, user.contraseña)
        if (verified) {
            const token = jwt.sign(user, process.env.AUT_SECRET)
            return res.status(200).json({ token })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error logueandose" })
    }
}

//Cerrar Sesion

export const blacklist = new Set();

const listedBlack = (token) =>{
    return blacklist.has(token);
}

const logout = async(req,res) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "Token no enviado" })
        } 

        if(token){
            blacklist.add(token);
        }

        console.log(listedBlack(token))

        res.status(200).json({msg:"Sesion cerrada"});
    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Error cerrando sesion"})
    }
}

// Registrar Ususario

const registrar = async (req, res) => {
    try {
        const { documento, nombre, edad, telefono, correo, cargo, contraseña, estado, fechaRegistro, fechaActualizacion } = req.body;
        const sql = "INSERT INTO usuarios(documento,nombre,edad,telefono,correo,cargo,contraseña,estado,fecha_registro,fecha_actualizacion) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
        const encryptedPassword = await bcrypt.hash(contraseña, 10);
        const user = await pool.query(sql, [documento, nombre, edad, telefono, correo, cargo, encryptedPassword, estado, fechaRegistro, fechaActualizacion]);
        return res.status(201).json({msg : "Registro exitoso"})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registrando usuario" })
    }
}


//Actualizar Usuario


const actualizar = async (req, res) => {
    try {
        const { nombre, edad, telefono, correo, cargo, contraseña, estado, fechaRegistro, fechaActualizacion } = req.body
        const { id } = req.params
        const sql = "UPDATE usuarios SET nombre = $1,edad = $2,telefono = $3,correo = $4,cargo = $5,contraseña = $6,estado = $7, fecha_registro = $8, fecha_actualizacion = $9 WHERE id_usuario = $10"
        const result = await pool.query(sql, [nombre, edad, telefono, correo, cargo, contraseña, estado, fechaRegistro, fechaActualizacion, id])
        res.status(200).json({ msg: "usuario actualizado con exito" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "error actualizando el usuario" })
    }
}


// Desactivar Usuario


const cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params
        const sql = `UPDATE usuarios SET estado =
        CASE 
        WHEN estado = true THEN false
        WHEN estado = false THEN true
        END
        WHERE id_usuario = $1`
        const result = await pool.query(sql, [id])
        res.status(200).json({ msg: "Estado actualizado con exito" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Algo salio mal" })
    }
}


//Eliminar Usuario


const eliminar = async (req, res) => {
    try {
        const { id } = req.params
        const sql = "DELETE FROM usuarios WHERE id_usuario = $1"
        const result = await pool.query(sql, [id])
        res.status(200).json({ msg: "Eliminado con exito" })
    } catch (error) {
        console.log("error al eliminar" + error.message);
        return res.status(500).json({ status: 500, message: "Error al eliminar" });
    }
}



//Listar Usuarios

const listar = async (req, res) => {
    try {
        const sql = "SELECT * FROM usuarios"
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "no se pudo listar usuarios" })
    }
}


//Buscar usuario por identificacion

const buscarUsuario = async (req, res) => {
    try {
        const { documento } = req.params
        const sql = "SELECT * FROM usuarios WHERE documento = $1"
        const result = await pool.query(sql, [documento]);

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "Usuario no existe" });
        }

        return res.status(200).json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "no se pudo encontrar usuario" })
    }
}




export { login,logout,listedBlack, registrar, actualizar, cambiarEstado, eliminar, listar, buscarUsuario }