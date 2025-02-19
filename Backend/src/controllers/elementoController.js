import {pool} from "../database/db.js";

export const registrarElementos = async(req, res) => {
    try {
        const {codigo_sena, codigo_unpsc, nombre, descripcion, stock, estado, actividad, fecha_creacion, fecha_actualizacion, fk_unidad_medida, fk_categoria} = req.body;
        const sql = 'INSERT INTO elementos(codigo_sena, codigo_unpsc, nombre, descripcion, stock, estado, actividad, fecha_creacion, fecha_actualizacion, fk_unidad_medida, fk_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const result = await pool.query(sql, [codigo_sena, codigo_unpsc, nombre, descripcion, stock, estado, actividad, fecha_creacion, fecha_actualizacion, fk_unidad_medida, fk_categoria]);
        if(result.rowCount>0){
            return res.status(201).json({message:"El elemento se ha registrado correctamente"});
        }else{
            return res.status(400).json({message:"No fue posible registrar el usuario"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema"+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
    
}

export const actualizarElementos = async(req, res) => {
    try {
        const {id_elemento} = req.params
        const {codigo_sena, codigo_unpsc, nombre, descripcion, stock, estado, actividad, fecha_creacion, fecha_actualizacion, fk_unidad_medida, fk_categoria} = req.body;
        const sql = "UPDATE elementos SET codigo_sena = $1, codigo_unpsc = $2, nombre = $3, descripcion = $4, stock = $5, estado = $6, actividad = $7,fecha_creacion = $8, fecha_actualizacion = $9, fk_unidad_medida = $10, fk_categoria = $11 WHERE id_elemento = $12";
        const result = await pool.query(sql, [codigo_sena, codigo_unpsc, nombre, descripcion, stock, estado, actividad, fecha_creacion, fecha_actualizacion, fk_unidad_medida, fk_categoria, id_elemento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Se actualizo el elemento correctamente"});
        }else{
            return res.status(400).json({message:"No se actualizo el elemento"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema: "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const desactivarElementos = async(req, res) =>{
    try {
        const {id_elemento} = req.params;
        const sql = ` UPDATE elementos 
            SET actividad = 
                CASE 
                    WHEN actividad = 'Activo' THEN 'Inactivo'::actividad_elemento
                    WHEN actividad = 'Inactivo' THEN 'Activo'::actividad_elemento
                END
            WHERE id_elemento = $1
        `;
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
        const {nombre} = req.params
        const sql = `SELECT * FROM elementos WHERE nombre = $1`;
        const result = await pool.query(sql, [nombre]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay elementos registrados"});
        }else{
            return res.status(200).json(result.rows);
        }
            
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json("Error al consultar en el sistema");
    }
}

export const listarElementos = async(req, res) => {
    try {
        const sql = `SELECT * FROM elementos`
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