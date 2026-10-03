const form = document.getElementById('imcForm');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const resultado = document.getElementById('resultado');

function getClasificacion(imc) {
  if (imc < 18.5) {
    return {
      texto: 'Bajo peso',
      clase: 'warning',
      detalle: 'Tu peso esta por debajo del rango recomendado.'
    };
  }

  if (imc < 25) {
    return {
      texto: 'Peso saludable',
      clase: 'success',
      detalle: 'Tu peso se encuentra dentro del rango saludable.'
    };
  }

  if (imc < 30) {
    return {
      texto: 'Sobrepeso',
      clase: 'warning',
      detalle: 'Hay una ligera sobrecarga de peso, considera cuidar tu alimentación y actividad fisica.'
    };
  }

  if (imc < 35) {
    return {
      texto: 'Obesidad grado I',
      clase: 'danger',
      detalle: 'Tu IMC indica obesidad leve. Es recomendable consultar a un profesional de salud.'
    };
  }

  if (imc < 40) {
    return {
      texto: 'Obesidad grado II',
      clase: 'danger',
      detalle: 'Tu IMC indica una obesidad moderada. Se recomienda seguimiento profesional.'
    };
  }

  return {
    texto: 'Obesidad grado III',
    clase: 'danger',
    detalle: 'Tu IMC es alto y requiere atención medica o nutricional especializada.'
  };
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const peso = Number(pesoInput.value);
  const altura = Number(alturaInput.value);

  if (!peso || !altura || peso <= 0 || altura <= 0) {
    resultado.textContent = 'Ingresa valores validos para peso y altura.';
    resultado.className = 'result danger';
    return;
  }

  const alturaEnMetros = altura / 100;
  const imc = peso / (alturaEnMetros * alturaEnMetros);
  const clasificacion = getClasificacion(imc);

  resultado.innerHTML = `
    <strong>IMC: ${imc.toFixed(1)}</strong><br>
    <span>${clasificacion.texto}</span><br>
    ${clasificacion.detalle}
  `;

  resultado.className = `result ${clasificacion.clase}`;
});
