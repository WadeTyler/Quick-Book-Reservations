import React from 'react';
import Link from "next/link";

const Cta = () => {
  return (
    <section id="cta" className="w-full section-padding bg-accent ">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center gap-4 bg-background-secondary p-4 rounded-md shadow-md">
        <h2 className="text-xl md:text-3xl font-semibold text-accent">
          Ready to Streamline Your Reservation Process?
        </h2>
        <p className="lg:text-lg">
          Join other successful businesses that trust Quick Book Reservations to handle their booking needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup" className="submit-btn2">
            Sign Up Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;