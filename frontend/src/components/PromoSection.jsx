import "@fontsource/unifrakturcook";
import promoImage from "../assets/5Section.png";

function PromoSection() {
  return (
    <section className="bg-black px-4 md:px-8 py-8">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-[#3a3a3a]">

        {/* LEFT */}
        <div className="bg-black flex items-center justify-center min-h-[420px] md:min-h-[620px] border-r border-[#3a3a3a]">

          <h1
            className="
              text-[#f3efe7]
              uppercase
              leading-[0.78]
              text-[140px]
              md:text-[250px]
              font-normal
              select-none
            "
            style={{
              fontFamily: "'UnifrakturCook', serif",
              letterSpacing: "-8px",
            }}
          >
            Rare
            <br />
            off
          </h1>

        </div>

        {/* RIGHT */}
        <div className="bg-[#120000]">

          <img
            src={promoImage}
            alt="RareOff"
            className="
              w-full
              h-full
              object-cover
              min-h-[420px]
              md:min-h-[620px]
            "
          />

        </div>

      </div>

      {/* BOTTOM CONTENT */}
      <div className="text-center py-10 md:py-14 border border-t-0 border-[#3a3a3a]">

        <h2
          className="
            text-white
            text-[28px]
            md:text-[52px]
            font-light
            tracking-[-1px]
            leading-tight
          "
          style={{
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Step into the Shadows — Join Our Coven of Style.
        </h2>

        <p
          className="
            text-gray-300
            mt-4
            text-sm
            md:text-lg
          "
        >
          Be the first to know about new collections and special offers.
        </p>

        {/* EMAIL BOX */}
        <div className="flex justify-center mt-8">

          <div
            className="
              flex
              items-center
              justify-between
              border
              border-[#6d6d6d]
              rounded-full
              px-6
              py-4
              w-[320px]
              md:w-[520px]
              bg-black
            "
          >

            <input
              type="email"
              placeholder="Email address"
              className="
                bg-transparent
                outline-none
                text-white
                placeholder:text-gray-400
                w-full
              "
            />

            <button
              className="
                text-white
                text-2xl
                ml-4
                hover:translate-x-1
                transition
              "
            >
              →
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default PromoSection;