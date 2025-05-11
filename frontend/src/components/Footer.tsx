import React from 'react';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-accent-dark text-white pt-16 pb-8 page-padding">
      <div className="w-full mx-auto px-4 md:px-8 flex flex-col items-center justify-center">
        {/* Main Footer Content */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Book Reservations</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Simplifying reservations for businesses worldwide. Create your business profile and start accepting bookings today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="/#features" className="text-white/70 hover:text-white transition-colors duration-300">Features</Link></li>
              <li><Link href="/#pricing" className="text-white/70 hover:text-white transition-colors duration-300">Pricing</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-white/70">support@quickbookreservations.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Quick Book Reservations. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors duration-300">Terms of Service</Link>
            <Link href="/cookies" className="text-white/70 hover:text-white text-sm transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;