"use client";
import {Button} from "@/components/ui/button";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/features/auth/hooks/AuthContext";
import Loader from "@/components/ui/loader";
import Link from "next/link";

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
    <form onSubmit={handleSubmit} className="bg-background p-4 max-w-96 w-full rounded-md shadow-md">
      <h1 className="font-semibold text-accent text-center text-2xl md:text-3xl">Sign Up</h1>
      <p className='text-center text-balance mb-4'>Sign up and start managing your reservations within minutes!</p>

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
          <label htmlFor="firstName" className="input-label">First Name*:</label>
          <input type="text"
                 id="firstName"
                 name="firstName"
                 className="input-bar"
                 required
                 minLength={3}
                 maxLength={50}
                 placeholder="Enter your first name"
          />
        </div>

        <div className="input-container">
          <label htmlFor="lastName" className="input-label">Last Name*:</label>
          <input type="text"
                 id="lastName"
                 name="lastName"
                 className="input-bar"
                 required
                 minLength={3}
                 maxLength={50}
                 placeholder="Enter your last name"
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


        <div className="input-container">
          <label htmlFor="confirmPassword" className="input-label">Confirm Password*:</label>
          <input type="password"
                 id="confirmPassword"
                 name="confirmPassword"
                 className="input-bar"
                 required
                 minLength={6}
                 maxLength={100}
                 placeholder="Confirm your password"
          />
        </div>

      </fieldset>

      {signUpError && (
        <p className="text-destructive text-center text-balance mt-4">{signUpError}</p>
      )}

        <Button type="submit" className="mt-4 w-full">
          {!isSigningUp ? 'Sign Up' : <Loader />}
        </Button>

      <p className="mt-4 text-center text-balance">Already have an account? <Link href="/login" className="link-1">Login</Link></p>
      

    </form>
  )
}