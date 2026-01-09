import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">

        {/* Badge */}
        <span className="inline-block rounded-full bg-[#FEEAE4] px-5 py-2 text-sm font-semibold text-[#F83002]">
          India’s Trusted Job Portal
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
          Find, Apply & Build Your <br />
          <span className="text-[#6A38C2]">Dream Career</span>
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
          Discover thousands of verified job opportunities from top companies.
          Whether you are a fresher or an experienced professional, we help you
          take the next step in your career journey.
        </p>

        {/* Search Bar */}
        <div className="mt-10 flex items-center justify-center">
          <div className="flex w-full max-w-xl items-center rounded-full border border-gray-200 bg-white shadow-md overflow-hidden">

            <input
              type="text"
              placeholder="Search jobs by title, skill or company..."
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-3 text-sm outline-none"
            />

            <Button
              onClick={searchJobHandler}
              className="h-full rounded-none rounded-r-full bg-[#6A38C2] px-6 hover:bg-[#5b30a6]"
            >
              <Search className="h-5 w-5" />
            </Button>

          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">

          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#6A38C2]">10K+</h3>
            <p className="text-sm text-gray-500">Active Jobs</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#6A38C2]">5K+</h3>
            <p className="text-sm text-gray-500">Hiring Companies</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#6A38C2]">50K+</h3>
            <p className="text-sm text-gray-500">Job Seekers</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
