"use client";
import React, {useState} from 'react';
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";
import Link from "next/link";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signup} from "@/lib/auth.service";
import AuthProvider from "@/providers/AuthProvider";

const SignupForm = () => {

  const queryClient = useQueryClient();

  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const {mutate: handleSignup, isPending: isSigningUp, error: signupError} = useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['authUser']});
    }
  });

  return (
    <AuthProvider forceNoAuth={true} redirectTo="/businesses/manage">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup({username, firstName, lastName, password, confirmPassword});
        }}
        className="min-w-96 bg-background-secondary flex flex-col items-center justify-center md:p-8 p-4 rounded-md shadow-md gap-4">
        <header className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl text-accent font-semibold tracking-wide">Signup</h1>
          <p className="text-center">Create an account and start managing your reservations!</p>
        </header>

        <hr className="text-accent w-full"/>

        {/* Username */}
        <fieldset className="input-container">
          <label htmlFor="username" className="input-label">Email:</label>
          <input type="email" id="username" name="username" className="input-bar" placeholder="Enter your email"
                 required maxLength={255} minLength={3} onChange={(e) => setUsername(e.target.value)}/>
        </fieldset>

        {/* First Name */}
        <fieldset className="input-container">
          <label htmlFor="firstName" className="input-label">First Name:</label>
          <input type="text" id="firstName" name="firstName" className="input-bar" placeholder="Enter your First Name"
                 required maxLength={50} minLength={3} onChange={(e) => setFirstName(e.target.value)}/>
        </fieldset>

        {/* Last Name */}
        <fieldset className="input-container">
          <label htmlFor="lastName" className="input-label">Last Name:</label>
          <input type="text" id="lastName" name="lastName" className="input-bar" placeholder="Enter your Last Name"
                 required maxLength={50} minLength={3} onChange={(e) => setLastName(e.target.value)}/>
        </fieldset>

        {/* Password */}
        <fieldset className="input-container">
          <label htmlFor="password" className="input-label">Password:</label>
          <input type="password" id="password" name="password" className="input-bar" placeholder="Create a password"
                 required maxLength={255} minLength={6} onChange={(e) => setPassword(e.target.value)}/>
        </fieldset>


        {/* Confirm Password */}
        <fieldset className="input-container">
          <label htmlFor="confirmPassword" className="input-label">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className="input-bar"
                 placeholder="Confirm your Password"
                 required maxLength={255} minLength={6} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </fieldset>

        {/* Login Error */}
        {signupError && (
          <p className="error-msg">{(signupError as Error).message}</p>
        )}

        <button className="submit-btn">
          {isSigningUp
            ? <LoadingSpinnerSM/>
            : 'Signup'
          }
        </button>

        <span className="text-center">
            Already have an account? <Link href="/login" className="text-accent hover:text-accent-dark">Login</Link>
          </span>

      </form>
    </AuthProvider>
  );
};

export default SignupForm;