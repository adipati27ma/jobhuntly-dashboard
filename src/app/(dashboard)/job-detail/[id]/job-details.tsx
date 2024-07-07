import React, { FC } from 'react';
import Link from 'next/link';

import { ArrowLeftIcon } from 'lucide-react';
import {
  Applicants,
  JobDetail,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/../lib/prisma';
import { CategoryJob } from '@prisma/client';

type paramsType = {
  id: string;
};

interface JobDetailPageProps {
  params: paramsType;
}

async function getDetailJob(id: string) {
  const jobDetail = await prisma.job.findFirst({
    where: {
      id: id,
    },
    include: {
      applicantsData: {
        include: {
          user: true,
        },
      },
      categoryJob: true,
    },
  });

  return jobDetail;
}

const JobDetailPage: FC<JobDetailPageProps> = async ({
  params,
}: JobDetailPageProps) => {
  // const session = await getServerSession(authOptions);
  const jobDetail = await getDetailJob(params.id);

  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <div>
          <Link
            href="/job-listings"
            className="hover:text-primary duration-300"
          >
            <ArrowLeftIcon className="w-9 h-9" />
          </Link>
        </div>
        <div>
          <div className="text-2xl font-semibold mb-1">{jobDetail?.roles}</div>
          <div>
            {jobDetail?.categoryJob?.name} . {jobDetail?.jobType} .{' '}
            {jobDetail?.applicants}/{jobDetail?.needs} Hired
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants">
        <TabsList className="mb-8">
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <Applicants applicantsData={jobDetail?.applicantsData} />
        </TabsContent>
        <TabsContent value="jobDetails">
          <JobDetail detail={jobDetail} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobDetailPage;
