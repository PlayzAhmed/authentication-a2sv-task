import Form from "../../components/form";
import Link from "next/link";

export default function Signup() {
  return (
    <main className="flex flex-col h-screen justify-center items-center gap-5">
      <h1 className="text-4xl font-black">Sign Up Today!</h1>
      <button className="border w-sm rounded-lg p-2.5 border-gray-400 hover:cursor-pointer flex flex-row items-center justify-center gap-2">
        <img
          src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
          alt="google-icon"
          className="w-5 h-5"
        />
        <p className="text-indigo-800 font-bold">Sign Up with Google</p>
      </button>
      <div className="flex flex-row w-sm justify-between gap-4 items-center">
        <div className="border w-24 border-gray-400 h-0"></div>
        <p className="text-gray-400">Or Sign Up with Email</p>
        <div className="border w-24 border-gray-400 h-0"></div>
      </div>
      <Form
        formType="signup"
        buttonText="Continue"
        fields={[
          {
            name: "Full Name",
            type: "text",
            label: "full_name",
            placeHolder: "Enter your full name",
          },
          {
            name: "Email Address",
            type: "email",
            label: "email",
            placeHolder: "Enter your email address",
          },
          {
            name: "Password",
            type: "password",
            label: "password",
            placeHolder: "Enter your password",
          },
          {
            name: "Confirm Password",
            type: "password",
            label: "confirm_password",
            placeHolder: "Enter your password again",
          },
        ]}
      />
      <p>
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-indigo-800">
          Log In
        </Link>
      </p>
    </main>
  );
}
