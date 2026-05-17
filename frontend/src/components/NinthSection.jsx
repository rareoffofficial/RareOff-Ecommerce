import { useEffect, useRef } from "react";
import Ninth from "../assets/Ninth.jpg";

function NinthSection() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    let position = 0;
    let animationFrame;

    const animate = () => {
      position -= 1;

      if (Math.abs(position) >= marquee.scrollWidth / 2) {
        position = 0;
      }

      marquee.style.transform = `translateX(${position}px)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="bg-black py-4 overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative w-full h-[650px] overflow-hidden">

        <img
          src={Ninth}
          alt="RareOff"
          className="w-full h-full object-cover opacity-90"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* MOVING GOTHIC TEXT */}
        <div className="absolute bottom-10 left-0 w-full overflow-hidden z-20">

          <div
            ref={marqueeRef}
            className="flex w-max whitespace-nowrap"
            style={{
              fontFamily: "'UnifrakturCook', cursive",
            }}
          >
            <div className="flex items-center">

              <span className="text-white text-[80px] md:text-[100px] mr-24">
                Discover what’s new and timeless.
              </span>

              <span className="text-[#f3e8d2] text-[80px] md:text-[100px] mr-24">
                Step into style.
              </span>

              <span className="text-white text-[80px] md:text-[100px] mr-24">
                Discover what’s new and timeless.
              </span>

              <span className="text-[#f3e8d2] text-[80px] md:text-[100px] mr-24">
                Step into style.
              </span>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default NinthSection;