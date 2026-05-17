"use client";

import { registerSchema } from "@/lib/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data: RegisterForm) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-sm flex-col gap-4 p-6"
    >
      <h1 className="text-xl font-semibold">Register</h1>

      <input placeholder="Name" {...register("name")} />
      {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

      <input placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-sm text-red-600">{errors.password.message}</p>
      )}

      <button type="submit">Sign up</button>
    </form>
  );
}
