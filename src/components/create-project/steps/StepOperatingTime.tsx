"use client";

import { ProjectData } from "../CreateProjectPage";
import { LabeledInput } from "@/components/ui/labeled-input";
import { FC } from "react";

interface OperatingTimeProps {
  data: ProjectData;
  onUpdateField: <K extends keyof ProjectData>(
    field: K,
    value: ProjectData[K]
  ) => void;
}

export const StepOperatingTime: FC<OperatingTimeProps> = ({
  data,
  onUpdateField,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Operating time</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <LabeledInput
            label="Call"
            value={data.call}
            onChange={(e) => onUpdateField("call", e.target.value)}
          />
          <LabeledInput
            label="Arrival"
            value={data.arrival}
            onChange={(e) => onUpdateField("arrival", e.target.value)}
          />
          <LabeledInput
            label="End of mission"
            value={data.endOfMission}
            onChange={(e) => onUpdateField("endOfMission", e.target.value)}
          />
          <LabeledInput
            label="Place of departure"
            value={data.departurePlace}
            onChange={(e) => onUpdateField("departurePlace", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <LabeledInput
            label="Departure"
            value={data.departureTime}
            onChange={(e) => onUpdateField("departureTime", e.target.value)}
          />
          <LabeledInput
            label="Miles tool"
            value={data.milesTool}
            onChange={(e) => onUpdateField("milesTool", e.target.value)}
          />
          <LabeledInput
            label="Place of offense"
            value={data.placeOfOffense}
            onChange={(e) => onUpdateField("placeOfOffense", e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
