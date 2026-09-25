import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, PlayCircle } from "lucide-react";
import { ADMINLOGIN } from "../../constants/routes";
import { HERO_STATS } from "./landingData";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-teal-50 via-white to-white px-5 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
            <CalendarCheck size={14} />
            Trusted by 120+ clinics
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Run your clinic without the paperwork
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            CareDesk brings appointments, doctor availability, patient records
            and billing into one dashboard, so your team spends the day with
            patients instead of registers and spreadsheets.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={ADMINLOGIN}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700"
            >
              Get started
              <ArrowRight size={16} />
            </Link>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-teal-300 hover:text-teal-700"
            >
              <PlayCircle size={16} />
              Watch demo
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-semibold text-slate-900">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-slate-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-teal-100/60 blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80"
            alt="Clinic staff reviewing patient schedule on a tablet"
            loading="lazy"
            className="relative w-full rounded-3xl object-cover shadow-xl"
          />
          <div className="relative -mt-10 ml-6 w-64 rounded-2xl bg-white p-4 shadow-lg">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Today
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              18 appointments scheduled
            </p>
            <p className="mt-1 text-xs text-teal-600">
              3 follow-ups · 2 slots free
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
