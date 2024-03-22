import { EnumValues } from 'zod';

export const JOBTYPES: EnumValues = [
  'Full Time',
  'Part Time',
  'Remote',
  'Internship',
];

export const JOB_LISTING_COLUMNS: string[] = [
  'Roles',
  'Status',
  'Date Posted',
  'Due Date',
  'Job Type',
  'Applicants',
  'Needs',
];

export const JOB_LISTING_DATA = [
  {
    roles: 'Software Engineer',
    status: 'Live',
    datePosted: '12 Aug 2023',
    dueDate: '12 Sep 2023',
    jobType: 'Full Time',
    applicants: 2,
    needs: 10,
  },
];
