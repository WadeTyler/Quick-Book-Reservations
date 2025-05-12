import React from 'react';
import {RiGlobalLine, RiSurveyLine, RiWindowLine} from "@remixicon/react";

const Features = () => {
  return (
    <section id="Eatures" className="w-full section-padding bg-background-secondary flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-accent text-center">
          Powerful Features for Your Business
        </h2>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Feature 1 */}
          <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mb-4 mx-auto">
              <RiGlobalLine className="size-16 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-accent mb-2 text-center">Online Booking</h3>
            <p className="text-center">
              Allow customers to book appointments and services 24/7 from any device.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mb-4 mx-auto">
              <RiSurveyLine className="size-16 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-accent mb-2 text-center">Customizable Forms</h3>
            <p className="text-center">
              Create custom booking forms tailored to your specific business needs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mb-4 mx-auto">
              <RiWindowLine className="size-16 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-accent mb-2 text-center">Website Integration</h3>
            <p className="text-center">
              Easily connect your business profile to your existing website with a simple link or button.
            </p>
          </div>
      </div>
    </section>
  );
};

export default Features;