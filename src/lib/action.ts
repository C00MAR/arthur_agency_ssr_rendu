"use server";

import prisma from "@/lib/prisma";

export const getAllProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        year: "desc",
      },
    });
    return projects;
  } catch (error) {
    console.error('[ACTIONS - GET PROJECTS - ERROR]', error);
    return [];
  }
};

export const getProject = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    if (!project) throw new Error("Project not found");
    return project;
  } catch (error) {
    console.error('[ACTIONS - GET PROJECT - ERROR]', error);
    throw new Error("Project not found");
  }
};
