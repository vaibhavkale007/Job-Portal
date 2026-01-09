import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "../ui/button";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log("FETCH APPLICANTS ERROR:", error);
      }
    };

    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ================= PAGE CONTAINER ================= */}
      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#6A38C2]" />
                Applicants
              </h1>
              <p className="text-sm text-gray-500">
                Total applications received for this job
              </p>
            </div>
          </div>

          {/* COUNT BADGE */}
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border">
            <span className="text-sm text-gray-600">Total</span>
            <span className="rounded-full bg-[#6A38C2] px-3 py-0.5 text-xs font-semibold text-white">
              {applicants?.applications?.length || 0}
            </span>
          </div>
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="rounded-2xl bg-white shadow-sm border p-4">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
