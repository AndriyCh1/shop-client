import { Sparkle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ContentContainer } from '@components/shared/content-container';
import { Button } from '@components/ui/button';

export function HeroSection() {
  return (
    <section className="bg-seashell sm:max-h-auto max-h-[850] overflow-hidden">
      <ContentContainer className="py-10 sm:flex sm:justify-center sm:gap-8 sm:py-12 md:py-16 lg:pb-[125px] lg:pt-[105px]">
        <div className="flex-1">
          <h1 className="2lg:text-6xl font-integral-cf text-4xl font-bold uppercase tracking-normal lg:text-5xl">
            Find clothes that matches your style
          </h1>
          <p className="text-seashell-foreground mt-6 text-sm xs:mt-4 xs:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div className="flex xs:items-center xs:justify-center md:block">
            <Button
              className="mt-6 h-12 w-full rounded-full px-14 xs:w-3/4 sm:mt-4 sm:w-auto lg:mt-8"
              asChild
            >
              <Link href="/category">Shop Now</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-center md:justify-start md:text-start lg:mt-12">
            <div className="flex flex-col border-r-0 pr-4 md:border-r-[1px] md:border-r-muted-foreground/50">
              <b className="2lg:text-4xl text-2xl font-bold md:text-3xl">
                200+
              </b>
              <span className="text-seashell-foreground text-sm leading-tight md:text-base 2xl:text-base">
                International Brands
              </span>
            </div>
            <div className="flex flex-col border-r-0 pr-4 md:border-r-[1px] md:border-r-muted-foreground/50">
              <b className="2lg:text-4xl text-2xl font-bold md:text-3xl">
                1000+
              </b>
              <span className="text-seashell-foreground text-sm leading-tight md:text-base 2xl:text-base">
                High-Quality Products
              </span>
            </div>
            <div className="flex flex-col">
              <b className="2lg:text-4xl text-2xl font-bold md:text-3xl">
                30000+
              </b>
              <span className="text-seashell-foreground text-sm leading-tight md:text-base 2xl:text-base">
                Happy Customers
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <Sparkle className="absolute right-14 top-0 z-10 size-20" />
          <Sparkle className="absolute left-8 top-48 z-10 size-10" />
          <Image
            src="/images/fashionable-couple-posing.jpg"
            className="z-20 sm:absolute sm:-bottom-16 sm:right-0 md:bottom-0 md:translate-y-1/3 lg:-bottom-1/4 lg:translate-y-1/4"
            quality={100}
            priority
            style={{ height: 'auto' }}
            width={600}
            height={900}
            sizes="(max-width: 768px) 70vw, 50vw"
            alt="Models wear clothes"
          />
        </div>
      </ContentContainer>
    </section>
  );
}
