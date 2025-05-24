import AuthOnly from "@/features/auth/components/AuthOnly";
import ProfileCard from "@/app/(auth)/profile/_components/ProfileCard";

export default function ProfilePage() {

  return (
    <AuthOnly redirect={true}>
      <div className="bg-secondary w-full min-h-screen pt-32 flex justify-center">
        <div className="container">
          <ProfileCard />
        </div>
      </div>
    </AuthOnly>
  )
}