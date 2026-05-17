// src/pages/Faqs.jsx

import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import faqBanner from "../assets/About.jpg";

function Faqs() {

  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is the return policy?",
      answer:
        "Our goal is for every customer to be totally satisfied with their purchase. If this isn’t the case, let us know and we’ll do our best to work with you to make it right.",
    },

    {
      question: "Are any purchases final sale?",
      answer:
        "We are unable to accept returns on certain items. These will be carefully marked before purchase.",
    },

    {
      question: "When will I get my order?",
      answer:
        "We will work quickly to ship your order as soon as possible. Once your order has shipped, you will receive an email with further information. Delivery times vary depending on your location.",
    },

    {
      question: "Where are your products manufactured?",
      answer:
        "Our products are manufactured both locally and globally. We carefully select our manufacturing partners to ensure our products are high quality and a fair value.",
    },

    {
      question: "How much does shipping cost?",
      answer:
        "Shipping is calculated based on your location and the items in your order. You will always know the shipping price before you purchase.",
    },
  ];

  const toggleFaq = (index) => {

    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }

  };

  return (
    <div className="bg-black min-h-screen overflow-hidden">

      <Navbar />

      {/* HERO IMAGE */}
      <section className="pt-[130px]">

        <div className="relative h-[420px] overflow-hidden">

          <img
            src={faqBanner}
            alt="FAQ Banner"
            className="
              w-full
              h-full
              object-cover
              grayscale
            "
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* TITLE */}
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >

            <h1
              className="
                text-[#b30000]
                text-[90px]
              "
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: "700",
              }}
            >
              faq
            </h1>

          </div>

        </div>

      </section>

      {/* FAQ SECTION */}
      <section className="bg-black py-24">

        <div className="max-w-[1450px] mx-auto px-10">

          {/* TITLE */}
          <h2
            className="
              text-white
              text-center
              text-[48px]
              mb-20
            "
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: "500",
            }}
          >
            Frequently asked questions
          </h2>

          {/* FAQ LIST */}
          <div className="border-t border-white/30">

            {faqs.map((faq, index) => (

              <div
                key={index}
                className="border-b border-white/30"
              >

                {/* QUESTION */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    py-7
                    text-left
                  "
                >

                  <span
                    className="
                      text-white
                      text-[24px]
                    "
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "300",
                    }}
                  >
                    {faq.question}
                  </span>

                  <span
                    className="
                      text-white
                      text-[28px]
                    "
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>

                </button>

                {/* ANSWER */}
                <div
                  className={`
                    overflow-hidden
                    transition-all
                    duration-500
                    ${
                      openIndex === index
                        ? "max-h-[500px] pb-10"
                        : "max-h-0"
                    }
                  `}
                >

                  <div className="max-w-[700px] ml-auto pr-20">

                    <p
                      className="
                        text-white/75
                        text-[20px]
                        leading-[40px]
                      "
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Faqs;