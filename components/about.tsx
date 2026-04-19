"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Eye, Sparkles } from "lucide-react";

const values = [
  { icon: Heart, title: "Vocación de Servicio", description: "Compromiso genuino con el bienestar de nuestros pacientes" },
  { icon: Sparkles, title: "Humanización", description: "Trato cálido y empático en cada atención" },
  { icon: Target, title: "Calidad", description: "Excelencia en todos nuestros servicios médicos" },
  { icon: Eye, title: "Innovación", description: "Tecnología de vanguardia y actualización constante" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clinica" className="py-24 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              Quiénes Somos
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
              Más de 30 años cuidando la salud de Cartagena
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong className="text-foreground">Clínica Respiratoria y de Alergias</strong> es la primera 
              organización de salud en Cartagena dedicada a la atención multidisciplinaria de niños y adultos, 
              con énfasis en la educación, prevención e investigación de enfermedades respiratorias y de alergias.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Contamos con especialistas en: <span className="text-primary font-medium">Alergología, Neumología, 
              Pediatría, Otorrinolaringología, Dermatología y Somnología</span>. Nuestro principal objetivo 
              institucional es mejorar la calidad de vida de los pacientes, brindando atención médica con 
              vía a la excelencia.
            </p>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="bg-muted/50 rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Misión</h3>
                <p className="text-sm text-muted-foreground">
                  Prestamos servicios dedicados a la atención, educación e investigación en salud, 
                  procurando siempre servicios con alto grado de calidad científica, técnica y humana.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-muted/50 rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Visión</h3>
                <p className="text-sm text-muted-foreground">
                  Ser reconocidos a nivel nacional e internacional como modelo sólido de atención, 
                  educación e investigación en salud respiratoria y alergológica.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* History highlight */}
            <motion.div
              className="mt-6 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-primary-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-bold mb-2">Reseña Histórica</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Desde 1993, somos el fruto de un sueño hecho realidad, producto de la unión y esfuerzo 
                de médicos especialistas comprometidos con brindar a Cartagena y la costa caribe 
                alternativas para el manejo integral de problemas respiratorios y alergias.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
