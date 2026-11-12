'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const register = z
    .object({
      email: z.email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = register.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!data.success) {
      console.log(data);
      setErrorMsg(data.error.issues[0].message);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.data.email,
            password: data.data.password,
          }),
        }
      );

      const responseResult = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseResult.message || 'Failed to register. Please try again.';
        throw new Error(errorMessage);
      }

      console.log('User registered successfully');
      localStorage.setItem('accessToken', responseResult.access_token);

      router.replace('/application-table');
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error instanceof Error
          ? error.message
          : 'Failed to register. Please try again.'
      );
    }
  }
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <Card className="w-full max-w-sm">
        <CardHeader className="mb-4">
          <CardTitle>Create account</CardTitle>
          <CardDescription>Enter your data to create account</CardDescription>
        </CardHeader>
        {errorMsg && (
          <div className="mb-4 mx-4 p-2 text-sm text-red-600 bg-red-200 rounded-md">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="mail@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-8">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <div className="flex w-full items-center justify-center gap-1 mt-4">
              <Label className="text-gray-500">Already have an account?</Label>
              <Button variant="link">
                <Link href={'/login'}>Sign In</Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
