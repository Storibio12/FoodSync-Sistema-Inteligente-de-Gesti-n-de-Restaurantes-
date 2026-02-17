"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPatch } from "@/app/lib/adminApi";

export default function AdminReservationsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actioning, setActioning] = useState(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminGet("reservations");
      setList(data?.data?.reservations ?? []);
    } catch (e) {
      setError(e.message || "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

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

  if (loading) return <div className="container p-t-40"><p className="txt4">Cargando...</p></div>;

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Reservaciones</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th>Cliente / Fecha</th>
              <th>Hora</th>
              <th>Personas</th>
              <th>Estado</th>
              <th className="p-r-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={6} className="p-l-20 p-t-20 p-b-20 txt23">No hay reservaciones.</td></tr>
            ) : (
              list.map((r) => (
                <tr key={r.reservation_id ?? r.id}>
                  <td className="p-l-20 p-t-15 p-b-15">{r.reservation_id ?? r.id}</td>
                  <td>{r.client_id ?? r.client?.name ?? "—"} / {r.date ?? "—"}</td>
                  <td>{r.time ?? "—"}</td>
                  <td>{r.people_count ?? "—"}</td>
                  <td><span className={`bo-rad-10 p-l-10 p-r-10 p-t-5 p-b-5 size12 ${(r.status || "").toLowerCase() === "cancelled" ? "bg-secondary" : "bg1"}`}>{r.status ?? "pending"}</span></td>
                  <td className="p-r-20">
                    {(r.status || "").toLowerCase() !== "cancelled" && (
                      <>
                        <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4 m-r-5 m-b-5" onClick={() => updateStatus(r.reservation_id ?? r.id, "confirmed")} disabled={actioning === (r.reservation_id ?? r.id)}>Confirmar</button>
                        <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4 m-b-5" style={{ background: "#666" }} onClick={() => cancel(r.reservation_id ?? r.id)} disabled={actioning === (r.reservation_id ?? r.id)}>Cancelar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
