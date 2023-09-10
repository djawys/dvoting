'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { userRegisterSchema } from '@/lib/validations';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/Shared/icons';
import { createUser } from '@/data/client/user';

export function UserRegisterForm({ className, ...props }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterSchema),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams();

  async function onSubmit(data) {
    console.log(data);
    setIsLoading(true);

    const user = await createUser(data);

    console.log(user);
    if (user.isSuccess) {
      toast({
        title: 'User Created Suuccessfully ',
        variant: 'default',
      });

      const signInResult = await signIn('credentials', {
        cnic: data.cnic,
        password: data.password,
        redirect: false,
        callbackUrl: searchParams?.get('from') || '/',
      });
      if (!signInResult?.ok) {
        setIsLoading(false);
        return toast({
          title: 'Something went wrong.',
          description: 'Your sign in request failed. Please try again.',
          variant: 'destructive',
        });
      } else {
        setIsLoading(false);
        router.push('/dashboard');
      }
    }

    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="cnic">
              CNIC
            </Label>
            <Input
              id="cnic"
              placeholder="cnic (5150312345678)"
              type="number"
              autoCapitalize="none"
              autoComplete="cnic"
              autoCorrect="off"
              disabled={isLoading}
              {...register('cnic')}
            />
            {errors?.cnic && (
              <p className="px-1 text-xs text-red-600">{errors.cnic.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              name
            </Label>
            <Input
              id="name"
              placeholder="name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              {...register('name')}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="phone_number">
              phone_number
            </Label>
            <Input
              id="phone_number"
              placeholder="phone_number"
              type="text"
              autoCapitalize="none"
              autoComplete="phone_number"
              autoCorrect="off"
              disabled={isLoading}
              {...register('phone_number')}
            />
            {errors?.phone_number && (
              <p className="px-1 text-xs text-red-600">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={buttonVariants()} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white  px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
}
