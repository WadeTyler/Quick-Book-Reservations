import CreateReservationContainer
  from "@/app/(business)/businesses/[businessId]/create-reservation/_components/CreateReservationContainer";
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

  const title = response.data.data ? `Create Reservation at ${response.data.data.name} | Quick Book` : "Create Reservation | Quick Book";
  const description = response.data.data ? `${response.data.data.description}` : "Create a reservation.";

  return {
    title,
    description
  }
}

function CreateReservationPage() {
  return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-muted/40 py-16 p-6 pt-32">
      <CreateReservationContainer />
      </div>
  )
}

export default CreateReservationPage;
