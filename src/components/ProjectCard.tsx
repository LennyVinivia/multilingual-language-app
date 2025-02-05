"use client";

import { FC } from "react";
import Image, { StaticImageData } from "next/image";

interface ProjectCardProps {
  title: string;
  category: string;
  startDate: string;
  endDate?: string;
  iconUrl?: string | StaticImageData;
  onViewProject?: () => void;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  title,
  category,
  startDate,
  endDate = "Present",
  iconUrl,
  onViewProject,
}) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 border w-full max-w-sm">
      <div className="flex items-start gap-3 mb-3">
        {iconUrl && (
          <div className="w-12 h-12 relative flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={iconUrl}
              alt={`Icon for ${title}`}
              fill
              sizes="48px"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {startDate} – {endDate}
      </p>

      <hr className="my-2 mx-[-1.5rem]" />

      <div className="text-right pt-2">
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={onViewProject}
        >
          View project
        </button>
      </div>
    </div>
  );
};
