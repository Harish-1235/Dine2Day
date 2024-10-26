import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Mail, AlertCircle, Lock, User, ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const validatePassword = (pass: string) => {
    const errors = [];
    if (pass.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(pass)) errors.push("At least one uppercase letter");
    if (!/\d/.test(pass)) errors.push("At least one number");
    setPasswordErrors(errors);
    setIsPasswordValid(errors.length === 0);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordValid) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-black">
      {/* Background Food Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-400 rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-green-400 rounded-full translate-y-1/2" />
      </div>

      <div className="max-w-md w-full mx-4 relative">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=80&h=80&q=80" 
                alt="Food" 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-indigo-200">Sign in to discover the best food deals</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-2">
                Email address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full bg-white/10 border border-indigo-300/30 rounded-lg py-3 text-white placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-indigo-100 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-10 w-full bg-white/10 border border-indigo-300/30 rounded-lg py-3 text-white placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                />
              </div>
              {passwordErrors.length > 0 && (
                <div className="mt-2 text-sm text-pink-200">
                  <AlertCircle className="inline-block mr-1" size={16} />
                  Password must have:
                  <ul className="list-disc list-inside mt-1">
                    {passwordErrors.map((error, index) => (
                      <li key={index} className="text-pink-200">{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-indigo-100">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-indigo-200 hover:text-white transition duration-200">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition duration-200 ${
                isPasswordValid
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  : 'bg-indigo-400/50 text-indigo-200 cursor-not-allowed'
              }`}
              disabled={!isPasswordValid}
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-indigo-300/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-indigo-200">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2.5 px-4 rounded-lg border border-indigo-300/30 bg-white/5 hover:bg-white/10 transition duration-200">
                <Facebook className="h-5 w-5 text-indigo-200" />
                <span className="ml-2 text-sm font-medium text-indigo-200">Facebook</span>
              </button>
              <button className="flex items-center justify-center py-2.5 px-4 rounded-lg border border-indigo-300/30 bg-white/5 hover:bg-white/10 transition duration-200">
                <Mail className="h-5 w-5 text-indigo-200" />
                <span className="ml-2 text-sm font-medium text-indigo-200">Google</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-indigo-200">
            Not a member?{' '}
            <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-200">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;