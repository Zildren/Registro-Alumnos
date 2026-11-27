'use strict';

const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');
const students = require('../src/students');

const valid = {
  matricula: 'A12345',
  nombre: 'Ana Lopez',
  correo: 'ana@correo.com',
  carrera: 'Ingenieria en Software'
};

beforeEach(() => students.resetStudents());

test('GET /api/health responde ok', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
  assert.match(res.body.version, /^\d+\.\d+\.\d+$/);
});

test('POST /api/alumnos crea un alumno (201)', async () => {
  const res = await request(app).post('/api/alumnos').send(valid);
  assert.equal(res.status, 201);
  assert.equal(res.body.nombre, 'Ana Lopez');
});

test('POST /api/alumnos con datos invalidos devuelve 400', async () => {
  const res = await request(app).post('/api/alumnos').send({ nombre: 'X' });
  assert.equal(res.status, 400);
  assert.ok(res.body.errors.length > 0);
});

test('POST /api/alumnos duplicado devuelve 409', async () => {
  await request(app).post('/api/alumnos').send(valid);
  const res = await request(app).post('/api/alumnos').send(valid);
  assert.equal(res.status, 409);
});

test('GET /api/alumnos/:matricula devuelve 404 si no existe', async () => {
  const res = await request(app).get('/api/alumnos/NOEXISTE1');
  assert.equal(res.status, 404);
});

test('PUT /api/alumnos/:matricula actualiza datos', async () => {
  await request(app).post('/api/alumnos').send(valid);
  const res = await request(app).put('/api/alumnos/A12345').send({ carrera: 'Mecatronica' });
  assert.equal(res.status, 200);
  assert.equal(res.body.carrera, 'Mecatronica');
});

test('DELETE /api/alumnos/:matricula elimina (204)', async () => {
  await request(app).post('/api/alumnos').send(valid);
  const res = await request(app).delete('/api/alumnos/A12345');
  assert.equal(res.status, 204);
});

test('GET /api/estadisticas cuenta alumnos por carrera', async () => {
  await request(app).post('/api/alumnos').send(valid);
  await request(app)
    .post('/api/alumnos')
    .send({ ...valid, matricula: 'B54321', correo: 'luis@correo.com' });
  const res = await request(app).get('/api/estadisticas');
  assert.equal(res.status, 200);
  assert.equal(res.body.total, 2);
  assert.equal(res.body.porCarrera['Ingenieria en Software'], 2);
});
