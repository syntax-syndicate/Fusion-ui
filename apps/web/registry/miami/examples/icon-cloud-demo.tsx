import IconCloud from "~/registry/miami/ui/icon-cloud"

const slugs = [
   "typescript",
   "javascript",
   "dart",
   "java",
   "react",
   "flutter",
   "android",
   "html5",
   "css3",
   "nodedotjs",
   "express",
   "nextdotjs",
   "prisma",
   "amazonaws",
   "postgresql",
   "firebase",
   "nginx",
   "vercel",
   "testinglibrary",
   "jest",
   "cypress",
   "docker",
   "git",
   "jira",
   "github",
   "gitlab",
   "visualstudiocode",
   "androidstudio",
   "sonarqube",
   "figma",
]

export default function IconCloudDemo() {
   return (
      <div className="bg-background relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border px-20 pb-20 pt-8 ">
         <IconCloud iconSlugs={slugs} />
      </div>
   )
}
