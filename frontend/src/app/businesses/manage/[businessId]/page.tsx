import React from 'react';
import ManagedBusinessPageBreadcrumbs from "@/components/businesses/manage/business/dashboard/ManagedBusinessPageBreadcrumbs";
import ManagedBusinessDashboard from "@/components/businesses/manage/business/dashboard/ManagedBusinessDashboard";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Manage Business | Quick Book",
  description: "Manage your business, services, staff, and reservations!"
}

const ManageBusinessPage = () => {
  return (
    <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col gap-4 items-center">
      <ManagedBusinessPageBreadcrumbs/>
      <ManagedBusinessDashboard/>
    </div>
  );

};

export default ManageBusinessPage;