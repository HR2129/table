import React from "react";
import { useSelector } from "react-redux";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const DataTableComponent = () => {
  const profiles = useSelector((state) => state.profile);
  const columns = [
    { title: 'Shipping Line', field: 'shippingLine' },
    { title: 'Existing Booking Number', field: 'ExistingBookingNumber' },
    { title: 'Booking Number', field: 'bookingNumber' },
    { title: 'Our Reference', field: 'ourReference' },
    { title: 'Validity Date', field: 'validityDate' },
    { title: 'PDF Pickup Location', field: 'pdfPickupLocation' },
    { title: 'Pickup Location', field: 'pickupLocation' },
    { title: 'Pickup Date', field: 'pickupDate' }
  ];

  return (
    <div>
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
                <TableCell key={column.field}>{profile[column.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableComponent;