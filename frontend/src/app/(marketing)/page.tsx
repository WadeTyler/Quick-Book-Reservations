import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CheckIcon, FormInputIcon, GlobeIcon, PaperclipIcon} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {subscriptions, SubscriptionTier} from "@/data/subscriptionTiers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <section className="container w-full min-h-screen py-6 lg:py-16 flex flex-col items-center justify-center text-center text-balance bg-radial from-accent/40 via-transparent to-transparent">
        <h1 className="text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6">Manage Your Business Bookings Effortlessly</h1>
        <p className="text-lg md:text-xl lg:text-2xl tracking-wide mb-3">Create your business profile on our platform and let customers book yours services directly through our user-friendly interface.</p>
        <Link href={"/signup"}>
          <Button size="lg">Get Started</Button>
        </Link>
      </section>

      <section id="features" className="bg-foreground text-background">
        <div className="container flex flex-col py-6 lg:py-16 bg-foreground text-background text-center">
          <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl mb-6 tracking-tight text-balance">Powerful Features for Your Business</h2>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Online Booking */}
            <Card>
              <CardHeader className="text-center">
                <GlobeIcon className="size-24 text-gray-600 mx-auto" />
              </CardHeader>
              <CardContent className="text-center mx-auto text-balance">
                <h3 className="mx-auto text-balance text-xl font-semibold tracking-tight text-accent">Online Booking</h3>
                <p>Allow customers to book appointments and services 24/7 from any device.</p>
              </CardContent>
            </Card>

            {/* Customizable Services */}
            <Card>
              <CardHeader className="text-center">
                <FormInputIcon className="size-24 text-gray-600 mx-auto" />
              </CardHeader>
              <CardContent className="text-center mx-auto text-balance">
                <h3 className="mx-auto text-balance text-xl font-semibold tracking-tight text-accent">Customizable Services</h3>
                <p>Create custom services tailored to your specific business needs.</p>
              </CardContent>
            </Card>

            {/* Website Integration */}
            <Card>
              <CardHeader className="text-center">
                <PaperclipIcon className="size-24 text-gray-600 mx-auto" />
              </CardHeader>
              <CardContent className="text-center mx-auto text-balance">
                <h3 className="mx-auto text-balance text-xl font-semibold tracking-tight text-accent">Website Integration</h3>
                <p>Easily connect your business profile to your existing website with a simple link or button.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section id="pricing" className="bg-accent/5">
        <div className="container py-6 lg:py-16">
          <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl mb-6 tracking-tight text-center text-balance">Pricing</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {subscriptions.map(subscription => (
              <PricingCard subscriptionTier={subscription} key={subscription.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground">
        <div className="container py-6 lg:py-16 flex items-center justify-center">

          <div className="p-4 bg-background text-center text-balance rounded-md shadow-md">
            <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl mb-6 tracking-tight text-balance">Ready to Streamline your Booking Process?</h2>
            <p className="mb-6">Join other successful businesses that trust Quick Book Reservations to handle their booking needs.</p>

            <Link href={"/signup"}>
              <Button>Sign Up Free</Button>
            </Link>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

function PricingCard({subscriptionTier}: {subscriptionTier: SubscriptionTier}) {

  const isMostPopular = subscriptionTier.title === "Standard";
  return (
    <Card>
      <CardHeader>
        <h3 className="text-3xl font-semibold">{subscriptionTier.title}</h3>
        <p>{subscriptionTier.tag}</p>
      </CardHeader>
      <CardContent>
        <p className="font-semibold tracking-tight text-2xl mb-4">${subscriptionTier.priceInCents / 100} per month</p>
        {subscriptionTier.perks.map((perk, index) => (
          <p key={index} className="inline-flex gap-2">
            <CheckIcon />
            {perk}
          </p>
        ))}
      </CardContent>
      <CardFooter className="mt-auto">
        <Link className="w-full" href={subscriptionTier.href}><Button variant={isMostPopular ? "accent" : "default"} className="w-full">Get Started</Button></Link>
      </CardFooter>

    </Card>
  );
}