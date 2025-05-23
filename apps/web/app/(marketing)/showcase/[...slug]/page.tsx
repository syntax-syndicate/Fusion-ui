import { allShowcases } from "content-collections"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { env } from "~/scripts/env.mjs"

import { ShowcaseCard } from "~/components/sections/showcase"
import { siteConfig } from "~/config/site"
import { absoluteUrl } from "~/lib/utils"

interface PageProps {
   params: {
      slug: string[]
   }
}

async function getPageFromParams(params: PageProps["params"]) {
   const slug = params?.slug?.join("/")
   const page = allShowcases.find((page) => page.slugAsParams === slug)

   if (!page) {
      return null
   }

   return page
}

export async function generateMetadata({
   params,
}: PageProps): Promise<Metadata> {
   const page = await getPageFromParams(params)

   if (!page) {
      return {}
   }

   const url = env.NEXT_PUBLIC_APP_URL

   const ogUrl = new URL(`${url}/api/og`)
   ogUrl.searchParams.set("heading", page.title)
   ogUrl.searchParams.set("type", siteConfig.name)
   ogUrl.searchParams.set("mode", "light")

   return {
      title: page.title,
      description: page.description,
      openGraph: {
         title: page.title,
         description: page.description,
         type: "article",
         url: absoluteUrl(page.slug),
         images: [
            {
               url: ogUrl.toString(),
               width: 1200,
               height: 630,
               alt: page.title,
            },
         ],
      },
      twitter: {
         card: "summary_large_image",
         title: page.title,
         description: page.description,
         images: [ogUrl.toString()],
      },
   }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
   return allShowcases.map((page) => ({
      slug: page.slugAsParams.split("/"),
   }))
}

export default async function PagePage({ params }: PageProps) {
   const page = await getPageFromParams(params)

   if (!page) {
      notFound()
   }

   return (
      <article className="container max-w-2xl py-14">
         <h2 className="text-foreground mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter">
            {page.title}
         </h2>
         <h3 className="text-foreground/80 mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight">
            {page.title} uses Nyxb UI to build their landing page.
         </h3>
         <ShowcaseCard
            title={page.title}
            href={page.href}
            image={page.image}
            affiliation={page.affiliation}
         />
      </article>
   )
}
