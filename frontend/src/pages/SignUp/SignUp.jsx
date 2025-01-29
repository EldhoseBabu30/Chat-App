import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";


import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import AuthImagePattern from "../../components/AuthImagePattern";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 sm:p-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-8">
        <div className="text-center">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all shadow-md">
              <MessageSquare className="size-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-3">Create Account</h1>
            <p className="text-gray-500">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 size-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary shadow-sm"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 size-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary shadow-sm"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 size-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary shadow-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-100 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5 text-gray-400" /> : <Eye className="size-5 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-400 font-semibold bg-primary rounded-lg hover:bg-primary/90 transition shadow-md flex justify-center items-center"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin mr-2" /> Signing Up...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center text-gray-500">
          <p>
            Already have an account? 
            <Link to="/login" className="text-primary font-medium hover:underline"> Sign in</Link>
          </p>
        </div>
      </div>
    </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUp;
