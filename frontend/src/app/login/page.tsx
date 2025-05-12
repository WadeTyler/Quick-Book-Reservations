import React from 'react';
import LoginForm from "@/features/auth/components/LoginForm";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Login | Quick Book",
  description: "Login to your account and start managing your businesses!"
}

const LoginPage = () => {
  return (
    <div className="page-padding w-full min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;