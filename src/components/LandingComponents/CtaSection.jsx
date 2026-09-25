import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ADMINLOGIN } from "../../constants/routes";

const CtaSection = () => {
  return (
    <section id="contact" className="px-5 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl rounded-3xl bg-teal-600 px-8 py-12 text-center md:px-16 md:py-16">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          See CareDesk with your own clinic data
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-teal-50">
          Book a 20 minute walkthrough and we will load a week of sample
          appointments so your team can try the workflow before deciding.
        </p>

        <form
          className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="demo-email" className="sr-only">
            Work email
          </label>
          <input
            id="demo-email"
            type="email"
            placeholder="you@clinic.com"
            className="w-full rounded-xl px-4 py-3 text-sm text-slate-900 outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Book a demo
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-5 text-xs text-teal-50">
          Already have an account?{" "}
          <Link to={ADMINLOGIN} className="font-medium underline">
            Sign in here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
