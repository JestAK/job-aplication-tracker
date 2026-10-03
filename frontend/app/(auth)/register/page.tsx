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

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = register.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!data.success) {
      console.error(data.error);
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

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      console.log('User registered successfully');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <Card className="w-full max-w-sm">
        <CardHeader className="mb-4">
          <CardTitle>Create account</CardTitle>
          <CardDescription>Enter your data to create account</CardDescription>
        </CardHeader>
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
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <div className="flex w-full items-center justify-center gap-1 mt-4">
              <Label className="text-gray-500">Already have an account?</Label>
              <Button variant="link">Sign In</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
