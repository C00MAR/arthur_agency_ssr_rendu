import { getProject } from "@/lib/action";
import { Project } from "@/app/types/Project";
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

  if (!project) {
    notFound();
  }

  return (
    <>
      <Link href="/">Back</Link>
      <div className="flex flex-col items-center justify-center mt-40">
        <h1 className="text-4xl pb-4 mb-2">{project.name}</h1>
        <div className="w-1/2 bg-black h-0.5 mb-4"></div>
        <p className="mb-4 text-lg">{project.description}</p>
        <Image
          src={project.image}
          alt={project.name}
          width={600}
          height={600}
          priority
        />
        <a
          className="text-lg mt-4 mb-20 bg-black text-white border border-black px-4 py-2 rounded-3xl"
          target="_blank"
          rel="noopener noreferrer"
          href={project.url}
        >
          Visit website
        </a>
      </div>
    </>
  );
};

export default ProjectDetails;
