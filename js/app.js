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

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(nombre_tarea.value.trim()==""){
        mostrarError(nombre_tarea, "¡Upsss, este campo no puede estar vacio 😬!")        
    }
    if(descripcion_tarea.value.trim()==""){
        mostrarError(descripcion_tarea, "Come on, dale una descripción breve 😢")        
    }
    if(categoria_tarea.value.trim()==""){
        mostrarError(categoria_tarea, "Seguro querrás categorizarla 🙄")        
    }
    if(fecha_entrega_tarea.value.trim()==""){
        mostrarError(fecha_entrega_tarea, "¿Y la fecha de entrega? 💀")        
    }
    if(prioridad_tarea.value.trim()==""){
        mostrarError(prioridad_tarea, "Esto te servirá a administrar mejor tu tiempo 🏃🏽‍♂️🏃🏻‍♀️")        
    }
});

