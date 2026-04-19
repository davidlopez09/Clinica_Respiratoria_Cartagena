"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Shield, Users, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    image: "/images/hero-1.jpg",
    title: "Cuidamos tu salud respiratoria",
    subtitle: "y bienestar integral",
  },
  {
    image: "/images/hero-2.jpg",
    title: "Tecnología de vanguardia",
    subtitle: "para diagnósticos precisos",
  },
  {
    image: "/images/hero-3.jpg",
    title: "Atención especializada",
    subtitle: "para toda la familia",
  },
];

const stats = [
  { icon: Users, value: "30+", label: "Años de Experiencia" },
  { icon: Award, value: "6", label: "Especialidades Médicas" },
  { icon: Shield, value: "10K+", label: "Pacientes Atendidos" },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Images - All stacked with crossfade */}
      <div className="absolute inset-0 bg-primary">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={false}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.05
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        ))}
        {/* Dark overlay with gradient - Always visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A171B]/60 via-transparent to-transparent" />
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Primera IPS Especializada en Cartagena
            </motion.span>
            
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentSlide}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-balance">{slides[currentSlide].title}</span>{" "}
                <span className="text-secondary text-balance">{slides[currentSlide].subtitle}</span>
              </motion.h1>
            </AnimatePresence>
            
            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
              Atención multidisciplinaria para niños y adultos con énfasis en educación, 
              prevención e investigación de enfermedades respiratorias y alergias.
              <span className="block mt-2 italic text-secondary font-medium">
                &ldquo;Respirar Bien y sin Alergias es vivir Mejor!&rdquo;
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                href="https://wa.me/573156202499?text=Hola,%20quisiera%20solicitar%20una%20cita"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-full font-medium text-center transition-all hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5" />
                Agendar Cita
              </motion.a>
              <motion.a
                href="#clinica"
                className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-full font-medium text-center transition-all flex items-center justify-center gap-2 hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Conocer Más
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#clinica" className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
          <span className="text-sm mb-2">Descubre más</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
}
