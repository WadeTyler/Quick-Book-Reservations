import Link from "next/link";
import {Card} from "@/components/ui/card";
import {Metadata} from "next";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {Business} from "@/features/business/business.types";
import {axiosInstance} from "@/lib/axios";

type Props = {
  params: Promise<{ businessId: string }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {businessId} = await params;

  const response: AxiosResponse<APIResponse<Business>> = await axiosInstance.get(`/businesses/${businessId}`);

  const title = response.data.data ? `Reservation Created at ${response.data.data.name} | Quick Book` : "Reservation Created | Quick Book";
  const description = response.data.data ? `${response.data.data.description}` : "Reservation successfully created page.";

  return {
    title,
    description
  }
}

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