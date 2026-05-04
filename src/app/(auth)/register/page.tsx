"use client";

import { Eye } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
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
            <p className="text-sm text-gray-500 mt-1">Start your account setup</p>
          </div>

          <form className="space-y-5 auth-autofill-scope">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  First Name
                </label>
                <input
                  placeholder="First Name"
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  placeholder="Last Name"
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
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
                className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Phone
              </label>
              <input
                type="text"
                placeholder="+973 XXXX XXXX"
                className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                />
                <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <Eye size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <button
              type="button"
              className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
