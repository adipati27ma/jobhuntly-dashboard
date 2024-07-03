import { EnumValues } from 'zod';

export type optionType = {
  id: string;
  label: string;
};

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

//!docs: om Hariyanto kebingungan karena tidak ada appliedDate di kolom database
// export const JOB_APPLICANT_COLUMNS: string[] = ['Name', 'Applied Date'];
export const JOB_APPLICANT_COLUMNS: string[] = ['Name'];

export const JOB_APPLICANT_DATA = [
  {
    name: 'Hari Yantooo',
    appliedDate: '15 Aug 2023',
  },
];

export const LOCATION_OPTIONS: optionType[] = [
  {
    id: 'Indonesia',
    label: 'Indonesia',
  },
  {
    id: 'Malaysia',
    label: 'Malaysia',
  },
  {
    id: 'Singapura',
    label: 'Singapura',
  },
  {
    id: 'Thailand',
    label: 'Thailand',
  },
];

export const NUMBER_OF_EMPLOYEES_OPTIONS: optionType[] = [
  {
    id: '1-10',
    label: '1-10',
  },
  {
    id: '11-50',
    label: '11-50',
  },
  {
    id: '51-200',
    label: '51-200',
  },
  {
    id: '201-500',
    label: '201-500',
  },
  {
    id: '501-1000',
    label: '501-1000',
  },
  {
    id: '1001-5000',
    label: '1001-5000',
  },
  {
    id: '5001-10000',
    label: '5001-10000',
  },
  {
    id: '10000+',
    label: '10000+',
  },
];

export const INDUSTRY_OPTIONS: optionType[] = [
  {
    id: 'Software',
    label: 'Software',
  },
  {
    id: 'Cloud',
    label: 'Cloud',
  },
  {
    id: 'Hardware',
    label: 'Hardware',
  },
  {
    id: 'Design',
    label: 'Design',
  },
  {
    id: 'Finance',
    label: 'Finance',
  },
  {
    id: 'Health',
    label: 'Health',
  },
  {
    id: 'Education',
    label: 'Education',
  },
  {
    id: 'Automotive',
    label: 'Automotive',
  },
  {
    id: 'Agriculture',
    label: 'Agriculture',
  },
  {
    id: 'Manufacturing',
    label: 'Manufacturing',
  },
  {
    id: 'Others',
    label: 'Others',
  },
];
