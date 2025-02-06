"use client";

import { ProjectData } from "../CreateProjectPage";
import { ScanButton } from "@/components/ui/scan-button";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FC } from "react";

interface DocumentsProps {
  data: ProjectData;
  onUpdateField: <K extends keyof ProjectData>(
    field: K,
    value: ProjectData[K]
  ) => void;
}

export const StepDocuments: FC<DocumentsProps> = ({ data, onUpdateField }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Documents</h2>
      <div className="flex gap-8 align-center justify-center pt-16 pb-24">
        {/* ID */}
        <ScanButton
          label="ID"
          icon={<MdOutlineDocumentScanner className="h-12 w-12" />}
          isScanned={data.scannedId}
          onClick={() => onUpdateField("scannedId", true)}
        />

        {/* Insurance */}
        <ScanButton
          label="Insurance"
          icon={<MdOutlineDocumentScanner className="h-12 w-12" />}
          isScanned={data.scannedInsurance}
          onClick={() => onUpdateField("scannedInsurance", true)}
        />
      </div>
    </>
  );
};
