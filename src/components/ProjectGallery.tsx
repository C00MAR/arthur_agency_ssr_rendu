'use client'

import React, { useState } from 'react';
import { Project } from "@/app/types/Project";
import FilterPanel from './FilterPanel';
import HomeClient from './HomeClient';

interface ProjectGalleryProps {
    initialProjects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ initialProjects }) => {
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects);

    const handleFilterChange = (newFilteredProjects: Project[]) => {
        setTimeout(() => {
            setFilteredProjects(newFilteredProjects);
        }, 100);
    };

    return (
        <div className="relative min-h-screen">
            <FilterPanel 
                projects={initialProjects}
                onFilterChange={handleFilterChange}
            />
            <HomeClient projects={filteredProjects} />
        </div>
    );
};

export default ProjectGallery;