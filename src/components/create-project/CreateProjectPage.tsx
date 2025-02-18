"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StepOperationLog } from "./steps/StepOperatingLog";
import { StepOperatingTime } from "./steps/StepOperatingTime";
import { StepDocuments } from "./steps/StepDocuments";

export type Patient = {
  name: string;
  firstName: string;
  birthdate: string;
  gender: "M" | "W" | "";
  nationality: string;
  address: string;
  postalCode: string;
  city: string;
  insuranceNumber: string;
  ahvNumber: string;
  delikt?: string;
};

export type ProjectData = {
  title: string;
  call: string;
  arrival: string;
  endOfMission: string;
  departurePlace: string;
  departureTime: string;
  milesTool: string;
  placeOfOffense: string;
  date: string;
  placeOfEmergency: string;
  locationPostalCode: string;
  canton: string | null;
  placeholder: string | null;
  stateOfMind: string | null;
  contact: string;
  callTo: string | null;
  missionNumber: string;
  responsibleDoctor: string;
  scannedId?: boolean;
  scannedInsurance?: boolean;
  idFrontImage?: string | null;
  idBackImage?: string | null;
  insuranceFrontImage?: string | null;
  insuranceBackImage: string | null;
  patients: Patient[];
};

export default function CreateProjectPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ProjectData>({
    title: "",
    call: "",
    arrival: "",
    endOfMission: "",
    departurePlace: "",
    departureTime: "",
    milesTool: "",
    placeOfOffense: "",
    date: "",
    placeOfEmergency: "",
    locationPostalCode: "",
    canton: null,
    placeholder: null,
    stateOfMind: null,
    contact: "",
    callTo: null,
    missionNumber: "",
    responsibleDoctor: "",
    scannedId: false,
    scannedInsurance: false,
    idFrontImage: null,
    idBackImage: null,
    insuranceFrontImage: null,
    insuranceBackImage: null,
    patients: [],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateField = <K extends keyof ProjectData>(
    field: K,
    value: ProjectData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    router.back();
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSave = () => {
    console.log("Final data:", formData);
    router.push("/");
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-8 flex gap-4 items-center">
        <h1 className="flex-grow text-2xl font-bold">Create a New Project</h1>
        {currentStep === 1 && (
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        {currentStep > 1 && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}

        {currentStep < 3 && <Button onClick={handleNext}>Next</Button>}
        {currentStep === 3 && <Button onClick={handleSave}>Save</Button>}
      </div>

      <div className="container mx-auto px-4 pt-6 pb-16">
        <div className="bg-white rounded-md shadow p-8">
          {currentStep === 1 && (
            <StepOperationLog data={formData} onUpdateField={updateField} />
          )}
          {currentStep === 2 && (
            <StepOperatingTime data={formData} onUpdateField={updateField} />
          )}
          {currentStep === 3 && (
            <StepDocuments data={formData} onUpdateField={updateField} />
          )}
        </div>
      </div>
    </div>
  );
}
