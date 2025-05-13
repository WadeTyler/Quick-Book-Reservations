import { CalendarIcon} from "lucide-react";

export default function BrandLogo() {
  return (
    <div className="inline-flex items-center gap-2 font-bold tracking-tight">
      <CalendarIcon className="size-8" />
      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">QUICK BOOK</span>
    </div>
  )
}