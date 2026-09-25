import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Stethoscope, X } from "lucide-react";
import { ADMINLOGIN } from "../../constants/routes";
import { NAV_LINKS } from "./landingData";
import scrollToSection from "./scrollToSection";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("home");
          }}
          className="flex items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
            <Stethoscope size={20} />
          </span>
          <span className="text-lg font-semibold text-slate-900">CareDesk</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.sectionId}>
              <a
                href={`#${link.sectionId}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.sectionId);
                }}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to={ADMINLOGIN}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-teal-600"
          >
            Sign in
          </Link>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("contact");
            }}
            className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
          >
            Book a demo
          </a>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.sectionId}>
                <a
                  href={`#${link.sectionId}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setIsOpen(false);
                    scrollToSection(link.sectionId);
                  }}
                  className="text-sm font-medium text-slate-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            to={ADMINLOGIN}
            className="mt-5 block rounded-xl bg-teal-600 px-4 py-2 text-center text-sm font-medium text-white"
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
