import mongoose from "mongoose";
import nodemailer from "nodemailer";

const MONGO_URI = process.env.MONGO_URI;

if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGO_URI);
}

const SolicitudSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  tipoEquipo: String,
  servicios: [String],
  totalEstimado: Number
});

const Solicitud =
  mongoose.models.Solicitud ||
  mongoose.model("Solicitud", SolicitudSchema);

const precios = {
  diagnostico: 20,
  formateo: 50,
  ssd: 40,
  limpieza: 35,
  ram: 30,
  pantalla: 70,
  montaje: 80
};

function calcularTotal(servicios) {
  let total = precios.diagnostico;
  servicios.forEach(s => {
    if (precios[s]) total += precios[s];
  });
  return total;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { nombre, email, telefono, tipoEquipo, servicios } = req.body;

  if (!nombre || !email || !servicios || servicios.length === 0) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const total = calcularTotal(servicios);

  await Solicitud.create({
    nombre,
    email,
    telefono,
    tipoEquipo,
    servicios,
    totalEstimado: total
  });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nuevo presupuesto ByteClinic",
      html: `
        <h2>Nuevo presupuesto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicios:</strong> ${servicios.join(", ")}</p>
        <p><strong>Total:</strong> ${total}€</p>
      `
    });
  } catch (error) {
    console.error("Error enviando email:", error.message);
  }

  return res.status(200).json({
    mensaje: "Presupuesto enviado correctamente",
    total
  });
}