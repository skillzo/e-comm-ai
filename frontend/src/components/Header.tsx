import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-background-light  backdrop-blur-lg">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link className="text-sm font-medium hover:text-gray-600" to="/">
            Men
          </Link>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link
            className="text-2xl font-black tracking-tighter brand-font uppercase"
            to="/"
          >
            GYMSHARK
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative group ">
            <span className="absolute left-3 top-1.5 text-gray-400 material-icons-outlined text-lg">
              search
            </span>

            <input
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400 text-gray-800 border-none"
              placeholder="What are you looking for today..."
              type="text"
            />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <span className="material-icons-outlined">person_outline</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

