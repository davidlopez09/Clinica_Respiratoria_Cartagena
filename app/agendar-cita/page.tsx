"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    FileText,
    UserRound,
} from "lucide-react";
import { addPortalAppointment, ensurePortalStore, getPortalStore } from "@/lib/portal-storage";

type Step = 1 | 2 | 3;

type AppointmentFormState = {
    fullName: string;
    document: string;
    phone: string;
    email: string;
    specialty: string;
    consultationType: string;
    reason: string;
};

const initialForm: AppointmentFormState = {
    fullName: "",
    document: "",
    phone: "",
    email: "",
    specialty: "Neumologia",
    consultationType: "Primera vez",
    reason: "",
};

const weekDays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

const specialtyDoctors: Record<string, string> = {
    Neumologia: "Dr. Ricardo Vega",
    Alergologia: "Dra. Sofia Paternina",
    Pediatria: "Dra. Juliana Morales",
    Otorrinolaringologia: "Dr. Diego Pacheco",
    Dermatologia: "Dra. Carolina Acosta",
    Somnologia: "Dr. Daniel Otero",
    "Medicina interna": "Dr. Manuel Jimenez",
};

const baseTimeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
];

function toDateKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function sameDate(left: Date | null, right: Date) {
    if (!left) {
        return false;
    }

    return (
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate()
    );
}

