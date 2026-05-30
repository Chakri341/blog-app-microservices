"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import authStore from "../store/auth.store";

export default function useProtectedRoute() {
  const router = useRouter();

  const token = authStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);
}
