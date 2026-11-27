# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado semántico.

## [1.1.0] - 2026-11-27
### Agregado
- Endpoint `GET /api/estadisticas` con el total de alumnos y el conteo por carrera.
- La interfaz muestra el total de alumnos y su distribución por carrera.

## [1.0.0] - 2026-11-27
### Agregado
- API REST para registrar, consultar, buscar, actualizar y eliminar alumnos.
- Validación de datos (campos obligatorios, correo válido, matrícula única).
- Interfaz web para gestionar alumnos.
- Endpoint `/api/health` que informa el estado y la versión del servicio.
- Integración continua con GitHub Actions (verificación y 14 pruebas automáticas).
- Despliegue continuo hacia Render.
