import React from 'react';
import {RiCheckLine} from "@remixicon/react";
import Link from "next/link";
import pricingModules from "@/constants/pricing-modules";

const Pricing = () => {
  return (
    <div id="pricing" className="w-full section-padding flex flex-col gap-8 items-center bg-background-secondary">
      <h2 className="text-3xl md:text-4xl font-semibold text-accent">Our Pricing Modules</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pricingModules.map((module) => (
          <div key={module.tier} className="bg-background p-4 rounded-md shadow-md flex flex-col gap-2 min-h-96">
            <h3 className="text-lg md:text-2xl font-semibold text-accent">{module.tier}</h3>
            <p className="">{module.tag}</p>

            <hr className="w-full"/>

            <ul className="flex flex-col gap-2">
              {module.perks.map((perk, index) => (
                <li key={index} className="inline-flex gap-4 items-center">
                  <RiCheckLine className="text-accent" />
                  <p>{perk}</p>
                </li>
              ))}
            </ul>


            <div className="mt-auto w-full flex flex-col gap-2 items-start justify-center">
              {/* Price */}
              {module.price && (
                <p>
                <span className="dollar-amount font-semibold text-3xl text-accent">
                  {Math.floor(module.price / 100)}
                </span>
                  <span className="cents-amount">
                  {Math.floor(module.price % 100)}
                </span>
                  <span> per Month</span>
                </p>
              )}
              <Link href={module.href} className="submit-btn">{module.linkText}</Link>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Pricing;