"use client";

import { signIn } from "next-auth/react";
import Button from "./button";
import { useRef, useState } from "react";
import { redirect } from "next/navigation";
import { useAddUserMutation } from "@/lib/features/users/usersApi";
import { useRouter } from "next/navigation";

type Field = {
  name: string;
  type: string;
  label: string;
  placeHolder: string;
};

interface Props {
  fields: Field[];
  buttonText: string;
  formType: "login" | "signup";
}

export default function Form({ fields, buttonText, formType }: Props) {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [addUser, { data, error, isLoading, isSuccess }] = useAddUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    setLoading(true);
    setErrorMsg("");
    errorRef.current.classList.replace("visible", "hidden");

    if (formType === "login") {
      if (password.length < 8) {
        setErrorMsg("Error: password must be at least 8 characters.");
        errorRef.current?.classList.replace("hidden", "visible");
        setLoading(false);
        return;
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res.ok) {
        setErrorMsg("Error: " + res.error);
        errorRef.current.classList?.replace("hidden", "visible");
        console.log(res);
        setLoading(false);
        return;
      }

      setLoading(false);
      redirect("/");
    } else {
      const fullName = fullNameRef.current?.value;
      const confirmPassword = confirmPasswordRef.current?.value;
      if (password.length < 8) {
        setErrorMsg("Error: password must be at least 8 characters.");
        errorRef.current?.classList.replace("hidden", "visible");
        setLoading(false);
        return;
      }
      if (password != confirmPassword) {
        setErrorMsg("Error: password must be equal to confirm password.");
        errorRef.current?.classList.replace("hidden", "visible");
        setLoading(false);
        return;
      }
      if (fullName.length < 6) {
        setErrorMsg("Error: you must write your real full name.");
        errorRef.current?.classList.replace("hidden", "visible");
        setLoading(false);
        return;
      }

      try {
        const res = await addUser({
          name: fullName,
          email,
          password,
          confirmPassword,
          role: "user",
        }).unwrap();

        console.log(res)
        router.push(`/verify?email=${encodeURIComponent(email)}`)
      } catch (error) {
        setErrorMsg("Error: Something went wrong, please try again later.");
        errorRef.current?.classList.replace("hidden", "visible");
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-sm flex flex-col gap-5">
      <div
        ref={errorRef}
        className="border p-2 rounded-lg bg-red-200 border-red-800 text-red-700 font-bold text-sm hidden"
      >
        {errorMsg}
      </div>
      {fields.map((field: Field, index: number) => (
        <div key={index} className="flex flex-col w-full">
          <label
            htmlFor={field.label}
            className="font-poppins mb-1 text-gray-700"
          >
            {field.name}
          </label>

          <input
            ref={
              field.label === "email"
                ? emailRef
                : field.label === "password"
                ? passwordRef
                : field.label === "confirm_password"
                ? confirmPasswordRef
                : field.label === "full_name"
                ? fullNameRef
                : null
            }
            className="border border-gray-300 p-2.5 rounded-lg font-mono focus:outline-indigo-900 text-sm"
            type={field.type}
            name={field.label}
            placeholder={field.placeHolder}
            required
          />
        </div>
      ))}

      <div className="flex justify-center">
        <Button text={buttonText} />
      </div>
    </form>
  );
}
