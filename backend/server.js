require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
console.log("MONGO URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo conectado correctamente"))
.catch(err => console.error("Error Mongo:", err));

app.use('/api/presupuesto', require('./routes/presupuestoRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Servidor activo en puerto " + PORT));