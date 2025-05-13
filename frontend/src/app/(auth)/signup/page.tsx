import SignupForm from "@/app/(auth)/signup/_components/SignupForm";
import UnAuthOnly from "@/features/auth/components/UnAuthOnly";

export default function SignUpPage() {
  return (
    <UnAuthOnly redirect={true}>
      <div className="w-full min-h-screen bg-accent/5 flex items-center justify-center">
        <SignupForm/>
      </div>
    </UnAuthOnly>
  )
}