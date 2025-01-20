'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn, signUp } from '@modules/auth/actions';
import { signUpSchema } from '@modules/auth/validation-schemas';

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

export interface SignUpFormProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function SignUpForm({ header, footer }: SignUpFormProps) {
  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const signUpResponse = await signUp(values);

    if (signUpResponse?.error) {
      return setSubmitError(signUpResponse.error);
    }
    const signInResponse = await signIn({
      email: values.email,
      password: values.password
    });

    if (signInResponse?.error) {
      return setSubmitError(signInResponse.error);
    }
  };

  return (
    <Form {...form}>
      <form
        role="form"
        className="w-72 md:w-80"
        aria-describedby="sign-up-description"
        onSubmit={form.handleSubmit(onSubmit)}
        onFocus={() => setSubmitError('')}
      >
        {header || (
          <>
            <h1 className="text-3xl font-bold">Create account</h1>
            <p id="sign-up-description">Enter your details below</p>
          </>
        )}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="mt-4 space-y-0">
              <FormLabel htmlFor="firstName" className="sr-only">
                First name
              </FormLabel>
              <FormControl>
                <Input
                  id="firstName"
                  type="text"
                  variant="standard"
                  placeholder="First name"
                  className={cn({
                    'border-red-500': form.formState.errors.firstName
                  })}
                  aria-label="First name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="mt-4 space-y-0">
              <FormLabel htmlFor="lastName" className="sr-only">
                Last name
              </FormLabel>
              <FormControl>
                <Input
                  id="lastName"
                  type="text"
                  variant="standard"
                  placeholder="Last name"
                  className={cn({
                    'border-red-500': form.formState.errors.lastName
                  })}
                  aria-label="Last name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4 space-y-0">
              <FormLabel htmlFor="email" className="sr-only">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
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

        <Button type="submit" className="mt-4 w-full px-6 xs:px-12">
          Create an account
        </Button>

        {footer || (
          <>
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/sign-in" className="font-medium">
                Sign in
              </Link>
            </p>
          </>
        )}
      </form>
    </Form>
  );
}
