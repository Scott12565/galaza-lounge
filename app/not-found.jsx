// app/not-found.js

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-4">Sorry, the page you're looking for doesn't exist.</p>
      <Link href="/" className="text-blue-500 underline mt-6">
        Go back to Homepage
      </Link>
    </div>
  );
}
