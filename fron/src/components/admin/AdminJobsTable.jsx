

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store) => store.job
  );
  console.log("ADMIN JOBS FROM REDUX 👉", allAdminJobs);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = (allAdminJobs || []).filter((job) => {
      if (!searchJobByText) return true;

      const q = searchJobByText.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(q) ||
        job?.company?.name?.toLowerCase().includes(q)
      );
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <Table>
        <TableCaption className="text-sm text-gray-500">
          A list of your recently posted jobs
        </TableCaption>

        {/* ================= HEADER ================= */}
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">
              Company
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Role
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Posted On
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ================= BODY ================= */}
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow
                key={job?._id}
                className="hover:bg-gray-50 transition"
              >
                {/* Company */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={job?.company?.logo}
                        alt={job?.company?.name}
                      />
                      <AvatarFallback>
                        {job?.company?.name?.[0] || "C"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-800">
                      {job?.company?.name || "N/A"}
                    </span>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell className="text-sm text-gray-700">
                  {job?.title}
                </TableCell>

                {/* Date */}
                <TableCell className="text-sm text-gray-600">
                  {job?.createdAt
                    ? job.createdAt.split("T")[0]
                    : "-"}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="rounded-md p-1 hover:bg-gray-100 transition">
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-40 p-2">
                      <div className="flex flex-col text-sm">

                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(`/admin/companies/${job?._id}`)
                          }
                          className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100 transition"
                        >
                          <Edit2 className="h-4 w-4 text-gray-600" />
                          <span>Edit Job</span>
                        </button>

                        {/* Applicants */}
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/jobs/${job?._id}/applicants`
                            )
                          }
                          className="mt-1 flex items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100 transition"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                          <span>View Applicants</span>
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
