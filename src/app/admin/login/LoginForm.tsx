"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/auth-actions";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl bg-white/95 p-6 shadow-premium-lg sm:p-8">
      <div>
        <label htmlFor="username" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          autoFocus
          className="tap-target w-full rounded-lg border border-navy/15 px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold-dark/25"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="tap-target w-full rounded-lg border border-navy/15 px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold-dark/25"
        />
      </div>

      {state.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="btn-gold tap-target w-full rounded-full px-6 py-3.5 text-[13px] uppercase disabled:opacity-70"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
