"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { ContactFormState } from "@/app/contact/page";

// PROJECTS
export const getAllProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        year: "desc",
      },
      include: {
        ProjectDetail: {
          select: {
            technology: true
          }
        }
      }
    });
    
    const transformedProjects = projects.map(project => ({
      ...project,
      technologies: project.ProjectDetail
        ? Array.from(new Set(project.ProjectDetail.flatMap(detail => detail.technology)))
        : []
    }));

    return transformedProjects;
  } catch (error) {
    console.error("[ACTIONS - GET PROJECTS - ERROR]", error);
    return [];
  }
};

export const getProject = async (slug: string) => {
  try {
    const project = await prisma.project.findFirst({
      where: { 
        slug 
      },
      include: {
        ProjectDetail: true
      }
    });
    
    if (!project) throw new Error("Project not found");
    return project;
  } catch (error) {
    console.error("[ACTIONS - GET PROJECT - ERROR]", error);
    throw new Error("Project not found");
  }
};

// CONTACT
export const createMessage = async (
  prevState: ContactFormState,
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const errors: ContactFormState = {
    name: { value: name },
    email: { value: email },
    message: { value: message },
  };

  // Validation
  if (!name || name.length < 2) {
    errors.name.errors = ["Le nom doit faire au moins 2 caractères"];
  }

  if (!email || !email.includes("@")) {
    errors.email.errors = ["Email invalide"];
  }

  if (!message || message.length < 10) {
    errors.message.errors = ["Le message doit faire au moins 10 caractères"];
  }

  // Return errors if validation fails
  if (Object.values(errors).some((field) => field.errors)) {
    return errors;
  }

  try {
    await prisma.contact.create({
      data: { name, email, message },
    });
    revalidatePath("/contact");
    return prevState;
  } catch (error) {
    console.error("[ACTIONS - CREATE MESSAGE - ERROR]", error);
    return {
      ...prevState,
      message: { value: message, errors: ["Une erreur est survenue"] },
    };
  }
};
