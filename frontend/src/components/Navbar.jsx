import {
  FaSearch,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";

import product1 from "../assets/5.jpg";
import product2 from "../assets/11.jpg";

function Navbar() {

  const [showShopMenu, setShowShopMenu] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div
        className="
          w-full
          text-white
          text-center
          py-[8px]
          text-[11px]
          tracking-[1px]
          relative
          z-[100]
        "
        style={{
          background:
            "linear-gradient(90deg, #420000 0%, #9d0000 50%, #420000 100%)",
        }}
      >

        <button className="absolute left-5 top-1/2 -translate-y-1/2 text-[15px] text-white/70 hover:text-white transition">
          ‹
        </button>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "500",
            letterSpacing: "1px",
          }}
        >
          10% Off Your First Order – Use Code RARE10
        </p>

        <button className="absolute right-5 top-1/2 -translate-y-1/2 text-[15px] text-white/70 hover:text-white transition">
          ›
        </button>

      </div>

      {/* HEADER */}
      <header className="w-full absolute top-[34px] left-0 z-[100]">

        <div className="w-full px-6 py-4">

          {/* GLASS HEADER */}
          <div
            className="
              w-full
              h-[74px]
              px-14
              flex
              items-center
              justify-between
              border
              border-white/10
              rounded-full
              relative
            "
            style={{
              background: "rgba(0,0,0,0.28)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.45)",
            }}
          >

            {/* LOGO */}
           <Link to="/">

              <h1
                className="
                  text-[30px]
                  tracking-[4px]
                  text-[#f5f1e8]
                  leading-none
                "
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: "700",
                }}
              >
                RAREOFF
              </h1>

            </Link>

            {/* NAVIGATION */}
            <nav className="hidden md:flex items-center gap-8 h-full">

              {/* HOME */}
              <Link
                to="/"
                className="
                  h-full
                  flex
                  items-center
                  text-white/90
                  text-[11px]
                  uppercase
                  tracking-[2px]
                  hover:text-white
                  transition-all
                  duration-300
                "
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "500",
                }}
              >
                HOME
              </Link>

              {/* SHOP DROPDOWN */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setShowShopMenu(true)}
                onMouseLeave={() => setShowShopMenu(false)}
              >

                <Link
                  to="/shop"
                  className="
                    h-full
                    flex
                    items-center
                    text-white
                    text-[11px]
                    uppercase
                    tracking-[2px]
                    hover:text-white
                    transition-all
                    duration-300
                  "
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    lineHeight: "1",
                  }}
                >
                  SHOP
                </Link>

                {/* MEGA MENU */}
                <div
                  className={`
                    absolute
                    left-[-650px]
                    top-[68px]
                    w-[1700px]
                    transition-all
                    duration-300
                    ${
                      showShopMenu
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }
                  `}
                >

                  <div
                    className="
                      px-24
                      py-10
                      border
                      border-white/10
                      rounded-[28px]
                      grid
                      grid-cols-[260px_1fr]
                      gap-10
                      items-center
                    "
                    style={{
                      background: "rgba(0,0,0,0.62)",
                      backdropFilter: "blur(30px)",
                      WebkitBackdropFilter: "blur(30px)",
                      boxShadow:
                        "0 25px 80px rgba(0,0,0,0.82)",
                    }}
                  >

                    {/* LEFT MENU */}
                    <div className="flex flex-col justify-center gap-7 pl-4">

                      {[
                        {
                          name: "Hoodies",
                          link: "/hoodies",
                        },
                        {
                          name: "T-Shirts",
                          link: "/tshirts",
                        },
                        {
                          name: "Best Sellers",
                          link: "/bestsellers",
                        },
                        {
                          name: "New Arrivals",
                          link: "/newarrivals",
                        },
                      ].map((item, index) => (

                        <Link
                          key={index}
                          to={item.link}
                          className="
                            text-[#f5f1e8]
                            text-[22px]
                            hover:text-red-400
                            transition-all
                            duration-300
                          "
                          style={{
                            fontFamily: "'Bodoni Moda', serif",
                            fontWeight: "600",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {item.name}
                        </Link>

                      ))}

                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="flex items-center justify-end gap-0 w-full">

                      {/* IMAGE 1 */}
                      <Link
                        to="/hoodies"
                        className="group w-[260px]"
                      >

                        <div className="overflow-hidden rounded-none">

                          <img
                            src={product1}
                            alt="hoodies"
                            className="
                              w-full
                              h-[320px]
                              object-cover
                              transition-all
                              duration-700
                              group-hover:scale-105
                            "
                          />

                        </div>

                        <p
                          className="
                            text-white
                            mt-3
                            text-[11px]
                            uppercase
                            tracking-[2px]
                          "
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          HOODIES
                        </p>

                      </Link>

                      {/* IMAGE 2 */}
                      <Link
                        to="/tshirts"
                        className="group w-[260px]"
                      >

                        <div className="overflow-hidden rounded-none">

                          <img
                            src={product2}
                            alt="tshirts"
                            className="
                              w-full
                              h-[320px]
                              object-cover
                              transition-all
                              duration-700
                              group-hover:scale-105
                            "
                          />

                        </div>

                        <p
                          className="
                            text-white
                            mt-3
                            text-[11px]
                            uppercase
                            tracking-[2px]
                          "
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          T-SHIRTS
                        </p>

                      </Link>

                    </div>

                  </div>

                </div>

              </div>

           {/* OTHER MENUS */}
{[
  {
    name: "LOOK BOOK",
    link: "/",
  },
  {
    name: "JOURNAL",
    link: "/",
  },
  {
    name: "ABOUT US",
    link: "/about",
  },
  {
    name: "FAQs",
    link: "/faqs",
  },
  {
    name: "CONTACT",
    link: "/",
  },
].map((item, index) => (

  <Link
    key={index}
    to={item.link}
    className="
      h-full
      flex
      items-center
      text-white/90
      text-[11px]
      uppercase
      tracking-[2px]
      hover:text-white
      transition-all
      duration-300
    "
    style={{
      fontFamily: "'Poppins', sans-serif",
      fontWeight: "500",
      lineHeight: "1",
    }}
  >
    {item.name}
  </Link>

))}

            </nav>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-5">

              <button className="text-white/90 text-[14px] hover:text-white transition-all duration-300">
                <FaSearch />
              </button>

              <button className="text-white/90 text-[14px] hover:text-white transition-all duration-300">
                <FaUser />
              </button>

              <button className="text-white/90 text-[14px] hover:text-white transition-all duration-300">
                <FaShoppingBag />
              </button>

            </div>

          </div>

        </div>

      </header>
    </>
  );
}

export default Navbar;