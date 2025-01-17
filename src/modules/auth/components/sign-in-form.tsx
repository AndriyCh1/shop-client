'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn } from '@modules/auth/actions';
import { signInSchema } from '@modules/auth/validation-schemas';

import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/ui/form';
import { Input } from '@components/ui/input';

import { cn } from '@libs/utils/tw-merge';

export interface SignInFormProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function SignInForm({ header, footer }: SignInFormProps) {
  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const signInResponse = await signIn(values);

    if (signInResponse?.error) {
      setSubmitError(signInResponse.error);
    }
  };

  return (
    <Form {...form}>
      <form
        role="form"
        className="w-72 md:w-80"
        aria-describedby="sign-in-description"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {header || (
          <>
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p id="sign-in-description" className="mt-4">
              Enter your details below
            </p>
          </>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4 space-y-0">
              <FormLabel htmlFor="email" className="sr-only">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  variant="standard"
                  placeholder="Email address"
                  className={cn({
                    'border-red-500': form.formState.errors.email
                  })}
                  aria-label="Email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4 space-y-0">
              <FormLabel htmlFor="password" className="sr-only">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  id="password"
                  variant="standard"
                  type="password"
                  placeholder="Password"
                  className={cn({
                    'border-red-500': form.formState.errors.password
                  })}
                  aria-label="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && (
          <p className="mt-4 px-1 text-sm text-red-500">{submitError}</p>
        )}
        <fieldset className="mt-4 flex items-center justify-between gap-5 sm:gap-10 md:gap-16">
          <Button type="submit" className="px-6 xs:px-12">
            Sign In
          </Button>
          <Link href="/forgot-password" className="text-sm font-medium">
            Forgot Password?
          </Link>
        </fieldset>

        {footer || (
          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account yet?{' '}
            <Link href="/sign-up" className="font-medium">
              Sign up
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
}
