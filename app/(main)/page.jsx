// import { getHomeData, preload } from '@/data/elastic';

import { Icons } from '@/components/Shared/icons';
import Link from 'next/link';

export default async function IndexPage() {
  // await preload();
  // const res = await getHomeData();
  // const products = res.data.products;
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={'#'}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            A Secure and Transparent Decentralized Voting Solution
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Empower citizens with a cutting-edge decentralized voting system,
            ensuring security, transparency, and trust in every electoral
            process.
          </p>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Our decentralized voting system enhances democracy by empowering
            citizens and ensuring transparent, secure, and fair elections.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.link className="mr-2 h-24 w-24" />
              <div className="space-y-2">
                <h3 className="font-bold">Immutable Blockchain Ledger</h3>
                <p className="text-sm text-muted-foreground">
                  Votes are permanently recorded on the blockchain for
                  transparency.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.vote className="mr-2 h-24 w-24" />
              <div className="space-y-2">
                <h3 className="font-bold">Anonymous Voting</h3>
                <p className="text-sm">
                  Protect voter privacy with secure, anonymous ballot casting.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.file className="mr-2 h-24 w-24" />
              <div className="space-y-2">
                <h3 className="font-bold">Tamper-Proof Smart Contracts</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure trust with unalterable voting rules enforced by smart
                  contracts.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.screen className="mr-2 h-24 w-24" />
              <div className="space-y-2">
                <h3 className="font-bold">Accessible Web Interface</h3>
                <p className="text-sm text-muted-foreground">
                  User-friendly Next.js application for easy participation.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.realtime className="mr-2 h-24 w-24" />
              <div className="space-y-2">
                <h3 className="font-bold">Real-Time Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly verify your vote and monitor election progress.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.secure className="mr-2 h-24 w-24" />
              <div className="space-y-2">
                <h3 className="font-bold">Decentralized Governance</h3>
                <p className="text-sm text-muted-foreground">
                  Empower stakeholders to shape the voting system's future.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Seamless integration, intuitive user interface, and robust security
            define our decentralized voting system's standout features.
          </p>
        </div>
      </section>
    </>
  );
}
