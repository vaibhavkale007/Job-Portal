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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const result = companies?.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.title
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilteredCompanies(result || []);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <Table>
        <TableCaption className="text-sm text-gray-500 py-3">
          Recently registered companies
        </TableCaption>

        {/* ================= TABLE HEADER ================= */}
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[80px]">Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* ================= TABLE BODY ================= */}
        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition"
              >
                {/* LOGO */}
                <TableCell>
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={company.logo} />
                    <AvatarFallback>
                      {company.title?.[0] || "C"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* NAME */}
                <TableCell className="font-medium text-gray-800">
                  {company.title}
                </TableCell>

                {/* DATE */}
                <TableCell className="text-gray-600">
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString()
                    : "—"}
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="rounded-md p-2 hover:bg-gray-100 transition">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-36 p-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 transition"
                      >
                        <Edit2 className="h-4 w-4 text-[#6A38C2]" />
                        <span>Edit Company</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan="4"
                className="text-center py-10 text-gray-500"
              >
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
