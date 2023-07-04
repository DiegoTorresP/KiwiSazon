const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    username:{
        type:String
    },
    password: { 
        type: String
    },
    nombre:{
        type: String
    },
    apellido:{
        type: String
    },
    image:{
      data:Buffer,
      contentType:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    telefono: {
        type: String,
        require: true
    },    
    rol: {
        type: String,
        required: true,
        default: 'user'
    },
    recetas:[
        {
            receta: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "recetas"
            }
        }
    ],
    follow: [
        {
            user:{
                type:String,
                required:true
            },
            
        }
    ],
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
    // followReceta:[
    //     {
    //         type:mongoose.ObjectId,
    //         ref:"orders"
    //     }
    // ]      
})

const User= mongoose.model("users",userSchema)
module.exports=User;