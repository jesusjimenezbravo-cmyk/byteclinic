const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(helmet());
app.get("/", (req, res) => {
  res.send("ByteClinic API activa");
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo conectado correctamente"))
.catch(err => console.error("Error Mongo:", err));

app.use('/api/presupuesto', require('./routes/presupuestoRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Servidor activo en puerto " + PORT));