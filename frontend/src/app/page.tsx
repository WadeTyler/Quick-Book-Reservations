import React from 'react';
import {Metadata} from "next";
import Footer from "@/components/Footer";
import Hero from "@/app/_components/Hero";
import Features from "@/app/_components/Features";
import WebsiteIntegration from "@/app/_components/WebsiteIntegration";
import CTA from "@/app/_components/CTA";
import Pricing from "@/app/_components/Pricing";

export const metadata: Metadata = {
  title: "Home | Quick Book Reservations",
  description: "Streamline your business reservations with our powerful and easy-to-use reservation management system."
}

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Website Integration Section */}
      <WebsiteIntegration />

      <Pricing />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
