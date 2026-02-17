# Pendiente para el final del proyecto

## Endpoint combinado para reservas

**Recordatorio:** Al terminar todo lo demás, implementar el endpoint combinado en la API backend:

- **Nombre sugerido:** `POST /reservations/create-with-client` (o similar).
- **Qué hace:** Acepta en el body: `name`, `phone`, `email`, `date`, `time`, `people_count`, `table_id` (opcional).
- **Lógica:** Crear o buscar el cliente por email/teléfono, luego crear la reserva con ese `client_id`.
- **Objetivo:** Que el formulario público de reservas (`/reservation` y Book table en Home) envíe una sola petición con los datos del cliente y de la reserva, sin tener que hacer dos llamadas (cliente + reserva) desde el front.

Cuando llegues a este punto, conectar el formulario de reservas de la web pública a este endpoint.
