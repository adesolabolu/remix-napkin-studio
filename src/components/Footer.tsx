export default function Footer() {
  return (
    <footer className="border-t-2 border-[#2d2d2d] bg-[#fdfbf7] py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info & Locations */}
          <div className="col-span-2 space-y-3">
            <a
              href="#"
              className="text-3xl font-bold tracking-tight text-[#2d2d2d] inline-block"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Chops &amp; Crumb
            </a>
            <p className="text-lg text-[#2d2d2d]/80 max-w-sm">
              Your go-to kitchen in Lagos and Abuja for fresh birthday cakes,
              hot small chops platters, creamy cake parfaits, and 7 AM surprise
              trays.
            </p>
            <div className="text-base font-bold text-[#2d5da1]">
              Admiralty Way, Lekki Phase 1, Lagos · Mon–Sun 7:00 AM – 8:00 PM
            </div>
            <div className="text-sm text-[#2d2d2d]/60">
              © {new Date().getFullYear()} Chops &amp; Crumb Foods NG. Freshly
              baked &amp; fried to order.
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4
              className="text-xl font-bold text-[#2d2d2d] mb-3 wavy-underline"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Our Menu
            </h4>
            <ul className="space-y-2 text-lg text-[#2d2d2d]">
              <li>
                <a
                  href="#notes"
                  className="hover:line-through hover:text-[#ff4d4d] transition-all"
                >
                  Small Chops Boxes
                </a>
              </li>
              <li>
                <a
                  href="#notes"
                  className="hover:line-through hover:text-[#ff4d4d] transition-all"
                >
                  Surprise Trays
                </a>
              </li>
              <li>
                <a
                  href="#studio"
                  className="hover:line-through hover:text-[#ff4d4d] transition-all"
                >
                  Custom Cake Builder
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:line-through hover:text-[#ff4d4d] transition-all"
                >
                  Owambe Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4
              className="text-xl font-bold text-[#2d2d2d] mb-3 wavy-underline-blue"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Delivery Areas
            </h4>
            <ul className="space-y-2 text-lg text-[#2d2d2d]">
              <li>
                <a
                  href="#contact"
                  className="hover:line-through hover:text-[#2d5da1] transition-all"
                >
                  Lekki, VI &amp; Ikoyi
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:line-through hover:text-[#2d5da1] transition-all"
                >
                  Ikeja, Yaba &amp; Surulere
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:line-through hover:text-[#2d5da1] transition-all"
                >
                  Abuja (Wuse &amp; Maitama)
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:line-through hover:text-[#2d5da1] transition-all"
                >
                  Diaspora Surprise Orders
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-dashed border-[#2d2d2d]/30 text-center text-base text-[#2d2d2d]/70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Hot Puff-Puff · Meaty Samosas · Whipped Cream Cakes · Chilled Zobo
          </div>
          <div>Same-day delivery across Lagos &amp; Abuja</div>
        </div>
      </div>
    </footer>
  );
}
