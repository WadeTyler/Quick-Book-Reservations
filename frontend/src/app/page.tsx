import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Home | Quick Book",
  description: "Manage your businesses reservations and services within minutes!"
}

const HomePage = () => {

  return (
    <div className="w-full min-h-screen page-padding">
      <h1 className="text-3xl">Home Page</h1>
    </div>
  );
};

export default HomePage;