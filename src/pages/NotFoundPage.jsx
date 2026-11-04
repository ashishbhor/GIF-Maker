import { Link } from "react-router-dom";

const floatingCards = [
  {
    emoji: "🌌",
    label: "WALLPAPERS",
    position: "left-[8%] top-[18%]",
    rotate: "-rotate-12",
    delay: "delay-100",
  },
  {
    emoji: "🎬",
    label: "VIDEOS",
    position: "right-[9%] top-[22%]",
    rotate: "rotate-12",
    delay: "delay-300",
  },
  {
    emoji: "✨",
    label: "GIFS",
    position: "left-[16%] bottom-[17%]",
    rotate: "rotate-6",
    delay: "delay-500",
  },
  {
    emoji: "🪐",
    label: "CREATIVITY",
    position: "right-[15%] bottom-[14%]",
    rotate: "-rotate-6",
    delay: "delay-200",
  },
];

function NotFoundPage() {
  return (
    <main className="relative flex min-h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden bg-[#080B14] px-5 py-16 text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[55px_55px]" />
      </div>

      {/* Floating media labels */}
      {floatingCards.map((card) => (
        <div
          key={card.label}
          className={`absolute ${card.position} ${card.rotate} hidden animate-pulse rounded-2xl border border-white/10 bg-white/4 px-5 py-4 shadow-2xl backdrop-blur-xl sm:block ${card.delay}`}
        >
          <div className="mb-2 text-3xl">{card.emoji}</div>
          <p className="text-[9px] font-semibold tracking-[0.25em] text-white/40">
            {card.label}
          </p>
        </div>
      ))}

      {/* Main content */}
      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-[10px] font-semibold tracking-[0.25em] text-red-300">
            LOST IN THE DIGITAL SPACE
          </span>
        </div>

        {/* 404 typography */}
        <div className="relative">
          <h1 className="select-none text-[clamp(8rem,25vw,18rem)] font-black leading-[0.78] tracking-[-0.09em] text-transparent bg-clip-text bg-linear-to-b from-white via-white/80 to-white/10">
            404
          </h1>

          <div className="pointer-events-none absolute inset-0 -z-10 bg-red-500/20 blur-[80px]" />

          <span className="absolute -right-5 top-0 rotate-12 text-3xl sm:-right-10 sm:text-5xl">
            ✳
          </span>
        </div>

        <h2 className="mt-10 text-2xl font-bold tracking-tight sm:text-4xl">
          Looks like this frame is missing.
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          The page you're looking for has disappeared into the endless scroll.
          Let's get you back to something worth discovering.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#E70F0F] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(231,15,15,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_45px_rgba(231,15,15,0.4)]"
          >
            <span>Back to Visual Wall</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-full border border-white/10 bg-white/4 px-7 py-3.5 text-sm font-medium text-gray-300 backdrop-blur-lg transition-all duration-300 hover:border-white/25 hover:bg-white/10"
          >
            Go Back
          </button>
        </div>

        <div className="mt-16 flex items-center gap-3 text-[10px] font-medium tracking-[0.3em] text-white/25">
          <span className="h-px w-8 bg-white/15" />
          BREAK THE SCROLL. FIND YOUR VISUALS.
          <span className="h-px w-8 bg-white/15" />
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
