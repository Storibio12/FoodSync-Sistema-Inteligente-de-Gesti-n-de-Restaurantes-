# Login que no entra: qué revisar

Si al poner "las credenciales de la base de datos" el login no entra, suele ser por una de estas causas.

---

## 1. Contraseña: usar la contraseña en texto plano, no el hash

En la base de datos la contraseña está **hasheada** (bcrypt, etc.). Para iniciar sesión tienes que usar la **contraseña en texto plano** que se usó al crear ese usuario, no el valor que ves en la columna `password` de la tabla.

- **Correcto:** el email del usuario en la DB + la contraseña que tú (o el seed) definiste al crearlo.
- **Incorrecto:** el email + el hash que ves en la tabla (eso nunca coincidirá).

Si no recuerdas la contraseña, créala de nuevo en tu backend (endpoint de reset o actualizar el usuario con una contraseña nueva hasheada).

---

## 2. URL de la API (`.env.local`)

El login de Next.js llama a tu API en:

- `POST {NEXT_PUBLIC_API_URL}/auth/login`

Si no tienes `.env.local`, se usa por defecto `http://localhost:3000/api/v1`. Si tu API corre en **otro puerto o ruta**, el login fallará (error de conexión o "No se pudo conectar con la API").

**Qué hacer:**

1. Crea `.env.local` en la raíz del proyecto (junto a `package.json`).
2. Pon la URL base de tu API, **sin barra al final**:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

Si tu backend corre en el puerto 4000:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

3. Reinicia el servidor de Next.js (`npm run dev`) después de cambiar `.env.local`.

Puedes copiar `.env.example` como base.

---

## 3. Backend encendido y endpoint correcto

- El **backend** (tu API) debe estar **corriendo** cuando haces login.
- El endpoint debe ser exactamente: **POST** `{API_URL}/auth/login` con body `{ "email": "...", "password": "..." }`.
- La API debe responder con un **token** en el JSON, por ejemplo: `{ "token": "eyJ..." }` o `{ "accessToken": "..." }`.

Si la API no está levantada o la ruta es otra, verás errores de conexión o "La API no devolvió un token".

---

## 4. Usuario existente y activo

- El usuario debe existir en la tabla que usa tu API para login (p. ej. `app_user`).
- Si tu API usa un campo `active`, el usuario debe estar activo para poder iniciar sesión.

---

## Resumen rápido

| Síntoma | Revisar |
|--------|--------|
| "No se pudo conectar con la API" | Backend corriendo, `.env.local` con `NEXT_PUBLIC_API_URL` correcto (puerto y path). |
| "Credenciales incorrectas" | Email correcto y **contraseña en texto plano** (no el hash de la DB). |
| "La API no devolvió un token" | Que tu API responda 200 con `{ "token": "..." }` (o `accessToken`). |
