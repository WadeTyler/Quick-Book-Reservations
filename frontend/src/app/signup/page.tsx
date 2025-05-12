import React from 'react';
import SignupForm from "@/features/auth/components/SignupForm";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Signup | Quick Book",
  description: "Signup now for Quick Book and start managing your businesses and reservations!"
}

const SignupPage = () => {
  return (

      <div className="page-padding w-full min-h-screen flex items-center justify-center">
        <SignupForm />
      </div>
  )
};

export default SignupPage;