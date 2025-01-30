import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding project details...')
  
  // Get all existing projects
  const projects = await prisma.project.findMany()

  // Create project details for each project
  for (const project of projects) {
    await prisma.projectDetail.create({
      data: {
        context: `${project.name} est un projet créé pour répondre aux besoins spécifiques du client.`,
        objective: `L'objectif principal de ${project.name} était de créer une présence en ligne professionnelle et impactante.`,
        technology: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        results: `${project.name} a été livré avec succès, répondant à tous les objectifs fixés.`,
        projectId: project.id
      }
    })
  }
}

main()
  .catch(e => {
    console.error('Error seeding project details:', e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Finished seeding project details.')
    await prisma.$disconnect()
  })