import express from "express"
import bodyParser from "body-parser";
import areaRoute from "./src/routes/AreasRouters.js";
import categoriaRoute from "./src/routes/categorias.router.js";
import centroRoute from "./src/routes/centros.router.js";
import {elementoRoute} from "./src/routes/elementoRoute.js";
import fichaRoute from "./src/routes/FichasRouters.js";
import {inventarioRoute} from "./src/routes/inventarioRoute.js";
import { movimientoRoute } from "./src/routes/movimientoRoute.js";
import municipioRoute from "./src/routes/municipios.router.js";
import programaRoute from "./src/routes/P.formacionRouter.js";
import sedeRoute from "./src/routes/SedeRouters.js";
import sitioRoute from "./src/routes/SitiosRouters.js";
import {solicitudRoute} from "./src/routes/solicitudRoute.js";
import { tipoMovimientoRoute } from "./src/routes/tipoMoviemientoRoute.js";
import tipoSitioRoute from "./src/routes/tipoSitios.router.js";
import { unidadMedidaRoute } from "./src/routes/unidadMedidaRoute.js";
import usuarioRoute from "./src/routes/usuarios.router.js";
import { verificacionRoute } from "./src/routes/verificacionRoute.js";
import { usuarioFichaRoute } from "./src/routes/usuarioFichaRoute.js";
import { rolRoute } from "./src/routes/rolRoute.js";
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const app = express()



const swaggerData = JSON.parse(fs.readFileSync(path.resolve('swagger.json'), 'utf-8'));
console.log(swaggerData)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerData));

app.use(areaRoute)
app.use(categoriaRoute)
app.use(centroRoute)
app.use(elementoRoute)
app.use(fichaRoute)
app.use(inventarioRoute)
app.use(movimientoRoute)
app.use(municipioRoute)
app.use(programaRoute)
app.use(sedeRoute)
app.use(sitioRoute)
app.use(solicitudRoute)
app.use(tipoMovimientoRoute)
app.use(tipoSitioRoute)
app.use(unidadMedidaRoute)
app.use(usuarioRoute)
app.use(verificacionRoute)
app.use(usuarioFichaRoute)
app.use(rolRoute)

app.listen(3000, () => {
    console.log("API activa en el servidor 3000")
});