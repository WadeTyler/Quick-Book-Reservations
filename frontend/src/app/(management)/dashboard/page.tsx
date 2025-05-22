import ManagedBusinessList from "@/app/(management)/dashboard/_components/ManagedBusinessList";
import {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Business Management Dashboard | Quick Book",
  description: "View and manage all your businesses in one place. Access business analytics, reservations, and staff management with Quick Book.",
  keywords: [
    "business dashboard",
    "manage businesses",
    "Quick Book",
    "business analytics",
    "reservation management",
    "staff management"
  ]
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col mt-32">

      <div className="container w-full flex flex-col gap-6">
        <div>
          <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Dashboard
          </h1>
          <p className="">View your managed businesses</p>
        </div>

        <Link href={`/create-business`} className="ml-auto">
          <Button className='ml-auto'>Create Business</Button>
        </Link>

        <ManagedBusinessList />
      </div>

    </div>
  )
}
