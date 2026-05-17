function StorySection() {
  return (
    <section className="bg-black px-4 md:px-8 py-10">

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          items-center
          gap-10
          border
          border-[#222]
          p-6
          md:p-10
        "
      >

        {/* LEFT CONTENT */}
        <div className="text-white max-w-[520px]">

          <p
            className="
              text-[11px]
              tracking-[3px]
              uppercase
              text-gray-400
              mb-6
            "
          >
            Dark & Empowering
          </p>

          <h2
            className="
              text-[34px]
              md:text-[58px]
              leading-[1.05]
              font-light
              mb-8
            "
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Forge Your Wardrobe on
            <br />
            Eternal Foundations
          </h2>

          <p
            className="
              text-gray-300
              text-[15px]
              leading-8
              mb-8
            "
          >
            Clothing that endures beyond fleeting trends —
            these are the pieces you'll return to, season
            after season.
          </p>

          <p
            className="
              text-gray-300
              text-[15px]
              leading-8
              mb-10
            "
          >
            Each design is a union of strength and simplicity,
            crafted to flow seamlessly with your life,
            wherever the shadows take you.
          </p>

          <button
            className="
              border
              border-white
              px-8
              py-4
              uppercase
              tracking-[2px]
              text-sm
              hover:bg-white
              hover:text-black
              transition-all
              duration-300
            "
          >
            Explore the Collection
          </button>

        </div>

        {/* RIGHT VIDEO */}
        <div className="w-full">

          <video
            autoPlay
            muted
            loop
            playsInline
            className="
              w-full
              h-[300px]
              md:h-[650px]
              object-cover
            "
          >
            <source src="/videos/story.mp4" type="video/mp4" />
          </video>

        </div>

      </div>

    </section>
  );
}

export default StorySection;