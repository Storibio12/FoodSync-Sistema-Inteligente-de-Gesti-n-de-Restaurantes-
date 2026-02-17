"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost, adminPatch, adminDelete } from "@/app/lib/adminApi";

export default function AdminShiftsPage() {
  const [list, setList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ employee_id: "", date: "", start_time: "", end_time: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [shiftsData, empData] = await Promise.all([
        adminGet("shifts"),
        adminGet("employee"),
      ]);
      setList(Array.isArray(shiftsData) ? shiftsData : (shiftsData?.data?.shifts ?? shiftsData?.data ?? []));
      setEmployees(empData?.data?.employees ?? []);
    } catch (e) {
      setError(e.message || "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const payload = {
      employee_id: Number(form.employee_id),
      date: form.date,
      start_time: form.start_time.length === 5 ? form.start_time + ":00" : form.start_time,
      end_time: form.end_time.length === 5 ? form.end_time + ":00" : form.end_time,
    };
    try {
      if (modal?.id != null) {
        await adminPatch(`shifts/${modal.id}`, payload);
      } else {
        await adminPost("shifts", payload);
      }
      setModal(null);
      setForm({ employee_id: "", date: "", start_time: "", end_time: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al guardar");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este turno?")) return;
    setError("");
    try {
      await adminDelete(`shifts/${id}`);
      await load();
    } catch (e) {
      setError(e.message || "Error al eliminar");
    }
  }

  function openEdit(s) {
    setModal({ id: s.shift_id ?? s.id });
    setForm({
      employee_id: String(s.employee_id ?? ""),
      date: (s.date || "").slice(0, 10),
      start_time: (s.start_time || "").slice(0, 5),
      end_time: (s.end_time || "").slice(0, 5),
    });
  }

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Turnos</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="m-b-30">
        <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" onClick={() => { setModal({}); setForm({ employee_id: "", date: "", start_time: "", end_time: "" }); }}>Nuevo turno</button>
      </div>

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th>Empleado ID</th>
              <th>Fecha</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th className="p-r-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && !loading ? (
              <tr><td colSpan={6} className="p-l-20 p-t-20 p-b-20 txt23">No hay turnos.</td></tr>
            ) : (
              list.map((s) => (
                <tr key={s.shift_id ?? s.id}>
                  <td className="p-l-20 p-t-15 p-b-15">{s.shift_id ?? s.id}</td>
                  <td>{s.employee_id ?? "—"}</td>
                  <td>{s.date ?? "—"}</td>
                  <td>{s.start_time ?? "—"}</td>
                  <td>{s.end_time ?? "—"}</td>
                  <td className="p-r-20">
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4 m-r-5" onClick={() => openEdit(s)}>Editar</button>
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4" style={{ background: "#c0392b" }} onClick={() => handleDelete(s.shift_id ?? s.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <div className="admin-modal-overlay" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }} onClick={() => setModal(null)}>
          <div className="bo-rad-10 bgwhite p-l-50 p-r-50 p-t-50 p-b-50" style={{ minWidth: 320 }} onClick={(e) => e.stopPropagation()}>
            <h3 className="tit5 m-b-25">{modal.id != null ? "Editar turno" : "Nuevo turno"}</h3>
            <form onSubmit={handleSubmit}>
              <span className="txt9">Empleado</span>
              <select className="bo-rad-10 sizefull txt10 p-l-20 bo2 size12 m-t-3 m-b-23" value={form.employee_id} onChange={(e) => setForm((f) => ({ ...f, employee_id: e.target.value }))} required>
                <option value="">Seleccionar</option>
                {employees.map((emp) => (
                  <option key={emp.employee_id ?? emp.id} value={emp.employee_id ?? emp.id}>{emp.name}</option>
                ))}
              </select>
              <span className="txt9">Fecha</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} required />
              </div>
              <span className="txt9">Hora inicio</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="time" value={form.start_time} onChange={(e) => setForm((f) => ({ ...f, start_time: e.target.value }))} required />
              </div>
              <span className="txt9">Hora fin</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="time" value={form.end_time} onChange={(e) => setForm((f) => ({ ...f, end_time: e.target.value }))} required />
              </div>
              <div className="flex-w">
                <button type="submit" className="btn3 flex-c-m size13 txt11 trans-0-4 m-r-10">Guardar</button>
                <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" style={{ background: "#666" }} onClick={() => setModal(null)}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
