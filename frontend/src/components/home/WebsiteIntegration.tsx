import React from 'react';
import Link from "next/link";
import {RiArrowDownLongLine, RiCheckLine} from "@remixicon/react";

const WebsiteIntegration = () => {
  return (
    <section id="integration" className="w-full section-padding bg-accent text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:justify-start justify-center md:gap-12">
          <div className="md:w-1/2 flex flex-col items-center md:items-start">
              <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                For Your Website
              </span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight md:text-start text-center">
              Link From Your Website
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              After creating your business profile on our platform, easily connect it to your existing website with a simple link or embedded button.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3 mt-1">
                  <RiCheckLine />
                </div>
                <span>Direct customers to your booking page with a custom URL</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3 mt-1">
                  <RiCheckLine />
                </div>
                <span>Add a &quot;Book Now&quot; button to your existing website</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3 mt-1">
                  <RiCheckLine />
                </div>
                <span>Customize the appearance to match your brand</span>
              </li>
            </ul>
            <Link href="/integration" className="submit-btn3 px-6 py-3 text-lg bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-all duration-300">
              Integration Guide
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg text-foreground">
              <div className="bg-background p-4 rounded-md mb-4">
                <h3 className="text-accent font-medium mb-2">Your Website</h3>
                <div className="border border-gray-200 rounded p-3 mb-3 bg-white">
                  <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
                  <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                </div>
                <div className="flex justify-center">
                  <div className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium">
                    Book Now →
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <RiArrowDownLongLine className="text-white my-4"/>
              </div>
              <div className="bg-background p-4 rounded-md">
                <h3 className="text-accent font-medium mb-2">Quick Book Reservations</h3>
                <div className="border border-gray-200 rounded p-3 bg-white">
                  <div className="w-full h-20 bg-gray-100 rounded mb-2"></div>
                  <div className="w-full h-8 bg-accent/20 rounded mb-2"></div>
                  <div className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium mx-auto w-fit">Make Reservation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteIntegration;