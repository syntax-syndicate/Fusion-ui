import { Building, Star, User } from "lucide-react"

import { Button } from "~/registry/default/ui/button"
import type { StepItem } from "~/registry/default/ui/stepper"
import { Step, Stepper, useStepper } from "~/registry/default/ui/stepper"

const steps = [
   { label: "Step 1", icon: User },
   { label: "Step 2", icon: Building },
   { label: "Step 3", icon: Star },
] satisfies StepItem[]

export default function StepperDemo() {
   return (
      <div className="flex w-full flex-col gap-4">
         <Stepper initialStep={0} steps={steps}>
            {steps.map((stepProps, index) => {
               return (
                  <Step key={stepProps.label} {...stepProps}>
                     <div className="bg-secondary text-primary my-2 flex h-40 items-center justify-center rounded-md border">
                        <h1 className="text-xl">
                           Step
                           {index + 1}
                        </h1>
                     </div>
                  </Step>
               )
            })}
            <Footer />
         </Stepper>
      </div>
   )
}

function Footer() {
   const {
      nextStep,
      prevStep,
      resetSteps,
      isDisabledStep,
      hasCompletedAllSteps,
      isLastStep,
      isOptionalStep,
   } = useStepper()
   return (
      <>
         {hasCompletedAllSteps && (
            <div className="bg-secondary text-primary my-2 flex h-40 items-center justify-center rounded-md border">
               <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
            </div>
         )}
         <div className="flex w-full justify-end gap-2">
            {hasCompletedAllSteps ? (
               <Button size="sm" onClick={resetSteps}>
                  Reset
               </Button>
            ) : (
               <>
                  <Button
                     disabled={isDisabledStep}
                     onClick={prevStep}
                     size="sm"
                     variant="secondary"
                  >
                     Prev
                  </Button>
                  <Button size="sm" onClick={nextStep}>
                     {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
                  </Button>
               </>
            )}
         </div>
      </>
   )
}
