import type { Doc } from "content-collections"
import { BugIcon, LightbulbIcon, PencilIcon } from "lucide-react"
import Link from "next/link"

import { getGitHubIssueUrl, getGithubFileUrl } from "~/lib/github"

export function Contribute({ doc }: { doc: Doc }) {
   const contributeLinks = [
      {
         text: "Report an issue",
         icon: BugIcon,
         href: getGitHubIssueUrl({
            owner: "nyxb-ui",
            repo: "ui",
            title: `[bug]: ${doc.slug}`,
            labels: ["bug", "documentation"],
            template: "bug_report.md",
         }),
      },
      {
         text: "Request a feature",
         icon: LightbulbIcon,
         href: getGitHubIssueUrl({
            owner: "nyxb-ui",
            repo: "ui",
            title: `[feat]: ${doc.slug}`,
            labels: ["enhancement"],
            template: "feature_request.md",
         }),
      },
      {
         text: "Edit this page",
         icon: PencilIcon,
         href: getGithubFileUrl(doc.slug),
      },
   ]

   return (
      <div className="space-y-2">
         <p className="font-medium">Contribute</p>
         <ul className="m-0 list-none">
            {contributeLinks.map((link, index) => (
               <li key={index} className="mt-0 pt-2">
                  <Link
                     href={link.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
                  >
                     <link.icon className="mr-2 size-4" />
                     {link.text}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}
