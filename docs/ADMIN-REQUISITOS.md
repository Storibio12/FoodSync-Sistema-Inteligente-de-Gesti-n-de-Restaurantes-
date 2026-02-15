# Requisitos para el panel de administración

Todo lo que necesitas tener y definir para que el login y el panel admin funcionen con tu API y tu base de datos.

---

## 1. Lo que debe ofrecer tu API (backend)

### 1.1 Autenticación

Tu API debe tener al menos un endpoint de login que:

- **Acepte:** usuario/email + contraseña (por ejemplo `POST /api/auth/login` o el path que uses).
- **Valide** contra tu base de datos.
- **Devuelva** algo que podamos guardar para identificar la sesión, por ejemplo:
  - **Opción A (recomendada):** un **token JWT** (ej. `{ "token": "eyJhbG..." }`).
  - **Opción B:** un **session ID** y que tu API tenga sesiones en servidor (cookie de sesión).

Ejemplo de cuerpo de request que enviará Next.js:

```json
{
  "email": "admin@restaurant.com",
  "password": "tu_password"
}
```

Ejemplo de respuesta que debería devolver tu API (si usas JWT):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@restaurant.com",
    "name": "Admin"
  }
}
```

- **Cerrar sesión:** si tu API tiene un endpoint de logout (ej. `POST /api/auth/logout`) para invalidar el token/sesión, lo podemos llamar; si no, con borrar el token en el front es suficiente.

### 1.2 Verificar que el usuario sigue autenticado

Necesitamos poder comprobar si el token/sesión sigue siendo válida:

- **Opción A:** Un endpoint tipo `GET /api/auth/me` o `GET /api/auth/verify` que reciba el token (en header `Authorization: Bearer <token>`) y responda 200 si es válido o 401 si no.
- **Opción B:** Que tu API valide el token en cada request de admin; entonces el middleware de Next.js solo comprueba que exista token y opcionalmente llama a `/auth/me` para validar.

### 1.3 Endpoints de contenido (CRUD) según lo que quieras administrar

El panel consumirá tu API. Debes tener (o crear) endpoints que lean/escriban en tu base de datos. Ejemplos por módulo:

| Módulo     | Ejemplo de endpoints                          | Uso en el admin                          |
|------------|------------------------------------------------|------------------------------------------|
| **Menú**   | `GET /api/menu`, `POST /api/menu`, `PUT /api/menu/:id`, `DELETE /api/menu/:id` | Listar, crear, editar, borrar platos     |
| **Reservas** | `GET /api/reservations`, `PATCH /api/reservations/:id` (ej. estado) | Listar reservas, cambiar estado          |
| **Blog**   | `GET /api/blog`, `POST /api/blog`, `PUT /api/blog/:id`, `DELETE /api/blog/:id` | Listar, crear, editar, borrar entradas   |
| **Galería**| `GET /api/gallery`, `POST /api/gallery`, `DELETE /api/gallery/:id` | Listar y subir/borrar imágenes           |
| **Contacto** | `GET /api/contact-messages`                   | Listar mensajes del formulario de contacto |

No es obligatorio tener todos desde el primer día: se puede empezar por login + un módulo (por ejemplo reservas o menú) e ir añadiendo el resto.

### 1.4 CORS

Tu API debe permitir peticiones desde el origen donde corre Next.js (en desarrollo `http://localhost:3000`, en producción tu dominio). Configura CORS en tu backend para aceptar ese origen y los métodos que uses (GET, POST, PUT, PATCH, DELETE) y el header `Authorization` si usas Bearer token.

### 1.5 Base de datos

La estructura de la DB la defines tú según tu API. Solo debe ser coherente con los endpoints: tablas para usuarios (login), menú, reservas, blog, galería, mensajes de contacto, etc. No es obligatorio que cambies nada de la DB solo por Next.js; Next.js solo consumirá lo que tu API exponga.

---

## 2. Lo que necesitas en el proyecto Next.js

### 2.1 Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto (no se sube a Git) con la URL base de tu API:

```env
NEXT_PUBLIC_API_URL=https://tu-api.com
```

O en desarrollo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

- `NEXT_PUBLIC_` es necesario para poder usar esta variable en el navegador (login, fetch desde el panel).
- Si tu API está en otro puerto o ruta, ajusta la URL.

### 2.2 Estructura de rutas del admin (lo que se implementará)

Rutas propuestas:

| Ruta | Protegida | Descripción |
|------|-----------|-------------|
| `/admin` | Sí | Redirige a `/admin/dashboard` o a `/admin/login` si no está autenticado |
| `/admin/login` | No | Página de login (formulario que llama a tu API) |
| `/admin/dashboard` | Sí | Resumen (ej. últimas reservas, accesos rápidos) |
| `/admin/menu` | Sí | Listar/crear/editar/borrar platos (consumiendo tu API) |
| `/admin/reservations` | Sí | Listar reservas, cambiar estado |
| `/admin/blog` | Sí | Listar/crear/editar/borrar entradas |
| `/admin/gallery` | Sí | Listar/subir/borrar imágenes (según tu API) |
| `/admin/messages` | Sí | Mensajes del formulario de contacto (si tu API lo tiene) |

