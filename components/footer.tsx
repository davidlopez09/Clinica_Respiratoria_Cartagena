"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  "Pediatría",
  "Alergología de Adultos y Pediátrica",
  "Neumología Pediátrica",
  "Neumología de Adultos",
  "Otorrinolaringología",
  "Dermatología",
  "Medicina Interna",
];

const quickLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Quiénes Somos", href: "#clinica" },
  { name: "Servicios", href: "#servicios" },
  { name: "Especialistas", href: "#especialistas" },
  { name: "Centro del Sueño", href: "#sueno" },
  { name: "Contacto", href: "#contacto" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <div className="bg-white rounded-lg p-2">
                <Image
                  src="/images/logo.png"
                  alt="Clínica Respiratoria y de Alergias"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
            </Link>
            <p className="text-sm opacity-70 mb-6 leading-relaxed">
              Primera organización de salud en Cartagena dedicada a la atención 
              integral del paciente en Pediatría, Neumología y Alergia.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Servicios</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm opacity-70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/573156202499"
                  className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <span>+57 315 6202499 (Solo Chat)</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+573015102176"
                  className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+57 301 5102176</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:citas@clinialergias.com"
                  className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span>citas@clinialergias.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm opacity-70">
                  <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Piedra de Bolívar<br />
                    Diagonal 30 # 30B - 24<br />
                    Cartagena D.T. & C. - Colombia
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-50">
            © {new Date().getFullYear()} Clínica Respiratoria y de Alergias S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm opacity-50">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Política de Privacidad
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
