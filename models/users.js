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
    apePat:{
        type: String
    },
    apeMat:{
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
    roles: {
        type: String,
        required: true,
        default: ['user']
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
    followReceta:[
        {
            type:mongoose.ObjectId,
            ref:"orders"
        }
    ]      
})