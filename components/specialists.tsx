"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, MapPin } from "lucide-react";

const specialists = [
  {
    name: "Dr. José Miguel Escamilla",
    specialty: "Neumólogo Pediatra",
    credentials: [
      "Universidad de Cartagena",
      "Instituto Nacional de Enfermedades Respiratorias",
      "Profesor Titular Universidad de Cartagena",
    ],
    location: "Cartagena - México",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Dr. Jaime Morales De León",
    specialty: "Neumólogo Pediatra",
    credentials: [
      "Facilitador y Capacitador AIEPI - OMS/OPS",
      "Profesor Titular - Investigador",
      "Universidad de Cartagena",
    ],
    location: "Cartagena - México",
    color: "from-teal-500 to-emerald-500",
  },
  {
    name: "Dra. Isabel Gil Belalcázar",
    specialty: "Alergóloga",
    credentials: [
      "Universidad Estatal de Guayaquil - Ecuador",
      "Especialista en Pediatría Médica",
      "Especialista en Inmunología y Alergias - UNAM",
    ],
    location: "Cartagena - México",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Dr. Bautista Hoyos Sánchez",
    specialty: "Alergólogo",
    credentials: [
      "Universidad Nacional Autónoma de México",
      "Especialista en Alergología e Inmunología Clínica",
    ],
    location: "Cartagena - México",
    color: "from-amber-500 to-orange-500",
  },
];

export function Specialists() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="especialistas" className="py-24 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Equipo Médico
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
            Nuestros Especialistas
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Contamos con un equipo de médicos altamente capacitados, con formación 
            internacional y años de experiencia en sus áreas de especialización.
          </p>
        </motion.div>

        {/* Specialists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((specialist, index) => (
            <motion.div
              key={specialist.name}
              className="group relative bg-background rounded-2xl overflow-hidden border border-border/50 hover:border-transparent transition-all hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              {/* Gradient top border */}
              <div className={`h-2 bg-gradient-to-r ${specialist.color}`} />
              
              <div className="p-6">
                {/* Avatar placeholder */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${specialist.color} rounded-full opacity-20`} />
                  <div className="absolute inset-2 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {specialist.name.split(" ")[1]?.[0] || specialist.name[0]}
                    </span>
                  </div>
                  <motion.div
                    className={`absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br ${specialist.color} rounded-full flex items-center justify-center`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Award className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground mb-1">{specialist.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{specialist.specialty}</p>
                  
                  <div className="space-y-2 mb-4">
                    {specialist.credentials.map((credential, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-left">
                        <GraduationCap className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">{credential}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{specialist.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://wa.me/573156202499?text=Hola,%20quisiera%20agendar%20una%20cita%20con%20un%20especialista"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
          >
            Agendar Cita con un Especialista
          </a>
        </motion.div>
      </div>
    </section>
  );
}
