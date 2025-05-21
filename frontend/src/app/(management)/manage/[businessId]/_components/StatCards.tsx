import {CalendarDaysIcon, LayersIcon, UserIcon} from "lucide-react";
import React from "react";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import {Card} from "@/components/ui/card";

export default function StatCards() {
  const {managedBusiness} = useManagedBusiness();

  if (!managedBusiness) return null;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon={<CalendarDaysIcon className="w-6 h-6 text-accent" />}
        label="Upcoming Reservations"
        value={managedBusiness.upcomingReservationCount}
      />
      <StatCard
        icon={<LayersIcon className="w-6 h-6 text-accent" />}
        label="Services"
        value={managedBusiness.serviceOfferings.length}
      />
      <StatCard
        icon={<UserIcon className="w-6 h-6 text-accent" />}
        label="Staff"
        value={managedBusiness.staff.length}
      />
    </section>
  )
}

// Stat Card Component
function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <Card className="flex items-center gap-4 p-5 rounded-xl shadow-sm border-0 bg-muted/60 text-center">
      <div className="bg-accent/20 rounded-lg p-2 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold ">{value}</div>
        <div className="text-muted-foreground text-sm">{label}</div>
      </div>
    </Card>
  );
}