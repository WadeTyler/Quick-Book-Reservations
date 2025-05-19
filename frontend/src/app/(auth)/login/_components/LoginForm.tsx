"use client";
import {Button} from "@/components/ui/button";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/features/auth/hooks/AuthContext";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

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
    <Card className="max-w-lg w-full">
      <CardHeader>
        <h1 className="font-semibold text-accent text-center text-2xl md:text-3xl">Login</h1>
        <p className='text-center text-balance mb-4'>Login to your account and manage your reservations!</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex-1">
            <Label htmlFor="email" className="mb-2 block">Your Email</Label>
            <Input
              id="email"
              name="username"
              type="email"
              placeholder="Enter your email"
              required
              maxLength={255}
              autoComplete="email"
              />
          </div>

          <div className="flex-1">
            <Label htmlFor="password" className="mb-2 block">Your Password</Label>
            <Input
              id="email"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              maxLength={100}
              autoComplete="current-password"
            />
          </div>

          {loginError && (
            <p className="text-destructive text-center text-balance">{loginError}</p>
          )}

          <Button type="submit" className="w-full">
            {!isLoggingIn ? 'Login' : <Loader />}
          </Button>

          <p className="text-center text-balance">Don&#39;t have an account? <Link href="/signup" className="link-1">Sign Up</Link></p>


        </form>
      </CardContent>

    </Card>

  )
}