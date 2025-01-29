import { getAllProjects } from "@/lib/action";
import { Project } from "./types/Project";

const Home = async () => {
  const projects: Project[] = await getAllProjects();
  console.log('[PAGE - PROJECTS]', projects);
  return <></>;
}

export default Home;