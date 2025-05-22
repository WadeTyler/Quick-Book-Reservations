import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-accent/5">
      <div className="container py-6 flex flex-col lg:flex-row gap-16 lg:justify-evenly">
        <div className="max-w-64">
          <h2 className="font-semibold text-2xl tracking-tight ">
            Quick Book Reservations
          </h2>
          <p>
            Simplifying reservations for businesses worldwide. Create your business profile and start accepting bookings
            today.
          </p>
        </div>

        <div className="max-w-48">
          <h3 className="font-semibold text-lg tracking-tight">
            Quick Links
          </h3>
          <FooterLinksGroup footerLinks={[
            {name: "Home", href: "/"},
            {name: "Features", href: "/#features"},
            {name: "Pricing", href: "/#pricing"}
          ]}
          />
        </div>
      </div>


    </footer>
  );
}

type FooterLink = {
  name: string;
  href: string;
}

function FooterLinksGroup({footerLinks}: {
  footerLinks: FooterLink[];
}) {

  return (
    <div className="flex flex-col gap-2">
      {footerLinks.map(footerLink => <Link href={footerLink.href} key={footerLink.href}>{footerLink.name}</Link>)}
    </div>
  )

}