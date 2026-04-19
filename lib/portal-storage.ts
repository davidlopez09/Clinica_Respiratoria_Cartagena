export type PortalRole = "doctor" | "patient";

export type PortalSession = {
    role: PortalRole;
    username: string;
    displayName: string;
};

export type PatientRecord = {
    id: string;
    fullName: string;
    document: string;
    phone: string;
    specialty: string;
    portalUsername: string;
    createdAt: string;
};

export type ExamRecord = {
    id: string;
    patientId: string;
    patientName: string;
    patientPortalUsername: string;
    examName: string;
    specialty: string;
    uploadedAt: string;
    fileName: string;
    fileDataUrl: string;
};

export type AppointmentRecord = {
    id: string;
    patientName: string;
    specialty: string;
    time: string;
    doctor: string;
    status: string;
    date: string;
};

export type ActivityRecord = {
    id: string;
    patientName: string;
    action: string;
    specialty: string;
    time: string;
};

export type PortalStore = {
    patients: PatientRecord[];
    exams: ExamRecord[];
    appointments: AppointmentRecord[];
    activities: ActivityRecord[];
};

const PORTAL_STORE_KEY = "clinica.portal.store";
const PORTAL_SESSION_KEY = "clinica.portal.session";

const today = new Date().toISOString().slice(0, 10);

const initialStore: PortalStore = {
    patients: [],
    exams: [],
    appointments: [
        {
            id: "apt-1",
            patientName: "Mariana Herrera",
            specialty: "Neumologia",
            time: "08:30",
            doctor: "Dr. Ricardo Vega",
            status: "Confirmada",
            date: today,
        },
        {
            id: "apt-2",
            patientName: "Luis Mendoza",
            specialty: "Alergologia",
            time: "10:00",
            doctor: "Dra. Sofia Paternina",
            status: "En espera",
            date: today,
        },
        {
            id: "apt-3",
            patientName: "Valentina Rios",
            specialty: "Somnologia",
            time: "15:30",
            doctor: "Dr. Daniel Otero",
            status: "Confirmada",
            date: today,
        },
    ],
    activities: [],
};

function canUseStorage() {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function ensurePortalStore() {
    if (!canUseStorage()) {
        return initialStore;
    }

    const raw = window.localStorage.getItem(PORTAL_STORE_KEY);
    if (!raw) {
        window.localStorage.setItem(PORTAL_STORE_KEY, JSON.stringify(initialStore));
        return initialStore;
    }

    try {
        const parsed = JSON.parse(raw) as Partial<PortalStore>;
        const hydrated: PortalStore = {
            patients: parsed.patients ?? [],
            exams: parsed.exams ?? [],
            appointments: parsed.appointments?.length ? parsed.appointments : initialStore.appointments,
            activities: parsed.activities ?? [],
        };
        window.localStorage.setItem(PORTAL_STORE_KEY, JSON.stringify(hydrated));
        return hydrated;
    } catch {
        window.localStorage.setItem(PORTAL_STORE_KEY, JSON.stringify(initialStore));
        return initialStore;
    }
}

export function getPortalStore() {
    return ensurePortalStore();
}

export function savePortalStore(store: PortalStore) {
    if (!canUseStorage()) {
        return;
    }
    window.localStorage.setItem(PORTAL_STORE_KEY, JSON.stringify(store));
}

export function authenticatePortalUser(username: string, password: string): PortalSession | null {
    const normalizedUsername = username.trim();
    const normalizedPassword = password.trim();

    if (normalizedUsername === "ADMIN" && normalizedPassword === "ADMIN") {
        return {
            role: "doctor",
            username: normalizedUsername,
            displayName: "Panel Medico",
        };
    }

    if (normalizedUsername === "asd" && normalizedPassword === "asd") {
        return {
            role: "patient",
            username: normalizedUsername,
            displayName: "Paciente asd",
        };
    }

    return null;
}

export function setPortalSession(session: PortalSession) {
    if (!canUseStorage()) {
        return;
    }
    window.localStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(session));
}

export function getPortalSession() {
    if (!canUseStorage()) {
        return null;
    }

    const raw = window.localStorage.getItem(PORTAL_SESSION_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as PortalSession;
    } catch {
        return null;
    }
}

export function clearPortalSession() {
    if (!canUseStorage()) {
        return;
    }
    window.localStorage.removeItem(PORTAL_SESSION_KEY);
}
