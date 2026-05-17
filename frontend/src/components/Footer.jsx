import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-6 px-10 md:px-16 overflow-hidden">

      {/* EMAIL SECTION */}
      <div className="w-full border-b border-zinc-700 pb-5">

        <div className="flex items-center justify-between">

          <input
            type="email"
            placeholder="Email address"
            className="
              bg-transparent
              outline-none
              text-white
              text-[22px]
              md:text-[34px]
              w-full
              placeholder:text-zinc-300
            "
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          />

          <button className="text-3xl text-white hover:translate-x-2 transition duration-300">
            →
          </button>

        </div>

      </div>

      {/* FOOTER CONTENT */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 items-start">

        {/* QUICK SHOP */}
        <div>

          <h3
            className="text-[12px] tracking-[2px] uppercase mb-5 text-zinc-300"
            style={{
              fontFamily: "'Cinzel', serif",
            }}
          >
            Quick Shop
          </h3>

          <div className="flex flex-col gap-2 text-[15px]">

            <a href="#" className="hover:text-red-500 transition">
              Orders
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Best Sellers
            </a>

            <a href="#" className="hover:text-red-500 transition">
              New Arrivals
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Hoodies
            </a>

            <a href="#" className="hover:text-red-500 transition">
              T-Shirts
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Profile
            </a>

          </div>

        </div>

        {/* CUSTOMER CARE */}
        <div>

          <h3
            className="text-[12px] tracking-[2px] uppercase mb-5 text-zinc-300"
            style={{
              fontFamily: "'Cinzel', serif",
            }}
          >
            Customer Care
          </h3>

          <div className="flex flex-col gap-2 text-[15px]">

            <a href="#" className="hover:text-red-500 transition">
              Search
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Contact Information
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Refund Policy
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Shipping Policy
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Terms Of Service
            </a>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-start md:items-end justify-between h-full">

          <h2
            className="text-[42px] text-white"
            style={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: "2px",
            }}
          >
            RAREOFF
          </h2>

          <div className="flex gap-5 text-[22px] mt-8">

            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-red-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              className="hover:text-red-500 transition"
            >
              <FaTiktok />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              className="hover:text-red-500 transition"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="w-full border-t border-zinc-800 mt-10 pt-5 flex flex-col md:flex-row justify-between gap-4 text-[13px] text-zinc-400">

        <p>© 2026 RareOff. All rights reserved.</p>

        <div className="flex flex-wrap gap-4">

          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-white transition">
            Refund Policy
          </a>

          <a href="#" className="hover:text-white transition">
            Terms Of Service
          </a>

          <a href="#" className="hover:text-white transition">
            Shipping Policy
          </a>

          <a href="#" className="hover:text-white transition">
            Contact Information
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;