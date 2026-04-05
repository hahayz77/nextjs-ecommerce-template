"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/api/auth/signin"); // Redirect if not authenticated
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // or a loading spinner, or a message that they are being redirected
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Protected Page</h1>
      <p className="text-xl mt-4">Welcome, {session.user?.name}!</p>
      <p className="text-lg mt-2">You can only see this because you are signed in.</p>
    </div>
  );
};

export default ProtectedPage;
