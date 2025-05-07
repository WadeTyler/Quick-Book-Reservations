import React from 'react';
import ManageStaffPageBreadcrumbs from "@/components/businesses/manage/business/staff/ManageStaffPageBreadcrumbs";
import ManageStaffContainer from "@/components/businesses/manage/business/staff/ManageStaffContainer";
import StaffManagementInfo from "@/components/businesses/manage/business/staff/StaffManagementInfo";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Manage Staff | Quick Book",
  description: "Manage staff for your business!"
}

const ManageStaffPage = () => {

  return (
      <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col gap-4 items-center">
        <ManageStaffPageBreadcrumbs />
        <ManageStaffContainer />
        <StaffManagementInfo />
      </div>
  );
};

export default ManageStaffPage;
