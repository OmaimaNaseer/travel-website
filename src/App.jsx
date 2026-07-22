import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, ChevronDown, MapPin, Calendar, Search, Star, Heart, Users,
  Shield, Headphones, Globe, Send, MessageCircle, X, Info, Mail,
  CreditCard, CheckCircle, ArrowLeft, ArrowRight, Check, Menu,
  Phone, Clock3, BadgeCheck,
} from "lucide-react";

/**
 * ALI Travelers — Homepage
 * React.js + Tailwind CSS + JavaScript + Framer Motion
 */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Tours", href: "#tours" },
  { label: "Dashboard", href: "#dashboard", staffOnly: true },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const POPULAR_SEARCHES = ["Hunza Valley", "Skardu", "Fairy Meadows", "Lahore"];

const STATS = [
  { value: "8,500+", label: "Happy Travelers" },
  { value: "25+", label: "Pakistani Destinations" },
  { value: "4.9 ★", label: "Average Rating" },
  { value: "24/7", label: "On-Trip Support" },
];

const DESTINATIONS = [
  { name: "Hunza Valley", region: "Gilgit-Baltistan", tours: 34, image: "https://tse3.mm.bing.net/th/id/OIP.s5Gc6y63XHJTQzox1IJ5HQHaHU?r=0&pid=Api&h=220&P=0p" },
  { name: "Skardu", region: "Gilgit-Baltistan", tours: 28, image: "https://tse1.mm.bing.net/th/id/OIP.5-86GcMqzNzf3AQ2Sv5PYQHaDN?r=0&pid=Api&h=220&P=0" },
  { name: "Lahore", region: "Punjab", tours: 41, image: "https://tse3.mm.bing.net/th/id/OIP.8GwWN5foNJwqVJzikvEGugHaEK?r=0&pid=Api&h=220&P=0" },
  { name: "Swat Valley", region: "Khyber Pakhtunkhwa", tours: 22, image: "https://tse1.mm.bing.net/th/id/OIP.PzY0HXnCWLUTbzLhlCWkiQHaFj?r=0&pid=Api&h=220&P=0" },
  { name: "Fairy Meadows", region: "Gilgit-Baltistan", tours: 19, image: "https://tse3.mm.bing.net/th/id/OIP.tk2r0IQs9Psh-t_3d5A6mQHaDt?r=0&pid=Api&h=220&P=0" },
  { name: "Mohenjo-daro", region: "Sindh", tours: 14, image: "https://tse2.mm.bing.net/th/id/OIP.Wc1JuvZwm5Ua4TpVYmcZ3gHaE7?r=0&pid=Api&h=220&P=0" },
];

const TOURS = {
  "hunza-explorer": {
    name: "Hunza & Karimabad Explorer", location: "Hunza Valley", duration: "7 days",
    tags: ["Mountains", "Culture"], rating: 4.9, reviews: 412, price: 85000, originalPrice: 105000,
    badge: { text: "19% OFF", tone: "emerald" },
    image: "https://tse1.mm.bing.net/th/id/OIP.ww6Z5wN35IH0IpK1EqPzhgHaE7?r=0&pid=Api&h=220&P=0",
    included: ["7 nights accommodation", "Daily guided tours", "All meals included", "Airport transfers", "Travel insurance"],
  },
  "k2-base-camp": {
    name: "K2 Base Camp Trek", location: "Skardu", duration: "14 days",
    tags: ["Trekking", "Adventure"], rating: 4.9, reviews: 187, price: 195000, originalPrice: null,
    badge: { text: "BESTSELLER", tone: "dark" },
    image: "https://tse4.mm.bing.net/th/id/OIP.Gm8LqjKHQEzr4He5vUpKzQHaHa?r=0&pid=Api&h=220&P=0",
    included: ["13 nights camping + 1 hotel", "All meals on trek", "Porters & pack animals", "Certified high-altitude guide", "Emergency oxygen & first aid"],
  },
  "lahore-heritage": {
    name: "Lahore Heritage Circuit", location: "Lahore", duration: "4 days",
    tags: ["Heritage", "Food"], rating: 4.8, reviews: 634, price: 45000, originalPrice: null,
    badge: null,
    image: "https://tse4.mm.bing.net/th/id/OIP.u7sLFF-koZD7B7-af9Mg3AHaGn?r=0&pid=Api&h=220&P=0",
    included: ["4 nights hotel", "Daily heritage tours", "All meals", "Expert guide", "Transport included"],
  },
  "fairy-meadows": {
    name: "Fairy Meadows & Nanga Parbat", location: "Fairy Meadows", duration: "5 days",
    tags: ["Camping", "Mountains"], rating: 4.8, reviews: 298, price: 62000, originalPrice: 78000,
    badge: { text: "20% OFF", tone: "emerald" },
    image: "https://tse2.mm.bing.net/th/id/OIP.fVJxhU64UTy8DZCy5DX4wwHaEc?r=0&pid=Api&h=220&P=0",
    included: ["5 nights camping", "All meals on trek", "Guide & porter", "Base camp access", "Photography kit"],
  },
};

