const form = document.getElementById('form');
const rows = document.getElementById('rows');
const msg = document.getElementById('msg');
const search = document.getElementById('search');

function showMessage(text, type) {
  msg.textContent = text;
  msg.className = type;
}

async function loadStats() {
  const res = await fetch('/api/estadisticas');
  const stats = await res.json();
  const detalle = Object.entries(stats.porCarrera)
    .map(([carrera, n]) => carrera + ': ' + n)
    .join(' | ');
  document.getElementById('stats').textContent =
    'Total de alumnos: ' + stats.total + (detalle ? '  (' + detalle + ')' : '');
}

async function loadStudents() {
  loadStats();
  const res = await fetch('/api/alumnos?q=' + encodeURIComponent(search.value));
  const data = await res.json();
  rows.innerHTML = '';
  for (const s of data) {
    const tr = document.createElement('tr');
    [s.matricula, s.nombre, s.correo, s.carrera].forEach((value) => {
      const td = document.createElement('td');
      td.textContent = value;
      tr.appendChild(td);
    });
    const td = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.className = 'del';
    btn.onclick = async () => {
      await fetch('/api/alumnos/' + encodeURIComponent(s.matricula), { method: 'DELETE' });
      loadStudents();
    };
    td.appendChild(btn);
    tr.appendChild(td);
    rows.appendChild(tr);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(form));
  const res = await fetch('/api/alumnos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (res.ok) {
    showMessage('Alumno registrado correctamente.', 'ok');
    form.reset();
    loadStudents();
  } else {
    showMessage((data.errors || [data.error]).join(' '), 'error');
  }
});

search.addEventListener('input', loadStudents);
loadStudents();
