const colorOpciones = document.querySelectorAll('input[name="color"]');
const previewDestinatario = document.getElementById("preview-destinatario");
const inputDestinatario = document.getElementById("nombre");

const fuenteOpciones = document.querySelectorAll('input[name="fuente"]');

const inputMonto = document.getElementById("monto");
const previewMonto = document.getElementById("preview-monto");

const ubicacionOpciones = document.querySelectorAll('input[name="ubicacion"]');

const fondoOpciones = document.querySelectorAll('input[name="fondo"]');
const giftcard = document.getElementById("giftcard");

const btnConfirmar = document.getElementById("confirmar");


colorOpciones.forEach(op => {
    op.addEventListener("change", () => {
        previewDestinatario.style.color = op.value;
    });
});


inputDestinatario.addEventListener("input", () => {
    previewDestinatario.textContent = inputDestinatario.value || "Destinatario";
});

fuenteOpciones.forEach(op => {
    op.addEventListener("change", () => {
        previewDestinatario.style.fontSize = op.value;
    });
});

inputMonto.addEventListener("input", () => {
    previewMonto.textContent = `$${inputMonto.value || "0000"}.-`;
});

ubicacionOpciones.forEach(op => {
    op.addEventListener("change", () => {
        previewMonto.style.top = "";
        previewMonto.style.right = "";
        previewMonto.style.left = "";

        switch (op.id) {
            case "ubic1":
                previewMonto.style.top = "0.2em";
                previewMonto.style.left = "0.2em";
                break;

            case "ubic2":
                previewMonto.style.top = "0.2em";
                previewMonto.style.right = "0.2em";
                break;

            case "ubic3":
                previewMonto.style.top = "0.2em";
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
