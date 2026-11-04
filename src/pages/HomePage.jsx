import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import HeroText from "../components/HeroText";
import Tabs from "../components/Tabs";
import ResultGride from "../components/ResultGride";
import Lightfall from "../components/Lightfall";
import Footer from "@/components/Footer";

const HomePage = () => {
  const query = useSelector((state) => state.search.query);
  const isIntroduction = !query?.trim();

  return (
    <div
      className={`w-full bg-[#0B101B] text-white ${
        isIntroduction
          ? "h-[calc(100dvh-72px)] overflow-hidden"
          : "min-h-[calc(100vh-72px)]"
      }`}
    >
      <main
        className={`relative w-full bg-gray-900 ${
          isIntroduction
            ? "h-full overflow-hidden"
            : "min-h-full overflow-visible"
        }`}
      >
        {/* Lightfall background - introduction only */}
        {isIntroduction && (
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
          >
            <Lightfall
              colors={["#E70F0F"]}
              streakLength={1.6}
              headGlow={0.75}
              mouseRadius={0.5}
              bloom={0.3}
              backgroundGlow={0}
              className="h-full w-full"
            />
          </div>
        )}

        <div
          className={`relative z-10 ${
            isIntroduction ? "flex h-full flex-col" : ""
          }`}
        >
          {/* Search */}
          <div className="shrink-0 px-4 pt-6 sm:pt-8">
            <SearchBar />
          </div>

          {isIntroduction ? (
            <>
              {/* Hero */}
              <section className="flex min-h-0 flex-1 items-center justify-center px-4">
                <HeroText />
              </section>

              {/* Footer */}
              <div className="shrink-0 pb-4">
                <Footer />
              </div>
            </>
          ) : (
            /* Search Results */
            <section className="pt-5">
              <Tabs />
              <ResultGride />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
