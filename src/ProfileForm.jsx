// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { addProfile } from "./profileSlice";
// import { Link } from "react-router-dom";

// export default function ProfileForm() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const dispatch = useDispatch();

//   const onSubmit = (data) => {
//     dispatch(addProfile(data));
//     console.log("Form submitted:", JSON.stringify(data, null, 2));
//   };

//   return (
//     <div className="w-full h-full mx-auto bg-white p-2 rounded-lg">
//       <div className="text-white bg-gradient-to-r from-gray-500 to-gray-800 p-3 rounded-t-lg justify-center flex"> 
//         <h1 className="font-bold">Port Details/Schedule</h1>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
//         <div className="grid grid-cols-3 gap-4">
//           <div className="flex flex-col">
//             <label>Shipping Line <span className="text-red-600">*</span></label>
//             <input type="number" {...register("shippingLine", { required: true })} placeholder="Select Shipping Line" className="p-2 m-2 border-gray-250 border rounded-lg"/>
//             {errors.shippingLine && <span className="text-red-600">Shipping Line is required</span>}
//           </div>
//           <div className="flex flex-col">
//             <label>Existing Booking Number</label>
//             <input type="number" {...register("ExistingBookingNumber")} placeholder="Select an Existing Booking Number" className="p-2 m-2 border-gray-250 border rounded-lg"/>
//           </div>
//           <div className="flex flex-col">
//             <label>Booking Number <span className="text-red-600">*</span></label>
//             <input type="text" {...register("bookingNumber", { required: true })} className="p-2 m-2 border-gray-250 border rounded-lg"/>
//             {errors.bookingNumber && <span className="text-red-600">Booking Number is required</span>}
//           </div>
//           <div className="flex flex-col">
//             <label>Our Reference</label>
//             <input {...register("ourReference")} className="p-2 m-2 border-gray-250 border rounded-lg"/>
//           </div>
//           <div className="flex flex-col">
//             <label>Validity Date <span className="text-red-600">*</span></label>
//             <input type="date" {...register("validityDate", { required: true })} className="p-2 m-2 border-gray-250 border rounded-lg"/>
//             {errors.validityDate && <span className="text-red-600">Validity Date is required</span>}
//           </div>
//           <div className="flex flex-col">
//             <label>Pickup Location (PDF Extraction)</label>
//             <textarea {...register("pdfPickupLocation")} className="p-2 m-2 border-gray-250 border rounded-lg"/>
//           </div>
//           <div className="flex flex-col">
//             <label>Pickup Location <span className="text-red-600">*</span></label>
//             <input {...register("pickupLocation", { required: true })} className="p-2 m-2 border-gray-250 border rounded-lg"/>
//             {errors.pickupLocation && <span className="text-red-600">Pickup Location is required</span>}
//           </div>
//           <div className="flex flex-col">
//             <label>Pickup Date <span className="text-red-600">*</span></label>
//             <input type="date" {...register("pickupDate", { required: true })} className="p-2 m-2 border-gray-250 border rounded-lg"/>
//             {errors.pickupDate && <span className="text-red-600">Pickup Date is required</span>}
//           </div>
//         </div>
//         <div className="flex justify-center items-center">
//           <button type="submit" className="cursor-pointer border-gray-250 border rounded-lg px-3 py-2 bg-gradient-to-l from-gray-500 to-gray-800 text-white">Submit</button>
//           <Link to='/data-table'>
//           hiiiii</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useDispatch } from "react-redux";
import { addProfile } from "./profileSlice";
import { Link } from "react-router-dom";

const schema = z.object({
  shippingLine: z.string().nonempty({ message: "Shipping Line is required" }),
  ExistingBookingNumber: z.string().optional(),
  bookingNumber: z.string().nonempty({ message: "Booking Number is required" }),
  ourReference: z.string().optional(),
  validityDate: z.string().nonempty({ message: "Validity Date is required" }),
  pdfPickupLocation: z.string().optional(),
  pickupLocation: z.string().nonempty({ message: "Pickup Location is required" }),
  pickupDate: z.string().nonempty({ message: "Pickup Date is required" }),
});

export default function ProfileForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      shippingLine: "",
      ExistingBookingNumber: "",
      bookingNumber: "",
      ourReference: "",
      validityDate: "",
      pdfPickupLocation: "",
      pickupLocation: "",
      pickupDate: "",
    },
  });

  const { handleSubmit, control, formState: { errors }, reset } = methods;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addProfile(data));
    console.log("Form submitted:", JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div className="w-full h-full mx-auto bg-white p-2 rounded-lg">
      <div className="text-white bg-gradient-to-r from-gray-500 to-gray-800 p-3 rounded-t-lg justify-center flex"> 
        <h1 className="font-bold">Port Details/Schedule</h1>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "shippingLine", label: "Shipping Line" },
              { name: "ExistingBookingNumber", label: "Existing Booking Number" },
              { name: "bookingNumber", label: "Booking Number" },
              { name: "ourReference", label: "Our Reference" },
              { name: "validityDate", label: "Validity Date", type: "date" },
              { name: "pdfPickupLocation", label: "Pickup Location (PDF Extraction)", type: "textarea" },
              { name: "pickupLocation", label: "Pickup Location" },
              { name: "pickupDate", label: "Pickup Date", type: "date" },
            ].map(({ name, label, type }) => (
              <FormField
                key={name}
                control={control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {type === "textarea" ? (
                        <textarea {...field} className="p-2 m-2 border-gray-250 border rounded-lg" />
                      ) : (
                        <input type={type || "text"} {...field} className="p-2 m-2 border-gray-250 border rounded-lg" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button type="submit" className="cursor-pointer border-gray-250 border rounded-lg px-3 py-2 bg-gradient-to-l from-gray-500 to-gray-800 text-white">Submit</button>
            <Link to='/data-table'>hiiiii</Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
