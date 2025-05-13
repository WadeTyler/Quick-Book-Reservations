import {Metadata} from "next";
import LoginForm from "@/app/(auth)/login/_components/LoginForm";
import UnAuthOnly from "@/features/auth/components/UnAuthOnly";

export const metadata: Metadata = {
  title: 'Login | Quick Book',
  description: 'Login to your Quick Book Account.'
}


export default function LoginPage() {

  return (
    <UnAuthOnly redirect={true}>
      <div className="w-full min-h-screen bg-accent/5 flex items-center justify-center">
        <LoginForm/>
      </div>
    </UnAuthOnly>
  )
}