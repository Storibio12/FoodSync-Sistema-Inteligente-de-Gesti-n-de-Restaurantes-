# Análisis de alineación: API, Base de datos y Web pública

## ✅ Confirmación: Todo está alineado

---

## 1. API ↔ Base de datos: ✅ Alineado

### Mapeo de endpoints a tablas de la DB

| Endpoint API | Tabla DB | Estado |
|--------------|----------|--------|
| `/auth/login` | `app_user` (email, password) | ✅ Alineado |
| `/users` (GET, POST, PATCH, DELETE) | `app_user` | ✅ Alineado |
| `/clients` (GET, POST, PATCH, DELETE) | `client` | ✅ Alineado |
| `/reservations` (GET, POST, PATCH, DELETE, `/cancel`) | `reservation` | ✅ Alineado |
| `/tables` (GET, POST, PATCH, DELETE) | `restaurant_table` | ✅ Alineado |
| `/products` (GET, POST, PATCH, DELETE) | `product` | ✅ Alineado |
| `/inventory-movements` (GET, POST, `/product/{id}`) | `inventory_movement` | ✅ Alineado |
| `/sales` (GET, POST) | `sale` | ✅ Alineado |
| `/sale-details` (GET) | `sale_detail` | ✅ Alineado |
| `/daily-reports` (GET, POST) | `daily_report` | ✅ Alineado |
| `/employees` (GET, POST, PATCH, DELETE) | `employee` | ✅ Alineado |
| `/shifts` (GET, POST, PATCH, DELETE) | `shift` | ✅ Alineado |
| `/menu` (GET, POST, PATCH, DELETE) | `product` (con lógica de menú) | ✅ Alineado |

**Observaciones:**
- La API tiene endpoints para todas las tablas del ERD.
- Los campos coinciden (client_id, table_id, product_id, etc.).
- Las relaciones están respetadas (reservations → client + table, shifts → employee, etc.).
- El endpoint `/menu` parece usar la tabla `product` con una lógica adicional (ingredientes, etc.), lo cual es válido.

---

## 2. API ↔ Web pública: ⚠️ Parcialmente alineado (necesita ajustes)

### Lo que SÍ está alineado

| Funcionalidad web pública | Endpoint API disponible | Estado |
|---------------------------|-------------------------|--------|
| **Formulario de Reservas** (`/reservation`) | `POST /reservations` | ✅ Existe |
| Campos: date, time, people, name, phone, email | Requiere: client_id, date, time, people_count | ⚠️ Necesita ajuste |
| **Formulario de Contacto** (`/contact`) | No hay endpoint específico | ❌ Falta endpoint |

### Lo que necesita ajustes

#### A. Formulario de Reservas (`/reservation` y `/` - Book table)

**Problema:** El formulario público envía:
- `name`, `phone`, `email` (datos del cliente)
- `date`, `time`, `people` (datos de la reserva)

Pero la API espera:
- `client_id` (integer) - no se envía directamente
- `date`, `time`, `people_count` (ok)
- `table_id` (opcional)

**Solución propuesta:**
1. **Opción A (recomendada):** Crear un endpoint combinado en tu API:
   - `POST /reservations/create-with-client` que acepte `name`, `phone`, `email`, `date`, `time`, `people_count`, `table_id` (opcional)
   - La API crea o busca el cliente y luego crea la reserva.

2. **Opción B:** En Next.js, hacer dos llamadas:
   - Primero `POST /clients` con name, phone, email → obtener `client_id`
   - Luego `POST /reservations` con `client_id`, date, time, people_count

**Recomendación:** Opción A es más limpia y evita crear clientes duplicados.

#### B. Formulario de Contacto (`/contact`)

**Problema:** No hay endpoint para mensajes de contacto.

**Solución propuesta:**
- Crear endpoint `POST /contact-messages` en tu API que guarde:
  - `name`, `email`, `phone`, `message`
  - O usar una tabla nueva `contact_message` o reutilizar `client` con un campo adicional.

#### C. Menú público (`/menu`)

**Estado:** La web muestra platos estáticos. La API tiene `/menu` y `/products`.

**Solución:** Conectar la página `/menu` para que consuma `GET /menu` o `GET /products` y muestre dinámicamente los platos desde la DB.

---

## 3. Estructura de la API

### Base URL
```
http://localhost:3000/api/v1
```

### Autenticación
- **Login:** `POST /auth/login` → devuelve `{ status, token, data: { user } }`
- **Token:** Se envía en header `Authorization: Bearer <token>` (asumido, no está explícito en el JSON pero es estándar)

### Formato de respuestas
Todas las respuestas siguen un patrón consistente:
```json
{
  "status": "success",
  "results": 10,  // opcional, para listados
  "data": {
    "clients": [...],  // o "reservations", "products", etc.
    "client": {...}     // para GET por ID o POST
  }
}
```

