console.log("index.js cargado");
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
const validarNombre = () => {
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
    marcarCampo(campo, false, 'El nombre solo puede contener letras, números y espacios.');
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

const validarCategoria = () => {
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
const validarFechaEntrega = () => {
  const campo = document.getElementById('fecha-entrega-tarea');
  const valor = campo.value.trim();
  if (valor === '') {
    marcarCampo(campo, false, 'Ingresa una fecha de entrega.');
    return false;
  }
  marcarCampo(campo, true, '');
  return true;
}
const validarPrioridad = () => {
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


nombre_tarea.addEventListener('blur', validarNombre);
descripcion_tarea.addEventListener('blur', validarDescripcion);
categoria_tarea.addEventListener('blur', validarCategoria);
fecha_entrega_tarea.addEventListener('blur', validarFechaEntrega);
prioridad_tarea.addEventListener('blur', validarPrioridad);


const taskManager = new TaskManager();
  taskManager.load();  
// taskManager.load();

const renderTasks = () => {
  
  document.querySelectorAll(".lista-tareas").forEach(lista => {
    lista.innerHTML = "";
  });

  taskManager.tasks.forEach(task => {

    const card = document.createElement("div");

    card.classList.add(
      "card",
      "border-info",
      "mb-3",
      "card-tarea"
    );

    card.dataset.taskId = task.id;

    card.innerHTML = `
            <div class="card-header">
                ${task.name.toUpperCase()}
            </div>

            <div class="card-body">

                <h5 class="card-title">
                    ${task.description}
                </h5>

                <p class="card-text">
                    ${task.category}
                </p>

                <p class="card-text">
                    Entrega: ${task.dueDate}
                </p>

                <p class="card-text">
                    Prioridad: ${task.priority}
                </p>

                <div class="text-center">

                    <button class="btn btn-primary m-1">
                        Editar
                    </button>

                    <button class="btn delete-button btn-danger m-1">
                        Eliminar
                    </button>

                    <select class="form-select m-1 selector-estado">

                        <option value="" selected disabled>
                            Cambiar estado
                        </option>

                        ${task.status !== "to-do"
        ? '<option value="to-do">To Do</option>'
        : ''}

                        ${task.status !== "in-progress"
        ? '<option value="in-progress">In Progress</option>'
        : ''}

                        ${task.status !== "done"
        ? '<option value="done">Done</option>'
        : ''}

                    </select>

                </div>
            </div>
        `;

    const listaDestino = document.querySelector(
      `.${task.status} .lista-tareas`
    );

    listaDestino.appendChild(card);
  });
};






const tablero = document.querySelector(".tablero-tareas");

tablero.addEventListener("change", (event) => {

  if (!event.target.classList.contains("selector-estado")) {
    return;
  }

  const tarjeta = event.target.closest(".card-tarea");

  const id = Number(tarjeta.dataset.taskId);

  const nuevoEstado = event.target.value;

  console.log("ID:", id);
  console.log("Nuevo estado:", nuevoEstado);

  const task = taskManager.getTaskById(id);

  console.log("Tarea encontrada:", task);

  task.status = nuevoEstado;

  console.log("Tarea actualizada:", task);
  console.log(task.status);

  renderTasks();
});


// tablero.addEventListener("click", (event) => {

//   if (!event.target.classList.contains("delete-button")) {
//     return;
//   }

//   const tarjeta = event.target.closest(".card-tarea");

//   const id = Number(tarjeta.dataset.taskId);

//   taskManager.deleteTask(id);

//   renderTasks();
// });

tablero.addEventListener("click", (event) => {

  if (!event.target.classList.contains("delete-button")) {
    return;
  }

  const tarjeta = event.target.closest(".card-tarea");

  const id = Number(tarjeta.dataset.taskId);

  taskManager.deleteTask(id);

  renderTasks();
  console.log(taskManager.tasks);
});




form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombreValido = validarNombre();
  const descripcionValida = validarDescripcion();
  const categoriaValida = validarCategoria();
  const fechaValida = validarFechaEntrega();
  const prioridadValida = validarPrioridad();

  if (
    !nombreValido ||
    !descripcionValida ||
    !categoriaValida ||
    !fechaValida ||
    !prioridadValida
  ) {
    return;
  }
  taskManager.addTask(
    nombre_tarea.value,
    descripcion_tarea.value,
    categoria_tarea.value,
    fecha_entrega_tarea.value,
    prioridad_tarea.value
  );   
  renderTasks();
  form.reset()
  console.log(taskManager.tasks);
});
