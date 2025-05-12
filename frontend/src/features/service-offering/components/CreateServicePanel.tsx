import React from 'react';
import Link from "next/link";

const CreateServicePanel = ({businessId}: {
  businessId: string;
}) => {

  return (
    <Link href={`/businesses/manage/${businessId}/services/create`} className="w-full min-h-48 flex flex-col items-center justify-center gap-4 overflow-hidden border-3 border-accent border-dashed text-accent p-4 hover:bg-accent hover:text-white cursor-pointer group rounded-md duration-200">

      <div className="rounded-full border-3 border-accent border-dashed flex items-center justify-center w-16 h-16 group-hover:border-white duration-200">
        <span className="text-4xl">+</span>
      </div>

      <p>Create Service</p>
    </Link>
  );
};

export default CreateServicePanel;