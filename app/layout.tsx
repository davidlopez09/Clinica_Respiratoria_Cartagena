import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "Clínica Respiratoria y de Alergias | Cartagena, Colombia",
    description:
        "Primera organización de salud en Cartagena especializada en atención multidisciplinaria de enfermedades respiratorias y alergias. Neumología, Alergología, Pediatría, Otorrinolaringología, Dermatología y Somnología.",
    keywords:
        "clínica respiratoria, alergias, neumología, pediatría, cartagena, colombia, trastornos del sueño, asma, rinitis",
    icons: {
        icon: "/images/logo.png",
        shortcut: "/images/logo.png",
        apple: "/images/logo.png",
    },
};

export const viewport: Viewport = {
    themeColor: "#0891b2",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${inter.variable} ${playfair.variable} bg-background`}>
            <body className="font-sans antialiased">
                {children}
                {process.env.NODE_ENV === "production" && <Analytics />}
            </body>
        </html>
    );
}
