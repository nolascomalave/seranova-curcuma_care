import { useState, useEffect, useRef } from "react";
import {
  Star,
  Leaf,
  Shield,
  Sparkles,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Home,
  Camera,
  MessageCircle,
  HelpCircle,
  Moon,
  Sun,
  VolumeOff,
  Pause,
  Play,
  Volume2,
  Volume1,
  Component
} from "lucide-react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
// import Image from "next/image"

const benefits = [
  {
    icon: <Sparkles className="w-8 h-8 text-orange-600 dark:text-orange-500" />,
    title: "Antioxidante Natural",
    description: "La cúrcuma combate los radicales libres y previene el envejecimiento prematuro",
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-600 dark:text-green-500" />,
    title: "100% Natural",
    description: "Ingredientes orgánicos: Glicerina, Cúrcuma y Aceite esencial de árbol de té",
  },
  {
    icon: <Shield className="w-8 h-8 text-orange-600 dark:text-orange-500" />,
    title: "Suaviza la Piel",
    description: "Propiedades antiinflamatorias que calman y nutren todo tipo de piel",
  },
];

const testimonials = [
  {
    name: "María González",
    rating: 5,
    comment: "Mi piel se ve más luminosa desde que uso Cúrcuma Care. ¡Lo recomiendo totalmente!",
    image: "/images/customer.svg?height=60&width=60",
  },
  {
    name: "Ana Rodríguez",
    rating: 5,
    comment: "Perfecto para mi piel sensible. No irrita y deja una sensación muy suave.",
    image: "/images/customer.svg?height=60&width=60",
  },
  {
    name: "Carmen López",
    rating: 5,
    comment: "El aroma del árbol de té es increíble y los resultados se notan desde la primera semana.",
    image: "/images/customer.svg?height=60&width=60",
  },
];

const faqs = [
  {
    question: "¿Para qué tipo de piel es recomendado?",
    answer:
      "Nuestro jabón Cúrcuma Care es ideal para todo tipo de piel, especialmente piel grasa, mixta y con tendencia al acné. También es suave para pieles sensibles gracias a sus ingredientes naturales.",
  },
  {
    question: "¿Qué ingredientes contiene exactamente?",
    answer:
      "Contiene Glicerina (C3H8O3), Cúrcuma y Aceite esencial de árbol de té. Todos los ingredientes son 100% naturales y orgánicos.",
  },
  {
    question: "¿Cuánto tiempo dura cada jabón?",
    answer:
      "Cada jabón tiene una duración aproximada de 4-6 semanas con uso diario, dependiendo de la frecuencia de uso.",
  },
  {
    question: "¿Cómo debo conservar el jabón?",
    answer:
      "Mantén el jabón en un lugar seco y fresco, preferiblemente en una jabonera que permita el drenaje del agua para preservar sus propiedades naturales.",
  },
];

