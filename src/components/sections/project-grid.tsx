import Image from "next/image";
import React from "react";

type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const wideImagesData: ImageAsset[] = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/b3fdda16715096b235b1789e953362f3347232b4-1560x1200-2.jpg", width: 1560, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/32927f0c801d8f14b7d4c3742b781037f1878ebc-1560x1200-3.jpg", width: 1560, height: 1200, alt: "project snippet" },
];

const col1ImagesData: ImageAsset[] = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/af7e49f91d25863c7644fd895d254403171e7b87-325x1200-4.jpg", width: 325, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/a6b28fa66599f466bf0212117dc7a308f290a868-325x1200-8.jpg", width: 325, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/2371fd4325ccf1a85e4349e9ca4dd67e88f6e6ee-325x1200-6.jpg", width: 325, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/b37490158677b31d5ce938be4abe39f58739a75d-325x1200-7.jpg", width: 325, height: 1200, alt: "project snippet" },
];

const col2ImagesData: ImageAsset[] = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/a6b28fa66599f466bf0212117dc7a308f290a868-325x1200-8.jpg", width: 325, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/2371fd4325ccf1a85e4349e9ca4dd67e88f6e6ee-325x1200-6.jpg", width: 325, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/b37490158677b31d5ce938be4abe39f58739a75d-325x1200-7.jpg", width: 325, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/af7e49f91d25863c7644fd895d254403171e7b87-325x1200-4.jpg", width: 325, height: 1200, alt: "project snippet" },
];

const col3ImagesData: ImageAsset[] = [
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/b37490158677b31d5ce938be4abe39f58739a75d-325x1200-7.jpg", width: 325, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/a6b28fa66599f466bf0212117dc7a308f290a868-325x1200-8.jpg", width: 325, height: 1200, alt: "project snippet" },
  { src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/622e97f2-b110-499c-ae01-052463deee39-alfacharlie-co/assets/images/af7e49f91d25863c7644fd895d254403171e7b87-325x1200-4.jpg", width: 325, height: 1200, alt: "project snippet" },
];

const duplicatedWideImages = [...wideImagesData, ...wideImagesData];
const duplicatedCol1Images = [...col1ImagesData, ...col1ImagesData];
const duplicatedCol2Images = [...col2ImagesData, ...col2ImagesData];
const duplicatedCol3Images = [...col3ImagesData, ...col3ImagesData];


type ImageColumnProps = {
  images: ImageAsset[];
  animationClass: string;
  className?: string;
};

const ImageColumn = ({ images, animationClass, className }: ImageColumnProps) => (
  <div className={`h-full ${className || ''}`}>
    <div className="relative h-full overflow-hidden">
      <div className={`flex flex-col ${animationClass}`}>
        {images.map((img, i) => (
          <div key={i} className="relative w-full shrink-0">
            <Image src={img.src} width={img.width} height={img.height} alt={img.alt} className="w-full h-auto object-cover" priority={i < 3} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProjectGrid = () => {
  return (
    <>
      <style>
        {`
          @keyframes scroll-down {
            from { transform: translateY(0); }
            to { transform: translateY(-50%); }
          }
          @keyframes scroll-up {
            from { transform: translateY(-50%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
      <section className="bg-background relative flex h-[632px] w-full overflow-hidden">
        <div className="w-2/3">
          <ImageColumn
            images={duplicatedWideImages}
            animationClass="animate-[scroll-down_90s_linear_infinite]"
          />
        </div>
        <div className="flex w-1/3">
          <ImageColumn
            images={duplicatedCol1Images}
            animationClass="animate-[scroll-up_60s_linear_infinite]"
            className="w-1/3"
          />
          <ImageColumn
            images={duplicatedCol2Images}
            animationClass="animate-[scroll-up_80s_linear_infinite]"
            className="w-1/3"
          />
          <ImageColumn
            images={duplicatedCol3Images}
            animationClass="animate-[scroll-up_70s_linear_infinite]"
            className="w-1/3"
          />
        </div>
      </section>
    </>
  );
};

export default ProjectGrid;