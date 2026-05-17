import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import slide1 from "../assets/1.png";
import slide2 from "../assets/3.png";

function Hero() {

  const slides = [
    {
      image: slide1,
      title: "Threads of Darkness, Worn with Pride.",
      button: "SHOP NOW",
    },

    {
      image: slide2,
      title: "Luxury Streetwear For The Fearless.",
      button: "EXPLORE",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      <AnimatePresence mode="wait">

        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >

          {/* Background Image */}
          <img
            src={slides[currentSlide].image}
            alt="RareOff Hero"
            className="w-full h-full object-cover"
          />

          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

            {/* Main Heading */}
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="
                hero-title
                text-white
                text-4xl
                md:text-7xl
                font-normal
                leading-tight
                max-w-6xl
                mb-10
                drop-shadow-2xl
              "
            >
              {slides[currentSlide].title}
            </motion.h1>

            {/* BUTTON */}
            <Link to="/shop">

              <motion.button
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="
                  luxury-btn
                  text-sm
                  md:text-base
                  uppercase
                "
              >
                {slides[currentSlide].button}
              </motion.button>

            </Link>

          </div>

        </motion.div>

      </AnimatePresence>

      {/* Bottom Left Discount Text */}
      <div className="absolute bottom-10 left-10 z-20 hidden md:block">

        <p className="text-white/80 text-sm tracking-wide">
          Claim your exclusive 10% discount using code
          <span className="font-bold text-white ml-2">
            RARE10
          </span>
        </p>

      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">

        {slides.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              transition-all duration-300 rounded-full
              ${
                currentSlide === index
                  ? "w-4 h-4 bg-white"
                  : "w-3 h-3 bg-white/40"
              }
            `}
          ></button>

        ))}

      </div>

    </section>
  );
}

export default Hero;