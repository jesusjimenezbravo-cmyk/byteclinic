const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function enviarEmail(datos, total) {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Nuevo presupuesto ByteClinic',
    html: `
      <h2>Nuevo presupuesto recibido</h2>
      <p><strong>Nombre:</strong> ${datos.nombre}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <p><strong>Teléfono:</strong> ${datos.telefono || 'No indicado'}</p>
      <p><strong>Tipo equipo:</strong> ${datos.tipoEquipo}</p>
      <p><strong>Servicios:</strong> ${datos.servicios.join(', ')}</p>
      <p><strong>Total estimado:</strong> ${total}€</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = enviarEmail;