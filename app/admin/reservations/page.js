"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPatch } from "@/app/lib/adminApi";

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
      setError(e.message || "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function cancel(id) {
    setActioning(id);
    try {
      await adminPatch(`reservations/${id}/cancel`, {});
      await load();
    } catch (e) {
      setError(e.message || "Error al cancelar");
    } finally {
      setActioning(null);
    }
  }

  async function updateStatus(id, status) {
    setActioning(id);
    try {
      await adminPatch(`reservations/${id}`, { status });
      await load();
    } catch (e) {
      setError(e.message || "Error al actualizar");
    } finally {
      setActioning(null);
    }
  }

  if (loading) {
    return (
      <section className="bg1-pattern p-t-100 p-b-113">
        <div className="container p-t-40">
          <p className="txt4">Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg1-pattern p-t-100 p-b-113">
      <div className="container">
        <h1 className="tit3 m-b-10">Reservaciones</h1>
        <p className="txt4 m-b-30">
          Aquí puedes ver, confirmar o cancelar las reservaciones realizadas desde la web.
        </p>
        {error && (
          <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>
            {error}
          </p>
        )}

        <div className="table-responsive bo-rad-10 bgwhite overflow-hidden m-t-10">
          <table className="table table-striped m-b-0">
            <thead>
              <tr className="txt9">
                <th className="p-l-20 p-t-20 p-b-20">ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Personas</th>
                <th>Mesa</th>
                <th>Estado</th>
                <th className="p-r-20">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-l-20 p-t-20 p-b-20 txt23">
                    No hay reservaciones.
                  </td>
                </tr>
              ) : (
                list.map((r) => {
                  const id = r.reservation_id ?? r.id;
                  const clientId = r.client_id ?? r.client?.client_id ?? r.client?.id;
                  const clientName =
                    (clientId != null && clientNames[String(clientId)]) ||
                    r.client?.name ||
                    r.client_name ||
                    clientId ||
                    "—";
                  const tableLabel =
                    r.table?.table_number ??
                    r.table_number ??
                    (r.table_id != null ? `#${r.table_id}` : "—");
                  const status = (r.status || "pending").toLowerCase();
                  const isCancelled = status === "cancelled" || status === "canceled";
                  const isPending = status === "pending";

                  return (
                    <tr key={id}>
                      <td className="p-l-20 p-t-15 p-b-15">{id}</td>
                      <td>{clientName}</td>
                      <td>{r.date ?? "—"}</td>
                      <td>{r.time ?? "—"}</td>
                      <td>{r.people_count ?? "—"}</td>
                      <td>{tableLabel}</td>
                      <td>
                        <span
                          className={`bo-rad-10 p-l-10 p-r-10 p-t-5 p-b-5 size12 ${
                            isCancelled ? "bg-secondary" : "bg-success"
                          }`}
                        >
                          {r.status ?? "pending"}
                        </span>
                      </td>
                      <td className="p-r-20">
                        {isPending && !isCancelled && (
                          <div className="flex-w">
                            <button
                              type="button"
                              className="btn3 flex-c-m size12 txt11 trans-0-4 m-r-5 m-b-5"
                              onClick={() => updateStatus(id, "confirmed")}
                              disabled={actioning === id}
                            >
                              Confirmar
                            </button>
                            <button
                              type="button"
                              className="btn3 flex-c-m size12 txt11 trans-0-4 m-b-5"
                              style={{ background: "#666" }}
                              onClick={() => cancel(id)}
                              disabled={actioning === id}
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
