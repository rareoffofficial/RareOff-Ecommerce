import categoryImage from "../assets/10.jpg";

function Categories() {
  return (
    <section className="bg-black text-white pt-4 pb-24 px-6 md:px-20">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-20">

        {/* LEFT SIDE */}
        <div className="flex justify-center md:justify-start md:pl-24">

          <div className="text-center md:text-left">

            <a
              href="#bestsellers"
              className="
                block
                text-4xl
                md:text-6xl
                mb-5
                tracking-wide
                hover:text-red-500
                transition
                duration-300
              "
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: "500",
              }}
            >
              Best Sellers
            </a>

            <a
              href="#hoodies"
              className="
                block
                text-4xl
                md:text-6xl
                mb-5
                tracking-wide
                hover:text-red-500
                transition
                duration-300
              "
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: "500",
              }}
            >
              Hoodies
            </a>

            <a
              href="#newarrivals"
              className="
                block
                text-4xl
                md:text-6xl
                mb-5
                tracking-wide
                hover:text-red-500
                transition
                duration-300
              "
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: "500",
              }}
            >
              New Arrivals
            </a>

            <a
              href="#tshirts"
              className="
                block
                text-4xl
                md:text-6xl
                tracking-wide
                hover:text-red-500
                transition
                duration-300
              "
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: "500",
              }}
            >
              T-Shirts
            </a>

          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center md:justify-end">

          <img
            src={categoryImage}
            alt="RareOff Category"
            className="
              w-[300px]
              md:w-[430px]
              h-[420px]
              md:h-[540px]
              object-cover
              shadow-2xl
            "
          />

        </div>

      </div>

    </section>
  );
}

export default Categories;