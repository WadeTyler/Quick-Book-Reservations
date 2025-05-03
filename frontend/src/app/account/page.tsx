import React from 'react';
import AuthProvider from "@/providers/AuthProvider";

const AccountPage = () => {
  return (
    <AuthProvider forceAuth={true}>
      <div>
        <h1 className="text-3xl">Account Page</h1>
      </div>
    </AuthProvider>
  );
};

export default AccountPage;