'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/Shared/icons';

export function ProductCreateButton({ className, variant, ...props }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Untitled product',
      }),
    });
    console.log('theeee', response);
    setIsLoading(false);

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: 'Limit of 3 products reached.',
          description: 'Please upgrade to the PRO plan.',
          variant: 'destructive',
        });
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your product was not created. Please try again.',
        variant: 'destructive',
      });
    }

    const product = await response.json();
    console.log('theeee', product);
    // This forces a cache invalidation.
    router.refresh();

    router.push(`/product-edit/${product.id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          'cursor-not-allowed opacity-60': isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New Product
    </button>
  );
}
