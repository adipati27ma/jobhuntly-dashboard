import prisma from '../../../../../lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();
  const profile = await prisma.companyOverview.findFirst({
    where: {
      companyId: data.companyId,
    },
  });

  // docs: upsert() => If profile exists, update it. Otherwise, create a new one.
  const result = await prisma.companyOverview.upsert({
    where: {
      companyId: data.companyId,
      id: profile?.id || '',
    },
    update: data,
    create: data,
  });

  return Response.json(result);
}
