import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const cartCount = getTotalItems();

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background-light backdrop-blur-xs">
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
          <div className="hidden md:flex relative group">
            <span className="absolute left-3 top-1.5 text-gray-400 material-icons-outlined text-lg">
              search
            </span>

            <input
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400 text-gray-800 border-none"
              placeholder="What are you looking for today..."
              type="text"
            />
          </div>

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <button className="w-10 h-10 fcc hover:bg-gray-100 rounded-full">
                  <span className="material-icons-outlined">
                    person_outline
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.phone}</p>
                  </div>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="w-10 h-10 fcc hover:bg-gray-100 rounded-full"
            >
              <span className="material-icons-outlined">person_outline</span>
            </Link>
          )}

          <Link
            to="/checkout"
            className="relative w-10 h-10 fcc hover:bg-gray-100 rounded-full"
          >
            <span className="material-icons-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
