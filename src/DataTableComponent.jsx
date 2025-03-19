import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as XLSX from "xlsx";

const DataTableComponent = () => {
  const profiles = useSelector((state) => state.profile);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const columns = [
    { title: "Shipping Line", field: "shippingLine" },
    { title: "Existing Booking Number", field: "ExistingBookingNumber" },
    { title: "Booking Number", field: "bookingNumber" },
    { title: "Our Reference", field: "ourReference" },
    { title: "Validity Date", field: "validityDate" },
    { title: "PDF Pickup Location", field: "pdfPickupLocation" },
    { title: "Pickup Location", field: "pickupLocation" },
    { title: "Pickup Date", field: "pickupDate" },
  ];

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/data-table" ? "table" : "form"
  );

  const filteredProfiles = profiles.filter((profile) =>
    columns.some((column) =>
      profile[column.field]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const field = sortConfig.key;
    if (a[field] < b[field]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[field] > b[field]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    setSortConfig((prev) => {
      const newDirection =
        prev.key === field && prev.direction === "asc" ? "desc" : "asc";
      return { key: field, direction: newDirection };
    });
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredProfiles);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profiles");
    XLSX.writeFile(workbook, "profiles.xlsx");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* Navigation Tabs */}
        <div className="relative w-fit max-w-md">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val)}
            className="w-fit max-w-md"
          >
            <TabsList className="relative bg-gray-200 p-2 rounded-lg flex space-x-4 overflow-hidden">
              <TabsTrigger value="form" className="relative px-4 py-3 transition-all duration-300 rounded-lg">
                <Link to="/">Form</Link>
              </TabsTrigger>
              <TabsTrigger value="table" className="relative px-4 py-3 transition-all duration-300 rounded-lg">
                <Link to="/data-table">Table</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Global Search Input */}
        <div className="flex gap-5"> 
        <button
              type="button"
              onClick={downloadExcel}
              className="cursor-pointer text-green-600"
            >
              <img src="/excel.png" alt="" />
          </button>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm rounded-lg px-4 py-2"
        />
        </div>
      </div>

      {/* Data Table */}
      <h2 className="text-2xl font-bold mb-4">Profile Data</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.field}
                onClick={() => handleSort(column.field)}
                className="cursor-pointer text-left"
              >
                <div className="flex items-center space-x-1">
                  <span>{column.title}</span>
                  {sortConfig.key === column.field && (
                    sortConfig.direction === "asc" ? 
                    // <ArrowUp size={16} /> 
                     ""
                    :
                    //  <ArrowDown size={16} />
                    ""
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProfiles.length > 0 ? (
            sortedProfiles.map((profile, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.field}>{profile[column.field]}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No matching results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableComponent;
