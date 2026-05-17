import { motion } from "framer-motion";

function CollectionQuote() {
  return (
    <section className="bg-black text-white pt-8 pb-20 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* TEXT */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="
            text-[18px]
            md:text-[28px]
            leading-[1.6]
            text-white
            text-center
            max-w-5xl
            mx-auto
            normal-case
          "
          style={{
            fontFamily: "'Cinzel', serif",
          }}
        >
          More than clothing — our pieces are fragments of the night,
          <br />
          woven with strength, rebellion, and timeless allure.
        </motion.h2>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >

          <button
            className="
              border
              border-white
              text-white
              px-10
              py-3
              text-xs
              tracking-[3px]
              uppercase
              hover:bg-white
              hover:text-black
              transition-all
              duration-500
            "
            style={{
              fontFamily: "'Cinzel', serif",
            }}
          >
            Shop Now
          </button>

        </motion.div>

      </div>

    </section>
  );
}

export default CollectionQuote;