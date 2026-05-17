import { Eye, Heart, Users } from "lucide-react";

function BrandValuesSection() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-12 border-t border-white/10">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1700px] mx-auto text-center">

        {/* CARD 1 */}
        <div className="flex flex-col items-center">

          <Eye
            size={28}
            strokeWidth={1.6}
            className="mb-5 text-[#f5f1e8]"
          />

          <h3
            className="
              text-[24px]
              md:text-[38px]
              mb-4
              leading-none
              tracking-[-0.5px]
              text-[#f8f4ea]
            "
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: "600",
            }}
          >
            Intentional design
          </h3>

          <p
            className="
              text-white/75
              leading-8
              text-[14px]
              max-w-[420px]
            "
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Every creation begins with a vision. From silhouette to stitch,
            every detail is forged with purpose — built to endure, to empower,
            and to move with you in both shadow and light.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="flex flex-col items-center">

          <Heart
            size={28}
            strokeWidth={1.6}
            className="mb-5 text-[#f5f1e8]"
          />

          <h3
            className="
              text-[24px]
              md:text-[38px]
              mb-4
              leading-none
              tracking-[-0.5px]
              text-[#f8f4ea]
            "
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: "600",
            }}
          >
            Made with care
          </h3>

          <p
            className="
              text-white/75
              leading-8
              text-[14px]
              max-w-[420px]
            "
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Crafted with devotion and precision. We work only with premium
            materials, ethical methods, and an unwavering dedication to pieces
            that stand the test of time.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="flex flex-col items-center">

          <Users
            size={28}
            strokeWidth={1.6}
            className="mb-5 text-[#f5f1e8]"
          />

          <h3
            className="
              text-[24px]
              md:text-[38px]
              mb-4
              leading-none
              tracking-[-0.5px]
              text-[#f8f4ea]
            "
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: "600",
            }}
          >
            A team with a goal
          </h3>

          <p
            className="
              text-white/75
              leading-8
              text-[14px]
              max-w-[420px]
            "
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Bound by passion, united by craft. Behind every garment is a team
            committed to creating clothing that embodies your spirit and speaks
            your truth.
          </p>
        </div>

      </div>
    </section>
  );
}

export default BrandValuesSection;