const mongoose = require('mongoose');
const comentarioSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    receta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recetas"
    },
    comentario: {
        type: String,
        required:true
    },
    date: { 
        type: Date,
        require: true,
        default: Date.now()
    },
   
});

const Comentario= mongoose.model("comentarios",comentarioSchema)
module.exports=Comentario;