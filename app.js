let data = [];

const form = document.getElementById('form');
const tabla = document.getElementById('tabla');
const numeroCelularInput = document.getElementById('numeroCelular');
const idInput = document.getElementById('id');
const agregarButton = document.getElementById('agregar');

agregarButton.addEventListener('click', function() {
    agregarRegistro();
});

function agregarRegistro() {
    const numeroCelular = numeroCelularInput.value;
    const id = idInput.value;

    if (numeroCelular && id) {
        const editarIndex = agregarButton.dataset.editIndex;

        if (editarIndex !== undefined) {
            data[editarIndex] = { id, numeroCelular };
            agregarButton.textContent = 'Agregar';
            agregarButton.removeAttribute('data-edit-index');
        } else {
            data.push({ id, numeroCelular });
        }

        actualizarTabla();

        numeroCelularInput.value = '';
        idInput.value = '';
    }
}

function actualizarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    data.forEach((item, index) => {
        const row = tabla.insertRow(-1);
        const idCell = row.insertCell(0);
        const numeroCelularCell = row.insertCell(1);
        const accionesCell = row.insertCell(2);

        idCell.innerHTML = item.id;
        numeroCelularCell.innerHTML = item.numeroCelular;

        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.addEventListener('click', () => editarRegistro(index));
        accionesCell.appendChild(editarButton);

        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.addEventListener('click', () => eliminarRegistro(index));
        accionesCell.appendChild(eliminarButton);
    });
}

function editarRegistro(index) {
    const registro = data[index];
    numeroCelularInput.value = registro.numeroCelular;
    idInput.value = registro.id;
    agregarButton.textContent = 'Guardar';
    agregarButton.dataset.editIndex = index;
}

function eliminarRegistro(index) {
    data.splice(index, 1);
    actualizarTabla();
}