export default function AgendarCitaPage() {
    const router = useRouter();
    const today = new Date();
    const [step, setStep] = useState<Step>(1);
    const [monthDate, setMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [form, setForm] = useState(initialForm);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [submittedId, setSubmittedId] = useState("");
    const [error, setError] = useState("");

    const store = useMemo(() => {
        ensurePortalStore();
        return getPortalStore();
    }, []);

    const monthLabel = monthDate.toLocaleDateString("es-CO", {
        month: "long",
        year: "numeric",
    });

    const calendarDays = useMemo(() => {
        const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
        const startPadding = firstDay.getDay();
        const totalDays = lastDay.getDate();
        const days: Array<Date | null> = [];

        for (let index = 0; index < startPadding; index += 1) {
            days.push(null);
        }

        for (let day = 1; day <= totalDays; day += 1) {
            days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
        }

        return days;
    }, [monthDate]);

    const availableSlots = useMemo(() => {
        if (!selectedDate) {
            return [];
        }

        const dateKey = toDateKey(selectedDate);
        const bookedTimes = new Set(
            store.appointments
                .filter((appointment) => appointment.date === dateKey)
                .map((appointment) => appointment.time),
        );

        return baseTimeSlots.map((time) => ({
            time,
            available: !bookedTimes.has(time),
        }));
    }, [selectedDate, store.appointments]);

    function isPastDay(date: Date) {
        const reference = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return date < reference;
    }

    function isAvailableDay(date: Date) {
        if (isPastDay(date)) {
            return false;
        }

        const day = date.getDay();
        return day !== 0 && day !== 6;
    }

    function handleNextFromStepOne() {
        if (!form.fullName || !form.document || !form.phone || !form.specialty) {
            setError("Completa los campos obligatorios del paciente antes de continuar.");
            return;
        }

        setError("");
        setStep(2);
    }

    function handleNextFromStepTwo() {
        if (!selectedDate || !selectedTime) {
            setError("Selecciona una fecha y una hora disponible para continuar.");
            return;
        }

        setError("");
        setStep(3);
    }

    function handleSubmitAppointment() {
        if (!selectedDate || !selectedTime) {
            return;
        }

        const appointment = addPortalAppointment({
            patientName: form.fullName,
            specialty: form.specialty,
            time: selectedTime,
            doctor: specialtyDoctors[form.specialty] ?? "Equipo medico",
            date: toDateKey(selectedDate),
            document: form.document,
            phone: form.phone,
            email: form.email,
            consultationType: form.consultationType,
            reason: form.reason,
        });

        setSubmittedId(appointment.id);
        setError("");
    }

    return (
        <main className="h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(0,96,170,0.14),_transparent_26%),linear-gradient(180deg,_#f4f8fc_0%,_#eef3f8_100%)] px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
            <div className="mx-auto flex h-full max-w-7xl flex-col">
                <div className="mb-3 flex shrink-0 flex-col gap-4 rounded-[1.75rem] border border-white/60 bg-white/88 p-4 shadow-[0_24px_70px_rgba(7,28,52,0.1)] backdrop-blur-xl sm:p-5 lg:mb-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver al sitio
                        </Link>
                        <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                            Agendar cita
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Completa tu informacion, elige una fecha y confirma la reserva en tres pasos.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center sm:gap-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="min-w-0 rounded-2xl border border-border bg-muted/40 px-3 py-2 sm:min-w-24 sm:px-4 sm:py-3"
                            >
                                <div
                                    className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${step >= item ? "bg-primary text-primary-foreground" : "bg-white text-muted-foreground"}`}
                                >
                                    {item}
                                </div>
                                <p className="text-[11px] font-medium text-foreground sm:text-xs">
                                    {item === 1 ? "Paciente" : item === 2 ? "Fecha y hora" : "Confirmacion"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1.08fr)_320px] xl:grid-cols-[minmax(0,1.08fr)_360px]">
                    <section className="flex min-h-0 flex-col rounded-[1.75rem] border border-white/60 bg-white/92 p-4 shadow-[0_18px_55px_rgba(7,28,52,0.08)] sm:p-5 lg:p-6">
                        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                            {step === 1 ? (
                                <>
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                                            <UserRound className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                                                Informacion del paciente
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Completa los datos necesarios para reservar tu cita.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Nombre completo *
                                            </label>
                                            <input
                                                value={form.fullName}
                                                onChange={(event) =>
                                                    setForm((current) => ({ ...current, fullName: event.target.value }))
                                                }
                                                className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                                placeholder="Nombre y apellidos"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Documento de identidad *
                                            </label>
                                            <input
                                                value={form.document}
                                                onChange={(event) =>
                                                    setForm((current) => ({ ...current, document: event.target.value }))
                                                }
                                                className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                                placeholder="CC o TI"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Telefono *
                                            </label>
                                            <input
                                                value={form.phone}
                                                onChange={(event) =>
                                                    setForm((current) => ({ ...current, phone: event.target.value }))
                                                }
                                                className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                                placeholder="+57 300 000 0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Correo electronico
                                            </label>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(event) =>
                                                    setForm((current) => ({ ...current, email: event.target.value }))
                                                }
                                                className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                                placeholder="correo@ejemplo.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Especialidad requerida *
                                            </label>
                                            <select
                                                value={form.specialty}
                                                onChange={(event) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        specialty: event.target.value,
                                                    }))
                                                }
                                                className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                            >
                                                <option>Neumologia</option>
                                                <option>Alergologia</option>
                                                <option>Pediatria</option>
                                                <option>Otorrinolaringologia</option>
                                                <option>Dermatologia</option>
                                                <option>Somnologia</option>
                                                <option>Medicina interna</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Tipo de consulta
                                            </label>
                                            <select
                                                value={form.consultationType}
                                                onChange={(event) =>
                                                    setForm((current) => ({
                                                        ...current,
                                                        consultationType: event.target.value,
                                                    }))
                                                }
                                                className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                            >
                                                <option>Primera vez</option>
                                                <option>Control</option>
                                                <option>Revision de examenes</option>
                                                <option>Teleorientacion</option>
                                            </select>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Motivo de consulta (opcional)
                                            </label>
                                            <textarea
                                                value={form.reason}
                                                onChange={(event) =>
                                                    setForm((current) => ({ ...current, reason: event.target.value }))
                                                }
                                                className="min-h-24 w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                                placeholder="Describe brevemente el motivo de la consulta"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : null}

                            {step === 2 ? (
                                <>
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                                            <CalendarDays className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                                                Selecciona fecha y hora
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Elige un dia habil y una franja disponible.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-3xl border border-border bg-muted/25 p-3 sm:p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMonthDate(
                                                        new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1),
                                                    )
                                                }
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-all hover:border-primary hover:text-primary"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <h3 className="text-base font-semibold capitalize text-foreground sm:text-lg">
                                                {monthLabel}
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMonthDate(
                                                        new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1),
                                                    )
                                                }
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-all hover:border-primary hover:text-primary"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground sm:gap-2 sm:text-xs sm:tracking-[0.14em]">
                                            {weekDays.map((day) => (
                                                <div key={day} className="py-2">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-2 grid grid-cols-7 gap-1 sm:gap-2">
                                            {calendarDays.map((date, index) => {
                                                if (!date) {
                                                    return (
                                                        <div
                                                            key={`empty-${index}`}
                                                            className="h-10 rounded-2xl sm:h-12"
                                                        />
                                                    );
                                                }

                                                const past = isPastDay(date);
                                                const available = isAvailableDay(date);
                                                const selected = sameDate(selectedDate, date);

                                                return (
                                                    <button
                                                        key={date.toISOString()}
                                                        type="button"
                                                        disabled={!available}
                                                        onClick={() => {
                                                            setSelectedDate(date);
                                                            setSelectedTime("");
                                                        }}
                                                        className={`h-10 rounded-2xl border text-xs font-medium transition-all sm:h-12 sm:text-sm ${selected ? "border-primary bg-primary text-primary-foreground" : available ? "border-border bg-white text-foreground hover:border-primary hover:text-primary" : past ? "border-border/40 bg-muted/50 text-muted-foreground/60" : "border-border/50 bg-slate-100 text-muted-foreground"}`}
                                                    >
                                                        {date.getDate()}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground sm:text-sm">
                                            <span className="inline-flex items-center gap-2">
                                                <span className="h-3 w-3 rounded-full bg-primary" />
                                                Disponible
                                            </span>
                                            <span className="inline-flex items-center gap-2">
                                                <span className="h-3 w-3 rounded-full bg-slate-300" />
                                                No disponible
                                            </span>
                                            <span className="inline-flex items-center gap-2">
                                                <span className="h-3 w-3 rounded-full bg-slate-200" />
                                                Pasado
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <div className="mb-4 flex items-center gap-2 text-foreground">
                                            <Clock3 className="h-5 w-5 text-primary" />
                                            <h3 className="text-lg font-semibold">Horas disponibles</h3>
                                        </div>

                                        {!selectedDate ? (
                                            <div className="rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center text-muted-foreground">
                                                Selecciona primero una fecha disponible.
                                            </div>
                                        ) : (
                                            <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-4">
                                                {availableSlots.map((slot) => (
                                                    <button
                                                        key={slot.time}
                                                        type="button"
                                                        disabled={!slot.available}
                                                        onClick={() => setSelectedTime(slot.time)}
                                                        className={`rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all ${selectedTime === slot.time ? "border-primary bg-primary text-primary-foreground" : slot.available ? "border-border bg-white text-foreground hover:border-primary hover:text-primary" : "cursor-not-allowed border-border/50 bg-slate-100 text-muted-foreground"}`}
                                                    >
                                                        {slot.time}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : null}

                            {step === 3 ? (
                                <>
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                            <CheckCircle2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                                                Confirmacion y registro
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Revisa los datos antes de registrar la cita.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 rounded-3xl border border-border bg-muted/25 p-5 sm:grid-cols-2">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Paciente</p>
                                            <p className="mt-1 font-semibold text-foreground">{form.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Documento</p>
                                            <p className="mt-1 font-semibold text-foreground">{form.document}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Especialidad</p>
                                            <p className="mt-1 font-semibold text-foreground">{form.specialty}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Tipo de consulta</p>
                                            <p className="mt-1 font-semibold text-foreground">
                                                {form.consultationType}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Fecha</p>
                                            <p className="mt-1 font-semibold text-foreground">
                                                {selectedDate
                                                    ? selectedDate.toLocaleDateString("es-CO", {
                                                          day: "numeric",
                                                          month: "long",
                                                          year: "numeric",
                                                      })
                                                    : "Sin fecha"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Hora</p>
                                            <p className="mt-1 font-semibold text-foreground">
                                                {selectedTime || "Sin hora"}
                                            </p>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <p className="text-sm text-muted-foreground">Motivo de consulta</p>
                                            <p className="mt-1 font-semibold text-foreground">
                                                {form.reason || "No especificado"}
                                            </p>
                                        </div>
                                    </div>

                                    {submittedId ? (
                                        <div className="mt-6 rounded-3xl border border-primary/15 bg-primary/8 px-5 py-4 text-sm text-primary">
                                            Tu cita fue registrada correctamente. Numero de reserva:{" "}
                                            <span className="font-semibold">{submittedId}</span>
                                        </div>
                                    ) : null}
                                </>
                            ) : null}
                        </div>

                        {error ? (
                            <div className="mt-4 rounded-2xl border border-secondary/15 bg-secondary/8 px-4 py-3 text-sm font-medium text-secondary">
                                {error}
                            </div>
                        ) : null}

                        <div className="mt-4 flex shrink-0 flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:justify-between">
                            <button
                                type="button"
                                onClick={() => setStep((current) => (current > 1 ? ((current - 1) as Step) : current))}
                                className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={step === 1 || !!submittedId}
                            >
                                Volver
                            </button>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                {step === 1 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextFromStepOne}
                                        className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/92"
                                    >
                                        Continuar a fecha y hora
                                    </button>
                                ) : null}
                                {step === 2 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextFromStepTwo}
                                        className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/92"
                                    >
                                        Continuar a confirmacion
                                    </button>
                                ) : null}
                                {step === 3 && !submittedId ? (
                                    <button
                                        type="button"
                                        onClick={handleSubmitAppointment}
                                        className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/92"
                                    >
                                        Confirmar y registrar cita
                                    </button>
                                ) : null}
                                {submittedId ? (
                                    <button
                                        type="button"
                                        onClick={() => router.push("/")}
                                        className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/92"
                                    >
                                        Volver al inicio
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </section>

                    <aside className="hidden min-h-0 lg:flex lg:flex-col lg:gap-4">
                        <div className="shrink-0 rounded-[1.75rem] border border-white/60 bg-[linear-gradient(180deg,_rgba(8,28,47,0.98)_0%,_rgba(0,96,170,0.94)_100%)] p-5 text-white shadow-[0_24px_70px_rgba(7,28,52,0.14)]">
                            <p className="text-sm uppercase tracking-[0.24em] text-white/64">Tu reserva</p>
                            <h2 className="mt-2 text-2xl font-semibold">Agenda clinica</h2>
                            <p className="mt-2 text-sm leading-6 text-white/76">
                                Reserva una cita de forma guiada con disponibilidad visible y confirmacion inmediata.
                            </p>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto rounded-[1.75rem] border border-white/60 bg-white/90 p-5 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                            <div className="mb-5 flex items-center gap-3">
                                <FileText className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold text-foreground">Resumen</h3>
                            </div>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
                                    <span className="text-muted-foreground">Paciente</span>
                                    <span className="text-right font-medium text-foreground">
                                        {form.fullName || "Sin completar"}
                                    </span>
                                </div>
                                <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
                                    <span className="text-muted-foreground">Especialidad</span>
                                    <span className="text-right font-medium text-foreground">{form.specialty}</span>
                                </div>
                                <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
                                    <span className="text-muted-foreground">Fecha</span>
                                    <span className="text-right font-medium text-foreground">
                                        {selectedDate ? selectedDate.toLocaleDateString("es-CO") : "Pendiente"}
                                    </span>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <span className="text-muted-foreground">Hora</span>
                                    <span className="text-right font-medium text-foreground">
                                        {selectedTime || "Pendiente"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
