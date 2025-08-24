API Auth & Tester Playground

Este proyecto es una aplicación sencilla en HTML, CSS y JavaScript que permite experimentar con flujos de autenticación basados en JWT tokens (login, refresh y auto-refresh). Además, incluye un pequeño tester de APIs que funciona de forma similar a Postman, pero en versión ligera y hecha desde cero.

Funcionalidades principales

Login con credenciales: genera accessToken y refreshToken.

Visualización del estado del token: muestra expiración, existencia de refresh token y salida en formato JSON.

Forzar expiración: botón para simular la caducidad del token.

Auto-refresh configurable: opción para activar o desactivar la renovación automática del token.

Consumo del endpoint /auth/me: permite probar la API con el token vigente.

Tester de APIs:

Permite ingresar cualquier URL

Seleccionar métodos HTTP (GET, POST, PUT, DELETE)

Definir headers personalizados

Enviar un cuerpo en formato JSON

Visualizar status, headers y body de la respuesta

Estructura del proyecto
/project-root
│── index.html       # Interfaz principal
│
├── css/
│   └── style.css    # Estilos de la aplicación
│
├── js/
│   ├── app.js       # Lógica de login, tokens y refresh
│   └── apiTester.js # Lógica del tester de APIs
│
└── README.md        # Documentación del proyecto

Cómo usarlo

Clonar el repositorio:

git clone https://github.com/tu-usuario/api-auth-tester.git
cd api-auth-tester


Abrir el archivo index.html en el navegador (se recomienda usar Live Server en VS Code para evitar problemas de CORS).

Iniciar sesión con un usuario válido de la API DummyJSON
.
Ejemplo:

Usuario: emilys

Contraseña: emilyspass

Probar los diferentes apartados:

Flujo de login y refresh

Activación del auto-refresh

Pruebas de endpoints con el API Tester

Tecnologías utilizadas

HTML5

CSS3

JavaScript (Vanilla)

DummyJSON API

Posibles mejoras futuras

Guardar historial de peticiones en localStorage.

Colecciones de requests al estilo Postman.

Soporte para otros esquemas de autenticación.

Interfaz responsive con mejor adaptación a móviles.