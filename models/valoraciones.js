const mongoose = require('mongoose');
const valoracionesSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    receta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recetas"
    },
    valoracion:{
        type: Number,
        require: true
    },
    date: { 
        type: Date,
        require: true,
        default: Date.now()
    }, 
});

const Valoraciones= mongoose.model("valoraciones",valoracionesSchema)
module.exports=Valoraciones;