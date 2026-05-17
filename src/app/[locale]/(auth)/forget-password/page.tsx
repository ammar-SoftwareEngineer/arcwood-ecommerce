"use client";

import { useForm } from "react-hook-form";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgetPasswordPage() {
  const { register, handleSubmit } = useForm<ForgotPasswordForm>();

  function onSubmit(data: ForgotPasswordForm) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-sm flex-col gap-4 p-6"
    >
      <h1 className="text-xl font-semibold">Forgot password</h1>

      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
      />

      <button type="submit">Send reset link</button>
    </form>
  );
}
