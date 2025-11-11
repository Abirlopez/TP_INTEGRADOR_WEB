// Cambiar color del nombre
const colorOpciones = document.querySelectorAll('input[name="color"]');
const previewDestinatario = document.getElementById("preview-destinatario");
const inputDestinatario = document.getElementById("nombre");

// Cambiar tamaño de fuente
const fuenteOpciones = document.querySelectorAll('input[name="fuente"]');

// Cambiar monto
const inputMonto = document.getElementById("monto");
const previewMonto = document.getElementById("preview-monto");

// Cambiar ubicación (arriba - izquierda - derecha)
const ubicacionOpciones = document.querySelectorAll('input[name="ubicacion"]');

// Cambiar fondo
const fondoOpciones = document.querySelectorAll('input[name="fondo"]');
const giftcard = document.getElementById("giftcard");

// Botón confirmar para guardar en localStorage
const btnConfirmar = document.getElementById("confirmar");


// COLOR
colorOpciones.forEach(op => {
    op.addEventListener("change", () => {
        previewDestinatario.style.color = op.value;
    });
});

// TEXTO DESTINATARIO
inputDestinatario.addEventListener("input", () => {
    previewDestinatario.textContent = inputDestinatario.value || "Destinatario";
});

// TAMAÑO FUENTE
fuenteOpciones.forEach(op => {
    op.addEventListener("change", () => {
        previewDestinatario.style.fontSize = op.value;
    });
});

// MONTO
inputMonto.addEventListener("input", () => {
    previewMonto.textContent = `$${inputMonto.value || "0000"}.-`;
});

// UBICACIÓN DEL MONTO (solo arriba, izquierda, derecha en tu HTML)
ubicacionOpciones.forEach(op => {
    op.addEventListener("change", () => {
        // Resetea posición
        previewMonto.style.top = "";
        previewMonto.style.right = "";
        previewMonto.style.left = "";

        switch (op.id) {
            case "ubic1":
                previewMonto.style.top = "0.5em";
                previewMonto.style.left = "0.5em";
                break;

            case "ubic2":
                previewMonto.style.top = "0.5em";
                previewMonto.style.right = "0.5em";
                break;

            case "ubic3":
                previewMonto.style.top = "0.5em";
                previewMonto.style.left = "50%";
                previewMonto.style.transform = "translateX(-50%)";
                break;
        }
    });
});

// FONDOS
fondoOpciones.forEach(op => {
    op.addEventListener("change", () => {
        if (op.id === "fondo1") giftcard.style.backgroundColor = "gray";
        if (op.id === "fondo2") giftcard.style.backgroundColor = "lightblue";
        if (op.id === "fondo3") giftcard.style.backgroundColor = "lightcoral";
    });
});

// GUARDAR EN CARRITO
btnConfirmar.addEventListener("click", () => {
    const destinatario = inputDestinatario.value;
    const monto = inputMonto.value;
    const color = document.querySelector('input[name="color"]:checked')?.value || "";
    const fuente = document.querySelector('input[name="fuente"]:checked')?.value || "";
    const fondo = document.querySelector('input[name="fondo"]:checked')?.id || "";

    const giftcardData = {
        destinatario,
        monto,
        color,
        fuente,
        fondo
    };

    let carrito = JSON.parse(localStorage.getItem("giftcardsEnCarrito")) || [];
    carrito.push(giftcardData);
    localStorage.setItem("giftcardsEnCarrito", JSON.stringify(carrito));

    alert("Giftcard agregada al carrito");
});
