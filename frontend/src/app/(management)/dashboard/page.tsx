import ManagedBusinessList from "@/app/(management)/dashboard/_components/ManagedBusinessList";
import {Metadata} from "next";

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

      <div className="container">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Dashboard
        </h1>
        <p className="mb-6">View your managed businesses</p>
        <ManagedBusinessList />
      </div>

    </div>
  )
}
