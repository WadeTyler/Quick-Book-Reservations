import ManageBusinessContainer from "@/app/(management)/manage/[businessId]/_components/ManageBusinessContainer";
import AuthOnly from "@/features/auth/components/AuthOnly";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Manage Business | Quick Book",
  description: "Manage your business."
}

export default function ManageBusinessPage() {

  return (
    <div className="mt-32">
      <AuthOnly redirect={true}>
        <ManageBusinessContainer/>
      </AuthOnly>
    </div>
  )
}