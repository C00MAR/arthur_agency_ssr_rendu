import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const projectsData: Prisma.ProjectCreateInput[] = [
  {
    name: 'BLOOM',
    description: "Site vitrine pour présenter le nouvel album de l'artiste Bloom",
    image: 'https://via.placeholder.com/150',
    url: 'https://www.google.com',
    date: new Date(),
  },
  {
    name: 'Project 2',
    description: 'Description 2',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.google.com',
    date: new Date(),
  },
  {
    name: 'Project 3',
    description: 'Description 3',
    image: 'https://via.placeholder.com/150',
    url: 'https://www.google.com',
    date: new Date(),
  },
]