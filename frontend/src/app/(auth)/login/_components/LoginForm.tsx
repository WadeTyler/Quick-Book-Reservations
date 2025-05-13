"use client";
import {Button} from "@/components/ui/button";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/features/auth/hooks/AuthContext";
import Loader from "@/components/ui/loader";
import Link from "next/link";

export default function LoginForm() {

  const router = useRouter();
  const {login, isLoggingIn, loginError} = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password) return;

    const user = await login(username, password);

    if (user) {
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background p-4 max-w-96 w-full rounded-md shadow-md">
      <h1 className="font-semibold text-accent text-center text-2xl md:text-3xl">Login</h1>
      <p className='text-center text-balance mb-4'>Login to your account and manage your reservations!</p>

      <fieldset className="flex flex-col gap-4 w-full">
        <div className="input-container">
          <label htmlFor="username" className="input-label">Email*:</label>
          <input type="email"
                 id="username"
                 name="username"
                 className="input-bar"
                 required
                 minLength={3}
                 maxLength={255}
                 placeholder="Enter your email"
          />
        </div>

        <div className="input-container">
          <label htmlFor="password" className="input-label">Password*:</label>
          <input type="password"
                 id="password"
                 name="password"
                 className="input-bar"
                 required
                 minLength={6}
                 maxLength={100}
                 placeholder="Enter your password"
          />
        </div>
      </fieldset>

      {loginError && (
        <p className="text-destructive text-center text-balance mt-4">{loginError}</p>
      )}

        <Button type="submit" className="w-full mt-4">
          {!isLoggingIn ? 'Login' : <Loader />}
        </Button>

      <p className="mt-4 text-center text-balance">Don&#39;t have an account? <Link href="/signup" className="link-1">Sign Up</Link></p>
      

    </form>
  )
}