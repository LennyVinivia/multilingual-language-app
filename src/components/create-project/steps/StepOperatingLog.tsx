"use client";

import { LabeledInput } from "@/components/ui/labeled-input";
import { ProjectData } from "../CreateProjectPage";
import { InlineCheckboxGroup } from "@/components/ui/inline-checkbox-group";
import { FC } from "react";

interface OperationLogProps {
  data: ProjectData;
  onUpdateField: <K extends keyof ProjectData>(
    field: K,
    value: ProjectData[K]
  ) => void;
}

export const StepOperationLog: FC<OperationLogProps> = ({
  data,
  onUpdateField,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Operation log</h2>
      <div className="flex flex-col gap-4">
        <LabeledInput
          className="w-1/2"
          label="Project Title"
          value={data.title}
          onChange={(e) => onUpdateField("title", e.target.value)}
        />
        <hr className="my-4" />
        <InlineCheckboxGroup
          options={["ZH", "AG", "PT", "PN", "ST", "SN"]}
          selected={data.canton}
          onChange={(newSelected) => onUpdateField("canton", newSelected)}
        />
        <LabeledInput
          className="w-1/2"
          label="Date"
          type="date"
          value={data.date}
          onChange={(e) => onUpdateField("date", e.target.value)}
        />
        <hr className="my-4" />
        <InlineCheckboxGroup
          options={["HEF", "FU", "B/U", "EX"]}
          selected={data.placeholder}
          onChange={(newSelected) => onUpdateField("placeholder", newSelected)}
        />
        <div className="flex flex-1 gap-8 w-1/2">
          <LabeledInput
            className="flex-grow"
            label="Place of emergency"
            placeholder="Placeholder"
            value={data.placeOfEmergency}
            onChange={(e) => onUpdateField("placeOfEmergency", e.target.value)}
          />
          <LabeledInput
            className="flex-grow"
            label="Location/Postal Code"
            placeholder="Placeholder"
            value={data.locationPostalCode}
            onChange={(e) =>
              onUpdateField("locationPostalCode", e.target.value)
            }
          />
        </div>
        <hr className="my-4" />
        <InlineCheckboxGroup
          options={["Positive", "Negative", "Parallel", "Cancellation"]}
          selected={data.stateOfMind}
          onChange={(newSelected) => onUpdateField("stateOfMind", newSelected)}
        />
        <div className="flex gap-8">
          <LabeledInput
            label="Contact on site"
            placeholder="Placeholder"
            value={data.contact}
            onChange={(e) => onUpdateField("contact", e.target.value)}
          />
          <div className="flex justify-center items-center pt-6">
            <span className="mr-4">Call to:</span>
            <InlineCheckboxGroup
              options={["KAPO ZH", "STAPO Winterthur"]}
              selected={data.callTo}
              onChange={(newSelected) => onUpdateField("callTo", newSelected)}
            />
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-1 gap-8 w-1/2">
          <LabeledInput
            className="flex-grow"
            label="Mission Number"
            placeholder="Placeholder"
            value={data.placeOfEmergency}
            onChange={(e) => onUpdateField("placeOfEmergency", e.target.value)}
          />
          <LabeledInput
            className="flex-grow"
            label="Responsible Doctor"
            placeholder="Placeholder"
            value={data.locationPostalCode}
            onChange={(e) =>
              onUpdateField("locationPostalCode", e.target.value)
            }
          />
        </div>
      </div>
    </>
  );
};