const menuItems = [
  { id: "inicio", label: "Inicio", icon: <Home className="w-5 h-5" /> },
  { id: "beneficios", label: "Beneficios", icon: <Sparkles className="w-5 h-5" /> },
  { id: "ingredientes", label: "Ingredientes", icon: <Component className="w-5 h-5" /> },
  { id: "comprar", label: "Comprar", icon: <ShoppingCart className="w-5 h-5" /> },
  { id: "galeria", label: "Galería", icon: <Camera className="w-5 h-5" /> },
  { id: "testimonios", label: "Testimonios", icon: <MessageCircle className="w-5 h-5" /> },
  { id: "faq", label: "FAQ", icon: <HelpCircle className="w-5 h-5" /> },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const playPayseVideo = () => {
    if(videoRef.current) {
      const paused = isPaused === true;

      setIsPaused(!paused);
      videoRef.current[paused ? "play" : "pause"]();
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Side Navigation - Floating with Icons */}
      <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-3 border border-orange-200 dark:border-gray-700">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  title={item.label}
                  className="group relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-gray-700 dark:hover:text-orange-400 transition-all duration-200 text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  {item.icon}
                  {/* Tooltip */}
                  <span className="absolute left-16 bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                className="group relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-gray-700 dark:hover:text-orange-400 transition-all duration-200 text-gray-600 dark:text-gray-300 cursor-pointer"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {/* Tooltip */}
                <span className="absolute left-16 bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 lg:hidden">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-3 border border-orange-200 dark:border-gray-700">
          <ul className="flex space-x-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  title={item.label}
                  className="group relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-gray-700 dark:hover:text-orange-400 transition-all duration-200 text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  {item.icon}
                  {/* Tooltip */}
                  <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                className="group relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-gray-700 dark:hover:text-orange-400 transition-all duration-200 text-gray-600 dark:text-gray-300 cursor-pointer"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {/* Tooltip */}
                <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {isDarkMode ? "Claro" : "Oscuro"}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20 lg:pb-0">
        {/* Hero Section */}
        <section id="inicio" className="min-h-screen flex items-center justify-center px-4 py-15">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-8 flex justify-center items-center">
                <div className="relative">
                  <div className="w-96 h-96 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-80 h-80 bg-white rounded-full flex items-center justify-center">
                      <img
                          src="/images/logo.png"
                          alt="Cúrcuma Care - Jabón Natural"
                          width={300}
                          height={300}
                          className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-full font-semibold">
                    100% Natural
                  </div>
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                <span className="text-orange-600 dark:text-orange-500">CÚRCUMA CARE</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Jabón Natural de Cúrcuma</p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg">
                Cuida tu piel con ingredientes 100% naturales: Glicerina, Cúrcuma y Aceite esencial de árbol de té.
                Descubre el poder de la naturaleza.
              </p>
              <Button
                  onClick={() => scrollToSection("comprar")}
                  className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                  Comprar Ahora
              </Button>
            </div>
            <div className="flex justify-center">
              <section className="h-160 rounded-md" style={{
                  position: "relative",
                  width: "auto",
                  overflow: "hidden"
              }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    ref={videoRef}
                    onClick={e => {
                      if(e.target !== e.currentTarget) {
                        return;
                      }

                      playPayseVideo();
                    }}
                    className="w-full h-full object-cover rounded-md shadow-lg"
                >
                  <source src="/videos/presentation.mp4" type="video/mp4"/>
                  <p>Tu navegador no soporta videos HTML5.</p>
                </video>
                <div className="absolute flex gap-1 justify-end top-2 right-2">
                  <button
                    className="rounded-full bg-black/50 cursor-pointer p-2"
                    onClick={playPayseVideo}
                  >
                    {isPaused ? (
                      <Play className="w-5 h-5 text-white"/>
                    ) : (
                      <Pause className="w-5 h-5 text-white"/>
                    )}
                  </button>
                  <button
                    className="rounded-full bg-black/50 cursor-pointer p-2"
                    onClick={() => {
                      if(!videoRef.current) {
                        return;
                      }
                      let newVolume = 0;

                      switch(volume) {
                        case 0:
                        case 1:
                          newVolume = volume + 1;
                          break;
                        default:
                          newVolume = 0;
                          break;
                      }

                      videoRef.current.muted = newVolume === 0;
                      videoRef.current.volume = 0.5 * newVolume;
                      console.log(newVolume, videoRef.current.muted, videoRef.current.volume);
                      setVolume(newVolume);
                    }}
                  >
                    {volume === 0 ? (
                      <VolumeOff className="w-5 h-5 text-white"/>
                    ) : (volume === 1 ? (
                      <Volume1 className="w-5 h-5 text-white"/>
                    ) : (
                      <Volume2 className="w-5 h-5 text-white"/>
                    ))}
                  </button>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Beneficios Únicos</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Descubre por qué miles de personas han elegido Cúrcuma Care de Seranova
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center p-8 hover:shadow-lg transition-shadow duration-300 border-0 bg-orange-50 dark:bg-gray-900"
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section id="ingredientes" className="py-20 bg-green-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Ingredientes Naturales</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Transparencia total en nuestra fórmula</p>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/ingredients-label.png"
                alt="Ingredientes: Glicerina, Cúrcuma, Aceite esencial árbol de té"
                width={400}
                height={400}
                className="rounded-full shadow-xl"
              />
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Glicerina (C3H8O3)</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Hidrata profundamente y mantiene la suavidad natural de la piel
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Cúrcuma</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Poderoso antioxidante con propiedades antiinflamatorias
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Aceite de Árbol de Té</h3>
                <p className="text-gray-600 dark:text-gray-300">Propiedades antibacterianas y purificantes naturales</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section id="comprar" className="py-20 bg-orange-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Elige tu Presentación</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Opciones perfectas para cada necesidad</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Single Unit */}
              <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-8 text-center flex flex-col justify-between h-full">
                    <div>
                        <img
                            src="/images/soap/6.png"
                            alt="Cúrcuma Care - 1 Unidad"
                            className="mx-auto mb-6 rounded-lg object-contains"
                            style={{ width: "200px", height: "200px" }}
                        />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">1 Unidad</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">Perfecto para probar nuestro producto</p>
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-500 mb-6">$3.00</div>
                    </div>
                    <Button
                      href="https://wa.me/584123161687?text=Hola%2C%20estoy%20interesad%40%20en%20tu%20jab%C3%B3n%20C%C3%BArcuma%20Care%20por%20unidad:%20https%3A%2F%2Fi.pinimg.com%2F736x%2F83%2F06%2F79%2F8306798d8e6c620765184ac26c8fd377.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white py-5 rounded-full"
                      isLink={true}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Comprar Ahora
                    </Button>
                </CardContent>
              </Card>

              {/* Pack of 6 */}
              <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-orange-600 dark:border-orange-500 dark:bg-gray-800">
                <div className="absolute top-4 right-4 bg-orange-600 dark:bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ¡Más Popular!
                </div>
                <CardContent className="p-8 text-center flex flex-col justify-between h-full">
                    <div>
                        <img
                            src="/images/soap/8.png"
                            alt="Cúrcuma Care - Pack de 6"
                            className="mx-auto mb-6 rounded-lg object-contains"
                            style={{ width: "200px", height: "200px" }}
                        />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Pack de 6 Unidades</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">Ahorra más con nuestro pack familiar</p>
                        <div className="mb-4">
                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">$18.00</span>
                            <div className="text-3xl font-bold text-orange-600 dark:text-orange-500">$15.00</div>
                            <span className="text-green-600 dark:text-green-500 font-semibold">¡Ahorra $3.00!</span>
                        </div>
                    </div>
                    <Button
                      href="https://wa.me/584123161687?text=Hola%2C%20estoy%20interesad%40%20en%20la%20presentaci%C3%B3n%20de%206%20unidades%20del%20jab%C3%B3n%20C%C3%BArcuma%20Care:%20https%3A%2F%2Fi.pinimg.com%2F736x%2F42%2F5b%2Ff9%2F425bf966ded24004fd7a2e9d41983260.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white py-5 rounded-full"
                      isLink={true}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                        Comprar Pack
                    </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Galería del Producto</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Ve Cúrcuma Care en acción</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["3.png", "5.jpg", "4.jpg", "7.png"].map((item, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={"/images/soap/" + item}
                    alt={`Cúrcuma Care imagen ${index}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
              {/* [1, 2, 3, 4].map((index) => (
                <div
                  key={`ingredients-${index}`}
                  className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src="/images/ingredients-label.png"
                    alt={`Galería - Imagen ${index}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )) */}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-20 bg-orange-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Lo que Dicen Nuestros Clientes</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Testimonios reales de personas satisfechas</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image || "/customer.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-orange-400 text-orange-400 dark:fill-orange-500 dark:text-orange-500"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Preguntas Frecuentes</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Resolvemos tus dudas más comunes</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{faq.question}</h3>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-900 text-white pb-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Seranova - Cúrcuma Care. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
