"use client";

import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "@/actions/auth.actions";

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    const res = await forgotPasswordAction(
      data.email
    );
    console.log(res);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email")} />

      <button type="submit">Reset Password</button>
    </form>
  );
}