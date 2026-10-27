import { Link, useLocation } from "react-router-dom";

import TechText from "./TechText";
import CodeXmlIcon from "./ui/code-xml-icon";

const TopText = () => {
  const location = useLocation();

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;

    return `inline-flex shrink-0 items-center justify-center rounded-lg px-3 py-2
      text-sm font-semibold transition-colors duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3E9D2]
      active:scale-95 ${
        isActive
          ? "bg-[#F3E9D2] text-[#164E43]"
          : "bg-white/10 text-white hover:bg-white/20"
      }`;
  };

  return (
    <header className="w-full bg-[#164E43] text-white shadow-md">
      <div className="grid h-23 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Left: Code icon */}
        <Link
          to="/"
          aria-label="Screen Art home"
          className="flex items-center justify-center rounded-lg p-1 text-[#DAF1ED] transition-colors hover:bg-white/10"
        >
          <CodeXmlIcon className="h-8 w-8 sm:h-9 sm:w-12" />
        </Link>

        {/* Center: Animated title */}
        <div className="flex h-full min-w-0 items-center justify-center overflow-hidden">
          <TechText
            text="Screen Art"
            fontSize={100}
            color="#DAF1ED"
            accentColor="#DAF1ED"
            sweep={true}
            labels={false}
            selection={false}
            draggable={false}
            clickKick={false}
            className="h-12 w-full max-w-130 bg-transparent"
          />
        </div>

        {/* Right: Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-end gap-2"
        >
          <Link to="/" className={navLinkClass("/")}>
            Search
          </Link>

          <Link to="/collection" className={navLinkClass("/collection")}>
            Collection
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default TopText;
