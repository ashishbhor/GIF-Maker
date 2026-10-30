import { Link } from "react-router-dom";
import {
  Image,
  Video,
  Film,
  Download,
  Heart,
  Search,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

function AboutPage() {
  const features = [
    {
      icon: Image,
      title: "Discover Photos",
      description:
        "Explore photography, creative visuals and beautiful images for your inspiration.",
    },
    {
      icon: Video,
      title: "Explore Videos",
      description:
        "Find engaging videos and visual content for your creative projects.",
    },
    {
      icon: Film,
      title: "Find GIFs",
      description:
        "Discover expressive GIFs and animated content for every mood.",
    },
    {
      icon: Download,
      title: "Save Your Favorites",
      description:
        "Access available download options and save content according to the original provider's terms.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B101B] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="mb-14">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs text-violet-300">
            <Sparkles size={14} />
            ABOUT BHORBOX
          </span>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            One place.
            <span className="block text-violet-400">Endless inspiration.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            bhorBox is a visual discovery platform built for people who love
            photography, wallpapers, videos and GIFs. We bring different kinds
            of visual content together to make discovering your next favorite
            image or animation easier.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold">What is bhorBox?</h2>

          <p className="leading-8 text-white/55">
            Finding the right visual content often means visiting multiple
            websites and switching between different platforms. bhorBox aims to
            make that discovery process simpler by providing a unified browsing
            experience for different types of visual media.
          </p>

          <p className="mt-4 leading-8 text-white/55">
            Whether you are looking for a beautiful background, a creative
            photograph, an inspiring video or a GIF to express yourself, bhorBox
            gives you one place to explore.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-7 text-2xl font-semibold">What you can explore</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/2.5 p-6 transition hover:border-violet-400/30"
                >
                  <Icon size={23} className="mb-5 text-violet-400" />

                  <h3 className="mb-2 font-semibold">{feature.title}</h3>

                  <p className="text-sm leading-7 text-white/45">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold">Our approach</h2>

          <p className="leading-8 text-white/55">
            bhorBox focuses on making visual discovery simple, organized and
            enjoyable. We do not claim ownership of third-party photographs,
            videos or GIFs displayed through external content providers. Their
            respective creators and rights holders retain their applicable
            rights.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/25 p-7">
          <Search className="mb-4 text-violet-400" size={25} />

          <h2 className="text-xl font-semibold">Explore something new.</h2>

          <p className="mt-2 text-sm leading-7 text-white/50">
            Your next favorite visual might be just one search away.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-violet-200"
          >
            Explore bhorBox
            <Heart size={15} />
          </Link>
        </section>

        <p className="mt-12 text-center text-xs text-white/30">
          © 2026 bhorBox. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default AboutPage;
