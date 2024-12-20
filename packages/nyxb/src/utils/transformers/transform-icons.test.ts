import { describe, expect, it, vi } from 'vitest'
import { transform } from '~/src/utils/transformers'
import type { Config } from '~/src/utils/get-config'
import { transformIcons } from '~/src/utils/transformers/transform-icons'

const testConfig: Config = {
   style: 'miami',
   tsx: true,
   rsc: true,
   tailwind: {
      baseColor: 'neutral',
      cssVariables: true,
      config: 'tailwind.config.ts',
      css: 'tailwind.css',
   },
   aliases: {
      components: '~/components',
      utils: '~/lib/utils',
   },
   resolvedPaths: {
      cwd: '/',
      components: '/components',
      utils: '/lib/utils',
      ui: '/ui',
      lib: '/lib',
      hooks: '/hooks',
      tailwindConfig: 'tailwind.config.ts',
      tailwindCss: 'tailwind.css',
   },
}

vi.mock('~/src/utils/registry', () => ({
   getRegistryIcons: () => ({
      Check: {
         lucide: 'Check',
         radix: 'CheckIcon',
      },
      ChevronDown: {
         lucide: 'ChevronDown',
         radix: 'ChevronDownIcon',
      },
      ChevronLeft: {
         lucide: 'ChevronLeft',
         radix: 'ChevronLeftIcon',
      },
   }),
}))

describe('transformIcons', () => {
   it('transforms radix icons', async () => {
      expect(
         await transform(
            {
               filename: 'test.ts',
               raw: `import * as React from "react"
import { Check } from "lucide-react"

export function Component() {
return <div><Check /></div>
}
  `,
               config: {
                  ...testConfig,
                  iconLibrary: 'radix',
               },
            },
            [transformIcons],
         ),
      ).toMatchInlineSnapshot(`
      "import * as React from "react"
      import { CheckIcon } from "@radix-ui/react-icons"

      export function Component() {
      return <div><CheckIcon /></div>
      }
        "
    `)
   })

   it('does not transform lucide icons', async () => {
      expect(
         await transform(
            {
               filename: 'test.ts',
               raw: `import * as React from "react"
import { Check } from "lucide-react"

export function Component() {
  return <div><Check /></div>
}
    `,
               config: {
                  ...testConfig,
                  iconLibrary: 'lucide',
               },
            },
            [transformIcons],
         ),
      ).toMatchInlineSnapshot(`
    "import * as React from "react"
    import { Check } from "lucide-react"

    export function Component() {
      return <div><Check /></div>
    }
        "
    `)
   })

   it('preserves semicolon', async () => {
      expect(
         await transform(
            {
               filename: 'test.ts',
               raw: `import * as React from "react";
import { ChevronDown } from "lucide-react";

export function Component() {
  return <div><ChevronDown /></div>
}
    `,
               config: {
                  ...testConfig,
                  iconLibrary: 'radix',
               },
            },
            [transformIcons],
         ),
      ).toMatchInlineSnapshot(`
      "import * as React from "react";
      import { ChevronDownIcon } from "@radix-ui/react-icons";

      export function Component() {
        return <div><ChevronDownIcon /></div>
      }
          "
    `)
   })
})
