const mongoose = require('mongoose');
const recetaSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    platilloNombre:{
        type:String,
        required:true,
        unique:true,
    },
    ingredientes:{
        type: String
    },
    pasosSeguir:{
        type: String
    },
    dificultad: {
        type: String
    },
    tiempo: {
        type: String
    },
    porciones: {
        type: Number
    },
    tips: {
        type: String
    },
    categoria: {
        type: String,
        required:true
    },
    imagen: {
        type: String
    },
    isAprovado: {
        type: Boolean,
        required: true,
        default: false
    },
    calificacion:[
        {
            type:mongoose.ObjectId,
            ref:"calificacion"
        },
    ],
});

const Receta= mongoose.model("recetas",recetaSchema)
module.exports=Receta;