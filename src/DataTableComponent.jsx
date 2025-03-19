// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Link, useLocation } from "react-router-dom";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import * as XLSX from "xlsx";

// const DataTableComponent = () => {
//   const profiles = useSelector((state) => state.profile);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [searchQueries, setSearchQueries] = useState({});
//   const [visibleSearch, setVisibleSearch] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const columns = [
//     { title: "Shipping Line", field: "shippingLine" },
//     { title: "Existing Booking Number", field: "ExistingBookingNumber" },
//     { title: "Booking Number", field: "bookingNumber" },
//     { title: "Our Reference", field: "ourReference" },
//     { title: "Validity Date", field: "validityDate" },
//     { title: "PDF Pickup Location", field: "pdfPickupLocation" },
//     { title: "Pickup Location", field: "pickupLocation" },
//     { title: "Pickup Date", field: "pickupDate" },
//   ];

//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState(
//     location.pathname === "/data-table" ? "table" : "form"
//   );

//   // const filteredProfiles = profiles.filter((profile) =>
//   //   Object.values(profile).some((value) =>
//   //     value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
//   //   ) &&
//   //   columns.every((column) => {
//   //     const query = searchQueries[column.field]?.toLowerCase() || "";
//   //     return query ? profile[column.field]?.toLowerCase().includes(query) : true;
//   //   })
//   // );
  


//   const filteredProfiles = profiles.filter((profile) => {
//     const generalSearchMatch = searchQuery
//       ? columns.some((column) =>
//           profile[column.field]?.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : true;
  
//     const columnSearchMatch = columns.every((column) => {
//       const query = searchQueries[column.field]?.toLowerCase() || "";
//       return query ? profile[column.field]?.toLowerCase().includes(query) : true;
//     });
  
//     return generalSearchMatch && columnSearchMatch;
//   });

//   const sortedProfiles = [...filteredProfiles].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const field = sortConfig.key;
//     if (a[field] < b[field]) return sortConfig.direction === "asc" ? -1 : 1;
//     if (a[field] > b[field]) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   const handleSort = (field) => {
//     setSortConfig((prev) => {
//       const newDirection =
//         prev.key === field && prev.direction === "asc" ? "desc" : "asc";
//       return { key: field, direction: newDirection };
//     });
//   };

//   const downloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredProfiles);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Profiles");
//     XLSX.writeFile(workbook, "profiles.xlsx");
//   };


//   const handleSearchChange = (field, value) => {
//     setSearchQueries((prev) => ({ ...prev, [field]: value }));
//   };

//   const toggleSearchVisibility = (field) => {
//     setVisibleSearch((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
//   const paginatedProfiles = filteredProfiles.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );


//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         {/* Navigation Tabs */}
//         <div className="relative w-fit max-w-md">
//           <Tabs
//             value={activeTab}
//             onValueChange={(val) => setActiveTab(val)}
//             className="w-fit max-w-md"
//           >
//             <TabsList className="relative bg-gray-200 p-2 rounded-lg flex space-x-4 overflow-hidden">
//               <TabsTrigger value="form" className="relative px-4 py-3 transition-all duration-300 rounded-lg">
//                 <Link to="/">Form</Link>
//               </TabsTrigger>
//               <TabsTrigger value="table" className="relative px-4 py-3 transition-all duration-300 rounded-lg">
//                 <Link to="/data-table">Table</Link>
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>

//         {/* Global Search Input */}
//         <div className="flex gap-5"> 
//         <button
//               type="button"
//               onClick={downloadExcel}
//               className="cursor-pointer text-green-600"
//             >
//               <img src="/excel.png" alt="" />
//           </button>
//         <Input
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full max-w-sm rounded-lg px-4 py-2"
//         />
//         </div>
//       </div>

