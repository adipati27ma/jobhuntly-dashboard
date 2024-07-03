'use client';

import React, { FC } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { JOB_APPLICANT_COLUMNS, JOB_APPLICANT_DATA } from '@/constants';
import { Badge, ButtonActionTable } from '@/components';
import { Applicant } from '@prisma/client';

type ApplicantsProps = {
  // applicantsData: Applicant[] | undefined;
  applicantsData: any;
};

const Applicants: FC<ApplicantsProps> = ({
  applicantsData,
}: ApplicantsProps) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {JOB_APPLICANT_COLUMNS.map((item: string, i: number) => (
              <TableHead key={item + i}>{item}</TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicantsData && (
            <>
              {/* {JOB_APPLICANT_DATA.map((item: any, i: number) => ( */}
              {applicantsData.map((item: any, i: number) => (
                <TableRow key={item.id + i}>
                  <TableCell>{item.user.name}</TableCell>
                  {/**
                   * docs: appliedDate sementara dihapus, karena di DB tidak ada.
                   * tbd: tambah appliedDate = date.Now() di schema dkk.
                   */}
                  {/* <TableCell>{item.appliedDate}</TableCell> */}
                  <TableCell>
                    <ButtonActionTable url={`/`} />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Applicants;
