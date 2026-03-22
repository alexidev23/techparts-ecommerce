import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { sponsorService } from "@/services/sponsorService";
import type { Sponsor } from "@/types/sponsor";

export function SponsorsCarousel() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await sponsorService.getActive();
        setSponsors(data);
      } catch {
        // silencioso
      }
    };

    fetchSponsors();
  }, []);

  if (sponsors.length === 0) return null;

  return (
    <section
      aria-label="Sponsors"
      className="border-t bg-slate-50 dark:bg-slate-900 py-6"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-widest">
          Nuestros sponsors
        </p>
        <Carousel
          opts={{ loop: true, align: "center" }}
          plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent>
            {sponsors.map((sponsor) => (
              <CarouselItem
                key={sponsor.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sponsor.name}
                  className="flex items-center justify-center px-6 py-2 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-8 object-contain"
                    loading="lazy"
                  />
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
