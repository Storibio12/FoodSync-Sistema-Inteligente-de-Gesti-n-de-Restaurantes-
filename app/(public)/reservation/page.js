"use client";

import { useState } from "react";

const timeOptions = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];
const peopleOptions = Array.from({ length: 12 }, (_, i) => (i === 0 ? "1 person" : `${i + 1} people`));

export default function ReservationPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [peopleLabel, setPeopleLabel] = useState("");
  const [peopleCount, setPeopleCount] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesLoading, setTablesLoading] = useState(false);
  const [tablesError, setTablesError] = useState("");
  const [selectedTableId, setSelectedTableId] = useState("");
  const [searched, setSearched] = useState(false);

  async function fetchTables() {
    if (!date || !time || !peopleCount) {
      setTablesError("Selecciona fecha, hora y número de personas.");
      return;
    }
    setTablesError("");
    setTables([]);
    setSelectedTableId("");
    setSearched(true);
    setTablesLoading(true);
    try {
      const params = new URLSearchParams({
        date,
        time,
        people_count: String(peopleCount),
      });
      const res = await fetch(`/api/public/reservations/available-tables?${params.toString()}`);
      if (res.status === 409) {
        // Sin mesas disponibles
        setTables([]);
        setTablesLoading(false);
        return;
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al consultar mesas disponibles");
      }
      const data = await res.json();
      setTables(data?.data?.tables ?? []);
    } catch (err) {
      setTablesError(err.message || "Error al consultar mesas disponibles");
    } finally {
      setTablesLoading(false);
    }
  }

  function handlePeopleChange(value) {
    setPeopleLabel(value);
    const n = parseInt(value, 10);
    setPeopleCount(Number.isNaN(n) ? null : n);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Pendiente: conectar con API para crear cliente + reserva (usando table_id si se seleccionó)
  }

  return (
    <>
      <section className="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15" style={{ backgroundImage: "url(/images/bg-title-page-02.jpg)" }}>
        <h2 className="tit6 t-center">Reservation</h2>
      </section>

      <section className="section-reservation bg1-pattern p-t-100 p-b-113">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-b-30">
              <div className="t-center">
                <span className="tit2 t-center">Reservation</span>
                <h3 className="tit3 t-center m-b-35 m-t-2">Book table</h3>
              </div>

              <form className="wrap-form-reservation size22 m-l-r-auto" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <span className="txt9">Date</span>
                    <div className="wrap-inputdate pos-relative txt10 size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input
                        className="my-calendar bo-rad-10 sizefull txt10 p-l-20"
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <i className="btn-calendar fa fa-calendar ab-r-m hov-pointer m-r-18" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <span className="txt9">Time</span>
                    <div className="wrap-inputtime size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <select
                        className="selection-1"
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <option value="">Select time</option>
                        {timeOptions.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <span className="txt9">People</span>
                    <div className="wrap-inputpeople size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <select
                        className="selection-1"
                        name="people"
                        value={peopleLabel}
                        onChange={(e) => handlePeopleChange(e.target.value)}
                      >
                        <option value="">People</option>
                        {peopleOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <span className="txt9">Available tables</span>
                    <div className="wrap-btn-booking flex-c-m m-t-3 m-b-23">
                      <button
                        type="button"
                        className="btn3 flex-c-m size13 txt11 trans-0-4"
                        onClick={fetchTables}
                      >
                        Buscar mesas disponibles
                      </button>
                    </div>
                  </div>
                  <div className="col-md-8">
                    {tablesLoading && <p className="txt23 m-t-10">Buscando mesas...</p>}
                    {tablesError && (
                      <p className="txt23 m-t-10" style={{ color: "#c0392b" }}>
                        {tablesError}
                      </p>
                    )}
                    {searched && !tablesLoading && !tablesError && tables.length === 0 && (
                      <p className="txt23 m-t-10">No hay mesas disponibles para ese horario.</p>
                    )}
                  </div>
                </div>

                {tables.length > 0 && (
                  <div className="row">
                    <div className="col-md-4">
                      <span className="txt9">Mesa disponible</span>
                      <div className="wrap-inputpeople size12 bo2 bo-rad-10 m-t-3 m-b-23">
                        <select
                          className="selection-1"
                          name="table_id"
                          value={selectedTableId}
                          onChange={(e) => setSelectedTableId(e.target.value)}
                        >
                          <option value="">Seleccionar mesa</option>
                          {tables.map((t) => (
                            <option key={t.table_id ?? t.id} value={t.table_id ?? t.id}>
                              Mesa {t.table_number ?? (t.table_id ?? t.id)} (cap. {t.capacity ?? "?"})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col-md-4">
                    <span className="txt9">Name</span>
                    <div className="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="name" placeholder="Name" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <span className="txt9">Phone</span>
                    <div className="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="phone" placeholder="Phone" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <span className="txt9">Email</span>
                    <div className="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input className="bo-rad-10 sizefull txt10 p-l-20" type="text" name="email" placeholder="Email" />
                    </div>
                  </div>
                </div>
                <div className="wrap-btn-booking flex-c-m m-t-6">
                  <button type="submit" className="btn3 flex-c-m size13 txt11 trans-0-4">Book Table</button>
                </div>
              </form>
            </div>
          </div>
          <div className="info-reservation flex-w p-t-80">
            <div className="size23 w-full-md p-t-40 p-r-30 p-r-0-md">
              <h4 className="txt5 m-b-18">Reserve by Phone</h4>
              <p className="size25">
                Donec quis euismod purus. Donec feugiat ligula rhoncus, varius nisl sed, tincidunt lectus.
                <span className="txt25">Nulla vulputate</span>, lectus vel volutpat efficitur, orci
                <span className="txt25">lacus sodales</span> sem, sit amet quam:
                <span className="txt24">(001) 345 6889</span>
              </p>
            </div>
            <div className="size24 w-full-md p-t-40">
              <h4 className="txt5 m-b-18">For Event Booking</h4>
              <p className="size26">
                Donec feugiat ligula rhoncus: <span className="txt24">(001) 345 6889</span>, varius nisl sed, tinci-dunt lectus sodales sem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
