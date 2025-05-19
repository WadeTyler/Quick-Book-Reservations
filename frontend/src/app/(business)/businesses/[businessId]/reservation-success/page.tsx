import Link from "next/link";
import {Card} from "@/components/ui/card";

async function ReservationSuccessPage({params}: {
  params: Promise<{ businessId: string }>
}) {

  const {businessId} = await params;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-muted/40">

      <Card className="container py-6">
        <h1 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-center">
          Reservation Placed!
        </h1>
        <p className="tracking-wide leading-loose text-lg text-center text-balance">
          Your reservation has been placed! You will receive a confirmation email within 24 hours! If you do not receive a confirmation email within 24 hours please contact us!
        </p>
        <Link href={`/businesses/${businessId}`} className="link-1 text-center">
          Back to Services
        </Link>
      </Card>

    </div>
  );
}

export default ReservationSuccessPage;