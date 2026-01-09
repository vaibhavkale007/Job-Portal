import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/GetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    title: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ================= HANDLE INPUT ================= */
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, logo: file });
  };

  /* ================= SUBMIT ================= */
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.logo) {
      formData.append("logo", input.logo);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SET DATA ================= */
  useEffect(() => {
    if (singleCompany) {
      setInput({
        title: singleCompany.title || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        logo: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* ================= PAGE WRAPPER ================= */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <form
          onSubmit={submitHandler}
          className="rounded-xl bg-white shadow-md border"
        >
          {/* ================= HEADER ================= */}
          <div className="border-b px-6 py-5">
            <h1 className="text-lg font-semibold text-gray-800">
              Company Information
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage how your company appears to candidates
            </p>
          </div>

          {/* ================= FORM BODY ================= */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Company Name */}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  placeholder="Enter company name"
                  className="mt-1 h-10"
                />
              </div>

              {/* Website */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Website
                </Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://example.com"
                  className="mt-1 h-10"
                />
              </div>

              {/* Location */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="City, Country"
                  className="mt-1 h-10"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Brief description of your company"
                  className="mt-1 h-10"
                />
              </div>

              {/* Logo Upload */}
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">
                  Company Logo
                </Label>

                <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-lg border border-dashed border-gray-300 p-4 hover:border-[#6A38C2] transition">
                  <div className="flex items-center gap-3 text-gray-600">
                    <UploadCloud className="h-5 w-5" />
                    <span className="text-sm break-all">
                      {input.logo
                        ? input.logo.name
                        : "Upload your company logo"}
                    </span>
                  </div>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="w-full sm:w-44 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ACTIONS ================= */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t px-6 py-5">

            {/* Back Button moved BELOW UI */}
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Companies
            </Button>

            {/* Action Buttons */}
            <div className="flex w-full sm:w-auto gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5b30a6]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
