async function enviarFormulario(datos){
    const response = await fetch('http://localhost:5000/api/presupuesto',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(datos)
    });

    const data = await response.json();
    alert("Solicitud enviada correctamente");
}