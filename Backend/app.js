import express from "express"
import bodyParser from "body-parser";

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, () => {
    console.log("API activa en el servidor 3000")
});