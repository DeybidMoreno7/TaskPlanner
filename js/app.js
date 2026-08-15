const form = document.getElementById("formulario");

//VALIDACIONES DEL FORMULARIO ↓

const marcarCampo = (campo, esValido, mensaje) => {
    const mensajeError = document.getElementById(
      `error${campo.id.charAt(0).toUpperCase()}${campo.id.slice(1)}`
    );

    campo.classList.toggle('campo-error', !esValido);
    campo.classList.toggle('campo-valido', esValido);

    campo.setAttribute('aria-invalid', String(!esValido));

    if (mensajeError) {
      mensajeError.textContent = esValido ? '' : mensaje;
    }
  };



const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$/;
const validarNombre = () =>{
    const campo = document.getElementById('nombre-tarea');
    const valor = campo.value.trim();
    if (valor === '') {
      marcarCampo(campo, false, 'Ingresa un nombre a la tarea.');
      return false;
    }
    if (valor.length < 5) {
      marcarCampo(campo, false, 'El nombre debe tener al menos 5 caracteres.');
      return false;
    }
    if (valor.length > 35) {
      marcarCampo(campo, false, 'El nombre no puede superar los 35 caracteres.');
      return false;
    }
    if (!regexNombre.test(valor)) {
      marcarCampo(campo, false, 'El nombre solo puede contener letras y espacios.');
      return false;
    }
    marcarCampo(campo, true, '');
    return true;
}

const validarDescripcion = () => {
    const campo = document.getElementById('descripcion-tarea');
    const valor = campo.value.trim();
    if (valor === '') {
      marcarCampo(campo, false, 'Ingresa una descripcion a la tarea.');
      return false;
    }
    if (valor.length < 5) {
      marcarCampo(campo, false, 'La descripcion debe tener al menos 5 caracteres.');
      return false;
    }
    if (valor.length > 45) {
      marcarCampo(campo, false, 'El nombre no puede superar los 45 caracteres.');
      return false;
    }
    marcarCampo(campo, true, '');
    return true;
}

const validarCategoria = () =>{
    const campo = document.getElementById('categoria-tarea');
    if (campo.value === '') {
      marcarCampo(campo, false, 'Selecciona una categoria.');
      return false;
    }
    marcarCampo(campo, true, '');
    return true;
}
//deshabilitamos el calendario anterior a hoy↓
const fechaActual = new Date();
const anio = fechaActual.getFullYear();
const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
const dia = String(fechaActual.getDate()).padStart(2, '0');
const hoy = `${anio}-${mes}-${dia}`;
document.getElementById('fecha-entrega-tarea').min = hoy;
const validarFechaEntrega = () =>{
    const campo = document.getElementById('fecha-entrega-tarea');
    const valor = campo.value.trim();
    if(valor === ''){
        marcarCampo(campo, false, 'Ingresa una fecha de entrega.');
        return false;
    }
    marcarCampo(campo, true, '');
    return true;
}
const validarPrioridad = () =>{
    const campo = document.getElementById('prioridad-tarea');
    if (campo.value === '') {
      marcarCampo(campo, false, 'Selecciona una categoria.');
      return false;
    }
    marcarCampo(campo, true, '');
    return true;
}

const nombre_tarea = document.getElementById("nombre-tarea");
const descripcion_tarea = document.getElementById("descripcion-tarea");
const categoria_tarea = document.getElementById("categoria-tarea");
const fecha_entrega_tarea = document.getElementById("fecha-entrega-tarea");
const prioridad_tarea = document.getElementById("prioridad-tarea");


nombre_tarea.addEventListener('blur',validarNombre);
descripcion_tarea.addEventListener('blur',validarDescripcion);
categoria_tarea.addEventListener('blur',validarCategoria);
fecha_entrega_tarea.addEventListener('blur',validarFechaEntrega);
prioridad_tarea.addEventListener('blur',validarPrioridad);




// function mostrarError(input, mensaje) {
//     formularioValido = false;
//     input.classList.add("is-invalid");
//     input.classList.remove("is-valid");

