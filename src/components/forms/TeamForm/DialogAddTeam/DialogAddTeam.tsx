'use client';

import React, { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { teamFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  Separator,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  Input,
} from '@/components';
import { PlusIcon } from 'lucide-react';

type DialogAddTeamProps = {};

const DialogAddTeam: FC<DialogAddTeamProps> = (props: DialogAddTeamProps) => {
  const RHForm = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
  });

  const onSubmit = (val: z.infer<typeof teamFormSchema>) => {
    console.log(val);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-none">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new team</DialogTitle>
            <DialogDescription>
              Fill the field to add new team.
            </DialogDescription>
          </DialogHeader>

          <Separator />

          <Form {...RHForm}>
            <form
              onSubmit={RHForm.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={RHForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RHForm.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="CTO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={RHForm.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/johndoe"
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
                          placeholder="https://linkedin.com/johndoe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="rounded-none">Save</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogAddTeam;
