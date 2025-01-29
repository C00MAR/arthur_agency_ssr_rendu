import { getProject } from "@/lib/action";
import { Project } from "@/app/types/Project";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const ProjectDetails = async ({ params }: Props) => {
  const project: Project | null = await getProject(params.id);
  
  if (!project) {
    notFound();
  }

  return <>
    <h1>{project.name}</h1>
    <Image src={project.image} alt={project.name} width={600} height={600} />
    <p>{project.description}</p>
    <a href={project.url}>Visit website</a>
  </>;
};

export default ProjectDetails;