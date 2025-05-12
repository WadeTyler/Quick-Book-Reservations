import React from 'react';
import Link from "next/link";

const Hero = () => {
  return (
    <div id="hero" className="page-padding w-full min-h-[40rem] flex lg:flex-row flex-col items-center lg:justify-between justify-center bg-gradient-to-br from-accent-dark to-accent text-white gap-4">

      {/* Info */}
      <div className="flex flex-col items-center gap-4 w-full lg:items-start">
        <p className="px-4 py-1 rounded-full bg-accent text-sm w-fit text-center">For Business Owners</p>

        <h1 className="text-center! lg:text-start!">Manage Your Business Bookings Effortlessly</h1>
        <p className="lg:text-xl leading-relaxed text-white/90 text-center lg:text-start">Create your business profile on our platform and let customers book yours services directly through our user-friendly interface.</p>

        <div className="flex items-center gap-4 lg:justify-start justify-center">
          <Link href={"/businesses/manage/create"} className="submit-btn2 h-full">Create Your Business</Link>
          <Link href={"/businesses/examples"} className="submit-btn3 h-full">View Examples</Link>
        </div>
      </div>

      {/* Place holder */}
      <div className="aspect-video w-full bg-white rounded-md">

      </div>


    </div>
  );
};

export default Hero;