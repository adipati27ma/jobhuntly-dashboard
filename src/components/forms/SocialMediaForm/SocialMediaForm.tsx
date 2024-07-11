'use client';

import React, { FC } from 'react';
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
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { CompanySocialMedia } from '@prisma/client';

type SocialMediaFormProps = {
  details: CompanySocialMedia | undefined;
};

const SocialMediaForm: FC<SocialMediaFormProps> = ({
  details,
}: SocialMediaFormProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const RHForm = useForm<z.infer<typeof socialMediaFormSchema>>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      facebook: details?.facebook || '',
      instagram: details?.instagram || '',
      linkedin: details?.linkedin || '',
      twitter: details?.twitter || '',
      youtube: details?.youtube || '',
    },
  });

  const onSubmit = async (val: z.infer<typeof socialMediaFormSchema>) => {
    try {
      const body = {
        ...val,
        companyId: session?.user.id,
      };

      await fetch('/api/company/social-media', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      //!tbd: seharusnya pake useState() ajaa instead of router.refresh()
      // berasa gak ngaruh, gak kerasa refresh
      await router.refresh();
      toast({
        title: 'Success',
        description: 'Social media links updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update social media links.',
      });
      console.log('error SocMedLinks', error);
    }
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
            <Button size="lg" className="rounded-none">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SocialMediaForm;
