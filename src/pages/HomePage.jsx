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
    <div className="flex min-h-screen flex-col bg-[#0B101B]">
      <main
        className="relative min-h-[calc(100vh-72px)]
      overflow-hidden bg-gray-900 text-white"
      >
        {/* Lightfall background: introduction only */}
        {isIntroduction && (
          <div
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          >
            <Lightfall
              colors={["#E70F0F"]}
              streakLength={1.6}
              headGlow={0.75}
              mouseRadius={0.5}
              bloom={0.3}
              backgroundGlow={0}
            />
          </div>
        )}

        {/* Content stays above the background */}
        <div className="relative z-10">
          {/* Search bar remains visible in both states */}
          <div className={`px-4 ${isIntroduction ? "pt-8 sm:pt-12" : "pt-6"}`}>
            <SearchBar />
          </div>

          {isIntroduction ? (
            <>
              {/* Introduction */}
              <div
                className="flex min-h-[65vh] items-center
              justify-center py-12 sm:py-16"
              >
                <HeroText />
              </div>
              <Footer />
            </>
          ) : (
            /* Search results only after a query is submitted */
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
