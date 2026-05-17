import { useRef, useState } from "react";

import leftImage from "../assets/Goat.jpg";
import product1 from "../assets/27.jpg";
import product2 from "../assets/32.jpg";
import product3 from "../assets/34.jpg";

function ShowcaseSection() {
  const products = [
    {
      image: product1,
      title: "Black Gothic T-Shirt – Minimal Darkness, Maximum Style",
      price: "₹1999",
      oldPrice: "₹2999",
    },
    {
      image: product2,
      title: "RareOff Shadow Edition Oversized Tee",
      price: "₹2499",
      oldPrice: "₹3499",
    },
    {
      image: product3,
      title: "Luxury Streetwear Gothic Drop",
      price: "₹2999",
      oldPrice: "₹3999",
    },
  ];

  const [current, setCurrent] = useState(0);

  const autoSlide = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const startAutoSlide = () => {
    autoSlide.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 1200);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlide.current);
  };

  return (
    <section className="bg-black px-4 md:px-8 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative overflow-hidden">

          <img
            src={leftImage}
            alt="RareOff Art"
            className="
              w-full
              h-[500px]
              md:h-[850px]
              object-cover
            "
          />

        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            bg-[#050505]
            relative
            flex
            flex-col
            justify-between
            p-6
            md:p-10
          "
        >

          {/* TITLE */}
          <div className="flex justify-between items-start gap-6">

            <h2
              className="
                text-white
                text-[26px]
                md:text-[42px]
                leading-tight
                max-w-[600px]
                font-light
              "
            >
              {products[current].title}
            </h2>

            <div className="text-right mt-2">

              <p className="text-white text-lg md:text-2xl">
                {products[current].price}
              </p>

              <p className="text-gray-500 line-through text-sm md:text-lg">
                {products[current].oldPrice}
              </p>

            </div>

          </div>

          {/* PRODUCT IMAGE */}
          <div
            className="
              flex
              justify-center
              items-center
              flex-1
              py-6
            "
            onMouseEnter={startAutoSlide}
            onMouseLeave={stopAutoSlide}
          >

            <img
              src={products[current].image}
              alt="RareOff Product"
              className="
                h-[320px]
                md:h-[620px]
                object-contain
                transition-all
                duration-700
                hover:scale-[1.03]
                cursor-pointer
              "
            />

          </div>

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="
              absolute
              left-6
              top-1/2
              -translate-y-1/2
              text-white
              text-3xl
              hover:scale-125
              transition
            "
          >
            ←
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="
              absolute
              right-6
              top-1/2
              -translate-y-1/2
              text-white
              text-3xl
              hover:scale-125
              transition
            "
          >
            →
          </button>

          {/* DOTS */}
          <div className="flex justify-center gap-4 pb-4">

            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                  w-5
                  h-5
                  rounded-full
                  border
                  border-white
                  transition-all
                  duration-300
                  ${
                    current === index
                      ? "bg-red-600 scale-110"
                      : "bg-black"
                  }
                `}
              />
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default ShowcaseSection;