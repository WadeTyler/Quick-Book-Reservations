import React from 'react';
import ManageStaffContainer from "@/app/(management)/manage/[businessId]/staff/_components/ManageStaffContainer";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Manage Staff | Quick Book",
  description: "Manage your staff members.",

}


export default function ManageStaffPage() {

  return (
    <div className="mt-32">
      <ManageStaffContainer />
    </div>
  );
}
