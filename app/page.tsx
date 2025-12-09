import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/signOutButton";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-poppins font-bold">
        Hello, <span className="text-indigo-600">{session.user.name}</span>
      </h1>
      <SignOutButton/>
    </main>
  );
}
