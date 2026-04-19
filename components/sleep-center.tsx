"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Moon, Brain, AlertTriangle, Heart, TrendingUp } from "lucide-react";

const stats = [
  { value: "33%", label: "Población con alteraciones del sueño", icon: Moon },
  { value: "10%", label: "Sufre de somnolencia diurna", icon: Brain },
];

const factors = [
  {
    title: "Factor Anatómico",
    description: "La hipertrofia amigdalar, macroglosia y otras condiciones reducen el calibre de las vías aéreas superiores.",
    icon: "🫁",
  },
  {
    title: "Factor Muscular",
    description: "La actividad dilatadora muscular de las vías aéreas está disminuida durante el sueño.",
    icon: "💪",
  },
  {
    title: "Factor Neurológico",
    description: "Alteraciones que ocurren específicamente durante el estado de sueño afectan la respiración.",
    icon: "🧠",
  },
];

export function SleepCenter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sueno" className="py-24 bg-gradient-to-b from-background to-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-indigo-500/10 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Centro del Sueño
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
            Centro de Trastornos Respiratorios del Sueño
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Unidad especializada e interdisciplinaria dedicada al diagnóstico y atención integral 
            de pacientes con trastornos respiratorios del sueño como ronquido y síndrome de apnea.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative bg-card rounded-3xl p-8 text-center overflow-hidden border border-border/50"
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <stat.icon className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <motion.p
                className="text-5xl font-bold text-foreground mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.2, type: "spring" }}
              >
                {stat.value}
              </motion.p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Síndrome de Apnea e Hipopnea de Sueño (SAHS)
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Consiste en la aparición de episodios recurrentes de limitación al paso del aire 
              durante el sueño, como consecuencia de una alteración anatómica y/o funcional de 
              las vías aéreas. Esta condición puede generar:
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Brain, text: "Somnolencia diurna y cansancio" },
                { icon: AlertTriangle, text: "Alteración del estado de ánimo" },
                { icon: Heart, text: "Problemas cardiovasculares" },
                { icon: TrendingUp, text: "Riesgo aumentado de accidentes" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-4 bg-muted/50 rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <p className="text-foreground font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Factors */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              Factores que favorecen el colapso de vías aéreas
            </h3>
            {factors.map((factor, index) => (
              <motion.div
                key={factor.title}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:border-indigo-500/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{factor.icon}</span>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{factor.title}</h4>
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Services offered */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Servicios del Centro del Sueño
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Polisomnografía", desc: "Estudio completo del sueño" },
              { title: "Titulación CPAP", desc: "Ajuste de terapia respiratoria" },
              { title: "Suministro CPAP/BIPAP", desc: "Equipos para tratamiento" },
              { title: "Seguimiento", desc: "Control continuo de pacientes" },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-card rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="w-6 h-6 text-indigo-500" />
                </div>
                <h4 className="font-bold text-foreground mb-1">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
