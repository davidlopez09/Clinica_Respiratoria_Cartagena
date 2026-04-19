import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,96,170,0.18),_transparent_30%),linear-gradient(135deg,_#f5f7fa_0%,_#eef3f8_48%,_#f8fbff_100%)]">
            <section className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid w-full gap-8 overflow-hidden rounded-[2rem] border border-white/65 bg-white/78 shadow-[0_28px_80px_rgba(7,28,52,0.16)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative overflow-hidden bg-[linear-gradient(160deg,_rgba(0,96,170,0.96)_0%,_rgba(8,28,47,0.94)_58%,_rgba(10,20,34,0.98)_100%)] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                        <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-secondary/30 blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                            <div className="space-y-6">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-white/78 transition-colors hover:text-white"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Volver al inicio
                                </Link>

                                <div className="space-y-4">
                                    <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                                        Portal de usuarios
                                    </span>
                                    <h1 className="max-w-md font-serif text-4xl font-bold leading-tight sm:text-5xl">
                                        Accede de forma segura a tu espacio clínico.
                                    </h1>
                                    <p className="max-w-lg text-base leading-7 text-white/78 sm:text-lg">
                                        Consulta tu información con una interfaz clara, alineada con la identidad de la
                                        clínica y preparada para el siguiente paso de autenticación real.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl border border-white/12 bg-white/8 p-5">
                                    <ShieldCheck className="mb-4 h-9 w-9 text-secondary" />
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/64">
                                        Seguridad
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-white/78">
                                        Acceso protegido para pacientes y personal autorizado.
                                    </p>
                                </div>
                                <div className="rounded-3xl border border-white/12 bg-white/8 p-5">
                                    <LockKeyhole className="mb-4 h-9 w-9 text-secondary" />
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/64">
                                        Privacidad
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-white/78">
                                        Diseño listo para integrar autenticación y recuperación de acceso.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                        <div className="w-full max-w-md">
                            <div className="mb-8 space-y-3">
                                <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-sm font-medium text-primary">
                                    <UserRound className="h-4 w-4" />
                                    Ingreso seguro
                                </span>
                                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                                    Iniciar sesión
                                </h2>
                                <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                                    Ingresa con tu usuario y contraseña para continuar.
                                </p>
                            </div>

                            <form className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="username" className="text-sm font-medium text-foreground">
                                        Usuario
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Ingresa tu usuario"
                                        className="h-13 w-full rounded-2xl border border-border bg-white px-4 text-base text-foreground shadow-sm transition-all outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        className="h-13 w-full rounded-2xl border border-border bg-white px-4 text-base text-foreground shadow-sm transition-all outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/12"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-4 text-sm">
                                    <label className="flex items-center gap-2 text-muted-foreground">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                                        />
                                        Recordarme
                                    </label>
                                    <Link
                                        href="/"
                                        className="font-medium text-primary transition-colors hover:text-primary/80"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="h-13 w-full rounded-2xl bg-secondary px-6 text-base font-semibold text-secondary-foreground transition-all hover:bg-secondary/92 hover:shadow-[0_18px_38px_rgba(226,0,27,0.24)]"
                                >
                                    Entrar al portal
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
