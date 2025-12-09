import Link from "next/link";

export default function notFound() {
    return (
        <div className="text-center items-center flex flex-col justify-center w-screen h-screen gap-5">
            <h1 className="text-6xl text-blue-900 font-bold">Page Not Found</h1>
            <p className="text-lg">Sorry, the page you are looking for does not exist</p>
            <Link href="/" className="border border-blue-900 p-4 rounded-full hover:bg-blue-900 hover:text-white transition ease-in-out text-blue-900">Go to main page</Link>
        </div>
    )
}