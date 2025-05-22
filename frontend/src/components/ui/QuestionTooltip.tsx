import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

function QuestionTooltip({message}: {message: string}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="w-5 h-5 bg-accent/80 text-accent-foreground rounded-full flex items-center justify-center">
            ?
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default QuestionTooltip;