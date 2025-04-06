import {pool} from "../database/db.js";
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

export const registrarElementos = async(req, res) => {
    try {
        const {nombre, descripcion, valor, perecedero, no_perecedero, estado,  fk_unidad_medida, fk_categoria, fk_caracteristica} = req.body;
        const imagen_elemento = req.file.filename;;
        const sql = 'INSERT INTO elementos(nombre, descripcion, valor, perecedero, no_perecedero, estado, imagen_elemento, fk_unidad_medida, fk_categoria, fk_caracteristica) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const result = await pool.query(sql, [nombre, descripcion, valor, perecedero, no_perecedero, estado, imagen_elemento, fk_unidad_medida, fk_categoria, fk_caracteristica]);
        if(result.rowCount>0){
            return res.status(201).json({message:"El elemento se ha registrado correctamente"});
        }else{
            return res.status(400).json({message:"No fue posible registrar el elemento"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema"+error.message);
        return res.status(500).json({message:"Error al agregar un elemento en el sistema"});
    }
    
}

export const actualizarElementos = async(req, res) => {
    try {
        const {id_elemento} = req.params
        const {nombre, descripcion, valor, perecedero, no_perecedero, estado,  fk_unidad_medida, fk_categoria,  fk_caracteristica} = req.body;
        const sqlSelect = `SELECT imagen_elemento FROM inventarios WHERE id_elemento = $1`;
        const resultSelect = await pool.query(sqlSelect, [id_elemento]);
        const imagenActual = resultSelect.rows[0].imagen_elemento;
        let nuevaImagen = imagenActual;
        if (req.file) {
            nuevaImagen = req.file.filename;
        }
        const sql = "UPDATE elementos SET nombre = $1, descripcion = $2, valor = $3, perecedero = $4, no_perecedero = $5, estado = $6, imagen_elemento = $7, fk_unidad_medida = $8, fk_categoria = $9, fk_caracteristica = $10 WHERE id_elemento = $11";
        const result = await pool.query(sql, [nombre, descripcion, valor, perecedero, no_perecedero, estado, nuevaImagen, fk_unidad_medida, fk_categoria, fk_caracteristica, id_elemento]);
        if (result.rowCount>0) {
            return res.status(200).json({message:"Se actualizo el elemento correctamente"});
        }else{
            return res.status(400).json({message:"No se actualizo el elemento"});
        }
    } catch (error) {
        console.log("Error al consultar en el sistema: "+error.message);
        return res.status(500).json({message:"Error al actualizar el elemento en el sistema"});
    }
}

export const cambiarEstadoElemento = async(req, res) =>{
    try {
        const {id_elemento} = req.params;
        const sql = ` UPDATE elementos SET estado = CASE WHEN estado = TRUE THEN FALSE WHEN estado = FALSE THEN TRUE END WHERE id_elemento = $1
        `;
        const result = await pool.query(sql, [id_elemento]);
        if (result.rowCount>0) {
            return res.status(200).json({message:"El elemento se ha cambiado de estado exitosamente"})
        } else {
            return res.status(400).json({message:"No se logro cambiar el estado del elemento"})
        }
    } catch (error) {
        console.log("Error al consultar en el sistema "+error.message);
        return res.status(500).json({message:"Error al cambiar el estado del elemento en el sistema"})
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