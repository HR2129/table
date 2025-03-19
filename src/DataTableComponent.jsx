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
import { Link, useLocation } from "react-router-dom";

const DataTableComponent = () => {
  const profiles = useSelector((state) => state.profile);
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

  const activeIndex = location.pathname === "/" ? 0 : 1;

  return (
    <div className="p-2">
      <div className="relative w-fit max-w-md ">
        <div className="flex space-x-4  bg-gray-100 m-2 rounded-lg relative overflow-hidden">
          <Link
            to="/"
            className={`relative px-4 py-2  transition-all duration-300 rounded-lg z-10 ${
              activeIndex === 0 ? "text-white" : ""
            }`}
          >
            Form
          </Link>
          <Link
            to="/data-table"
            className={`relative px-2.5 py-2 text-gray-700 transition-all duration-300 rounded-lg z-10 ${
              activeIndex === 1 ? "text-white" : ""
            }`}
          >
            Table
          </Link>
          <div
            className="absolute bottom-0 left-0 w-20 h-10 bg-gray-800 rounded-lg transition-all duration-300 z-0"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          ></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Profile Data</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.field}>{column.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {profile[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableComponent;