const WHY_CHOOSE_US = [
  { icon: Users, title: "Local Pakistani Experts", body: "Born and raised in the regions we explore — our guides bring deep local knowledge, cultural insight, and unmatched safety expertise." },
  { icon: Shield, title: "Best Price Guarantee", body: "We match any comparable package price, or refund the difference within 48 hours. Transparent pricing, no hidden fees." },
  { icon: Headphones, title: "24/7 On-Trip Support", body: "A dedicated team reachable around the clock throughout your journey — because mountains do not wait for business hours." },
];

const TRUST_BADGES = [
  { icon: Shield, label: "Secure Payments" },
  { icon: Shield, label: "Verified Operators" },
  { icon: Headphones, label: "Free Cancellation" },
  { icon: Compass, label: "25+ Destinations" },
];

const TESTIMONIALS = [
  { initials: "FA", name: "Fatima A.", location: "Karachi, Pakistan", quote: "ALI Travelers made our Hunza trip absolutely magical. The guide knew every hidden viewpoint and the homestay family fed us like royalty. Booking Skardu next year!" },
  { initials: "OS", name: "Omar S.", location: "Lahore, Pakistan", quote: "The K2 Base Camp trek was the hardest and most rewarding thing I have ever done. The team handled every logistics detail so I could just walk and enjoy the views." },
  { initials: "ZK", name: "Zara K.", location: "Islamabad, Pakistan", quote: "Lahore Heritage Circuit exceeded all expectations. The guide's knowledge of Mughal history was incredible, and the food street evenings were absolutely unforgettable." },
];

const FOOTER_COLUMNS = [
  { title: "Explore", links: ["Home", "Destinations", "Tours", "About", "Blog"] },
  { title: "Pakistan", links: ["Gilgit-Baltistan", "Punjab", "KPK", "Sindh", "Balochistan"] },
  { title: "Support", links: ["Help Center", "Booking FAQ", "Cancellation Policy", "Travel Insurance", "Contact Us"] },
];

const CONTACT_DETAILS = [
  { icon: Phone, label: "Call Us", value: "+92 300 1234567", href: "tel:+923001234567" },
  { icon: Mail, label: "Email", value: "info@alitravelers.pk", href: "mailto:info@alitravelers.pk" },
  { icon: MapPin, label: "Visit Us", value: "Islamabad, Pakistan", href: "https://maps.google.com/?q=Islamabad+Pakistan" },
];

const SOCIAL_LINKS = [
  { icon: Globe, label: "Website", href: "https://alitravelers.pk" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/923001234567?text=Hello%20ALI%20Travelers%2C%20I%20would%20like%20to%20book%20a%20tour." },
  { icon: Send, label: "Instagram", href: "https://instagram.com" },
  { icon: Mail, label: "Facebook", href: "https://facebook.com" },
  { icon: Phone, label: "LinkedIn", href: "https://linkedin.com" },
];

const formatPKR = (n) => `Rs.${n.toLocaleString()}`;

function Header({ userRole, onRoleChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const canViewDashboard = userRole === "management" || userRole === "developer";
  const visibleLinks = NAV_LINKS.filter((link) => !link.staffOnly || canViewDashboard);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Compass className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold text-slate-900">
            ALI <span className="font-normal text-slate-700">Travelers</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {visibleLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-slate-700 transition hover:text-emerald-600">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <label className="flex items-center gap-2 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <span className="uppercase tracking-wide">View as</span>
            <select value={userRole} onChange={(e) => onRoleChange(e.target.value)} className="bg-transparent text-sm font-semibold text-slate-800 outline-none">
              <option value="user">User</option>
              <option value="management">Management</option>
              <option value="developer">Developer</option>
            </select>
          </label>
          <button className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
            PKR Rs. <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <a href="#signin" className="text-sm font-medium text-slate-700 hover:text-emerald-600">Sign In</a>
          <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:bg-emerald-800">
            Book Now <span aria-hidden="true">→</span>
          </button>
        </div>

        <button onClick={() => setMobileOpen((v) => !v)} className="text-slate-700 md:hidden" aria-label="Toggle menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-100 px-4 md:hidden"
          >
            <div className="pb-4">
              {visibleLinks.map((link) => (
                <a key={link.label} href={link.href} className="block py-2 text-sm font-medium text-slate-700">
                  {link.label}
                </a>
              ))}
              <button className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                Book Now →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const heroImages = [
    "https://tse4.mm.bing.net/th/id/OIP.Gm8LqjKHQEzr4He5vUpKzQHaHa?r=0&pid=Api&h=220&P=0",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrTl0mJRjkyuKUX2kqtIsHzPJquQ7gb_h4Of30XlMWFw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7vhSTAY92BaVdNXab6xKgELmNJ6uvtMnsPgxjbC-pg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGXmFnC7k-4ixFr0HskAJLBW2Jy5z0RfiU957SfYnErA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5StFQXzCoH1n21zulX5Tk4wzh8Wo__WjirWRiqZSaA&s=10"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section id="home" className="relative overflow-hidden bg-slate-500 text-white">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentImageIndex}
          src={heroImages[currentImageIndex]}
          alt="Snow-capped peaks in Northern Pakistan"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-5xl px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8"
      >
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 ring-1 ring-emerald-200">
          PAKISTAN'S PREMIER TRAVEL PARTNER
        </span>

        <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
          Explore Pakistan<br />
          <span className="text-emerald-400">Like Never Before</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-200 sm:text-lg">
          From K2 base camps to Mughal heritage cities — expert-guided tours across Pakistan's most breathtaking destinations.
        </p>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-4 text-left shadow-xl sm:p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
            <label className="block">
              <span className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <MapPin className="h-3 w-3" /> Destination
              </span>
              <input type="text" placeholder="Hunza, Skardu, Lahore..." className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">Check-in</span>
              <input type="date" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">Check-out</span>
              <input type="date" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </label>
            <button className="sm:mt-[22px] inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
              <Search className="h-4 w-4" /> Search Tours
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 text-sm">
            <span className="text-slate-500">Popular:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button key={term} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-emerald-400 hover:text-emerald-600">
                {term}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
function StatsBar() {
  return (
    <section className="bg-slate-900 pb-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl font-extrabold text-emerald-400 sm:text-4xl">{stat.value}</div>
            <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DestinationCard({ destination }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group relative h-72 overflow-hidden rounded-2xl shadow-sm">
      <img src={destination.image} alt={destination.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="mb-2 inline-flex items-center rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-semibold">
          {destination.tours} tours available
        </div>
        <h3 className="text-xl font-bold">{destination.name}</h3>
        <p className="text-sm text-slate-200">{destination.region}</p>
      </div>
    </motion.div>
  );
}

function Destinations() {
  return (
    <section id="destinations" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Discover Pakistan</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Featured Destinations</h2>
          </div>
          <a href="#all-destinations" className="hidden text-sm font-semibold text-emerald-600 hover:text-emerald-700 sm:flex sm:items-center sm:gap-1">
            View All <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((destination) => (
            <DestinationCard key={destination.name} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TourCard({ tourKey, tour, onBook }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full">
        <img src={tour.image} alt={tour.name} className="h-full w-full object-cover" />
        {tour.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white ${tour.badge.tone === "dark" ? "bg-slate-900" : "bg-emerald-500"}`}>
            {tour.badge.text}
          </span>
        )}
        <button aria-label="Save to favorites" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 hover:text-rose-500">
          <Heart className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {tour.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{tag}</span>
          ))}
        </div>
        <h3 className="text-base font-bold text-slate-900">{tour.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3 w-3" /> {tour.location}
          <span className="mx-1">·</span>
          <Calendar className="h-3 w-3" /> {tour.duration}
        </p>
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-600">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-slate-800">{tour.rating}</span>
          <span>({tour.reviews})</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            {tour.originalPrice && <div className="text-xs text-slate-400 line-through">{formatPKR(tour.originalPrice)}</div>}
            <div className="text-lg font-extrabold text-slate-900">{formatPKR(tour.price)}</div>
            <div className="text-[11px] text-slate-500">per person</div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Details</button>
          <button onClick={() => onBook(tourKey)} className="flex-1 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">Book Now</button>
        </div>
      </div>
    </div>
  );
}

function Tours({ onBook }) {
  return (
    <section id="tours" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Curated Experiences</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Popular Tours</h2>
          </div>
          <a href="#all-tours" className="hidden text-sm font-semibold text-emerald-600 hover:text-emerald-700 sm:flex sm:items-center sm:gap-1">
            Browse All <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(TOURS).map(([key, tour]) => (
            <TourCard key={key} tourKey={key} tour={tour} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Why Travel With Us</p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">The ALI Travelers Difference</h2>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {WHY_CHOOSE_US.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-slate-100 pt-8 text-sm text-slate-600">
          {TRUST_BADGES.map((badge) => (
            <span key={badge.label} className="flex items-center gap-2">
              <badge.icon className="h-4 w-4 text-emerald-600" /> {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Traveler Stories</p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">What Our Guests Say</h2>

        <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl bg-slate-800/60 p-6 ring-1 ring-white/5">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-200">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">{t.initials}</span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-emerald-700 py-16 text-center text-white">
      <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1600&auto=format&fit=crop" alt="Clouds over Fairy Meadows" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-center">
        <button className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow hover:bg-emerald-50">
          Browse All Tours <span aria-hidden="true">→</span>
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-white/70 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
          <Mail className="h-4 w-4" /> Contact Us
        </button>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Contact Page</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">We’re here to help plan your next journey</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Full Name</span>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="Your name" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="your@email.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" required />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Phone Number</span>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} type="tel" placeholder="+92 ..." className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Your Message</span>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Tell us about your trip preferences..." className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" required />
              </label>
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>

            {submitted && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                Thanks! Your message has been received. Our travel team will contact you shortly.
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
              <h3 className="text-xl font-semibold">Quick Connect</h3>
              <div className="mt-5 space-y-3">
                {CONTACT_DETAILS.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/70 px-3 py-3 text-sm text-slate-200 hover:border-emerald-500">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-slate-400">{item.label}</span>
                      <span className="font-medium text-white">{item.value}</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-emerald-500 hover:text-emerald-400">
                    <link.icon className="h-4 w-4" /> {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps?q=Islamabad%20Pakistan&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingStatusSection({ bookings }) {
  if (!bookings.length) return null;

  return (
    <section className="border-t border-slate-100 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Booking Tracking</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">Your recent booking requests</h2>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            {bookings.length} active request{bookings.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{booking.tourName}</h3>
                  <p className="mt-1 text-sm text-slate-600">{booking.seats} seat{booking.seats > 1 ? "s" : ""} • {booking.paymentMethod}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {booking.status}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <Clock3 className="h-4 w-4 text-emerald-600" /> Estimated confirmation within 24 hours
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <BadgeCheck className="h-4 w-4 text-emerald-600" /> Submitted on {booking.submittedAt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardSection({ bookings, onUpdateBookingStatus }) {
  const stats = useMemo(() => {
    const pending = bookings.filter((booking) => booking.status === "Pending").length;
    const confirmed = bookings.filter((booking) => booking.status === "Confirmed").length;
    const cancelled = bookings.filter((booking) => booking.status === "Cancelled").length;
    const revenue = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);

    return {
      pending,
      confirmed,
      cancelled,
      revenue,
      totalTours: Object.keys(TOURS).length,
    };
  }, [bookings]);

  return (
    <section id="dashboard" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Dashboard Module</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Admin overview for tours, bookings, and payments</h2>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
            Live management panel
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-slate-800/70 p-6 ring-1 ring-white/10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-700/70 p-4">
                <p className="text-sm text-slate-400">Total Tours</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.totalTours}</p>
              </div>
              <div className="rounded-2xl bg-slate-700/70 p-4">
                <p className="text-sm text-slate-400">Pending Requests</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.pending}</p>
              </div>
              <div className="rounded-2xl bg-slate-700/70 p-4">
                <p className="text-sm text-slate-400">Confirmed Bookings</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.confirmed}</p>
              </div>
              <div className="rounded-2xl bg-slate-700/70 p-4">
                <p className="text-sm text-slate-400">Revenue Preview</p>
                <p className="mt-2 text-3xl font-bold text-white">{formatPKR(stats.revenue)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Booking management</h3>
                <p className="text-sm text-slate-500">Approve, confirm, or cancel requests from one place.</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                {bookings.length} request{bookings.length === 1 ? "" : "s"}
              </span>
            </div>

            {bookings.length ? (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{booking.tourName}</p>
                        <p className="mt-1 text-sm text-slate-600">{booking.fullName || "Traveler"} • {booking.seats} seat{booking.seats > 1 ? "s" : ""}</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button onClick={() => onUpdateBookingStatus(booking.id, "Confirmed")} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Approve</button>
                      <button onClick={() => onUpdateBookingStatus(booking.id, "Cancelled")} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                No booking requests yet. New bookings will appear here automatically.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-white">ALI <span className="font-normal text-slate-300">Travelers</span></span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">Pakistan's trusted travel partner — crafting extraordinary journeys since 2018.</p>
          <div className="mt-4 flex gap-3">
            {[Globe, Send, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-emerald-600 hover:text-white">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link}><a href="#" className="text-slate-400 hover:text-white">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2025 ALI Travelers. All rights reserved. | Registered in Pakistan</p>
          <div className="flex gap-2">
            {["JazzCash", "EasyPaisa", "VISA", "Mastercard"].map((m) => (
              <span key={m} className="rounded-md border border-slate-700 px-2.5 py-1 text-[10px] font-semibold">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const TABS = [
  { key: "details", label: "1 Details", icon: Info },
  { key: "contact", label: "2 Contact", icon: Mail },
  { key: "payment", label: "3 Payment", icon: CreditCard },
];

function BookingModal({ tourKey, onClose, onBookingSubmit }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [travelers, setTravelers] = useState(2);
  const [departureDate, setDepartureDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("JazzCash / EasyPaisa");
  const tour = tourKey ? TOURS[tourKey] : null;
  const total = useMemo(() => (tour ? tour.price * travelers : 0), [tour, travelers]);

  if (!tour) return null;

  const isLastTab = tabIndex === TABS.length - 1;
  const isFirstTab = tabIndex === 0;

  const handleSubmit = () => {
    onBookingSubmit({
      id: Date.now(),
      tourName: tour.name,
      tourKey,
      seats: travelers,
      departureDate,
      paymentMethod,
      fullName,
      email,
      phone,
      specialRequests,
      amount: total,
      submittedAt: new Date().toLocaleDateString(),
      status: "Pending",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.18 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white"
        >
          <button onClick={onClose} className="absolute right-4 top-4 z-10 text-slate-500 hover:text-slate-700" aria-label="Close booking dialog">
            <X className="h-5 w-5" />
          </button>

          <div className="p-6">
            <div className="mb-6 flex gap-4">
              <img src={tour.image} alt={tour.name} className="h-32 w-32 rounded-lg object-cover" loading="lazy" />
              <div className="flex-1">
                <span className="mb-2 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">BOOK TOUR</span>
                <h2 className="text-2xl font-bold text-slate-900">{tour.name}</h2>
                <p className="mt-1 text-slate-600">{tour.location}</p>
                <p className="text-slate-600">{tour.duration}</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{formatPKR(tour.price)}</p>
              </div>
            </div>

            <div className="mb-6 flex gap-4 border-b border-slate-200">
              {TABS.map((tab, index) => (
                <button
                  key={tab.key}
                  onClick={() => setTabIndex(index)}
                  className={`flex items-center gap-2 border-b-2 px-4 py-3 font-semibold transition ${
                    index === tabIndex
                      ? "border-emerald-600 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  <tab.icon className="h-4 w-4" /> {tab.label}
                </button>
              ))}
            </div>

            {tabIndex === 0 && (
              <div>
                <div className="mb-6">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-slate-700">
                      <Calendar className="h-4 w-4" /> DEPARTURE DATE
                    </span>
                    <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  </label>
                </div>

                <div className="mb-6">
                  <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-slate-700">
                    <Users className="h-4 w-4" /> TRAVELERS
                  </span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setTravelers((v) => Math.max(1, v - 1))} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">-</button>
                    <input type="number" value={travelers} min={1} onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value, 10) || 1))} className="w-16 rounded-lg border border-slate-200 px-3 py-2 text-center" />
                    <button onClick={() => setTravelers((v) => v + 1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">+</button>
                    <span className="text-slate-600">persons</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-700">
                    <CheckCircle className="h-4 w-4 text-emerald-600" /> INCLUDED
                  </h4>
                  <ul className="space-y-2">
                    {tour.included.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tabIndex === 1 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Full Name</span>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Your full name" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email Address</span>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your.email@example.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Phone Number</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+92 ..." className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Special Requests</span>
                  <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Tell us about any special requests or dietary requirements..." rows={4} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </label>
              </div>
            )}

            {tabIndex === 2 && (
              <div>
                <div className="mb-6 rounded-lg bg-slate-50 p-4">
                  <div className="mb-2 flex justify-between">
                    <span className="text-slate-600">Tour Price (per person):</span>
                    <span className="font-semibold">{formatPKR(tour.price)}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-slate-600">Number of Travelers:</span>
                    <span className="font-semibold">{travelers}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-slate-200 pt-2">
                    <span className="font-bold text-slate-900">Total:</span>
                    <span className="text-xl font-extrabold text-emerald-600">{formatPKR(total)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Credit / Debit Card", "JazzCash / EasyPaisa", "Bank Transfer", "Pay at Pickup"].map((method) => (
                        <label key={method} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 p-3 hover:border-emerald-500">
                          <input type="radio" name="paymentMethod" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="text-emerald-600 focus:ring-emerald-500" />
                          <span className="text-sm font-medium text-slate-800">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Card Number / Account ID</span>
                    <input type="text" placeholder="XXXX - XXXX - XXXX - XXXX" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  </label>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
              <button
                onClick={() => setTabIndex((v) => Math.max(0, v - 1))}
                disabled={isFirstTab}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {isLastTab ? (
                <button onClick={handleSubmit} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                  Confirm Booking ({formatPKR(total)})
                </button>
              ) : (
                <button onClick={() => setTabIndex((v) => Math.min(TABS.length - 1, v + 1))} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [userRole, setUserRole] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tourRole") || "user";
    }
    return "user";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tourRole", userRole);
    }
  }, [userRole]);

  const handleBookingSubmit = (booking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  const handleUpdateBookingStatus = (id, status) => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
  };

  const canViewDashboard = userRole === "management" || userRole === "developer";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <Header userRole={userRole} onRoleChange={setUserRole} />
      <main>
        <Hero />
        <StatsBar />
        <Destinations />
        <Tours onBook={(key) => setSelectedTour(key)} />
        <BookingStatusSection bookings={bookings} />
        {canViewDashboard && <DashboardSection bookings={bookings} onUpdateBookingStatus={handleUpdateBookingStatus} />}
        <WhyChooseUs />
        <Testimonials />
        <ContactSection />
        <CTABanner />
      </main>
      <Footer />

      {selectedTour && (
        <BookingModal tourKey={selectedTour} onClose={() => setSelectedTour(null)} onBookingSubmit={handleBookingSubmit} />
      )}
    </div>
  );
}