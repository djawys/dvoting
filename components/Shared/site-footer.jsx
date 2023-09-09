import * as React from 'react';

import { siteConfig } from '@/lib/configs';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Shared/icons';
import { ModeToggle } from '@/components/Shared/mode-toggle';
import Image from 'next/image';
import Logo from '@/lib/logo.png';
export function SiteFooter({ className }) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src={Logo} alt={'logo'} width={30} height={30} />
          <p className="text-center text-sm leading-loose md:text-left">
            Experience the future of secure and transparent voting with our
            blockchain-based voting system. Your voice, your vote, your trust.
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
