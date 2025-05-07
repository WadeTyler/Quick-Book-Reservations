import React from 'react';
import DeleteBusinessPageBreadcrumbs
  from "@/components/businesses/manage/business/delete/DeleteBusinessPageBreadcrumbs";
import DeleteBusinessForm from "@/components/businesses/manage/business/delete/DeleteBusinessForm";
import {Metadata} from "next";


export const metadata: Metadata = {
  title: "Delete Business | Quick Book",
  description: "Delete your business and it's data."
}

const DeleteBusinessPage = () => {

  return (
    <div className="w-full page-padding-with-breadcrumbs min-h-screen flex flex-col items-center">
      <DeleteBusinessPageBreadcrumbs/>
      <DeleteBusinessForm/>
    </div>
  );
};

export default DeleteBusinessPage;