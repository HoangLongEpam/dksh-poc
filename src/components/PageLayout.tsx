import { QueryClientKey } from "@/constants/QueryClientKey";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const currentRoute = "/" + router.route.split("/")[1].toLowerCase();
  const [user, setUser] = useState<{
    username: string;
    role: string;
    permissions: string;
  } | null>(null);

  useEffect(() => {
    const user = localStorage?.getItem(QueryClientKey.UserInfo);
    if (!user && currentRoute !== "/login") {
      router.push("/login");
    }

    if (user) {
      setUser(JSON?.parse(user));
    }
  }, [currentRoute, router]);

  const showSidebar = currentRoute !== "/login";

  const handleSignOut = () => {
    localStorage.removeItem(QueryClientKey.UserInfo);
    router.push("/login");
  };

  return (
    <main className="flex flex-row">
      {showSidebar && (
        <div className="w-40 min-h-svh bg-cyan-200">
          <div className="h-20 bg-gray-800 flex items-center justify-center">
            <h1 className="text-white text-sm">Merchant Center</h1>
          </div>

          <div className="flex flex-col mt-8 justify-center items-center">
            <Link
              href="/"
              className="text-gray-800 text-sm hover:text-gray-900 transition-colors duration-200 ease-in-out mt-4"
            >
              Home
            </Link>
            <Link
              href="/stores"
              className="text-gray-800 text-sm hover:text-gray-900 transition-colors duration-200 ease-in-out mt-4"
            >
              Stores
            </Link>
            <div className="mt-4">
              <div
                onClick={handleSignOut}
                className="text-gray-800 text-sm hover:text-gray-900 transition-colors duration-200 ease-in-out mt-4"
              >
                Sign out
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center mt-10 px-8">
        <div>{user?.role}</div>
        <div className="w-full max-w-screen-lg">{children}</div>
      </div>
    </main>
  );
};
