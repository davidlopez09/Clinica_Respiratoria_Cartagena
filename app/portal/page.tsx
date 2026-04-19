"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, FileText, LayoutDashboard, LogOut, Stethoscope, Upload, UserPlus, Users } from "lucide-react";
import {
    clearPortalSession,
    ensurePortalStore,
    ExamRecord,
    getPortalSession,
    getPortalStore,
    PatientRecord,
    PortalSession,
    PortalStore,
    savePortalStore,
} from "@/lib/portal-storage";

type DoctorSection = "inicio" | "pacientes" | "examenes" | "citas";

const doctorSections: Array<{ key: DoctorSection; label: string; icon: typeof LayoutDashboard }> = [
    { key: "inicio", label: "Inicio", icon: LayoutDashboard },
    { key: "pacientes", label: "Pacientes", icon: Users },
    { key: "examenes", label: "Examenes", icon: Upload },
    { key: "citas", label: "Citas", icon: CalendarDays },
];

const defaultPatientForm = {
    fullName: "",
    document: "",
    phone: "",
    specialty: "Neumologia",
    portalUsername: "",
};

const defaultExamForm = {
    patientId: "",
    examName: "",
    specialty: "Neumologia",
};

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-[0_16px_45px_rgba(7,28,52,0.08)]">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{value}</p>
        </div>
    );
}