//     let feedback = input.parentNode.querySelector(".invalid-feedback");
//     if (!feedback) {
//         feedback = document.createElement("div");
//         feedback.classList.add("invalid-feedback");
//         input.parentNode.appendChild(feedback);
//     }
//     feedback.textContent = mensaje;

// }
// function mostrarValido(input) {

//     input.classList.remove("is-invalid");
//     input.classList.add("is-valid");

//     const feedback = input.parentNode.querySelector(".invalid-feedback");

//     if (feedback) {
//         feedback.remove();
//     }
// }
// form.addEventListener("submit", (e) => {

//     e.preventDefault();

//     let formularioValido = true;


//     // NOMBRE
//     const nombre = nombre_tarea.value.trim();
//     if (nombre === "") {
//         mostrarError(
//             nombre_tarea,
//             "¡Upsss, este campo no puede estar vacío 😬!"
//         );
//     } else if (nombre.length < 5) {
//         mostrarError(
//             nombre_tarea,
//             "El nombre debe tener al menos 5 caracteres."
//         );
//     } else if (nombre.length > 50) {
//         mostrarError(
//             nombre_tarea,
//             "El nombre no puede superar los 50 caracteres."
//         );
//     } else {
//         mostrarValido(nombre_tarea);
//     }


//     // DESCRIPCIÓN
//     const descripcion = descripcion_tarea.value.trim();
//     if (descripcion === "") {
//         mostrarError(
//             descripcion_tarea,
//             "Come on, dale una descripción breve 😢"
//         );
//     } else if (descripcion.length < 6) {
//         mostrarError(
//             descripcion_tarea,
//             "La descripción debe tener al menos 6 caracteres."
//         );
//     } else {
//         mostrarValido(descripcion_tarea);
//     }

//     // CATEGORÍA
//     const categoria = categoria_tarea.value.trim();

//     if (categoria === "") {
//         mostrarError(
//             categoria_tarea,
//             "Seguro querrás categorizarla 🙄"
//         );
//     } else {
//         mostrarValido(categoria_tarea);
//     }


//     // FECHA
//     const fecha = fecha_entrega_tarea.value;
//     if (fecha === "") {
//         mostrarError(
//             fecha_entrega_tarea,
//             "¿Y la fecha de entrega? 💀"
//         );
//     } else {
//         // Fecha actual sin tener en cuenta la hora
//         const hoy = new Date();
//         hoy.setHours(0, 0, 0, 0);
//         // Convertimos la fecha del input
//         const fechaEntrega = new Date(fecha + "T00:00:00");
//         if (fechaEntrega < hoy) {
//             mostrarError(
//                 fecha_entrega_tarea,
//                 "La fecha de entrega debe ser posterior a hoy."
//             );
//         } else {
//             mostrarValido(fecha_entrega_tarea);
//         }
//     }
//     // PRIORIDAD
//     if (prioridad_tarea.value === "") {
//         mostrarError(
//             prioridad_tarea,
//             "Esto te servirá para administrar mejor tu tiempo 🏃🏽‍♂️🏃🏻‍♀️"
//         );
//     } else {
//         mostrarValido(prioridad_tarea);
//     }
//     // RESULTADO FINAL
//     if (formularioValido) {
//         const swalWithBootstrapButtons = Swal.mixin({
//             customClass: {
//                 confirmButton: "btn btn-success",
//                 cancelButton: "btn btn-danger"
//             },
//             buttonsStyling: false
//         });
//         swalWithBootstrapButtons.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, delete it!",
//             cancelButtonText: "No, cancel!",
//             reverseButtons: true
//         }).then((result) => {
//             if (result.isConfirmed) swalWithBootstrapButtons.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success"
//             });
//             else if (result.dismiss === Swal.DismissReason.cancel)
//                 /* Read more about handling dismissals below */
//                 swalWithBootstrapButtons.fire({
//                     title: "Cancelled",
//                     text: "Your imaginary file is safe :)",
//                     icon: "error"
//                 });
//         });
//     }
// });

