import { Mail, MapPin, Phone, Stethoscope } from "lucide-react";
import { FOOTER_LINKS } from "./landingData";

const LandingFooter = () => {
  return (
    <footer className="bg-slate-900 px-5 py-14 text-slate-300">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
                <Stethoscope size={20} />
              </span>
              <span className="text-lg font-semibold text-white">CareDesk</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Clinic management software for appointments, patient records and
              billing.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-teal-400" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-teal-400" />
                hello@caredesk.demo
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-teal-400" />
                Pune, Maharashtra
              </li>
            </ul>
          </div>

          {FOOTER_LINKS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#home"
                      className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CareDesk. Demo content only.</p>
          <p>Privacy policy · Terms of service</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
