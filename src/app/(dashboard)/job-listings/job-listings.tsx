import React, { FC } from 'react';
// import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import moment from 'moment';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { JOB_LISTING_COLUMNS, JOB_LISTING_DATA } from '@/constants';
import { Badge, Button, ButtonActionTable } from '@/components';
import { MoreVertical } from 'lucide-react';
import prisma from '@/../lib/prisma';
import { Job } from '@prisma/client';
import { dateFormat } from '@/lib/utils';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

type JobListingsProps = {};

/**
 * docs: menggunakan Server Side Fetch (server component)
 * langsung GET data dari server melalui Prisma
 * function dipisah untuk modularity
 */
async function getDataJobs() {
  const session = await getServerSession(authOptions);

  const jobs = prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
  });

  console.log('getDataJobs!!! user ID', session?.user.id);
  return jobs;
}

const JobListings: FC<JobListingsProps> = async (props: JobListingsProps) => {
  // const router = useRouter();
  const jobsData = await getDataJobs();
  console.log('jobsData', jobsData);

  return (
    <div>
      <div className="font-semibold text-3xl">Job Listing</div>
      <div className="mt-10">
        <Table>
          <TableCaption>A list of your recent jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
                <TableHead key={item + i}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsData.map((item: Job, i: number) => (
              <TableRow key={item.id + i}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  {moment(item.datePosted).isBefore(item.dueDate) ? (
                    <Badge>Live</Badge>
                  ) : (
                    <Badge variant={'destructive'}>Expired</Badge>
                  )}
                </TableCell>
                <TableCell>{dateFormat(item.datePosted)}</TableCell>
                <TableCell>{dateFormat(item.dueDate)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants} / {item.needs}
                </TableCell>
                <TableCell>
                  {/*
                    nextJs Ribet anyink harus "use client" setiap file tsx
                    ButtonActionTable dibuat karena useRouter() tidak bisa digunakan pada "use server" alias server component (default)
                    jadi dipisahkan sebagai client component
                  */}
                  {/* <Button
                    size="icon"
                    variant="outline"
                    onClick={() => router.push('/job-detail/1')}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button> */}
                  <ButtonActionTable url={`/job-detail/${item.id}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListings;
