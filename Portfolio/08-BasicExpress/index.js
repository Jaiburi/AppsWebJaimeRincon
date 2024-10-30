const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded ({ extended : true}))

app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.route("/")
.get((req, res) => {
    res.render("index", { bmi: "" });
})
.post((req, res) => {
    var peso = Number(req.body.weight);
    var altura = Number(req.body.height);//Durante todas mis pruebas estuve
    //poniendo la altura en cm y no en m así que me daba raro, creo que para cm
    //si se hace lo de entre 10000 que puso en el README
    console.log(peso)
    console.log(altura)
    var bmi = (peso / (altura*altura));//¡Que problemas me dio esta operación
    //y por pura mensada! No me funcionaba solo por no tener
    // altura*altura entre parentesis
    res.render("index", { bmi: bmi });
    console.log(bmi)
});

app.listen(3000, ()=>{
    console.log("Listening to port 3000")
})