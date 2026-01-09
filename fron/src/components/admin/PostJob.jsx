import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies = [] } = useSelector((store) => store.company);

  /* ---------------- INPUT HANDLER ---------------- */
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  /* ---------------- SELECT HANDLER ---------------- */
  const selectChangeHandler = (value) => {
    // value = companyId (safe)
    setInput({ ...input, companyId: value });
  };

  /* ---------------- SUBMIT ---------------- */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Job posting failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ================= CONTAINER ================= */}
      <div className="mx-auto max-w-5xl px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="rounded-2xl bg-white p-8 shadow-lg border"
        >
          {/* ================= HEADER ================= */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6A38C2]/10">
              <Briefcase className="h-5 w-5 text-[#6A38C2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Post a New Job
              </h1>
              <p className="text-sm text-gray-500">
                Fill in the details to publish a new job opening
              </p>
            </div>
          </div>

          {/* ================= FORM GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <Label>Job Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Frontend Developer"
                className="mt-1 h-11"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief job description"
                className="mt-1 h-11"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="React, Tailwind, Git..."
                className="mt-1 h-11"
              />
            </div>

            <div>
              <Label>Salary Range</Label>
              <Input
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="₹6–10 LPA"
                className="mt-1 h-11"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Mumbai, India"
                className="mt-1 h-11"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full-time / Internship"
                className="mt-1 h-11"
              />
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="0–2 years"
                className="mt-1 h-11"
              />
            </div>

            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="mt-1 h-11"
              />
            </div>

            {/* ================= COMPANY SELECT ================= */}
            {companies.length > 0 && (
              <div className="md:col-span-2">
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="mt-1 h-11">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company._id}   // ✅ use id, not name
                        >
                          {company.title}      {/* ✅ schema uses title */}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* ================= FOOTER ================= */}
          <div className="mt-10">
            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
              >
                Publish Job
              </Button>
            )}

            {companies.length === 0 && (
              <p className="mt-3 text-center text-sm text-red-600 font-medium">
                ⚠ Please register a company before posting a job.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
