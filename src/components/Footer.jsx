import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mt-auto flex w-full items-center justify-center">
      <footer className="flex w-full flex-col items-center justify-center gap-2 px-4 py-6 text-center text-xs text-white/45">
        <span>© 2026 bhorBox. All rights reserved.</span>

        <nav className="flex items-center justify-center gap-5">
          <Link to="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>

          <Link to="/about" className="transition-colors hover:text-white">
            About
          </Link>

          <Link to="/credits" className="transition-colors hover:text-white">
            Credits
          </Link>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
