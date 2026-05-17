// src/pages/About.jsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import bgImage from "../assets/About2.jpg";
import img1 from "../assets/45.jpg";
import img2 from "../assets/14.jpg";

function About() {

  return (
    <div className="bg-black min-h-screen overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">

        {/* BACKGROUND */}
        <img
          src={bgImage}
          alt="About Background"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            opacity-70
          "
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* CONTENT */}
        <div
          className="
            relative
            z-20
            h-full
            flex
            items-center
            justify-between
            px-16
            pt-[120px]
          "
        >

          {/* LEFT TEXT */}
          <div className="w-[35%]">

            <h1
              className="
                text-[80px]
                leading-[90px]
                text-[#c40000]
              "
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: "700",
              }}
            >
              About Us
            </h1>

            <p
              className="
                text-white/75
                text-[17px]
                leading-[34px]
                mt-8
                max-w-[500px]
              "
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              
            </p>

          </div>

          {/* RIGHT IMAGES */}
          <div
            className="
              flex
              items-center
              gap-12
              pr-10
            "
          >

            {/* IMAGE 1 */}
            <div
              className="
                relative
                group
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  rounded-[8px]
                  border
                  border-white/30
                  scale-105
                "
              ></div>

              <img
                src={img1}
                alt="RareOff"
                className="
                  w-[320px]
                  h-[500px]
                  object-cover
                  rounded-[8px]
                  relative
                  z-10
                  transition
                  duration-500
                  group-hover:scale-[1.03]
                "
              />

            </div>

            {/* IMAGE 2 */}
            <div
              className="
                relative
                group
                mt-16
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  rounded-[8px]
                  border
                  border-white/30
                  scale-105
                "
              ></div>

              <img
                src={img2}
                alt="RareOff"
                className="
                  w-[320px]
                  h-[500px]
                  object-cover
                  rounded-[8px]
                  relative
                  z-10
                  transition
                  duration-500
                  group-hover:scale-[1.03]
                "
              />

            </div>

          </div>

        </div>

      </section>

      {/* SECOND ABOUT SECTION */}
<section className="relative bg-black py-28 overflow-hidden">

  <div
    className="
      max-w-[1700px]
      mx-auto
      grid
      grid-cols-1
      lg:grid-cols-2
      items-center
    "
  >

    {/* LEFT IMAGE */}
    <div className="relative h-[850px] overflow-hidden">

      <img
        src={img1}
        alt="RareOff Fashion"
        className="
          w-full
          h-full
          object-cover
        "
      />

      {/* RED OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-red-900/40
          to-black/20
        "
      ></div>

    </div>

    {/* RIGHT CONTENT */}
    <div
      className="
        px-16
        lg:px-24
        py-20
        flex
        flex-col
        justify-center
        h-full
        bg-[#050505]
      "
    >

      {/* TOP SMALL TEXT */}
      <p
        className="
          text-white/80
          text-[12px]
          tracking-[4px]
          uppercase
          mb-10
        "
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Bold. Timeless. Unbreakable.
      </p>

      {/* LOGO */}
      <h2
        className="
          text-[#f5f1e8]
          text-[50px]
          mb-14
        "
        style={{
          fontFamily: "'Bodoni Moda', serif",
          fontWeight: "600",
        }}
      >
        RAREOFF
      </h2>

      {/* ABOUT TITLE */}
      <h3
        className="
          text-white
          text-[25px]
          mb-8
        "
        style={{
          fontFamily: "'Bodoni Moda', serif",
          fontWeight: "600",
        }}
      >
        ABOUT US
      </h3>

      {/* CONTENT */}
      <div
        className="
          space-y-8
          text-white/80
          text-[17px]
          leading-[36px]
          max-w-[700px]
        "
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "300",
        }}
      >

        <p>
          At RareOff, fashion is more than fabric —
          it’s a declaration of identity, confidence,
          and fearless individuality.
        </p>

        <p>
          We create luxury oversized streetwear that
          blends cinematic darkness with premium
          craftsmanship, designed for people who
          refuse to follow ordinary trends.
        </p>

        <p>
          Every piece is crafted to embody boldness,
          mystery, and timeless rebellion — made for
          those who stand apart from the crowd.
        </p>

        <p>
          RareOff is built for the fearless generation.
        </p>

      </div>

      {/* BOTTOM TEXT */}
      <h4
        className="
          text-[#f5f1e8]
          text-[54px]
          leading-[70px]
          mt-20
        "
        style={{
          fontFamily: "'Bodoni Moda', serif",
          fontWeight: "500",
        }}
      >
        Defiant. Enduring.
        <br />
        Unstoppable.
      </h4>

    </div>

  </div>

</section>

      <Footer />

    </div>
  );
}

export default About;