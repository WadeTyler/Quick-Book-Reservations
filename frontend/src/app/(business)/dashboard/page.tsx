import ManagedBusinessList from "@/app/(business)/dashboard/_components/ManagedBusinessList";

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