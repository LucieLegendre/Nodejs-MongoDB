const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

var app = Express();

Mongoose.connect("mongodb://localhost/MongoAPI");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const ApprenantModel = Mongoose.model("apprenant", {
    Age: Number,
    Diplomes: String,
    Identifiant_PoleEmploi: String,
    Indemnites: Number,
    Nom: String,
    Prenom: String
   
});

app.post("/apprenant", async (request, response) => {
    try {
        var apprenant = new ApprenantModel(request.body);
        var result = await apprenant.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/apprenants", async (request, response) => {
    try {
        var result = await ApprenantModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }       
});

app.get("/apprenant/:id", async (request, response) => {
    try {
        var apprenant = await ApprenantModel.findById(request.params.id).exec();
        response.send(apprenant);
    }catch (error) {
        response.status(500).send(error);
    }
});

app.put("/apprenant/:id", async (request, response) => {
    try {
        var apprenant = await ApprenantModel.findById(request.params.id).exec();
        apprenant.set(request.body);
        var result = await apprenant.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }

});

app.delete("/apprenant/:id", async (request, response) => {
    try{
        var result = await ApprenantModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log("Listening at :3000...");
});