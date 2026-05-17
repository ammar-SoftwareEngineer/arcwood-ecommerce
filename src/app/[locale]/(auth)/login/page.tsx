"use client";

import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { register, handleSubmit } =
    useForm();

  async function onSubmit(data: any) {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Email"
        {...register("email")}
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}