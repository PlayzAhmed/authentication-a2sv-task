import { getServerSession } from "next-auth";
import Form from "../../components/form";
import Link from 'next/link';
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/")
  }
  return (
    <main className="border flex flex-col justify-center items-center h-screen gap-7">
      <h1 className="font-black text-4xl">Welcome Back,</h1>
      <div className="flex flex-row justify-between 5 w-sm">
        <div className="w-32 border border-gray-300"></div>
        <div className="w-32 border border-gray-300"></div>
      </div>
      <Form
        fields={[
          {
            name: "Email Address",
            label: "email",
            type: "email",
            placeHolder: "Enter your email address",
          },
          {
            name: "Password",
            label: "password",
            type: "password",
            placeHolder: "Enter your password",
          },
        ]}
        buttonText="Log In"
        formType="login"
      />
      <div>
        <p>Don't have an account? <Link href="/signup" className="text-indigo-800 font-bold">Sign Up</Link></p>
      </div>
    </main>
  );
}
