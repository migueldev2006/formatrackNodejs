import { pool } from "../database/db.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, img, cb) {
      cb(null, "public/img");
    },
    filename: function (req, img, cb) {
      cb(null, img.originalname);
    },
  });
  
  const upload = multer({storage:storage});
  
  export const cargarImagen = upload.single('img');

export const registrarInventarios = async(req, res) => {
    try {
        const {Valor, Costo, Descripcion, Stock, Estado, Fecha_Creacion, Fecha_Actualizacion, fk_sitio, fk_elemento} = req.body;
        let Imagen_Elemento = req.file.originalname;
        const sql = `INSERT INTO tipo_movimientos (valor, costo, descripcion, stock, estado, fecha_creacion, fecha_actualizacion, imagen_elemento, fk_sitio, fk_elemento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        const result = await pool.query(sql, [Valor, Costo, Descripcion, Stock, Estado, Fecha_Creacion, Fecha_Actualizacion, Imagen_Elemento, fk_sitio, fk_elemento]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Tipo de movimeiento registrado con exito"});
        } else {
            return res.status(400).json({message:"No fue posible registrar el tipo de movimiento"});
        }
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const actualizarInventarios = async(req, res) => {
    try {
        const {id_inventario} = req.params;
        const {Valor, Costo, Descripcion, Stock, Estado, Fecha_Creacion, Fecha_Actualizacion, fk_sitio, fk_elemento} = req.body;
        const sql = `UPDATE tipo_movimientos SET valor = $1, costo = $2, descripcion = $3, stock = $4, estado = $5, fecha_creacion = $6, fecha_actualizacion = $7, fk_sitio = $8, fk_elemento = $9 WHERE id_inventario = $10`;
        const result = await pool.query(sql, [Valor, Costo, Descripcion, Stock, Estado, Fecha_Creacion, Fecha_Actualizacion, fk_sitio, fk_elemento, id_inventario]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"Tipo de movimiento actualizado"});
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
        const sql = `UPDATE inventarios SET estado = 'Inactivo' WHERE id_inventario = $1 and estado = 'Activo' RETURNING id_inventario`;
        const result = await pool.query(sql, [id_inventario]);
        if (result.rowCount>0) {
            return res.status(201).json({message:"elemento del inventario desctivado exitosamente"});
        } else {
            return res.status(400).json({message:" No se logro desactivar el elemnto del inventario"});
        }
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al consultar en el sistema"});
    }
}
export const buscarInventarios = async(req, res) => {
    try {
        const sql = `SELECT * FROM inventarios WHERE stock = $1 || estado = $2`;
        const result = await pool.query(sql);
        return res.status(201).json({inventario:result})
    } catch (error) {
        console.log("Eror al consultar en el sistema "+error.message);
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