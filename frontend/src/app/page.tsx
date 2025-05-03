import React from 'react';
import AuthProvider from "@/providers/AuthProvider";

const HomePage = () => {
  return (
    <AuthProvider>
      <div className="w-full min-h-screen page-padding">
        <h1 className="text-3xl">Home Page</h1>
      </div>
    </AuthProvider>
  );
};

export default HomePage;