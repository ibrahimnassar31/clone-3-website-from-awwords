import Image from "next/image";

const projects = [
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/76cd8fb653ad38c7d9cc6d0922234c4c62071bbc-1200x1712.jpg?w=1200&q=100&auto=format",
    alt: "Menopause Packaging Design",
    width: 1200,
    height: 1712,
  },
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/cf9e7dc3633509fab2ad17d00a93a9a3974c4921-1200x1708.jpg?w=1200&q=100&auto=format",
    alt: "Femtech Billboard Design",
    width: 1200,
    height: 1708,
  },
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/bd41efb137d425e7ebd6fcfa2f4725cd7c41d0ec-1200x1714.jpg?w=1200&q=100&auto=format",
    alt: "nonprofit Graphic Design",
    width: 1200,
    height: 1714,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/9f9d64a6444ca647fdb847102174cc53ede81124-1200x1712-12.jpg",
    alt: "Belle Health PMDD Branding",
    width: 1200,
    height: 1712,
  },
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/991035f41f27cadb297f6c6c3dcf7ad3bdb8cfab-1500x2142.jpg?w=1500&q=100&auto=format",
    alt: "Hoopsy Website Design",
    width: 1500,
    height: 2142,
  },
];

const FeaturedProjects = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <div key={index} className="w-full">
            <Image
              src={project.src}
              alt={project.alt}
              width={project.width}
              height={project.height}
              className="h-auto w-full object-cover"
              priority={index < 2}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;