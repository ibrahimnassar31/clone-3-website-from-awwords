import React from 'react';

const WomankindGrant = () => {
  return (
    <section className="border-t border-border bg-background py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="mb-6 text-3xl font-medium text-foreground">
            WomanKind is an annual creative grant supporting innovative femtech startups.
          </h3>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-muted">
            Each year, we invest three months of strategic brand development in one company, delivering the brand strategy, visual identity and design support that turns promising startups into fundable, scalable businesses ready to make their mark on women’s healthcare.
          </p>
          <a
            href="https://alfacharlie.co/womankind-health-grant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border-2 border-foreground px-8 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            MORE WOMANKIND GRANT INFO
          </a>
        </div>
      </div>
    </section>
  );
};

export default WomankindGrant;