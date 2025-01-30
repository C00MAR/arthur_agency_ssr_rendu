import React, { useState } from 'react';
import { Project } from "@/app/types/Project";

interface FilterPanelProps {
    projects: Project[];
    onFilterChange: (filteredProjects: Project[]) => void;
}

const FilterPanel = ({ projects, onFilterChange }: FilterPanelProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);

    // Get unique categories
    const categories = Array.from(new Set(projects.flatMap(p => p.category)));
    
    // Get unique technologies from ProjectDetail
    const technologies = Array.from(new Set(
        projects.flatMap(p => 
            p.ProjectDetail
                ? p.ProjectDetail.flatMap(detail => detail.technology)
                : []
        )
    ));

    const toggleCategory = (category: string) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newCategories);
        applyFilters(newCategories, selectedTechnologies);
    };

    const toggleTechnology = (technology: string) => {
        const newTechnologies = selectedTechnologies.includes(technology)
            ? selectedTechnologies.filter(t => t !== technology)
            : [...selectedTechnologies, technology];
        setSelectedTechnologies(newTechnologies);
        applyFilters(selectedCategories, newTechnologies);
    };

    const applyFilters = (categories: string[], technologies: string[]) => {
        let filteredProjects = [...projects];

        if (categories.length > 0) {
            filteredProjects = filteredProjects.filter(project =>
                categories.some(cat => project.category.includes(cat))
            );
        }

        if (technologies.length > 0) {
            filteredProjects = filteredProjects.filter(project =>
                project.ProjectDetail?.some(detail =>
                    technologies.some(tech => detail.technology.includes(tech))
                )
            );
        }

        onFilterChange(filteredProjects);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedTechnologies([]);
        onFilterChange(projects);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-all duration-300"
            >
                <span className="sr-only">Toggle filters</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            </button>

            {isExpanded && (
                <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category, index) => (
                                    <label key={`category-${category}-${index}`} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => toggleCategory(category)}
                                            className="rounded border-gray-300 w-fit"
                                        />
                                        <span className="text-sm">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Technologies</h3>
                            <div className="space-y-2">
                                {technologies.map((tech, index) => (
                                    <label key={`tech-${tech}-${index}`} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedTechnologies.includes(tech)}
                                            onChange={() => toggleTechnology(tech)}
                                            className="rounded border-gray-300 w-fit"
                                        />
                                        <span className="text-sm">{tech}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {(selectedCategories.length > 0 || selectedTechnologies.length > 0) && (
                            <button
                                onClick={clearFilters}
                                className="w-full bg-gray-100 text-gray-600 rounded py-2 text-sm hover:bg-gray-200 transition-colors"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;