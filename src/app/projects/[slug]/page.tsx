import { getProject } from "@/lib/action";
import { Project, ProjectDetail } from "@/app/types/Project";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

const ProjectDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const routeSlug = await params;
  const project: Project = await getProject(routeSlug.slug);
  console.log(project);

  if (!project) {
    notFound();
  }

  const projectDetail = project.ProjectDetail?.[0];
  console.log(projectDetail);

  return (
    <>
      <div className="flex flex-col justify-center mt-40 p-6 md:px-40">
        <Link
          className="font-normal underline underline-offset-2 w-fit mb-12"
          href="/"
        >
          Back
        </Link>
        <div className="flex justify-between mb-4 items-end">
          <h1 className="text-4xl">{project.name}</h1>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.url}
            className="uppercase font-thin"
          >
            Visit
          </a>
        </div>
        <div className="bg-black h-[.5px] mb-4"></div>
        <p className="mb-4 text-lg">{project.description}</p>
        <Image
          src={project.image}
          alt={project.name}
          width={600}
          height={600}
          priority
          className="w-full"
        />

        <div className="mt-6 md:mt-20 mb-40">
          <ul className="flex gap-4">
            {projectDetail?.technology.map((tech, index) => (
              <li className="text-sm px-4 py-2 bg-black/70 rounded-full text-white" key={index}>{tech}</li>
            ))}
          </ul>
          <p className="mt-12 text-lg font-normal">{projectDetail?.context} {" "} {projectDetail?.objective}</p>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
