"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";

const contactInfo = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+57 315 6202499",
    subtitle: "Solo Chat",
    href: "https://wa.me/573156202499",
    color: "bg-green-500",
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "+57 301 5102176",
    subtitle: "Llamadas",
    href: "tel:+573015102176",
    color: "bg-primary",
  },
  {
    icon: Mail,
    title: "Email",
    value: "citas@clinialergias.com",
    subtitle: "Escríbenos",
    href: "mailto:citas@clinialergias.com",
    color: "bg-secondary",
  },
  {
    icon: MapPin,
    title: "Dirección",
    value: "Diagonal 30 # 30B - 24",
    subtitle: "Piedra de Bolívar, Cartagena",
    href: "https://maps.google.com/?q=Diagonal+30+30B-24+Cartagena+Colombia",
    color: "bg-red-500",
  },
];

const schedule = [
  { day: "Horario de Atención", time: "8:00 AM - 1:00 PM y 2:00 PM - 5:00 PM" },
  { day: "Asignación de Citas", time: "9:00 AM - 12:00 PM y 2:00 PM - 4:00 PM" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacto" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Contáctenos
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
            Estamos aquí para ayudarte
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Agenda tu cita o contáctanos para cualquier consulta. 
            Nuestro equipo está listo para atenderte.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{info.title}</h3>
                  <p className="text-primary font-medium text-sm">{info.value}</p>
                  <p className="text-xs text-muted-foreground">{info.subtitle}</p>
                </motion.a>
              ))}
            </div>

            {/* Schedule */}
            <motion.div
              className="bg-card rounded-2xl p-6 border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Horarios</h3>
              </div>
              <div className="space-y-3">
                {schedule.map((item) => (
                  <div key={item.day} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm font-medium text-foreground">{item.day}</span>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-card rounded-3xl p-8 border border-border/50"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Envíanos un mensaje</h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                  Servicio de interés
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="neumologia">Neumología</option>
                  <option value="alergologia">Alergología</option>
                  <option value="pediatria">Pediatría</option>
                  <option value="otorrino">Otorrinolaringología</option>
                  <option value="dermatologia">Dermatología</option>
                  <option value="sueno">Centro del Sueño</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          className="mt-12 rounded-3xl overflow-hidden border border-border/50 h-80"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.1234567890123!2d-75.51234567890123!3d10.4012345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDI0JzA0LjQiTiA3NcKwMzAnNDQuNCJX!5e0!3m2!1ses!2sco!4v1234567890123"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Clínica Respiratoria y de Alergias"
          />
        </motion.div>
      </div>
    </section>
  );
}
