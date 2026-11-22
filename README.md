# Sistema de Registro de Alumnos

Aplicación web con API REST para registrar, consultar, actualizar y eliminar alumnos.

## Problemática
Muchas escuelas pequeñas llevan el registro de alumnos en hojas de cálculo o papel, lo que genera
duplicados, datos incompletos y dificultad para consultar información. Este sistema centraliza el
registro y valida los datos al momento de capturarlos.

## Funcionalidades principales
- Registrar alumnos (matrícula, nombre, correo, carrera).
- Listar y buscar alumnos.
- Consultar un alumno por matrícula.
- Actualizar y eliminar alumnos.
- Validación de datos (campos obligatorios, correo válido, matrícula única).

## Tecnologías
- Node.js 20 + Express
- node:test y Supertest (pruebas automáticas)
- Git y GitHub
- GitHub Actions (integración continua)
