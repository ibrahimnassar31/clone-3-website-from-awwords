import Image from 'next/image';
import Link from 'next/link';

const ServicesCta = () => {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container grid gap-12 md:grid-cols-2 md:items-end lg:gap-24">
        <div className="relative w-full">
          <Image
            src="https://cdn.sanity.io/images/yy4n24b1/production/b539140ad9dc7e8feef86b333fb27c416a781386-1266x1615.jpg"
            alt="project illustration"
            width={1266}
            height={1615}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-[2rem] font-medium leading-[1.2] text-foreground">
            Strategic brand development and web design that turns femtech startups into healthcare leaders.
          </h3>
          <p className="mt-8 text-lg text-[hsl(var(--muted))]">
            Choose how we accelerate your growth: strategic brand projects or ongoing creative partnerships. Trust us as your creative ally, using comprehensive branding, web design, and graphic design to attract loyal customers, secure funding, and amplify your healthcare impact.
          </p>
          <Link href="/services" className="mt-12 inline-block">
            <p className="font-heading text-sm font-medium uppercase tracking-wider text-foreground">
              Explore our services
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesCta;