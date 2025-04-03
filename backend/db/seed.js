const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.gameSession.deleteMany();
  await prisma.target.deleteMany();
  await prisma.image.deleteMany();

  const waldo2 = await prisma.image.create({
    data: {
      name: 'waldo2.jpg',
      targets: {
        create: [
          { x: 517, y: 450 },
          { x: 883, y: 787 },
          { x: 508, y: 968 },
        ],
      },
    },
  });

  console.log('✅ Seed completed:', waldo2);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
