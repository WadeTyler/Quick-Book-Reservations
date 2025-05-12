"use client";
import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAuthToken} from "@/features/auth/lib/auth.service";
import AuthProvider from "@/features/auth/providers/AuthProvider";
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";
import Link from "next/link";

const LoginForm = () => {

  const queryClient = useQueryClient();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {mutate: handleLogin, isPending: isLoggingIn, error: loginError} = useMutation({
    mutationFn: createAuthToken,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['authUser']});
    }
  });

  return (
    <AuthProvider forceNoAuth={true} redirectTo="/businesses/manage">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin({username, password});
          }}
          className="min-w-96 bg-background-secondary flex flex-col items-center justify-center md:p-8 p-4 rounded-md shadow-md gap-4">
          <header className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl text-accent font-semibold tracking-wide">Login</h1>
            <p className="text-center">Welcome back! Let&#39;s manage your applications!</p>
          </header>

          <hr className="text-accent w-full"/>

          {/* Username */}
          <fieldset className="input-container">
            <label htmlFor="username" className="input-label">Email:</label>
            <input type="email" id="username" name="username" className="input-bar" placeholder="Enter your email"
                   required maxLength={255} minLength={3} onChange={(e) => setUsername(e.target.value)}/>
          </fieldset>

          {/* Password */}
          <fieldset className="input-container">
            <label htmlFor="password" className="input-label">Password:</label>
            <input type="password" id="password" name="password" className="input-bar" placeholder="Enter your password"
                   required maxLength={255} minLength={6} onChange={(e) => setPassword(e.target.value)}/>
          </fieldset>

          {/* Login Error */}
          {loginError && (
            <p className="error-msg">{(loginError as Error).message}</p>
          )}

          <button className="submit-btn">
            {isLoggingIn
              ? <LoadingSpinnerSM/>
              : 'Login'
            }
          </button>

          <span className="text-center ">
            Don&#39;t have an account? <Link href="/signup" className="text-accent hover:text-accent-dark">Signup</Link>
          </span>

        </form>
    </AuthProvider>
  );
};

export default LoginForm;