import { Plus } from "lucide-react"
import type * as React from "react"

import { Calendars } from "~/registry/miami/blocks/sidebar-12/components/calendars"
import { DatePicker } from "~/registry/miami/blocks/sidebar-12/components/date-picker"
import { NavUser } from "~/registry/miami/blocks/sidebar-12/components/nav-user"
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
   SidebarSeparator,
} from "~/registry/miami/ui/sidebar"

// This is sample data.
const data = {
   user: {
      name: "nyxb",
      email: "m@example.com",
      avatar: "/avatars/nyxb.jpg",
   },
   calendars: [
      {
         name: "My Calendars",
         items: ["Personal", "Work", "Family"],
      },
      {
         name: "Favorites",
         items: ["Holidays", "Birthdays"],
      },
      {
         name: "Other",
         items: ["Travel", "Reminders", "Deadlines"],
      },
   ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar {...props}>
         <SidebarHeader className="h-16 border-b border-sidebar-border">
            <NavUser user={data.user} />
         </SidebarHeader>
         <SidebarContent>
            <DatePicker />
            <SidebarSeparator className="mx-0" />
            <Calendars calendars={data.calendars} />
         </SidebarContent>
         <SidebarFooter>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton>
                     <Plus />
                     <span>New Calendar</span>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>
         <SidebarRail />
      </Sidebar>
   )
}
