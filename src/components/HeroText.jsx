const HeroText = () => {
  const handleExplore = () => {
    const searchInput = document.getElementById("visual-wall-search");

    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section
      className="mx-auto flex w-full max-w-3xl flex-col
      items-center px-5 text-center"
    >
      <h1
        className="text-4xl font-semibold leading-[1.12]
        tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        Redefine Your <span className="font-extrabold">Digital Space.</span>
      </h1>

      <p
        className="mt-5 max-w-xl text-sm leading-7
        text-white/65 sm:text-base sm:leading-8"
      >
        Discover visuals that inspire, express your personality, and make every
        screen unforgettable.
      </p>

      <button
        type="button"
        onClick={handleExplore}
        className="mt-8 inline-flex items-center gap-3
          rounded-full border border-white/15
          bg-white px-6 py-3 text-sm font-semibold
          text-black shadow-lg
          transition-all duration-300
          hover:-translate-y-0.5 hover:bg-white/90
          active:scale-95"
      >
        Start Exploring
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </button>
    </section>
  );
};

export default HeroText;
