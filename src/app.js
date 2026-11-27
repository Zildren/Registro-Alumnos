'use strict';

const express = require('express');
const path = require('path');
const students = require('./students');
const { version } = require('../package.json');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version, uptime: process.uptime() });
});

app.get('/api/alumnos', (req, res) => {
  res.json(students.listStudents(req.query.q));
});

app.get('/api/alumnos/:matricula', (req, res) => {
  const student = students.getStudent(req.params.matricula);
  if (!student) return res.status(404).json({ error: 'Alumno no encontrado.' });
  res.json(student);
});

app.post('/api/alumnos', (req, res) => {
  const result = students.createStudent(req.body);
  if (result.errors) {
    return res.status(result.conflict ? 409 : 400).json({ errors: result.errors });
  }
  res.status(201).json(result.student);
});

app.put('/api/alumnos/:matricula', (req, res) => {
  const result = students.updateStudent(req.params.matricula, req.body);
  if (result.notFound) return res.status(404).json({ error: 'Alumno no encontrado.' });
  if (result.errors) return res.status(400).json({ errors: result.errors });
  res.json(result.student);
});

app.delete('/api/alumnos/:matricula', (req, res) => {
  if (!students.deleteStudent(req.params.matricula)) {
    return res.status(404).json({ error: 'Alumno no encontrado.' });
  }
  res.status(204).send();
});

module.exports = app;
