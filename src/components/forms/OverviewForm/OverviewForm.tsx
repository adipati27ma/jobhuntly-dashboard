'use client';

import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useSWR from 'swr';

import { overviewFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  INDUSTRY_OPTIONS,
  LOCATION_OPTIONS,
  NUMBER_OF_EMPLOYEES_OPTIONS,
  optionType,
} from '@/constants';
import { CalendarIcon } from 'lucide-react';
import { cn, fetcher } from '@/lib/utils';
import { format } from 'date-fns';

import {
  Button,
  CKEditor,
  Calendar,
  CustomUpload,
  FieldInput,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputSkills,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  TitleForm,
} from '@/components';
import { CompanyOverview, Industry } from '@prisma/client';
import { supabaseUploadFile } from '@/lib/supabase';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

type OverviewFormProps = {
  details: CompanyOverview | undefined;
};

const OverviewForm: FC<OverviewFormProps> = ({ details }) => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const { data: industries } = useSWR<Industry[]>(
    '/api/company/industry',
    fetcher
  );

  const RHForm = useForm<z.infer<typeof overviewFormSchema>>({
    resolver: zodResolver(overviewFormSchema),
    defaultValues: {
      name: details?.name,
      website: details?.website,
      location: details?.location,
      workforceSize: details?.workforceSize,
      industry: details?.industry,
      foundedDate: details?.foundedDate,
      techStacks: details?.techStacks || [],
      description: details?.description,
      image: details?.image,
    },
  });

  const onSubmit = async (val: z.infer<typeof overviewFormSchema>) => {
    try {
      let filename = '';

      // docs: Check if image is an object (new file) or string (old file)
      if (typeof val.image === 'object') {
        // Upload image to supabase storage
        const uploadImg = await supabaseUploadFile(val.image, 'company');
        filename = uploadImg.filename;
      } else {
        filename = val.image;
      }

      const body = {
        ...val,
        image: filename,
        companyId: session?.user.id,
      };

      await fetch('/api/company/overview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      toast({
        title: 'Company information updated',
        description: 'Your company information has been updated successfully.',
      });

      //!tbd: seharusnya pake useState() ajaa instead of router.refresh()
      router.refresh();
    } catch (error) {
      await toast({
        title: 'Failed to update company information',
        description: 'An error occurred while updating company information.',
        variant: 'destructive',
      });
      console.error('trycatch error', error);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div>
      <div className="my-5">
        <TitleForm
          title="Basic Information"
          subtitle="This is company information that you can update anytime."
        />
      </div>

      <Separator className="mb-7" />

      <Form {...RHForm}>
        <form onSubmit={RHForm.handleSubmit(onSubmit)} className="space-y-7">
          {/* docs: Company Logo */}
          <FieldInput
            title="Company Logo"
            subtitle="This image will be shown publicly as company logo."
          >
            <CustomUpload form={RHForm} name="image" />
          </FieldInput>

          {/* docs: Company Details */}
          <FieldInput
            title="Company Details"
            subtitle="Introduce your company core info
												quickly to users by fill up
												company details."
          >
            <div className="space-y-5">
              {/* docs: Name input */}
              <FormField
                control={RHForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. Twitter"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>At least 10 characters</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* docs: Website input */}
              <FormField
                control={RHForm.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. https://twitter.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* docs: Location input */}
              <FormField
                control={RHForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[450px]">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LOCATION_OPTIONS.map((item: optionType, i: number) => (
                          <SelectItem key={item.id + i} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* docs: Workforce & Industry input */}
              <div className="w-[450px] grid grid-cols-2 gap-4">
                <FormField
                  control={RHForm.control}
                  name="workforceSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workforce Size</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {NUMBER_OF_EMPLOYEES_OPTIONS.map(
                            (item: optionType, i: number) => (
                              <SelectItem key={item.id + i} value={item.id}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={RHForm.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Sector</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Business Sector" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* {INDUSTRY_OPTIONS.map( */}
                          {industries
                            ?.sort((a, b) => a.name.localeCompare(b.name))
                            .map((item: Industry) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* docs: Founded Date input */}
              <FormField
                control={RHForm.control}
                name="foundedDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Established Since</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[450px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>dd / mm / yyy</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* docs: Skills input */}
              <InputSkills
                form={RHForm}
                name="techStacks"
                label="Add Tech Stack"
              />
            </div>
          </FieldInput>

          <FieldInput
            title="About Company"
            subtitle="Brief description for your company. URLs are hyperlinked. "
          >
            <CKEditor
              form={RHForm}
              name="description"
              editorLoaded={editorLoaded}
            />
          </FieldInput>

          <div className="flex justify-end">
            <Button size="lg" className="rounded-none">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OverviewForm;
