
"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  signUpSchema,
  SignUpInput,
} from "@/lib/validation/auth.schema";

import { signUpAction } from "@/actions/auth.actions";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpInput) {
    const res = await signUpAction(data);

    console.log(res);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-sm"
    >
      <input
        placeholder="Name"
        {...register("name")}
      />

      {errors.name && <p>{errors.name.message}</p>}

      <input
        placeholder="Email"
        {...register("email")}
      />

      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      {errors.password && (
        <p>{errors.password.message}</p>
      )}

      <button type="submit">
        Sign Up
      </button>
    </form>
  );
}