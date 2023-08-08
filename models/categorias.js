const mongoose = require('mongoose');

const categoriaSchema =mongoose.Schema({
    nombre:{
        type:String
    },
    descripcion: { 
        type: String
    },
    image:{
        type: String
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },  
    date: { 
        type: Date,
        require: true,
        default: Date.now()
    },  
})

const Categoria= mongoose.model("categorias",categoriaSchema)
module.exports=Categoria;