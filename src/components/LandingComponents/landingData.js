import {
  CalendarCheck,
  ClipboardList,
  CreditCard,
  LineChart,
  MessageSquareHeart,
  ShieldCheck,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", sectionId: "home" },
  { label: "About", sectionId: "about" },
  { label: "Services", sectionId: "services" },
  { label: "Testimonials", sectionId: "testimonials" },
  { label: "Contact", sectionId: "contact" },
];

export const HERO_STATS = [
  { value: "120+", label: "Clinics onboarded" },
  { value: "45k", label: "Appointments booked" },
  { value: "98%", label: "Patient satisfaction" },
];

export const ABOUT_HIGHLIGHTS = [
  "Single dashboard for doctors, front desk and support staff",
  "Real-time availability so double bookings never happen",
  "Patient history, prescriptions and reports in one record",
  "Role based access with audit friendly password policies",
];

export const SERVICES = [
  {
    icon: CalendarCheck,
    title: "Appointment Scheduling",
    description:
      "Publish doctor availability, let the front desk book slots in seconds and send automatic reminders to patients.",
  },
  {
    icon: ClipboardList,
    title: "Patient Records",
    description:
      "Demographics, visit history, prescriptions and lab reports stored against one searchable patient profile.",
  },
  {
    icon: LineChart,
    title: "Clinic Analytics",
    description:
      "Track daily footfall, revenue trends and gender or age distribution from a dashboard built for clinic owners.",
  },
  {
    icon: CreditCard,
    title: "Billing & Invoices",
    description:
      "Generate consultation invoices, record part payments and export statements for your accountant.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description:
      "Admin and support roles, OTP verified password resets and session controls keep patient data protected.",
  },
  {
    icon: MessageSquareHeart,
    title: "Patient Engagement",
    description:
      "Follow-up nudges, feedback collection and support conversations that keep patients coming back.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "We moved three clinics off paper registers in a week. The front desk now books a follow-up before the patient leaves the room.",
    name: "Dr. Ananya Rao",
    role: "Founder, Sunrise Family Clinic",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    quote:
      "Availability slots and reminders cut our no-shows almost in half. The dashboard is the first thing I open every morning.",
    name: "Dr. Imran Sheikh",
    role: "Orthopaedic Surgeon, CarePoint",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    quote:
      "Patient records used to live in four different notebooks. Now a full history loads in one click while the patient is still talking.",
    name: "Meera Nair",
    role: "Clinic Manager, Lotus Dental",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
];

export const FOOTER_LINKS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Blog", "Partners"],
  },
  {
    title: "Support",
    links: ["Help center", "Documentation", "Status", "Contact support"],
  },
];
