"use client";

import ManageServicesContainer
  from "@/app/(management)/manage/[businessId]/services/_components/ManageServicesContainer";

export default function ManageServicesPage() {
  return (
    <div className="mt-32">
      <ManageServicesContainer />
    </div>
  );
}
