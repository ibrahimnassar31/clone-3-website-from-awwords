import Link from 'next/link';

const MissionStatement = () => {
  return (
    <section className="bg-background text-foreground py-20 lg:py-40">
      <div className="container mx-auto">
        <h1 className="px-4 md:px-[8.33333%] text-4xl lg:text-[3.5rem] font-normal leading-tight tracking-tight">
          We are design allies for femtech brands*—those redefining the
          industry by challenging the status quo, rewriting outdated
          narratives, and sparking open, inclusive conversations. We imagine a
          future where women&apos;s health is no longer a whispered topic but a
          vibrant, celebrated movement—powered by{' '}
          <Link href="/services" className="text-foreground">
            strategy and design
          </Link>
          .
        </h1>
      </div>
    </section>
  );
};

export default MissionStatement;