import { QueryClientKey } from "@/constants/QueryClientKey";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const queryClient = new QueryClient();

  useEffect(() => {
    const userInfo = localStorage.getItem(QueryClientKey.UserInfo);
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    switch (username) {
      case "market_lead":
        // queryClient.setQueryData([QueryClientKey.UserInfo], username);
        localStorage.setItem(QueryClientKey.UserInfo, username);
        router.push("/");
        break;
      case "sales":
        // queryClient.setQueryData([QueryClientKey.UserInfo], username);
        localStorage.setItem(QueryClientKey.UserInfo, username);
        router.push("/");
      default:
        console.log("default");
        break;
    }

    setUsername("");
    setPassword("");
  };

  return (
    <main className="w-full min-h-full flex justify-center items-center">
      <form className="w-96 border border-slate-200 rounded p-6">
        <h1 className="text-2xl mb-4">Sign in to the Merchant Center</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            className="border rounded px-2 py-1 bg-slate-100"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="password">Password</label>
          <input
            className="border rounded px-2 py-1 bg-slate-100"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="text-white bg-cyan-500 border py-1 px-4 rounded mt-5"
          type="submit"
          onClick={handleSignIn}
        >
          Sign in
        </button>
        <hr className="my-4" />
        <div className="text-sm text-gray-700">
          You can also sign in with{" "}
          <span className="text-black underline">Single Sign-On (SSO)</span>
        </div>
      </form>
    </main>
  );
}
