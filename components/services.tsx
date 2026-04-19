"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Stethoscope,
  Baby,
  Heart,
  Ear,
  Sparkles,
  Moon,
  Microscope,
  Activity,
  Wind,
  ChevronRight,
} from "lucide-react";

const specialties = [
  {
    icon: Stethoscope,
    title: "Neumología de Adultos",
    description: "Diagnóstico y tratamiento de enfermedades pulmonares y respiratorias en adultos.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Baby,
    title: "Neumología Pediátrica",
    description: "Atención especializada para problemas respiratorios en niños y adolescentes.",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: Heart,
    title: "Alergología",
    description: "Diagnóstico y tratamiento de alergias respiratorias, alimentarias y de piel.",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    icon: Baby,
    title: "Pediatría",
    description: "Atención integral de la salud infantil con enfoque preventivo y educativo.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Ear,
    title: "Otorrinolaringología",
    description: "Especialidad en oído, nariz, garganta y estructuras relacionadas.",
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    icon: Sparkles,
    title: "Dermatología",
    description: "Diagnóstico y tratamiento de afecciones de la piel relacionadas con alergias.",
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    icon: Moon,
    title: "Somnología",
    description: "Estudio y tratamiento de trastornos del sueño y apnea.",
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: Activity,
    title: "Medicina Interna",
    description: "Atención integral del paciente adulto con enfermedades complejas.",
    color: "from-teal-500/20 to-cyan-500/20",
  },
];

const procedures = [
  "Prueba Intradérmica de Alergia con Escarificación",
  "Prueba Epicutánea de Alergia (Parche)",
  "Prueba de Provocación Nasal con Alergeno",
  "Inmunoterapias (Hipersensibilización)",
  "Polisomnografía con Oximetría",
  "Polisomnografía en Titulación de CPAP",
  "Medición de CO2 o Capnografía",
  "Espirometría Pre y Post Broncodilatadores",
  "Prueba de Broncomotricidad con Ejercicio",
  "Test de Caminata de 6 Minutos",
  "Nasosinuscopia",
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"specialties" | "procedures">("specialties");

  return (
    <section id="servicios" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
            Atención integral para tu salud respiratoria
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Contamos con un equipo multidisciplinario de especialistas y tecnología de 
            vanguardia para brindarte el mejor diagnóstico y tratamiento.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setActiveTab("specialties")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "specialties"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <span className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Especialidades
            </span>
          </button>
          <button
            onClick={() => setActiveTab("procedures")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "procedures"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <span className="flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              Procedimientos
            </span>
          </button>
        </motion.div>

        {/* Specialties Grid */}
        {activeTab === "specialties" && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-xl cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${specialty.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <specialty.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{specialty.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{specialty.description}</p>
                <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Más información</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Procedures List */}
        {activeTab === "procedures" && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {procedures.map((procedure, index) => (
              <motion.div
                key={procedure}
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all hover:shadow-md flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.05 * index }}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Wind className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{procedure}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Programs */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Talleres y Programas</h3>
            <p className="text-muted-foreground">Educación continua para pacientes y familiares</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Rehabilitación Pulmonar", desc: "Programa integral de ejercicios y educación" },
              { title: "Seguimiento CPAP", desc: "Acompañamiento continuo para pacientes con CPAP" },
              { title: "Educación en Sueño", desc: "Talleres sobre trastornos del sueño" },
            ].map((program, index) => (
              <motion.div
                key={program.title}
                className="bg-card rounded-xl p-6 text-center shadow-sm"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-bold text-foreground mb-2">{program.title}</h4>
                <p className="text-sm text-muted-foreground">{program.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
