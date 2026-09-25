import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "./landingData";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-teal-600">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
            What clinic teams say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <Quote size={24} className="text-teal-200" />
              <blockquote className="mt-4 flex-grow text-sm leading-relaxed text-slate-600">
                “{testimonial.quote}”
              </blockquote>

              <div className="mt-5 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={14} fill="currentColor" />
                ))}
              </div>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
