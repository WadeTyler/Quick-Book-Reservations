import React from 'react';
import {Metadata} from "next";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import WebsiteIntegration from "@/components/home/WebsiteIntegration";
import CTA from "@/components/home/CTA";
import Pricing from "@/components/home/Pricing";

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
