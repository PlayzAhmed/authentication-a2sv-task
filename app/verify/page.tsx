"use client";
import { useVerifyUserMutation } from "@/lib/features/users/usersApi";
import { useEffect, useRef, useState } from "react";
import { notFound, redirect, useRouter, useSearchParams } from "next/navigation";

export default function Verify() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    notFound();
  }
  const router = useRouter();
  const TimerTime = 30;
  const [verifyUser, { isLoading, isSuccess, isError, data }] =
    useVerifyUserMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const [timer, setTimer] = useState(TimerTime);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const digitsRef = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const errorRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLInputElement | null>(null);
  const resendRef = useRef<HTMLButtonElement | null>(null);

  function handleChange(index: number, value: string): void {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      digitsRef?.current[index + 1]?.focus();
    }
  }

  function handleResend(): void {
    if (timer <= 0) {
      setTimer(TimerTime);
    }
  }

  useEffect(() => {
    if (timer <= 0) {
      resendRef.current.removeAttribute("disabled");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  async function handleSubmit(e: React.FormEvent): Promise<any> {
    e.preventDefault();
    const errorClassList = errorRef?.current.classList;
    setErrorMsg("");
    errorClassList.add("hidden");

    if (!otp.every((d) => d !== "")) {
      setErrorMsg("Error: digits are missing.");
      errorClassList.remove("hidden");
      return;
    }

    try {
      const res = await verifyUser({
        email,
        OTP: otp.join(""),
      }).unwrap();

      router.push("/login");
    } catch (error) {
      console.log(error);
      setErrorMsg(`Error: ${error.data.message}.`);
      errorClassList.remove("hidden");
      return;
    }
  }

  useEffect(() => {
    if (otp.every((d) => d !== "")) {
      buttonRef?.current.removeAttribute("disabled");
    } else {
      buttonRef?.current.setAttribute("disabled", "");
    }
  }, [otp]);

  return (
    <main className="flex flex-col h-screen gap-10 justify-center items-center">
      <h1 className="font-black text-3xl">Verify Email</h1>
      <p className="text-gray-600 w-sm">
        We've sent a verification code to the email address you provided. To
        complete the verification process, please enter the code here
      </p>
      <div
        ref={errorRef}
        className="border w-sm p-2 rounded-lg bg-red-200 border-red-800 text-red-700 font-bold text-sm hidden"
      >
        {errorMsg}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <div className="w-sm flex flex-row justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                digitsRef.current[index] = el;
              }}
              required
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              placeholder="0"
              onChange={(e) => handleChange(index, e.target.value)}
              className="border-2 border-indigo-300 w-16 h-12 p-4 rounded-lg bg-gray-100 text-center text-3xl placeholder-gray-400 focus:outline-indigo-500"
            />
          ))}
        </div>
        <p className="mb-12">
          You can request to{" "}
          <button
            disabled={timer > 0}
            ref={resendRef}
            onClick={handleResend}
            type="button"
            className="text-indigo-800 font-bold enabled:hover:cursor-pointer"
          >
            Resend code
          </button>{" "}
          in{" "}
          <span className="text-indigo-800 font-bold">
            0:{String(timer).padStart(2, "0")}
          </span>
        </p>
        <input
          disabled
          ref={buttonRef}
          type="submit"
          value="Continue"
          className="border rounded-full w-sm p-2 text-lg bg-indigo-900 border-white text-white enabled:hover:cursor-pointer enabled:hover:bg-white enabled:hover:border-indigo-900 enabled:hover:text-indigo-900 transition ease-in-out disabled:bg-violet-300"
        />
      </form>
    </main>
  );
}
