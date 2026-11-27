'use strict';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MATRICULA_REGEX = /^[A-Za-z0-9]{5,12}$/;

/** Almacén en memoria (suficiente para el alcance del proyecto). */
let students = [];

function resetStudents() {
  students = [];
}

/**
 * Valida los datos de un alumno.
 * @returns {string[]} lista de errores (vacía si es válido)
 */
function validateStudent(data) {
  const errors = [];
  const { matricula, nombre, correo, carrera } = data || {};

  if (!matricula || !MATRICULA_REGEX.test(String(matricula))) {
    errors.push('La matrícula es obligatoria (5 a 12 caracteres alfanuméricos).');
  }
  if (!nombre || String(nombre).trim().length < 3) {
    errors.push('El nombre es obligatorio (mínimo 3 caracteres).');
  }
  if (!correo || !EMAIL_REGEX.test(String(correo))) {
    errors.push('El correo no es válido.');
  }
  if (!carrera || String(carrera).trim().length === 0) {
    errors.push('La carrera es obligatoria.');
  }
  return errors;
}

function listStudents(search = '') {
  const term = String(search).trim().toLowerCase();
  if (!term) return [...students];
  return students.filter(
    (s) =>
      s.nombre.toLowerCase().includes(term) ||
      s.matricula.toLowerCase().includes(term) ||
      s.carrera.toLowerCase().includes(term)
  );
}

function getStats() {
  const porCarrera = {};
  for (const s of students) {
    porCarrera[s.carrera] = (porCarrera[s.carrera] || 0) + 1;
  }
  return { total: students.length, porCarrera };
}

function getStudent(matricula) {
  return students.find((s) => s.matricula === matricula) || null;
}

function createStudent(data) {
  const errors = validateStudent(data);
  if (errors.length) return { errors };
  if (getStudent(data.matricula)) {
    return { errors: ['Ya existe un alumno con esa matrícula.'], conflict: true };
  }
  const student = {
    matricula: String(data.matricula),
    nombre: String(data.nombre).trim(),
    correo: String(data.correo).trim(),
    carrera: String(data.carrera).trim()
  };
  students.push(student);
  return { student };
}

function updateStudent(matricula, data) {
  const current = getStudent(matricula);
  if (!current) return { notFound: true };
  const merged = { ...current, ...data, matricula };
  const errors = validateStudent(merged);
  if (errors.length) return { errors };
  Object.assign(current, {
    nombre: String(merged.nombre).trim(),
    correo: String(merged.correo).trim(),
    carrera: String(merged.carrera).trim()
  });
  return { student: current };
}

function deleteStudent(matricula) {
  const index = students.findIndex((s) => s.matricula === matricula);
  if (index === -1) return false;
  students.splice(index, 1);
  return true;
}

module.exports = {
  validateStudent,
  listStudents,
  getStats,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  resetStudents
};
