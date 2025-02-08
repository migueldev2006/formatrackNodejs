import {pool} from "../database/db.js";

export const registrarElementos = async(req, res) => {
    try {
        const {Codigo_SENA, Codigo_UNPSC, Nombre, Descripcion, Stock, Estado, Actividad, fk_unidad_medida, fk_movimiento, fk_categoria} = req.body;
        const sql = 'INSERT INTO elementos(codigo_SENA, codigo_UNPSC, nombre, descripcion, stock, estado, actividad, fk_unidad_medidad, fk_movimiento, fk_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const result = await pool.query(sql, [Codigo_SENA, Codigo_UNPSC, Nombre, Descripcion, Stock, Estado, Actividad, fk_unidad_medida, fk_movimiento, fk_categoria]);
        if(result.rowCount>0){
            return res.status(201).json({message:"El usuario se ha registrado correctamente"});
        }else{
            return res.status(400).json({message:"No fue posible registrar el usuario"});
        }
    } catch (e) {
        console.log("Error al consultar en el sistema"+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
    
}

export const actualizarElementos = async(req, res) => {
    try {
        const {id_elemento} = req.params
        const {Codigo_SENA, Codigo_UNPSC, Nombre, Descripcion, Stock, Estado, Actividad, fk_unidad_medidad, fk_movimiento, fk_categoria} = req.body;
        const sql = "UPDATE elementos SET codigo_SENA = $1, codigo_UNPSC = $2, nombre = $3, descripcion = 4, stock = $5, estado = $6, actividad = $7 fk_unidad_medidad = $8, fk_movimiento = $9, fk_categoria = $10 WHERE id_elemento = $11";
        const result = await pool.query(sql, [Codigo_SENA, Codigo_UNPSC, Nombre, Descripcion, Stock, Estado, Actividad, fk_unidad_medidad, fk_movimiento, fk_categoria, id_elemento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se actualizo el elemento correctamente"});
        }else{
            return res.status(400).json({message:"No se actualizo el elemento"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema"+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const desactivarElementos = async(req, res) =>{
    try {
        const {id_elemento} = req.params;
        const sql = `UPDATE elementos SET actividad = 'Inactivo' WHERE id_elemento = $1 and actividad = 'Activo'`;
        const result = await pool.query(sql, [id_elemento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"El elemento ha sido desactivado exitosamente"})
        } else {
            return res.status(400).json({message:"No se logro desactivar el articulo"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"})
    }
}

export const buscarElementos = async(req, res) => {
    try {
        const {id_elemento} = req.params
        const {Nombre} = req.body
        const sql = `SELECT * FROM elementos WHERE id_elemento = $1 || nombre = $2`;
        const result = await pool.query(sql, [Nombre, id_elemento]);
            return res.status(201).json({elemento:result});
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json("Error al consultar en el sistema");
    }
}

export const eliminarElementos = async(req, res) => {
    try {
        const {id_elemento} = req.params;
        const sql = `DELETE FROM elementos WHERE id_elemento = $1`;
        const result = await pool.query(sql, [id_elemento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Elemento eliminado correctamente"});
        } else {
            return res.status(400).json({message:"No fue posible eliminar el elemento"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(201).json({message:"Error al consultar en el sistema"});
    }
}

export const listarElementos = async(req, res) => {
    try {
        const sql = `SELECT * FROM elementos`;
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