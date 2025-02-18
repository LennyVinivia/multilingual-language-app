"use client";

import Image from "next/image";
import placeholder from "@/public/img/placeholder.png";

export default function PatientDetail() {
  return (
    <div className="container mx-auto px-4 pt-28">
      <div className="flex gap-4 mb-8 items-center">
        <Image
          src={placeholder}
          alt="Placeholder for Patient Image"
          className="rounded-full w-32 h-32 object-cover border-2 border-black border-spacing-1"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Olivia Rhye</h2>
          <span className="text-[#667085] text-sm">Female</span>
        </div>
      </div>
      <h3 className="font-semibold text-lg">Nationality</h3>
      <span className="text-[#667085] text-sm">Spain</span>
      <hr className="my-4" />
      <div className="flex gap-8 mb-8">
        <div className="flex-1 flex flex-col">
          <span className="font-bold">Location</span>
          <span>Melbourne, Australia</span>
        </div>
        <div className="flex-1 flex flex-col">
          <span className="font-bold">Date of Birth</span>
          <span>04/08/1997</span>
        </div>
        <div className="flex-1 flex flex-col">
          <span className="font-bold">Address</span>
          <span>150 Brunswick Street Fitzroy VIC 3065 AU</span>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex-1 flex flex-col">
          <span className="font-bold">Postal Code</span>
          <span>54000</span>
        </div>
        <div className="flex-1 flex flex-col">
          <span className="font-bold">Health Insurance Number</span>
          <span>42537467634</span>
        </div>
        <div className="flex-1 flex flex-col">
          <span className="font-bold">Social Security Number</span>
          <span>52525</span>
        </div>
      </div>
    </div>
  );
}
