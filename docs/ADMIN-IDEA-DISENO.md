# Ideas para el panel de administración

Objetivo: panel seguro (solo administradores), con la **misma línea de diseño** que la app pública (colores, tipografía, botones, formularios del template Pato).

---

## 1. Misma línea de diseño: qué reutilizar

La app pública usa:

- **Colores:** rojo `#ec1d25` (acento, botones, enlaces hover), fondos claros, gris `#666666` para texto.
- **Tipografía:** Montserrat (ya cargada en el layout), títulos con clases `tit2`, `tit3`, `tit5`, etc.
- **Botones:** clase `btn3 flex-c-m size13 txt11 trans-0-4` (el botón rojo del template).
- **Formularios:** inputs con `bo-rad-10`, `bo2`, `txt10`, `p-l-20`; labels con `txt9`; contenedores `wrap-inputname`, `size12`, etc.
- **Tarjetas / bloques:** `bo-rad-10`, fondos `bg1-pattern` o `bgwhite`, espaciados `p-t-40`, `m-b-23`.
- **Iconos:** Font Awesome (ya en el proyecto).

**Propuesta:** El admin use **el mismo CSS global** (mismo `layout.js` con los mismos estilos del template) y las **mismas clases** para:

- Botones de acción (Guardar, Eliminar, etc.) → mismo estilo `btn3`.
- Formularios (alta/edición de platos, entradas de blog) → mismos estilos de input y labels.
- Títulos de sección → `tit2`, `tit3`, `tit5`.
- Tablas o listados → mismo tipo de texto y espaciado; cabeceras con `txt13` o similar.

Así el admin no se ve como “otra app”; se siente como la misma marca, solo que con un layout distinto (sidebar + contenido).

---

## 2. Layout del admin: opciones

### Opción A – Sidebar fijo a la izquierda (recomendada)

- **Sidebar estrecho** (por ejemplo 260px) a la izquierda, fijo.
  - Logo o texto “Pato Admin” arriba (mismo logo que el público o variante).
  - Menú vertical: Dashboard, Menú, Reservas, Blog, Galería, Mensajes (si aplica).
  - Abajo: “Cerrar sesión”.
  - Mismo color de fondo que el header público (gradiente/claro) o `bg1` para mantener la línea.
- **Área de contenido** a la derecha:
  - Arriba opcional: barra fina con título de la sección y nombre del usuario.
  - Resto: contenido (tablas, formularios, cards) usando las mismas clases del template (espaciados, bordes, botones).
- **Responsive:** en móvil el sidebar puede ser colapsable (hamburguesa) o convertirse en menú superior, mantiendo los mismos estilos.

Ventaja: claro que es “zona admin”, pero visualmente coherente con la web pública.

### Opción B – Barra superior tipo “header público”

- **Barra superior** con el mismo estilo que el header público (misma altura, borde rojo arriba, mismo tipo de logo) pero con enlaces de admin (Dashboard, Menú, Reservas, etc.) y “Cerrar sesión”.
- **Contenido** debajo a ancho completo, con los mismos estilos de secciones (contenedor, `p-t-40`, etc.).

Ventaja: máximo parecido al header público; el admin se siente como “la misma web” con otra navegación.

### Opción C – Híbrido

- **Mismo header visual** que el público (misma barra, logo, color) pero con texto “Área de administración” y menú de admin.
- **Sidebar** solo para el menú de secciones (Dashboard, Menú, Reservas, etc.) y **Cerrar sesión** en el sidebar o en el header.

Recomendación: **Opción A** (sidebar fijo) suele ser la más cómoda para gestionar muchos módulos y listados, y sigue pudiendo usar exactamente la misma paleta y componentes del template.

---

## 3. Estructura de rutas (recordatorio)

- ` /admin` → redirige a `/admin/dashboard` o a `/admin/login` si no hay sesión.
- `/admin/login` → única ruta pública del admin; formulario con el mismo estilo que Contact/Reservation.
- `/admin/dashboard` → resumen (últimas reservas, accesos rápidos).
- `/admin/menu` → listado + alta/edición de platos.
- `/admin/reservations` → listado de reservas.
- `/admin/blog` → listado + alta/edición de entradas.
- `/admin/gallery` → listado + subir/borrar imágenes (según tu API).
- `/admin/messages` → mensajes de contacto (si tu API lo tiene).

Todas excepto `/admin/login` protegidas por middleware (cookie/token).

---

## 4. Cómo mantener la misma línea en código

1. **Un solo layout raíz**  
   El `layout.js` actual ya carga los CSS del template (main.css, util.css, etc.). El admin puede vivir bajo `app/admin/`: un `layout.js` dentro de `admin/` que **no** use el Header/Footer/Sidebar del público, pero **sí** deje intactos los estilos globales (no sobrescribas los CSS del template en el admin).

2. **Layout solo para admin**  
   En `app/admin/layout.js` (o `app/admin/(panel)/layout.js`):
   - No incluyas el `<DefaultLayout>` del público (no el header con Home/Menu/Contact, ni el footer ni el sidebar móvil).
   - Incluye tu **sidebar de admin** (con logo, enlaces, Cerrar sesión) y un `<main>` donde vaya `{children}`.
   - Usa contenedor `container` y clases del template para títulos y espaciado.

3. **Mismos componentes de “piel”**  
   Donde necesites botones o inputs:
   - Botón principal: `className="btn3 flex-c-m size13 txt11 trans-0-4"` (o las clases que ya uses en Reservation/Contact).
   - Inputs: mismas clases que en el formulario de reservas o contacto (`bo-rad-10 sizefull txt10 p-l-20`, etc.).
   - Títulos: `tit2`, `tit3`, `tit5` según nivel.

4. **Listados y tablas**  
   Puedes usar tablas HTML con estilos suaves (bordes, `bo-rad-10` en contenedor) o una grilla de “cards” con las mismas clases de bloque del template. Sin introducir otro design system; todo con las utilidades del Pato.

5. **Iconos**  
   Seguir con Font Awesome como en el público (mismo conjunto de iconos).

Con esto el panel queda **no accesible para clientes** (protegido por middleware + login) y **con la misma línea de diseño** que la app pública (misma marca, mismos colores, mismos botones y formularios).

Si quieres, el siguiente paso puede ser: elegir Opción A, B o C y que te proponga la estructura exacta de `app/admin` (layout + sidebar + una página de ejemplo) usando ya las clases del template.
