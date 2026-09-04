"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, credentialsConfigured, sessionToken, verifyCredentials } from "./auth";

export type LoginState = { error: string | null };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!credentialsConfigured()) {
    return { error: "Admin credentials are not configured on the server." };
  }

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyCredentials(username, password)) {
    return { error: "Incorrect username or password." };
  }

  (await cookies()).set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}
