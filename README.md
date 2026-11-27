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

## Estructura del proyecto
```
registro-alumnos/
├── .github/workflows/ci.yml   # Flujo de integración continua
├── public/                    # Interfaz web (HTML, CSS, JS)
├── src/
│   ├── app.js                 # Aplicación Express y rutas
│   ├── server.js              # Punto de entrada
│   └── students.js            # Lógica y validación de alumnos
├── tests/                     # Pruebas unitarias y de API
├── package.json
└── README.md
```

## Cómo ejecutarlo
```bash
npm install
npm start        # http://localhost:3000
npm test         # ejecutar pruebas
```

## API
| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | /api/health | Estado del servicio |
| GET | /api/alumnos?q=texto | Listar / buscar alumnos |
| GET | /api/alumnos/:matricula | Consultar un alumno |
| POST | /api/alumnos | Registrar alumno |
| PUT | /api/alumnos/:matricula | Actualizar alumno |
| DELETE | /api/alumnos/:matricula | Eliminar alumno |

## Integración continua
Cada `push` o `pull request` a `main` ejecuta GitHub Actions: instala dependencias (`npm ci`),
verifica la sintaxis (`npm run lint`) y corre las pruebas (`npm test`) en Node 20 y 22.

## Despliegue continuo (CD)
- **Plataforma:** Render (Web Service, plan gratuito).
- **Configuración:** `render.yaml` y `.github/workflows/cd.yml`.
- **Flujo:** `push` a `main` → CI (pruebas) → si pasa, CD dispara el despliegue en Render →
  se consulta `/api/health` hasta confirmar que la versión nueva está en línea.
- **También se despliega** al publicar un *release* en GitHub o manualmente (workflow_dispatch).
- **Secretos y variables** (Settings → Secrets and variables → Actions):
  - `RENDER_DEPLOY_HOOK_URL` (secreto): URL del Deploy Hook del servicio en Render.
  - `APP_URL` (variable): URL pública de la aplicación, sin diagonal final.
- **Variables en Render:** `NODE_VERSION=22`, `NODE_ENV=production` (el puerto lo asigna Render con `PORT`).

> Nota: los datos se guardan en memoria; se reinician cuando el servicio se reinicia o se vuelve a desplegar.
