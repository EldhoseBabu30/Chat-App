import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import AuthImagePattern from "../../components/AuthImagePattern";
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="relative flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-b from-white to-gray-50">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03]"></div>
        <div className="w-full max-w-md space-y-8 relative">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                <MessageSquare className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
              </div>
              <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-lg">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="form-control group">
              <label className="label">
                <span className="label-text font-medium text-gray-700 text-base group-focus-within:text-primary transition-colors">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-12 h-12 bg-white shadow-sm hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control group">
              <label className="label">
                <span className="label-text font-medium text-gray-700 text-base group-focus-within:text-primary transition-colors">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 h-12 bg-white shadow-sm hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary bg-blue-400 rounded-2xl text-white w-full h-12 text-lg font-semibold shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative">
              <p className="bg-gradient-to-b  from-white to-gray-50 inline-block px-4 text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary  hover:text-primary/80 font-medium hover:underline transition-colors"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default Login;