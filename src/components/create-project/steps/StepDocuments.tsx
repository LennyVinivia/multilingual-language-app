"use client";

import { ProjectData } from "../CreateProjectPage";
import { ScanButton } from "@/components/ui/scan-button";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FC, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DocumentsProps {
  data: ProjectData;
  onUpdateField: <K extends keyof ProjectData>(
    field: K,
    value: ProjectData[K]
  ) => void;
}

type DocType = "id" | "insurance";
type DocSide = "front" | "back";

export const StepDocuments: FC<DocumentsProps> = ({ data, onUpdateField }) => {
  const [showWebcam, setShowWebcam] = useState<{
    docType: DocType;
    docSide: DocSide;
  } | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    facingMode: "environment",
  };

  const handleOpenWebcam = (docType: DocType, docSide: DocSide) => {
    setShowWebcam({ docType, docSide });
  };

  const handleCapture = () => {
    if (!showWebcam) return;
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // figure out which field to update
        if (showWebcam.docType === "id") {
          if (showWebcam.docSide === "front") {
            onUpdateField("idFrontImage", imageSrc);
          } else {
            onUpdateField("idBackImage", imageSrc);
          }
        } else {
          // insurance
          if (showWebcam.docSide === "front") {
            onUpdateField("insuranceFrontImage", imageSrc);
          } else {
            onUpdateField("insuranceBackImage", imageSrc);
          }
        }
      }
    }
    setShowWebcam(null);
  };

  const handleRetake = (docType: DocType, docSide: DocSide) => {
    if (docType === "id") {
      if (docSide === "front") {
        onUpdateField("idFrontImage", null);
      } else {
        onUpdateField("idBackImage", null);
      }
    } else {
      if (docSide === "front") {
        onUpdateField("insuranceFrontImage", null);
      } else {
        onUpdateField("insuranceBackImage", null);
      }
    }
    // Re-open webcam to recapture
    setShowWebcam({ docType, docSide });
  };

  const handleCancel = () => {
    setShowWebcam(null);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Documents</h2>

      {/* ID Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-center">ID Card</h3>
        <div className="flex gap-8 items-center justify-center">
          {/* FRONT IMAGE / SCAN BUTTON */}
          {data.idFrontImage ? (
            <div className="flex flex-col items-center">
              <Image
                src={data.idFrontImage}
                alt="ID Front"
                width={192}
                height={192}
                style={{ objectFit: "contain" }}
                className="border border-gray-300 rounded"
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => handleRetake("id", "front")}
              >
                Retake Front
              </Button>
            </div>
          ) : (
            <ScanButton
              label="ID Front"
              icon={<MdOutlineDocumentScanner className="h-12 w-12" />}
              isScanned={false} // no image => false
              onClick={() => handleOpenWebcam("id", "front")}
            />
          )}

          {/* BACK IMAGE / SCAN BUTTON */}
          {data.idBackImage ? (
            <div className="flex flex-col items-center">
              <Image
                src={data.idBackImage}
                alt="ID Back"
                width={192}
                height={192}
                style={{ objectFit: "contain" }}
                className="border border-gray-300 rounded"
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => handleRetake("id", "back")}
              >
                Retake Back
              </Button>
            </div>
          ) : (
            <ScanButton
              label="ID Back"
              icon={<MdOutlineDocumentScanner className="h-12 w-12" />}
              isScanned={false}
              onClick={() => handleOpenWebcam("id", "back")}
            />
          )}
        </div>
      </div>

      {/* Insurance Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-center">
          Insurance Card
        </h3>
        <div className="flex gap-8 items-center justify-center">
          {/* FRONT IMAGE / SCAN BUTTON */}
          {data.insuranceFrontImage ? (
            <div className="flex flex-col items-center">
              <Image
                src={data.insuranceFrontImage}
                alt="Insurance Front"
                width={192}
                height={192}
                style={{ objectFit: "contain" }}
                className="border border-gray-300 rounded"
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => handleRetake("insurance", "front")}
              >
                Retake Front
              </Button>
            </div>
          ) : (
            <ScanButton
              label="Insurance Front"
              icon={<MdOutlineDocumentScanner className="h-12 w-12" />}
              isScanned={false}
              onClick={() => handleOpenWebcam("insurance", "front")}
            />
          )}

          {/* BACK IMAGE / SCAN BUTTON */}
          {data.insuranceBackImage ? (
            <div className="flex flex-col items-center">
              <Image
                src={data.insuranceBackImage}
                alt="Insurance Back"
                width={192}
                height={192}
                style={{ objectFit: "contain" }}
                className="border border-gray-300 rounded"
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => handleRetake("insurance", "back")}
              >
                Retake Back
              </Button>
            </div>
          ) : (
            <ScanButton
              label="Insurance Back"
              icon={<MdOutlineDocumentScanner className="h-12 w-12" />}
              isScanned={false}
              onClick={() => handleOpenWebcam("insurance", "back")}
            />
          )}
        </div>
      </div>

      {/* WEBCAM OVERLAY (if showWebcam is not null) */}
      {showWebcam && (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="border border-gray-300 rounded"
            style={{ width: "300px", height: "auto" }}
          />
          <div className="mt-2 flex gap-4">
            <Button variant="default" onClick={handleCapture}>
              Capture
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
