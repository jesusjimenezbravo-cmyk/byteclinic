const express = require('express');
const router = express.Router();
const Solicitud = require('../models/Solicitud');

router.post('/', async (req,res)=>{
    try{
        const nuevaSolicitud = new Solicitud(req.body);
        await nuevaSolicitud.save();
        res.status(201).json({msg:"Solicitud guardada"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports = router;