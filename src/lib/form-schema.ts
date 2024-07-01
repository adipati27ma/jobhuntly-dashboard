import { JOBTYPES } from '@/constants';
import { z } from 'zod';

export const jobFormSchema = z.object({
  roles: z
    .string({ required_error: 'Job title is required' })
    .min(10, { message: 'Job title must be at least 3 characters' }),
  jobType: z.enum(JOBTYPES, {
    required_error: 'You need to select a job type',
  }),
  salaryFrom: z.string({ required_error: 'Starting salary is required' }),
  salaryTo: z.string({ required_error: 'Upper limit salary is required' }),
  categoryId: z.string({ required_error: 'You need to select a category' }),
  requiredSkills: z
    .string()
    .array()
    .nonempty({ message: 'You need to add at least one skill' }),
  jobDescription: z
    .string({ required_error: 'Job description is required' })
    .min(10, { message: 'Job description must be at least 10 characters' }),
  responsibility: z
    .string({ required_error: 'Responsibilities is required' })
    .min(10, { message: 'Responsibilities must be at least 10 characters' }),
  whoYouAre: z
    .string({ required_error: 'Who You Are is required' })
    .min(10, { message: 'Who You Are must be at least 10 characters' }),
  niceToHaves: z
    .string({ required_error: 'Nice-To-Haves is required' })
    .min(10, { message: 'Nice-To-Haves must be at least 10 characters' }),
  benefits: z
    .object({
      benefit: z.string(),
      description: z.string(),
    })
    .array()
    .nonempty({ message: 'You need to add at least one benefit' }),
});

export const overviewFormSchema = z.object({
  image: z.any().refine((item: any) => item?.name, {
    message: 'You need to upload an image',
  }),
  name: z.string({ required_error: 'Company name is required' }),
  website: z.string({ required_error: 'Company website is required' }),
  location: z.string({ required_error: 'Company location is required' }),
  workforceSize: z.string({
    required_error: 'Workforce Size is required',
  }),
  industry: z.string({ required_error: 'Business sector is required' }),
  foundedDate: z.date({ required_error: 'Founded date is required' }),
  techStack: z
    .string()
    .array()
    .nonempty({ message: 'You need to add at least one Tech Stack' }),
  description: z.string({ required_error: 'Company description is required' }),
});

export const socialMediaFormSchema = z.object({
  facebook: z.string({ required_error: 'Facebook link is required' }),
  instagram: z.string({ required_error: 'Instagram link is required' }),
  linkedin: z.string({ required_error: 'Linkedin link is required' }),
  twitter: z.string({ required_error: 'Twitter link is required' }),
  youtube: z.string({ required_error: 'Youtube link is required' }),
});

export const teamFormSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  position: z.string({ required_error: 'Position is required' }),
  // email: z.string({ required_error: 'Email is required' }),
  instagram: z.string({ required_error: 'Instagram link is required' }),
  linkedin: z.string({ required_error: 'Linkedin link is required' }),
});

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const signUpFormSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string({ required_error: 'Password is required' }),
});
