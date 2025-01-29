import { Link } from "react-router-dom";
import { LogOut, MessageSquare, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="size-9 rounded-lg bg-blue-500/10 flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5 text-blue-500" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Hola...!!!</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
          

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;