import React from 'react';
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";
import CreateBusinessForm from "@/components/businesses/manage/create/CreateBusinessForm";
import {Metadata} from "next";


export const metadata: Metadata = {
  title: "Create Business | Quick Book",
  description: "Create a new Business and get started accepting reservations!"
}

const CreateBusinessPage = () => {

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
    {name: "Create Business", href: "/businesses/manage/create"}
  ]

  return (
    <div className="page-padding-with-breadcrumbs w-full min-h-screen flex flex-col items-center">
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <CreateBusinessForm/>
    </div>
  );
};

export default CreateBusinessPage;