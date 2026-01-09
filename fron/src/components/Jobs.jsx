import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/GetAllJobs";   // ✅ IMPORTANT

const Jobs = () => {
  // fetch jobs for students
  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (!allJobs) return;

    if (searchedQuery) {
      const q = searchedQuery.toLowerCase();
      const filtered = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(q) ||
          job?.description?.toLowerCase().includes(q) ||
          job?.location?.toLowerCase().includes(q)
        );
      });
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ================= PAGE CONTAINER ================= */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ================= FILTER SIDEBAR ================= */}
          <aside className="w-full lg:w-[260px] shrink-0">
            <div className="sticky top-20 rounded-xl bg-white border shadow-sm p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Filter Jobs
              </h2>
              <FilterCard />
            </div>
          </aside>

          {/* ================= JOB LIST ================= */}
          <section className="flex-1">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-800">
                Available Jobs
              </h1>
              <span className="text-sm text-gray-500">
                {filterJobs?.length || 0} jobs found
              </span>
            </div>

            {/* Empty State */}
            {filterJobs.length === 0 ? (
              <div className="flex h-[60vh] items-center justify-center rounded-xl border bg-white">
                <p className="text-gray-500 text-sm">
                  No jobs found for your search.
                </p>
              </div>
            ) : (
              <div className="h-[75vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-4">
                  {filterJobs.map((job, index) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="h-full"
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
