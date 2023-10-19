
function conversionGrado() {
    const seleccionGrado = document.getElementById('seleccionGrado').value;
    const grado = parseFloat(document.getElementById('grado').value);

    if (grado === grado) {
        switch (seleccionGrado) {
            case "C°":
                conversionGradoC(grado);
                break;
            case "K°":
                conversionGradoK(grado);
                break;
            case "F°":
                conversionGradoF(grado);
                break;
        }
    } else {
        alert("Por favor escribe su grado")
    }
}

function conversionGradoC(grado) {
    const conversion = `F°: ${(grado * 9 / 5) + 32}<br> K°: ${grado + 273.15}`;
    document.getElementById('informacion').innerHTML = conversion;
    document.getElementById('grado').value = "";
}

function conversionGradoK(grado) {
    const conversion = `C°: ${grado - 273.15}<br> F°: ${(grado - 273.15) * 9 / 5 + 32}`;
    document.getElementById('informacion').innerHTML = conversion;
    document.getElementById('grado').value = "";
}

function conversionGradoF(grado) {
    const conversion = `C°: ${(grado - 32) * 5 / 9}<br> K°: ${(grado - 32) * 5 / 9 + 273.15}`;
    document.getElementById('informacion').innerHTML = conversion;
    document.getElementById('grado').value = "";
}



document.getElementById('resultado').addEventListener('click', function () {
    conversionGrado();
})

