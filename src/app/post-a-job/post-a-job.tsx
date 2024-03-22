'use client';

import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ArrowLeftIcon } from 'lucide-react';
import { jobFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldInput,
  Separator,
  Input,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  InputSkills,
  CKEditor,
  InputBenefits,
  Button,
} from '@/components';
import { JOBTYPES } from '@/constants';

type PostAJobPageProps = {};

const PostAJobPage: FC<PostAJobPageProps> = (props: PostAJobPageProps) => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

  // 1. Define your form.
  const RHForm = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      requiredSkills: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof jobFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div>
      <div className="inline-flex flex-col gap-5">
        <div className="group inline-flex gap-1 items-end cursor-pointer duration-300 hover:text-primary">
          <ArrowLeftIcon size={'1.75rem'} className="p-1" />
          <span className="group-hover:underline">Back</span>
        </div>
        <span className="text-2xl font-semibold">Post a Job</span>
      </div>

      <div className="my-5">
        <div className="text-lg font-semibold">Basic Information</div>
        <div className="text-gray-400">
          List out your top perks and benefits.
        </div>
      </div>

      <Separator />

      <Form {...RHForm}>
        <form
          onSubmit={RHForm.handleSubmit(onSubmit)}
          className="mt-5 space-y-6"
        >
          {/* docs: Job Title */}
          <FieldInput
            title="Job Title"
            subtitle="Job titles must be desribe one position"
          >
            <FormField
              control={RHForm.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="e.g. Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>At least 10 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>

          {/* docs: Type of Employment */}
          <FieldInput
            title="Type of Employment"
            subtitle="You can select multiple type of employment"
          >
            <FormField
              control={RHForm.control}
              name="jobType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {JOBTYPES.map((item: string, i: number) => (
                        <FormItem
                          key={item + i}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={item} />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>

          {/* docs: Salary */}
          <FieldInput
            title="Salary"
            subtitle="Please specify the estimated salary range for the role"
          >
            <div className="w-[450px] flex justify-between items-center">
              <FormField
                control={RHForm.control}
                name="salaryFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full" placeholder="$100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-center">To</span>
              <FormField
                control={RHForm.control}
                name="salaryTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="$1000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FieldInput>

          {/* docs: Category */}
          <FieldInput
            title="Category"
            subtitle="Please specify the category for the role"
          >
            <FormField
              control={RHForm.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Job Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[450px]">
                        <SelectValue placeholder="Select Job Categories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>

          {/* docs: Category */}
          <FieldInput
            title="Required Skills"
            subtitle="Please specify the required skills for the job"
          >
            <InputSkills
              form={RHForm}
              name="requiredSkills"
              label="Add Skills"
            />
          </FieldInput>

          {/* docs: Job Description */}
          <FieldInput
            title="Job Description"
            subtitle="Job titles must be describe one position"
          >
            <CKEditor
              form={RHForm}
              name="jobDescription"
              editorLoaded={editorLoaded}
            />
          </FieldInput>

          {/* docs: Responsibilities */}
          <FieldInput
            title="Responsibilities"
            subtitle="Outline the core responsibilities of the position"
          >
            <CKEditor
              form={RHForm}
              name="responsibilities"
              editorLoaded={editorLoaded}
            />
          </FieldInput>

          {/* docs: Who You Are */}
          <FieldInput
            title="Who You Are"
            subtitle="Add your preferred candidates qualifications"
          >
            <CKEditor
              form={RHForm}
              name="whoYouAre"
              editorLoaded={editorLoaded}
            />
          </FieldInput>

          {/* docs: Nice-To-Haves */}
          <FieldInput
            title="Nice-To-Haves"
            subtitle="Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply"
          >
            <CKEditor
              form={RHForm}
              name="niceToHaves"
              editorLoaded={editorLoaded}
            />
          </FieldInput>

          {/* docs: Perks and Benefits */}
          <FieldInput
            title="Perks and Benefits"
            subtitle="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees"
          >
            <InputBenefits form={RHForm} />
          </FieldInput>

          <div className="flex justify-end">
            <Button size="lg" type="submit">
              Do a Review
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostAJobPage;
