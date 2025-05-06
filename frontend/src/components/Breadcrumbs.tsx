import React from 'react';
import {RiArrowRightSLine} from "@remixicon/react";
import Link from "next/link";

export type Breadcrumb = {
  name: string;
  href: string;
}

const Breadcrumbs = ({breadcrumbs}: {
  breadcrumbs: Breadcrumb[];
}) => {
  return (
    <div className="w-full h-12 fixed top-0 left-0 mt-16 px-4 flex items-center justify-start gap-4 bg-background border-b border-b-foreground/30 z-40">

      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="inline-flex items-center gap-4">
          <Link href={breadcrumb.href} className="text-accent underline last:text-foreground last:no-underline last:font-semibold">{breadcrumb.name}</Link>
          {index !== breadcrumbs.length - 1 && (
            <RiArrowRightSLine />
          )}
        </span>
      ))}

    </div>
  );
};

export default Breadcrumbs;