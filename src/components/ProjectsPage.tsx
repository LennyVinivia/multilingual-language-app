"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { SearchBar } from "@/components/SearchBar";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import placeholder from "@/public/img/placeholder.png";

type Project = {
  id: number;
  title: string;
  category: string;
  startDate: string;
  endDate?: string;
};

export default function ProjectsPageContent() {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Project Alpha",
      category: "Layers",
      startDate: "2018",
      endDate: "2020",
    },
    {
      id: 2,
      title: "Beta Testing",
      category: "Sisyphus",
      startDate: "2017",
      endDate: "2018",
    },
    {
      id: 3,
      title: "Catalog Explorer",
      category: "Catalog",
      startDate: "2021",
      endDate: "Present",
    },
    {
      id: 4,
      title: "Project Delta",
      category: "Layers",
      startDate: "2020",
      endDate: "2022",
    },
  ]);

  // For dynamic search
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // For multi-select categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // For single-select date range
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
    null
  );

  // Debounce searchTerm updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // The actual filtering logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (debouncedSearchTerm) {
        const lowerTerm = debouncedSearchTerm.toLowerCase();
        const titleMatches = p.title.toLowerCase().includes(lowerTerm);
        const categoryMatches = p.category.toLowerCase().includes(lowerTerm);

        if (!titleMatches && !categoryMatches) {
          return false;
        }
      }
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      ) {
        return false;
      }

      if (selectedDateRange) {
        if (selectedDateRange === "2021-Present") {
          const startYear = parseInt(p.startDate);
          if (isNaN(startYear) || startYear < 2021) {
            return false;
          }
        } else {
          const [from, to] = selectedDateRange.split("-");
          const fromYear = parseInt(from);
          const toYear = parseInt(to);
          const startYear = parseInt(p.startDate);
          const endYear = parseInt(p.endDate ?? "9999");
          if (
            isNaN(fromYear) ||
            isNaN(toYear) ||
            isNaN(startYear) ||
            isNaN(endYear)
          ) {
            return false;
          }
          if (startYear < fromYear || endYear > toYear) {
            return false;
          }
        }
      }

      return true;
    });
  }, [projects, debouncedSearchTerm, selectedCategories, selectedDateRange]);
  const categoryFilters = ["Layers", "Sisyphus", "Catalog"];
  const dateFilters = ["2017-2018", "2018-2020", "2021-Present"];

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="flex gap-4 justify-center items-center mb-8">
        <h1 className="flex-grow text-2xl font-bold">Projects</h1>
        <SearchBar
          placeholder="Search Project by Name"
          onSearch={(val) => setSearchTerm(val)}
          dynamic
        />
        <Button>Create Project</Button>
      </div>
      <div className="flex gap-2 mb-8">
        <FilterDropdown
          name="Categories"
          filters={categoryFilters}
          selected={selectedCategories}
          onChange={setSelectedCategories}
          multi={true}
        />
        <FilterDropdown
          name="Date Range"
          filters={dateFilters}
          selected={selectedDateRange ? [selectedDateRange] : []}
          onChange={(arr) => setSelectedDateRange(arr[0] || null)}
          multi={false}
        />
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {filteredProjects.map((proj) => (
          <ProjectCard
            key={proj.id}
            title={proj.title}
            category={proj.category}
            startDate={proj.startDate}
            endDate={proj.endDate}
            iconUrl={placeholder}
          />
        ))}
      </div>
    </div>
  );
}
