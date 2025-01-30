type BaseProjectDetail = {
  id: string;
  context: string;
  objective: string;
  technology: string[];
  results: string;
  projectId: string;
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
  ProjectDetail?: Partial<Omit<BaseProjectDetail, 'project'>>[];
};

type ProjectDetail = BaseProjectDetail & {
  project: Omit<Project, 'ProjectDetail'>;
};

export type { Project, ProjectDetail };