Todas las rutas bajo `/admin` excepto `/admin/login` estarán protegidas: sin token válido → redirección a `/admin/login`.

### 2.3 Dónde guardar el token

- Tras un login exitoso contra tu API, guardaremos el token (JWT) en una **cookie** con nombre tipo `admin_token` (o el que elijamos).
- Opción recomendada: cookie **httpOnly** para que JavaScript no la lea directamente (más seguro). Eso requiere que el login pase por una **API Route de Next.js** (`/api/auth/login`) que reciba usuario/contraseña, llame a tu API, y si la respuesta es correcta, establezca la cookie y devuelva 200. El middleware leerá la cookie para decidir si dejar pasar a `/admin/*`.
- Si prefieres algo más simple al inicio: guardar el token en `localStorage` o en una cookie no httpOnly; el middleware en Next no puede leer `localStorage` (solo corre en servidor), así que en ese caso la protección podría hacerse solo en el cliente (layout o página que compruebe token y redirija). Para máxima claridad y seguridad, lo ideal es cookie + API Route de login.

### 2.4 Middleware de protección

- Archivo `middleware.js` en la raíz del proyecto.
- Si la ruta es `/admin` o empieza por `/admin/` y no es `/admin/login`:
  - Comprobar si existe la cookie del token (o si el token es válido llamando a tu API).
  - Si no hay token o no es válido → redirigir a `/admin/login`.
- Si la ruta es `/admin/login` y el usuario ya tiene token válido → redirigir a `/admin/dashboard` (opcional pero buena UX).

### 2.5 Páginas y componentes a crear

- **`/admin/login`:** página con formulario (email, contraseña). Al enviar: llamada a tu API (o a nuestra API Route que llama a tu API), guardar token en cookie, redirigir a `/admin/dashboard`.
- **Layout de admin:** layout común para todas las rutas `/admin/*` (menú lateral o superior, zona de contenido). En ese layout se puede comprobar de nuevo la sesión y mostrar nombre de usuario / botón de cerrar sesión.
- **Páginas de cada módulo:** por ejemplo `admin/menu/page.js` que haga `GET /api/menu` a tu API, muestre la lista, y tenga botones/forms para crear/editar/borrar usando POST/PUT/DELETE a tu API.
- **Utilidad de fetch:** una función (o módulo) que haga las peticiones a tu API añadiendo el header `Authorization: Bearer <token>` (leyendo el token de la cookie o del estado). Así todas las páginas del panel usan la misma lógica y la misma base URL (`NEXT_PUBLIC_API_URL`).

### 2.6 Cerrar sesión

- Botón “Cerrar sesión” en el layout del admin que:
  - Opcionalmente llame a `POST /api/auth/logout` de tu API si existe.
  - Borre la cookie del token (o el token del almacenamiento que uses).
  - Redirija a `/admin/login`.

---

## 3. Resumen checklist

### En tu API/backend

- [ ] Endpoint de login (ej. `POST /api/auth/login`) que devuelva token (ej. JWT) o session id.
- [ ] Forma de verificar token/sesión (ej. `GET /api/auth/me` o validación en cada request).
- [ ] Endpoints de contenido para lo que quieras administrar (menú, reservas, blog, galería, mensajes).
- [ ] CORS configurado para el origen de tu app Next.js.
- [ ] Base de datos con tablas coherentes con esos endpoints.

### En Next.js

- [ ] `.env.local` con `NEXT_PUBLIC_API_URL` apuntando a tu API.
- [ ] `middleware.js` que proteja `/admin/*` (excepto `/admin/login`) usando la cookie del token.
- [ ] Página `/admin/login` que envíe credenciales a tu API (o a API Route) y guarde el token en cookie.
- [ ] Layout de admin (menú, usuario, cerrar sesión).
- [ ] Páginas del panel que consuman tu API (dashboard, menu, reservations, blog, etc.) usando la URL y el token definidos.

### Seguridad (recomendaciones)

- [ ] Contraseñas nunca en el front; el login solo envía a tu API (o a nuestra API Route que reenvía a tu API).
- [ ] Token en cookie httpOnly si es posible (vía API Route de login en Next.js).
- [ ] Tu API debe validar el token en cada request de admin y devolver 401 si no es válido.
- [ ] HTTPS en producción para tu API y para tu sitio Next.js.

---

## 4. Orden sugerido de implementación

1. **API:** Tener al menos login y un endpoint de verificación (y si quieres, un CRUD simple, ej. reservas).
2. **Next.js:** Variables de entorno, middleware, página de login y guardado de token en cookie.
3. **Next.js:** Layout del admin y una primera página protegida (ej. dashboard o listado de reservas).
4. **Next.js:** Ir añadiendo módulos (menú, blog, galería, mensajes) según tengas los endpoints en tu API.

Cuando tengas la URL de tu API, el método de login (y si usas JWT o sesión), y los nombres exactos de los endpoints, se puede bajar esto a código concreto en tu repo (middleware, `/admin/login`, layout admin y una página de ejemplo que consuma tu API).
