"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/lib/auth/auth.query";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = `${firstName} ${lastName}`.trim();
    try {
      await registerMutation.mutateAsync({
        name,
        email,
        password,
        confirmPassword,
      });
      router.push("/account");
    } catch {
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-6">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 p-10">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl mb-8">
            <Link
              href="/login"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 dark:text-gray-400 text-center"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              aria-current="page"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-gray-700 shadow-sm text-center"
            >
              Create Account
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Create account
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Start your account setup
            </p>
          </div>

          <form
            className="space-y-5 auth-autofill-scope"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  First Name
                </label>
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {registerMutation.isPending
                ? "Creating account..."
                : "Create Account"}
            </button>
            {registerMutation.error ? (
              <p className="text-sm text-red-500">
                {registerMutation.error.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
