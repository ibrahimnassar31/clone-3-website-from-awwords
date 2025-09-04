import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const AboutAgency = () => {
  return (
    <section className="bg-background">
      <div className="container flex flex-col items-center text-center py-24 md:py-36">
        <h3 className="max-w-[900px] text-[32px] font-normal leading-tight text-foreground">
          Alfa Charlie is a women-owned creative agency dedicated to brands driving change in women's health. We understand both the mission and the market challenges you face every day.
        </h3>
        <p className="mt-12">
          <Link 
            href="/about" 
            className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:text-primary group"
          >
            About Alfa Charlie
            <ArrowRight className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AboutAgency;