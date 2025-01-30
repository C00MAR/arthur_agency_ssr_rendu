import { getAllProjects } from "@/lib/action";
import ProjectGallery from "../components/ProjectGallery";

export default async function Page() {
  const projects = await getAllProjects();
  
  return (
    <main>
      <ProjectGallery initialProjects={projects} />
    </main>
  );
}