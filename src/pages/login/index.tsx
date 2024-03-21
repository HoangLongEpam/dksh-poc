import { QueryClientKey } from "@/constants/QueryClientKey";
import { UserInfo } from "@/constants/User";
import { QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const queryClient = new QueryClient();

  useEffect(() => {
    const userInfo = localStorage.getItem(QueryClientKey.UserInfo);
    if (userInfo) {
      router.push("/");
    }
  }, [router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if(password !== "Apple@123"){
      setError("Invalid credentials");
      setPassword("");
      return;
    }

    switch (username) {
      case "super_admin":
        localStorage.setItem(
          QueryClientKey.UserInfo,
          JSON.stringify(UserInfo.admin)
        );
        router.push("/");
        break;
      case "market_lead":
        localStorage.setItem(
          QueryClientKey.UserInfo,
          JSON.stringify(UserInfo.lead)
        );
        router.push("/");
        break;
      case "sale_admin_vietnam":
        localStorage.setItem(
          QueryClientKey.UserInfo,
          JSON.stringify(UserInfo.sale_vn)
        );
        router.push("/");
        break;
      case "sale_admin_singapore":
        localStorage.setItem(
          QueryClientKey.UserInfo,
          JSON.stringify(UserInfo.sale_sg)
        );
        router.push("/");
        break;
      default:
        setError("Invalid credentials");
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
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
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
