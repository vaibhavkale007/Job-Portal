import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/GetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { PlusCircle } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ================= PAGE CONTAINER ================= */}
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manage Jobs
            </h1>
            <p className="text-sm text-gray-500">
              View, search and manage all your posted jobs
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="flex items-center gap-2 bg-[#6A38C2] hover:bg-[#5b30a6]"
          >
            <PlusCircle className="h-5 w-5" />
            Post New Job
          </Button>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border">
          <Input
            placeholder="Search by company or role..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="sm:max-w-sm"
          />
        </div>

        {/* ================= TABLE ================= */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
