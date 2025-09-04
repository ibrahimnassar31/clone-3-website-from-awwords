import Image from 'next/image';

const SustainabilityCommitment = () => {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <h2 className="text-4xl font-medium text-center text-foreground">
            Design 1% better.
          </h2>
          <figure className="relative w-full aspect-[2484/1428] rounded-xl overflow-hidden">
            <Image
              src="https://cdn.sanity.io/images/yy4n24b1/production/0c327eff46d04641750a5af1186649e9a83bd6fa-2484x1428.jpg"
              alt="Artistic representation of environmental commitment"
              fill
              className="object-cover"
            />
          </figure>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start w-full max-w-7xl mx-auto">
            <div className="lg:col-span-2 text-left">
              <h2 className="text-2xl md:text-[32px] leading-tight font-normal text-foreground">
                We’re proud members of{' '}
                <a
                  href="https://www.onepercentfortheplanet.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:opacity-80 transition-opacity"
                >
                  1% for the Planet
                </a>
                , committing 1% of our gross revenue each year to{' '}
                <a
                  href="https://womensearthalliance.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:opacity-80 transition-opacity"
                >
                  Women’s Earth Alliance
                </a>
                . WEA supports grassroots women leaders on the frontlines of
                climate action, providing them with training, funding, and
                networks of support to protect their communities and our
                planet. Together, we’re investing in long-term solutions that
                create a ripple effect—benefiting women, their communities, and
                future generations.
              </h2>
            </div>
            <div className="lg:col-span-1 flex flex-col items-center lg:items-end justify-start gap-10 w-full">
              <a
                href="https://womensearthalliance.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="https://cdn.sanity.io/images/yy4n24b1/production/f94f6ad286ae11e64d037b3c208394b828283073-356x138.png"
                  alt="Women's Earth Alliance logo"
                  width={178}
                  height={69}
                  className="h-auto w-auto"
                />
              </a>
              <a
                href="https://www.onepercentfortheplanet.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="https://cdn.sanity.io/images/yy4n24b1/production/c5f35cacf14b537ce3acc67a87e5d76068206b99-356x138.png"
                  alt="1% for the Planet logo"
                  width={178}
                  height={69}
                  className="h-auto w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCommitment;