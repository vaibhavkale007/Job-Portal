import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/GetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  // fetch companies
  useGetAllCompanies();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ================= PAGE CONTAINER ================= */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Companies
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Create, search and manage all registered companies
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-[#6A38C2] hover:bg-[#5b30a6] h-10 px-5 text-sm font-medium shadow-md"
          >
            + Add New Company
          </Button>
        </div>

        {/* ================= SEARCH BAR ================= */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Input
              placeholder="Search company by name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-4 pr-4 h-11 rounded-xl shadow-sm border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
            />
          </div>
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
          <CompaniesTable />
        </div>

      </div>
    </div>
  );
};

export default Companies;
