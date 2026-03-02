const precios = {
  diagnostico: 20,
  formateo: 50,
  ssd: 40,
  limpieza: 35,
  ram: 30,
  pantalla: 70,
  envio: 18
};

function calcularTotal(servicios, envio) {
  let total = precios.diagnostico;

  servicios.forEach(servicio => {
    if (precios[servicio]) {
      total += precios[servicio];
    }
  });

  if (envio) {
    total += precios.envio;
  }

  return total;
}

module.exports = calcularTotal;