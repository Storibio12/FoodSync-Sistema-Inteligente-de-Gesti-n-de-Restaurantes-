"use client";

import { useState, useRef, useEffect } from "react";

const timeOptions = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];
const peopleOptions = Array.from({ length: 12 }, (_, i) => (i === 0 ? "1 person" : `${i + 1} people`));

/** Convierte DD/MM/YYYY o YYYY-MM-DD a YYYY-MM-DD. */
function parseDateToYYYYMMDD(str) {
  if (!str || typeof str !== "string") return "";
  const trimmed = str.trim();
  const parts = trimmed.split(/[/-]/).map((p) => p.trim());
  if (parts.length !== 3) return "";
  const [a, b, c] = parts;
  const year = a.length === 4 ? a : (c.length === 4 ? c : `20${c}`);
  const month = (a.length === 4 ? b : b).padStart(2, "0");
  const day = (a.length === 4 ? c : a).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Extrae número de "2 people" o "1 person". */
function parsePeople(str) {
  if (!str) return null;
  const n = parseInt(str, 10);
  return Number.isNaN(n) ? null : n;
}

export default function BookingFormHome() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef(null);

  // Mismo selector de fecha que en la página de reservas (daterangepicker)
  useEffect(() => {
    if (typeof window === "undefined" || !window.$ || !window.$.fn.daterangepicker) return;
    const form = formRef.current;
    const input = form?.querySelector(".my-calendar");
    if (!input) return;

    const initPicker = () => {
      const $input = window.$(input);
      if ($input.data("daterangepicker")) return;
      $input.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: "DD/MM/YYYY" },
      });
    };

    const t = setTimeout(initPicker, 500);
    return () => clearTimeout(t);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const form = e.target;
    const dateInput = (form.querySelector('input[name="date"]')?.value ?? "").trim();
    const date = parseDateToYYYYMMDD(dateInput);
    const time = (form.querySelector('select[name="time"]')?.value ?? "").trim();
    const peopleLabel = (form.querySelector('select[name="people"]')?.value ?? "").trim();
    const peopleCount = parsePeople(peopleLabel);
    const name = (form.querySelector('input[name="name"]')?.value ?? "").trim();
    const phone = (form.querySelector('input[name="phone"]')?.value ?? "").trim();
    const email = (form.querySelector('input[name="email"]')?.value ?? "").trim();

    if (!name || !phone) {
      setSubmitError("Nombre y teléfono son obligatorios.");
      return;
    }
    if (!date) {
      setSubmitError("Selecciona o introduce la fecha (DD/MM/YYYY).");
      return;
    }
    if (!time || !peopleCount) {
      setSubmitError("Selecciona hora y número de personas.");
      return;
    }

    setSubmitLoading(true);
    try {
      const body = { name, phone, date, time, people_count: peopleCount };
      if (email) body.email = email;

      const res = await fetch("/api/public/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "No se pudo crear la reserva. Intenta de nuevo.");
        return;
      }
      setSubmitSuccess(data.message || "Reserva realizada correctamente.");
      form.reset();
    } catch (err) {
      setSubmitError(err.message || "Error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <>
      <div className="t-center">
        <span className="tit2 t-center">Reservation</span>
        <h3 className="tit3 t-center m-b-35 m-t-2">Book table</h3>
      </div>
      <form ref={formRef} className="wrap-form-booking" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <span className="txt9">Date</span>
            <div className="wrap-inputdate pos-relative txt10 size12 bo2 bo-rad-10 m-t-3 m-b-23">
              <input
                className="my-calendar bo-rad-10 sizefull txt10 p-l-20"
                type="text"
                name="date"
                readOnly
                placeholder="DD/MM/YYYY"
              />
              <i className="btn-calendar fa fa-calendar ab-r-m hov-pointer m-r-18" aria-hidden="true"></i>
            </div>
            <span className="txt9">Time</span>
            <div className="wrap-inputtime size12 bo2 bo-rad-10 m-t-3 m-b-23">
              <select className="selection-1" name="time">
                <option value="">Seleccionar hora</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <span className="txt9">People</span>
            <div className="wrap-inputpeople size12 bo2 bo-rad-10 m-t-3 m-b-23">
              <select className="selection-1" name="people">
                <option value="">Personas</option>
                {peopleOptions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <span className="txt9">Name</span>
            <div className="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
              <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="name" placeholder="Name" />
            </div>
            <span className="txt9">Phone</span>
            <div className="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
              <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="phone" placeholder="Phone" />
            </div>
            <span className="txt9">Email</span>
            <div className="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
              <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="email" placeholder="Email" />
            </div>
          </div>
        </div>
        {(submitSuccess || submitError) && (
          <div className="row">
            <div className="col-12 m-b-15">
              {submitSuccess && (
                <p className="txt23" style={{ color: "#27ae60" }}>{submitSuccess}</p>
              )}
              {submitError && (
                <p className="txt23" style={{ color: "#c0392b" }}>{submitError}</p>
              )}
            </div>
          </div>
        )}
        <div className="wrap-btn-booking flex-c-m m-t-6">
          <button
            type="submit"
            className="btn3 flex-c-m size13 txt11 trans-0-4"
            disabled={submitLoading}
          >
            {submitLoading ? "Enviando..." : "Book Table"}
          </button>
        </div>
      </form>
    </>
  );
}
