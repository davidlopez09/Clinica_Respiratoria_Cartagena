"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Menu, X, Clock, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Clínica", href: "#clinica" },
    { name: "Servicios", href: "#servicios" },
    { name: "Especialistas", href: "#especialistas" },
    { name: "Sueño", href: "#sueno" },
    { name: "Contacto", href: "#contacto" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a
                            href="https://wa.me/573156202499"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>+57 315 6202499 Solo Chat</span>
                        </a>
                        <a
                            href="tel:+573015102176"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <Phone className="w-4 h-4" />
                            <span>+57 301 5102176</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Lun - Vie: 8am - 5pm</span>
                        </div>
                        <a
                            href="mailto:citas@clinialergias.com"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <Mail className="w-4 h-4" />
                            <span>citas@clinialergias.com</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <motion.header
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    isScrolled ? "bg-card/95 backdrop-blur-md shadow-lg" : "bg-card"
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/logo.png"
                                alt="Clínica Respiratoria y de Alergias"
                                width={220}
                                height={70}
                                className="h-14 w-auto"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-foreground hover:text-primary transition-colors font-medium text-sm relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                href="/agendar-cita"
                                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-2.5 rounded-full font-medium text-sm transition-all hover:shadow-lg hover:scale-105"
                            >
                                Solicitar Cita
                            </Link>
                            <Link
                                href="/login"
                                aria-label="Ingresar al portal de usuarios"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                            >
                                <UserRound className="h-5 w-5" />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-foreground"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-card border-t border-border"
                        >
                            <nav className="flex flex-col py-4 px-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="py-3 text-foreground hover:text-primary transition-colors font-medium border-b border-border/50 last:border-0"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/agendar-cita"
                                    className="mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-full font-medium text-center transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Solicitar Cita
                                </Link>
                                <Link
                                    href="/login"
                                    className="mt-4 flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <UserRound className="h-5 w-5" />
                                    Ingresar
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}
