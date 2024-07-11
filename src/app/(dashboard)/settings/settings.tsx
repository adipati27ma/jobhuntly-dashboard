import React, { FC } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  OverviewForm,
  SocialMediaForm,
  TeamForm,
} from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '../../../../lib/prisma';

type SettingsProps = {};

async function getDetailCompany() {
  const session = await getServerSession(authOptions);

  const companyDetails = await prisma.company.findFirst({
    where: {
      id: session?.user.id,
    },
    include: {
      companyOverView: true,
      companySocialMedia: true,
    },
  });

  return companyDetails;
}

const settings: FC<SettingsProps> = async (props: SettingsProps) => {
  const companyDetails = await getDetailCompany();

  console.log('company details!!', companyDetails);

  return (
    <div>
      <div className="font-semibold text-3xl mb-5">Settings</div>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewForm details={companyDetails?.companyOverView[0]} />
        </TabsContent>
        <TabsContent value="socialLinks">
          <SocialMediaForm details={companyDetails?.companySocialMedia[0]} />
        </TabsContent>
        <TabsContent value="teams">
          <TeamForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default settings;
