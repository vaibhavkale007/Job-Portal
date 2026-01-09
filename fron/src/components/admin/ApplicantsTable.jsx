import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Status update failed"
      );
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption className="text-gray-500">
          A list of applicants who applied for this job
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 transition"
              >
                <TableCell className="font-medium">
                  {item?.applicant?.fullname}
                </TableCell>

                <TableCell className="text-gray-600">
                  {item?.applicant?.email}
                </TableCell>

                <TableCell className="text-gray-600">
                  {item?.applicant?.phoneNumber}
                </TableCell>

                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6A38C2] hover:underline font-medium"
                    >
                      {item.applicant.profile.resumeOriginalName ||
                        "View Resume"}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not uploaded</span>
                  )}
                </TableCell>

                <TableCell className="text-gray-500">
                  {item?.applicant?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="rounded-md p-2 hover:bg-gray-100 transition">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-40 p-2">
                      {shortlistingStatus.map((status) => (
                        <button
                          key={status}
                          onClick={() =>
                            statusHandler(status, item?._id)
                          }
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition
                            ${
                              status === "Accepted"
                                ? "text-green-600 hover:bg-green-50"
                                : "text-red-600 hover:bg-red-50"
                            }`}
                        >
                          {status === "Accepted" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          {status}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-gray-500"
              >
                No applicants found for this job.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
