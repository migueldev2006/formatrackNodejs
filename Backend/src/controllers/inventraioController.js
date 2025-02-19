import { pool } from "../database/db.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, img, cb) {
      cb(null, "public/img");
    },
    filename: function (req, img, cb) {
        const imagen_elemento = Date.now() + "-" + img.originalname;
      cb(null, imagen_elemento);
    },
  });
  
  const upload = multer({storage:storage});
  
  export const cargarImagen = upload.single('img');

export const registrarInventarios = async(req, res) => {
    try {
        const {valor, costo, descripcion, stock, estado, fecha_creacion, fecha_actualizacion, fk_sitio, fk_elemento} = req.body;
        const imagen_elemento = req.file.filename;;
        const sql = `INSERT INTO inventarios (valor, costo, descripcion, stock, estado, fecha_creacion, fecha_actualizacion, imagen_elemento, fk_sitio, fk_elemento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        const result = await pool.query(sql, [valor, costo, descripcion, stock, estado, fecha_creacion, fecha_actualizacion, imagen_elemento, fk_sitio, fk_elemento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"El elemnto se ha registrado  en el inventario con exito"});
        } else {
            return res.status(400).json({message:"No fue posible registrar el elemnto en el inventario"});
        }
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const actualizarInventarios = async(req, res) => {
    try {
        const {id_inventario} = req.params;
        const {valor, costo, descripcion, stock, estado, fecha_creacion, fecha_actualizacion, fk_sitio, fk_elemento} = req.body;
        const sqlSelect = `SELECT imagen_elemento FROM inventarios WHERE id_inventario = $1`;
        const resultSelect = await pool.query(sqlSelect, [id_inventario]);
        const imagenActual = resultSelect.rows[0].imagen_elemento;
        let nuevaImagen = imagenActual;
        if (req.file) {
            nuevaImagen = req.file.filename;
        }
        const sql = `UPDATE inventarios SET valor = $1, costo = $2, descripcion = $3, stock = $4, estado = $5, fecha_creacion = $6, fecha_actualizacion = $7, imagen_elemento = $8, fk_sitio = $9, fk_elemento = $10 WHERE id_inventario = $11`;
        const result = await pool.query(sql, [valor, costo, descripcion, stock, estado, fecha_creacion, fecha_actualizacion, nuevaImagen, fk_sitio, fk_elemento, id_inventario]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"El elemento en el inventario ha sido actualizado"});
        } else {
            return res.status(400).json({message:"No se logro realizar la actualizacion"});
        }
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const desactivarInventario = async(req, res) => {
    try {
        const {id_inventario} = req.params;
        const sql = `UPDATE inventarios 
            SET estado = 
                CASE 
                    WHEN estado = 'Activo' THEN 'Inactivo'::estado_inventario
                    WHEN estado = 'Inactivo' THEN 'Activo'::estado_inventario
                END
            WHERE id_inventario = $1`
        const result = await pool.query(sql, [id_inventario]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Elemento del inventario desctivado exitosamente"});
        } else {
            return res.status(400).json({message:" No se logro desactivar el elemento del inventario"});
        }
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const buscarInventarios = async(req, res) => {
    try {
        const {estado} = req.params
        const sql = `SELECT * FROM inventarios WHERE estado = $1`;
        const result = await pool.query(sql, [estado]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No hay elementos registrados en el inventario"});
        }else{
            return res.status(200).json(result.rows);
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}

export const listarInventarios = async(req, res) => {
    try {
        const sql = `SELECT * FROM inventarios`
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