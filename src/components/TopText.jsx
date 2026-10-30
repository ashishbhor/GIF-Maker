import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/Features/searchSlice";
import TechText from "./TechText";

const TopText = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(setQuery(""));
  };

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;

    return [
      "inline-flex shrink-0 items-center justify-center",
      "rounded-full px-4 py-2",
      "text-xs sm:text-sm font-medium whitespace-nowrap",
      "transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
      isActive
        ? "bg-white/15 text-white shadow-inner"
        : "bg-transparent text-white/65 hover:bg-white/10 hover:text-white",
    ].join(" ");
  };

  return (
    <header className="relative z-20 w-full bg-gray-900 text-white ">
      <div className="mx-auto flex h-18 w-full items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
        <Link
          to="/"
          onClick={handleHomeClick}
          aria-label="Visual Wall home"
          className="flex shrink-0 items-center"
        >
          <TechText
            text="Visual Wall"
            fontSize={34}
            color="#FFFFFF"
            accentColor="#FFFFFF"
            sweep={true}
            labels={false}
            selection={false}
            draggable={false}
            clickKick={false}
            className="h-10 w-36.25 bg-transparent sm:w-41.25"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1"
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
