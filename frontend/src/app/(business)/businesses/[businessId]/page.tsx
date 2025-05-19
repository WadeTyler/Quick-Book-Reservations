import BusinessContainer from "@/app/(business)/businesses/[businessId]/_components/BusinessContainer";
import {Business} from "@/features/business/business.types";
import {axiosInstance} from "@/lib/axios";
import {AxiosResponse} from "axios";
import {APIResponse} from "@/types";
import {Metadata} from "next";

type Props = {
  params: Promise<{ businessId: string }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {businessId} = await params;

  const response: AxiosResponse<APIResponse<Business>> = await axiosInstance.get(`/businesses/${businessId}`);

  const title = response.data.data ? `${response.data.data.name} | Quick Book` : "Business | Quick Book";
  const description = response.data.data ? `${response.data.data.description}` : "The quick book page for a business.";

  return {
    title,
    description
  }
}

function BusinessPage() {

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <BusinessContainer />
    </div>
  );
}

export default BusinessPage;
