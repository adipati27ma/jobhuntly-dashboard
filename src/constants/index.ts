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
    id: 1,
    roles: 'Software Engineer',
    status: 'Live',
    datePosted: '12 Aug 2023',
    dueDate: '12 Sep 2023',
    jobType: 'Full Time',
    applicants: 2,
    needs: 10,
  },
];

export const JOB_APPLICANT_COLUMNS: string[] = ['Name', 'Applied Date'];

export const JOB_APPLICANT_DATA = [
  {
    name: 'Hari Yantooo',
    appliedDate: '15 Aug 2023',
  },
];
