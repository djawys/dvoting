'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { productPatchSchema } from '@/lib/validations';
import { buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/Shared/icons';

export function ProductEditor({ product }) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(productPatchSchema),
  });
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);

  async function onSubmit(data) {
    setIsSaving(true);

    const response = await fetch(`/api/products/${product.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your product was not saved. Please try again.',
        variant: 'destructive',
      });
    }

    router.refresh();

    return toast({
      description: 'Your product has been saved.',
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: 'ghost' }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">
              {product.published ? 'Published' : 'Draft'}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert"></div>
      </div>
    </form>
  );
}
