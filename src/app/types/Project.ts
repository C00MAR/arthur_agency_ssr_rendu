type Project = {
  id: string;
  name: string;
  image: string;
  description: string;
  url: string;
  year: string;
  category: string[];
  ProjectDetail?: ProjectDetail[];
};

type ProjectDetail = {
  id: string;
  context: string;
  objective: string;
  technology: string[];
  results: string;
  project: Project;
  projectId: string;
};

export type { Project, ProjectDetail };