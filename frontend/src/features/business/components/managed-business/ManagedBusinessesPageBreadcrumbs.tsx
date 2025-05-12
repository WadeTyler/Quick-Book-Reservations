import React from 'react';
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";

const ManagedBusinessesPageBreadcrumbs = () => {

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
  ]

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs}/>
  );
};

export default ManagedBusinessesPageBreadcrumbs;