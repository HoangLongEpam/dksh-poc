import { QueryClientKey } from "@/constants/QueryClientKey";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = new QueryClient();
  const currentRoute = "/" + router.route.split("/")[1].toLowerCase();

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
            <Link
              href="/"
              className="text-gray-800 text-sm hover:text-gray-900 transition-colors duration-200 ease-in-out mt-4"
            >
              Customers
            </Link>
            <Link
              href="/"
              className="text-gray-800 text-sm hover:text-gray-900 transition-colors duration-200 ease-in-out mt-4"
            >
              Categories
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
      <div className="w-full flex justify-center mt-10 px-8">
        <div className="w-full max-w-screen-lg">{children}</div>
      </div>
    </main>
  );
};
