import ManageServicesContainer
  from "@/app/(management)/manage/[businessId]/services/_components/ManageServicesContainer";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Manage Services | Quick Book",
  description: "Manage your services."
}

export default function ManageServicesPage() {
  return (
    <div className="mt-32">
      <ManageServicesContainer />
    </div>
  );
}
