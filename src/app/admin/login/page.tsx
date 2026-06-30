"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login request error:", err);
      setError("A connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#070707] text-[#f5f5f5] p-6 relative overflow-hidden font-sans">
      {/* Ambient background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#ad9f82]/5 blur-[120px] pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-16 h-16 mb-4">
            <Image
              src="/images/logo_navbar.png"
              alt="CM Logo"
              fill
              className="object-contain filter invert"
            />
          </div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#ad9f82] uppercase mb-1">
            CM INTERIOR DESIGN
          </span>
          <h1 className="text-xl font-light font-serif tracking-widest text-[#f5f5f5] uppercase">
            ADMIN PORTAL
          </h1>
        </div>

        {/* Login Card Container */}
        <div className="bg-[#121212]/80 border border-white/5 backdrop-blur-xl p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-2 h-[1px] bg-[#ad9f82]" />
          <div className="absolute top-0 left-0 w-[1px] h-2 bg-[#ad9f82]" />
          <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-[#ad9f82]" />
          <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-[#ad9f82]" />

          <h2 className="text-sm font-semibold tracking-[0.15em] text-[#f5f5f5] uppercase mb-6 border-b border-white/5 pb-4">
            SECURE SIGN IN
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3.5 px-4 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-[#1c1c1c] border border-white/10 py-3.5 px-4 text-sm text-[#f5f5f5] placeholder:text-neutral-600 focus:outline-none focus:border-[#ad9f82] focus:ring-1 focus:ring-[#ad9f82]/30 transition-all rounded-none font-light"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-[#1c1c1c] border border-white/10 py-3.5 px-4 text-sm text-[#f5f5f5] placeholder:text-neutral-600 focus:outline-none focus:border-[#ad9f82] focus:ring-1 focus:ring-[#ad9f82]/30 transition-all rounded-none font-light"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ad9f82] text-[#070707] py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-none"
            >
              {loading ? "Authenticating..." : "LOGIN TO DASHBOARD"}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-[10px] tracking-widest text-neutral-500 hover:text-[#ad9f82] transition-colors decoration-none font-bold uppercase"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
