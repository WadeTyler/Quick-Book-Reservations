import {Metadata} from "next";
import CreateBusinessForm from "@/app/(management)/create-business/_components/CreateBusinessForm";


export const metadata: Metadata = {
  title: "Create Business | Quick Book",
  description: "Create a business to manage your reservations within minutes."
}
export default function CreateBusinessPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 mt-32 px-6">
      <CreateBusinessForm />
    </div>
  )
}