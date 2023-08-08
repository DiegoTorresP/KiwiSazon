const mongoose = require('mongoose');

const notificacionesSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    message:{
        type: String
    },
    date: { type: Date,
        require: true,
        default: Date.now()
    },
    isRead: {
        type: Number,
        required: true,
        default: 0

        // 0 - nueva
        // 1 - leida
    },

})

const Notificaciones= mongoose.model("notificaciones",notificacionesSchema)
module.exports=Notificaciones;