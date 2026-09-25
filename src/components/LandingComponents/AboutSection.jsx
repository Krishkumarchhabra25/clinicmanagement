import { CheckCircle2 } from "lucide-react";
import { ABOUT_HIGHLIGHTS } from "./landingData";

const AboutSection = () => {
  return (
    <section id="about" className="px-5 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
          alt="Doctor consulting a patient"
          loading="lazy"
          className="w-full rounded-3xl object-cover shadow-md"
        />

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-teal-600">
            About CareDesk
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
            Built with clinics, for clinics
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            We started CareDesk after watching small practices juggle three
            notebooks, a whiteboard and a phone that never stops ringing. Every
            screen is designed around what the front desk and the doctor
            actually do during a working day.
          </p>

          <ul className="mt-8 space-y-4">
            {ABOUT_HIGHLIGHTS.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-teal-600"
                />
                <span className="text-sm text-slate-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