//       {/* Data Table */}
//       <h2 className="text-2xl font-bold mb-4">Profile Data</h2>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             {columns.map((column) => (
//               <> 
//                 <TableHead
//                 key={column.field}
//                 onClick={() => handleSort(column.field)}
//                 className="cursor-pointer text-left "
//               >
//                 <div className="flex items-center space-x-1" >
//                 <span  className="cursor-pointer ">{column.title}</span>
//                   {sortConfig.key === column.field && (
//                     sortConfig.direction === "asc" ? 
//                     // <ArrowUp size={16} /> 
//                      ""
//                     :
//                     //  <ArrowDown size={16} />
//                     ""
//                   )}
//                   <h1 onClick={() => toggleSearchVisibility(column.field)} className="cursor-pointer p-2" >⫶</h1>
                  
//                 </div>
//                 {visibleSearch[column.field] && (
//                   <Input
//                     placeholder={`Search ${column.title}`}
//                     value={searchQueries[column.field] || ""}
//                     onChange={(e) => handleSearchChange(column.field, e.target.value)}
//                     className="w-full mt-2 rounded-lg px-2 py-1"
                    
//                   />
//                 )}
//               </TableHead>
              
//               </>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {sortedProfiles.length > 0 ? (
//             sortedProfiles.map((profile, index) => (
//               <TableRow key={index}>
//                 {columns.map((column) => (
//                   <TableCell key={column.field}>{profile[column.field]}</TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="text-center py-4">
//                 No matching results found
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <div className="flex justify-between items-center mt-4">
//         <span>Total: {filteredProfiles.length} records</span>
//         {/* <span>Page {currentPage} of {totalPages}</span> */}
//       </div>
//       <div className="flex justify-between items-center mt-4">
//         <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default DataTableComponent;


import React, { useState, useEffect } from "react";
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
import { MoreHorizontal } from "lucide-react";

const DataTableComponent = () => {
  const profiles = useSelector((state) => state.profile);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueries, setSearchQueries] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [visibleSearch, setVisibleSearch] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const filteredProfiles = profiles.filter((profile) => {
    const generalSearchMatch = searchQuery
      ? columns.some((column) =>
          profile[column.field]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;

    const columnSearchMatch = columns.every((column) => {
      const query = searchQueries[column.field]?.toLowerCase() || "";
      return query ? profile[column.field]?.toLowerCase().includes(query) : true;
    });

    return generalSearchMatch && columnSearchMatch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchQueries]);

  const handleSort = (field) => {
    setSortConfig((prev) => {
      const newDirection =
        prev.key === field && prev.direction === "asc" ? "desc" : "asc";
      return { key: field, direction: newDirection };
    });
  };

  const handleSearchChange = (field, value) => {
    setSearchQueries((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSearchVisibility = (field) => {
    setVisibleSearch((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredProfiles);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profiles");
    XLSX.writeFile(workbook, "profiles.xlsx");
  };

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
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
        <div className="flex gap-5"> 
          <button type="button" onClick={downloadExcel} className="cursor-pointer text-green-600">
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

      <h2 className="text-2xl font-bold mb-4">Profile Data</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.field} className="text-left">
                <div className="flex items-center space-x-2">
                  <span onClick={(e) => e.target.tagName !== "INPUT" && handleSort(column.field)} className="cursor-pointer">{column.title}</span>
                  <h1 onClick={() => toggleSearchVisibility(column.field)} className="cursor-pointer p-2" >⫶</h1>
                </div>
                {visibleSearch[column.field] && (
                  <Input
                    placeholder={`Search ${column.title}`}
                    value={searchQueries[column.field] || ""}
                    onChange={(e) => handleSearchChange(column.field, e.target.value)}
                    className="w-full mt-2 rounded-lg px-2 py-1"
                  />
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProfiles.length > 0 ? (
            paginatedProfiles.map((profile, index) => (
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
      <div className="flex justify-between items-center mt-4">
      <span>Total: {filteredProfiles.length} records</span>
        <div className="flex gap-5 ">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="cursor-pointer">Previous</button>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="cursor-pointer">Next</button>
        </div>
        <span>Page {currentPage} of {totalPages}</span>
      </div>
    </div>
  );
};

export default DataTableComponent;
