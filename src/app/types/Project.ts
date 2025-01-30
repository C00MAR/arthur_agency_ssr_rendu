type BaseProjectDetail = {
  id?: string;
  context?: string;
  objective?: string;
  technology: string[];
  results?: string;
  projectId?: string;
};

type Project = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  url: string;
  year: string;
  category: string[];
  ProjectDetail?: BaseProjectDetail[];
};

type ProjectDetail = {
  id: string;
  context: string;
  objective: string;
  technology: string[];
  results: string;
  projectId: string;
  project: Omit<Project, 'ProjectDetail'>;
};

export type { Project, ProjectDetail };