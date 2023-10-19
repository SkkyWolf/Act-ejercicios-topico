function calcularArea() {
    const num1 = parseFloat(document.getElementById("numero1").value);
    const num2 = parseFloat(document.getElementById("numero2").value);
    const seleccion = document.getElementById("seleccion").value;
    let resultado = 0;

    switch (seleccion) {
        case "cuadrado":
            resultado = num1 * num1;
            break;
        case "rectangulo":
            resultado = num1 * num2;
            break;
        case "triangulo":
            resultado = (num1 * num2) / 2;
            break;
        default:
            alert("Por favor completa los campos");
            break;
    }

    document.getElementById("resultado").textContent = `El ${seleccion} es: ${resultado}`;

}

document.getElementById('calcular').addEventListener("click", function(){
    calcularArea();
    document.getElementById('seleccion').value = "";
    document.getElementById('numero1').value = "";
    document.getElementById('numero2').value = "";

});