function calcularPropina() {

    let monto = parseFloat(
        prompt("Ingrese el monto de la cuenta:")
    );

    let porcentaje = parseFloat(
        prompt("Ingrese el porcentaje de propina:")
    );

    if (isNaN(monto) || isNaN(porcentaje)) {
        document.getElementById("visor").innerHTML = `
            <p>❌ Por favor, ingrese valores válidos.</p>
        `;
        return;
    }

    let propina = monto * (porcentaje / 100);

    let total = monto + propina;

    document.getElementById("visor").innerHTML = `
        <h2>Resultado</h2>
        <p>🤑 Monto: $${monto.toFixed(2)}</p>
        <p>😲 Propina: $${propina.toFixed(2)}</p>
        <p>😎 Total: $${total.toFixed(2)}</p>
    `;
}