type Project = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  url: string;
  year: string;
  category: string[];
  ProjectDetail?: Partial<Omit<ProjectDetail, 'project'>>[];
};

type ProjectDetail = {
  id: string;
  context: string;
  objective: string;
  technology: string[];
  results: string;
  project: Omit<Project, 'ProjectDetail'>;
  projectId: string;
};

export type { Project, ProjectDetail };