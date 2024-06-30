'use client';

import React, { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { signInFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components';
import Link from 'next/link';

type SignInProps = {};

const SignInPage: FC<SignInProps> = (props: SignInProps) => {
  const RHForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = (val: z.infer<typeof signInFormSchema>) => {
    console.log(val);
  };

  return (
    <div className="relative w-full h-screen">
      {/* top-1/2 = top-50% */}
      <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2">
        <div className="border border-border p-5">
          <div className="font-semibold text-center text-2xl mb-2">
            Login your account
          </div>
          <div className="text-sm text-gray-500">
            Enter your email to access dashboard
          </div>

          <Form {...RHForm}>
            <form
              onSubmit={RHForm.handleSubmit(onSubmit)}
              className="mt-5 space-y-5"
            >
              <FormField
                control={RHForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={RHForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="rounded-none w-full">Sign In</Button>

              <div className="text-sm">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-primary">
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
