'use strict';

const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const students = require('../src/students');

const valid = {
  matricula: 'A12345',
  nombre: 'Ana Lopez',
  correo: 'ana@correo.com',
  carrera: 'Ingenieria en Software'
};

beforeEach(() => students.resetStudents());

test('validateStudent acepta un alumno valido', () => {
  assert.deepEqual(students.validateStudent(valid), []);
});

test('validateStudent rechaza un correo invalido', () => {
  const errors = students.validateStudent({ ...valid, correo: 'correo-malo' });
  assert.equal(errors.length, 1);
  assert.match(errors[0], /correo/i);
});

test('validateStudent rechaza campos faltantes', () => {
  const errors = students.validateStudent({});
  assert.equal(errors.length, 4);
});

test('createStudent registra un alumno', () => {
  const result = students.createStudent(valid);
  assert.equal(result.student.matricula, 'A12345');
  assert.equal(students.listStudents().length, 1);
});

test('createStudent rechaza matricula duplicada', () => {
  students.createStudent(valid);
  const result = students.createStudent(valid);
  assert.equal(result.conflict, true);
});

test('listStudents filtra por nombre', () => {
  students.createStudent(valid);
  students.createStudent({ ...valid, matricula: 'B54321', nombre: 'Luis Perez' });
  assert.equal(students.listStudents('luis').length, 1);
});

test('deleteStudent elimina un alumno existente', () => {
  students.createStudent(valid);
  assert.equal(students.deleteStudent('A12345'), true);
  assert.equal(students.deleteStudent('A12345'), false);
});
