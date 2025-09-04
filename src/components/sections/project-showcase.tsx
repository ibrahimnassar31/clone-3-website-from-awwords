import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface Project {
  title: string;
  slug: string;
  images: ProjectImage[];
}

const postPamperImages: ProjectImage[] = [
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-937467-6d8b008f089d991b904bb325ddf4dcb5c3586790-1500x2142.jpg', width: 1500, height: 2142, alt: 'Post Pamper product packaging' },
];

const belleHealthImages: ProjectImage[] = [
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-470127-b65cc42dc6f1b14358352996d2282fc69990025c-1500x2141.jpg', width: 1500, height: 2141, alt: 'Belle Health branding' },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-088324-8d58070c2a832b12fb1cd57445dc01909798e19d-1500x2141.jpg', width: 1500, height: 2141, alt: 'Belle Health product mockup' },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-197313-e4a87677564b236fc92445d73637594d30180057-1200x1713.jpg', width: 1200, height: 1713, alt: 'Belle Health poster' },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-248479-744e0bb30486069913adb89440f7445fbe9f2e18-1500x2141.jpg', width: 1500, height: 2141, alt: 'Belle Health bottle design' },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-416781-629dab81af80236e270981db3779982c98326f53-1200x1713.jpg', width: 1200, height: 1713, alt: 'Belle Health magazine ad' },
];

const hoopsyImages: ProjectImage[] = [
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-593064-222c677a0d9f6092964052fbc98d771c70709f6e-1067x1523.jpg', width: 1067, height: 1523, alt: 'Hoopsy packaging' },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-068210-de61ed49ec0ed27170f95ded57f09601c8c1f87e-1500x2142.jpg', width: 1500, height: 2142, alt: 'Hoopsy branding' },
  { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/next-123385-2f359b601146ce9183623b844850a3bfce7ca722-1067x1523.jpg', width: 1067, height: 1523, alt: 'Hoopsy product details' },
];

const allAvailableImages = [...belleHealthImages, ...hoopsyImages, ...postPamperImages];

const fillImages = (images: ProjectImage[], count: number) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(images[i % images.length]);
  }
  return result;
};

const placeholderImages = (startIndex: number, count: number) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(allAvailableImages[(startIndex + i) % allAvailableImages.length]);
  }
  return result;
}

const projectsData: Project[] = [
  { title: "Post Pamper", slug: "post-pamper", images: fillImages(postPamperImages, 6) },
  { title: "Belle Health", slug: "belle-health", images: fillImages(belleHealthImages, 6) },
  { title: "Hoopsy", slug: "hoopsy", images: fillImages(hoopsyImages, 6) },
  { title: "Blake Health", slug: "blake-health", images: placeholderImages(0, 6) },
  { title: "Women's Earth Alliance", slug: "womens-earth-alliance", images: placeholderImages(1, 6) },
  { title: "Rollercoaster", slug: "rollercoaster", images: placeholderImages(2, 6) },
  { title: "Rewriting the Code", slug: "rewriting-the-code", images: placeholderImages(3, 6) },
];


const ProjectCard = ({ project }: { project: Project }) => {
  const images = project.images.slice(0, 6).reverse(); // Work from back to front for z-indexing

  return (
    <article className="group w-[clamp(280px,30vw,400px)] flex-shrink-0">
      <Link href={`/work/${project.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1 -m-1">
        <div className="relative aspect-[7/10] mb-6">
          <div className="absolute inset-0 transition-transform duration-500 ease-out transform-gpu group-hover:scale-[0.92]">
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-out transform-gpu rounded-md overflow-hidden",
                  "translate-y-[var(--y-base)] scale-[var(--scale-base)]",
                  "group-hover:translate-y-[var(--y-hover)] group-hover:rotate-[var(--rotate-hover)]"
                )}
                style={{
                  zIndex: index,
                  '--y-base': `${(5 - index) * 4}px`,
                  '--scale-base': 1 - (5 - index) * 0.04,
                  '--y-hover': `${(index-2.5) * 12}px`,
                  '--rotate-hover': `${(index-2.5) * -2.5}deg`,
                } as React.CSSProperties}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover bg-gray-100"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-foreground">
          <h3 className="font-medium text-lg lg:text-xl leading-tight">{project.title}</h3>
          <p className="text-base text-muted-foreground">View project</p>
        </div>
      </Link>
    </article>
  );
};


const ProjectShowcase = () => {
  return (
    <section className="bg-background text-foreground py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto">
        <header className="flex flex-col md:flex-row justify-between md:items-baseline mb-12 md:mb-16">
          <h2 className="text-sm font-normal text-muted-foreground max-w-xs md:max-w-none mb-4 md:mb-0">
            Shaping brands with strategy, identity, websites &amp; graphic design
          </h2>
          <Link href="/work" className="text-sm font-normal text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            View all work
          </Link>
        </header>

        <div className="flex overflow-x-auto space-x-8 md:space-x-12 pb-8 -mx-6 px-6 md:-mx-8 md:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;