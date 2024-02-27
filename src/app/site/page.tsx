/* Components */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import clsx from 'clsx';

/* icons */
import { Check } from 'lucide-react'

/* Constants */
import { pricingCards } from '@/lib/constants'

import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className=" w-full pt-36 relative flex items-center flex-col">
        <div className="absolute dark:hidden inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

        <div className="absolute hidden dark:block top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

        <p className="text-center">Run your Agency, in one Place.</p>
        <h1 className="text-center text-3xl -mb-2 md:text-6xl font-writing lg:-mb-12">Creator</h1>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative z-20">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            Lark
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <Image
            src={'/assets/preview.png'}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>

      <section className="flex justify-center items-center flex-col gap-4 mt-10 md:!mt-20">
        <div className='px-4'>
          <h2 className="text-4xl text-center font-bold"> Choose what fits you right</h2>
          <p className="text-muted-foreground text-center mt-2 w-full md:w-1/2 mx-auto">
            Our straightforward pricing plans are tailored to meet your needs. If
            {" you're"} not
            ready to commit you can get started for free.
          </p>
        </div>

        <div className="flex  justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            //WIP: Wire up free product from stripe
            <Card
              key={card.title}
              className={clsx('w-[300px] flex flex-col justify-between', {
                'border-2 border-primary': card.title === 'Unlimited Saas',
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx('', {
                    'text-muted-foreground': card.title !== 'Unlimited Saas',
                  })}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>
                  {
                    pricingCards.find((c) => c.title === card.title)
                      ?.description
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">
                  {card.price}
                </span>
                <span className="text-muted-foreground">
                  /m
                  {/* <span>/ {card.recurring?.interval}</span> */}
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {pricingCards
                    .find((c) => c.title === card.title)
                    ?.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex gap-2"
                      >
                        <Check />
                        <p>{feature}</p>
                      </div>
                    ))}
                </div>
                <Link
                  href={`/agency?plan=${card.title}`}
                  className={clsx(
                    'w-full text-center bg-primary p-2 rounded-md',
                    {
                      '!bg-muted-foreground':
                        card.title !== 'Unlimited Saas',
                    }
                  )}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
