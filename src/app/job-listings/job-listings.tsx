import React, { FC } from 'react';
import { useRouter } from 'next/navigation';

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

type JobListingsProps = {};

const JobListings: FC<JobListingsProps> = (props: JobListingsProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="font-semibold text-3xl">Job Listing</div>
      <div className="mt-10">
        <Table>
          <TableCaption>A list of your recent invoices WOY.</TableCaption>
          <TableHeader>
            <TableRow>
              {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
                <TableHead key={item + i}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {JOB_LISTING_DATA.map((item: any, i: number) => (
              <TableRow key={item + i}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  <Badge>{item.status}</Badge>
                </TableCell>
                <TableCell>{item.datePosted}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants} / {item.needs}
                </TableCell>
                <TableCell>
                  {/* nextJs Ribet anyink harus "use client" setiap file tsx */}
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
