import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Job<span className="text-[#F83002]">Portal</span>
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="/about" className="hover:text-[#6A38C2] transition">
              About
            </a>
            <a href="/contact" className="hover:text-[#6A38C2] transition">
              Contact
            </a>
            <a href="/privacy" className="hover:text-[#6A38C2] transition">
              Privacy
            </a>
            <a href="/terms" className="hover:text-[#6A38C2] transition">
              Terms
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-gray-600">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-[#1877F2] transition"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-[#1DA1F2] transition"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="hover:text-[#0A66C2] transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