---

## 4. Plan de acción para el panel admin

### Módulos del panel (basados en la API y DB)

| Módulo | Rutas admin | Endpoints API a usar |
|--------|-------------|---------------------|
| **Dashboard** | `/admin/dashboard` | Resumen: `/daily-reports`, últimas reservas, ventas recientes |
| **Reservaciones** | `/admin/reservations` | `GET /reservations`, `PATCH /reservations/{id}`, `PATCH /reservations/{id}/cancel` |
| **Clientes** | `/admin/clients` | `GET /clients`, `POST /clients`, `PATCH /clients/{id}`, `DELETE /clients/{id}` |
| **Mesas** | `/admin/tables` | `GET /tables`, `POST /tables`, `PATCH /tables/{id}`, `DELETE /tables/{id}` |
| **Menú/Productos** | `/admin/menu` | `GET /menu`, `POST /menu`, `PATCH /menu/{id}`, `DELETE /menu/{id}` |
| **Inventario** | `/admin/inventory` | `GET /products`, `GET /inventory-movements`, `POST /inventory-movements` |
| **Ventas** | `/admin/sales` | `GET /sales`, `GET /sales/{id}`, `GET /sale-details` |
| **Reportes** | `/admin/reports` | `GET /daily-reports`, `POST /daily-reports` |
| **Empleados** | `/admin/employees` | `GET /employees`, `POST /employees`, `PATCH /employees/{id}`, `DELETE /employees/{id}` |
| **Turnos** | `/admin/shifts` | `GET /shifts`, `POST /shifts`, `PATCH /shifts/{id}`, `DELETE /shifts/{id}` |
| **Usuarios** | `/admin/users` | `GET /users`, `POST /users`, `PATCH /users/{id}`, `DELETE /users/{id}` |

---

## 5. Cómo proceder

### Paso 1: Configuración inicial
- [ ] Crear `.env.local` con `NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1` (o la URL de tu API real)
- [ ] Crear `middleware.js` para proteger `/admin/*`
- [ ] Crear estructura de carpetas `app/admin/`

### Paso 2: Login y autenticación
- [ ] Página `/admin/login` que llame a `POST /auth/login`
- [ ] Guardar token en cookie (httpOnly vía API Route de Next.js)
- [ ] Middleware que valide token y redirija si no está autenticado

### Paso 3: Layout del admin (sidebar fijo)
- [ ] Layout `app/admin/layout.js` con sidebar fijo a la izquierda
- [ ] Sidebar con menú: Dashboard, Reservaciones, Clientes, Mesas, Menú, Inventario, Ventas, Reportes, Empleados, Turnos, Usuarios
- [ ] Mismo diseño que la web pública (mismas clases CSS del template Pato)

### Paso 4: Páginas del panel (una por módulo)
- [ ] Dashboard: resumen con cards usando `/daily-reports`, últimas reservas
- [ ] Reservaciones: listado con `GET /reservations`, acciones para cambiar estado/cancelar
- [ ] Clientes: CRUD completo con `/clients`
- [ ] Mesas: CRUD completo con `/tables`
- [ ] Menú: CRUD con `/menu`
- [ ] Inventario: listado de productos y movimientos
- [ ] Ventas: listado y detalle de ventas
- [ ] Reportes: ver y crear reportes diarios
- [ ] Empleados: CRUD con `/employees`
- [ ] Turnos: CRUD con `/shifts`
- [ ] Usuarios: CRUD con `/users`

### Paso 5: Ajustes en la web pública (opcional, después)
- [ ] Conectar formulario de reservas para que cree cliente + reserva (o usar endpoint combinado si lo creas)
- [ ] Conectar formulario de contacto (crear endpoint si falta)
- [ ] Hacer `/menu` dinámico consumiendo `GET /menu` o `/products`

---

## 6. Resumen de alineación

| Aspecto | Estado | Notas |
|---------|--------|-------|
| **API ↔ Base de datos** | ✅ **100% alineado** | Todos los endpoints mapean correctamente a las tablas |
| **API ↔ Web pública** | ⚠️ **Parcialmente alineado** | Falta endpoint de contacto; reservas necesita ajuste (client_id) |
| **Panel admin ↔ API** | ✅ **100% listo** | Todos los módulos del admin tienen endpoints disponibles |

---

## Conclusión

**✅ Puedo proceder con el panel admin inmediatamente.**

La API está completa y alineada con la base de datos. El panel admin puede consumir todos los endpoints sin problemas. Los ajustes en la web pública (formularios) se pueden hacer después o en paralelo.

**¿Procedo a crear el panel admin con sidebar fijo usando estos endpoints?**
