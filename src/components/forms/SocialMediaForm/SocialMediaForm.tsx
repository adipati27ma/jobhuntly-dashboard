'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { socialMediaFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  FieldInput,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';

type Props = {};

const SocialMediaForm = (props: Props) => {
  const RHForm = useForm<z.infer<typeof socialMediaFormSchema>>({
    resolver: zodResolver(socialMediaFormSchema),
  });

  const onSubmit = (val: z.infer<typeof socialMediaFormSchema>) => {
    console.log(val);
  };

  return (
    <>
      <Form {...RHForm}>
        <form onSubmit={RHForm.handleSubmit(onSubmit)} className="space-y-7">
          <FieldInput
            title="Basic Information"
            subtitle="Add elsewhere links to your company profile. You can add only username without full https links."
          >
            <div className="space-y-5">
              <FormField
                control={RHForm.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. https://facebook.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RHForm.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. https://instagram.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RHForm.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linkedin</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. https://linkedin.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RHForm.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. https://twitter.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RHForm.control}
                name="youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. https://youtube.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FieldInput>
          <div className="flex justify-end">
            <Button size="lg">Save Changes</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SocialMediaForm;
