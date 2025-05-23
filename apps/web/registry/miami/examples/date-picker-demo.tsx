"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import * as React from "react"

import { ny } from "~/lib/utils"
import { Button } from "~/registry/miami/ui/button"
import { Calendar } from "~/registry/miami/ui/calendar"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "~/registry/miami/ui/popover"

export default function DatePickerDemo() {
   const [date, setDate] = React.useState<Date>()

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               className={ny(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
               )}
            >
               <CalendarIcon className="mr-2 size-4" />
               {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0" align="start">
            <Calendar
               mode="single"
               selected={date}
               onSelect={setDate}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   )
}
