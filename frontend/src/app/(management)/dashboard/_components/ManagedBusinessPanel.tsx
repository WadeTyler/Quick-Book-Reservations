import {ManagedBusiness} from "@/features/business/business.types";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function ManagedBusinessPanel({managedBusiness}: {managedBusiness: ManagedBusiness}) {
  return (
    <Card className="pt-0 rounded-md overflow-hidden">
      <CardHeader className="bg-background relative aspect-video">
        <Image src={managedBusiness.image || "./default-image.jpg"} alt={`Image for ${managedBusiness.name}`} fill={true} objectFit="cover" objectPosition="center" />
      </CardHeader>
      <CardContent>
        <h2 className="font-semibold tracking-tight text-accent text-xl sm:text-2xl">{managedBusiness.name}</h2>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link href={`/businesses/${managedBusiness.id}/manage`}>
          <Button>
            Manage
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )

}