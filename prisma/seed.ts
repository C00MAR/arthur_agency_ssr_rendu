import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const projectsData: Prisma.ProjectCreateInput[] = [
  {
    name: 'BLOOM',
    description: "Site vitrine pour présenter le nouvel album de l'artiste Bloom",
    image: '/echoes.png',
    url: 'https://rendu-creative-dev-five.vercel.app/',
    category: ['Site vitrine', 'Musique'],
    year: '2025',
  },
  {
    name: 'InnoWave',
    description: 'Site vitrine pour présenter les services de l\'entreprise InnoWave',
    image: '/innowave.png',
    url: 'https://inno-wave.vercel.app/',
    category: ['Site vitrine', 'Blog', 'Entreprise'],
    year: '2024',
  },
  {
    name: '7 Digits',
    description: '',
    image: '/7digits.png',
    url: 'https://creative-dev-project.vercel.app/',
    category: ['Creation', 'Artistique'],
    year: '2024',
  },
  {
    name: 'Maquette Twitch',
    description: '',
    image: '/twitch.png',
    url: 'https://maquette-twitch.vercel.app/',
    category: ['Creation', 'Maquette'],
    year: '2023',
  },
  {
    name: 'Expert SA',
    description: '',
    image: '/expert.png',
    url: 'https://maquette-expert-sa.vercel.app/',
    category: ['Creation', 'Entreprise'],
    year: '2023',
  },
  {
    name: 'Nexus',
    description: 'Site vitrine pour présenter la boîte le Nexus',
    image: '/nexus.png',
    url: 'https://nexus-flax.vercel.app/',
    category: ['Site vitrine', 'Entreprise', 'Musique'],
    year: '2022',
  }
]

export async function main() {
  console.log('Start seeding...')
  for (const p of projectsData) {
    await prisma.project.create({
      data: p,
    })
  }
}

main()
  .catch(e => {
    console.log('error')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('End seeding...')
    await prisma.$disconnect()
  })