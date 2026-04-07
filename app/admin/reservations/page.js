"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPatch } from "@/app/lib/adminApi";
import { CalendarRange, CheckCircle, Clock, Users, MapPin, AlertCircle, Ban, Banknote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function AdminReservationsPage() {
  const [list, setList] = useState([]);
  const [clientNames, setClientNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actioning, setActioning] = useState(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [reservationsData, clientsData] = await Promise.all([
        adminGet("reservations"),
        adminGet("clients").catch(() => null),
      ]);

      const reservations = reservationsData?.data?.reservations ?? [];
      const clients = clientsData?.data?.clients ?? [];

      const map = {};
      clients.forEach((c) => {
        const id = c.client_id ?? c.id;
        if (id != null) {
          map[String(id)] = c.name ?? "";
        }
      });

      setClientNames(map);
      setList(reservations);
    } catch (e) {
      setError(e.message || "Error al cargar las reservaciones");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function cancel(id) {
    const result = await Swal.fire({
      title: '¿Cancelar reservación?',
      text: "El cliente perderá su mesa reservada y se liberará el espacio.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c0392b',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Mantener'
    });

    if (result.isConfirmed) {
      setActioning(id);
      try {
        await adminPatch(`reservations/${id}/cancel`, {});
        Swal.fire({
          title: 'Cancelada',
          text: 'La reservación ha sido cancelada exitosamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        await load();
      } catch (e) {
        Swal.fire('Error', e.message || "Error al cancelar", 'error');
      } finally {
        setActioning(null);
      }
    }
  }

  async function updateStatus(id, status) {
    const isConfirming = status === 'confirmed';
    const result = await Swal.fire({
      title: isConfirming ? '¿Confirmar reservación?' : '¿Actualizar estado?',
      text: isConfirming ? "Marcarás esta mesa como garantizada para el cliente." : "Vas a cambiar el estado de la reservación.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: isConfirming ? '#10b981' : '#3b82f6',
      cancelButtonColor: '#64748b',
      confirmButtonText: isConfirming ? 'Sí, confirmar' : 'Si, actualizar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      setActioning(id);
      try {
        await adminPatch(`reservations/${id}`, { status });
        Swal.fire({
          title: '¡Actualizada!',
          text: 'El estado de la reservación se ha actualizado.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        await load();
      } catch (e) {
        Swal.fire('Error', e.message || "Error al actualizar", 'error');
      } finally {
        setActioning(null);
      }
    }
  }

  async function completeVisit(id) {
    const result = await Swal.fire({
      title: "Registrar consumo",
      text: "Indica el monto total consumido (DOP). Se cerrará la visita y se registrará en ventas.",
      input: "number",
      inputPlaceholder: "0.00",
      inputAttributes: { min: 0, step: "0.01" },
      showCancelButton: true,
      confirmButtonText: "Registrar y cerrar",
      cancelButtonText: "Volver",
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#64748b",
      inputValidator: (value) => {
        if (value === "" || value === null || value === undefined) {
          return "Introduce un monto.";
        }
        const n = parseFloat(String(value).replace(",", "."), 10);
        if (Number.isNaN(n) || n < 0) {
          return "El monto debe ser mayor o igual a 0.";
        }
        return null;
      },
    });

    if (!result.isConfirmed || result.value === undefined) return;

    const total = parseFloat(String(result.value).replace(",", "."), 10);
    setActioning(id);
    try {
      await adminPatch(`reservations/${id}/complete`, { total });
      await Swal.fire({
        title: "Visita cerrada",
        text: "El consumo quedó registrado y aparecerá en Ventas.",
        icon: "success",
        timer: 2200,
        showConfirmButton: false,
      });
      await load();
    } catch (e) {
      Swal.fire("Error", e.message || "No se pudo registrar el consumo.", "error");
    } finally {
      setActioning(null);
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      return new Intl.DateTimeFormat('es-DO', {
        year: 'numeric', month: 'long', day: 'numeric'
      }).format(localDate);
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "—";
    return timeString.substring(0, 5);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'cancelled': case 'canceled': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'completed': case 'closed': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'Confirmada';
      case 'cancelled': case 'canceled': return 'Cancelada';
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completada';
      case 'closed': return 'Cerrada';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Reservaciones</h1>
          <p className="text-sm text-slate-500 mt-1">Gestiona, confirma y cancela las reservaciones del restaurante.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 flex items-center justify-center gap-2 text-slate-400">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          Cargando reservaciones...
        </div>
      ) : list.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-white rounded-xl shadow-sm border border-slate-200">
          <CalendarRange className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>No hay reservaciones registradas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {list.map((r, index) => {
              const id = r.reservation_id ?? r.id;
              const clientId = r.client_id ?? r.client?.client_id ?? r.client?.id;
              const clientName =
                (clientId != null && clientNames[String(clientId)]) ||
                r.client?.name ||
                r.client_name ||
                clientId ||
                "Cliente Desconocido";
              const tableLabel = r.table?.table_number ?? r.table_number ?? (r.table_id != null ? r.table_id : "—");
              const status = (r.status || "pending").toLowerCase();
              const isCancelled = status === "cancelled" || status === "canceled";
              const isPending = status === "pending";
              const isConfirmed = status === "confirmed";
              const isCompleted = status === "completed" || status === "closed";

              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg pr-4">{clientName}</h3>
                      <span className="text-xs font-mono text-slate-400">ID: #{id}</span>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusColor(status)}`}>
                      {getStatusText(status)}
                    </span>
                  </div>

                  <div className="p-5 flex-grow space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarRange className="w-4 h-4 text-indigo-500" />
                        <span>{formatDate(r.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span>{formatTime(r.time)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4 text-indigo-500" />
                        <span>{r.people_count ?? "—"} Personas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        <span>Mesa {tableLabel}</span>
                      </div>
                    </div>
                  </div>

                  {isPending && !isCancelled && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end items-center mt-auto">
                      <button
                        onClick={() => updateStatus(id, "confirmed")}
                        disabled={actioning === id}
                        className="inline-flex flex-1 justify-center items-center gap-2 px-4 py-2 bg-emerald-500 text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" /> Confirmar
                      </button>
                      <button
                        onClick={() => cancel(id)}
                        disabled={actioning === id}
                        className="inline-flex flex-1 justify-center items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50"
                      >
                        <Ban className="w-4 h-4" /> Cancelar
                      </button>
                    </div>
                  )}

                  {isConfirmed && !isCancelled && !isCompleted && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end items-center mt-auto">
                      <button
                        type="button"
                        onClick={() => completeVisit(id)}
                        disabled={actioning === id}
                        className="inline-flex w-full justify-center items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        <Banknote className="w-4 h-4" /> Registrar consumo
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
