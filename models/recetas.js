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
        type: Number,
        required: true,
        default: 0

        // 0 - en revision
        // 1 - aprobado
        // 2 - rechazada
    },
    calificacion:[
        {
            type:mongoose.ObjectId,
            ref:"calificacion"
        },
    ],
    date: { type: Date,
            require: true,
            default: Date.now()
        }
});

const Receta= mongoose.model("recetas",recetaSchema)
module.exports=Receta;