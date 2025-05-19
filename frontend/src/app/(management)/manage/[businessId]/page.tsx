import ManageBusinessContainer from "@/app/(management)/manage/[businessId]/_components/ManageBusinessContainer";
import AuthOnly from "@/features/auth/components/AuthOnly";

export default function ManageBusinessPage() {

  return (
    <div className="mt-32">
      <AuthOnly redirect={true}>
        <ManageBusinessContainer/>
      </AuthOnly>
    </div>
  )
}