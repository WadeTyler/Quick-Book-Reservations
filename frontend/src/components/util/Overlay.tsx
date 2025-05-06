import React from 'react';

const Overlay = ({children}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed top-0 left-0 bg-black/50 w-full h-screen z-30 flex items-center justify-center page-padding">
      {children}
    </div>
  );
};

export default Overlay;