const Solicitud = require('../models/Solicitud');
const calcularTotal = require('../utils/calcularTotal');
const enviarEmail = require('../utils/enviarEmail');
exports.crearPresupuesto = async (req, res) => {
  try {
    const { nombre, email, telefono, tipoEquipo, servicios, envio } = req.body;

    const totalReal = calcularTotal(servicios, envio);

    const nuevaSolicitud = new Solicitud({
      nombre,
      email,
      telefono,
      tipoEquipo,
      servicios,
      envio,
      totalEstimado: totalReal
    });

    await nuevaSolicitud.save();
    await enviarEmail(req.body, totalReal);
    res.status(201).json({
      mensaje: "Presupuesto guardado correctamente",
      total: totalReal
    });
    
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};