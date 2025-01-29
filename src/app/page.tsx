import { getAllProjects } from "@/lib/action";
import { Project } from "./types/Project";
import Link from "next/link";
import Image from "next/image";

const Home = async () => {
  const projects: Project[] = await getAllProjects();
  console.log('[PAGE - PROJECTS]', projects);
  return (
    <div>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>
              <div>
                <Image
                  src={project.image}
                  alt={project.name}
                  width={300}
                  height={300}
                  className=""
                />
                <div>
                  <h2>{project.name}</h2>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home;