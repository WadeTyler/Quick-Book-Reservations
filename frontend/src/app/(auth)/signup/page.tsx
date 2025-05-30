import SignupForm from "@/app/(auth)/signup/_components/SignupForm";
import UnAuthOnly from "@/features/auth/components/UnAuthOnly";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Signup | Quick Book',
  description: 'Create your Quick Book account to manage business bookings and reservations online.',
  keywords: [
    "signup",
    "Quick Book account",
    "business booking",
    "reservation management",
    "register"
  ]
}

export default function SignUpPage() {
  return (
    <UnAuthOnly redirect={true}>
      <div className="w-full min-h-screen flex items-center justify-center mt-32 p-4">
        <SignupForm/>
      </div>
    </UnAuthOnly>
  )
}
