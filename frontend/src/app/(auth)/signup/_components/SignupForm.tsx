"use client";
import {Button} from "@/components/ui/button";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/features/auth/hooks/AuthContext";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function SignupForm() {

  const router = useRouter();
  const {signup, isSigningUp, signUpError} = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (!username || !firstName || !lastName || !password || !confirmPassword) return;

    const user = await signup(username, firstName, lastName, password, confirmPassword);

    if (user) {
      router.push("/dashboard");
    }
  }

  return (
    <Card className="max-w-lg w-full">
      <CardHeader>
        <h1 className="font-semibold text-accent text-center text-2xl md:text-3xl">Signup</h1>
        <p className='text-center text-balance mb-4'>Signup and start managing your reservations!</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1">
              <Label htmlFor="firstName" className="mb-2 block">Your First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your First Name"
                required
                maxLength={50}
                autoComplete="first-name"
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="lastName" className="mb-2 block">Your Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your Last Name"
                required
                maxLength={50}
                autoComplete="last-name"
              />
            </div>

          </div>

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

          <div className="flex-1">
            <Label htmlFor="confirmPassword" className="mb-2 block">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              maxLength={100}
              autoComplete="confirm-password"
            />
          </div>

          {signUpError && (
            <p className="text-destructive text-center text-balance">{signUpError}</p>
          )}

          <Button type="submit" className="w-full">
            {!isSigningUp ? 'Signup' : <Loader />}
          </Button>

          <p className="text-center text-balance">Already have an account? <Link href="/login" className="link-1">Login</Link></p>


        </form>
      </CardContent>

    </Card>
  )
}