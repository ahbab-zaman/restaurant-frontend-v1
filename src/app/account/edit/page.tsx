"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuthUser, useUpdateMeMutation } from "@/lib/auth/auth.query";

const Edit = () => {
  const user = useAuthUser();
  const updateMeMutation = useUpdateMeMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user?.name, user?.email]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      return;
    }

    await updateMeMutation.mutateAsync({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm dark:shadow-black/20">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Edit Profile</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your name and email.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          disabled={updateMeMutation.isPending}
          className="inline-flex items-center justify-center rounded-lg bg-[#383736] text-white text-sm font-medium px-4 py-2 disabled:opacity-60"
        >
          {updateMeMutation.isPending ? "Updating..." : "Update Info"}
        </button>

        {updateMeMutation.isSuccess ? (
          <p className="text-sm text-green-600 dark:text-green-400">Profile updated successfully.</p>
        ) : null}

        {updateMeMutation.error ? (
          <p className="text-sm text-red-600 dark:text-red-400">{updateMeMutation.error.message}</p>
        ) : null}
      </form>
    </div>
  );
};

export default Edit;
