import prisma from '@/../lib/prisma';

export async function GET() {
  const categories = await prisma.categoryJob.findMany();

  return Response.json(categories);
}
