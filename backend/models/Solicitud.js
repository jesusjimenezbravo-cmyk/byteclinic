const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
    nombre:String,
    email:String,
    telefono:String,
    tipoEquipo:String,
    servicios:[String],
    envio:Boolean,
    totalEstimado:Number,
    estado:{ type:String, default:"pendiente"},
    fecha:{ type:Date, default:Date.now }
});

module.exports = mongoose.model("Solicitud", solicitudSchema);