const form = document.getElementById("formulario");
const nombre_tarea = document.getElementById("nombre-tarea");
const descripcion_tarea = document.getElementById("descripcion-tarea");
const categoria_tarea = document.getElementById("categoria-tarea");
const fecha_entrega_tarea = document.getElementById("fecha-entrega-tarea");
const prioridad_tarea = document.getElementById("prioridad-tarea");


function mostrarError(input, mensaje){
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    let feedback = input.parentNode.querySelector(".invalid-feedback");
    if(!feedback){
        feedback = document.createElement("div");
        feedback.classList.add("invalid-feedback");
        input.parentNode.appendChild(feedback);
    }
    feedback.textContent = mensaje;

}
function mostrarValido(input) {

    input.classList.remove("is-invalid");
    input.classList.add("is-valid");

    const feedback = input.parentNode.querySelector(".invalid-feedback");

    if (feedback) {
        feedback.remove();
    }
}
form.addEventListener("submit", (e) => {

    e.preventDefault();

    let formularioValido = true;


    // NOMBRE
    const nombre = nombre_tarea.value.trim();
    if (nombre === "") {
        mostrarError(
            nombre_tarea,
            "¡Upsss, este campo no puede estar vacío 😬!"
        );

        formularioValido = false;
    } else if (nombre.length < 5) {
        mostrarError(
            nombre_tarea,
            "El nombre debe tener al menos 5 caracteres."
        );
        formularioValido = false;
    } else if (nombre.length > 50) {
        mostrarError(
            nombre_tarea,
            "El nombre no puede superar los 50 caracteres."
        );
        formularioValido = false;
    } else {
        mostrarValido(nombre_tarea);
    }


    // DESCRIPCIÓN
    const descripcion = descripcion_tarea.value.trim();
    if (descripcion === "") {
        mostrarError(
            descripcion_tarea,
            "Come on, dale una descripción breve 😢"
        );
        formularioValido = false;
    } else if (descripcion.length < 6) {
        mostrarError(
            descripcion_tarea,
            "La descripción debe tener al menos 6 caracteres."
        );
        formularioValido = false;
    } else {
        mostrarValido(descripcion_tarea);
    }

    // CATEGORÍA
    const categoria = categoria_tarea.value.trim();

    if (categoria === "") {
        mostrarError(
            categoria_tarea,
            "Seguro querrás categorizarla 🙄"
        );
        formularioValido = false;
    } else if (categoria.length < 3) {
        mostrarError(
            categoria_tarea,
            "La categoría debe tener al menos 3 caracteres."
        );
        formularioValido = false;
    } else {
        mostrarValido(categoria_tarea);
    }


    // FECHA
    const fecha = fecha_entrega_tarea.value;
    if (fecha === "") {
        mostrarError(
            fecha_entrega_tarea,
            "¿Y la fecha de entrega? 💀"
        );
        formularioValido = false;
    } else {
        // Fecha actual sin tener en cuenta la hora
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        // Convertimos la fecha del input
        const fechaEntrega = new Date(fecha + "T00:00:00");
        if (fechaEntrega < hoy) {
            mostrarError(
                fecha_entrega_tarea,
                "La fecha de entrega debe ser posterior a hoy."
            );
            formularioValido = false;
        } else {
            mostrarValido(fecha_entrega_tarea);
        }
    }
    // PRIORIDAD
    if (prioridad_tarea.value === "") {
        mostrarError(
            prioridad_tarea,
            "Esto te servirá para administrar mejor tu tiempo 🏃🏽‍♂️🏃🏻‍♀️"
        );
        formularioValido = false;
    } else {
        mostrarValido(prioridad_tarea);
    }
    // RESULTADO FINAL
    if (formularioValido) {
        alert("Biennn");
    }
});