export default function PortalPage() {
    const router = useRouter();
    const [session, setSession] = useState<PortalSession | null>(null);
    const [store, setStore] = useState<PortalStore>(() => ensurePortalStore());
    const [activeSection, setActiveSection] = useState<DoctorSection>("inicio");
    const [patientForm, setPatientForm] = useState(defaultPatientForm);
    const [examForm, setExamForm] = useState(defaultExamForm);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loginReady, setLoginReady] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        const currentSession = getPortalSession();
        const currentStore = getPortalStore();

        if (!currentSession) {
            router.replace("/login");
            return;
        }

        setSession(currentSession);
        setStore(currentStore);
        setLoginReady(true);
    }, [router]);

    const todayAppointments = useMemo(
        () => store.appointments.filter((appointment) => appointment.date === new Date().toISOString().slice(0, 10)),
        [store.appointments],
    );

    const patientExams = useMemo(() => {
        if (!session || session.role !== "patient") {
            return [];
        }

        return store.exams.filter((exam) => exam.patientPortalUsername === session.username);
    }, [session, store.exams]);

    function updateStore(nextStore: PortalStore) {
        setStore(nextStore);
        savePortalStore(nextStore);
    }

    function addActivity(patientName: string, action: string, specialty: string, baseStore: PortalStore) {
        return {
            ...baseStore,
            activities: [
                {
                    id: crypto.randomUUID(),
                    patientName,
                    action,
                    specialty,
                    time: new Date().toLocaleTimeString("es-CO", {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
                ...baseStore.activities,
            ].slice(0, 12),
        };
    }

    function handlePatientSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newPatient: PatientRecord = {
            id: crypto.randomUUID(),
            fullName: patientForm.fullName.trim(),
            document: patientForm.document.trim(),
            phone: patientForm.phone.trim(),
            specialty: patientForm.specialty,
            portalUsername: patientForm.portalUsername.trim(),
            createdAt: new Date().toISOString(),
        };

        const nextStore = addActivity(newPatient.fullName, "Paciente registrado", newPatient.specialty, {
            ...store,
            patients: [newPatient, ...store.patients],
        });

        updateStore(nextStore);
        setPatientForm(defaultPatientForm);
        setFeedback("Paciente registrado correctamente.");
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;
        setSelectedFile(file);
    }

    function handleExamSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const patient = store.patients.find((item) => item.id === examForm.patientId);
        if (!patient || !selectedFile) {
            setFeedback("Selecciona un paciente y un archivo PDF antes de continuar.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const newExam: ExamRecord = {
                id: crypto.randomUUID(),
                patientId: patient.id,
                patientName: patient.fullName,
                patientPortalUsername: patient.portalUsername,
                examName: examForm.examName.trim(),
                specialty: examForm.specialty,
                uploadedAt: new Date().toISOString(),
                fileName: selectedFile.name,
                fileDataUrl: String(reader.result ?? ""),
            };

            const nextStore = addActivity(patient.fullName, "Examen cargado", newExam.specialty, {
                ...store,
                exams: [newExam, ...store.exams],
            });

            updateStore(nextStore);
            setExamForm(defaultExamForm);
            setSelectedFile(null);
            setFeedback("Examen cargado correctamente.");
        };

        reader.readAsDataURL(selectedFile);
    }

    function handleLogout() {
        clearPortalSession();
        router.replace("/login");
    }

    if (!loginReady || !session) {
        return <main className="min-h-screen bg-background" />;
    }

    if (session.role === "patient") {
        return (
            <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,96,170,0.14),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fa_100%)] px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_65px_rgba(7,28,52,0.1)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-primary">Portal del paciente</p>
                            <h1 className="mt-2 text-3xl font-semibold text-foreground">Hola, {session.displayName}</h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                Aqui solo puedes consultar los examenes que esten asociados a tu usuario.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/"
                                className="rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                            >
                                Volver al sitio
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/90"
                            >
                                Cerrar sesion
                            </button>
                        </div>
                    </div>

                    <div className="mb-8 grid gap-6 md:grid-cols-3">
                        <StatCard label="Examenes disponibles" value={patientExams.length} />
                        <StatCard
                            label="Ultima actualizacion"
                            value={
                                patientExams[0]
                                    ? new Date(patientExams[0].uploadedAt).toLocaleDateString("es-CO")
                                    : "Sin datos"
                            }
                        />
                        <StatCard label="Estado del portal" value="Activo" />
                    </div>

                    <section className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                        <div className="mb-6 flex items-center gap-3">
                            <FileText className="h-6 w-6 text-primary" />
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground">Mis examenes</h2>
                                <p className="text-sm text-muted-foreground">Documentos disponibles para consulta.</p>
                            </div>
                        </div>

                        {patientExams.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center text-muted-foreground">
                                No tienes examenes disponibles por ahora.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-border text-muted-foreground">
                                            <th className="px-4 py-3 font-medium">Examen</th>
                                            <th className="px-4 py-3 font-medium">Especialidad</th>
                                            <th className="px-4 py-3 font-medium">Fecha</th>
                                            <th className="px-4 py-3 font-medium">Archivo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patientExams.map((exam) => (
                                            <tr key={exam.id} className="border-b border-border/70 last:border-0">
                                                <td className="px-4 py-4 font-medium text-foreground">
                                                    {exam.examName}
                                                </td>
                                                <td className="px-4 py-4 text-muted-foreground">{exam.specialty}</td>
                                                <td className="px-4 py-4 text-muted-foreground">
                                                    {new Date(exam.uploadedAt).toLocaleDateString("es-CO")}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <a
                                                        href={exam.fileDataUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="font-medium text-primary hover:text-primary/80"
                                                    >
                                                        Ver PDF
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,96,170,0.14),_transparent_22%),linear-gradient(180deg,_#f4f8fc_0%,_#eef3f8_100%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,_rgba(8,28,47,0.98)_0%,_rgba(0,96,170,0.94)_100%)] p-6 text-white shadow-[0_28px_70px_rgba(7,28,52,0.16)]">
                    <div className="mb-8">
                        <p className="text-sm uppercase tracking-[0.24em] text-white/60">Area medica</p>
                        <h1 className="mt-3 text-3xl font-semibold">Dashboard</h1>
                        <p className="mt-3 text-sm leading-6 text-white/72">
                            Gestiona pacientes, examenes clinicos y la agenda diaria desde un solo lugar.
                        </p>
                    </div>

                    <nav className="space-y-3">
                        {doctorSections.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.key;

                            return (
                                <button
                                    key={section.key}
                                    type="button"
                                    onClick={() => setActiveSection(section.key)}
                                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all ${
                                        isActive
                                            ? "bg-white text-primary shadow-lg"
                                            : "bg-white/8 text-white/78 hover:bg-white/14 hover:text-white"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {section.label}
                                </button>
                            );
                        })}
                    </nav>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/14"
                    >
                        <LogOut className="h-5 w-5" />
                        Cerrar sesion
                    </button>
                </aside>

                <section className="space-y-6">
                    <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.22em] text-primary">
                                    Resumen de actividad clinica
                                </p>
                                <h2 className="mt-2 text-3xl font-semibold text-foreground">Dashboard</h2>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-sm font-medium text-primary">
                                <Stethoscope className="h-4 w-4" />
                                {session.displayName}
                            </div>
                        </div>
                    </div>

                    {feedback ? (
                        <div className="rounded-2xl border border-primary/15 bg-primary/8 px-5 py-4 text-sm font-medium text-primary">
                            {feedback}
                        </div>
                    ) : null}

                    {activeSection === "inicio" ? (
                        <>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                                <StatCard label="Pacientes registrados" value={store.patients.length} />
                                <StatCard label="Examenes cargados" value={store.exams.length} />
                                <StatCard label="Citas del dia" value={todayAppointments.length} />
                                <StatCard label="Especialidades activas" value={7} />
                            </div>

                            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                                <div className="mb-5">
                                    <h3 className="text-2xl font-semibold text-foreground">Actividad reciente</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Ultimos movimientos del panel clinico.
                                    </p>
                                </div>

                                {store.activities.length === 0 ? (
                                    <div className="rounded-3xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center text-muted-foreground">
                                        No hay actividad registrada aun.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-border text-muted-foreground">
                                                    <th className="px-4 py-3 font-medium">Paciente</th>
                                                    <th className="px-4 py-3 font-medium">Accion</th>
                                                    <th className="px-4 py-3 font-medium">Especialidad</th>
                                                    <th className="px-4 py-3 font-medium">Hora</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {store.activities.map((activity) => (
                                                    <tr
                                                        key={activity.id}
                                                        className="border-b border-border/70 last:border-0"
                                                    >
                                                        <td className="px-4 py-4 font-medium text-foreground">
                                                            {activity.patientName}
                                                        </td>
                                                        <td className="px-4 py-4 text-muted-foreground">
                                                            {activity.action}
                                                        </td>
                                                        <td className="px-4 py-4 text-muted-foreground">
                                                            {activity.specialty}
                                                        </td>
                                                        <td className="px-4 py-4 text-muted-foreground">
                                                            {activity.time}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : null}

                    {activeSection === "pacientes" ? (
                        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                                <div className="mb-6 flex items-center gap-3">
                                    <UserPlus className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="text-2xl font-semibold text-foreground">Registrar paciente</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Crea un nuevo paciente para el modulo clinico.
                                        </p>
                                    </div>
                                </div>

                                <form className="space-y-4" onSubmit={handlePatientSubmit}>
                                    <input
                                        required
                                        value={patientForm.fullName}
                                        onChange={(event) =>
                                            setPatientForm((current) => ({ ...current, fullName: event.target.value }))
                                        }
                                        placeholder="Nombre completo"
                                        className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    />
                                    <input
                                        required
                                        value={patientForm.document}
                                        onChange={(event) =>
                                            setPatientForm((current) => ({ ...current, document: event.target.value }))
                                        }
                                        placeholder="Documento"
                                        className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    />
                                    <input
                                        required
                                        value={patientForm.phone}
                                        onChange={(event) =>
                                            setPatientForm((current) => ({ ...current, phone: event.target.value }))
                                        }
                                        placeholder="Telefono"
                                        className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    />
                                    <select
                                        value={patientForm.specialty}
                                        onChange={(event) =>
                                            setPatientForm((current) => ({ ...current, specialty: event.target.value }))
                                        }
                                        className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    >
                                        <option>Neumologia</option>
                                        <option>Alergologia</option>
                                        <option>Otorrinolaringologia</option>
                                        <option>Dermatologia</option>
                                        <option>Somnologia</option>
                                        <option>Pediatria</option>
                                        <option>Medicina interna</option>
                                    </select>
                                    <input
                                        value={patientForm.portalUsername}
                                        onChange={(event) =>
                                            setPatientForm((current) => ({
                                                ...current,
                                                portalUsername: event.target.value,
                                            }))
                                        }
                                        placeholder="Usuario del portal paciente, ejemplo: asd"
                                        className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    />
                                    <button
                                        type="submit"
                                        className="h-12 w-full rounded-2xl bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/92"
                                    >
                                        Guardar paciente
                                    </button>
                                </form>
                            </div>

                            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                                <div className="mb-6 flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-foreground">Listado de pacientes</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Pacientes registrados en el modulo.
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-primary/8 px-4 py-2 text-sm font-medium text-primary">
                                        {store.patients.length} total
                                    </span>
                                </div>

                                {store.patients.length === 0 ? (
                                    <div className="rounded-3xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center text-muted-foreground">
                                        Aun no hay pacientes registrados.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-border text-muted-foreground">
                                                    <th className="px-4 py-3 font-medium">Paciente</th>
                                                    <th className="px-4 py-3 font-medium">Documento</th>
                                                    <th className="px-4 py-3 font-medium">Especialidad</th>
                                                    <th className="px-4 py-3 font-medium">Usuario portal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {store.patients.map((patient) => (
                                                    <tr
                                                        key={patient.id}
                                                        className="border-b border-border/70 last:border-0"
                                                    >
                                                        <td className="px-4 py-4 font-medium text-foreground">
                                                            {patient.fullName}
                                                        </td>
                                                        <td className="px-4 py-4 text-muted-foreground">
                                                            {patient.document}
                                                        </td>
                                                        <td className="px-4 py-4 text-muted-foreground">
                                                            {patient.specialty}
                                                        </td>
                                                        <td className="px-4 py-4 text-muted-foreground">
                                                            {patient.portalUsername || "Sin acceso"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}

                    {activeSection === "examenes" ? (
                        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                                <div className="mb-6 flex items-center gap-3">
                                    <Upload className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="text-2xl font-semibold text-foreground">Subir examen PDF</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Asocia el archivo a un paciente ya registrado.
                                        </p>
                                    </div>
                                </div>

                                <form className="space-y-4" onSubmit={handleExamSubmit}>
                                    <select
                                        required
                                        value={examForm.patientId}
                                        onChange={(event) =>
                                            setExamForm((current) => ({ ...current, patientId: event.target.value }))
                                        }
                                        className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    >
                                        <option value="">Selecciona un paciente</option>
                                        {store.patients.map((patient) => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.fullName}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        required
                                        value={examForm.examName}
                                        onChange={(event) =>
                                            setExamForm((current) => ({ ...current, examName: event.target.value }))
                                        }
                                        placeholder="Nombre del examen"
                                        className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    />
                                    <select
                                        value={examForm.specialty}
                                        onChange={(event) =>
                                            setExamForm((current) => ({ ...current, specialty: event.target.value }))
                                        }
                                        className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    >
                                        <option>Neumologia</option>
                                        <option>Alergologia</option>
                                        <option>Otorrinolaringologia</option>
                                        <option>Dermatologia</option>
                                        <option>Somnologia</option>
                                        <option>Pediatria</option>
                                        <option>Medicina interna</option>
                                    </select>
                                    <input
                                        required
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="block w-full rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-4 text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:font-medium file:text-primary-foreground"
                                    />
                                    <button
                                        type="submit"
                                        disabled={store.patients.length === 0}
                                        className="h-12 w-full rounded-2xl bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/92 disabled:cursor-not-allowed disabled:bg-secondary/50"
                                    >
                                        Cargar examen
                                    </button>
                                </form>
                            </div>

                            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                                <div className="mb-6 flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-foreground">Examenes subidos</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Historial de documentos cargados.
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-primary/8 px-4 py-2 text-sm font-medium text-primary">
                                        {store.exams.length} total
                                    </span>
                                </div>

                                {store.exams.length === 0 ? (
                                    <div className="rounded-3xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center text-muted-foreground">
                                        No hay examenes cargados aun.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-border text-muted-foreground">
                                                    <th className="px-4 py-3 font-medium">Paciente</th>
                                                    <th className="px-4 py-3 font-medium">Examen</th>
                                                    <th className="px-4 py-3 font-medium">Especialidad</th>
                                                    <th className="px-4 py-3 font-medium">Archivo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {store.exams.map((exam) => (
                                                    <tr
                                                        key={exam.id}
                                                        className="border-b border-border/70 last:border-0"
                                                    >
                                                        <td className="px-4 py-4 font-medium text-foreground">
                                                            {exam.patientName}
                                                        </td>
                                                        <td className="px-4 py-4 text-muted-foreground">
                                                            {exam.examName}
                                                        </td>
                                                        <td className="px-4 py-4 text-muted-foreground">
                                                            {exam.specialty}
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <a
                                                                href={exam.fileDataUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="font-medium text-primary hover:text-primary/80"
                                                            >
                                                                {exam.fileName}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}

                    {activeSection === "citas" ? (
                        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,28,52,0.08)]">
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-2xl font-semibold text-foreground">Citas programadas</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Agenda base del dia para el equipo medico.
                                    </p>
                                </div>
                                <span className="rounded-full bg-primary/8 px-4 py-2 text-sm font-medium text-primary">
                                    {store.appointments.length} citas
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-border text-muted-foreground">
                                            <th className="px-4 py-3 font-medium">Paciente</th>
                                            <th className="px-4 py-3 font-medium">Especialidad</th>
                                            <th className="px-4 py-3 font-medium">Hora</th>
                                            <th className="px-4 py-3 font-medium">Medico</th>
                                            <th className="px-4 py-3 font-medium">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.appointments.map((appointment) => (
                                            <tr
                                                key={appointment.id}
                                                className="border-b border-border/70 last:border-0"
                                            >
                                                <td className="px-4 py-4 font-medium text-foreground">
                                                    {appointment.patientName}
                                                </td>
                                                <td className="px-4 py-4 text-muted-foreground">
                                                    {appointment.specialty}
                                                </td>
                                                <td className="px-4 py-4 text-muted-foreground">{appointment.time}</td>
                                                <td className="px-4 py-4 text-muted-foreground">
                                                    {appointment.doctor}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                                                        {appointment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null}
                </section>
            </div>
        </main>
    );
}
