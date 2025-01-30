import { getAllProjects } from "@/lib/action";
import HomeClient from "../components/HomeClient";

export default async function Page() {
  const projects = await getAllProjects();
  
  return (
    <main>
      <HomeClient projects={projects} />
    </main>
  );
}